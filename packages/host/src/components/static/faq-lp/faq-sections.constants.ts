import { UseTranslationResponse } from "react-i18next";

interface QuickJumpItem {
  label: string;
  to: string;
}

export enum SectionReference {
  APPOINTMENT_REF = "appointment",
  COVID19_REF = "covid-19",
  EYE_EXAM_REF = "eye-exam",
  INSURANCE_AND_PAYMENT_REF = "insurance-and-payment",
  MY_ORDER = "my-order",
  PRESCRIPTION_RENEWAL = "prescription-renewal",
  PRICING_AND_PROMOTIONS_REF = "pricing-and-promotions",
  PRODUCTS_REF = "products",
  RETURN_POLICY_REF = "return-policy",
  STORE_REF = "store",
}

export const QUICK_JUMPS = ({
  t,
}: UseTranslationResponse<"translation", undefined>): QuickJumpItem[] => [
    {
      label: t("FAQ.APPOINTMENT.SECTION_TITLE"),
      to: SectionReference.APPOINTMENT_REF,
    },
    {
      label: t("FAQ.STORE.SECTION_TITLE"),
      to: SectionReference.STORE_REF,
    },
    {
      label: t("FAQ.EYE_EXAM.SECTION_TITLE"),
      to: SectionReference.EYE_EXAM_REF,
    },
    {
      label: t("FAQ.PRICING_PROMOTION.SECTION_TITLE"),
      to: SectionReference.PRICING_AND_PROMOTIONS_REF,
    },
    {
      label: t("FAQ.INSURANCE_PAYMENT.SECTION_TITLE"),
      to: SectionReference.INSURANCE_AND_PAYMENT_REF,
    },
    {
      label: t("FAQ.PRODUCTS.SECTION_TITLE"),
      to: SectionReference.PRODUCTS_REF,
    },
    {
      label: t("FAQ.MY_ORDER.SECTION_TITLE"),
      to: SectionReference.MY_ORDER,
    },
    // {
    //   label: t("faq.online-prescription-renewal.section-title"),
    //   to: SectionReference.PRESCRIPTION_RENEWAL, // Commented by now, until the feature is done
    // },
    {
      label: t("FAQ.RETURN_POLICY.SECTION_TITLE"),
      to: SectionReference.RETURN_POLICY_REF,
    },
    {
      label: t("FAQ.SAFETY_MEASURES.SECTION_TITLE"),
      to: SectionReference.COVID19_REF,
    },
  ];
