import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import { USER_TYPE } from "@root/host/src/constants/common.constants";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import { GetApiLoadingState } from "@/store/reducer/intake.selector";
import { SET_VISION_INTAKE_PROPERTY } from "@/store/reducer/visionIntake.slice";
import { useAppDispatch, useAppSelector } from "@/store/useStore";
import { VisionIntakeRemoteTypes } from "@root/host/src/types/visionIntake.types";
import { useRouter } from "next/router";
import { FC, ReactNode, useEffect, useMemo, useState } from "react";
import styles from "./VisionIntake.module.scss";
import FormSwitcher from "./formSteps";
import FormStepper from "./formstepper";
import VisionIntakeModal from "./visionIntakeModal";
import { useGetRxRenewalEventIdMutation } from "@/store/reducer/visionIntakeApi.slice";
import { useRecaptchaToken } from "@/hooks/useGoogleRecaptcha";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ErrorResponseType } from "@root/host/src/types/intakeApi.types";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";

const VisionIntake: FC<VisionIntakeRemoteTypes> = ({
  viewMode,
  patientId,
  isPatient,
}) => {
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { authData, formState } = useAppSelector((state) => state.visionIntake);
  const [modalOpen, setModalOpen] = useState(false);
  const [modalInner, setModalInner] = useState<ReactNode | ReactNode[]>(<></>);
  const isLoading = useAppSelector((state) => GetApiLoadingState({ ...state }));
  const isAxiosLoading = useAxiosLoader();
  const activeStep = useAppSelector((state) => state.visionIntake.activeStep);
  const [getEvent] = useGetRxRenewalEventIdMutation();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const { showSnackBar } = useSnackBar();

  const getRxRenewalEventId = async () => {
    try {
      const recaptchaToken = await fetchRecaptchaToken("rxRenewal");
      if (!authData) return;
      const response = await getEvent({
        patientId: Number(authData.PatientId),
        StoreId: Number(authData.StoreId),
        eventType: "RxRenewal",
        userId: null,
        recaptchaToken,
      }).unwrap();
      dispatch(
        SET_VISION_INTAKE_PROPERTY({
          key: "EventId",
          value: response.Result.EventId,
        })
      );
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  useEffect(() => {
    if (viewMode || !authData || formState !== "visionIntake") return;
    getRxRenewalEventId();
  }, [viewMode, authData, formState]);

  // Adding check here as all of vision intake takes place in a single route
  // so route based check is not possible
  useEffect(() => {
    if (!viewMode && authData && authData.userType !== USER_TYPE.PATIENT) {
      // user is not Patient
      router.replace("/");
      return;
    }
  }, [authData, viewMode]);

  const renderHeading = useMemo(() => {
    if (activeStep === 0) {
      return "Step 1: Confirm Location";
    }
    return "Step 2: Complete Medical Form";
  }, [activeStep]);

  return (
    <div
      className={styles.visionIntakeContainer}
      style={{ maxWidth: viewMode && !isPatient ? "none" : undefined }}
    >
      {viewMode && <h1 className="iris_table_heading">Vision Intake</h1>}
      <div className={styles.textContainer}>
        <h1 className={styles.primaryHeading}>{renderHeading}</h1>
      </div>
      <FormStepper />
      <FormSwitcher
        setModalInner={setModalInner}
        setModalOpen={setModalOpen}
        patientId={patientId}
        viewMode={viewMode}
        isPatient={isPatient}
      />
      <BackdropLoader openLoader={isLoading || isAxiosLoading} />
      <VisionIntakeModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalInner={modalInner}
      />
    </div>
  );
};

export default VisionIntake;
