import dayjs from "dayjs";
import React, { useState } from "react";
import { v4 as getUniqueId } from "uuid";
import { AlertColor, Box } from "@mui/material";

import { useSnackBar } from "@root/home/src/contexts/Snackbar/SnackbarContext";

import style from "./index.module.scss";

import { ReserveSlot } from "@/service/storeLocator.service";

import {
  AppointmentReservation,
  BookEyeExamStepProps,
  PatientSearchError,
  ReservationResponse,
} from "@/types/bookEyeExamSteps.types";

import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  APPOINTMENT_SCHEDULER_API_DATE_FORMAT_2,
  EYE_EXAM_APPOINTMENT_SLOT_FORMAT,
  REFERENCE_DOB_FORMAT,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import { Constants } from "@/constants/Constants";
import AddGTMEvent from "@root/host/src/utils/gtmEvent";
import { GA_TAG_EVENTS } from "@root/host/src/constants/google-analytics.constants";
import i18n from "@root/host/src/language/i18n";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import AppointmentBookedConfirmModal from "../book-eye-exam-models/AppointmentBookedConfirmModal";
import TimeSlotNotAvailableModal from "../book-eye-exam-models/TimeSlotNotAvailableModal";
import { ExamForWhomChooser } from "./exam-for-whom-chooser";
import { ExamTypeChooser } from "./exam-type-chooser";
import { AppointmentScheduler } from "./appointment-scheduler";
import {
  Provider,
  useLeftSideOfBEEContext,
} from "@root/home/src/contexts/book-eye-exam-left-side";
import { PatientDOB } from "./patient-dob";

const EXAM_BOOKING_TYPE = {
  UNDEFINED: -1,
  FOR_ME: 1, // Not used in use cases yet
  SOMEONE_ELSE: 2,
};

