export interface AppointmentConfirmationDateAndTime {
  date: string;
  time: string;
}

export interface AppointmentConfirmationUser {
  email: string;
  encryptedPatientId: string;
  isExamForSomeoneElse: boolean;
  medicalFormCompleted: boolean;
}

export interface AppointmentConfirmationStore {
  longitude: number;
  latitude: number;
  id: number;
  storeNumber: string;
  address: string;
  name: string;
  brandName: string;
  city: string;
  stateCode: string;
  zipCode: string;
  primaryPhoneNumber: string;
}

export interface AppointmentConfirmationData {
  appointment: AppointmentConfirmationDateAndTime;
  user: AppointmentConfirmationUser;
  store: AppointmentConfirmationStore;
}
