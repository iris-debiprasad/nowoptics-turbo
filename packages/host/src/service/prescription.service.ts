import axios from "axios"
import { HeaderConfig } from "@/config/headerConfig";
import { CommonUrlConstants } from "@/constants/common.url.constants";

export const checkIfPatientHasInHousePxs = (patientId: string) => {
  return axios.get(CommonUrlConstants.VERIFY_USER_HAS_IN_HOUSE_PX.
    replace("{0}", patientId), {
    ...HeaderConfig(),
  })
}
