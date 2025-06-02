import { Button, Grid } from "@mui/material";
import style from "./LensSelection.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import Link from "next/link";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { CTLBanner } from "@/components/banner";
import { BRAND } from "@root/host/src/constants/common.constants";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

const LENS_SELECTION_IMAGES = ImageUrlConstants.LENS_SELECTION;

const LensSelection = (props: any) => {
  const { brand } = props;
  const router = useRouter();
  const { t } = useTranslation();

  return (
    <div className={`${brand == BRAND.MEL?style.melLensSelectionContainer:""} ${style.lensSelectionContainer}`}>
      <CTLBanner
        banner={{
          mobile: {
            alt: t("LENSES_THAT_SUIT_YOU.HEADING"),
            src: brand == BRAND.MEL ? LENS_SELECTION_IMAGES.MEL_MOBILE_BANNER : LENS_SELECTION_IMAGES.MOBILE_BANNER,
          },
          tabletAndDesktop: {
            alt: t("LENSES_THAT_SUIT_YOU.HEADING"),
            src: brand == BRAND.MEL ? LENS_SELECTION_IMAGES.MEL_DESKTOP_BANNER : LENS_SELECTION_IMAGES.DESKTOP_BANNER,
          },
        }}
        title={{
          as: "h1",
          text: t("LENSES_THAT_SUIT_YOU.HEADING"),
          className: style["banner-title"],
        }}
      />

      <div className={style.gridContainer}>
        <div className={style.contentContainer}>
          <div className={style.content}>
            <p>
              {t("LENSES_THAT_SUIT_YOU.WITH_SO_MANY")}{" "}
              <Link
                className={style.linkText}
                href="/schedule-exam/"
                target="_blank"
              >
                {t("LENSES_THAT_SUIT_YOU.SEE_A_MEMBER")}
              </Link>
            </p>
            <h2>{t("LENSES_THAT_SUIT_YOU.HOW_TO_SELECT")}</h2>
            <h3>{t("LENSES_THAT_SUIT_YOU.STEP_1")}</h3>
            <h4>{t("LENSES_THAT_SUIT_YOU.SINGLE_VISION")}</h4>
            <p>{t("LENSES_THAT_SUIT_YOU.FEATURES_A_SINGLE_FIELD")}</p>
            <h4>{t("LENSES_THAT_SUIT_YOU.MULTIFOCAL")}</h4>
            <p>{t("LENSES_THAT_SUIT_YOU.OUR_EYES_CHANGE")}</p>
            <ul>
              <li>{t("LENSES_THAT_SUIT_YOU.BIFOCALS")}</li>
              <li>{t("LENSES_THAT_SUIT_YOU.PROGRESSIVES")}</li>
            </ul>
            <h3>{t("LENSES_THAT_SUIT_YOU.STEP_2")}</h3>
            <Grid container spacing={4}>
              <Grid item xs={12} md={12}>
                <h4>{t("LENSES_THAT_SUIT_YOU.PLASTIC")}</h4>
                <ul>
                  <li>{t("LENSES_THAT_SUIT_YOU.GOOD_OPTICAL_QUALITY")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.BEST_SUITED")}</li>
                  <li>
                    {t("LENSES_THAT_SUIT_YOU.RECOMMENDED_FOR_PRESCRIPTION")}
                  </li>
                </ul>
              </Grid>
              <Grid item xs={12} md={12}>
                <h4 className={style.mt0}>
                  {t("LENSES_THAT_SUIT_YOU.POLYCARBONATE")}
                </h4>
                <ul>
                  <li>{t("LENSES_THAT_SUIT_YOU.THINNER_AND_LIGHTER")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.IMPACT_AND_SCRATCH")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.UV_PROTECTION")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.PERFECT_FOR_CHILDREN")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.RECOMMENDED")}</li>
                </ul>
              </Grid>
              <Grid item xs={12} md={12}>
                <h4 className={style.mt0}>
                  {t("LENSES_THAT_SUIT_YOU.HI_INDEX")}
                </h4>
                <ul>
                  <li>{t("LENSES_THAT_SUIT_YOU.EXCEPTIONALLY_THIN")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.TOP_QUALITY")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.UV_PROTECTION")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.RECOMMEND")}</li>
                </ul>
              </Grid>
            </Grid>
            <h3>{t("LENSES_THAT_SUIT_YOU.STEP_3")}</h3>
            <p className={style.step3}>
              {t("LENSES_THAT_SUIT_YOU.OFFERING_LENS")}
            </p>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <h4>{t("LENSES_THAT_SUIT_YOU.STANDARD")}</h4>
                <ul>
                  <li>
                    {t("LENSES_THAT_SUIT_YOU.CONSISTENT_ANTI_REFLECTIVE_LENS")}
                  </li>
                  <li>{t("LENSES_THAT_SUIT_YOU.MORE_SCRATCH_RESISTANT_1")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.EASY_CLEANING")}</li>
                </ul>
              </Grid>
              <Grid item xs={12} md={6}>
                <h4>{t("LENSES_THAT_SUIT_YOU.PREMIUM")}</h4>
                <ul>
                  <li>{t("LENSES_THAT_SUIT_YOU.WIDER_RANGE_OF_VISION")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.MAXIMUM_ANTI_REFLECTIVE")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.MORE_SCRATCH_RESISTANT_2")}</li>
                  <li>
                    {t("LENSES_THAT_SUIT_YOU.THE_HIGHEST_LIGHT_TRANSMISSION")}
                  </li>
                  <li>
                    {t("LENSES_THAT_SUIT_YOU.SUPERIOR_CLEANING_CAPABILITIES")}
                  </li>
                  <li>{t("LENSES_THAT_SUIT_YOU.ANTI_STATIC_PROPERTIES")}</li>
                </ul>
              </Grid>
            </Grid>
            <h3>{t("LENSES_THAT_SUIT_YOU.STEP_4")}</h3>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <h4>{t("LENSES_THAT_SUIT_YOU.TRUBLUE_LENSES")}</h4>
                <ul>
                  <li>
                    {t(
                      "LENSES_THAT_SUIT_YOU.ALSO_KNOWN_AS_BLUE_LIGHT_FILTERING_LENSES",
                    )}
                  </li>
                  <li>{t("LENSES_THAT_SUIT_YOU.REDUCES_EYE_FATIGUE")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.MORE_SCRATCH_RESISTANT_3")}</li>
                  <li>
                    {t(
                      "LENSES_THAT_SUIT_YOU.SUPERIOR_CLEANING_CAPABILITIES_DUE_TO_WATER",
                    )}
                  </li>
                  <li>{t("LENSES_THAT_SUIT_YOU.ANTI_STATIC_PROPERTIES")}</li>
                </ul>
              </Grid>
              <Grid item xs={12} md={6}>
                <h4>{t("LENSES_THAT_SUIT_YOU.PHOTOCHROMIC_LENSES")}</h4>
                <ul>
                  <li>
                    {t(
                      "LENSES_THAT_SUIT_YOU.ALSO_KNOWN_AS_LIGHT_RESPONSIVE_LENSES",
                    )}
                  </li>
                  <li>{t("LENSES_THAT_SUIT_YOU.WILL_DARKEN_WHEN_EXPOSED")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.IDEAL_CHOICE")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.PHOTOCHROMIC_LENSES_CAN")}</li>
                </ul>
              </Grid>

              <Grid item xs={12} md={6}>
                <h4>{t("LENSES_THAT_SUIT_YOU.TINTED_LENSES")}</h4>
                <ul>
                  <li>
                    {t("LENSES_THAT_SUIT_YOU.FOR")}{" "}
                    <Link
                      className={style.linkText}
                      href="/catalog/sunglasses/"
                      target="_blank"
                    >
                      {t("LENSES_THAT_SUIT_YOU.SUNGLASSES")}
                    </Link>
                    {t("LENSES_THAT_SUIT_YOU.COSMETIC_APPEAL")}
                  </li>
                  <li>{t("LENSES_THAT_SUIT_YOU.COLORS_AVAILABLE_1")}</li>
                </ul>
              </Grid>

              <Grid item xs={12} md={6}>
                <h4>{t("LENSES_THAT_SUIT_YOU.POLARIZED_LENSES")}</h4>
                <ul>
                  <li>
                    {t(
                      "LENSES_THAT_SUIT_YOU.POLARIZED_LENSES_FILTER_OUT_REFLECTED_LIGHT",
                    )}
                  </li>
                  <li>{t("LENSES_THAT_SUIT_YOU.IMPROVES_VISIBILITY")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.PERFECT_FOR_DRIVING")}</li>
                </ul>
              </Grid>

              <Grid item xs={12} md={6}>
                <h4>{t("LENSES_THAT_SUIT_YOU.MIRROR_LENSES")}</h4>
                <ul>
                  <li>{t("LENSES_THAT_SUIT_YOU.FASHION_FORWARD_LOOK")}</li>
                  <li>{t("LENSES_THAT_SUIT_YOU.COLORS_AVAILABLE_2")}</li>
                </ul>
              </Grid>
            </Grid>
            <h3 className={style.step4}>{t("LENSES_THAT_SUIT_YOU.STEP_5")}</h3>
            <Grid container spacing={4}>
              <Grid item xs={12} md={6}>
                <ul>
                  <li>
                    <b>{t("LENSES_THAT_SUIT_YOU.HARD_COAT_LENS_WARRANTY")}</b>{" "}
                    {t("LENSES_THAT_SUIT_YOU.WANT_SOME_ADDITIONAL_PROTECTION")}
                  </li>

                  <li>
                    <b>{t("LENSES_THAT_SUIT_YOU.UV")}</b>{" "}
                    {t("LENSES_THAT_SUIT_YOU.PROTECT_YOUR_EYES")}
                  </li>

                  <li>
                    <b>{t("LENSES_THAT_SUIT_YOU.ROLL_POLISH")}</b>{" "}
                    {t("LENSES_THAT_SUIT_YOU.IDEAL_FOR_RIMLESS")}
                  </li>
                </ul>
              </Grid>
            </Grid>
            <div className={style.buttonContainer}>
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
                onClick={() => router.push("/catalog/all-frames/")}
                data-testid="ShopEyeglasses"
              >
                {t("LENSES_THAT_SUIT_YOU.SHOP_EYEGLASSES")}
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LensSelection;
