import { FAQItem } from "@/components/faq";
import { UseTranslationResponse } from "react-i18next";
import { ImageUrlConstants } from "@/constants/image.url.constants";

const BOPIS_IMAGES = ImageUrlConstants.BOPIS;

export interface HowItWorksItem {
  description: string;
  href?: string;
  icon: { alt: string; src: string };
  title: string;
}

export const HOW_IT_WORKS_ITEMS = ({
  t,
}: UseTranslationResponse<"translation", undefined>): HowItWorksItem[] => [
  {
    href: "/catalog/all-frames",
    icon: {
      alt: t("BOPIS.SHOP_FRAMES_ALT"),
      src: BOPIS_IMAGES.SHOP_FRAMES_ICON,
    },
    description: t("BOPIS.SHOP_FRAMES_DESC"),
    title: t("BOPIS.SHOP_FRAMES_TITLE"),
  },
  {
    icon: {
      alt: t("BOPIS.GET_NOTIFIED_ALT"),
      src: BOPIS_IMAGES.GET_NOTIFIED_ICON,
    },
    description: t("BOPIS.GET_NOTIFIED_DESC"),
    title: t("BOPIS.GET_NOTIFIED_TITLE"),
  },
  {
    icon: {
      alt: t("BOPIS.EASY_PICKUP_ALT"),
      src: BOPIS_IMAGES.EASY_PICKUP_ICON,
    },
    description: t("BOPIS.EASY_PICKUP_DESC"),
    title: t("BOPIS.EASY_PICKUP_TITLE"),
  },
];

const TOTAL_FAQ_QUESTIONS = 10;

export const FAQs = ({
  t,
}: UseTranslationResponse<"translation", undefined>): FAQItem[] =>
  [...new Array(TOTAL_FAQ_QUESTIONS)].map((_, index) => ({
    question: t(`BOPIS.Q${index + 1}`),
    answer: t(`BOPIS.A${index + 1}`),
  }));
