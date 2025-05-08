import { AlertColor } from "@mui/material";

export interface rxPrescriptionHeaderDTO {
  name: string;
  inputType: string;
  options?: string[];
  default?: string;
  displayName: string;
  leftOptions?: string[];
  rightOptions?: string[];
  helpText: string;
}

export interface AddNewRxPrescriptionModalPropsDTO {
  backBtnFunction?: () => void;
  backBtnShow?: boolean;
  setContactModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  showBoth?: boolean;
  prescriptionType?: string;
  viewMode?: boolean;
  disableAllInputs?: boolean;
  headingTitle: string;
  showDropdown?: boolean;
  prescriptionHeaders?: rxPrescriptionHeaderDTO[];
  uploadImage: boolean;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  showDescription: boolean;
  addPrescription?: Function;
  brandHelpText?: string;
  baseCurveHelpText?: string;
  diameterHelpText?: string;
  patientId: string;
  storeId: string | number;
  type?: string;
  formValues?: any;
  selectedId?: number;
  userType: string;
  viewWithPdf?: boolean;
  buttonText?: string;
  showOnlyExpiryDate?: boolean;
  showSnackBar?: (text: string, type: AlertColor) => void;
  noDiagnosisCode?: boolean;
  noDoctorName?: boolean;
  noEmployeeName?: boolean;
  pdfSrc?: string;
  isPdfFile?: boolean;
  patientPaperCaptureId?: number;
  fetchRecaptchaToken?: (action: string) => Promise<string | undefined | null>;
  isRxRenewalFlow?: boolean;
  eventId?: number;
}

export interface rxBrandDataDTO {
  MasterProductId: number;
  ItemNumber: string;
  BrandId: number;
  BrandCode: string;
  BrandName: string;
  ImageUrl: string;
  IsActive: boolean;
  Sphere: number[];
  BaseCurve: number[];
  Diameter: number[];
  Axis: number[];
  AddPower: number[];
  Cylinder: number[];
  MonoVisionTypes: string[];
  RxHelpingTexts: {
    ConfigCode: string;
    ConfigValue: string;
  }[];
}
export interface rxHeadersBasedOnBrandDTO {
  leftBrand: rxBrandDataDTO | null;
  rightBrand: rxBrandDataDTO | null;
}

export interface rxRangeConfigDTO {
  ConfigCode: string;
  ConfigValue: string;
}

export interface returnRxHelpDTO {
  sphereHelpText: string;
  cylinderHelpText: string;
  addHelpText: string;
  axisHelpText: string;
  baseCurveHelpText: string;
  diameterHelpText: string;
  brandHelpText: string;
  MonoPdHelpText: string;
}

interface eyeEntityDTO {
  Sphere: string | null;
  Cylinder: string | null;
  Axis: string | null;
  Add: string | null;
  PDown: string | null;
  Pout: string | null;
  MonoPd: string | null;
  Pup: string | null;
  Pin: string | null;
  BrandId: string | number | null;
  BaseCurve: string | number | null;
  Diameter: string | number | null;
}

export interface ContactRxPrescriptionDTO {
  backBtnFunction?: () => void;
  backBtnShow?: boolean;
  buttonText?: string;
  showBoth?: boolean;
  handleRenewBothBack?: () => void;
  showSnackBar?: (text: string, type: AlertColor) => void;
  setModalOpen: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: string;
  storeId: string | number;
  userType: string;
  uploadImage: boolean;
  headingTitle: string;
  isOrderFlow: boolean;
  helpingTexts: helpingTextsDTO;
  addPrescription: Function;
  formvalues?: any;
  rxHeadersBasedOnBrand?: any;
  showOnlyExpiryDate?: boolean;
  disableAllInputs?: boolean;
  selectedId?: number;
  viewWithPdf?: boolean;
  noDiagnosisCode?: boolean;
  noDoctorName?: boolean;
  noEmployeeName?: boolean;
  pdfSrc?: string;
  isPdfFile?: boolean;
  patientPaperCaptureId?: number;
  fetchRecaptchaToken?: (action: string) => Promise<string | undefined | null>;
  isRxRenewalFlow?: boolean;
  eventId?: number;
}

export interface helpingTextsDTO {
  baseCurveHelpText: string;
  diameterHelpText: string;
  sphereHelpText: string;
  cylinderHelpText: string;
  axisHelpText: string;
  addHelpText: string;
  brandHelpText: string;
}

export type MyAccountPrescriptionType = {
  SourceType: string;
  Date: string;
  ExpirationDate: string;
  RxType: string;
  IsExpired: boolean;
  CanBeEdited: boolean;
  Id: number;
  PatientPaperCaptureId: number;
  PrescriptionType: string;
  IsSpectacleRx: boolean;
  PrescriptionSource: string;
};

export interface EyeGlassType {
  CanBeEdited: boolean;
  Date: string;
  ExpirationDate: string;
  Id: number;
  PatientPaperCaptureId: number;
  RxType: string;
  SourceType: string;
  IsExpired?: boolean;
  IsSpectacleRx?: boolean;
}

export interface rxPayloadDTO {
  Id?: number;
  IsSpectacleRx: boolean;
  PatientId: string;
  PatientPaperCaptureId: string;
  CreatedAtStoreId: number | string;
  ExpirationDate: string;
  RightEyeEntity: eyeEntityDTO;
  LeftEyeEntity: eyeEntityDTO;
}
