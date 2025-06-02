import { ISD_CODE, SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { useRecaptchaToken } from "@/hooks/useGoogleRecaptcha";
import { GetListOfRelatedPatients } from "@/service/common.service";
import { APIRelatedPatient } from "@root/host/src/types/stantonAccess.types";
import { unformatPhoneNumber } from "@root/host/src/utils/common.utils";
import { AlertColor } from "@mui/material";
import React from "react";

interface Params {
  phoneNumber: string;
  fetchRelatedPatients: boolean;
}

interface Return {
  relatedPatients: APIRelatedPatient[] | null;
  clearRelatedPatients: () => void;
  selectedRelatedPatientIndex: number | null;
  setSelectedRelatedPatientIndex: React.Dispatch<
    React.SetStateAction<number | null>
  >;
  selectedRelatedPatientRelationtype: string | null;
  setSelectedRelatedPatientRelationtype: React.Dispatch<
    React.SetStateAction<string | null>
  >;
}

export const useRelatedPatients = ({
  phoneNumber,
  fetchRelatedPatients,
}: Readonly<Params>): Return => {
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const { showSnackBar } = useSnackBar();

  const [relatedPatients, setRelatedPatients] = React.useState<
    APIRelatedPatient[] | null
  >(null);
  const [selectedRelatedPatientIndex, setSelectedRelatedPatientIndex] =
    React.useState<number | null>(null);
  const [
    selectedRelatedPatientRelationtype,
    setSelectedRelatedPatientRelationtype,
  ] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (!fetchRelatedPatients) return;

    const getRelatedPatients = async () => {
      try {
        const recaptchaToken = await fetchRecaptchaToken("SA_RELATED_PATIENTS");
        const number = unformatPhoneNumber(phoneNumber);
        const response = (
          await GetListOfRelatedPatients(number, ISD_CODE, recaptchaToken)
        ).data.Result;

        setRelatedPatients(response);
      } catch (err: any) {
        showSnackBar(
          err.response.data.Error.Message,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
        );
      }
    };

    getRelatedPatients();
  }, [fetchRelatedPatients]);

  const clearRelatedPatients = () => setRelatedPatients(null);

  return {
    clearRelatedPatients,
    relatedPatients,
    selectedRelatedPatientIndex,
    selectedRelatedPatientRelationtype,
    setSelectedRelatedPatientIndex,
    setSelectedRelatedPatientRelationtype,
  };
};
