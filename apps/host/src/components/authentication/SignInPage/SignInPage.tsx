import Head from "next/head";
import style from "./SignInPage.module.scss";
import { Box } from "@mui/material";
import LoginForm from "../LoginForm/LoginForm";
import { useTranslation } from 'react-i18next';

export default function SignInPage() {
  const { t } = useTranslation();
  return (
    <>
      <Box className={style.authOuterWrapper}>
        <Box className={style.authContainer}>
          <LoginForm formHead={t("AUTHENTICATION.SIGN_INTO")} formMessage="" />
        </Box>
      </Box>
    </>
  );
}
