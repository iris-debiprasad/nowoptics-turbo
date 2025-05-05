import Link from "next/link";
import { SectionReference } from "../faq-sections.constants";
import { TelephoneNumber } from "@/components/telephone-number";
import { BRAND, MEL_DEFAULT_STORE_CONTACT_NUMBER, SO_DEFAULT_STORE_CONTACT_NUMBER } from "@/constants/common.constants";

import styles from "../faq.module.scss";
import { useTranslation } from "react-i18next";

export const MyOrderSection = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  }

  return (
    <section className={styles.content__article} id={SectionReference.MY_ORDER}>
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.MY_ORDER.SECTION_TITLE")}
      </h2>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.MY_ORDER.Q1")}</h3>
      <p>{t(getBrandInitial() + "FAQ.MY_ORDER.A1")}</p>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.MY_ORDER.Q2")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.MY_ORDER.A2.P1")}{" "}
        <Link href="/order-status" rel="noopener noreferrer" target="_blank">
          {t(getBrandInitial() + "FAQ.MY_ORDER.A2.P2")}
        </Link>
      </p>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.MY_ORDER.Q3")}</h3>
      <p>{t(getBrandInitial() + "FAQ.MY_ORDER.A3")}</p>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.MY_ORDER.Q4")}</h3>
      <p>{t(getBrandInitial() + "FAQ.MY_ORDER.A4")}</p>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.MY_ORDER.Q5")}</h3>
      <p>
        {t(getBrandInitial() + "FAQ.MY_ORDER.A5.P1")}{" "}
        <TelephoneNumber telephone={brand == BRAND.MEL ? MEL_DEFAULT_STORE_CONTACT_NUMBER : SO_DEFAULT_STORE_CONTACT_NUMBER} />{" "}
        {t(getBrandInitial() + "FAQ.MY_ORDER.A5.P2")}
      </p>
    </section>
  );
};

MyOrderSection.displayName = "MyOrderSection";
