export type AppointmentSchedulerMethods = {
  autoSelectBookEyeExamItem: (
    items: TypeOfExamDTO[],
    forceExecution?: boolean,
  ) => void;
  fillAppointmentSchedulerTimeSlots: (
    morningSlots: string[],
    afternoonSlots: string[],
    eveningSlots: string[],
    setTimeSlot: (slot: DaySlots) => void,
  ) => void;
  autoFillAppointmentSchedulerValues: () => void;
  setIsUsingAppoitnmentScheduler: (value: boolean) => void;
  checkIfItsUsingAppointmentScheduler: () => void;
};

export type BookEyeExamStepProps = {
  dob: string;
  stepCount: number;
  setStepCount: (step: number) => void;
  setDob: (date: string) => void;
  storeDetails: StoreDetails | null;
  setReservationDetails?: (data: ReservationResponse) => void;
  setAppointmentType: (data: TypeOfExamDTO) => void;
  appointmentType: TypeOfExamDTO | null;
  setTimeSlot: (data: string) => void;
  timeSlot: string;
  setEndTimeSlot: (data: string) => void;
  endTimeSlot: string;
  setSelectedDate: (data: string) => void;
  selectedDate: string;
  setWebSchedulerSlot: (data: string[]) => void;
  webSchedulerSlot: string[];
  reschedulingMode: boolean;
  appointmentBookingType: number;
  setAppointmentBookingType: (type: number) => void;
  userType: string;
  showModifyAptModal: boolean;
  appointmentSchedulerMethods: AppointmentSchedulerMethods;
};

export type BookEyeExamUserDetailsStepProps = {
  dob: string;
  stepCount: number;
  setStepCount: (step: number) => void;
  setDob: (date: string) => void;
  storeDetails: StoreDetails;
  reservationDetails: ReservationResponse;
  phoneNumber: string;
  setPhoneNumber: (data: string) => void;
  selectedDate: string;
  timeSlot: string;
  setTimeSlot: React.Dispatch<React.SetStateAction<string>>
  appointmentType: TypeOfExamDTO;
  selectedCountryCode: string;
  setSelectedCountryCode: (code: string) => void;
  setExistingPatient: (data: PatientResponseDTO) => void;
  existingPatient?: PatientResponseDTO;
  reschedulingMode: boolean;
  appointmentId: string | null;
  userType: string;
  appointmentBookingType: number;
  setBlockedAppointmentDate: (date: string[]) => void;
  blockedAppointmentDate: string[];
  rescheduleAppointmentDetails: AppointmentDetails | null;
  resetBookEyeExam: () => void;
  isUsingAppointmentScheduler: boolean;
};

export type DaySlots = "Morning" | "Afternoon" | "Evening";

export type TypeOfExamDTO = {
  Id: number;
  Code: string;
  Description: string;
  WebHelpText: string | null;
};

export interface AppointmentReservation {
  StoreId: number;
  AppointmentDateAndTime: string;
  AppointmentTypeId: number;
  PatientDob: string;
  WebSchedulerId: string;
}

export interface StoreDetails {
  Id: number;
  StoreNumber: string;
  WebDescription: string | null;
  BrandName: string;
  AddressLine1: string;
  City: string;
  StateCode: string;
  ZipCode: string;
  PhoneNumber: any[];
  Latitude: string | null;
  Longitude: string | null;
  OpenAt: string | null;
  CloseAt: string | null;
  HasSameDayDelivery: boolean;
  IsOnSiteDoctorAvailable: boolean;
  TimeZone: string;
  IsSpeakSpanish: boolean;
  TimeZoneCode: string;
  LandMarks: string | null;
  RowNum: number;
  TotalCount: number;
  Distance: string;
}

export interface ReservationResponse {
  ReservationId: number;
  Message: string;
  StoreExamRoomId: number;
  TimeSlotIntervalInMinutes: number;
}

export interface ReservationFormPartial {
  phoneNumber: string;
  dob: string;
  IsdCode: string;
  firstName: string;
}

export interface ReservationFormFull {
  phoneNumber: string;
  dob: string;
  firstName: string;
  lastName: string;
  email: string;
  zipCode: string;
  gender: string;
  isdCode: string;
  isMarketingConsent: boolean;
}

export interface CountryCode {
  IsdCode: string;
  Id: number;
  Code: string;
  Description: string;
}

export interface Gender {
  Id: number;
  Code: string;
  Description: string;
}

export interface PatientSearchDTO {
  Phone: {
    PhoneNumber: string;
    IsdCode: string;
  };
  Dob: string;
  FirstName?: string;
}

export interface PatientResponseDTO {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  ZipCode: string;
  Gender: string | null;
  PhoneNumber: {
    IsdCode: string;
    PhoneNumber: string;
  };
  Dob: string;
  PreferredLanguageCode?: string;
  IsMarketingConsent?: boolean;
}

