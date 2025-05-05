import Box from "@mui/material/Box";
import React, { useEffect, useState } from "react";
import style from "./PrescriptionRenewalFooter.module.scss";
import Image from "next/image";
import Link from "next/link";
import { checkBrand } from "@/utils/common.utils";
import { BRAND_NAME } from "@/constants/common.constants";
import { useTranslation } from "react-i18next";
import FooterLogo from "@root/assets/Images/icons/footerLogo.svg";

const PrescriptionRenewalFooter = () => {
  const { t } = useTranslation();
  const [brandName, seBrandName] = useState("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      seBrandName(BRAND_NAME[checkBrand()]);
    }
  }, []);

  return (
    <Box className={style.footerContainer}>
      <Box className={style.image}>
        <Image
          alt="Prescription Description"
          src={FooterLogo}
          width={120}
          height={51}
        />
      </Box>
      <Box className={style.footerCenterText}>
        <span>
          &copy;{" "}
          {t("FOOTER.Copyright")
            .replace("/year/", `${new Date().getFullYear()}`)
            .replace("/brand/", brandName)}{" "}
          <Link className={style.aLink} href="/privacy-policy/">
            {t("FOOTER.Privacy Policy")}
          </Link>
        </span>
      </Box>
      <Box></Box>
    </Box>
  );
};

export default PrescriptionRenewalFooter;
