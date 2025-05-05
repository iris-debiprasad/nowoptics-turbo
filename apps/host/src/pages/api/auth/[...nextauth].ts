import { HeaderConfig } from "@/config/headerConfig";
import { ISD_CODE, USER_TYPE } from "@/constants/common.constants";
import { IrisUrlConstants } from "@/constants/iris.url.constants";
import axios from "axios";
import NextAuth, { TokenSet, User } from "next-auth";
import AzureADProvider from "next-auth/providers/azure-ad";
import Credentials from "next-auth/providers/credentials";
import jwt_decode from "jwt-decode";
import { JWT } from "next-auth/jwt";

function parseJwt(token: string) {
  const base64Url = token.split('.')[1];
  const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
  const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
    return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
  }).join(''));

  return JSON.parse(jsonPayload);
}

async function refreshAccessToken(accessToken: JWT) {
  const url = `https://login.microsoftonline.com/${process.env.AZURE_AD_TENANTID}/oauth2/v2.0/token`;
  try {
    const req = await fetch(url, {
      method: "POST",
      headers: {
        "Content-Type": "application/x-www-form-urlencoded",
      },
      body:
        `grant_type=refresh_token` +
        `&client_secret=${process.env.AZURE_AD_CLIENT_SECRET}` +
        `&refresh_token=${accessToken.refreshToken}` +
        `&client_id=${process.env.AZURE_AD_CLIENTID}`,
    });

    const res = await req.json();
    return res;
  } catch (err) {
    return {error: true};
  }
}


export default NextAuth({
  secret: process.env.NEXT_PUBLIC_SECRET,
  providers: [
    AzureADProvider({
      clientId: process.env.AZURE_AD_CLIENTID as string,
      clientSecret: process.env.AZURE_AD_CLIENT_SECRET as string,
      tenantId: process.env.AZURE_AD_TENANTID,
      authorization: {
        params: { scope: "offline_access openid profile", prompt: "login" },
      },
    }),
    Credentials({
      name: "Credentials",
      credentials: {
        username: { label: "Username", type: "text" },
        password: { label: "Password", type: "password" },
        storeNumber: { label: "", type: "hidden" },
        recaptchaToken: { label: "", type: "hidden" },
      },
      async authorize(credentials, req) {
        let HeaderConfigs = HeaderConfig();
        if (HeaderConfigs.headers) {
          HeaderConfigs.headers["CreatedAtStoreNumber"] =
            credentials?.storeNumber;
          HeaderConfigs.headers["recaptchaToken"] = credentials?.recaptchaToken;
        }
        return (
          axios
            .post(
              IrisUrlConstants.LOGIN_URL,
              {
                isdCode: ISD_CODE,
                username: credentials?.username,
                password: credentials?.password,
              },
              HeaderConfigs
            )
            .then((response) => {
              const authData = {
                ...{ userType: USER_TYPE.PATIENT },
                ...(jwt_decode(response.data.Result.Token) as object),
              };

              return {
                id: response.statusText,
                accessToken: response.data.Result.Token,
                authData: authData,
              };
            })
            .catch((error) => {
              throw new Error(error.response?.data.Error.Description);
            }) || null
        );
      },
    }),
  ],
  callbacks: {
    async signIn({ user, account, profile, email, credentials }) {
      if (user) {
        return true;
      } else {
        return false;
      }
    },
    async redirect({ url, baseUrl }) {
      return baseUrl;
    },
    async jwt({ token, user, account, profile, isNewUser }) {
      if (account && !user.accessToken) {
        user.accessToken = account.id_token;
        user.authData = {
          ...user.authData,
          ...{ userType: USER_TYPE.ASSOCIATE },
        };
        token.refreshToken = account.refresh_token;
        const tokenData = parseJwt(account.id_token as string) as any
        token.accessTokenExpires = tokenData.exp as number;
      }
      if (user) {
        token.user = user;
      }

      if ((token?.user as any)?.authData?.userType === USER_TYPE.ASSOCIATE && Date.now() && token?.accessTokenExpires) {
        if (Date.now() < (token.accessTokenExpires as number) * 1000) {
          return token;
        } else {
          let newToken: TokenSet = {}
          if(token.refreshToken) {
            newToken = await refreshAccessToken(token);
          }
          (token.user as User).accessToken = newToken.id_token;
          const tokenData = parseJwt(newToken.id_token as string) as any
          token.accessTokenExpires =  tokenData.exp as number
          return {
            ...token,
            access_token: newToken.id_token,
            expires_at: tokenData.exp as number,
            refresh_token: newToken.refresh_token ?? token.refresh_token,
          };
        }
      } else {
        return token;
      }
    },
    async session({ session, user, token }) {
      session.user = {
        ...(token.user as any),
        accessTokenExpires: token?.accessTokenExpires,
      } as User;
      return session;
    },
  },
  session: {
    updateAge: 0,
  },
});
