import React from "react";

import {
  AppointmentSection,
  Covid19Section,
  EyeExamSection,
  InsuranceAndPaymentSection,
  MyOrderSection,
  // PrescriptionRenewalSection,
  PricingAndPromotionsSection,
  ProductsSection,
  ReturnPolicySection,
  StoreSection,
} from "./sections";
import { NavigationMobile } from "./navigation-mobile";
import { Navigation } from "./navigation";
import styles from "./faq.module.scss";
import { useNavigationSpy } from "./use-navigation-spy";
import { useTranslation } from "react-i18next";
import { CTLBanner } from "@/components/banner";
import { BRAND } from "@/constants/common.constants";
import { ImageUrlConstants } from "@/constants/image.url.constants";

interface Props {
  brand: keyof typeof BRAND;
}

export const FAQLP = ({ brand }: Readonly<Props>): JSX.Element => {
  const navigationRef = React.useRef<HTMLDivElement>(null);
  const navigationSpy = useNavigationSpy();
  const { t } = useTranslation();

  return (
    <div className={`${brand == BRAND.MEL ? styles.melFaqContainer : ""}`}>
      <CTLBanner
        banner={{
          mobile: {
            alt: t("FAQ.PAGE_TITLE"),
            src: brand == BRAND.MEL ? ImageUrlConstants.FAQ.MEL.MOBILE_BANNER : ImageUrlConstants.FAQ.SO.MOBILE_BANNER,
          },
          tabletAndDesktop: {
            alt: t("FAQ.PAGE_TITLE"),
            src: brand == BRAND.MEL ? ImageUrlConstants.FAQ.MEL.DESKTOP_BANNER : ImageUrlConstants.FAQ.SO.DESKTOP_BANNER,
          },
        }}
        title={{
          as: "h1",
          className: styles["banner-title"],
          text: t("FAQ.PAGE_TITLE"),
        }}
      />

      <section className={styles.main}>
        <Navigation ref={navigationRef} {...navigationSpy} />

        <article className={styles.content}>
          <AppointmentSection {...{ brand }} />
          <StoreSection {...{ brand }} />
          <EyeExamSection {...{ brand }} />
          <PricingAndPromotionsSection {...{ brand }} />
          <InsuranceAndPaymentSection {...{ brand }} />
          <ProductsSection {...{ brand }} />
          <MyOrderSection {...{ brand }} />
          {/* <PrescriptionRenewalSection /> Uncomment when feature is done */}
          <ReturnPolicySection {...{ brand }} />
          <Covid19Section {...{ brand }} />
        </article>
      </section>

      <NavigationMobile {...{ navigationRef }} {...navigationSpy} />
    </div>
  );
};

FAQLP.displayName = "FAQLP";
