import {
  PatientDataTabPanelDTO,
  unlinkPatientRelationshipPayloadType,
} from "./addPatientModal.types";
import { PatientDetailsDTO } from "./addPatientModal.types";
import { AlertColor } from "@mui/material";

export interface AddRelationConsentModalProps {
  setAddRelationSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  patientData: PatientDataTabPanelDTO;
  setConsentNotChange?: React.Dispatch<React.SetStateAction<boolean>>;
  consentNotChange?: boolean;
  successMessage?: string;
  createdPatientId?: number;
  selectedPatientDataFromList?: PatientDetailsDTO;
  setIsAddPatientModal: React.Dispatch<React.SetStateAction<boolean>>;
  otpModalOpenForConsentFromPatient?: boolean;
  setOtpModalOpenForConsentFromPatient?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  patientRelationshipSendOtpForConsentFromPatientFile?: (
    payload: consentModalSendOtpPayload | unlinkPatientRelationshipPayloadType
  ) => Promise<void>;
  isAddRelationshipFromPatientFile: boolean;
  payloadForSendOtpApi: consentModalSendOtpPayload;
  setSnackBar: (message: string, type: AlertColor) => void;
  setRecentlyCreatedPatientId?: React.Dispatch<React.SetStateAction<number>>;
}

export interface consentModalSendOtpPayload {
  patientId: number;
  phone: phoneType;
  otp?: string;
  relatedToPatient?: number;
  IsConsentProvide?: boolean;
  storeId?: number;
}

export interface phoneType {
  phoneNumber: string;
  isdCode: string;
}
