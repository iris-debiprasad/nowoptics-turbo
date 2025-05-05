import { HeaderConfig } from "@/config/headerConfig";
import { IrisUrlConstants } from "@/constants/iris.url.constants";
import axios from "axios";

export const GetLocationSEO = async (storeNumber: string) => {
  const apiKey = HeaderConfig().headers["api-key"];
  return axios.get(
    IrisUrlConstants.GET_LOCATION_SEO_DATA.replace("{0}", apiKey).replace(
      "{1}",
      storeNumber
    )
  );
};

export const GetProductSEO = async (id: string) => {
  const apiKey = HeaderConfig().headers["api-key"];
  return axios.get(
    IrisUrlConstants.GET_PRODUCT_SEO_DATA.replace("{0}", id).replace(
      "{1}",
      apiKey
    )
  );
};
