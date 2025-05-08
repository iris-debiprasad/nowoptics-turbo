export const SO_DEFAULT_STORE_NUMBER = 9996; // 9996 is a Stanton Optical default store number
export const MEL_DEFAULT_STORE_NUMBER = 9995; // 9995 is a My Eye Lab default store number
export const SO_DEFAULT_STORE_ID =
  typeof window !== "undefined" && localStorage.getItem("defaultStoreId")
    ? localStorage.getItem("defaultStoreId")
    : "355"; // 355 is a Stanton Optical default store id (Prod)

export const KEYBOARD_KEYS = {
  DELETE: "Delete",
  BACKSPACE: "Backspace",
  ARROWLEFT: "ArrowLeft",
  TAB: "Tab",
  SHIFT: "Shift",
};

export const EVENT_TYPES = {
  KEYDOWN: "keydown",
};

export const VARIABLE_TYPES = {
  NUMBER: "number",
  BOOLEAN: "boolean",
  FLOAT: "float",
};

export const BLOCKED_FILTER_CHARACTERS_NUMBER = ["e", "E", ":", ",", "."];
export const BLOCKED_FILTER_CHARACTERS_FLOAT = ["e", "E", ":", ","];
export const BLOCKED_FILTER_CHARACTERS_STRING = [":", ","];

export const ISD_CODE = process.env.NEXT_PUBLIC_DEFAULT_COUNTRY_CODE || "+1";

export const LANGUAGE_OPTIONS = [
  { label: "Select Language", value: "select" },
  { label: "English", value: "en-US" },
  { label: "Spanish", value: "es-ES" },
];

export const APPOINTMENT_RESCHEDULE_DATE_FORMAT = {
  format: "dddd, MMMM DD, YYYY",
};

export const DOCTOR_SCHEDULER_DATE_FORMAT = "MMMM DD, YYYY";
export const DOCTOR_SCHEDULER_API_DATE_FORMAT = "YYYY-MM-DD";
export const APPOINTMENT_SCHEDULER_API_DATE_FORMAT = "YYYY-MM-DD  hh:mm A";
export const APPOINTMENT_SCHEDULER_API_DATE_FORMAT_2 = "YYYY-MM-DD HH:mm";
export const DATE_TIME_FORMAT_WITHOUT_TIMEZONE = "YYYY-MM-DDT00:00:00";
export const MASKED_DATE = "0001-01-01T00:00:00";

export const DATE_FORMAT = "MM/DD/YYYY";
export const DATE_TIME_FORMAT = "MM/DD/YYYY hh:mm A";
export const DATE_TIME_FORMAT_WITH_DAY = "ddd, MM/DD/YYYY HH:mm:ss";
export const COMMON_DATE_FORMAT = "YYYY-MM-DD";
export const DATE_TIME_24H_FORMAT = "MM/DD/YYYY, HH:mm";
export const DATE_TIME_12H_FORMAT = "MM/DD/YYYY hh:mm A";
/**
 *  First Need to convert dob with this format then apply other format
 *  to avoid dayjs parsing issue in safari
 */
export const REFERENCE_DOB_FORMAT = "YYYY-MM-DD h:mm A";

export const EYE_EXAM_APPOINTMENT_DATE_FORMAT = "dddd, MMMM DD";

export const EYE_EXAM_APPOINTMENT_SLOT_FORMAT = "h:mm A";

export const INPUT_MASK = {
  ZIP_CODE: "00000-0000",
  MOBILE_NUMBER: "(000) 000-0000",
};

export const CommonConstants = {
  CURRENCY: "$",
};

export const isEmailValidRegex =
  /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;
export const isZipcodeValidRegex = /^[0-9]{5}(?:[0-9]{4})?$/;
export const isNameValidRegex =
  /^(?!.*[.'-]{2})[a-zA-Z]+(?:[.'-\s][a-zA-Z]+)*$/;
export const isMobileNumberValidRegex = /^\d{10}$/;
export const isUrlValidRegex =
  /^(https?:\/\/)?(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)$/;

export const middleNameRegex = "[0-9.,-@:%._+~#=//`(){}]";

