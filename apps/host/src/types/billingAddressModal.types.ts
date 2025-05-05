import { AlertColor } from "@mui/material";

export interface billingAddressFormData {
  addressLine1: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  addressLine2: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  zipcode: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  city: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  state: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  county: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  country: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
}

export interface BillingAddressModalProps {
  setIsBillingAddressModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  setSnackBar?: (text: string, typeColor: AlertColor) => void;
}

export interface ZipCodeDetailsDTO {
  CountyId: number;
  CountyName: string;
  StateId: number;
  StateName: string;
  CountryId: number;
  CountryName: string;
  AddressCityZip: {
    CitiesIdList: number[];
    CitiesNameList: string[];
    ZipIdList: number[];
  };
}
