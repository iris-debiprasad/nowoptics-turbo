import { BRAND } from "@root/host/src/constants/common.constants";
import { SectionReference } from "../faq-sections.constants";
import styles from "../faq.module.scss";
import { useTranslation } from "react-i18next";

export const Covid19Section = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  }
  
  return (
    <section
      className={styles.content__article}
      id={SectionReference.COVID19_REF}
    >
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.SAFETY_MEASURES.SECTION_TITLE")}
      </h2>

      <h3 className={styles.content__question}>
        {t(getBrandInitial() + "FAQ.SAFETY_MEASURES.Q1")}
      </h3>

      <ul>
        <li>{t(getBrandInitial() + "FAQ.SAFETY_MEASURES.A1.P1")}</li>
        <li>{t(getBrandInitial() + "FAQ.SAFETY_MEASURES.A1.P2")}</li>
        <li>{t(getBrandInitial() + "FAQ.SAFETY_MEASURES.A1.P3")}</li>
      </ul>
    </section>
  );
};

Covid19Section.displayName = "Covid19Section";
