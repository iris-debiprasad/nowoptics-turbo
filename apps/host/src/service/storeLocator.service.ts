import axios from "axios";
import { IrisUrlConstants } from "../constants/iris.url.constants";
import { HeaderConfig } from "../config/headerConfig";
import { checkBrand } from "@root/host/src/utils/common.utils";
import { BRAND } from "@root/host/src/constants/common.constants";

export const GetAuthenticatedStoreLocatorGrid = (
  pageNumber: string,
  searchText?: string,
  brandName?: string,
  latitude?: string,
  longitude?: string,
  sortDescending?: boolean,
  isNowService?: boolean,
  isOnSiteDoctor?: boolean,
  isUserAvailabilityChecked?: boolean,
  fromDate?: any,
  toDate?: any
) => {
  let url = IrisUrlConstants.STORE_LOCATOR_GRID_AUTHENTICATED.replace(
    "{0}",
    pageNumber
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
  if (isNowService) {
    url = url + `&HasSameDayDelivery=${isNowService}`;
  }
  if (isOnSiteDoctor) {
    url = url + `&IsOnSiteDoctorAvailable=${isOnSiteDoctor}`;
  }
  if (isUserAvailabilityChecked) {
    url = url + `&isUserAvailabilityChecked=true`;
  }
  if (fromDate) {
    url = url + `&fromDate=${fromDate}`;
  }
  if (toDate) {
    url = url + `&toDate=${toDate}`;
  }

  return axios.get(url, HeaderConfig());
};
export const GetStoreSearch = (searchText: string) => {
  let url = IrisUrlConstants.STORE_LOCATOR_SEARCH.replace("{0}", searchText);
  return axios.get(url, HeaderConfig());
};
export const GetPublicStoreLocatorGrid = (
  pageNumber: string,
  searchText?: string,
  brandName?: string,
  latitude?: string,
  longitude?: string,
  sortDescending?: boolean,
  isNowService?: boolean,
  isOnSiteDoctor?: boolean,
  fromDate?: any,
  toDate?: any
) => {
  let url = IrisUrlConstants.STORE_LOCATOR_GRID_PUBLIC.replace(
    "{0}",
    pageNumber
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
  if (isNowService) {
    url = url + `&HasSameDayDelivery=${isNowService}`;
  }
  if (isOnSiteDoctor) {
    url = url + `&IsOnSiteDoctorAvailable=${isOnSiteDoctor}`;
  }
  if (fromDate) {
    url = url + `&fromDate=${fromDate}`;
  }
  if (toDate) {
    url = url + `&toDate=${toDate}`;
  }

  return axios.get(url, HeaderConfig());
};

export const GetPublicStoreLocatorGridForLocation = (
pageNumber: string, 
searchText?: string, 
brandName?: string, 
latitude?: string, 
longitude?: string,  
pageSize?: number,
) => {
  let url = IrisUrlConstants.STORE_LOCATOR_GRID_PUBLIC.replace(
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
    IrisUrlConstants.STORE_WORKING_HOUR.replace("{0}", storeId).replace(
      "{1}",
      currentDate
    ),
    HeaderConfig()
  );
export const GetUserStoreDetails = (storeId: string, date: string) =>
  axios.get(
    IrisUrlConstants.STORE_LOCATOR_STORE_ID.replace("{0}", storeId).replace(
      "{1}",
      date
    ),
    HeaderConfig()
  );
export const GetUserStoreDetailsByName = (
  storeName: string,
  date: string,
  latitude?: string,
  longitude?: string
) => {
  let url = IrisUrlConstants.STORE_LOCATOR_STORE_NAME.replace("{0}", storeName)
    .replace("{1}", date)
    .replace("{2}", storeName);
  if (latitude && longitude) {
    url = url + `&latitude=${latitude}&longitude=${longitude}`;
  }
  return axios.get(url, HeaderConfig());
};

export const SendSignMeUpEmail = (
  storeId: string,
  email: string,
  captchaToken: string
) =>
  axios.post(
    IrisUrlConstants.STORE_SETUP_SIGN_ME_UP_BTN,
    { Email: email, StoreNumber: storeId },
    { headers: { ...HeaderConfig().headers, recaptchaToken: captchaToken } }
  );

export const SendSignMeUpEmailMobile = (
  storeId: string,
  email: string,
  mobile: string,
  captchaToken: string
) =>
  axios.post(
    IrisUrlConstants.SIGNME_UP_EMAIL_MOBILE,
    { Email: email, StoreNumber: storeId, PhoneNumber: mobile },
    { headers: { ...HeaderConfig().headers, recaptchaToken: captchaToken } }
  );
