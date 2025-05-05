import IconSVG from "@/components/iconsvg/IconSVG";
import { Box, Button, Typography } from "@mui/material";
import { signIn } from "next-auth/react";
import { AuthPropsDTO } from "../../../types/auth.type";
import style from "./ProviderLoginPage.module.scss";
import { AUTH_CONSTATNT } from "@/constants/auth.constants";

function ProviderLoginPage(providers: AuthPropsDTO) {
  return (
    <div>
      {Object.values(providers?.providers.providers).map((provider, index) => {
        if (provider.id === AUTH_CONSTATNT.PROVIDER_ID)
          return (
            <div key={index}>
              <Box className={style.providerLoginWrapper}>
                <Box className={style.headerIcon}>
                  <IconSVG
                    width="136"
                    height="60"
                    viewBox="0 0 136 60"
                    fill="#F9FAFC"
                    name="mountain_medium_icon"
                  />
                </Box>
                <Typography className={style.headingTitle}>IRIS</Typography>
                <Typography className={style.headerContent}>
                  Unleashing the true power of clean and clear vision!
                </Typography>
                <Button
                  onClick={() => signIn(provider.id)}
                  className={style.loginBtn}
                >
                  Sign in with {provider.name}
                </Button>
              </Box>
            </div>
          );
      })}
    </div>
  );
}

export default ProviderLoginPage;
