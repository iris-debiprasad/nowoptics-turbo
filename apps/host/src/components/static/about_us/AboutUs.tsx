import Link from "next/link";
import { Card, Grid } from "@mui/material";
import { useTranslation } from "react-i18next";

import { CTLBanner } from "@/components/banner";
import style from "./AboutUs.module.scss";
import { useGetBrand } from "@/hooks/useGetBrand";
import { BRAND } from "@root/host/src/constants/common.constants";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

const AboutUs = () => {
  const { t } = useTranslation();
  const brand = useGetBrand();
  const IMAGES = ImageUrlConstants.ABOUT_US;

  const getBannerUrlByBrand = (
    device: "mobile" | "tabletAndDesktop",
    brand = ""
  ) => {
    const bannerUrls = {
      mobile: {
        [BRAND.MEL]: IMAGES.MEL.MOBILE_BANNER,
        [BRAND.SO]: IMAGES.SO.MOBILE_BANNER,
      },
      tabletAndDesktop: {
        [BRAND.MEL]: IMAGES.MEL.DESKTOP_BANNER,
        [BRAND.SO]: IMAGES.SO.DESKTOP_BANNER,
      },
    };

    return bannerUrls[device]?.[brand] || "";
  };

  return (
    <div className={style.aboutUsContainer}>
      <CTLBanner
        banner={{
          mobile: {
            alt: t("ABOUT_US.BANNER_TITLE"),
            src: getBannerUrlByBrand("mobile", brand),
          },
          tabletAndDesktop: {
            alt: t("ABOUT_US.BANNER_TITLE"),
            src: getBannerUrlByBrand("tabletAndDesktop", brand),
          },
        }}
        title={{
          as: "p",
          text: brand === BRAND.MEL ? "ABOUT US" : t("ABOUT_US.BANNER_TITLE"),
          className: "colorVisionTestBannerTitle",
        }}
      />

      <div className={style.gridContainer}>
        <div className={style.contentContainer}>
          <div className={style.content}>
            <h1>{t("ABOUT_US.WE_MAKE_EYE_CARE_EASY")}</h1>
            {brand === BRAND.SO && (
              <>
                <p>{t("ABOUT_US.SINCE_OPENING")}</p>
                <p>{t("ABOUT_US.WE_UNDERSTAND")}</p>
                <p>{t("ABOUT_US.AS_ALWAYS")}</p>
              </>
            )}
            {brand === BRAND.MEL && (
              <>
                <p>
                  My Eyelab first opened its doors in 2013 serving the
                  Jacksonville community in Florida. Its fresh, contemporary
                  look and technology-based experience makes finding the perfect
                  eyewear fun. Since 2016, My Eyelab has led the optical
                  industry in ocular telehealth by leveraging our proprietary
                  innovative software technology to provide patients with a
                  state-of-the-art eye exam that is safe, reliable, and
                  affordable.{" "}
                </p>
                <p>
                  At My Eyelab, we design our own frames and work directly with
                  eyewear manufacturers to pass significant savings on to you.
                  We carry unique styles and designer brands with over 2,000
                  frames to choose from for Women’s, Men’s, and Kids, including
                  all the top contact brands.{" "}
                </p>
                <p>
                  We use the latest technology and computer automated machinery
                  in our optical lab. Our lab technicians cut, polish, and grind
                  lenses to customize every pair. The lenses are assembled and
                  mounted into the frames the customer has chosen. The glasses
                  then receive a quality assurance check before being delivered
                  to the store, ready for customer pick-up.{" "}
                </p>
                <p>
                  Our customers are our top priority. My Eyelab’s knowledgeable
                  and friendly team is dedicated to helping you find your
                  perfect fit and guiding you through the process for the best
                  experience. We are continually expanding our locations to
                  provide our convenient services near you. Keep an eye out for
                  a new My Eyelab store in your area!{" "}
                </p>
              </>
            )}
            <div className={style.visionMissionTitle}>
              <div className={style.visionTitle}>
                <h2>{t("ABOUT_US.VISION")}</h2>
                <p>{t("ABOUT_US.WE_BELIEVE")}</p>
              </div>
              <div>
                <h2>{t("ABOUT_US.MISSION")}</h2>
                <p>{t("ABOUT_US.MAKING_EYE_CARE_EASY")}</p>
              </div>
            </div>
            <div className={style.valueTitle}>
              <h2>{t("ABOUT_US.VALUES")}</h2>
            </div>
            <Grid container spacing={4}>
              <Grid item xs={12} md>
                <Card className={style.cardContainer}>
                  <div className="aboutUsValuesCircle">
                    <div className="aboutUsValuesCircleTitle">
                      {t("ABOUT_US.I")}
                    </div>
                  </div>
                  <h4>{t("ABOUT_US.INTEGRITY")}</h4>
                  <p>{t("ABOUT_US.WE_SEE_INTEGRITY")}</p>
                </Card>
              </Grid>
              <Grid item xs={12} md>
                <Card className={style.cardContainer}>
                  <div className="aboutUsValuesCircle">
                    <div className="aboutUsValuesCircleTitle">
                      {t("ABOUT_US.C")}
                    </div>
                  </div>
                  <h4>{t("ABOUT_US.COLLABORATION")}</h4>
                  <p>{t("ABOUT_US.WE_SEE_COLLABORATION")}</p>
                </Card>
              </Grid>
              <Grid item xs={12} md>
                <Card className={style.cardContainer}>
                  <div className="aboutUsValuesCircle">
                    <div className="aboutUsValuesCircleTitle">
                      {t("ABOUT_US.A")}
                    </div>
                  </div>
                  <h4>{t("ABOUT_US.ACCOUNTABILITY")}</h4>
                  <p>{t("ABOUT_US.WE_SEE_ACCOUNTABILITY")}</p>
                </Card>
              </Grid>
              <Grid item xs={12} md>
                <Card className={style.cardContainer}>
                  <div className="aboutUsValuesCircle">
                    <div className="aboutUsValuesCircleTitle">
                      {t("ABOUT_US.R")}
                    </div>
                  </div>
                  <h4>{t("ABOUT_US.RESPECT")}</h4>
                  <p>{t("ABOUT_US.WE_SEE_RESPECT")}</p>
                </Card>
              </Grid>
              <Grid item xs={12} md>
                <Card className={style.cardContainer}>
                  <div className="aboutUsValuesCircle">
                    <div className="aboutUsValuesCircleTitle">
                      {t("ABOUT_US.E")}
                    </div>
                  </div>
                  <h4>{t("ABOUT_US.EMPOWERMENT")}</h4>
                  <p>{t("ABOUT_US.WE_SEE_EMPOWERMENT")}</p>
                </Card>
              </Grid>
            </Grid>
            <div className="aboutus-disclaimer">
              <p>
                {t("ABOUT_US.FOR_MORE_INFORMATION")}{" "}
                <Link href="https://nowoptics.com/" target="_blank">
                  {t("ABOUT_US.CLICK_HERE")}
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AboutUs;
