import { HeaderConfig } from "@/config/headerConfig";
import { CommonUrlConstants } from "@/constants/common.url.constants";
import axios from "axios";
export const getProductDetail = (id: string, storeNumber?: string | number) => {
  let url = CommonUrlConstants.GET_PRODUCT_DETAIL.replace("{0}", id);
  if (storeNumber) {
    url += `?storeNumber=${storeNumber}`;
  }

  return axios.get(url, HeaderConfig());
};


