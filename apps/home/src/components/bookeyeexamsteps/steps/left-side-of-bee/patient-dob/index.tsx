import { Box } from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import {
  DATE_FORMAT,
  DOCTOR_SCHEDULER_API_DATE_FORMAT,
} from "@root/host/src/constants/common.constants";
import i18n from "@root/host/src/language/i18n";
import dayjs, { Dayjs } from "dayjs";

import { useLeftSideOfBEEContext } from "@root/home/src/contexts/book-eye-exam-left-side";
import style from "./index.module.scss";
import React from "react";

const DOB_MIN_DATE = new Date(
  dayjs().year() - 100,
  dayjs().month(),
  dayjs().date(),
);

interface Props {
  dobErrMsg: string;
  setDobErrMsg: React.Dispatch<React.SetStateAction<string>>;
}

export const PatientDOB = function PatientDOB({
  dobErrMsg,
  setDobErrMsg,
}: Readonly<Props>): JSX.Element {
  const ctx = useLeftSideOfBEEContext();

  return (
    <Box className={style.bookEyeExamDOB}>
      <Box
        className={style.bookEyeExamDOBTitle}
        role="heading"
        aria-label={i18n.t("BOOK_EYE_EXAM.ENTER_PATIENT_DOB")}
        tabIndex={0}
      >
        {i18n.t("BOOK_EYE_EXAM.ENTER_PATIENT_DOB")}
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <DesktopDatePicker<Dayjs>
          onOpen={() => ctx.setIsDobSelectorOpen(true)}
          onClose={() => ctx.setIsDobSelectorOpen(false)}
          disableFuture
          format={DATE_FORMAT}
          openTo="year"
          closeOnSelect
          value={ctx.dob ? dayjs(ctx.dob) : null}
          minDate={dayjs(DOB_MIN_DATE)}
          maxDate={dayjs()}
          onChange={(value, context) => {
            if (!context.validationError) {
              if (value) {
                ctx.setIsDobErr(false);
                ctx.setDob(
                  dayjs(value).format(DOCTOR_SCHEDULER_API_DATE_FORMAT),
                );
              } else {
                ctx.setDob("");
              }
            } else {
              ctx.setIsDobErr(true);
              setDobErrMsg(i18n.t("BOOK_EYE_EXAM.INVALID_DOB"));
            }
          }}
          onAccept={(value) => {
            ctx.setIsDobErr(false);
            ctx.setDob(dayjs(value).format(DOCTOR_SCHEDULER_API_DATE_FORMAT));
          }}
          className={`${style.bookEyeExamDOBInput} ${ctx.isDobErr ? style.invalid : style.valid
            }`}
          disabled={ctx.reschedulingMode || ctx.appointmentBookingType === 1}
          slotProps={{
            textField: {
              inputProps: {
                "data-testid": "add-new-store-opening-date-time",
              },
              error: Boolean(ctx.isDobErr),
            },
          }}
        />
      </LocalizationProvider>
      {ctx.isDobErr ? (
        <Box className={style.dobErrorMsg}>{dobErrMsg}</Box>
      ) : null}
    </Box>
  );
};
