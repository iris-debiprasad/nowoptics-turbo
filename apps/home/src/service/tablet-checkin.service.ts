import { HomeUrlConstants } from "@/constants/home.url.constants";
import { HeaderConfig } from "@root/host/src/config/headerConfig";
import { TableQueryParamsDTO } from "@root/host/src/types/TableFilter.types";
import axios from "axios";

export const GetTabletCheckinGrid = (
  storeId: string,
  filters: string,
  params: TableQueryParamsDTO
) => {
  return axios.get(
    HomeUrlConstants.GET_TABLET_CHECKIN_GRID.replace("{0}", storeId),
    {
      params: {
        filters,
        ...params,
      },
      ...HeaderConfig(),
    }
  );
};

export const ChangeAppointmentStatus = (
  appointmentId: string,
  appointmentStatusId: string,
  data: any
) => {
  return axios.put(
    HomeUrlConstants.UPDATE_TABLET_CHECKIN_APPOINTMENT.replace(
      "{0}",
      appointmentId
    ).replace("{1}", appointmentStatusId),
    data,
    HeaderConfig()
  );
};