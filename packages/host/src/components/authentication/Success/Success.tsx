import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./Success.module.scss";
import { SuccessPropsDTO } from "@/types/auth.type";
import IconSVG from "../../iconsvg/IconSVG";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

export default function Success(props: SuccessPropsDTO) {
  const { t } = useTranslation();
  return (
    <Box className={`${style.successContainer} `} data-testid="success-comp">
      <CssBaseline />
      <Box className={style.successBox}>
        <Box className={style.topIcon}>
          <IconSVG
            width="50"
            height="50"
            viewBox="0 0 50 50"
            fill="var(--quaternary-text-color)"
            name="tick_icon"
          />
          <Typography className={style.content}>{props.content}</Typography>
          <Link href="/my-account">
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={style.successLoginBtn}
            >
              {t(`AUTHENTICATION.SIGN_IN`)}
            </Button>
          </Link>
        </Box>
      </Box>
    </Box>
  );
}
