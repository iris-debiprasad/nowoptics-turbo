import { Box, Button } from "@mui/material";
import i18n from "@root/host/src/language/i18n";

import {
  INITIAL_TIME_SLOTS,
  useLeftSideOfBEEContext,
} from "@/contexts/book-eye-exam-left-side";

import sharedStyle from "../index.module.scss";
import style from "./index.module.scss";

export function ExamForWhomChooser(): JSX.Element {
  const ctx = useLeftSideOfBEEContext();

  const chooseItsForMeExam = (): void => {
    ctx.appointmentSchedulerMethods.checkIfItsUsingAppointmentScheduler();
    ctx.setAppointmentBookingType(1);
    ctx.setWebSchedulerSlot([]);
    ctx.updateAvailableTimeSlots(INITIAL_TIME_SLOTS);
    ctx.appointmentSchedulerMethods.autoSelectBookEyeExamItem(
      ctx.typeOfExam,
      true,
    );
    ctx.setIsDobErr(false);
  };

  const chooseItsForSomeoneElseExam = () => {
    ctx.setAppointmentBookingType(2);
    ctx.setWebSchedulerSlot([]);
    ctx.updateAvailableTimeSlots(INITIAL_TIME_SLOTS);
    ctx.appointmentSchedulerMethods.setIsUsingAppoitnmentScheduler(false);
    ctx.setIsDobErr(false);
  };

  return (
    <>
      {" "}
      <Box
        className={sharedStyle.bookEyeExamTitle}
        role="heading"
        aria-label={i18n.t("BOOK_EYE_EXAM.IS_THIS_EXAM")}
        tabIndex={0}
      >
        {i18n.t("BOOK_EYE_EXAM.IS_THIS_EXAM")}
      </Box>
      <Box className={style.typeOfAppointmentExams}>
        <Button
          size="large"
          variant="outlined"
          className={
            ctx.appointmentBookingType === 1
              ? style.typeOfAppointmentBtnSelected
              : style.typeOfAppointmentBtn
          }
          onClick={chooseItsForMeExam}
        >
          <span className={style.bookEyeExamActionBtnTitleText}>
            {i18n.t("BOOK_EYE_EXAM.IT_FOR_ME")}
          </span>
        </Button>
        <Button
          size="large"
          variant="outlined"
          className={
            ctx.appointmentBookingType === 2
              ? style.typeOfAppointmentBtnSelected
              : style.typeOfAppointmentBtn
          }
          onClick={chooseItsForSomeoneElseExam}
        >
          <span className={style.bookEyeExamActionBtnTitleText}>
            {i18n.t("BOOK_EYE_EXAM.IT_FOR_SOMEONE")}
          </span>
        </Button>
      </Box>
    </>
  );
}
