import { TimeSlotNotAvailableModalProps } from "@/types/bookEyeExamSteps.types";
import { Box, IconButton, Modal } from "@mui/material";
import { SO_DEFAULT_STORE_CONTACT_NUMBER } from "@root/host/src/constants/common.constants";
import i18n from "@root/host/src/language/i18n";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import dynamic from "next/dynamic";
import Link from "next/link";
import { FunctionComponent } from "react";
import style from "../Steps.module.scss";

// const IconSVG = dynamic(() => import("Host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;
import IconSVG from "@shared/host/IconSVG";


function TimeSlotNotAvailableModal(props: TimeSlotNotAvailableModalProps) {
  return (
    <Modal
      open={props.timeSlotUnavaliable}
      onClose={props.handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.crossBtn}>
          <IconButton onClick={props.handleClose}>
            <IconSVG
              width="10"
              height="10"
              viewBox="0 0 16 16"
              fill="var(--primary-text-color)"
              name="modal_cross"
            />
          </IconButton>
        </Box>
        <Box className={style.modalInner}>
          <Box className={style.bookEyeExamModalTitle}>
            {i18n.t("BOOK_EYE_EXAM.TIMESLOT_NOT_AVAILABLE")}
          </Box>
          <Box mt={2} className={style.bookEyeExamModalSubTitle} dangerouslySetInnerHTML={{ __html: props.slotNotAvaliable as string }}/>
          <Box mt={6} sx={{textAlign: 'center'}}>
            <Link  href={`tel:${SO_DEFAULT_STORE_CONTACT_NUMBER}`} className={style.modalACtionBtn}>
              {i18n.t("BOOK_EYE_EXAM.CONTACT_US")}
            </Link>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default TimeSlotNotAvailableModal;