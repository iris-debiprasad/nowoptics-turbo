import { AlertColor } from "@mui/material";
import { Dayjs } from "dayjs";
import { consentModalSendOtpPayload } from "./addRelationConsentModal.types";
import { SelectChangeEvent } from "@mui/material/Select";

// Copied from Patient micro module;
export interface PatientDataTabPanelDTO {
  id: string;
  Dob: string;
  Email: string;
  FirstName: string;
  LastName: string;
  PhoneNumber: string;
  IsdCode: string;
}

export interface unlinkPatientRelationshipPayloadType {
  patientId: number;
  phone?: phoneType;
  otp?: string;
  relatedToPatient?: number;
  IsConsentProvide?: boolean;
}

export interface phoneType {
  phoneNumber: string;
  isdCode: string;
}
//

export interface AddPatientModalDTO {
  setIsAddPatientModal: React.Dispatch<React.SetStateAction<boolean>>;
  countryCodeOptions: CountryCodeOptionsDTO[];
  relationTypesOptions: RelationTypesOptionsDTO[];
  isListOfPatients: boolean;
  mobileNumberExistsMessage: string;
  patientListData: PatientDetailsDTO[];
  otpModalOpen: boolean;
  setOtpModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setMobileNumberExistsMessage: React.Dispatch<React.SetStateAction<string>>;
  setPatientListData: React.Dispatch<
    React.SetStateAction<PatientDetailsDTO[] | undefined>
  >;
  setIsListOfPatients: React.Dispatch<React.SetStateAction<boolean>>;
  setAddRelationSuccessModal: React.Dispatch<React.SetStateAction<boolean>>;
  addRelationSuccessModal?: boolean;
  patientData?: PatientDataTabPanelDTO;
  consentNotChange?: boolean;
  setConsentNotChange?: React.Dispatch<React.SetStateAction<boolean>>;
  successMessage?: string;
  createdPatientId?: number;
  otpModalOpenForConsentFromPatient?: boolean;
  setOtpModalOpenForConsentFromPatient?: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  patientRelationshipSendOtpForConsentFromPatientFile?: (
    payload: consentModalSendOtpPayload | unlinkPatientRelationshipPayloadType
  ) => Promise<void>;
  isAddRelationshipFromPatientFile?: boolean;
  setSnackBar?: (message: string, type: AlertColor) => void;
  setRecentlyCreatedPatientId?: React.Dispatch<React.SetStateAction<number>>;
  isCreateFromPatientModule?: boolean;
}

export interface AddPatientFormDTO {
  firstName: {
    value: string;
    error?: boolean;
    errorMessage?: string;
  };
  lastName: {
    value: string;
    error?: boolean;
    errorMessage?: string;
  };
  mobileNumber: {
    value: string;
    error?: boolean;
    errorMessage?: string;
  };
  countryCode: {
    value: string;
    error?: boolean;
    errorMessage?: string;
  };
  dob: {
    value: Dayjs | null;
    error?: boolean;
    errorMessage?: string;
  };
  email: {
    value: string;
    error?: boolean;
    errorMessage?: string;
  };
  zipCode: {
    value: string;
    error?: boolean;
    errorMessage?: string;
  };
}

export interface AddPatientPayloadDTO {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  primaryPhoneNo: {
    isdCode: string;
    phoneNumber: string;
  };
  zipCode: string;
  createdAtStoreId: number;
  skipRelation: string;
  RelatedPatients: [] | RelatedPatientsDTO[];
  OTP: string;
}

export type RelatedPatientsDTO = {
  RelatedPatientId: number;
  RelationTypeId: number;
  IsReverseRelationshipSelected: boolean;
};

export interface PatientDetailsDTO {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: {
    IsdCode: string;
    PhoneNumber: string;
  };
  Dob: string;
  CreatedAtStoreNumber?: number;
}

export interface CountryCodeOptionsDTO {
  IsdCode: string;
  Code: string;
}

export interface RelationTypesOptionsDTO {
  Id: number;
  Description: string;
  IsReverseRelationship: boolean;
}

export interface SearchPatientBarProps {
  performPatientSelectAction: (option: any) => void;
  recentlyCreatedPatientId: number;
  setRecentlyCreatedPatientId: React.Dispatch<React.SetStateAction<number>>;
  isFromDiffModule: boolean;
  setSnackBar: (message: string, type: AlertColor) => void;
  phoneNumbForSearch?: string;
  isFromHeader?: boolean;
  handleSearchType?: (event: SelectChangeEvent) => void;
  markPatientSelectedFalse?: () => void;
  loadAdvanceSearch?: boolean;
  isCreateFromPatientModule?: boolean;
}
