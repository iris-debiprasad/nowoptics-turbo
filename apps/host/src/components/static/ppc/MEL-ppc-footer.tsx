import IconSVG from "@/components/iconsvg/IconSVG";
import { Skeleton } from "@mui/material";
import style from "./ppc.module.scss";
import Link from "next/link";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import useAppLogo from "@/hooks/useAppLogo";
import {
  BRAND,
  SOCIAL_LINKS,
} from "@root/host/src/constants/common.constants";
import { checkBrand } from "@root/host/src/utils/common.utils";

const MELFooterPPC = (props: any) => {
  const appLogo = useAppLogo();
  const [brand, setBrand] = useState("");
  const [brandLink, setBrandLink] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrand(checkBrand());
      setBrandLink(checkBrand());
    }
  }, []);
  return (
    <div className={`${style.minifiedFooter} ${style.melMinifiedFooter}`}>
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
          <div className={style.social}>
            <div>
              <a
                href={brandLink ? SOCIAL_LINKS[brandLink].facebook : ""}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <IconSVG
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  fill={brand === BRAND.MEL ? "#0082ca" : "#3B5998"}
                  name="facebook_icon"
                />
              </a>
              <a
                href={brandLink ? SOCIAL_LINKS[brandLink].linkedin : ""}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <IconSVG
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  fill={brand === BRAND.MEL ? "#0082ca" : "#3B5998"}
                  name="linkedin_icon"
                />
              </a>
              <a
                href={brandLink ? SOCIAL_LINKS[brandLink].instagram : ""}
                target="_blank"
                rel="noreferrer"
                style={{ marginLeft: "10px" }}
              >
                <IconSVG
                  width="20"
                  height="20"
                  viewBox="0 0 512 512"
                  fill={brand === BRAND.MEL ? "#0082ca" : "#3B5998"}
                  name="instagram_icon"
                />
              </a>
            </div>
            <div className={style.copyright}>
              <span>
                &copy;{" "}
                {/* This says Stanton optical due to all the stores will be transitioned to SO*/}
                {/* and the one that remains at the moment (bowling-green)*/}
                {/* will required the copyright text to be Stanton Optical*/}
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
      </div>
    </div>
  );
};

export default MELFooterPPC;
