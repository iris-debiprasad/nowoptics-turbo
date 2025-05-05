import { SO_DEFAULT_STORE_CONTACT_NUMBER } from "./common.constants";

export const NAV_ITEMS = {
  NAV_TYPES: {
    TEXT: "text",
    DROPDOWN: "dropdown",
    COMPONENT_DROPDOWN: "componentDropdown",
  },
};

export const BOOK_EYE_EXAM = "Book Eye Exam";

export const NEED_HELP = `Need help? Call us ${SO_DEFAULT_STORE_CONTACT_NUMBER} `;

export const LOCATION = "7201-Mishawaka8";

export const STORE = { ID: "7201", NAME: "Mishawaka8" };

export const CLOSE_MESSAGE = "Closes at 6 pm";

export const SETTINGS = "Settings";

export const SEARCH_TYPE = {
  PRODUCT: "Product",
  STORE: "Store",
  PATIENT: "Patient",
  ORDER: "Order",
};

export const patientSearchButtonContent = [
  {
    id: "addPatient",
    text: "Add Patient",
    disableButtonInCDC: true,
  },
  {
    id: "searchAdvanced",
    text: "Search Advanced",
    disableButtonInCDC: false,
  },
];

export const DOCTOR_CONSULTATION_STORAGE_KEY = "hasInHousePxs"
