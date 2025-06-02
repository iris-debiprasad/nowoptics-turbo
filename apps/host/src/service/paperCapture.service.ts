import axios from "axios";

import { HeaderConfig } from "@root/host/src/config/headerConfig";
import { GetQueryParamsType } from "@root/host/src/types/order-common.types";
import { CommonUrlConstants } from "@root/host/src/constants/common.url.constants";

export const getPaperCapture = async (
  patientId: number,
  params: GetQueryParamsType
) =>
  await axios.get(
    CommonUrlConstants.GET_PAPER_CAPTURE.replace("{0}", patientId.toString()),
    {
      params: params,
      ...HeaderConfig(),
    }
  );
