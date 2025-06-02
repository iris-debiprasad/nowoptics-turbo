import { HeaderConfig } from "@/config/headerConfig";
import { CommonUrlConstants } from "@root/host/src/constants/common.url.constants";
import { RingCentralAcceptPayloadDTO } from "@root/host/src/types/ringCentral.types";
import axios from "axios";

export const acceptRingCentralNotification = (
  payload: RingCentralAcceptPayloadDTO
) => {
  return axios.post(
    CommonUrlConstants.ACCEPT_RING_CENTRAL_NOTIFICATION,
    payload,
    {
      headers: {
        ...HeaderConfig().headers,
      },
    }
  );
};

export const getAllIPAddressesForGivenStore = async (storeId: string) => {
  return await axios.get(
    CommonUrlConstants.GET_IP_ADDRESSES_FOR_STORE.replace("{0}", storeId),
    HeaderConfig()
  );
};
