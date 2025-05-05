import React from "react";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { AlertColor } from "@mui/material/Alert";
import { useGetUser } from "./useGetUser";
import { checkIfPatientHasInHousePxs } from "@/service/prescription.service";

export const useUserHasInternalHousePxs = () => {

  const userData = useGetUser();
  const [userHasInHousePxs, setUserHasInHousePxs] = React.useState<undefined | boolean>(undefined);
  const [myAcctUserHasInHousPx, setMyAcctUserHasInHousePx] = React.useState<undefined | boolean>(undefined);
  const { showSnackBar } = useSnackBar();

  React.useEffect(() => {
    const verifyUser = async () => {
      if (!userData?.PatientId) return;

      // First sets primary and secondary account state
      await checkPrescriptionData(userData.PatientId)

      const urlPatientId = getPatientIdFromUrl();

      if (urlPatientId && urlPatientId !== userData.PatientId) {
        // Then  sets only  secondary account state
        checkPrescriptionData(urlPatientId, true)
      }
    }
    verifyUser();

  }, [userData]);

  const getPatientIdFromUrl = (): string | null => {
    if (!location.pathname.includes("my-account")) return null;
    return new URLSearchParams(location.search).get("id");
  }

  const checkPrescriptionData = async (patientId: string, isMyAcctUser?: boolean) => {
    checkIfPatientHasInHousePxs(patientId)
      .then((res) => {
        const data = res?.data?.Result;
        if (!isMyAcctUser) {
          setUserHasInHousePxs(data.isActiveEhrRxExist && data.isDoctorConsultationEnabled);
        }
        setMyAcctUserHasInHousePx(data.isActiveEhrRxExist && data.isDoctorConsultationEnabled);
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  return {
    userHasInHousePxs: {
      primary: userHasInHousePxs,
      myAcct: myAcctUserHasInHousPx
    },
    checkPrescriptionData
  };

}
