import { NavItem } from "@root/host/src/types/Header.types";
import { StoreAddressType } from "@root/host/src/types/SideBar.types";

const CommonNavData = [
  {
    id: "1",
    name: "Eye Health",
    type: "dropdown",
    url: "",
    subMenu: [
      {
        id: "1",
        name: "Vision Supplements",
        type: "text",
        url: "/catalog/vision-supplements/",
        subMenu: [],
        query: true,
      },
      {
        id: "2",
        name: "Eye Care Products",
        type: "text",
        url: "/catalog/eye-care-products/",
        subMenu: [],
        query: true,
      },
      {
        id: "3",
        name: "Eye Health Guide",
        type: "text",
        url: "/blog/",
        subMenu: [],
        query: true,
      },
      {
        id: "4",
        name: "Book Eye Exam",
        type: "text",
        url: "/book-eye-exam/",
        subMenu: [],
        query: true,
      },
    ],
  },
  {
    id: "2",
    name: "Eyeglasses",
    type: "dropdown",
    url: "",
    subMenu: [
      {
        id: "1",
        name: "Women",
        type: "text",
        url: "/catalog/womens-eyeglasses/",
        subMenu: [],
        query: true,
      },
      {
        id: "2",
        name: "Men",
        type: "text",
        url: "/catalog/mens-eyeglasses/",
        subMenu: [],
        query: true,
      },
      {
        id: "3",
        name: "Kids",
        type: "text",
        url: "/catalog/youth/",
        subMenu: [],
        query: true,
      },
      {
        id: "4",
        name: "All Frames",
        type: "text",
        url: "/catalog/eyeglasses/",
        subMenu: [],
        query: true,
      },
      {
        id: "5",
        name: "New Arrivals",
        type: "text",
        url: "/catalog/new-arrivals/",
        subMenu: [],
        query: true,
      },
      {
        id: "6",
        name: "Best Selling Eyeglasses",
        type: "text",
        url: "/catalog/best-seller-glasses/",
        subMenu: [],
        query: true,
      },
      {
        id: "7",
        name: "Eyeglass Frames Under $50",
        type: "text",
        url: "/catalog/eyeglasses-under-50/",
        subMenu: [],
        query: true,
      },
      {
        id: "8",
        name: "Metal Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/metal-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "9",
        name: "Plastic Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/plastic-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "10",
        name: "Rimless Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/rimless-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "11",
        name: "Cat Eye Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/cat-eye-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "12",
        name: "Oval Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/oval-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "13",
        name: "Rectangle Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/rectangle-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "14",
        name: "Round Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/round-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "15",
        name: "Square Eyeglass Frames",
        type: "text",
        url: "/eyeglasses/square-frames/",
        subMenu: [],
        query: true,
      },
    ],
  },
  {
    id: "4",
    name: "Sunglasses",
    type: "dropdown",
    url: "",
    subMenu: [
      {
        id: "1",
        name: "Women",
        type: "text",
        url: "/catalog/womens-sunglasses/",
        subMenu: [],
        query: true,
      },
      {
        id: "2",
        name: "Men",
        type: "text",
        url: "/catalog/mens-sunglasses/",
        subMenu: [],
        query: true,
      },
      {
        id: "3",
        name: "All Sunglasses",
        type: "text",
        url: "/catalog/sunglasses/",
        subMenu: [],
        query: true,
      },
      {
        id: "5",
        name: "Metal Sunglasses",
        type: "text",
        url: "/sunglasses/metal-frames/",
        subMenu: [],
        query: true,
      },
      {
        id: "6",
        name: "Plastic Sunglasses",
        type: "text",
        url: "/sunglasses/plastic-frames/",
        subMenu: [],
        query: true,
      },
    ],
  },
  {
    id: "3",
    name: "Contact Lenses",
    type: "dropdown",
    url: "",
    subMenu: [
      {
        id: "1",
        name: "Daily",
        type: "text",
        url: "/catalog/daily-contacts/",
        subMenu: [],
        query: true,
      },
      {
        id: "2",
        name: "Monthly",
        type: "text",
        url: "/catalog/monthly-contacts/",
        subMenu: [],
        query: true,
      },
      {
        id: "3",
        name: "Bi-Weekly",
        type: "text",
        url: "/catalog/bi-weekly-contacts/",
        subMenu: [],
        query: true,
      },
      {
        id: "4",
        name: "All Contacts",
        type: "text",
        url: "/catalog/contacts/",
        subMenu: [],
        query: true,
      },
      // TODO: 2330 - Uncomment if this page is required
      // {
      //   id: "5",
      //   name: "Shop by Brand",
      //   type: "text",
      //   url: "/catalog/contacts/",
      //   subMenu: [],
      //   query: true,
      // },
    ],
  },
  {
    id: "5",
    name: "Order Status",
    type: "text",
    url: "/order-status/",
    subMenu: [],
  },
];
export const NavDataPatient: NavItem[] = [
  ...CommonNavData,
  {
    id: "6",
    name: "Insurance",
    type: "text",
    url: "/vision-insurance/",
    subMenu: [],
  },
  /* Changing this url will imply also changing it on the
   * getPatienNavData function defined on Nav.txs */
  {
    id: "7",
    name: "My Account",
    type: "componentDropdown",
    url: "/my-account",
    subMenu: [
      {
        id: "1",
        name: "Account Profile",
        type: "text",
        url: "/my-account/my-profile/",
        subMenu: [],
      },
      {
        id: "2",
        name: "Appointments",
        type: "text",
        url: "/my-account/my-appointments/",
        subMenu: [],
      },
      {
        id: "3",
        name: "Eye Health",
        type: "text",
        url: "/my-account/my-prescriptions/",
        subMenu: [],
      },
      /* Changing this url will imply also changing it on the
       * getPatienNavData function defined on Nav.txs */
      {
        id: "4",
        name: "Ask an Eye Doctor",
        type: "text",
        url: "/my-account/ask-a-doctor/",
        subMenu: [],
      },
      {
        id: "5",
        name: "Order History",
        type: "text",
        url: "/my-account/order-history/",
        subMenu: [],
      },
      {
        id: "6",
        name: "Favorites",
        type: "text",
        url: "/my-account/my-favorites/",
        subMenu: [],
      },
      {
        id: "7",
        name: "Loyalty Club",
        type: "text",
        url: "/my-account/loyalty-club/",
        subMenu: [],
      },
    ],
  },
];

