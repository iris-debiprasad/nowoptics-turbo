import { Box, Button, Modal, IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";
import style from "../Steps.module.scss";
import i18n from "@root/host/src/language/i18n";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import dayjs from "dayjs";
import { EYE_EXAM_APPOINTMENT_DATE_FORMAT } from "@root/host/src/constants/common.constants";
import { AppointmentBookedProp } from "@/types/bookEyeExamSteps.types";
import { useLeftSideOfBEEContext } from "@root/home/src/contexts/book-eye-exam-left-side";
// const IconSVG = dynamic(() => import("Host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;

function AppointmentBookedConfirmModal(props: AppointmentBookedProp) {
  const ctx = useLeftSideOfBEEContext();
  
  const onContinue = (): void => {
    setTimeout(() => {
      window.scroll({
        top: 20,
        behavior: "smooth",
      });
    }, 10);
    props.setStepCount(1);

    ctx.removeSelectedTimeSlot();
  };

  return (
    <Modal
      open={props.appointmentBooked}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.crossBtn}>
          <IconButton onClick={props.handleClose}>
            {/* <IconSVG
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="var(--primary-text-color)"
              name="modal_cross"
            /> */}
          </IconButton>
        </Box>
        <Box className={style.modalInner}>
          <Box className={style.bookEyeExamModalTitle}>
            {i18n.t("BOOK_EYE_EXAM.APPOINTMENT_DETAILS")}
          </Box>
          <Box mt={2} className={style.bookEyeExamModalSubTitle}>
            {dayjs(props.selectedDate).format(EYE_EXAM_APPOINTMENT_DATE_FORMAT)}
            &nbsp;{props.timeSlot} - {props.endTimeSlot}
          </Box>
          <Box mt={3} className={style.bookEyeExamModalActionWrapper}>
            <Button
              type="button"
              className={style.backButton}
              onClick={props.handleClose}
            >
              {i18n.t("BOOK_EYE_EXAM.BACK")}
            </Button>
            <Button
              className={style.continueButton}
              type="button"
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

export default AppointmentBookedConfirmModal;
