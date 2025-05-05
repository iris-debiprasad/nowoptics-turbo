import dynamic from "next/dynamic";
import React, {FunctionComponent, useEffect, useState} from "react";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import {useRouter} from "next/router";
import {getPatientDetailsFromAppointmentId} from "@/service/common.service";
import {ERROR_MESSAGE} from "@/constants/auth.constants";
import {SNACKBAR_COLOR_TYPE} from "@/constants/common.constants";
import {AlertColor} from "@mui/material";
import {useSnackBar} from "@/contexts/Snackbar/SnackbarContext";
import styles from "./SelfCheckingMedicalIntake.module.scss";

const SetupPage = dynamic(() => import("intake/Patient"), {
  ssr: false,
  loading: () => <BackdropLoader openLoader={true} />,
}) as FunctionComponent<{ patientId: number }>;

function SelfCheckingMedicalIntake() {
  const [patientId, setPatientId] = useState<number | null>(null);
  const { showSnackBar } = useSnackBar();
  const router = useRouter();
  const { selfCheckingId } = router.query;
  const getPatientDetails = (id: string) => {
    getPatientDetailsFromAppointmentId(id)
      .then((resp) => {
        const data = resp.data;
        setPatientId(data?.Result);
      })
      .catch((error) => {
        const message =
          error && error.message
            ? error.response?.data?.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  useEffect(() => {
    if (selfCheckingId) {
      const id = encodeURIComponent(selfCheckingId as string)
      getPatientDetails(id);
    }
  }, [selfCheckingId]);

  return <>{patientId && <div className={styles.SelfCheckingContainer}>
    <SetupPage patientId={patientId} />
  </div>}</>;
}

export default SelfCheckingMedicalIntake;
