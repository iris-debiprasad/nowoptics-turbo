import { UseTranslationResponse } from "react-i18next";

interface BaseLink {
  key: string;
}

export interface InterestLink extends BaseLink {
  text: string;
  href: string;
}

export interface FormulatedInterestLink extends BaseLink {
  formulate: (string | InterestLink)[];
}

export const INTEREST_LINKS = ({
  t,
}: UseTranslationResponse<"translate", undefined>): (
  | InterestLink
  | FormulatedInterestLink
)[] => [
    {
      key: "key001",
      href: "/schedule-exam",
      text: t("PAGE_NOT_FOUND.FIND_STORE"),
    },
    {
      key: "key002",
      href: "/special-offers",
      text: t("PAGE_NOT_FOUND.STORE_OFFERS"),
    },
    {
      key: "key003",
      href: "/",
      text: t("PAGE_NOT_FOUND.HOMEPAGE"),
    },
    {
      key: "key004",
      formulate: [
        t("PAGE_NOT_FOUND.BROWSE"),
        {
          key: "key0041",
          href: "/catalog/all-frames",
          text: t("PAGE_NOT_FOUND.GLASSES"),
        },
        "/",
        {
          key: "key0042",
          href: "/catalog/contacts",
          text: t("PAGE_NOT_FOUND.CONTACTS"),
        },
      ],
    },
    {
      key: "key005",
      href: "/order-status",
      text: t("PAGE_NOT_FOUND.CHECK_ORDER_STATUS"),
    },
    {
      key: "key006",
      href: "/faq",
      text: t("PAGE_NOT_FOUND.FAQs"),
    },
  ];
