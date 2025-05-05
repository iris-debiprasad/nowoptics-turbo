import Image from "next/image";
import { AppBar, Box, Button, Skeleton } from "@mui/material";
import style from "./ppc.module.scss";
import Link from "next/link";
import React from "react";
import IconSVG from "@/components/iconsvg/IconSVG";
import useAppLogo from "@/hooks/useAppLogo";

export const formatPhoneNumber = (phoneNumber: string | undefined) => {
  if (phoneNumber) {
    const plainPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    return plainPhoneNumber.replace(phoneRegex, "($1) $2-$3");
  }
  return "";
};

const MELHeaderPPC = (props: any) => {
  const appLogo = useAppLogo();

  return (
    <>
      <Box className={style.headerWrapper}>
        <AppBar className={style.header}>
          <div className={style.melMobileHeader}>
            <Link href={"tel:" + formatPhoneNumber(props.data)}>
              <Box component="span" className={`${style.melSupportNumber} ${style.melFlexContainer}`}>
                <IconSVG
                  width="15"
                  height="23"
                  viewBox="0 0 15 23"
                  fill="none"
                  fillP="#0082ca"
                  name="phone_icon"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <span>&nbsp;{formatPhoneNumber(props.data)}</span>
              </Box>
            </Link>
            <Button
              className={style.appointmentBtn}
              onClick={props.handler}
              data-testid="BookEyeExam"
            >
              Book Eye Exam
            </Button>
          </div>
          <div className={style.headerContainer}>
            <Box className={style.logoSection}>
              {appLogo ? (
                <Image src={appLogo} alt="logo" width={142} height={60} />
              ) : (
                <Skeleton width={142} height={60} variant="rectangular" />
              )}
            </Box>
            <Box className={`${style.appointmentSection} ${style.melFlexContainer}`}>
              <Box component="span" className={`${style.melSupportNumber} ${style.melFlexContainer}`}>
                <IconSVG
                  width="15"
                  height="23"
                  viewBox="0 0 15 23"
                  fill="none"
                  fillP="#0082ca"
                  name="phone_icon"
                  strokeWidth="1"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
                <span>&nbsp;{formatPhoneNumber(props.data)}</span>
              </Box>
              <Button
                className={style.appointmentBtn}
                onClick={props.handler}
                data-testid="BookEyeExam"
              >
                Book Eye Exam
              </Button>
            </Box>
          </div>
        </AppBar>
      </Box>
    </>
  );
};

export default MELHeaderPPC;
