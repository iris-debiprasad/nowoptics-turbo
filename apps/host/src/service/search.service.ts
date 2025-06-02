import axios from "axios";
import { IrisUrlConstants } from "../constants/iris.url.constants";
import { HeaderConfig } from "../config/headerConfig";
import { AdvancedSearchFormPayloadType } from "../types/AdvancedSearchForm.types";

export const GetProductSearchData = (searchTerm: string) => {
  return axios.get(
    IrisUrlConstants.PRODUCT_SEARCH.replace(
      "{*}",
      encodeURIComponent(searchTerm)
    )
  );
};

export const GetOrderSearchData = async (searchTerm: string, storeId: string) =>
  await axios.get(
    IrisUrlConstants.ORDER_SEARCH.replace("{0}", storeId).replace(
      "{1}",
      searchTerm
    ),
    HeaderConfig()
  );

export const GetPatientSearchData = async (
  searchTerm: string,
  numberOfRecords: string
) =>
  await axios.get(
    IrisUrlConstants.PATIENT_SEARCH.replace("{0}", searchTerm).replace(
      "{1}",
      numberOfRecords
    ),
    HeaderConfig()
  );
  

export const GetPatientAppointements = (patientId: string, storeId: string) => {
  return axios.get(
    IrisUrlConstants.PATIENT_APPOINTMENTS.replace("{0}", patientId).replace(
      "{1}",
      storeId
    ),
    HeaderConfig()
  );
};

export const GetExamTypes = (storeId: string, patientId: string) => {
  return axios.get(
    IrisUrlConstants.EXAM_TYPES.replace("{0}", storeId).replace(
      "{1}",
      patientId
    ),
    HeaderConfig()
  );
};

export const GetAdvancedSearchData = async (
  data: AdvancedSearchFormPayloadType
) =>
  await axios.post(
    IrisUrlConstants.PATIENT_ADVANCED_SEARCH,
    data,
    HeaderConfig()
  );
