import { ImageUrlConstants } from "@/constants/image.url.constants";
import { Props as InsurancePostItemProps } from "./insurance-post-item";

const IMAGES = ImageUrlConstants.VISION_INSURANCE;
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

export const INSURANCE_POST_ITEMS = (
  isMEL: boolean
): InsurancePostItemProps[] => [
  {
    image: {
      alt: "Insurance Offers",
      src: IMAGES["SO"].SIXTY_OFF_OFFER,
    },
    goTo: "/special-offers/insurance-offer",
    title: "Get 60% Off Your 2nd Pair Using Your Vision Insurance",
    content:
      "To help you maximize your savings, we’re now offering an additional 60% off discount to all customers who use their vision insurance to pay for their eyeglasses.",
  },
  {
    image: {
      alt: "Flexible Spending Accounts.",
      src:
        BASE_IMAGE_URL +
        "transform/706fc0f1-64af-42f6-9f21-ce4eb37f75af/HSA-FSA-600x260",
    },
    title: "FSA/HSA for Eye Care Needs",
    content:
      "Some employers offer flexible spending accounts or health savings accounts as part of your employee benefits package. Flex accounts allow you to appoint a portion of your pre-tax income into an account you can use to pay for medical expenses not covered by your regular health insurance plan—including eye care.",
  },
];
