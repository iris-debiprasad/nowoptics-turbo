import { FooterLinkDTO } from "@/types/Footer.types";
import { ImageUrlConstants } from "./image.url.constants";

export const FooterConstants = {
  CONTACT_US: "CONTACT US",
};

export const STATIC_FOOTER = [
  {
    id: 1,
    title: "Eye Exam",
    link: "/eye-exam/",
    img: ImageUrlConstants.STATIC_FOOTER.EYE_EXAM,
  },
  {
    id: 2,
    title: "Offers",
    link: "/special-offers/",
    img: ImageUrlConstants.STATIC_FOOTER.OFFERS,
  },
  {
    id: 3,
    title: "Same-Day Glasses",
    link: "/same-day-glasses/",
    img: ImageUrlConstants.STATIC_FOOTER.SAMEDAY_GLASSES,
  },
  {
    id: 4,
    title: "My Account",
    link: "/my-account/",
    img: ImageUrlConstants.STATIC_FOOTER.MY_ACCOUNT,
  },
  {
    id: 5,
    title: "Live Help",
    link: "tel:8775185788",
    img: ImageUrlConstants.STATIC_FOOTER.LIVE_HELP,
  },
];

export const FooterData = [
  {
    id: "11",
    heading: "EYEGLASSES",
    menuStatus: false,
    menus: [
      { id: 1, value: "Men", anchor: "/catalog/men" },
      { id: 2, value: "Women", anchor: "/catalog/women" },
      { id: 3, value: "Kids", anchor: "/catalog/youth" },
      { id: 4, value: "All Frames", anchor: "/catalog/eyeglasses" },
      { id: 5, value: "Eye Exam", anchor: "/eye-exam" },
    ],
  },
  {
    id: "12",
    heading: "CONTACT LENSES",
    menuStatus: false,
    menus: [
      { id: 1, value: "Daily", anchor: "/catalog/daily-contacts" },
      { id: 2, value: "Bi-weekly", anchor: "/catalog/bi-weekly-contacts" },
      { id: 2, value: "Bi-Weekly", anchor: "/catalog/bi-weekly-contacts" },
      { id: 3, value: "Monthly", anchor: "/catalog/monthly-contacts" },
      { id: 4, value: "All Contacts", anchor: "/catalog/contacts" },
      { id: 5, value: "Eye Exam", anchor: "/eye-exam" },
    ],
  },
  {
    id: "13",
    heading: "COMPANY",
    menuStatus: false,
    menus: [
      { id: 1, value: "About Us", anchor: "/about-us" },
      { id: 2, value: "Careers", anchor: "/careers" },
      { id: 3, value: "FAQ", anchor: "/faq" },
      { id: 4, value: "Our Guarantee", anchor: "/our-guarantee" },
      { id: 5, value: "Franchise", anchor: "/franchise" },
    ],
  },
  {
    id: "14",
    heading: "INFORMATION",
    menuStatus: false,
    menus: [
      { id: 1, value: "Store Specials", anchor: "/special-offers" },
      { id: 2, value: "Insurance", anchor: "/vision-insurance" },
      { id: 3, value: "Eyeglass Lenses", anchor: "/lenses-that-suit-you" },
      { id: 4, value: "Color Vision Test", anchor: "/color-vision-test" },
      { id: 5, value: "Blog", anchor: "/blog" },
    ],
  },
  {
    id: "15",
    heading: "CONTACT US",
    menuStatus: false,
    menus: [
      { id: 1, value: "(888) 453-9502" },
      { id: 2, value: "Find a Store", anchor: "/schedule-exam" },
      { id: 3, value: "Stay connected" },
    ],
  },
];

export const FOOTER_LINKS_MOBILE_ORDER = [0, 1, 2, 3, 6, 4, 5, 8, 9, 7];

export const BEST_OFFERS_MENU_ID = 7;

