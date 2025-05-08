import {
  APISubscribeUsersPayload,
  EnrollFormFields,
} from "@root/host/src/types/stantonAccess.types";
import { useRecaptchaToken } from "@/hooks/useGoogleRecaptcha";
import { unformatPhoneNumber } from "@root/host/src/utils/common.utils";
import { ISD_CODE } from "@root/host/src/constants/common.constants";
import { SubscribeToStantonAccess } from "@/service/stantonAccess.service";
import {
  formatDOB,
  mapDependents,
  mapRelatedPatients,
  MapRelatedPatientsParams,
} from "./utils";

interface Params {
  relatedPatientsParams: MapRelatedPatientsParams | null;
}

interface Return {
  onEnroll: (data: EnrollFormFields[]) => Promise<void>;
}

const STANTON_ACCESS_DEFAULT_STORE_NUMBER = "9996";

export const useStantonAccess = ({ relatedPatientsParams }: Params): Return => {
  const { fetchRecaptchaToken } = useRecaptchaToken();

  const onEnroll = async (data: EnrollFormFields[]): Promise<void> =>
    new Promise(async (resolve, reject) => {
      try {
        const recaptchaToken = await fetchRecaptchaToken(
          "STANTON_ACCESS_ENROLLMENT",
        );

        const [main, ...dependents] = Object.values(data);

        const mappedRelatedPatients = relatedPatientsParams
          ? mapRelatedPatients({
              selectedIndex: relatedPatientsParams.selectedIndex,
              selectedRelationtype: relatedPatientsParams.selectedRelationtype,
              patients: relatedPatientsParams.patients,
              relationshipTypes: relatedPatientsParams.relationshipTypes,
            })
          : [];

        const payload: APISubscribeUsersPayload = {
          Dob: formatDOB(main.dob!),
          Email: main.email,
          Gender: main.gender,
          ZipCode: main.zip,
          LastName: main.lastName,
          FirstName: main.firstName,
          EmployerName: main.coc,
          IsStantonAccess: true,
          PrimaryPhoneNo: {
            IsdCode: ISD_CODE,
            PhoneNumber: unformatPhoneNumber(main.telephone),
          },
          CreatedAtStoreNumber: STANTON_ACCESS_DEFAULT_STORE_NUMBER,
          RelatedPatients: mappedRelatedPatients,
          Dependents: mapDependents(dependents),
        };

        await SubscribeToStantonAccess(payload, recaptchaToken);
        resolve();
      } catch (err: any) {
        reject(err);
      }
    });

  return { onEnroll };
};
