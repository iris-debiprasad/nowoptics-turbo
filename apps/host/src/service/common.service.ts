import axios from "axios";
import { HeaderConfig } from "../config/headerConfig";
import { CommonUrlConstants } from "../constants/common.url.constants";
import { consentModalSendOtpPayload } from "../types/addRelationConsentModal.types";
import { eyeExamAddToCartPayloadType } from "../types/eyeExamFlow.types";
import { IrisUrlConstants } from "../constants/iris.url.constants";
import { MergePatientPayloadType } from "@root/host/src/types/MergePatient.types";
import { GetQueryParamsType } from "@root/host/src/types/customTablePagination.types";
import {
  BRAND,
  BRAND_NAME,
  ISD_CODE,
  SO_DEFAULT_STORE_NUMBER,
} from "@root/host/src/constants/common.constants";
import { signIn } from "next-auth/react";
import { AddPrescriptionDTO } from "@root/host/src/types/MyAccount.types";
import { GoogleMapApiResponse } from "@root/host/src/types/visionIntake.types";
import { checkBrand } from "@root/host/src/utils/common.utils";
import { EventJourneyPayload } from "@root/host/src/types/Header.types";

const MAP_API_KEY = process.env.NEXT_PUBLIC_MAP_SECRET;

export const GetCommunicationType = (type: string) => {
  return axios.get(
    CommonUrlConstants.GET_MASTER_LOOKUP_BY_TYPE.replace("{0}", type),
    HeaderConfig()
  );
};

export const GetCompanyDropdown = () => {
  return axios.get(CommonUrlConstants.GET_COMPANY_DROPDOWN, HeaderConfig());
};

export const GetMarketingDropdown = () => {
  return axios.get(
    CommonUrlConstants.GET_MARKETING_DMA_DROPDOWN,
    HeaderConfig()
  );
};

export const GetBrandDropdown = () => {
  return axios.get(CommonUrlConstants.GET_BRAND_DROPDOWN, HeaderConfig());
};

export const GetCountryDropdown = (countryId: string) => {
  return axios.get(
    CommonUrlConstants.GET_COUNTRY_DROPDOWN.replace("{0}", countryId),
    HeaderConfig()
  );
};

export const GetStoreDropdown = (storeId: string) => {
  return axios.get(
    CommonUrlConstants.GET_STORE_DROPDOWN.replace("{0}", storeId),
    HeaderConfig()
  );
};

export const getAllMasterLookupByType = (lookupType: string) => {
  return axios.get(
    CommonUrlConstants.GET_MASTER_LOOKUP_BY_TYPE.replace("{0}", lookupType),
    HeaderConfig()
  );
};

export const getOptionsByBrandCode = () => {
  return axios.get(CommonUrlConstants.GET_BRAND_CODE_OPTIONS, HeaderConfig());
};

export const getAllMasterSetupByType = (lookupType: string) => {
  return axios.get(
    CommonUrlConstants.GET_MASTERSETUP_BY_TYPE.replace("{0}", lookupType),
    HeaderConfig()
  );
};

export const GetAllOrderType = () => {
  return axios.get(CommonUrlConstants.GET_ALL_ORDER_TYPE, HeaderConfig());
};

export const GetAllOrderStatusCode = () => {
  return axios.get(CommonUrlConstants.GET_ORDER_STATUS_CODE, HeaderConfig());
};

export const CreatePatient = async (data: any) =>
  await axios.post(CommonUrlConstants.CREATE_PATIENT, data, {
    headers: HeaderConfig().headers,
    validateStatus: function (status) {
      return status <= 300;
    },
  });

export const GetAllRelationshipsTypes = async () =>
  await axios.get(
    CommonUrlConstants.GET_ALL_RELATIONSHIPS_TYPES,
    HeaderConfig()
  );

export const GetDistrictDropdown = () => {
  return axios.get(CommonUrlConstants.GET_ALL_DISTRICT, HeaderConfig());
};

export const patientRelationshipSendOtp = async (
  data: consentModalSendOtpPayload
) =>
  await axios.post(
    CommonUrlConstants.PATIENT_RELATIONSHIP_SEND_OTP_FOR_CONSENT,
    data,
    HeaderConfig()
  );

export const patientRelationshipValidateOtp = async (
  data: consentModalSendOtpPayload
) =>
  await axios.post(
    CommonUrlConstants.PATIENT_RELATIONSHIP_VALIDATE_OTP_FOR_CONSENT,
    data,
    HeaderConfig()
  );

