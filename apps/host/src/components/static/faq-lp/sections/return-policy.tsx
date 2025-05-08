import { useTranslation } from "react-i18next";

import { TelephoneNumber } from "@/components/telephone-number";
import { BRAND, MEL_DEFAULT_STORE_CONTACT_NUMBER, SO_DEFAULT_STORE_CONTACT_NUMBER } from "@root/host/src/constants/common.constants";
import { SectionReference } from "../faq-sections.constants";
import styles from "../faq.module.scss";

export const ReturnPolicySection = (props: any): JSX.Element => {
  const { t } = useTranslation();
  const { brand } = props;

  const getBrandInitial = () => {
    return brand == BRAND.MEL ? "MEL_" : "";
  }

  return (
    <section
      className={styles.content__article}
      id={SectionReference.RETURN_POLICY_REF}
    >
      <h2 className="informational-page-subtitle">
        {t(getBrandInitial() + "FAQ.RETURN_POLICY.SECTION_TITLE")}
      </h2>

      <h3 className={styles.content__question}>{t(getBrandInitial() + "FAQ.RETURN_POLICY.Q1")}</h3>
      <p>{t(getBrandInitial() + "FAQ.RETURN_POLICY.A1.P1")}</p>
      <p>
        {t(getBrandInitial() + "FAQ.RETURN_POLICY.A1.P2")}{" "}
        <TelephoneNumber telephone={brand == BRAND.MEL ? MEL_DEFAULT_STORE_CONTACT_NUMBER : SO_DEFAULT_STORE_CONTACT_NUMBER} />
        {t(getBrandInitial() + "FAQ.RETURN_POLICY.A1.P3")}
      </p>
      <p>{t(getBrandInitial() + "FAQ.RETURN_POLICY.A1.P4")}</p>
      <p>
        {t(getBrandInitial() + "FAQ.RETURN_POLICY.A1.P5")}{" "}
        <TelephoneNumber telephone={brand == BRAND.MEL ? MEL_DEFAULT_STORE_CONTACT_NUMBER : SO_DEFAULT_STORE_CONTACT_NUMBER} />.
      </p>
      <p>
        <small>{t(getBrandInitial() + "FAQ.RETURN_POLICY.A1.P6")}</small>
      </p>
    </section>
  );
};

ReturnPolicySection.displayName = "AppointmentSection";
