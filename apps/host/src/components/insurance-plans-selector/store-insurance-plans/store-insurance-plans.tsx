import React from "react";
import { useTranslation } from "react-i18next";

import {
  BRAND,
  MEL_DEFAULT_STORE_CONTACT_NUMBER,
  SO_DEFAULT_STORE_CONTACT_NUMBER,
} from "@/constants/common.constants";
import { TelephoneNumber } from "@/components/telephone-number";

import { useGetBrand } from "@/hooks/useGetBrand";
import { CheckboxIcon } from "./icons/checkbox";
import { InsurancePlan } from "./insurance-plan.interfaces";
import { getInsurancePlansByStoreId } from "./insurance-plans.api";
import styles from "./store-insurance-plans.module.scss";

export const StoreInsurancePlans = React.memo(
  ({ id }: { id?: number }): JSX.Element => {
    const { t } = useTranslation();
    const brand = useGetBrand();
    const [plans, setPlans] = React.useState<InsurancePlan[] | null>();

    React.useEffect(() => {
      if (!id) return;

      (async () => {
        const data = await getInsurancePlansByStoreId(id);
        setPlans(data);
      })();

      return () => setPlans(null);
    }, [id]);

    // ==== Render

    const doDisplayInsurancePlans: boolean =
      typeof id !== "undefined" && Boolean(plans);

    const isMEL: boolean = brand === BRAND.MEL;

    return (
      <section
        className={`${styles.container} ${
          doDisplayInsurancePlans ? styles.show : ""
        }`}
      >
        <div className={styles.container__content}>
          <h3 className={styles.container__title}>
            {t("INSURANCE_PLANS_COMPONENT.PLANS_TITLE")}
          </h3>

          <div className={styles.plans}>
            {plans?.map((plan) => (
              <p key={plan.Id} className={styles.plans__item}>
                <CheckboxIcon />
                {plan.Description}
              </p>
            ))}
          </div>

          <p className={styles.disclaimer}>
            {t("INSURANCE_PLANS_COMPONENT.PLANS_DISCLAIMER")}
          </p>

          <p className={styles.assistance}>
            {t("INSURANCE_PLANS_COMPONENT.PLANS_ASSISTANCE.P1")}{" "}
            <TelephoneNumber
              telephone={
                isMEL
                  ? MEL_DEFAULT_STORE_CONTACT_NUMBER
                  : SO_DEFAULT_STORE_CONTACT_NUMBER
              }
            />{" "}
            {t("INSURANCE_PLANS_COMPONENT.PLANS_ASSISTANCE.P2")}
          </p>
        </div>
      </section>
    );
  }
);

StoreInsurancePlans.displayName = "StoreInsurancePlans";
