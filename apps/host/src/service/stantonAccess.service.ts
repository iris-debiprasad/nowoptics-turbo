import { HeaderConfig } from "@/config/headerConfig";
import { IrisUrlConstants } from "@root/host/src/constants/iris.url.constants";
import { APISubscribeUsersPayload } from "@root/host/src/types/stantonAccess.types";
import axios from "axios";

export const GetListOfRelatedPatients = (
  phoneNumber: string,
  isdCode: string,
  recaptchaToken?: string,
) => {
  return axios.post(
    IrisUrlConstants.GET_RELATED_PATIENT_LIST,
    { phoneNumber, isdCode },
    {
      headers: {
        ...HeaderConfig().headers,
        recaptchaToken: recaptchaToken,
      },
    },
  );
};

export const SubscribeToStantonAccess = (
  data: APISubscribeUsersPayload,
  recaptchaToken: string,
) =>
  axios.post(IrisUrlConstants.CREATE_NEW_PATIENT, data, {
    headers: {
      ...HeaderConfig().headers,
      recaptchaToken: recaptchaToken,
    },
  });
