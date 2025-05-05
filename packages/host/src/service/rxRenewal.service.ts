import { CommonUrlConstants } from "../constants/common.url.constants";
import { IrisUrlConstants } from "../constants/iris.url.constants";
import { TableQueryParamsDTO } from "../types/TableFilter.types";
import { rxRenewalAppointmentPayloadDTO } from "../types/rxRenewal.types";
import { HeaderConfig } from "@root/host/src/config/headerConfig";
import axios from "axios";

export const getMyAccountPrescriptions = async (
  patientId: string,
  params: TableQueryParamsDTO
) =>
  await axios.get(
    IrisUrlConstants.GET_MY_ACCOUNT_PRESCRIPTIONS.replace("{0}", patientId),
    { params: { ...params }, ...HeaderConfig() }
  );

export const getRxRenewalExpiredPrescriptions = async (
  params: TableQueryParamsDTO,
  patientId: string,
  eventId: number | undefined
) =>
  await axios.get(
    IrisUrlConstants.GET_RX_RENEWAL_PRESCRIPTIONS.replace("{0}", patientId),
    {
      params: { ...params, eventId: eventId },
      ...HeaderConfig(),
    }
  );

export const viewCustomerRxPaperCapture = async (rxId: number) =>
  await axios.get(
    IrisUrlConstants.VIEW_CUSTOMER_RX_PAPER_CAPTURE.replace(
      "{0}",
      rxId.toString()
    ),
    HeaderConfig()
  );

export const getRxRangeBasedOnBrandIdItemNumber = async (
  itemNumber: string,
  colorId: number,
  type: string,
  brandId: number
) =>
  await axios.get(
    IrisUrlConstants.GET_RX_RANGE_BASED_ON_BRANDID_ITEMNUMBER.replace(
      "{0}",
      itemNumber ? itemNumber : "null"
    )
      .replace("{1}", colorId ? colorId.toString() : "null")
      .replace("{2}", type ? type : "null")
      .replace("{3}", brandId.toString()),
    HeaderConfig()
  );

export const getPrescriptionByIdCustomer = async (prescriptionId: number) =>
  await axios.get(
    IrisUrlConstants.GET_CUSTOMER_PRESCRIPTIONS_BY_ID.replace(
      "{0}",
      prescriptionId.toString()
    ),
    HeaderConfig()
  );

export const getMrsToken = async (eventId: number) =>
  await axios.get(IrisUrlConstants.GET_MRS_TOKEN, {
    params: { eventId },
    headers: { ...HeaderConfig().headers },
  });

export const getRxRenewalTimingConfig = async () =>
  await axios.get(
    CommonUrlConstants.GET_RX_RENEWAL_TIMING_CONFIG.replace(
      "{0}",
      "RxRenewalWeeklyWorkingHours"
    ),
    HeaderConfig()
  );

export const createAppointmentOnVisionTestClick = (
  payload: rxRenewalAppointmentPayloadDTO,
  captchaToken: string
) => {
  return axios.post(
    CommonUrlConstants.CREATE_APPOINTMENT_ON_VISION_TEST_CLICK,
    payload,
    {
      headers: {
        ...HeaderConfig().headers,
        recaptchaToken: captchaToken,
      },
    }
  );
};
