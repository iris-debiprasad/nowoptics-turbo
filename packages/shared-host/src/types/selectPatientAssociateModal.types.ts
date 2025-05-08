import { Dispatch, SetStateAction } from "react";
export interface selectPatientDataTypes {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  Dob: string;
  PhoneNumber: {
    IsdCode: string;
    PhoneNumber: string;
  };
}

export interface SelectPatientInputViewPropsType {
  toggle: () => void;
  userInput: string;
  handleUserInput: (e: React.ChangeEvent<HTMLInputElement>) => void;
  selectPatientData: selectPatientDataTypes[] | null;
  selectedPatient: selectPatientDataTypes | null;
  setSelectedPatient: Dispatch<SetStateAction<selectPatientDataTypes | null>>;
  handleContinueClick?: () => void;
  isLoading?: boolean;
  loadPatientAdvanceSearch?: boolean
}

export interface selectPatientOptionDataPropType {
  data?: selectPatientDataTypes[] | null;
  selectedPatient?: selectPatientDataTypes | null;
  setSelectedPatient: Dispatch<SetStateAction<selectPatientDataTypes | null>>;
}
