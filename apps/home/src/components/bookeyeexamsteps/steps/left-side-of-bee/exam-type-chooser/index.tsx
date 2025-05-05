import React from "react";
import { Box, Button } from "@mui/material";

import i18n from "@root/host/src/language/i18n";
import { TypeOfExamDTO } from "@/types/bookEyeExamSteps.types";

import sharedStyle from "../index.module.scss";
import style from "./index.module.scss";
import { useLeftSideOfBEEContext } from "@/contexts/book-eye-exam-left-side";

export function ExamTypeChooser(): JSX.Element {
  const ctx = useLeftSideOfBEEContext();

  return (
    <>
      <Box
        className={sharedStyle.bookEyeExamTitle}
        role="heading"
        aria-label={i18n.t("BOOK_EYE_EXAM.WHAT_TYPE_OF_EXAM")}
        tabIndex={0}
      >
        {i18n.t("BOOK_EYE_EXAM.WHAT_TYPE_OF_EXAM")}
      </Box>

      <Box className={style.typeOfExams}>
        {ctx.typeOfExam?.map((item: TypeOfExamDTO) => {
          return (
            <Button
              size="large"
              key={item.Id}
              variant="outlined"
              className={
                item.Id === ctx.appointmentType?.Id
                  ? style.bookEyeExamActionBtnTitleSelected
                  : style.bookEyeExamActionBtnTitle
              }
              onClick={() => ctx.setAppointmentType(item)}
            >
              <span className={style.bookEyeExamActionBtnTitleText}>
                {item.Description}
              </span>
              {item.WebHelpText && (
                <span className={style.bookEyeExamActionBtnSubTitle}>
                  {item.WebHelpText}
                </span>
              )}
            </Button>
          );
        })}
      </Box>
    </>
  );
}