export const NavDataAssociate = [
  {
    ...CommonNavData.find((item) => item.name === "Eye Health"),
    subMenu: [
      ...(CommonNavData.find((item) => item.name === "Eye Health")?.subMenu ||
        []),
      {
        id: "1",
        name: "Eye Exam",
        type: "text",
        url: "",
        subMenu: [],
        cdcViewHide: true,
        agentViewHide: true,
      },
    ],
  },
  ...CommonNavData.filter((item) => item.name !== "Eye Health"),
  {
    id: "5",
    name: "Self Check-In",
    type: "text",
    url: "/self-checkin",
    subMenu: [],
    permissionKey: "tabletCheckInPermission",
    cdcViewHide: true,
    agentViewHide: true,
  },
  {
    id: "6",
    name: "Operations",
    type: "dropdown",
    url: "",
    permissionKey: "operationPermission",
    subMenu: [
      {
        id: "2",
        name: "Operation Command Center",
        type: "text",
        url: "/operations/operation-command-center",
        subMenu: [],
        permissionKey: "operationCommandPermission",
      },
      {
        id: "11",
        name: "Contact Lens Calculator",
        type: "text",
        url: "/contact-lens-calculator",
        subMenu: [],
        permissionKey: "contactLensCalculatorPermission",
        cdcViewHide: true,
      },
      {
        id: "12",
        name: "Available Rebates",
        type: "text",
        url: "/available-rebates",
        subMenu: [],
        permissionKey: "",
      },
      {
        id: "1",
        name: "Clinical Scheduler",
        type: "text",
        url: "/operations/clinical-scheduler",
        subMenu: [],
        permissionKey: "clinicalSchedulerPermission",
        cdcViewHide: false,
      },
      {
        id: "9",
        name: "Virtual Optician",
        type: "text",
        url: "/operations/virtual-optician",
        subMenu: [],
        permissionKey: "virtualOpticianPermission",
      },
      {
        id: "3",
        name: "Closing",
        type: "text",
        url: "/operations/closing",
        subMenu: [],
        permissionKey: "closingPermission",
        cdcViewHide: true,
      },
      {
        id: "4",
        name: "Closing History",
        type: "text",
        url: "/operations/closing-history",
        subMenu: [],
        permissionKey: "closingHistoryPermission",
        cdcViewHide: true,
      },
      {
        id: "5",
        name: "Inventory Count",
        type: "text",
        url: "/operations/inventory-count",
        subMenu: [],
        permissionKey: "inventoryCountPermission",
      },
      // TODO: Uncomment if this page is required
      // {
      //   id: "6",
      //   name: "Inventory Count Schedule",
      //   type: "text",
      //   url: "/operations/inventory-count-schedule",
      //   subMenu: [],
      // },
      {
        id: "7",
        name: "Inventory Adjustment",
        type: "text",
        url: "/operations/inventory-adjustment",
        subMenu: [],
        permissionKey: "inventoryAdjustmentPermission",
      },
      {
        id: "8",
        name: "Inventory Replenishment",
        type: "text",
        url: "/operations/inventory-replenishment",
        subMenu: [],
        permissionKey: "inventoryReplacementPermission",
      },
      {
        id: "9",
        name: "Return To Credit",
        type: "text",
        url: "/operations/return-to-credit",
        subMenu: [],
        permissionKey: "returnToCreditPermission",
      },
      {
        id: "10",
        name: "CC Report",
        type: "text",
        url: "/operations/cc-report",
        subMenu: [],
        cdcViewHide: true,
        permissionKey: "ccReportPermission",
      },
      {
        id: "5",
        name: "Pending Web Orders",
        type: "text",
        url: "/orders/pending-web-orders",
        subMenu: [],
        permissionKey: "pendingWebOrder",
        agentViewHide: true,
      },
      {
        id: "5",
        name: "Managed Care Claims",
        type: "text",
        url: "/managed-care/claims",
        permissionKey: "claimsPermission",
        agentViewHide: true,
      },
    ],
    agentViewHide: true,
  },
  {
    id: "7",
    name: "Job Tracking",
    type: "dropdown",
    url: "",
    permissionKey: "jobTrackingPermission",
    cdcViewShow: true,
    subMenu: [
      {
        id: "1",
        name: "Job Status",
        type: "text",
        url: "/job-tracking/job-status",
        subMenu: [],
        permissionKey: "jobStatusPermission",
      },
      {
        id: "2",
        name: "Job Status history",
        type: "text",
        url: "/job-tracking/job-status-history",
        subMenu: [],
        permissionKey: "jobStatusHistoryPermission",
      },
      {
        id: "6",
        name: "Job Transfer",
        type: "text",
        url: "/job-tracking/job-transfer",
        subMenu: [],
      },
      {
        id: "3",
        name: "Staging Bin View",
        type: "text",
        url: "/job-tracking/staging-bin-view",
        subMenu: [],
        permissionKey: "stagingBinViewPermission",
      },
      // TODO: Uncomment when APIs is ready
      // {
      //   id: "4",
      //   name: "Pending Shipped",
      //   type: "text",
      //   url: "/job-tracking/pending-ship",
      //   subMenu: [],
      //   permissionKey: "pendingShipPermission",
      // },
      // {
      //   id: "5",
      //   name: "Pending Trace",
      //   type: "text",
      //   url: "/job-tracking/pending-trace",
      //   subMenu: [],
      //   permissionKey: "pendingTracePermission",
      // },
    ],
    agentViewHide: true,
  },
  {
    id: "5",
    name: "My Account",
    type: "componentDropdown",
    url: "",
    subMenu: [],
  },
];

