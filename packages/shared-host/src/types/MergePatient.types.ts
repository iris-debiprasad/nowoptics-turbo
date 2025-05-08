import { AlertColor } from "@mui/material";

export interface SelectPatientForMergeModalProps {
  setIsSelectPatientForMergeModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  patientIdsForMerge: string[];
  isMergeFromDiffModule?: boolean;
  setSnackBar?: (message: string, type: AlertColor) => void;
}

export type Order = "asc" | "desc";

export interface SelectPatientMergeGridDataType {
  Id: number;
  FirstName: string;
  LastName: string;
  DOB: string;
  Email: string;
  ZipCode: string | null;
  PhoneNumber: string;
  Address: string | null;
  StoreNumber: string;
  StoreName: string;
}

export interface PatientListToMerge {
  Id: number;
  FirstName: string;
  LastName: string;
  MiddleName: string | null;
  Email: string;
  DateOfBirth: string;
  LastAppointment: string | null;
  LastOrder: string | null;
  Address: string;
  PhoneNumber: string;
}

export interface MergePatientModalProps {
  patientListToMerge: PatientListToMerge[];
  setIsSelectPatientForMergeModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setMergePatientModal: React.Dispatch<React.SetStateAction<boolean>>;
  isMergeFromDiffModule?: boolean;
  setSnackBar?: (message: string, type: AlertColor) => void;
}

export interface MergePatientPayloadType {
  PrimaryPatientId: number;
  MergePatientList: number[];
}
