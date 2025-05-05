import Link from "next/link";
import { useTranslation } from "react-i18next";

import { TelephoneNumber } from "@/components/telephone-number";
import { BRAND, MEL_DEFAULT_STORE_CONTACT_NUMBER, SO_DEFAULT_STORE_CONTACT_NUMBER } from "@/constants/common.constants";
import { SectionReference } from "../faq-sections.constants";
import styles from "../faq.module.scss";

export const InsuranceAndPaymentSection = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  }

  return (
    <section
      className={styles.content__article}
      id={SectionReference.INSURANCE_AND_PAYMENT_REF}
    >
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.SECTION_TITLE")}
      </h2>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.Q1")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A1.P1")}{" "}
        <Link
          href="/vision-insurance"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A1.P2")}
        </Link>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A1.P3")}
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.Q2")}
      </h3>
      <p>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A2.P1")}{" "}
        <Link
          href="/vision-insurance"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A2.P2")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A2.P3")}
      </p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.Q3")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A3")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.Q4")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A4")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.Q5")}
      </h3>
      <p>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A5")}</p>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.Q6")}
      </h3>

      <p>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.P1")}{" "}
        <TelephoneNumber telephone={brand == BRAND.MEL ? MEL_DEFAULT_STORE_CONTACT_NUMBER : SO_DEFAULT_STORE_CONTACT_NUMBER} />
      </p>

      <table className={styles.table} border={1}>
        <thead>
          <tr>
            <th>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PR1")}</th>
            <th>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PC1")}</th>
          </tr>
        </thead>

        <tbody>
          <tr>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PR2")}</td>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PC2")}</td>
          </tr>
          <tr>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PR3")}</td>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PC3")}</td>
          </tr>
          <tr>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PR4")}</td>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PC4")}</td>
          </tr>
          <tr>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PR5")}</td>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PC5")}</td>
          </tr>
          <tr>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PR6")}</td>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PC6")}</td>
          </tr>
          <tr>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PR7")}</td>
            <td>{t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A6.PC7")}</td>
          </tr>
        </tbody>
      </table>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.Q7")}
      </h3>

      <p>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A7.P1")}{" "}
        <Link
          href="/special-offers/insurance-offer/"
          rel="noopener noreferrer"
          target="_blank"
        >
          {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A7.P2")}
        </Link>
        {t(getBrandInitial() + "FAQ.INSURANCE_PAYMENT.A7.P3")}
      </p>
    </section>
  );
};

InsuranceAndPaymentSection.displayName = "InsuranceAndPaymentSection";
