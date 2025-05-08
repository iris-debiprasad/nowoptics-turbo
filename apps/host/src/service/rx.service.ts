import axios from "axios";
import { HeaderConfig } from "@root/host/src/config/headerConfig";
import { AddPrescriptionDTO } from "@root/host/src/types/MyAccount.types";
import { CommonUrlConstants } from "@root/host/src/constants/common.url.constants";

export const addPatientPrescription = async (data: AddPrescriptionDTO) =>
  await axios.post(CommonUrlConstants.ADD_PRESCRIPTION, data, HeaderConfig());
