import { HeaderConfig } from "./../../../host/src/config/headerConfig";
import axios from "axios";
import { HomeUrlConstants } from "@/constants/home.url.constants";
import {
  AppointmentReservation,
  BookAppointmentPayloadDTO,
  NewPatientDTO,
  PatientSearchDTO,
} from "@/types/bookEyeExamSteps.types";

export const GetUserStoreDetails = (storeId: string, date: string) =>
  axios.get(
    HomeUrlConstants.STORE_LOCATOR_STORE_ID.replace("{0}", storeId).replace(
      "{1}",
      date,
    ),
    HeaderConfig(),
  );

export const GetStoreDetailsByStoreNumber = (storeNumber: string) => {
  return axios.get(
    HomeUrlConstants.STORE_LOCATOR_STORE_NUMBER.replace("{0}", storeNumber),
    HeaderConfig(),
  );
};

export const GetUserStoreDetailsByName = (
  storeName: string,
  date: string,
  latitude?: string,
  longitude?: string,
) => {
  let url = HomeUrlConstants.STORE_LOCATOR_STORE_NAME.replace("{0}", storeName)
    .replace("{1}", date)
    .replace("{2}", storeName);
  if (latitude && longitude) {
    url = url + `&latitude=${latitude}&longitude=${longitude}`;
  }
  return axios.get(url, HeaderConfig());
};
export const GetUserStoreContent = (storeId: string) =>
  axios.get(
    HomeUrlConstants.STORE_LOCATOR_CONTENT.replace("{0}", storeId).replace(
      "{1}",
      storeId,
    ), // change to storeId
    HeaderConfig(),
  );

export const GetAllWebSchedulerVisibleAppointmentTypes = () =>
  axios.get(
    HomeUrlConstants.SCHEDULER_SETUP_VISIBLE_APPOINTMENT_TYPE_WEB,
    HeaderConfig(),
  );

