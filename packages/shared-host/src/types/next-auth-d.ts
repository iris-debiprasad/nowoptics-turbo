import { AdapterUser } from "next-auth/adapters";

declare module "next-auth" {
  interface Session {
    user: User | AdapterUser;
  }

  interface User {
    accessToken?: string;
    authData: object;
  }
}
