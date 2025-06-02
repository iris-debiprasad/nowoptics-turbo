import { ISD_CODE } from "@root/host/src/constants/common.constants";
import {
  APIDependentUser,
  APIRelatedPatient,
  EnrollFormFields,
  PatientRelationPayload,
  RelatedPatientPayload,
} from "@root/host/src/types/stantonAccess.types";
import { unformatPhoneNumber } from "@root/host/src/utils/common.utils";
import { PatientRelationShipType } from "@root/home/src/types/bookEyeExamSteps.types";
import dayjs from "dayjs";

/**
 * @returns yyyy-mm-dd
 */
export const formatDOB = (dob: dayjs.Dayjs) =>
  dob.toDate().toISOString().slice(0, 10);

const getRelationshipAttributes = (
  relationshipType: string,
): PatientRelationPayload => {
  const [id, isReversedRelationship] = relationshipType.split("-");

  return {
    IsReverseRelationshipSelected: isReversedRelationship === "true",
    RelationTypeId: Number(id),
  };
};

export const mapDependents = (
  dependents: EnrollFormFields[],
): APIDependentUser[] =>
  dependents.map((dependent) => {
    const relationshipAttributes = getRelationshipAttributes(
      dependent.relationshipType,
    );

    return {
      Dob: formatDOB(dependent.dob!),
      Email: dependent.email,
      Gender: dependent.gender,
      ZipCode: dependent.zip,
      LastName: dependent.lastName,
      FirstName: dependent.firstName,
      EmployerName: dependent.coc,
      PrimaryPhoneNo: {
        IsdCode: ISD_CODE,
        PhoneNumber: unformatPhoneNumber(dependent.telephone),
      },
      ...relationshipAttributes,
    };
  });

export interface MapRelatedPatientsParams {
  patients: APIRelatedPatient[];
  selectedIndex: number;
  selectedRelationtype: string;
  relationshipTypes: PatientRelationShipType[];
}

const OTHER_RELATION_CODE = "Other";

export const mapRelatedPatients = (
  params: Readonly<MapRelatedPatientsParams>,
): RelatedPatientPayload[] => {
  const otherRelationId =
    params.relationshipTypes.find((rel) => rel.Code === OTHER_RELATION_CODE)
      ?.Id || 0;

  const selectedPatientId = params.patients[params.selectedIndex].Id;
  const relatedPatientsWithoutSelectedOne = params.patients.filter(
    (pat) => pat.Id !== selectedPatientId,
  );

  const relatedPatientsWithOtherRelationshipType =
    relatedPatientsWithoutSelectedOne.map((pat) => ({
      RelatedPatientId: pat.Id,
      RelationTypeId: otherRelationId,
      IsReverseRelationshipSelected: false,
    }));

  const relationshipAttributes = getRelationshipAttributes(
    params.selectedRelationtype,
  );

  const selectedPatientAsRelation: RelatedPatientPayload = {
    ...relationshipAttributes,
    RelatedPatientId: selectedPatientId,
  };

  return [
    selectedPatientAsRelation,
    ...relatedPatientsWithOtherRelationshipType,
  ];
};
