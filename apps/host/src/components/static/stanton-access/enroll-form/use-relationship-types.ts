import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { GetAllRelationshipsTypes } from "@/service/common.service";
import { AlertColor } from "@mui/material";
import { PatientRelationShipType } from "@root/home/src/types/bookEyeExamSteps.types";
import React from "react";

export const useRelationshipTypes = (): PatientRelationShipType[] | null => {
  const { showSnackBar } = useSnackBar();
  const [relationships, setRelationships] = React.useState<
    PatientRelationShipType[] | null
  >(null);

  React.useEffect(() => {
    const retrieveRelationships = async (): Promise<void> => {
      try {
        const response = (await GetAllRelationshipsTypes()).data.Result;
        setRelationships(response);
      } catch (err: any) {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
        );
      }
    };

    retrieveRelationships();

    return () => setRelationships(null);
  }, []);

  return relationships
};
