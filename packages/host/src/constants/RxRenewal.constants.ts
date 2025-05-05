import { CurrentPrescriptionrDTO } from "@/types/rxRenewal.types";

export const RX_RENEWAL_CONSTANT = {
  FOUR_STEP_BANNER_HEADING: "FOUR EASY STEPS:",
  RENEWAL_DESCRIPTION_FIRST:
    "The vision test is guided by a live technician and leverages our advanced telehealth technology.",
  RENEWAL_DESCRIPTION_SECOND:
    "Prescription Renewal is FREE!* Quickly renew and purchase glasses or contacts wherever you have internet access.",
  RENEWAL_DESCRIPTION_THIRD:
    "*Without an eyeglass or contact lens purchase, Prescription Renewal is $20.",
  RENEWAL_DESCRIPTION_BUTTON: "Start Vision Test",
  GET_STARTED_HEADING: "WHAT DO I NEED TO GET STARTED?",
  GET_STARTED_FIRST_IMAGE_TEXT: "Your current prescription",
  GET_STARTED_SECOND_IMAGE_TEXT:
    "Laptop or desktop with Internet access and camera",
  GET_STARTED_THIRD_IMAGE_TEXT: "Your glasses or contact lenses",
  HEADER_MAIN_HEADING: "PRESCRIPTION RENEWAL",
  HEADER_SECONDARY_HEADING:
    "Need help or have a question taking your online exam?",
  HEADER_SECONDARY_TEXT: "Call us at (800) 264-4037",
  LOGIN_HEADER_HEADING: "WELCOME TO ONLINE VISION TEST",
  SIGN_IN_TEXT: "sign in",
  CREATE_TEXT: "create",
  PLEASE_TEXT: "Please",
  OR_TEXT: "or",
  GET_STARTED_TEXT: "your account to get started",
  NON_BUSINESS_HOURS_HEADING1: "Prescription Renewal is currently turned off.",
  NON_BUSINESS_HOURS_HEADING2:
    "Prescription Renewal is available Monday to Saturday from 10:00 am to 6:00 pm EST. We hope to see you soon.",
  NON_BUSINESS_HOURS_BTN1: "Exit To HomePage",
  NON_BUSINESS_HOURS_BTN2: "Book In-Store Exam",
  CURRENT_PRESCRIPTION_MAIN_HEADING: "Step 3: Share Current Prescription",
  CURRENT_PRESCRIPTION_SECONDARY_HEADING:
    "We have found the following prescriptions in your account. Please verify which you would like to renew:",
  CURRENT_PRESCRIPTION_TABLE_HEADING: "My Prescriptions",
  CURRENT_PRESCRIPTION_VIEW_BTN: "View",
  CURRENT_PRESCRIPTION_RENEW_BTN: "Renew",
  CURRENT_PRESCRIPTION_TABLE_BOTTOM_TEXT:
    "I want to renew a different prescription not listed above.",
  CURRENT_PRESCRIPTION_ADD_PRESCRIPTION_BTN: "Add A New Prescription",
  TABLE_HEADING1: "PRESCRIPTION TYPE",
  TABLE_HEADING2: "PRESCRIPTION DATE",
  TABLE_HEADING3: "EXPIRATION DATE",
  NOTIFICATION_TEXT_MOBILE_ACCESS:
    "Please access Prescription Renewal from your laptop or desktop computer to get started.",
  INCOVENENIENCE_SERVICE_HEADER_1: "Sorry for the inconvenience.",
  INCOVENENIENCE_SERVICE_HEADER_2: "We are experiencing some technical issues.",
  INCOVENENIENCE_SERVICE_DESC_1:
    "You can schedule your appointment for an in-store eye exam.See all available locations.",
  INCOVENENIENCE_SERVICE_BTN: "Book In-Store Exam instead",
  RENEWAL_DEVICE_COMPATIBLE_HEADER:
    "Prescription Renewal is not valid on mobile devices.",
  RENEWAL_DEVICE_COMPATIBLE_DESC_1: `Please access Prescription Renewal from your laptop or desktop computer to get started.<br />We encourage you to schedule a comprehensive eye exam at one of our stores.`,
};

export const RX_TYPE_CONSTANT = {
  eyeglass: "11",
  contacts: "12",
  eyeglassContactsBoth: "13",
};
export const RX_MODE_CONSTANT = {
  ehr: "1",
  outside: "2",
};
export const currentPrescriptionHeader: CurrentPrescriptionrDTO[] = [
  {
    label: "PRESCRIPTION TYPE",
    dataKey: "prescriptionType",
    type: "string",
  },
  {
    label: "PRESCRIPTION DATE",
    dataKey: "prescriptionDate",
    type: "string",
  },
  {
    label: "EXPIRATION DATE",
    dataKey: "expirationDate",
    type: "string",
  },
];
