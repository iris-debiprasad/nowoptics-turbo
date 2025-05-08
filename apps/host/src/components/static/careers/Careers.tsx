import React from "react";
import { useTranslation } from "react-i18next";

import { Button, Card, Grid } from "@mui/material";
import IconSVG from "@/components/iconsvg/IconSVG";
import { CTLBanner } from "@/components/banner";
import { checkBrand } from "@root/host/src/utils/common.utils";

import style from "./Careers.module.scss";
import { BRAND } from "@root/host/src/constants/common.constants";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

const CAREERS_IMAGES = ImageUrlConstants.CAREERS;

const BANNERS = {
  SO: {
    DESKTOP: CAREERS_IMAGES.SO.DESKTOP,
    MOBILE: CAREERS_IMAGES.SO.MOBILE
  },
  MEL: {
    DESKTOP: CAREERS_IMAGES.MEL.DESKTOP,
    MOBILE: CAREERS_IMAGES.MEL.MOBILE
  },
};

const CTAS = {
  SO: "https://stantonoptical.hrmdirect.com/employment/job-openings.php?search=true&&cust_sort1=165964",
  MEL: "https://eyelab.hrmdirect.com/employment/job-openings.php?search=true&dept=-1&city=-1&state=-1&cust_sort1=162324",
};

const Careers = () => {
  const { t } = useTranslation();
  const [brand, setBrand] = React.useState<string>("");

  React.useEffect(() => {
    setBrand(checkBrand());
  }, []);

  const isSO = brand === BRAND.SO;
  const prefix = brand === BRAND.MEL ? "MEL_" : "";

  const CTA_LINK: string = CTAS[isSO ? "SO" : "MEL"];

  return (
    <div className={style.careersContainer}>
      <CTLBanner
        banner={{
          mobile: {
            alt: t("CAREERS.JOIN_US"),
            src: BANNERS[isSO ? "SO" : "MEL"].MOBILE,
          },
          tabletAndDesktop: {
            alt: t("CAREERS.JOIN_US"),
            src: BANNERS[isSO ? "SO" : "MEL"].DESKTOP,
          },
        }}
        title={{
          as: "p",
          className: `${style["banner-title"]}${isSO ? "" : ` ${style.mel}`}`,
          text: t(`CAREERS.${prefix}BANNER_TITLE`),
        }}
      />

      <div className={style.gridContainer}>
        <div className={style.contentContainer}>
          <div className={style.content}>
            <h1>{t("CAREERS.GROW_WITH_US")}</h1>
            <p>
              {t("CAREERS.DISCOVER_FULFILLING_CAREER.P1")}
              {t(`CAREERS.DISCOVER_FULFILLING_CAREER.${prefix}P2`)}
              {t("CAREERS.DISCOVER_FULFILLING_CAREER.P3")}
              {t(`CAREERS.DISCOVER_FULFILLING_CAREER.${prefix}P4`)}
              {t("CAREERS.DISCOVER_FULFILLING_CAREER.P5")}
            </p>

            <p>{t("CAREERS.WE_ARE_LOOKING")}</p>
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
              onClick={() => window.open(CTA_LINK, "_blank")}
              data-testid="FindYourCareer"
            >
              {t("CAREERS.FIND_YOUR_CAREER")}
            </Button>
            <h2>{t("CAREERS.EMPLOYEE_BENEFITS")}</h2>
            <p>
              {t("CAREERS.OUR_TEAM_MEMBERS.P1")}
              {t(`CAREERS.OUR_TEAM_MEMBERS.${prefix}P2`)}
              {t("CAREERS.OUR_TEAM_MEMBERS.P3")}
            </p>
            <Grid container spacing={4}>
              <Grid item xs={12} md={4}>
                <Card className={style.cardContainer}>
                  <h3 className={style.title}>
                    {t("CAREERS.EMPLOYEE_EYEWEAR_BENEFITS")}
                  </h3>
                  <ul>
                    <li>{t("CAREERS.2_FREE_PAIRS")}</li>
                    <li>{t("CAREERS.EXCLUSIVE_FRIENDS_FAMILY")}</li>
                  </ul>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={style.cardContainer}>
                  <h3 className={style.title}>
                    {t("CAREERS.OVERALL_HEALTH_WELLNESS")}
                  </h3>
                  <ul>
                    <li>{t("CAREERS.MEDICAL_PRESCRIPTION_DRUG_COVERAGE")}</li>
                    <li>{t("CAREERS.HEALTHCARE_SPENDING_SAVING")}</li>
                    <li>{t("CAREERS.SUPPLEMENTAL_MEDICAL_INSURANCE")}</li>
                    <li>{t("CAREERS.DENTAL_INSURANCE")}</li>
                    <li>{t("CAREERS.LIFE_DISABILITY_INSURANCE")}</li>
                    <li>{t("CAREERS.EMPLOYEE_PAID_LIFE_INSURANCE")}</li>
                    <li>{t("CAREERS.EMPLOYEE_PAID_ACCIDENTAL_DEATH")}</li>
                    <li>{t("CAREERS.LEGAL_BENEFITS")}</li>
                    <li>{t("CAREERS.IDENTITY_THEFT_PROTECTION")}</li>
                    <li>{t("CAREERS.PET_INSURANCE")}</li>
                  </ul>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={style.cardContainer}>
                  <h3 className={style.title}>{t("CAREERS.PAID_TIME_OFF")}</h3>
                  <ul>
                    <li>{t("CAREERS.PAID_VACATION_HOLIDAYS")}</li>
                    <li>{t("CAREERS.SICK_TIME_BEREAVEMENT_LEAVE")}</li>
                  </ul>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={style.cardContainer}>
                  <h3 className={style.title}>
                    {t("CAREERS.AMAZING_WORKING_ENVIRONMENT")}
                  </h3>
                  <ul>
                    <li>{t("CAREERS.GREAT_WORK_BALANCE")}</li>
                    <li>{t("CAREERS.HANDS_ON_TRAINING_PROGRAM")}</li>
                    <li>{t("CAREERS.UNMATCHED_EARNING_POTENTIAL")}</li>
                    <li>{t("CAREERS.CAREER_DEVELOPMENT_OPPORTUNITIES")}</li>
                    <li>{t("CAREERS.RUN_YOUR_OWN_BUSINESS")}</li>
                  </ul>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={style.cardContainer}>
                  <h3 className={style.title}>
                    {t("CAREERS.SIGNATURE_DISCOUNTS_FOR_EMPLOYEE")}
                  </h3>
                  <ul>
                    <li>{t("CAREERS.PROVIDED_BY_PERKSPOT")}</li>
                    <li>{t("CAREERS.EXCLUSIVE_ONLINE_DISCOUNTS")}</li>
                  </ul>
                </Card>
              </Grid>
              <Grid item xs={12} md={4}>
                <Card className={style.cardContainer}>
                  <h3 className={style.title}>
                    {t("CAREERS.SAVING_FOR_FUTURE")}
                  </h3>
                  <ul>
                    <li>{t("CAREERS.PLAN")}</li>
                  </ul>
                </Card>
              </Grid>
            </Grid>
            <Button
              className={style.applyButton}
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
              onClick={() => window.open(CTA_LINK, "_blank")}
              data-testid="FindYourCareer"
            >
              {t("CAREERS.APPLY_NOW")}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Careers;
