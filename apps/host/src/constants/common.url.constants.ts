export const BASE_URL_REST_API = process.env.NEXT_PUBLIC_BASE_URL + "/";
export const NEXTAUTH_BASE_URL = process.env.NEXTAUTH_URL;

export const CommonUrlConstants = {
  GET_MASTER_LOOKUP_BY_TYPE:
    BASE_URL_REST_API + "mastersetup/masterlookup/type/{0}",
  GET_BRAND_CODE_OPTIONS:
    BASE_URL_REST_API + "inventory/cyclecount/masterProductBrand",
  GET_MASTERSETUP_BY_TYPE: BASE_URL_REST_API + "mastersetup/{0}",
  GET_COMPANY_DROPDOWN: BASE_URL_REST_API + "storesetup/companycategory",
  GET_BRAND_DROPDOWN: BASE_URL_REST_API + "storesetup/brand",
  GET_STORE_DROPDOWN: BASE_URL_REST_API + "storesetup/Store/{0}",
  GET_COUNTRY_DROPDOWN: BASE_URL_REST_API + "mastersetup/states/country/{0}",
  GET_MARKETING_DMA_DROPDOWN: BASE_URL_REST_API + "storesetup/marketingdma",
  GET_STATE_DROPDOWN: "/mastersetup/states/country/USA",
  GET_ALL_ORDER_TYPE: BASE_URL_REST_API + "orderSetup/ordertype",
  GET_ORDER_STATUS_CODE: BASE_URL_REST_API + "ordersetup/orderStatusCode",
  CREATE_PATIENT: BASE_URL_REST_API + "patient/Add",
  GET_ALL_RELATIONSHIPS_TYPES:
    BASE_URL_REST_API + "mastersetup/relationshiptype",
  VERIFY_USER_HAS_IN_HOUSE_PX:
    BASE_URL_REST_API + "patient/Customer/prescriptions/ehr/{0}",
  GET_ALL_DISTRICT: BASE_URL_REST_API + "storesetup/district",
  PATIENT_RELATIONSHIP_SEND_OTP_FOR_CONSENT:
    BASE_URL_REST_API + "patient/PatientRelationship/RelationSendOtp",
  PATIENT_RELATIONSHIP_VALIDATE_OTP_FOR_CONSENT:
    BASE_URL_REST_API + "patient/RelationshipValidateOtp",
  GET_ALL_CONFIGURATIONS:
    BASE_URL_REST_API + "mastersetup/configuration/code/{0}",
  GET_NEGOTIATE_DATA: BASE_URL_REST_API + "notification/negotiate",
  GET_LATEST_NOTIFICATION_COUNT:
    BASE_URL_REST_API + "order/OpCommandCenter/order/notification/{0}/latest",
  RESET_NOTIFICATION_COUNT:
    BASE_URL_REST_API + "order/OpCommandCenter/notification/reset/{0}",
  GET_ORDER_COUNT: BASE_URL_REST_API + "order/cart/{0}/orderCount",
  VALIDATE_ZIP_CODE: BASE_URL_REST_API + "mastersetup/zip/address",
  GET_PRODUCT_DETAIL: BASE_URL_REST_API + "inventory/products/{0}",
  GET_RX_OPTIONS:
    BASE_URL_REST_API + "mastersetup/configuration/rxrange/rxrangevalues",
  GET_LENS_SELECTION_URL: BASE_URL_REST_API + "inventory/products/lens/{0}",
  ADD_TO_CART_PATIENT: BASE_URL_REST_API + "order/customer/cart",
  ADD_TO_CART_GUEST: BASE_URL_REST_API + "order/guest/cart",

  ADD_PRESCRIPTION: BASE_URL_REST_API + "patient/prescriptions",

  GET_PAPER_CAPTURE: BASE_URL_REST_API + "patient/{0}/PatientPaperCapture",
  GET_RX_RENEWAL_TIMING_CONFIG:
    BASE_URL_REST_API + "mastersetup/configuration/code/{0}",
  CREATE_APPOINTMENT_ON_VISION_TEST_CLICK:
    BASE_URL_REST_API + "appointment/rxRenewal/appointment",
  GET_CUSTOMER_CART_DETAIL: BASE_URL_REST_API + "order/customer/{0}/cart",
  MERGE_GUEST_CART_DATA:
    BASE_URL_REST_API + "order/customer/MergeGuestCartToPatientCart",

  ACCEPT_RING_CENTRAL_NOTIFICATION:
    BASE_URL_REST_API + "mastersetup/acceptCallNotification",
  GET_IP_ADDRESSES_FOR_STORE:
    BASE_URL_REST_API + "storesetup/store/{0}/ipaddress",
  HOME_PAGE_ENGLISH: BASE_URL_REST_API + "storesetup/brand/page/{0}/Home",
  HOME_PAGE_WITH_LANGUAGE_CODE:
    BASE_URL_REST_API + "storesetup/brand/page/{0}/Home?languageCode={1}",
  EVENT_JOURNEY_ACTION:
    BASE_URL_REST_API + "mastersetup/SaveGuidedSalesJourneyAction",
  GET_EVENT_JOURNEY:
    BASE_URL_REST_API + "mastersetup/GetEventJourney?eventId={0}",

  SAVE_PATIENT_ADDRESS: BASE_URL_REST_API + "patient/Address",
};
