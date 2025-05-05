import Link from "next/link";
import { SectionReference } from "../faq-sections.constants";
import styles from "../faq.module.scss";
import { LinkVideoModal } from "../link-video-modal";
import { useTranslation } from "react-i18next";
import { BRAND } from "@/constants/common.constants";

export const ProductsSection = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  };

  return (
    <section
      className={styles.content__article}
      id={SectionReference.PRODUCTS_REF}
    >
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.PRODUCTS.SECTION_TITLE")}
      </h2>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q1")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A1")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q2")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A2")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q3")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A3")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q4")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A4")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q5")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A5")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q6")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A6")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q7")}
      </h3>

      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A7.P1")}</p>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A7.P2")}</p>
      <ul style={{ marginBlock: 16 }}>
        <li>
          <strong>{t(getBrandInitial() + "FAQ.PRODUCTS.A7.P3")}</strong>{" "}
          {t(getBrandInitial() + "FAQ.PRODUCTS.A7.P4")}
        </li>

        <li>
          <strong>{t(getBrandInitial() + "FAQ.PRODUCTS.A7.P5")}</strong>{" "}
          {t(getBrandInitial() + "FAQ.PRODUCTS.A7.P6")}
        </li>
      </ul>
      <p> {t(getBrandInitial() + "FAQ.PRODUCTS.A7.P7")}</p>
      <ul style={{ marginBlock: 16 }}>
        <li>
          <strong>{t(getBrandInitial() + "FAQ.PRODUCTS.A7.P8")}</strong>{" "}
          {t(getBrandInitial() + "FAQ.PRODUCTS.A7.P9")}
        </li>

        <li>
          <strong>{t(getBrandInitial() + "FAQ.PRODUCTS.A7.P10")}</strong>{" "}
          {t(getBrandInitial() + "FAQ.PRODUCTS.A7.P11")}
        </li>
      </ul>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q8")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A8.P1")} </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q9")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P1")}</p>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P2")} </p>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P5")}</p>
      <ol style={{ marginBlock: 16 }}>
        <li>
          {t(getBrandInitial() + "FAQ.PRODUCTS.A9.P6")}{" "}
          <a
            href={
              BASE_IMAGE_URL +
              "m/1aed8e38171c4e05/original/SO_mminchRuler_instructions.pdf"
            }
            rel="noopener noreferrer"
            target="_blank"
          >
            {t(getBrandInitial() + "FAQ.PRODUCTS.A9.P7")}
          </a>
          {t(getBrandInitial() + "FAQ.PRODUCTS.A9.P8")}
        </li>

        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P9")}</li>
      </ol>

      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P10")}</p>

      <ul style={{ marginBlock: 16 }}>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P11")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P12")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P13")}</li>
      </ul>

      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P14")}</p>

      <ol style={{ marginBlock: 16 }}>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P15")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P16")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P17")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P18")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P19")}</li>
      </ol>

      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P20")}</p>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P21")}</p>
      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P22")}</p>

      <ul style={{ marginBlock: 16 }}>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P23")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P24")}</li>
        <li>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P25")}</li>
      </ul>

      <p>{t(getBrandInitial() + "FAQ.PRODUCTS.A9.P26")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q10")}
      </h3>

      <p>
        {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P1")}{" "}
        <Link href="/pd-measurement" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P2")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P3")}
      </p>

      <p>
        {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P4")}{" "}
        <Link href="/my-account" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P5")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P6")}
        <Link
          href="/catalog/all-frames"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P7")}
        </Link>
        {t(getBrandInitial() + "FAQ.PRODUCTS.A10.P8")}
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.PRODUCTS.Q11")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.PRODUCTS.A11.P1")}{" "}
        <Link
          href="/catalog/contacts"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.PRODUCTS.A11.P2")}
        </Link>
      </p>
    </section>
  );
};

ProductsSection.displayName = "ProductsSection";
