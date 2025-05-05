import axios from "axios";
import { HeaderConfig } from "@root/host/src/config/headerConfig";
import { TableQueryParamsDTO } from "@/types/TableFilter.types";
import { ExchangeMenuUrlConstants } from "@/constants/exchangeMenu.url.constants";

export const getPatientOrderFrameApi = (
  id: string,
  params: TableQueryParamsDTO,
  filter: string
) => {
  return axios.get(
    ExchangeMenuUrlConstants.GET_PAITIENT_ORDER_FRAME.replace(
      "{0}",
      id.toString()
    ),
    {
      params: { ...params, filters: filter },
      ...HeaderConfig(),
    }
  );
};
