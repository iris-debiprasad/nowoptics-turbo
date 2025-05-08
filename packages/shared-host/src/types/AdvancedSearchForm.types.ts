import { AlertColor } from "@mui/material";
import { SearchProductsDataDTO } from "./Header.types";
import { CountryCodeOptionsDTO } from "./addPatientModal.types";
import { Dayjs } from "dayjs";

export interface AdvancedSearchFormProps {
  countryCodeOptions: CountryCodeOptionsDTO[];
  setAllSearchOptions: React.Dispatch<
    React.SetStateAction<SearchProductsDataDTO[]>
  >;
  setIsSearchAdvancedSection?: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectPatientForMergeModal: React.Dispatch<
    React.SetStateAction<boolean>
  >;
  setPatientIdsForMerge: React.Dispatch<React.SetStateAction<never[]>>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  isAdvancedSearchFromDiffModule?: boolean;
  setSnackBar?: (message: string, type: AlertColor) => void;
  setAnchorEl?: React.Dispatch<
    React.SetStateAction<(EventTarget & HTMLDivElement) | null>
  >;
}

export interface AdvancedSearchFormDTO {
  patientId: {
    value: string;
    error?: boolean;
    errorMessage?: string;
  };
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
}

export interface AdvancedSearchFormPayloadType {
  Id: string | null;
  FirstName: string | null;
  LastName: string | null;
  Email: string | null;
  PhoneNumber: {
    isdcode: string;
    phonenumber: string | null;
  };
  Dob: string | null;
}
