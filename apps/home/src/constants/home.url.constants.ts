
export const BASE_URL_REST_API = process.env.NEXT_PUBLIC_BASE_URL + "/";

export const HomeUrlConstants = {
  STORE_LOCATOR_STORE_ID:
    BASE_URL_REST_API + "storesetup/storelocator/{0}?Date={1}",
  STORE_LOCATOR_STORE_NUMBER:
    BASE_URL_REST_API + "storesetup/storelocator/store/{0}",
  STORE_LOCATOR_STORE_NAME:
    BASE_URL_REST_API +
    "storesetup/storelocator/workingHours/storename/{0}?Date={1}&locationPageName={2}",
  STORE_LOCATOR_GRID_PUBLIC:
    BASE_URL_REST_API + "storesetup/storelocator/grid?pageNumber={0}",
  STORE_WORKING_HOUR:
    BASE_URL_REST_API +
    "storesetup/storelocator/{0}/workinghours?currentDate={1}",
  STORE_LOCATOR_GRID_AUTHENTICATED:
    BASE_URL_REST_API + "storesetup/user/store/grid?pageNumber={0}",
  STORE_LOCATOR_CONTENT:
    BASE_URL_REST_API +
    "storesetup/storelocator/locationPage/storename/{0}?locationPageName={1}",
  SCHEDULER_SCREATE_APPOINTMENT_RESERVATION:
    BASE_URL_REST_API + "appointment/customer/reserveSlot",
  SCHEDULER_SETUP_VISIBLE_APPOINTMENT_TYPE_WEB:
    BASE_URL_REST_API + "SchedulerSetup/appointmenttype/web",
  PATIENT_WEB_SEARCH: BASE_URL_REST_API + "patient/web/search",
  SCHEDULER_GET_SLOTS_FOR_WEBSCHEDULER: BASE_URL_REST_API + "appointment/web",
  BOOK_APPOINTMENT: BASE_URL_REST_API + "appointment/customer",
  UPDATE_APPOINTMENT: BASE_URL_REST_API + "appointment/web/",
  UPDATE_APPOINTMENT_FOR_ANONYMOUS_USER:
    BASE_URL_REST_API +
    "appointment/customer/edit/EncryptedAppointmentId?AppointmentId={1}",
  CREATE_NEW_PATIENT: BASE_URL_REST_API + "patient/customer/add",
  GET_APPOINTMENT_DETAILS_ANONYMOUS_USER:
    BASE_URL_REST_API +
    "appointment/customer/ByEncryptedAppointmentId?AppointmentId={1}",
  GET_APPOINTMENT_DETAILS: BASE_URL_REST_API + "appointment/customer/",
  CANCEL_APPOINTMENT_DETAILS:
    BASE_URL_REST_API +
    "appointment/Customer/Cancel/ByEncryptedAppointmentId?AppointmentId={1}",
  GET_TABLET_CHECKIN_GRID:
    BASE_URL_REST_API + "Appointment/store/{0}/tabletCheckIn/grid",
  UPDATE_TABLET_CHECKIN_APPOINTMENT:
    BASE_URL_REST_API + "Appointment/{0}/changeAppointmentStatus/{1}",
  GET_MY_ACCOUNT_PROFILE: BASE_URL_REST_API + "patient/Customer/{0}",
  UPDATE_PATIENT_DETAILS: BASE_URL_REST_API + "patient/Customer",
  UPDATE_PATIENT_DETAILS_GUEST:
    BASE_URL_REST_API + "patient/MedicalForm/Update",
  GET_EXISTING_APPOINTMENT:
    BASE_URL_REST_API + "Appointment/Patient/{0}/Date/{1}",
  GET_RELATED_PATIENT_LIST: BASE_URL_REST_API + 'patient/Customer/GetPatientWithSameNumber',
  GET_PATIENT_INFORMATION_ANONYMOUS: BASE_URL_REST_API + "patient/MedicalForm/",
  GET_ADDRESS_BY_ZIP_CODE_ANONYMOUS: BASE_URL_REST_API + "mastersetup/zip/address?postalCode="
};