export interface BookAppointmentPayloadDTO {
  PatientId: number;
  StoreExamRoomId: number;
  StoreId: number;
  AppointmentDateAndTime: string;
  AppointmentTypeId: number;
  PatientDob: string;

  ReservationId: number;
  Notes: string;
  AppointmentId?: string;
}

export type PatientSearchErrorCode =
  | "Patient_Demographics_PatientInfoNotFound"
  | "Patient_Demographics_MultipleProfile"
  | "Patient_Account_PhoneExists";

export interface PatientSearchError {
  Description: string;
  Code: PatientSearchErrorCode;
  Message: string;
  ResolvingHelpText: string;
}

export interface RelationshipPayload {
  RelatedPatientId: number;
  RelationTypeId: number;
  IsReverseRelationshipSelected: boolean;
}

export interface NewPatientDTO {
  firstName: string;
  lastName: string;
  dob: string;
  email: string;
  primaryPhoneNo: {
    isdCode: string;
    phoneNumber: string;
  };
  zipCode: string;
  Gender: string;
  CreatedAtStoreNumber: string;
  RelatedPatients?: RelationshipPayload[];
  IsMarketingConsent: boolean;
}

export interface AppointmentDetails {
  AppointmentId: number;
  PatientId: number;
  AppointmentStatus: string;
  AppointmentStatusId: number;
  PatientFirstName: string;
  PatientLastName: string;
  AppointmentTypeId: number;
  StoreNumber: string;
  StoreId: number;
  PatientAge: number;
  PhoneNumber: string;
  AppointmentStartDateAndTime: string;
  AppointmentEndDateAndTime: string;
  Dob: string;
  PatientEmail: string;
  PatientGender: string;
  StoreExamRoomId: number;
  PatientMiddleName: string;
  AppointmentType: string;
  PatientIsdCode: string;
  PatientZip: string;
  PreferredLanguageCode?: string;
}

export interface ExistingAppointmentType {
  Error: any;
  Result: {
    HasAppointments: true;
    Appointments: [
      {
        AppointmentStartTime: string;
        AppointmentEndTime: string;
        AppointmentType: string;
        StoreNumber: string;
        StoreName: string;
      },
    ];
  };
  SuccessMessage: string;
}

export interface RelatedPatient {
  Id: number;
  FirstName: string;
  LastName: string;
  Email: string;
  PhoneNumber: {
    IsdCode: string;
    PhoneNumber: string;
  };
  Dob: string;
}

export interface AppointmentBookedProp {
  appointmentBooked: boolean;
  handleClose: () => void;
  selectedDate: string;
  timeSlot: string;
  endTimeSlot: string;
  setStepCount: (data: number) => void;
}

export interface DuplicatePhoneModalProp {
  showDuplicatePhoneAlert: boolean;
  setShowDuplicatePhoneAlert: (data: boolean) => void;
  handleClose: () => void;
  phoneNumber: string;
  getListOfRelatedPatient: () => void;
}

export interface NoRelationConfirmationProp {
  showNoRelationModal: boolean;
  setShowNoRelationModal: (data: boolean) => void;
  handleGoBack: () => void;
  phoneNumber: string;
}

export interface RelatedPatientModalProp {
  showRelatedPatientModel: boolean;
  setShowDuplicatePhoneAlert: (data: boolean) => void;
  handleClose: (data: boolean) => void;
  getListOfRelatedPatient: () => void;
  relatedPatient: RelatedPatient[];
  setSelectedRelatedPatient: (data: RelatedPatient) => void;
  handleNoRelation: () => void;
}

export interface SelectRelationshipModalProp {
  showSelectRelationshipType: boolean;
  setShowRelationshipType: (data: boolean) => void;
  handleClose: () => void;
  handleSubmit: (
    relationshipTypeId: number,
    relationTypeOthersValue: number,
    isReverseRelationShip: boolean,
  ) => void;
}

export interface SubmitAppointmentModalProps {
  openSubmitModal: boolean;
  selectedDate: string;
  timeSlot: string;
  appointmentBookedHandler: () => void;
  bookAnother: () => void;
  store: StoreDetails;
  userEmail: string;
  encryptedAppointmentId: string;
  isExamForSomeoneElse: boolean;
}

export interface TimeSlotNotAvailableModalProps {
  timeSlotUnavaliable: boolean;
  handleClose: () => void;
  slotNotAvaliable: string;
}

export interface PatientRelationShipType {
  Id: number;
  Code: string;
  Description: string;
  IsReverseRelationship: boolean;
  ReverseRelationship: string;
}

export interface ParamsDTO {
  storeId: number;
  date: string;
  dob: string;
  appointmentTypeId: number;
}


export interface StateRegulationMsg {
  state: string[];
  message: {
    en: string;
    de: string;
  }
}
