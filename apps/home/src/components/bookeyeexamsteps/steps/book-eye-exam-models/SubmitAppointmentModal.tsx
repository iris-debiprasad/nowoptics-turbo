import { Cookies } from "@root/host/src/utils/cookie.utils";
import type { AppointmentConfirmationData } from "@root/host/src/types/appointmentConfirmation.types";
import {
  APPOINTMENT_CONFIRMATION_COOKIE_DATA,
  APPOINTMENT_CONFIRMATION_COOKIE_FLOW,
} from "@root/host/src/constants/book-eye-exam-flow.constants";
import { AlertColor, Box, Button, IconButton, Modal } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@root/assets/Images/icons/crossIcon.svg";
import React from "react";
import style from "../Steps.module.scss";
import i18n from "@root/host/src/language/i18n";
import dayjs from "dayjs";
import { SubmitAppointmentModalProps } from "@/types/bookEyeExamSteps.types";
import { useRouter } from "next/router";
import { getDetails } from "@root/host/src/utils/getSessionData";
import { getMyAccountProfileData } from "@/service/storeLocator.service";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";

const PROFILE_COMPLETE = 100;

function SubmitAppointmentModal(props: SubmitAppointmentModalProps) {
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const [isMedicalFormCompleted, setIsMedicalFormCompleted] = React.useState<
    boolean | null
  >(null);

  React.useEffect(() => {
    const getProfileCompletionPercentage = async () => {
      try {
        // Session being null, means that the user is not logged in
        // And it is using a guest session
        const session = await getDetails();
        if (!session) return setIsMedicalFormCompleted(false);

        const userProfileCompletionPercentage = (
          await getMyAccountProfileData(session.authData.PatientId || "")
        ).data.Result.ProfileCompletionPercentage;

        setIsMedicalFormCompleted(
          userProfileCompletionPercentage === PROFILE_COMPLETE,
        );
      } catch (err: any) {
        showSnackBar(
          err.response
            ? err.response.data.Error.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
        );
      }
    };

    getProfileCompletionPercentage();
  }, [typeof window !== "undefined" && localStorage.getItem("session")]);

  const createDataCookie = (): void => {
    if (isMedicalFormCompleted === null) return;

    const cookieData: AppointmentConfirmationData = {
      appointment: {
        date: props.selectedDate,
        time: props.timeSlot,
      },
      user: {
        isExamForSomeoneElse: props.isExamForSomeoneElse,
        encryptedPatientId: props.encryptedAppointmentId,
        email: props.userEmail,
        medicalFormCompleted: isMedicalFormCompleted,
      },
      store: {
        longitude: Number(props.store.Longitude),
        latitude: Number(props.store.Latitude),
        id: props.store.Id,
        storeNumber: props.store.StoreNumber,
        address: props.store.AddressLine1,
        name: props.store.WebDescription || "",
        brandName: props.store.BrandName,
        city: props.store.City,
        stateCode: props.store.StateCode,
        zipCode: props.store.ZipCode,
        primaryPhoneNumber: props.store.PhoneNumber.length
          ? props.store.PhoneNumber.find((item) => item.Type === "Primary")
            .PhoneNumber || ""
          : "",
      },
    };

    Cookies.create(
      APPOINTMENT_CONFIRMATION_COOKIE_DATA,
      JSON.stringify(cookieData)
    );
  };

  const goToAppointmentConfirmation = (): void => {
    createDataCookie();
    Cookies.create(
      APPOINTMENT_CONFIRMATION_COOKIE_FLOW.STRAIGHT_REDIRECTION,
      "true",
    );
    router.push("/appointment-confirmation");
  };

  const handleContinueAppoinment = () => {
    createDataCookie();
    props.appointmentBookedHandler();
  };

  const onContinue = (): void => {
    if (props.isExamForSomeoneElse) return goToAppointmentConfirmation();
    handleContinueAppoinment();
  };

  return (
    <Modal
      open={props.openSubmitModal}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.modalInner}>
          <IconButton
            className={style.appointmentBookedLink}
            onClick={goToAppointmentConfirmation}
            disabled={isMedicalFormCompleted === null}
          >
            <Image src={CloseIcon} alt="Close" width={16} height={16} />
          </IconButton>
          <Box mt={2} className={style.appointmentBookedConfirmationTitle}>
            {i18n.t("BOOK_EYE_EXAM.THIS_IS_TO_CONFIRM")}
          </Box>
          <Box mt={1} className={style.appointmentBookedConfirmationTitle}>
            {props.selectedDate &&
              dayjs(props.selectedDate).format("dddd, MMMM D")}{" "}
            - {props.timeSlot}
          </Box>
          <Box mt={2} className={style.bookEyeExamModalSubTitle}>
            {i18n.t("BOOK_EYE_EXAM.CONFIRM_DESC_1")} <br />
            {i18n.t("BOOK_EYE_EXAM.CONFIRM_DESC_2")}
          </Box>
          <Box mt={6} className={style.bookAppointmentModalActionWrapper}>
            <Button className={style.backButton} onClick={props.bookAnother}>
              {i18n.t("BOOK_EYE_EXAM.BOOK_ANOTHER")}
            </Button>
            <Button
              className={style.continueButton}
              disabled={isMedicalFormCompleted === null}
              onClick={onContinue}
            >
              {i18n.t("BOOK_EYE_EXAM.CONTINUE")}
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default SubmitAppointmentModal;
