import Link from "next/link";
import { SectionReference } from "../faq-sections.constants";
import styles from "../faq.module.scss";
import { TelephoneNumber } from "@/components/telephone-number";
import { BRAND, MEL_DEFAULT_STORE_CONTACT_NUMBER, SO_DEFAULT_STORE_CONTACT_NUMBER } from "@root/host/src/constants/common.constants";
import { useTranslation } from "react-i18next";

export const StoreSection = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  }

  return (
    <section
      className={styles.content__article}
      id={SectionReference.STORE_REF}
    >
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.STORE.SECTION_TITLE")}
      </h2>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.STORE.Q1")}</h3>

      <p>
        {t(getBrandInitial() + "FAQ.STORE.A1.P1")}{" "}
        <Link href="/schedule-exam" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.STORE.A1.P2")}
        </Link>{" "}
        {t(getBrandInitial() + "FAQ.STORE.A1.P3")}{" "}
        <TelephoneNumber telephone={brand == BRAND.MEL ? MEL_DEFAULT_STORE_CONTACT_NUMBER : SO_DEFAULT_STORE_CONTACT_NUMBER} />{" "}
        {t(getBrandInitial() + "FAQ.STORE.A1.P4")}{" "}
        <Link href="/schedule-exam" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.STORE.A1.P5")}
        </Link>
      </p>
    </section>
  );
};

StoreSection.displayName = "StoreSection";
