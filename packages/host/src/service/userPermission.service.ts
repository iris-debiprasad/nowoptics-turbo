import { HeaderConfig } from "@/config/headerConfig";
import { IrisUrlConstants } from "@/constants/iris.url.constants";
import axios from "axios";

export const GetAuthenticatedUserPermission = () => {
  const config = {
    headers: {
      ...HeaderConfig().headers,
    },
  }
  return axios.get(
    IrisUrlConstants.USER_PERMISSION_URL,
    config
  );
};
