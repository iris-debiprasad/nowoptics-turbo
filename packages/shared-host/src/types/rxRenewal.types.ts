import { AlertColor } from "@mui/material";
import { helpingTextsDTO } from "./commonRx.types";
import { Dispatch, SetStateAction } from "react";

export interface CurrentPrescriptionrDTO {
  label: string;
  dataKey: string;
  type: string;
}

export interface ChooseToRenewType {
  handleBack: () => void;
  handleRenewGlass: () => void;
  handleRenewContacts: () => void;
  handleRenewGlassAndContacts: () => void;
}
export interface RxRenewalAddNew {
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showAddPrescriptionModal: boolean;
  prescriptionHeaders: any;
  addPrescription: Function;
  storeId: string;
  patientId: string;
  addContactPrescription: Function;
  setContactModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  helpingTexts: helpingTextsDTO;
  openContactModalOpen: boolean;
  handleRxModalBack: () => void;
  handleContactModalBack: () => void;
  showBoth: boolean;
  handleRenewBothBack: () => void;
  eventId: number;
}

export interface rxDataForRedirectDTO {
  token: string;
  contactid: string;
  rxmode: string;
  rxtype: string;
  spectacleid: string;
  patid: number;
  state: string;
}

export interface ScheduleEntry {
  Day: string;
  StartTime: string;
  EndTime: string;
  Closed: boolean;
}

export interface rxRenewalAppointmentPayloadDTO {
  WebStoreId: string | null;
  PatientId: number;
  EyeGlassRxIdToBeRenewed: boolean;
  ContactLensRxIdToBeRenewed: boolean;
}

export interface beginStepsForTestPropsDTO {
  setErrorBeginTest: Dispatch<SetStateAction<boolean>>;
  rxmode: string;
  rxtype: string;
  spectacleid: string;
  contactid: string;
}