//TODO: associateAddToCart payload type can be updated by using union for other order types or by modifying the existing one
export const associateAddToCart = async (
  payload: eyeExamAddToCartPayloadType
) =>
  await axios.post(
    IrisUrlConstants.ADD_TO_CART_ASSOCOATE,
    payload,
    HeaderConfig()
  );

export const addToCartService = (payload: any) => {
  return axios.post(
    IrisUrlConstants.ADD_TO_CART_ASSOCOATE,
    payload,
    HeaderConfig()
  );
};
export const getAssociateCartBadgeCount = async (storeId: string) =>
  await axios.get(
    IrisUrlConstants.CART_BADGE_COUNT_ASSOCIATE.replace("{0}", storeId),
    HeaderConfig()
  );

export const getPatientCartBadgeCount = async (
  patientId: string,
  storeId: string
) =>
  await axios.get(
    IrisUrlConstants.CART_BADGE_COUNT_PATIENT.replace("{0}", patientId).replace(
      "{1}",
      storeId
    ),
    HeaderConfig()
  );

export const getPatientFavourites = async (
  patientId: string,
  storeId: string
) => {
  const params = {
    pageNumber: 1,
    pageSize: 100000,
  };
  return await axios.get(
    IrisUrlConstants.MY_ACCOUNT_FAVORITES.replace("{0}", patientId).replace(
      "{1}",
      storeId
    ),
    { params: params, ...HeaderConfig() }
  );
};

export const getPatientDetailsFromAppointmentId = async (
  appointmentId: string
) => {
  return await axios.get(
    IrisUrlConstants.GET_SELF_CHECKING_PATIENT_DETAILS.replace(
      "{0}",
      appointmentId
    ),
    HeaderConfig()
  );
};

export const getAllConfigurations = (code: string) => {
  return axios.get(
    CommonUrlConstants.GET_ALL_CONFIGURATIONS.replace("{0}", code),
    HeaderConfig()
  );
};

export const getNegotiateData = (userId: string) => {
  return axios.get(CommonUrlConstants.GET_NEGOTIATE_DATA, {
    params: { userid: userId },
    ...HeaderConfig(),
  });
};

export const getLatestNotificationCount = (storeId: string) => {
  return axios.get(
    CommonUrlConstants.GET_LATEST_NOTIFICATION_COUNT.replace("{0}", storeId),
    HeaderConfig()
  );
};

export const resetNotificationCount = (storeId: string) => {
  return axios.put(
    CommonUrlConstants.RESET_NOTIFICATION_COUNT.replace("{0}", storeId),
    {},
    HeaderConfig()
  );
};

export const getCartOrderCountForPatientAndGuest = (cartId: string) => {
  return axios.get(
    CommonUrlConstants.GET_ORDER_COUNT.replace("{0}", cartId),
    HeaderConfig()
  );
};

export const getProducts = (
  page: number,
  rowPerPage: number,
  isVariant: boolean,
  filter?: string,
  includeIsWebEnabled?: boolean // send true if you want to include isWebEnabled filter
) => {
  let url = `https://search.unbxd.io/${process.env.NEXT_PUBLIC_UNBXD_API_KEY}/${
    process.env.NEXT_PUBLIC_UNBXD_SITE_KEY
  }/category?p=categoryPath:*&pagetype=boolean&filter=mIsWebEnabled_uFilter:true${
    includeIsWebEnabled ? `&filter=isWebEnabled_uFilter:true` : ""
  }${filter ? `&filter=${filter}` : ""}`;
  url = `${url}&page=${page}&rows=${rowPerPage}&variants=${isVariant}&variants.count=*`;
  url = url.replace("&&", "&");
  return axios.get(url);
};

export const getAllFacets = (keyname: string = "") => {
  if (keyname) {
    return axios.get(
      `${IrisUrlConstants.GET_FACETS}&${keyname}`,
      HeaderConfig()
    );
  }
  return axios.get(IrisUrlConstants.GET_FACETS);
};

export const commonUtilForGetAllFacets = async (keyname: string = "") => {
  const res = await getAllFacets(keyname);
  let facets = res.data.facets;
  if (facets === undefined) facets = {};
  return {
    props: {
      facets,
    },
    revalidate: 1800,
  };
};

