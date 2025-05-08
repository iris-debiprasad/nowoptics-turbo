import Link from "next/link";
import { useTranslation } from "react-i18next";

import { TelephoneNumber } from "@/components/telephone-number";
import { BRAND, MEL_DEFAULT_STORE_CONTACT_NUMBER, SO_DEFAULT_STORE_CONTACT_NUMBER } from "@root/host/src/constants/common.constants";
import { SectionReference } from "../faq-sections.constants";
import styles from "../faq.module.scss";

export const EyeExamSection = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  }

  return (
    <section
      className={styles.content__article}
      id={SectionReference.EYE_EXAM_REF}
    >
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.EYE_EXAM.SECTION_TITLE")}
      </h2>
      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q1")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A1.P1")}{" "}
        <Link href="/special-offers" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.EYE_EXAM.A1.P2")}
        </Link>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A1.P3")}
      </p>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q2")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A2.P1")}{" "}
        <Link href="/special-offers" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.EYE_EXAM.A2.P2")}
        </Link>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A2.P3")}
      </p>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q3")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A3.P1")}{" "}
        <Link href="/book-eye-exam" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.EYE_EXAM.A3.P2")}
        </Link>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A3.P3")}{" "}
        <Link href="/book-eye-exam" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.EYE_EXAM.A3.P4")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A3.P5")}{" "}
        <TelephoneNumber telephone={brand == BRAND.MEL ? MEL_DEFAULT_STORE_CONTACT_NUMBER : SO_DEFAULT_STORE_CONTACT_NUMBER} />{" "}
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A3.P6")}
      </p>
      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q4")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A4")}{" "}
        <TelephoneNumber telephone={brand == BRAND.MEL ? MEL_DEFAULT_STORE_CONTACT_NUMBER : SO_DEFAULT_STORE_CONTACT_NUMBER} />.
      </p>
      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q5")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A5.P1")}{" "}
        <Link href="/eye-exam" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.EYE_EXAM.A5.P2")}
        </Link>
      </p>
      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q6")}</h3>
      <p>{t(getBrandInitial() + "FAQ.EYE_EXAM.A6")}</p>
      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q7")}</h3>
      <div>
        <p>{t(getBrandInitial() + "FAQ.EYE_EXAM.A7.P1")}</p>

        <ol style={{ marginTop: 6 }}>
          <li>{t(getBrandInitial() + "FAQ.EYE_EXAM.A7.P2")}</li>
          <li>{t(getBrandInitial() + "FAQ.EYE_EXAM.A7.P3")}</li>
          <li>{t(getBrandInitial() + "FAQ.EYE_EXAM.A7.P4")}</li>
        </ol>
      </div>
      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q8")}</h3>
      <p>{t(getBrandInitial() + "FAQ.EYE_EXAM.A8")}</p>
      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.EYE_EXAM.Q9")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A9.P1")}{" "}
        <Link href="/eye-exam" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.EYE_EXAM.A9.P2")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.EYE_EXAM.A9.P3")}
      </p>
    </section>
  );
};

EyeExamSection.displayName = "EyeExamSection";