export const searchPatient = (
  data: PatientSearchDTO,
  recaptchaToken?: string,
) =>
  axios.post(HomeUrlConstants.PATIENT_WEB_SEARCH, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const GetSlotsForWebScheduler = (
  StoreId: number,
  AppointmentDate: string,
  AppointmentTypeId: number,
  PatientDob: string | null,
  recaptchaToken?: string,
) =>
  axios.post(
    HomeUrlConstants.SCHEDULER_GET_SLOTS_FOR_WEBSCHEDULER,
    {
      StoreId,
      AppointmentDate,
      AppointmentTypeId,
      PatientDob,
    },
    {
      headers: {
        ...HeaderConfig().headers,
        recaptchaToken: recaptchaToken,
      },
    },
  );

export const BookAppointment = (
  data: BookAppointmentPayloadDTO,
  recaptchaToken?: string,
) =>
  axios.post(HomeUrlConstants.BOOK_APPOINTMENT, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const UpdateAppointment = (
  appointmentId: string,
  data: BookAppointmentPayloadDTO,
  recaptchaToken?: string,
) =>
  axios.put(HomeUrlConstants.UPDATE_APPOINTMENT + appointmentId, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const UpdateAppointmentForAnonymousUser = (
  appointmentId: string,
  data: BookAppointmentPayloadDTO,
  recaptchaToken?: string,
) =>
  axios.put(
    HomeUrlConstants.UPDATE_APPOINTMENT_FOR_ANONYMOUS_USER.replace(
      "{1}",
      appointmentId,
    ),
    data,
    {
      headers: {
        ...HeaderConfig().headers,
        recaptchaToken: recaptchaToken,
      },
    },
  );

export const CreateNewPatient = (
  data: NewPatientDTO,
  recaptchaToken?: string,
) =>
  axios.post(HomeUrlConstants.CREATE_NEW_PATIENT, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const ReserveSlot = (
  data: AppointmentReservation,
  recaptchaToken?: string,
) =>
  axios.post(HomeUrlConstants.SCHEDULER_SCREATE_APPOINTMENT_RESERVATION, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const GetAuthenticatedStoreLocatorGrid = (
  pageNumber: string,
  searchText?: string,
  brandName?: string,
  latitude?: string,
  longitude?: string,
  sortDescending?: boolean,
  pageSize?: number,
) => {
  let url = HomeUrlConstants.STORE_LOCATOR_GRID_AUTHENTICATED.replace(
    "{0}",
    pageNumber,
  );

  if (searchText) {
    url = url + `&search=${searchText}`;
  }
  if (brandName) {
    url = url + `&brandName=${brandName}`;
  }
  if (latitude && longitude) {
    url =
      url +
      `&latitude=${latitude}&longitude=${longitude}&sortField=Distance&sortDescending=false`;
  }
  if (pageSize) {
    url = url + `&pageSize=${pageSize}`;
  }
  return axios.get(url, HeaderConfig());
};
export const GetPublicStoreLocatorGrid = (
  pageNumber: string,
  searchText?: string,
  brandName?: string,
  latitude?: string,
  longitude?: string,
  sortDescending?: boolean,
  pageSize?: number,
) => {
  let url = HomeUrlConstants.STORE_LOCATOR_GRID_PUBLIC.replace(
    "{0}",
    pageNumber,
  );
  if (searchText) {
    url = url + `&search=${searchText}`;
  }
  if (brandName) {
    url = url + `&brandName=${brandName}`;
  }
  if (latitude && longitude) {
    url =
      url +
      `&latitude=${latitude}&longitude=${longitude}&sortField=Distance&sortDescending=false`;
  }
  if (pageSize) {
    url = url + `&pageSize=${pageSize}`;
  }

  return axios.get(url, HeaderConfig());
};

export const getStoreWorkingHour = (storeId: string, currentDate: string) =>
  axios.get(
    HomeUrlConstants.STORE_WORKING_HOUR.replace("{0}", storeId).replace(
      "{1}",
      currentDate,
    ),
    HeaderConfig(),
  );

export const GetAppointmentDetails = (
  patientId: string,
  appointmentId: string,
) => {
  return axios.get(
    HomeUrlConstants.GET_APPOINTMENT_DETAILS + `${patientId}/${appointmentId}`,
    HeaderConfig(),
  );
};

export const GetAnonymousUserAppointmentDetails = (appointmentId: string) => {
  return axios.get(
    HomeUrlConstants.GET_APPOINTMENT_DETAILS_ANONYMOUS_USER.replace(
      "{1}",
      appointmentId,
    ),
    HeaderConfig(),
  );
};

export const getMyAccountProfileData = async (patientId: string) =>
  await axios.get(
    HomeUrlConstants.GET_MY_ACCOUNT_PROFILE.replace("{0}", patientId),
    HeaderConfig(),
  );

export const GetPatientDetailsGuest = async (
  encryptedAppointmentId: string,
  recaptchaToken?: string,
) =>
  axios.get(HomeUrlConstants.GET_PATIENT_INFORMATION_ANONYMOUS + `?id=${encodeURIComponent(encryptedAppointmentId!)}`, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const GetAddressByZipCode = async (
  zipCode: number
) =>
  axios.get(HomeUrlConstants.GET_ADDRESS_BY_ZIP_CODE_ANONYMOUS + `${zipCode}`, {
    headers: {
      ...HeaderConfig().headers
    },
  });

export const UpdatePatientDetails = async (
  payload: any,
  recaptchaToken?: string,
) =>
  axios.put(HomeUrlConstants.UPDATE_PATIENT_DETAILS, payload, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const UpdatePatientDetailsGuest = async (
  payload: any,
  recaptchaToken?: string,
) =>
  axios.put(HomeUrlConstants.UPDATE_PATIENT_DETAILS_GUEST, payload, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });

export const GetExistingAppointmentDetails = async (
  patientId: number,
  appointmentDate: string,
  apptId?: number,
) => {
  let url = HomeUrlConstants.GET_EXISTING_APPOINTMENT.replace(
    "{0}",
    patientId.toString(),
  ).replace("{1}", appointmentDate);
  if (apptId) {
    url = `${url}?apptId=${apptId}`;
  }
  return await axios.get(url, HeaderConfig());
};

export const CancelAppointmentForAnonymousUser = (
  appointmentId: string,
  recaptchaToken?: string,
) =>
  axios.put(
    HomeUrlConstants.CANCEL_APPOINTMENT_DETAILS.replace("{1}", appointmentId),
    {},
    {
      headers: {
        ...HeaderConfig().headers,
        recaptchaToken: recaptchaToken,
      },
    },
  );

export const GetListOfRelatedPatients = (
  phoneNumber: string,
  isdCode: string,
  recaptchaToken?: string,
) => {
  return axios.post(
    HomeUrlConstants.GET_RELATED_PATIENT_LIST,
    { phoneNumber, isdCode },
    {
      headers: {
        ...HeaderConfig().headers,
        recaptchaToken: recaptchaToken,
      },
    },
  );
};
