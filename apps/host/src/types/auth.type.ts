import { Dayjs } from "dayjs";
import { AddPatientPayloadDTO } from "./addPatientModal.types";
import { ElementType } from "react";
import { consentModalSendOtpPayload } from "./addRelationConsentModal.types";
import { AlertColor } from "@mui/material";

export interface RegistrationFormDTO {
  firstName: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  lastName: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  mobileNumber: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  countryCode: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  gender: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  dob: {
    value: Dayjs | null;
    error: boolean;
    errorMessage: string;
  };
  email: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  zipCode: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
}

export interface LoginFormDTO {
  mobileNumber: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  passWord: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
}

export interface ForgotPasswordDTO {
  mobileNumber: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
}

export interface SetPasswordDTO {
  newPassword: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
  confirmPassword: {
    value: string;
    error: boolean;
    errorMessage: string;
  };
}

export interface SignInPropsDTO {
  formHead: string;
  formMessage: string | null;
  cstmStyles?: string;
  handleClose?: () => void;
  cstmRender?: string;
  shouldRedirectToCheckout?: boolean;
  setSnackBar?: (message: string, type: AlertColor) => void;
  noRedirect?: boolean;
  showRegistrationFormFun?: () => void;
  t?: any;
  focusLogin?: boolean;
}

export interface SignUpPropsDTO {
  isValidated: boolean;
  setIsValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setPatientId: React.Dispatch<React.SetStateAction<number>>;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
  noRedirect?: boolean;
  hideRegistrationFormFun?: () => void;
  focusLogin?: boolean;
}

export interface ForgotPasswordPropsDTO {
  isFPValidated: boolean;
  setIsFPValidated: React.Dispatch<React.SetStateAction<boolean>>;
  setPatientId: React.Dispatch<React.SetStateAction<number>>;
  setMobileNumber: React.Dispatch<React.SetStateAction<string>>;
}

export interface OtpPropsDTO {
  isOtpValidated?: boolean;
  setIsOtpValidated?: React.Dispatch<React.SetStateAction<boolean>>;
  patientId?: number;
  mobileNumber?: string;
  isModal?: boolean;
  setIsModalOpen?: React.Dispatch<React.SetStateAction<boolean>>;
  createPatientAndAddRelation?: (
    payload: AddPatientPayloadDTO
  ) => Promise<void>;
  createPatientPayload?: AddPatientPayloadDTO;
  isOtpModalForConsentFromPatientFile?: boolean;
  isOtpModalForConsentFromHeader?: boolean;
  resendOtpForConsent?: () => void;
  validateOtpForConsent?: (payload: consentModalSendOtpPayload) => void;
  payloadForValidateOtpForConsent?: consentModalSendOtpPayload;
  isModalForCreatePatient?: boolean;
  isOtpModalForConsent?: boolean;
  isResendOtpFromHeader?: boolean;
  isAddRelationshipFromPatientFile?: boolean;
  setSnackBar?: (message: string, type: AlertColor) => void;
  payloadForResendOtpApi?: consentModalSendOtpPayload;
  isOtpModalForCreatePatientCheckout?: boolean;
  handleVerfiyForCreatePatientGuestCheckout?: (
    associateClickOnProcess?: boolean,
    otp?: string
  ) => void;
  resendOtpForCreatePatientGuestCheckout?: (phoneOtp?: string) => void;
  translate?: any;
}

export interface SetPasswordPropsDTO {
  formHead: string;
  isPassValidated: boolean;
  setIsPassValidated: React.Dispatch<React.SetStateAction<boolean>>;
  patientId: number;
}

export interface SuccessPropsDTO {
  content: string;
}

export interface OtpDTO {
  otp1: {
    value: string;
    error: boolean;
  };
  otp2: {
    value: string;
    error: boolean;
  };
  otp3: {
    value: string;
    error: boolean;
  };
  otp4: {
    value: string;
    error: boolean;
  };
  otp5: {
    value: string;
    error: boolean;
  };
  otp6: {
    value: string;
    error: boolean;
  };
}

export type Providers = {
  [provider: string]: {
    id: string;
    name: string;
    type: string;
    signinUrl: string;
  };
};

export type AuthPropsDTO = {
  providers: {
    providers: Providers;
  };
};

export interface MyTextFieldDisplayProps
  extends React.HTMLAttributes<HTMLDivElement> {
  component?: ElementType<any>;
}
