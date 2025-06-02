import { Dayjs } from "dayjs";

export interface EnrollFormFields {
  coc: string;
  dob: Dayjs | null;
  email: string;
  firstName: string;
  gender: "" | "M" | "F";
  lastName: string;
  telephone: string;
  zip: string;
  relationshipType: string;
}

interface APIPhoneNumber {
  IsdCode: string;
  PhoneNumber: string;
}

export interface APISubscribePayload {
  FirstName: string;
  LastName: string;
  Email: string;
  PrimaryPhoneNo: APIPhoneNumber;
  ZipCode: string;
  Gender: string;
  CreatedAtStoreNumber: string;
  EmployerName: string;
  Dob: string;
  IsStantonAccess: boolean;
}

export interface PatientRelationPayload {
  RelationTypeId: number;
  IsReverseRelationshipSelected: boolean;
}

export interface RelatedPatientPayload extends PatientRelationPayload {
  RelatedPatientId: number;
}

export interface APIRelatedPatient
  extends Pick<
    APISubscribePayload,
    "FirstName" | "LastName" | "Email" | "Dob"
  > {
  Id: number;
  PhoneNumber: APIPhoneNumber;
}

export interface APIDependentUser
  extends Omit<APISubscribePayload, "IsStantonAccess" | "CreatedAtStoreNumber">,
    PatientRelationPayload {}

export interface APISubscribeUsersPayload extends APISubscribePayload {
  RelatedPatients: RelatedPatientPayload[];
  Dependents: APIDependentUser[];
}
