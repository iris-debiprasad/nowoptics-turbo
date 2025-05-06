import { Box, Button, Modal, IconButton } from "@mui/material";
import React, { FunctionComponent } from "react";
import style from "../Steps.module.scss";
import i18n from "@root/host/src/language/i18n";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { DuplicatePhoneModalProp } from "@/types/bookEyeExamSteps.types";
import { phoneFormatRegex } from "@root/host/src/constants/common.constants";
// const IconSVG = dynamic(() => import("Host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;


function DuplicatePhoneModal(props: DuplicatePhoneModalProp) {
  return (
    <Modal
    open={props.showDuplicatePhoneAlert}
    onClose={() => props.setShowDuplicatePhoneAlert(false)}
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
          Is this your mobile number?
        </Box>
        <Box mt={2} className={style.bookEyeExamModalSubTitle}>
          {props.phoneNumber?.replace(phoneFormatRegex, "($1) $2-$3")}
        </Box>
        <Box mt={3} className={style.bookEyeExamModalActionWrapper}>
          <Button
            className={style.backButton}
            onClick={() => props.setShowDuplicatePhoneAlert(false)}
          >
            {i18n.t("BOOK_EYE_EXAM.BACK")}
          </Button>
          <Button
            className={style.continueButton}
            onClick={() => {
              props.getListOfRelatedPatient();
            }}
          >
            {i18n.t("BOOK_EYE_EXAM.CONTINUE")}
          </Button>
        </Box>
      </Box>
    </Box>
  </Modal>
  )
}

export default DuplicatePhoneModal