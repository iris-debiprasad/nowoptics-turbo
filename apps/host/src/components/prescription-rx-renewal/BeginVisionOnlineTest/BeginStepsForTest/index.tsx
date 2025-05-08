import React, { useState, useEffect, SetStateAction, Dispatch, useContext } from "react";
import styles from "./BeginSteps.module.scss";
import {
  Box,
  Typography,
  List,
  ListItem,
  ListItemText,
  Button,
  AlertColor,
} from "@mui/material";
import {
  BEGIN_ONLINE_VISION_TEST_STEPS,
  PRESCRIPTION_RX_RENEWAL,
} from "@root/host/src/constants/prescriptionRxRenewal.constants";
import Link from "next/link";
import { useRouter } from "next/router";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import { useAppSelector } from "@/store/useStore";
import {
  createAppointmentOnVisionTestClick,
  getMrsToken,
} from "@/service/rxRenewal.service";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  AppEvents,
  SNACKBAR_COLOR_TYPE,
  SO_DEFAULT_STORE_ID,
} from "@root/host/src/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import {
  convertJsonPayloadToBase64,
  decodeBase64Payload,
} from "@root/host/src/utils/rxRenewal";
import { useRecaptchaToken } from "@/hooks/useGoogleRecaptcha";
import { RX_TYPE_CONSTANT } from "@root/host/src/constants/RxRenewal.constants";
import { beginStepsForTestPropsDTO } from "@root/host/src/types/rxRenewal.types";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

const BeginStepsForTest = (props: beginStepsForTestPropsDTO) => {
  const env = useContext(RuntimeVarContext);
  const { saveVisionIntakePayload, StateCode, EventId } = useAppSelector(
    (state) => state.visionIntake
  );
  const { showSnackBar } = useSnackBar();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const router = useRouter();
  const loading = useAxiosLoader();
  const [payloadFoRedirect, setPayloadFoRedirect] = useState({
    token: "",
    patid: saveVisionIntakePayload?.PatientId,
    rxmode: props.rxmode,
    rxtype: props.rxtype,
    spectacleid: props.spectacleid,
    contactid: props.contactid,
    state: StateCode,
  });
  const [selectedStore, setSelectedStore] = useState<number>(0);

  const updateStoreDetails = () => {
    const storeDetails = localStorage.getItem("selectedStore");
    if (storeDetails) {
      setSelectedStore(JSON.parse(storeDetails)?.Id as number);
    }
  };
  useEffect(() => {
    window.addEventListener(AppEvents.STORE_CHANGE, () => {
      updateStoreDetails();
    });
    updateStoreDetails();
    return () => {
      window.removeEventListener(AppEvents.STORE_CHANGE, () => {});
    };
  }, []);

  const rxIdsForAppointment = () => [
    ...(payloadFoRedirect.spectacleid !== "0"
      ? [payloadFoRedirect.spectacleid]
      : []),
    ...(payloadFoRedirect.contactid !== "0"
      ? [payloadFoRedirect.contactid]
      : []),
  ];

  const createAppointment = async () => {
    const captchaToken = await fetchRecaptchaToken(
      "create_appointment_rx_renewal"
    );
    const payload = {
      WebStoreId: SO_DEFAULT_STORE_ID,
      PatientId: payloadFoRedirect.patid,
      EyeGlassRxIdToBeRenewed:
        payloadFoRedirect.rxtype === RX_TYPE_CONSTANT.eyeglass ||
        payloadFoRedirect.rxtype === RX_TYPE_CONSTANT.eyeglassContactsBoth,
      ContactLensRxIdToBeRenewed:
        payloadFoRedirect.rxtype === RX_TYPE_CONSTANT.contacts ||
        payloadFoRedirect.rxtype === RX_TYPE_CONSTANT.eyeglassContactsBoth,
      EventId: EventId,
      RxIds: rxIdsForAppointment(),
    };
    createAppointmentOnVisionTestClick(payload, captchaToken)
      .then((res) => {
        handleStartBegin();
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      }); 
  };

  const handleStartBegin = () => {
    getMrsToken(EventId as number)
      .then((res) => {
        const token = decodeBase64Payload(res?.data?.Result)?.string;
        const payloadForRedirect = {
          ...payloadFoRedirect,
          token: token as string,
        };
        const base64 = convertJsonPayloadToBase64(payloadForRedirect);
        router.push(
          env?.NEXT_PUBLIC_MRS_REDIRECT_BASE_URL + PRESCRIPTION_RX_RENEWAL.THIRD_PARTY_RX_RENEWAL_URL.replace(
            "{0}",
            base64
          )
        );
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  return (
    <Box className={styles.container}>
      <Box className={styles.content}>
        <Box mt={2} mb={2} mr={1} p={2}>
          <Typography variant="h2" className={styles.title}>
            Before you begin your test
          </Typography>
          <Typography variant="body1" className={styles.description}>
            Please make sure you:
          </Typography>
          <List
            sx={{
              display: "flex",
              alignItems: "center",
              flexDirection: "column",
            }}
          >
            {BEGIN_ONLINE_VISION_TEST_STEPS.map((step, index) => {
              return (
                <>
                  <ListItem
                    key={index}
                    className={styles.instructionList}
                    disablePadding={true}
                  >
                    <span className={styles.numberIndex}> {index + 1}. </span>
                    <ListItemText
                      primary={step}
                      classes={{
                        primary: styles.stepText,
                      }}
                    />
                  </ListItem>
                </>
              );
            })}
          </List>
        </Box>
        <Box className={styles.buttonWrapper}>
          <BackdropLoader openLoader={loading} />
          {!loading && (
            <Button
              className={styles.primaryButton}
              onClick={createAppointment}
            >
              Start Vision Test
            </Button>
          )}
        </Box>
        <Typography className={styles.note}>
          I <span>don&#39;t</span> have my eyewear.
          <span className={styles.link}>
            <Link href={"/schedule-exam/"}> Book In-Store Exam instead</Link>
          </span>
        </Typography>
      </Box>
    </Box>
  );
};

export default BeginStepsForTest;