export const isAlphaNumeric = /^[a-zA-Z0-9]+$/;
export const isAlphaNumericWithSpace = /^[a-zA-Z0-9\s]+$/;
export const isSearchValidRegex =
  /^[a-zA-Z0-9]$|^(?!.*([@.'-])\1)[A-Za-z0-9\s][A-Za-z0-9@.'\s-]*[A-Za-z0-9\s]$/;

export const isNumeric = /^\d+$/;
export const onlyAlphabetWithoutSpace = /^[\w-]+$/;

export const isNumberAndEnter = /^[0-9\n\b]+$/;

export const isFrameNameValidRegex =
  /^(?!.*[ -]{2})[a-zA-Z0-9]+(?:[ -][a-zA-Z0-9]+)*$/;

export const isEnter = /[\n\b]/;
export const onlyNumberRegex = /^[0-9\b]+$/;
export const decimalNumberRegex = /^\d*\.?\d*$/;
export const ipV4Regex = /^((25[0-5]|(2[0-4]|1\d|[1-9]|)\d)\.?\b){4}$/;
export const onlyAlphabets = /^[a-zA-Z]*$/;
export const onlyAlphabetsWithSpace = /^[a-zA-Z\s]*$/;
export const socialMediaUrlRegex =
  /^(http:\/\/www\.|https:\/\/www\.|http:\/\/|https:\/\/)?[aA-zZ0-9]+([\-\.]{1}[aA-zZ0-9]+)*\.[aA-zZ]{2,5}(:[0-9]{1,5})?(\/.*)?$/;
export const npiNumberRegex = /^(?=(?:.{10}|.{15})$)[0-9]*$/;
export const latitude = /^[-+]?([1-8]?\d(\.\d+)?|90(\.0+)?)$/;
export const longitude = /^[-+]?(180(\.0+)?|((1[0-7]\d)|([1-9]?\d))(\.\d+)?)$/;

export const validLocationInputPattern = /^[a-zA-Z0-9\s-]+$/;
export const isCountryCodeValidRegex = /^[A-Za-z]{3}$/;

export const isVeritcalLensHeightValidRegex =
  /^([2-5][0-9](\.\d{1,2})?|60|60(\.0)|60(\.00))$/;
//  Eye Size between 40 to 70. Only two decimal places are allowed

export const isEyeSizeValidRegex =
  /^([4-6][0-9](\.\d{1,2})?|70|70(\.0)|70(\.00))$/;
export const isBridgeValidRegex = /^([9]|[1-2][0-9]|[3][0-5])$/;
export const isTempleValidRegex = /^([8-9][0-9]|1[0-5][0-9]|16[0-5])$/;
export const phoneRegex = /^\(?([0-9]{0,3})\)?([0-9]{0,3})[\s\-]?([0-9]{0,4})$/;
export const orderNumberRegex = /^\d+\.?\d+$/;
export const phoneFormatRegex = /(\d{3})(\d{3})(\d{4})/;
export const phoneFormatReplaceValue = "($1) $2-$3";

export const ZIP_CODE_MASK_REGEX_SEARCH_VALUE = /^(\d{5})(\d{4})$/;
export const ZIP_CODE_MASK_REGEX_REPLACE_VALUE = "$1-$2";
export const ONLY_NUMBERS_REGEX = /[^0-9.]/g;

export const SNACKBAR_COLOR_TYPE = {
  ERROR: "error",
  SUCCESS: "success",
  WARNING: "warning",
};

export const USER_TYPE = {
  PATIENT: "Patient",
  ASSOCIATE: "Associate",
  ANONYMOUS: "Anonymous",
};

export const STORE_ID = "1";

export const DEBOUNCE_TIME = 1000;
export const DEBOUNCE_TIME_FOR_FUNCTION = 100;

export const NO_RECORD_FOUND = "No Record Found";

export const LOADING = "Loading...";

export const StringFilterOperatorOptions = [
  { label: "Contains", value: "contain" },
  { label: "Starts with", value: "startswith" },
  { label: "Ends with", value: "endswith" },
  { label: "Is equal to", value: "eq" },
];

export const NumberFilterOperatorOptions = [
  { label: "Greater than", value: "gt" },
  { label: "Less than", value: "lt" },
  { label: "Is equal to", value: "eq" },
  { label: "Is not equal to", value: "neq" },
];

export const BooleanFilterOperatorOptions = [
  { label: "Is True", value: "istrue" },
  { label: "Is False", value: "isfalse" },
];

export const AppEvents = {
  STORE_CHANGE: "store_change",
  ADD_TO_CART: "add_to_cart",
  SHOW_LOGIN_MENU: "show_login_menu",
  LOGIN_SUCCESS: "login_success",
  LOGOUT: "logout",
  GET_PROMOTIONS_FOR_CL_QTY_CHNG: "get_promotions_for_cl_qty_chng",
  MERGE_GUEST_CART: "merge_guest_cart",
  UPDATE_SESSION: "update_session",
  CALL_DISCONNECTED: "call_disconnected",
  ADD_EYE_EXAM_FRON_CART_PAGE: "add_eye_exam_from_cart_page",
  GUIDED_SALES_START_SCREEN_SHARE: "guided_agent_start_screen_share",
  GUIDED_SALES_STOP_SCREEN_SHARE: "guided_agent_stop_screen_share",
  END_MEETING: "end_meeting",
  CALL_CANCEL_BY_AGENT: "call_calcel_by-agent",
  SET_DEFAULT_STORE: "set_default_store",
  PATIENT_JOIN_THE_CALL: "patient_join_call",
};

export const COUNTRY_LIST: { [key: number]: string } = {
  229: "USA",
};

export const SO_DEFAULT_STORE_SUPPORT_NUMBER = "(855) 455-8084";
export const SO_DEFAULT_STORE_CONTACT_NUMBER = "(877) 518-5788";
export const MEL_DEFAULT_STORE_CONTACT_NUMBER = "(866) 286-7036";
export const PRIVACY_CONTACT_EMAIL = "ccpa@nowoptics.com";

export const STATE_LIST: { [key: number]: string } = {
  1: "AA",
  2: "AE",
  3: "AP",
  4: "AL",
  5: "AK",
  6: "AZ",
  7: "AR",
  8: "CA",
  9: "CO",
  10: "CT",
  11: "DE",
  12: "FL",
  13: "GA",
  14: "HI",
  15: "ID",
  16: "IL",
  17: "IN",
  18: "IA",
  19: "KS",
  20: "KY",
  21: "LA",
  22: "ME",
  23: "MD",
  24: "MA",
  25: "MI",
  26: "MN",
  27: "MS",
  28: "MO",
  29: "MT",
  30: "NE",
  31: "NV",
  32: "NH",
  33: "NJ",
  34: "NM",
  35: "NY",
  36: "NC",
  37: "ND",
  38: "OH",
  39: "OK",
  40: "OR",
  41: "PA",
  42: "RI",
  43: "SC",
  44: "SD",
  45: "TN",
  46: "TX",
  47: "UT",
  48: "VT",
  49: "VA",
  50: "WA",
  51: "WV",
  52: "WI",
  53: "WY",
  54: "AS",
  55: "DC",
  56: "FM",
  57: "GU",
  58: "MH",
  59: "MP",
  60: "PW",
  61: "PR",
  62: "VI",
  63: "ZS",
};
export const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];

export const NUMBER_OF_SEARCH_RECORD = "10";

export const ACCEPTED_IMAGE_FORMATS = [".jpg", ".jpeg", ".png"];
export const ACCEPTED_PRESCRIPTION_FORMATS = [".pdf", ".jpg", ".png"];
export const HOURS_IN_DAY = Array.from({ length: 24 }, (_, index) => ({
  Id: index,
  Description: index < 10 ? "0" + index : index.toString(),
  Code: index < 10 ? "0" + index : index.toString(),
}));

export const MINUTES_IN_HOUR = Array.from({ length: 60 }, (_, index) => ({
  Id: index,
  Description: index < 10 ? "0" + index : index.toString(),
  Code: index < 10 ? "0" + index : index.toString(),
}));

export const ORDER_CATEGORY_ID: { [key: string]: number } = {
  NEW: 143,
  REMAKE: 144,
  WARRANTY: 145,
  EXCHANGE: 146,
};

export const APPOINTMENT_SELECT_STORE_ACTION = {
  CREATE: "CREATE",
  RESCHEDULE: "RESCHEDULE",
};

export const LOADING_TEXT = "Loading...";

export const ORDER_CATEGORY_CODE = {
  NEW: "N",
  REMAKE: "R",
  WARRANTY: "W",
  EXCHANGE: "E",
};

export const ORDER_TYPE_CODE = {
  EXAM: {
    id: 1,
    description: "Exam",
    code: "EX",
  },
  SPECTACLE: {
    id: 2,
    description: "Spectacle",
    code: "SP",
  },
  CONTACT: {
    id: 3,
    description: "Contact Lens",
    code: "CL",
  },
  OTC: {
    id: 4,
    description: "OTC",
    code: "OC",
  },
  LOYALTY_CLUB: {
    id: 5,
    description: "Loyalty Club",
    code: "LC",
  },
  WARRANTY: {
    id: 6,
    description: "Warranty",
    code: "WR",
  },
};
// BRAND
export const BRAND = {
  SO: "SO",
  MEL: "MEL",
};

export const BRAND_NAME: { [key: string]: string } = {
  SO: "Stanton Optical",
  MEL: "My Eyelab",
};

export const BRAND_NAME_INDEX: { [key: string]: string } = {
  "Stanton Optical": "SO",
  "My Eyelab": "MEL",
};

export const DEFAULT_STORE_SUPPORT_NUMBER: { [key: string]: string } = {
  SO: SO_DEFAULT_STORE_CONTACT_NUMBER,
  MEL: MEL_DEFAULT_STORE_CONTACT_NUMBER,
};

export const SOCIAL_LINKS: any = {
  SO: {
    facebook: "https://www.facebook.com/StantonOptical/",
    linkedin: "https://www.linkedin.com/company/stanton-optical",
    instagram: "https://www.instagram.com/stantonoptical/",
    pinterest: "https://co.pinterest.com/stantonoptical/",
  },
  MEL: {
    facebook: "https://www.facebook.com/MyEyeLab/",
    linkedin: "https://www.linkedin.com/company/myeyelab",
    instagram: "https://www.instagram.com/myeyelab/",
    pinterest: "https://co.pinterest.com/myeyelab/",
  },
};

export const SOCIAL_MEDIA_LINKS = {
  INSTAGRAM:
    "https://www.instagram.com/accounts/login/?next=%2Fstantonoptical%2F&source=omni_redirect",
  FACEBOOK: "https://www.facebook.com/StantonOptical/",
  YOUTUBE: "https://www.youtube.com/@StantonOpticalYT",
};

export const ACTION_TOOLTIP_LABEL: { [key: string]: string } = {
  EDIT: "Edit",
  DEACTIVATE: "Deactivate",
  DELETE: "Delete",
  LINK: "Link",
  UNLINK: "Unlink",
  LOGOUT_STORE: "Logout store {0}",
};

export const MERGE_ERROR_MESSAGE =
  "Please select any 3 of the following fields to merge the patient (First name, Last name, DOB, Mobile Number)";
export const NO_PATIENT_FOUND = "No patient found";
export const DUPLICATE_PATIENT_NOT_FOUND = "Duplicate patient not found.";

export const menuItemConstants = {
  MY_ACCOUNT_PROFILE: "MyAccountProfile",
  MY_ACCOUNT_APPOINTMENT: "MyAccountAppointments",
  MY_ACCOUNT_EYE_HEALTH: "MyAccountEyeHealth",
  MY_ACCOUNT_ORDER_HISTORY: "MyAccountOrderHistory",
  MY_ACCOUNT_FAVORITES: "MyAccountFavorites",
  MY_ACCOUNT_LOYALTY_CLUB: "MyAccountLoyaltyClub",
  MY_ACCOUNT_DOCTOR_CONSULTATION: "MyAccountDoctorConsultation",
  MY_ACCOUNT_DOCTOR_NOTES: "MyAccountDoctorNotes",
};

export const subMenuItems = {
  MY_ACCOUNT_PRESCRIPTION: "MyAccountPrescription",
  MY_ACCOUNT_MEDICAL_FORM: "MyAccountMedicalForm",
  MY_ACCOUNT_VISION_INTAKE: "MyAccountVisionIntake",
  MY_ACCOUNT_AFTER_VISIT_SUMMARY: "MyAccountAfterVisitSummary",
  MY_ACCOUNT_ASK_DOCTOR: "MyAccountAskDoctor",
  MY_ACCOUNT_SUBMENU_PATHS: [
    "my-prescriptions",
    "after-visit-summary",
    "askDoctor",
    "exam-intake-form",
    "eye-health",
  ],
};

export const GOOGLE_MAP_RESPONSE_STATE_KEY = "administrative_area_level_1";
export const GOOGLE_MAP_RESPONSE_COUNTRY_KEY = "country";
export const GOOGLE_MAP_US_CODE = "US";

export const SHIPPING_MODE = {
  PATIENT_PICKUP: "direct to patient shipping",
  STORE_PICKUP: "pickup by patient",
};

export const USA_COUNTRY_CODE = "USA";

export const GUIDED_SALES_MESSAGES = {
  AGENT_VIEW_PERMISSION:
    "Before sharing your screen, you need to enable Eye Care Specialist View.",
  AGENT_VIEW_OFF:
    "Are you sure you want to turn off the Eye Care Specialist View? Doing so will end the current call.",
  DEVICE_PERMISSION_ERROR_PATIENT:
    "Please allow camera and microphone on your browser to connect with a Live Eye Care Specialist. You will be able to control these settings once connected.",
  DEVICE_PERMISSION_ERROR_AGENT:
    "Please allow camera and microphone on your browser to connect with a Live Patient. You will be able to control these settings once connected.",
  SCREEN_SHARING_NOT_SUPPORTED:
    "Screensharing is unavailable on tablet/mobile devices.",
  PATIENT_DISCONNECTED:
    "We apologize there seems to be something wrong with the connection, please try again.",
};

export const RESTRICTED_AREA_LOCATION = {
  AREA_TYPE: "administrative_area_level_1",
  STATE: "Arkansas",
};

export const GUIDED_SALES_PATIENT_WAITING_TIME = 120000;
export const RING_CENTRAL_CALL_NOTIFICATION_STACK_LENGTH = 3
