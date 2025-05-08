import { useTranslation } from "react-i18next";
import Link from "next/link";

import { SectionReference } from "../faq-sections.constants";
import styles from "../faq.module.scss";
import { BRAND } from "@root/host/src/constants/common.constants";

export const PricingAndPromotionsSection = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  }

  return (
    <section
      className={styles.content__article}
      id={SectionReference.PRICING_AND_PROMOTIONS_REF}
    >
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.SECTION_TITLE")}
      </h2>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q1")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A1.P1")}{" "}
        <Link
          href={brand == BRAND.MEL ? "/special-offers/2-for-95/" : "/special-offers/2-for-79-same-day"}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A1.P2")}
        </Link>
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q2")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A2.P1")}{" "}
        <Link href="/special-offers" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A2.P2")}
        </Link>
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q3")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A3.P1")}{" "}
        <Link
          href={brand == BRAND.MEL ? "/special-offers/2-for-159-progressives/" : "/special-offers/2-for-135-progressives"}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A3.P2")}
        </Link>
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q4")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A4.P1")}{" "}
        <Link href="/special-offers" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A4.P2")}
        </Link>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A4.P3")}
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q5")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A5.P1")}{" "}
        <Link href="/special-offers" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A5.P2")}
        </Link>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A5.P3")}
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q6")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A6")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q7")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A7")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q8")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A8.P1")}{" "}
        <Link
          href={brand == BRAND.MEL ? "/special-offers/cvp-biotrue/" : "/special-offers/cvp_biotrue/"}
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A8.P2")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A8.P3")}{" "}
        <Link href="/schedule-exam/" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A8.P4")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A8.P5")}
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.Q9")}
      </h3>

      <p>
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P1")}{" "}
        <strong>{t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P2")}</strong>{" "}
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P3")}{" "}
        <Link
          href="/special-offers/frame-club"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P4")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P5")}
      </p>

      <p>
        <strong>{t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P6")}</strong>{" "}
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P7")}{" "}
        <Link
          href="/special-offers/contacts-club"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P8")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.PRICING_PROMOTION.A9.P9")}
      </p>
    </section>
  );
};

PricingAndPromotionsSection.displayName = "PricingAndPromotionsSection";