export const ValidateZipCode = async (postalCode: string) =>
  axios.get(CommonUrlConstants.VALIDATE_ZIP_CODE, {
    params: { postalCode },
    ...HeaderConfig(),
  });

export const GetGeoLocationData = (areaName: string) => {
  return axios.get(
    `${IrisUrlConstants.GOOLE_MAP_API}?address=${encodeURIComponent(
      areaName
    )}&key=${MAP_API_KEY}`
  );
};

export const GetPatientMergeGrid = (
  patientIdList: string,
  params: GetQueryParamsType
) => {
  return axios.get(
    IrisUrlConstants.GET_MERGE_PATIENT_GRID.replace("{0}", patientIdList),
    {
      params: { ...params },
      ...HeaderConfig(),
    }
  );
};

export const GetPatientMergeDetails = (patientIdList: string) => {
  return axios.get(
    IrisUrlConstants.GET_MERGE_PATIENT_DETAILS.replace("{0}", patientIdList),
    HeaderConfig()
  );
};

export const addMergePatient = (payload: MergePatientPayloadType) => {
  return axios.post(
    IrisUrlConstants.ADD_MERGE_PATIENT,
    payload,
    HeaderConfig()
  );
};

export const GetCurrentLocation = () => {
  return axios.post(
    IrisUrlConstants.GOOGLE_CURRENT_LOCATION_API.replace(
      "{0}",
      MAP_API_KEY as string
    ),
    {}
  );
};

export const generateOtpForgotPassword = (
  data: any,
  gRecaptchaToken?: string | null
) =>
  axios.post(IrisUrlConstants.OTP_GENERATE_URL, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: gRecaptchaToken,
    },
  });

export const createAccount = (data: any, gRecaptchaToken?: string | null) => {
  let HeaderConfigs = HeaderConfig();
  if (HeaderConfigs.headers) {
    HeaderConfigs.headers["CreatedAtStoreNumber"] = JSON.parse(
      localStorage?.getItem("selectedStore") as string
    )?.StoreNumber
      ? JSON.parse(localStorage?.getItem("selectedStore") as string)
          ?.StoreNumber
      : SO_DEFAULT_STORE_NUMBER;
  }
  return axios.post(IrisUrlConstants.CREATE_ACCOUNT_URL, data, {
    headers: {
      ...HeaderConfigs.headers,
      recaptchaToken: gRecaptchaToken,
    },
  });
};

export const signin = (
  formValues: any,
  captchaToken: string | null | undefined
) => {
  const storeNumber = JSON.parse(
    localStorage?.getItem("selectedStore") as string
  )?.StoreNumber
    ? JSON.parse(localStorage?.getItem("selectedStore") as string)?.StoreNumber
    : SO_DEFAULT_STORE_NUMBER;
  return signIn("credentials", {
    redirect: false,
    isdCode: ISD_CODE,
    username: formValues.mobileNumber.value,
    password: formValues.passWord.value,
    storeNumber: storeNumber,
    recaptchaToken: captchaToken,
  });
};

export const resetPassword = (
  password: string,
  patientId: number,
  storeNumber: number,
  recaptchaToken?: string | null | undefined
) => {
  let HeaderConfigs = HeaderConfig();
  if (recaptchaToken) {
    HeaderConfigs.headers["recaptchaToken"] = recaptchaToken;
  }

  HeaderConfigs.headers["CreatedAtStoreNumber"] = storeNumber;
  return axios.post(
    IrisUrlConstants.SET_PASSWORD_URL,
    {
      password: password,
      patientId: patientId,
    },
    HeaderConfigs
  );
};

export const addMyAccountPrescription = async (
  data: AddPrescriptionDTO,
  gRecaptchaToken?: string | null
) =>
  await axios.post(IrisUrlConstants.ADD_MY_ACCOUNT_PRESCRIPTION, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: gRecaptchaToken,
    },
  });

export const GetLocationDataFromLatLng = (lat: number, lng: number) => {
  return axios.get<GoogleMapApiResponse>(
    `${IrisUrlConstants.GOOLE_MAP_API}?latlng=${lat},${lng}&key=${MAP_API_KEY}`
  );
};

export const GetCartDataForEmarsysPatient = (patientId: string) => {
  return axios.get(
    IrisUrlConstants.GET_CART_DATA_FOR_PATIENT.replace("{0}", patientId),
    {
      headers: {
        ...HeaderConfig().headers,
        brandName: checkBrand() === BRAND.MEL ? BRAND.MEL : BRAND.SO,
      },
    }
  );
};