const LeftSideOfBEENoProvider = (): JSX.Element => {
  const { showSnackBar } = useSnackBar();
  const ctx = useLeftSideOfBEEContext();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const [appointentBooked, setAppointmentBooked] = useState(false);
  const [dobErrMsg, setDobErrMsg] = useState(ERROR_MESSAGE.DOB);

  console.log(ctx)

  React.useEffect(() => {
    const isAppointmentTypeSelected = ctx.appointmentType !== null;
    const isDateSelected = ctx.selectedDate !== "";
    const isTimeSlotSelected = ctx.timeSlot !== "";
    const isDOBSelected = ctx.dob !== "";

    const areFieldsFilled =
      isAppointmentTypeSelected &&
      isDateSelected &&
      isTimeSlotSelected &&
      isDOBSelected;

    if (!areFieldsFilled || ctx.isDobSelectorOpen) return;

    reserveSlotHandler();
  }, [
    ctx.appointmentBookingType,
    ctx.appointmentType,
    ctx.dob,
    ctx.isDobSelectorOpen,
    ctx.selectedDate,
    ctx.timeSlot,
  ]);

  const handleClose = () => {
    setAppointmentBooked(false);
    ctx.setTimeSlotsError((prev) => ({ ...prev, hasError: false }));
  };

  const validateSlotBooking = () => {
    if (
      ctx.dob &&
      ctx.selectedDate &&
      ctx.appointmentType &&
      ctx.timeSlot &&
      ctx.storeDetails &&
      !ctx.isDobErr
    ) {
      ctx.setIsDobErr(false);
      return true;
    } else {
      if (ctx.isDobErr) {
        ctx.setIsDobErr(true);
        setDobErrMsg(i18n.t("BOOK_EYE_EXAM.INVALID_DOB"));
      } else if (!ctx.dob) {
        ctx.setIsDobErr(true);
        setDobErrMsg(ERROR_MESSAGE.DOB);
      } else if (!ctx.appointmentType) {
        showSnackBar(
          i18n.t("BOOK_EYE_EXAM.PLEASE_SELECT_APPOINTMENT"),
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
        );
      } else if (!ctx.timeSlot) {
        showSnackBar(
          i18n.t("BOOK_EYE_EXAM.PLEASE_SELECT_TIME_SLOT"),
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
        );
      }
    }
    return false;
  };

  const reserveSlotHandler = async () => {
    const appointmentDate = dayjs(
      `${ctx.selectedDate} ${ctx.timeSlot}`,
      REFERENCE_DOB_FORMAT,
    ).format(APPOINTMENT_SCHEDULER_API_DATE_FORMAT_2);
    if (validateSlotBooking()) {
      const reserVationPayLoad: AppointmentReservation = {
        StoreId: ctx.storeDetails!.Id,
        AppointmentDateAndTime: appointmentDate,
        AppointmentTypeId: ctx.appointmentType!.Id,
        PatientDob: ctx.dob,
        WebSchedulerId: getUniqueId(),
      };
      const recaptchaToken = await fetchRecaptchaToken("Reserve_Slot");

      ReserveSlot(reserVationPayLoad, recaptchaToken)
        .then((resp) => {
          const reservationDetails: ReservationResponse = resp.data.Result;
          const endDate = dayjs(appointmentDate).add(
            reservationDetails.TimeSlotIntervalInMinutes,
            "minute",
          );
          ctx.setEndTimeSlot(
            dayjs(endDate).format(EYE_EXAM_APPOINTMENT_SLOT_FORMAT),
          );
          if (ctx.setReservationDetails) {
            ctx.setReservationDetails(reservationDetails);
          }
          setAppointmentBooked(true);
          AddGTMEvent({
            event: GA_TAG_EVENTS.BOOK_EYE_EXAM_Q1,
            eyeType: ctx.appointmentType?.Description,
            DOB: ctx.dob,
            timeFrame: ctx.selectedDaySlots,
            dateSelection: appointmentDate,
          });
        })
        .catch((error) => {
          const errorResponse: PatientSearchError = error.response?.data?.Error;
          const message = errorResponse
            ? errorResponse.Message
            : Constants.MESSAGES.APPOINTMENT_BOOKING_FAILED_DEFAULT;
          ctx.setTimeSlotsError({ message, hasError: true });
        });
    }
  };

  // === Render

  const isUserAnonymous: boolean = ctx.userType === USER_TYPE.ANONYMOUS;
  const isUserAPatient: boolean = ctx.userType === USER_TYPE.PATIENT;

  const isExamForWhomSelected =
    ctx.appointmentBookingType !== EXAM_BOOKING_TYPE.UNDEFINED;
  const isExamForSomeoneElse =
    ctx.appointmentBookingType === EXAM_BOOKING_TYPE.SOMEONE_ELSE;

  const isAppointmentDateTimeChosen =
    ctx.selectedDate !== "" && ctx.timeSlot !== "";

  const doRenderDOBForAnonymousUsers =
    isAppointmentDateTimeChosen && !isUserAPatient;
  const doRenderDOBForSomeoneElseBookingType =
    isExamForSomeoneElse && isAppointmentDateTimeChosen;

  const PatientDOBElement: JSX.Element = (
    <PatientDOB {...{ dobErrMsg, setDobErrMsg }} />
  );

  return (
    <div className={style.leftSideBEEWrapper}>
      {isUserAPatient && !ctx.reschedulingMode && <ExamForWhomChooser />}

      {isExamForWhomSelected || isUserAnonymous || ctx.reschedulingMode ? (
        ctx.typeOfExam.length && ctx.storeDetails ? (
          <>
            <ExamTypeChooser />

            {ctx.appointmentType && <AppointmentScheduler />}
            {doRenderDOBForAnonymousUsers && PatientDOBElement}
            {doRenderDOBForSomeoneElseBookingType && PatientDOBElement}

            <Box mt={6} className={style.bookEyeExamNextBtnWrapper}>
              <AppointmentBookedConfirmModal
                appointmentBooked={appointentBooked}
                handleClose={handleClose}
                selectedDate={ctx.selectedDate}
                timeSlot={ctx.timeSlot}
                endTimeSlot={ctx.endTimeSlot}
                setStepCount={ctx.setStepCount}
              />

              <TimeSlotNotAvailableModal
                timeSlotUnavaliable={ctx.timeSlotsError.hasError}
                handleClose={handleClose}
                slotNotAvaliable={ctx.timeSlotsError.message}
              />
            </Box>
          </>
        ) : (
          <p>{i18n.t("BOOK_EYE_EXAM.LOADING")}</p>
        )
      ) : (
        <></>
      )}
    </div>
  );
};

const LeftSideOfBEE = (props: BookEyeExamStepProps): JSX.Element => (
  <Provider {...props}>
    <LeftSideOfBEENoProvider />
  </Provider>
);

export default LeftSideOfBEE;
