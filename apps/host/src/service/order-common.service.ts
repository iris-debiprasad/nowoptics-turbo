import { HeaderConfig } from "@/config/headerConfig";
import { BRAND, SO_DEFAULT_STORE_NUMBER } from "@/constants/common.constants";
import { CommonUrlConstants } from "@/constants/common.url.constants";
import { checkBrand } from "@/utils/common.utils";
import axios from "axios";

export const addToCartGuest = (
  payload: any = {},
  gReCaptchaToken?: string | null
) => {
  let storeNumber = SO_DEFAULT_STORE_NUMBER;
  const storeDetails = localStorage.getItem("selectedStore");
  if (storeDetails) {
    storeNumber = JSON.parse(storeDetails).StoreNumber;
  }

  return axios.post(CommonUrlConstants.ADD_TO_CART_GUEST, payload, {
    headers: {
      ...HeaderConfig().headers,
      storeNumber,
      RecaptchaToken: gReCaptchaToken,
      brandName: checkBrand() === BRAND.MEL ? BRAND.MEL : BRAND.SO
    },
  });
};

export const addToCartPatient = (
  payload: any = {},
  storeNumber: number,
  gReCaptchaToken?: string | null
) => {
  return axios.post(CommonUrlConstants.ADD_TO_CART_PATIENT, payload, {
    headers: {
      ...HeaderConfig().headers,
      storeNumber: storeNumber,
      RecaptchaToken: gReCaptchaToken,
      brandName: checkBrand() === BRAND.MEL ? BRAND.MEL : BRAND.SO
      
    },
  });
};

export const getLensSelectionData = (variantNumber: string) => {
  return axios.get(
    CommonUrlConstants.GET_LENS_SELECTION_URL.replace("{0}", variantNumber),
    HeaderConfig()
  );
};

export const getRxSelectConfig = async () =>
  await axios.get(CommonUrlConstants.GET_RX_OPTIONS, HeaderConfig());