export const FOOTER_LINKS: FooterLinkDTO[] = [
  {
    id: 1,
    title: "Eye Health. Best Options",
    menus: [
      {
        id: 1,
        title: "Comprehensive Eye Exams*",
        link: "/eye-exam/",
      },
      { id: 2, title: "Online Vision Test", link: "/prescription-renewal/" },

      {
        id: 3,
        title: "Vision Supplements",
        link: "/catalog/vision-supplements/",
      },

      {
        id: 4,
        title: "Eye Care Products",
        link: "/catalog/eye-care-products/",
      },

      { id: 5, title: "Color Vision Test", link: "/color-vision-test/" },

      { id: 6, title: "Pupillary Distance", link: "/pd-measurement/" },

      { id: 7, title: "Eye Health Guide", link: "/blog/" },
    ],
  },
  {
    id: 2,
    title: "Eyeglasses. Best Selection",
    menus: [
      { id: 1, title: "Women", link: "/catalog/womens-eyeglasses/" },

      { id: 2, title: "Men", link: "/catalog/mens-eyeglasses/" },

      { id: 3, title: "Kids", link: "/catalog/youth/" },

      { id: 4, title: "All frames", link: "/catalog/eyeglasses/" },

      { id: 5, title: "Best Sellers", link: "/best-seller-glasses" },

      { id: 6, title: "Same-Day Glasses", link: "/same-day-glasses/" },

      { id: 7, title: "Virtual Try on", link: "/catalog/all-frames/" },

      {
        id: 8,
        title: "Frames Under $50",
        link: "/eyeglasses-under-50/",
      },
    ],
  },
  {
    id: 3,
    title: "Sunglasses. Best Protection",
    menus: [
      { id: 1, title: "Women", link: "/catalog/womens-sunglasses/" },

      { id: 2, title: "Men", link: "/catalog/mens-sunglasses/" },

      { id: 3, title: "All Frames", link: "/catalog/sunglasses/" },

      {
        id: 4,
        title: "Best Sellers",
        link: "/best-seller-glasses/",
      },

      {
        id: 5,
        title: "Sunglasses Under $50",
        link: "/sunglasses-under-50/",
      },
    ],
  },
  {
    id: 4,
    title: "Contact Lenses. Best Brands",
    menus: [
      { id: 1, title: "Daily", link: "/catalog/daily-contacts/" },

      { id: 2, title: "Bi-Weekly", link: "/catalog/bi-weekly-contacts/" },

      { id: 3, title: "Monthly", link: "/catalog/monthly-contacts/" },

      {
        id: 4,
        title: "Shop by Brand",
        link: "/catalog/contacts/",
      },

      { id: 5, title: "All Contacts", link: "/catalog/contacts/" },
    ],
  },
  {
    id: 5,
    title: "Best Perks",
    menus: [
      {
        id: 1,
        title: "Buy Now. Pay Later.",
        link: "/special-offers/buy-now-pay-later/",
      },
      {
        id: 4,
        title: "Military Discount",
        link: "/special-offers/military-discount/",
      },

      { id: 5, title: "Frames Club", link: "/special-offers/frame-club/" },

      { id: 6, title: "Contacts Club", link: "/special-offers/contacts-club/" },

      {
        id: 7,
        title: "Refer A Friend",
        link: "/special-offers/refer-a-friend/",
      },
    ],
  },
  {
    id: 6,
    title: "Eye Health & Style Guide",
    menus: [
      {
        id: 1,
        title: "Eye Health & Wellness",
        link: "/blog/",
      },

      { id: 2, title: "Fashion in vision", link: "/blog/eyeglasses-trends-2024/" },

      {
        id: 3,
        title: "Lens Technology",
        link: "/blog/virtual-eye-care-with-telehealth-technology/",
      },

      { id: 4, title: "The “Eye Narrative“", link: "/blog/top-4-eye-charts-used-eye-exams/" },
    ],
  },
  {
    id: 7,
    title: "Best Offers. Best Value",
    menus: [
      { id: 1, title: "Free Eye Exam with any eyeglass purchase", link: "/book-eye-exam/" },

      {
        id: 2,
        title: "2 Pairs for $79",
        link: "/special-offers/2-for-79-same-day/",
      },

      { id: 3, title: "Buy One Get One Free", link: "/special-offers/bogo/" },

      {
        id: 4,
        title: "2 Progressives for $135",
        link: "/special-offers/2-for-135-progressives/",
      },

      {
        id: 5,
        title: "60% Off 2nd Pair w/Insurance",
        link: "/special-offers/insurance-offer/",
      },

      { id: 6, title: "50% Off All Frames & Lenses", link: "/catalog/all-frames/" },

      {
        id: 7,
        title: "Contact Lens Value Pack",
        link: "/special-offers/cvp_biotrue/",
      },
    ],
  },
  {
    id: 8,
    title: "At Your Service",
    menus: [
      {
        id: 1,
        title: "Live Eye Care Specialist",
        link: "/prescription-renewal/",
      },

      {
        id: 2,
        title: "Order Status",
        link: "/order-status/",
      },

      { id: 3, title: "FAQs", link: "/faq/" },

      {
        id: 4,
        title: "My Account",
        link: "/my-account/",
      },

      {
        id: 5,
        title: "Our Guarantee",
        link: "/our-guarantee/",
      },

      {
        id: 6,
        title: "Accessibility",
        link: "/accessibility-statement/",
      },

      { id: 7, title: "Call us (877) 518-5788", link: "tel:8775185788" },
    ],
  },
  {
    id: 9,
    title: "We Accept Insurance",
    link: "/vision-insurance/",
    menus: [],
  },
  {
    id: 10,
    title: "Who We Are",
    menus: [
      {
        id: 1,
        title: "Our Story",
        link: "/about-us/",
      },
      {
        id: 2,
        title: "Careers",
        link: "/careers/",
      },
      {
        id: 3,
        title: "Site Map",
        link: "/sitemap/",
      },
    ],
  },
  {
    id: 11,
    title: "Follow us",
    menus: [],
  },
];

export const SOCIAL_MEDIA_LINKS = {
  INSTAGRAM:
    "https://www.instagram.com/accounts/login/?next=%2Fstantonoptical%2F&source=omni_redirect",
  FACEBOOK: "https://www.facebook.com/StantonOptical/",
  YOUTUBE: "https://www.youtube.com/@StantonOpticalYT",
};
