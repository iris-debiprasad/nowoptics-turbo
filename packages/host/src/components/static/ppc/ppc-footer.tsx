import IconSVG from "@/components/iconsvg/IconSVG";
import { Box, Button, Skeleton } from "@mui/material";
import style from "./ppc.module.scss";
import Link from "next/link";
import Image from "next/image";
import React from "react";
import useAppLogo from "@/hooks/useAppLogo";

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const StanFooter =
  BASE_IMAGE_URL + "transform/87eff6a4-2658-44c5-adc7-5daf4ffd79c4/Stan_offers";

const FooterPPC = (props: any) => {
  const appLogo = useAppLogo();

  return (
    <div className={`${style.minifiedFooter}`}>
      <div className={style.columnLeft}>
        <div className={style.footerInfo}>
          <div className={`${style.mediaIcons}`}>
            {appLogo ? (
              <Image
                alt="Logo"
                width={142}
                height={60}
                title="Logo"
                className={style.logo}
                src={appLogo}
              />
            ) : (
              <Skeleton width={142} height={60} variant="rectangular" />
            )}
          </div>
          <div className={style.copyright}>
            <span>
              &copy;{" "}
              {"Copyright /year/ Stanton Optical. All rights reserved.".replace(
                "/year/",
                `${new Date().getFullYear()}`
              )}{" "}
              <Link className={style.aLink} href="/privacy-policy/">
                {"Privacy Policy"}
              </Link>
            </span>
          </div>
        </div>
      </div>
      <div className={style.columnRIght}>
        <div className={style.footerCTA}>
          <div className={style.fasd}>
            <Image alt="" width="235" height="100" src={StanFooter}></Image>
          </div>
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
          </Box>
        </div>
      </div>
    </div>
  );
};

export default FooterPPC;
