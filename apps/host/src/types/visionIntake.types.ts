import { BaseApiResponse } from "./intakeApi.types";
import dayjs from "dayjs";

export type VisionIntakeRemoteTypes = {
  patientId? : number;
  viewMode? : boolean;
  isPatient? : boolean;
}

export type VisionIntakeState = {
  activeStep: number;
  totalSteps: number;
  steps: {
    index: number;
    active: boolean;
    completed: boolean;
    title: string;
  }[];
  authData?: {
    userType: string;
    email: string;
    FirstName: string;
    LastName: string;
    MobileNumber: string;
    PatientId: string;
    StoreId: string;
    nbf: number;
    exp: number;
    iat: number;
  };
  saveVisionIntakePayload: SaveVisionIntakeRequest["data"];
  files: any[];
  formErrors: {
    key: keyof SaveVisionIntakeRequest["data"];
    error: boolean;
    message?: string;
  }[];
  Hipaa: string;
  formState: "visionIntake" | "currentPrescription";
  StateCode: string;
  EventId? : number;
};

export type UpdateVisionIntakeStepAction = {
  index: number;
  property: keyof VisionIntakeState["steps"][0];
  value: boolean | number | string;
};

export type SetVisionIntakePropertyAction = {
  key: keyof VisionIntakeState;
  value: string | boolean | number | VisionIntakeState["authData"];
};

export type ChangeVisionIntakeStepAction = {
  type: "next" | "prev";
  currentStep: number;
  newStep: number;
};

export type SetFormErrorActionType = {
  key: keyof SaveVisionIntakeRequest["data"];
  error: boolean;
  message?: string;
  action: "add" | "remove" | "clear";
};

export type SaveVisionIntakePayloadAction = {
  key: keyof SaveVisionIntakeRequest["data"];
  value: string | boolean | number | dayjs.Dayjs | null;
  checkboxName?: string;
};

export type GoogleMapApiResponse = {
  plus_code: {
    compound_code: string;
    global_code: string;
  };
  results: Array<{
    address_components: Array<{
      long_name: string;
      short_name: string;
      types: Array<string>;
    }>;
    formatted_address: string;
    geometry: {
      location: {
        lat: number;
        lng: number;
      };
      location_type: string;
      viewport: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
      bounds?: {
        northeast: {
          lat: number;
          lng: number;
        };
        southwest: {
          lat: number;
          lng: number;
        };
      };
    };
    place_id: string;
    types: Array<string>;
    plus_code?: {
      compound_code: string;
      global_code: string;
    };
  }>;
  status: string;
};

export type GetVisionIntakeByPatientIdRequest = {
  stateId: number;
  EventId : number;
};

export type GetVisionIntakeByPatientIdForView = {
  patientId: string;
  isPatient: boolean;
};

export type GetVisionIntakeByPatientIdResult = {
  VisionIntake: {
    Id: number;
    PatientId: number;
    BeforeMergePatientId: number;
    StateId: number;
    PatientPrescriptionId: number;
    PaperCaptureId: number;
    LastEyeExamDateId: number | null;    
    LastEyeExam: string;
    HaveContactLenses: boolean;
    HaveGlasses: boolean;
    HaveAnySurgeryDiseaseOrEyeDrop: boolean;
    PrimaryDoctorName: string;
    LastPhysical: string;
    HaveAnyMedicationAllergyPregnantOrBreastfeeding: boolean;
    HaveAnyPastOrCurrentDisease: boolean;
    HaveAnyCurrentSymptoms: boolean;
    DoesDrive: boolean;
    CanSeeClearlyWithCurrentRx: boolean;
    HaveAnyDryItchyTearyOrBurningEyes: boolean;
    IsActive: boolean;
    CreatedOn: string;
    ModifiedOn: string;
    Checkboxes: Array<{
      Name: string;
      Value: boolean;
    }>;
  } | null;
  Hipaa: string;
};

export type GetVisionIntakeByPatientIdResponse =
  BaseApiResponse<GetVisionIntakeByPatientIdResult>;

export type ValidateStateIdRequest = {
  stateId: string;
  EventId : number;
};

export type ValidateStateIdResult = boolean;

export type ValidateStateIdResponse = BaseApiResponse<ValidateStateIdResult>;

export type SaveVisionIntakeRequest = {
  file: string | null;
  data: {
    EventId : number;
    PatientId: number;
    StateId: number;
    HaveContactLenses: boolean | null;
    LastEyeExamDateId : number | null;
    HaveGlasses: boolean | null;
    HaveAnySurgeryDiseaseOrEyeDrop: boolean | null;
    PrimaryDoctorName: string;
    LastPhysical: string;
    HaveAnyMedicationAllergyPregnantOrBreastfeeding: boolean | null;
    HaveAnyPastOrCurrentDisease: boolean | null;
    HaveAnyCurrentSymptoms: boolean | null;
    DoesDrive: boolean | null;
    CanSeeClearlyWithCurrentRx: boolean | null;
    HaveAnyDryItchyTearyOrBurningEyes: boolean | null;
    Checkboxes: Array<{
      name: string;
      value: boolean;
    }>;
  };
  recaptchaToken: string;
};

export type SaveVisionIntakeResult = {};

export type SaveVisionIntakeResponse = BaseApiResponse<SaveVisionIntakeResult>;

export type GetAllCountriesResult = {
  Id: number;
  Code: string;
  Description: string;
}[];

export type GetAllCountriesResponse = BaseApiResponse<GetAllCountriesResult>;

export type GetAllStatesRequest = {
  countryId: number;
};

export type GetAllStatesResult = GetAllCountriesResult;

export type GetAllStatesResponse = BaseApiResponse<GetAllStatesResult>;

export type GetRxIdForRenewalRequest = {
  patientId: number;
  EventId : number;
};

export type GetRxIdForRenewalResult = {
  "Contact Rx": number | undefined;
  "Eyeglass Rx": number | undefined;
};

export type GetRxIdForRenewalResponse = BaseApiResponse<GetRxIdForRenewalResult>;

export type GetRxRenewalEventIdRequest = {
  eventType : "RxRenewal",
  patientId : number,
  userId : number | null,
  StoreId : number,
  recaptchaToken : string
}

export type GetRxRenewalEventIdResult = {
  EventId : number
}

export type GetRxRenewalEventIdResponse = BaseApiResponse<GetRxRenewalEventIdResult>;

export type GetLastExamDateOptionsResult = {
  Id : number;
  Description : string;
  Code : string;
}[];

export type GetLastExamDateOptionsResponse = BaseApiResponse<GetLastExamDateOptionsResult>;