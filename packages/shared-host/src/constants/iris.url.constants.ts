export const BASE_URL_REST_API = process.env.NEXT_PUBLIC_BASE_URL + "/";
export const NEXTAUTH_BASE_URL = process.env.NEXTAUTH_URL;
const UNBXD_BASE_URL = process.env.NEXT_PUBLIC_UNBXD_BASE_URL;
const UNBXD_API_KEY = process.env.NEXT_PUBLIC_UNBXD_API_KEY;
const UNBXD_SITE_KEY = process.env.NEXT_PUBLIC_UNBXD_SITE_KEY;

export const IrisUrlConstants = {
  LOGIN_URL: BASE_URL_REST_API + "patientlogin/login",
  LOGIN_REDIRECT_URL: NEXTAUTH_BASE_URL,
  CREATE_ACCOUNT_URL: BASE_URL_REST_API + "patientlogin/myaccount",
  OTP_GENERATE_URL: BASE_URL_REST_API + "patientlogin/generateotp",
  OTP_VALIDATE_URL: BASE_URL_REST_API + "patientlogin/validateotp",
  SET_PASSWORD_URL: BASE_URL_REST_API + "patientlogin/setpassword",
  USER_PERMISSION_URL: BASE_URL_REST_API + "usersetup/user/permissions",
  //Stores API
  STORE_LOCATOR_GRID_PUBLIC:
    BASE_URL_REST_API + "storesetup/storelocator/grid?pageNumber={0}",
  STORE_WORKING_HOUR:
    BASE_URL_REST_API +
    "storesetup/storelocator/{0}/workinghours?currentDate={1}",
  STORE_LOCATOR_STORE_ID:
    BASE_URL_REST_API + "storesetup/storelocator/{0}?Date={1}",
  STORE_LOCATOR_STORE_NAME:
    BASE_URL_REST_API +
    "storesetup/storelocator/workingHours/storename/{0}?Date={1}&locationPageName={2}",
  STORE_LOCATOR_GRID_AUTHENTICATED:
    BASE_URL_REST_API + "storesetup/user/store/grid?pageNumber={0}",
  STORE_SETUP_SIGN_ME_UP_BTN: BASE_URL_REST_API + "patient/SignMeUp",
  STORE_LOCATOR_SEARCH: BASE_URL_REST_API + "storesetup/Store/{0}",
  SIGNME_UP_EMAIL_MOBILE:
    BASE_URL_REST_API + "patient/SignUpWithEmailAndPhoneNumber",

  PRODUCT_SEARCH:
    UNBXD_BASE_URL +
    "/" +
    UNBXD_API_KEY +
    "/" +
    UNBXD_SITE_KEY +
    "/search?q={*}&version=v2&start=0&rows=10&sort=title%20asc&fields=id,title,price,mPrice,sku,uniqueId,color,modelnumber,vColor,productgroup&variants=false",
  ORDER_SEARCH: BASE_URL_REST_API + "order/search/user/{0}/{1}",
  PATIENT_SEARCH: BASE_URL_REST_API + "patient/Search/{0}/{1}",
  PATIENT_ADVANCED_SEARCH: BASE_URL_REST_API + "patient/Search",
  PATIENT_APPOINTMENTS: BASE_URL_REST_API + "Appointment/patient/{0}/{1}",
  ADD_MY_ACCOUNT_PRESCRIPTION:
    BASE_URL_REST_API + "patient/Customer/prescriptions",
  GET_MY_ACCOUNT_PRESCRIPTIONS:
    BASE_URL_REST_API + "patient/Customer/{0}/prescriptions/Grid",
  GET_RX_RANGE_BASED_ON_BRANDID_ITEMNUMBER:
    BASE_URL_REST_API + "inventory/RxRange/{0}/{1}/{2}/{3}",
  GET_CUSTOMER_PRESCRIPTIONS_BY_ID:
    BASE_URL_REST_API + "patient/Customer/prescriptions/{0}",
  VIEW_CUSTOMER_RX_PAPER_CAPTURE:
    BASE_URL_REST_API + "patient/Customer/PatientPaperCapture/{0}",
  EXAM_TYPES: BASE_URL_REST_API + "inventory/products/examType/{0}/{1}",
  ADD_TO_CART_ASSOCOATE: BASE_URL_REST_API + "order/cart",
  CART_BADGE_COUNT_ASSOCIATE: BASE_URL_REST_API + "order/StoreCart/{0}",
  CART_BADGE_COUNT_PATIENT:
    BASE_URL_REST_API + "order/Customer/StoreCart/{0}/{1}",
  MY_ACCOUNT_FAVORITES:
    BASE_URL_REST_API +
    "patient/Customer/{0}/PatientFavouriteProducts/Store/{1}",
  GET_SELF_CHECKING_PATIENT_DETAILS:
    BASE_URL_REST_API + "Appointment/patient/ByEncryptedAppointmentId?id={0}",
  GET_LOCATION_SEO_DATA:
    BASE_URL_REST_API +
    "storesetup/store/storeDetailForSeo?api-key={0}&locationPageName={1}",
  GET_PRODUCT_SEO_DATA:
    BASE_URL_REST_API + "inventory/singleproducts/{0}?api-key={1}",
  GET_FACETS: `${UNBXD_BASE_URL}/${UNBXD_API_KEY}/${UNBXD_SITE_KEY}/category?pagetype=boolean`,
  GOOLE_MAP_API: "https://maps.googleapis.com/maps/api/geocode/json",
  GET_MERGE_PATIENT_GRID:
    BASE_URL_REST_API + "patient/patients/merge/grid?patientsList={0}",
  GET_MERGE_PATIENT_DETAILS:
    BASE_URL_REST_API +
    "patient/patientMerge/PatientsInfo?MergePatientList={0}",
  ADD_MERGE_PATIENT: BASE_URL_REST_API + "patient/patientMerge",
  GOOGLE_CURRENT_LOCATION_API:
    "https://www.googleapis.com/geolocation/v1/geolocate?key={0}",
  GET_RX_RENEWAL_PRESCRIPTIONS:
    BASE_URL_REST_API + "patient/Customer/prescriptions/rxRenewal/{0}",
  GET_MRS_TOKEN: BASE_URL_REST_API + "mastersetup/GetMrsAccessToken",
  CHECK_MRS_ONGOING_CALL_STATUS:
    BASE_URL_REST_API + "mastersetup/CheckOnGoingCall",
  GET_CART_DATA_FOR_PATIENT: BASE_URL_REST_API + "order/customer/cart/{0}",
  GET_CART_DATA_FOR_GUEST: BASE_URL_REST_API + "order/guest/{0}/cart",
  GET_DEFAULT_STORE_ID:
    BASE_URL_REST_API + "StoreSetup/store/storeDetail/id/9996",
  CART_BADGE_COUNT_OF_PATIENT_FOR_AGENT:
    BASE_URL_REST_API + "order/user/Customer/StoreCart/{0}",
  CART_BADGE_COUNT_OF_PATIENT_FOR_AGENT_USING_CARTID:
    BASE_URL_REST_API + "order/user/cart/{0}/orderCount",
  GUIDED_SALES_ENABLE_STATE:
    BASE_URL_REST_API + "mastersetup/state/{0}/isGuidedSalesEnabled",
  CREATE_NEW_PATIENT: BASE_URL_REST_API + "patient/Customer/Add",
  STORE_LOCATOR_CONTENT:
    BASE_URL_REST_API +
    "storesetup/storelocator/locationPage/storename/{0}?locationPageName={1}",
  GET_RELATED_PATIENT_LIST:
    BASE_URL_REST_API + "patient/Customer/GetPatientWithSameNumber",
};
