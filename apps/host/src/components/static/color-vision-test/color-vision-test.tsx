import { useTranslation } from "react-i18next";

import { CTLBanner } from "@/components/banner";
import { VisionTest } from "./vision-test";
import styles from "./color-vision-test.module.scss";
import { BRAND } from "@/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";

import { ImageUrlConstants } from "@/constants/image.url.constants";

const COLOR_VISION_TEST_IMAGES = ImageUrlConstants.COLOR_VISION_TEST;

export const ColorVisionTest = (): JSX.Element => {
  const { t } = useTranslation();
  const brand = useGetBrand();

  const getBannerUrlByBrand = (
    device: "mobile" | "tabletAndDesktop",
    brand = ""
  ) => {
    const bannerUrls = {
      mobile: {
        [BRAND.MEL]: COLOR_VISION_TEST_IMAGES.MEL.MOBILE,
        [BRAND.SO]: COLOR_VISION_TEST_IMAGES.SO.MOBILE,
      },
      tabletAndDesktop: {
        [BRAND.MEL]: COLOR_VISION_TEST_IMAGES.MEL.DESKTOP,
        [BRAND.SO]: COLOR_VISION_TEST_IMAGES.SO.DESKTOP,
      },
    };

    return bannerUrls[device]?.[brand] || "";
  };

  return (
    <>
      <CTLBanner
        banner={{
          mobile: {
            alt: t("COLOR_VISION_TEST.BANNER_TITLE"),
            src: getBannerUrlByBrand("mobile", brand),
          },
          tabletAndDesktop: {
            alt: t("COLOR_VISION_TEST.BANNER_TITLE"),
            src: getBannerUrlByBrand("tabletAndDesktop", brand),
          },
        }}
        title={{
          as: "p",
          text:
            brand === BRAND.MEL
              ? t("COLOR_VISION_TEST.BANNER_TITLE_MEL")
              : t("COLOR_VISION_TEST.BANNER_TITLE"),
          className: "colorVisionTestBannerTitle",
        }}
      />

      <article className={styles.container}>
        <h1 className="informational-page-title">
          {t(`COLOR_VISION_TEST.TAKE_OUR_FREE`)}
        </h1>

        <p>{t(`COLOR_VISION_TEST.COLOR_BLINDNESS`)}</p>
        <p>{t(`COLOR_VISION_TEST.WHEN_YOU_ARE`)}</p>
        <p>{t(`COLOR_VISION_TEST.COULD_YOU_BE`)}</p>

        <VisionTest />
      </article>
    </>
  );
};

ColorVisionTest.displayName = "ColorVisionTest";
