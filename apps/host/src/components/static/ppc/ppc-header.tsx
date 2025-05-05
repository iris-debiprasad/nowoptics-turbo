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

const HeaderPPC = (props: any) => {
  const appLogo = useAppLogo();

  return (
    <>
      <Box className={style.headerWrapper}>
        <AppBar className={style.header}>
          <div className={style.mobileHeader}>
            <Button
              className={style.appointmentBtn}
              startIcon={
                <IconSVG
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  fillP="#000000"
                  name="calender_icon"
                />
              }
              onClick={props.handler}
              data-testid="BookEyeExam"
            >
              Book Eye Exam
            </Button>
            <Link href={"tel:" + formatPhoneNumber(props.data)}>
              <Button
                className={style.appointmentBtn}
                startIcon={
                  <IconSVG
                    width="15"
                    height="23"
                    viewBox="0 0 15 23"
                    fill="none"
                    fillP="#000000"
                    name="phone_icon"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                }
              >
                {formatPhoneNumber(props.data)}
              </Button>
            </Link>
          </div>
          <div className={style.headerContainer}>
            <Box className={style.logoSection}>
              {appLogo ? (
                <Image src={appLogo} alt="logo" width={142} height={60} />
              ) : (
                <Skeleton width={142} height={60} variant="rectangular" />
              )}
            </Box>
            <Box className={style.appointmentSection}>
              <Button
                className={style.appointmentBtn}
                endIcon={
                  <IconSVG
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    fillP="#010101"
                    name="arrow_solid_right"
                  />
                }
                onClick={props.handler}
                data-testid="BookEyeExam"
              >
                Book Eye Exam
              </Button>
              <Box>
                <Box component="span" className={style.supportNumber}>
                  {"\u00A0\u00A0Call us"}
                  &nbsp;{formatPhoneNumber(props.data)}
                </Box>
              </Box>
            </Box>
          </div>
        </AppBar>
      </Box>
    </>
  );
};

export default HeaderPPC;
