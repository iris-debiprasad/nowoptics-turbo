export const FooterConstants = {
  CONTACT_US: "CONTACT US",
};

export const FooterDataSO = [
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
      { id: 3, value: "Monthly", anchor: "/catalog/monthly-contacts" },
      { id: 4, value: "All Contacts", anchor: "/catalog/contacts" },
      { id: 5, value: "Available Rebates", anchor: "/available-rebates" },
      { id: 6, value: "Eye Exam", anchor: "/eye-exam" },
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
      { id: 5, value: "Accessibility", anchor: "/accessibility-statement" },
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
      { id: 4, value: "Online Vision Test", anchor: "/prescription-renewal" },
      { id: 5, value: "Color Vision Test", anchor: "/color-vision-test" },
      { id: 6, value: "Pupillary Distance (PD)", anchor: "/pd-measurement" },
      { id: 7, value: "Blog", anchor: "/blog" },
    ],
  },
  {
    id: "15",
    heading: "CONTACT US",
    menuStatus: false,
    menus: [
      { id: 1, value: "" },
      { id: 2, value: "Find a Store", anchor: "/schedule-exam" },
      { id: 3, value: "Stay connected" },
    ],
  },
];
export const FooterDataMEL = [
  {
    id: "11",
    heading: "EYEGLASSES",
    menuStatus: false,
    menus: [
      { id: 1, value: "Men", anchor: "/catalog/men" },
      { id: 2, value: "Women", anchor: "/catalog/women" },
      { id: 3, value: "Kids", anchor: "/catalog/youth" },
      { id: 4, value: "All Frames", anchor: "/catalog/eyeglasses" },
      // TODO - Hide for now (to be fixed post go live)
      // { "id": 5, "value": "Eye Exam", "anchor": "/eye-exam" }
    ],
  },
  {
    id: "12",
    heading: "CONTACT LENSES",
    menuStatus: false,
    menus: [
      { id: 1, value: "Daily", anchor: "/catalog/daily-contacts" },
      { id: 2, value: "Bi-weekly", anchor: "/catalog/bi-weekly-contacts" },
      { id: 3, value: "Monthly", anchor: "/catalog/monthly-contacts" },
      { id: 4, value: "All Contacts", anchor: "/catalog/contacts" },
      // TODO - Hide for now (to be fixed post go live)
      // { "id": 5, "value": "Eye Exam", "anchor": "/eye-exam" }
    ],
  },
  {
    id: "13",
    heading: "COMPANY",
    menuStatus: false,
    menus: [
      // TODO - Hide for now (to be fixed post go live)
      // { "id": 1, "value": "About Us" ,"anchor": "/about-us" },
      { id: 2, value: "Careers", anchor: "/careers" },
      // TODO - Hide for now (to be fixed post go live)
      // { "id": 3, "value": "FAQ","anchor": "/faq" },
      { id: 4, value: "Our Guarantee", anchor: "/our-guarantee" },
      { id: 5, value: "Accessibility", anchor: "/accessibility-statement" },
    ],
  },
  {
    id: "14",
    heading: "INFORMATION",
    menuStatus: false,
    menus: [
      { id: 1, value: "Store Specials", anchor: "/special-offers" },
      { id: 2, value: "Insurance", anchor: "/vision-insurance" },
      // TODO - Hide for now (to be fixed post go live)
      // { "id": 3, "value": "Eyeglass Lenses","anchor": "/lenses-that-suit-you"  },
      // { "id": 4, "value": "Color Vision Test","anchor": "/color-vision-test"  },
      // { "id": 5, "value": "Pupillary Distance (PD)","anchor": "/pd-measurement"  },
      // { "id": 6, "value": "Blog","anchor": "/blog"  }
    ],
  },
  {
    id: "15",
    heading: "CONTACT US",
    menuStatus: false,
    menus: [
      { id: 1, value: "" },
      { id: 2, value: "Find a Store", anchor: "/schedule-exam" },
      { id: 3, value: "Stay connected" },
    ],
  },
];

export const FooterData: any = {
  MEL: FooterDataMEL,
  SO: FooterDataSO,
};