export const viewButtonData: StoreAddressType = {
  AddressLine1: "",
  BrandName: "View All Stores",
  City: "",
  CloseAt: null,
  HasSameDayDelivery: false,
  Id: 0,
  Latitude: 0,
  Longitude: 0,
  OpenAt: null,
  PhoneNumber: [],
  StateCode: "",
  StoreNumber: "",
  WebDescription: "",
  ZipCode: "",
  IsOnSiteDoctorAvailable: false,
  IsSpeakSpanish: false,
};

export const SettingsData = [
  {
    id: "1",
    name: "DC Setup",
    type: "text",
    url: "/setup/dc",
    subMenu: [],
    permissionKey: "dcSetupPermission",
  },
  {
    id: "2",
    name: "Import",
    type: "text",
    url: "/setup/import",
    subMenu: [],
    permissionKey: "importSetupPermission",
  },
  {
    id: "3",
    name: "Medical Form Setup",
    type: "text",
    url: "/intake",
    subMenu: [],
    permissionKey: "intakeSetupPermission",
  },
  {
    id: "4",
    name: "Managed Care Setup",
    type: "dropdown",
    url: "",
    permissionKey: "manageCareSetupPermission",
    subMenu: [
      {
        id: "1",
        name: "Billing Claim Status",
        type: "text",
        url: "/managed-care/billing-claim-status",
        subMenu: [],
        permissionKey: "claimStatusPermission",
      },
      {
        id: "2",
        name: "Insurance Carrier",
        type: "text",
        url: "/managed-care/",
        subMenu: [],
        permissionKey: "insuranceCareerPermission",
      },
      {
        id: "3",
        name: "Store Credentials",
        type: "text",
        url: "/managed-care/insurance-carrier-credentials",
        subMenu: [],
        permissionKey: "insuranceCareerCredentialPermission",
      },
      {
        id: "4",
        name: "Rules and Rules Type",
        type: "text",
        url: "/managed-care/rule",
        subMenu: [],
        permissionKey: "ruleGridPermission",
      },
      {
        id: "5",
        name: "Benefit Summary",
        type: "text",
        url: "/managed-care/benefit-summary",
        subMenu: [],
        permissionKey: "benefitSummaryPermission",
      },
    ],
  },
  {
    id: "5",
    name: "Master Setup",
    type: "text",
    url: "/setup/master",
    subMenu: [],
    permissionKey: "masterSetupPermission",
  },
  {
    id: "6",
    name: "Order Setup",
    type: "text",
    url: "/setup/order",
    subMenu: [],
    permissionKey: "orderSetupPermission",
  },
  {
    id: "7",
    name: "Contact Lens Rebates",
    type: "text",
    url: "/setup/contact-lens-rebates",
    subMenu: [],
    permissionKey: "contactLensRebatePermission",
  },
  {
    id: "8",
    name: "Patient Communication Setup",
    type: "text",
    url: "/patient-communication",
    subMenu: [],
    permissionKey: "patientCommPermission",
  },
  {
    id: "9",
    name: "Promotion & Loyalty Club Setup",
    type: "text",
    url: "/setup/promotion",
    subMenu: [],
    permissionKey: "promotionSetupPermission",
  },
  {
    id: "10",
    name: "Scheduler Setup",
    type: "text",
    url: "/setup/scheduler",
    subMenu: [],
    permissionKey: "schedulerPermission",
  },
  {
    id: "11",
    name: "Store Setup",
    type: "text",
    url: "/setup/store",
    subMenu: [],
    permissionKey: "storeSetupPermission",
  },
  {
    id: "12",
    name: "User and Role Setup",
    type: "text",
    url: "/setup/user",
    subMenu: [],
    permissionKey: "userSetupPermission",
  },
];