export const GetCartDataForEmarsysGuest = (cartId: string) => {
  return axios.get(
    IrisUrlConstants.GET_CART_DATA_FOR_GUEST.replace("{0}", cartId),
    {
      headers: {
        ...HeaderConfig().headers,
      },
    }
  );
};

export const GetDefaultStoreId = () => {
  return axios.get(IrisUrlConstants.GET_DEFAULT_STORE_ID, HeaderConfig());
};

export const getPatientCartDetails = (id: string, storeNumber: number) => {
  return axios.get(
    CommonUrlConstants.GET_CUSTOMER_CART_DETAIL.replace("{0}", id),
    {
      headers: {
        ...HeaderConfig().headers,
        storeNumber: storeNumber,
        brandName: checkBrand() === BRAND.MEL ? BRAND.MEL : BRAND.SO,
      },
    }
  );
};

export const mergeGuestCartData = (
  payload: any,
  patientID: string,
  captchaToken?: string | null
) => {
  return axios.put(CommonUrlConstants.MERGE_GUEST_CART_DATA, payload, {
    headers: {
      ...HeaderConfig().headers,
      patientID,
      recaptchaToken: captchaToken,
      brandName: checkBrand() === BRAND.MEL ? BRAND.MEL : BRAND.SO,
    },
  });
};

export const GetSOHomePageData = (languageCode: string) => {
  const brand = BRAND_NAME.SO.replace(/\s/g, "");
  if (languageCode === "de") {
    return axios.get(
      CommonUrlConstants.HOME_PAGE_WITH_LANGUAGE_CODE.replace(
        "{0}",
        brand
      ).replace("{1}", "es"),
      HeaderConfig()
    );
  } else {
    return axios.get(
      CommonUrlConstants.HOME_PAGE_ENGLISH.replace("{0}", brand),
      HeaderConfig()
    );
  }
};

export const SendEventJourney = async (
  eventData: EventJourneyPayload,
  captchaToken: string
) => {
  return axios.put(
    CommonUrlConstants.EVENT_JOURNEY_ACTION,
    {
      ...eventData,
    },
    {
      headers: { ...HeaderConfig().headers, recaptchaToken: captchaToken },
    }
  );
};

export const GetEventJourney = async (eventId: string) => {
  return axios.get(
    CommonUrlConstants.GET_EVENT_JOURNEY.replace("{0}", eventId),
    {
      headers: { ...HeaderConfig().headers },
    }
  );
};

export const getAgentCartBadgeCount = async (patientId: string) =>
  await axios.get(
    IrisUrlConstants.CART_BADGE_COUNT_OF_PATIENT_FOR_AGENT.replace(
      "{0}",
      patientId
    ),
    {
      headers: {
        ...HeaderConfig().headers,
        brandName: checkBrand() === BRAND.MEL ? BRAND.MEL : BRAND.SO,
      },
    }
  );

export const getAgentCartBadgeCountUsingCartId = async (cartId: string) =>
  await axios.get(
    IrisUrlConstants.CART_BADGE_COUNT_OF_PATIENT_FOR_AGENT_USING_CARTID.replace(
      "{0}",
      cartId
    ),
    HeaderConfig()
  );

export const CheckGuidedSalesEnableForState = async (stateCode: string) =>
  await axios.get(
    IrisUrlConstants.GUIDED_SALES_ENABLE_STATE.replace("{0}", stateCode),
    HeaderConfig()
  );

export const GetUserStoreContent = (storeId: string) =>
  axios.get(
    IrisUrlConstants.STORE_LOCATOR_CONTENT.replace("{0}", storeId).replace(
      "{1}",
      storeId
    ), // change to storeId
    HeaderConfig()
  );

export const GetListOfRelatedPatients = (
  phoneNumber: string,
  isdCode: string,
  recaptchaToken?: string
) => {
  return axios.post(
    IrisUrlConstants.GET_RELATED_PATIENT_LIST,
    { phoneNumber, isdCode },
    {
      headers: {
        ...HeaderConfig().headers,
        recaptchaToken: recaptchaToken,
      },
    }
  );
};

export const savePatientAddress = async (payload: any) => {
  const url = `${CommonUrlConstants.SAVE_PATIENT_ADDRESS}?isValidateAddress=true`;
  return await axios.post(url, payload, HeaderConfig());
};
