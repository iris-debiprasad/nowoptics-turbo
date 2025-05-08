import React from "react";
import Image from "next/image";
import Link from "next/link";

import styles from "./vision-insurance.module.scss";
import { InsurancePostItem } from "./insurance-post-item";
import { INSURANCE_POST_ITEMS } from "./insurance-posts.constants";
import { InsurancePlansSelector } from "@/components/insurance-plans-selector";
import { useTranslation } from "react-i18next";
import { CTLBanner } from "@/components/banner";
import { BRAND } from "@root/host/src/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

export const VisionInsurance = (): JSX.Element => {
  const { t } = useTranslation();
  const brand = useGetBrand();

  const isMEL: boolean = brand === BRAND.MEL;
  const prefix = isMEL ? "MEL_" : "";
  const images = ImageUrlConstants.VISION_INSURANCE["SO"];

  const topBanner = {
    title: `${t("VISION_INSURANCE.BANNER_TITLE")}${
      isMEL ? `<br/>${t("VISION_INSURANCE.BANNER_SUBTITLE")}` : ""
    }`,
    subtitle: isMEL ? "" : t("VISION_INSURANCE.BANNER_SUBTITLE"),
  };

  return (
    <>
      <CTLBanner
        banner={{
          mobile: {
            alt: t(`VISION_INSURANCE.VISION_INSURANCE`),
            src: images.TOP_BANNER.MOBILE,
          },
          tabletAndDesktop: {
            alt: t("VISION_INSURANCE.VISION_INSURANCE"),
            src: images.TOP_BANNER.DESKTOP,
          },
        }}
        title={{
          as: "p",
          className: `${styles["banner-title"]} ${isMEL ? styles.mel : ""}`,
          text: topBanner.title,
        }}
        {...(!isMEL && {
          subtitle: {
            as: "span",
            className: styles["banner-subtitle"],
            text: topBanner.subtitle,
          },
        })}
      />

      <article className={styles.container}>
        <h1 className="informational-page-title" tabIndex={0}>
          {t(`VISION_INSURANCE.INSURANCE_OPTIONS`)}
        </h1>
        <p>
          {t(`VISION_INSURANCE.MANY_COMPANIES`)}{" "}
          <Link href="/eye-exam">{t(`VISION_INSURANCE.EYE_EXAMS`)}</Link>{" "}
          {t(`VISION_INSURANCE.AND_DISCOUNTS_ON`)}
        </p>
        <p>
          {t(`VISION_INSURANCE.FOR_THIS_REASON.P1`)}
          {t(`VISION_INSURANCE.FOR_THIS_REASON.${prefix}P2`)}{" "}
          {t(`VISION_INSURANCE.FOR_THIS_REASON.P3`)}
        </p>
        <p>{t(`VISION_INSURANCE.MEDICARE_USUALLY_DOES`)}</p>
        <p>
          {t(`VISION_INSURANCE.STANTON_OPTICAL_ACCEPTS.${prefix}P1`)}
          {t(`VISION_INSURANCE.STANTON_OPTICAL_ACCEPTS.P2`)}
        </p>

        <section className={styles["section-limiter-spacing"]}>
          <h2
            className={`informational-page-subtitle text-center ${styles["insurance-plans-headline"]}`}
            tabIndex={0}
          >
            {t(`VISION_INSURANCE.SEE_WHICH_INSURANCE_PLANS`)}
          </h2>
          <InsurancePlansSelector />
        </section>

        <Link className={styles["insurance-faq-img"]} href="/faq">
          <Image
            alt="Insurance FAQs."
            className="img"
            width={1200}
            height={160}
            src={images.MIDDLE_BANNER}
          />
        </Link>

        <h2
          className={`informational-page-subtitle text-center ${styles["insurance-plans-headline"]}`}
          tabIndex={0}
        >
          {t(`VISION_INSURANCE.MORE_INSURANCE_BENEFITS.P1`)}
          {t(`VISION_INSURANCE.MORE_INSURANCE_BENEFITS.${prefix}P2`)}
        </h2>

        <section className={styles.posts}>
          {INSURANCE_POST_ITEMS(isMEL).map((item) => (
            <InsurancePostItem key={item.title} {...item} />
          ))}
        </section>
      </article>
    </>
  );
};
