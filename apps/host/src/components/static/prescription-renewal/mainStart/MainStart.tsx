import PrescriptionRenewalFooter from "@/components/prescription-rx-renewal/PrescriptionRenewalFooter/PrescriptionRenewalFooter";
import NonBusinessHours from "@/components/prescription-rx-renewal/non-businessHours/NonBusinessHours";
import PrescriptionRenewalHeader from "@/components/prescription-rx-renewal/prescriptionRenewalHeader/PrescriptionRenewalHeader";
import React, { useEffect, useState } from "react";
import style from "./MainStart.module.scss";
import { useSession } from "next-auth/react";
import LoginRegisterForm from "../LoginRegisterForm/LoginRegisterForm";
import { isActionAllowed } from "@root/host/src/utils/rxRenewal";
import { useRouter } from "next/router";
import CurrentPrescription from "@/components/prescription-rx-renewal/currentPrescription/CurrentPrescription";
import {
  SnackBarProvider,
  useSnackBar,
} from "@/contexts/Snackbar/SnackbarContext";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import NonBusinessForMobile from "@/components/prescription-rx-renewal/non-businessHours/non-businessFroMobile";
import useResponsive from "@/hooks/useResponsive";
import VisionIntake from "@/components/prescription-rx-renewal/visionIntake";
import Inconvenience from "@/components/prescription-rx-renewal/inconvenience";
import { useAppDispatch, useAppSelector } from "@/store/useStore";
import { SET_VISION_INTAKE_PROPERTY } from "@/store/reducer/visionIntake.slice";
import { getRxRenewalTimingConfig } from "@/service/rxRenewal.service";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { AlertColor } from "@mui/material";
import { ScheduleEntry } from "@root/host/src/types/rxRenewal.types";
import {
  useGetRxIdForRenewalQuery,
  useGetRxRenewalEventIdMutation,
} from "@/store/reducer/visionIntakeApi.slice";
import RenewalModal from "./renewalmodal";
import { useRecaptchaToken } from "@/hooks/useGoogleRecaptcha";
import { ErrorResponseType } from "@root/host/src/types/intakeApi.types";
const MainStart = () => {
  const dispatch = useAppDispatch();
  const [renewModal, setRenewModal] = useState<boolean>(false);
  const [renewActiveStatus, setRenewActiveStatus] = useState<
    "both" | "contact" | "eyeglass" | null
  >(null);
  const { formState, authData, EventId } = useAppSelector(
    (state) => state.visionIntake
  );
  const { data } = useGetRxIdForRenewalQuery(
    { patientId: Number(authData?.PatientId), EventId: EventId! },
    {
      skip: !authData?.PatientId || !EventId || formState !== "visionIntake",
    }
  );
  const [timingConfig, setTimingConfig] = useState<ScheduleEntry[]>([]);
  const [messages, setMessages] = useState<any>({});
  const { data: session, status } = useSession();
  const hasReached = useResponsive();
  const loading = useAxiosLoader();
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  //Todo: Remove flag variable, for enabling business hour to test - ?enableNonBusinessHours=true
  const flagValue = router?.query?.enableNonBusinessHours === "true";
  const [flag, setFlag] = useState<boolean>(flagValue);
  const [errorBeginTest, setErrorBeginTest] = useState<boolean>(false);
  const [isBusinessHours, setIsBusinessHours] = useState<boolean>(false);

  useEffect(() => {
    if (
      timingConfig.length > 0 &&
      !isActionAllowed(timingConfig, flag) &&
      !router.query.path
    ) {
      router.query.path = "non-business-hours";
      router.replace(router);
    }
  }, [session, router, timingConfig]);

  useEffect(() => {
    if (router.query?.path === "incomplete") {
      setErrorBeginTest(true);
    }
  }, [router.query]);

  useEffect(() => {
    if (!data || formState !== "visionIntake") {
      setRenewActiveStatus(null);
      setRenewModal(false);
      return;
    }
    const contactRx = data.Result["Contact Rx"];
    const eyeglassRx = data.Result["Eyeglass Rx"];

    if (contactRx && eyeglassRx) {
      setRenewActiveStatus("both");
      setRenewModal(true);
      return;
    }

    if (contactRx && !eyeglassRx) {
      setRenewActiveStatus("contact");
      setRenewModal(true);
      return;
    }

    if (!contactRx && eyeglassRx) {
      setRenewActiveStatus("eyeglass");
      setRenewModal(true);
      return;
    }
  }, [data, formState]);

  // Set session data in redux store once its available

  useEffect(() => {
    const getAuthData = () => {
      if (formState !== "visionIntake") return;
      const sessionLocal = localStorage.getItem("session");
      if (sessionLocal) {
        const session = JSON.parse(sessionLocal);
        dispatch(
          SET_VISION_INTAKE_PROPERTY({
            key: "authData",
            value: session?.user?.authData,
          })
        );
      } else if (session) {
        localStorage.setItem("session", JSON.stringify(session));
        localStorage.setItem("auth_status", status);
        dispatch(
          SET_VISION_INTAKE_PROPERTY({
            key: "authData",
            value: session?.user?.authData as any,
          })
        );
      }
    };
    addEventListener("storage", getAuthData);
    return () => removeEventListener("storage", getAuthData);
  }, [formState, session]);

  useEffect(() => {
    if (session) window.dispatchEvent(new Event("storage"));
  }, [session]);

  const getTimeConfigFromMasterSetup = () => {
    getRxRenewalTimingConfig()
      .then((response) => {
        const result = response.data.Result;
        const timingConfig = JSON.parse(result);
        setTimingConfig(timingConfig.WeekDayName);
        setMessages(timingConfig.messages);
        setIsBusinessHours(
          isActionAllowed(timingConfig.WeekDayName, flag) ? true : false
        );
      })
      .catch((error) => {
        showSnackBar(
          error.response
            ? error.response.data.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  useEffect(() => {
    getTimeConfigFromMasterSetup();
    // after logout and redirecting to current page
    // modal remains open, so closing it
    setRenewModal(false);
    setRenewActiveStatus(null);
    return () => {
      // cleanup of formstate so redirecting to this page
      // doesnt show the last form state
      dispatch(SET_VISION_INTAKE_PROPERTY({ key: "formState", value: "visionIntake" }));
      dispatch(SET_VISION_INTAKE_PROPERTY({ key: "activeStep", value: 0 }));
    }
  }, []);

  return (
    <SnackBarProvider>
      <BackdropLoader openLoader={loading} />
      <div className={style.container}>
        <PrescriptionRenewalHeader />
        {status != "loading" && (
          <>
            {status == "unauthenticated" && isBusinessHours && (
              <LoginRegisterForm />
            )}
            {!isBusinessHours && timingConfig.length && <NonBusinessHours timingConfig={timingConfig} messages={messages}/>}
            {isBusinessHours &&
              status == "authenticated" &&
              session &&
              formState === "visionIntake" &&
              (errorBeginTest ? <Inconvenience /> : <VisionIntake />)}
            {isBusinessHours &&
              status == "authenticated" &&
              session &&
              formState === "currentPrescription" &&
              (errorBeginTest ? <Inconvenience /> : <CurrentPrescription />)}
            {/* TODO: Mobile Device Restriction */}
            {/* {!hasReached.md && <NonBusinessForMobile />}*/}
          </>
        )}
        <PrescriptionRenewalFooter />
        {renewActiveStatus !== null && isBusinessHours && (
          <RenewalModal
            modalOpen={renewModal}
            setModalOpen={setRenewModal}
            activeStatus={renewActiveStatus}
          />
        )}
      </div>
    </SnackBarProvider>
  );
};

export default MainStart;
