import { Box, Button, Modal, IconButton, Link } from "@mui/material";
import React, { FunctionComponent } from "react";
import style from "../Steps.module.scss";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { useRouter } from "next/router";
import { NoRelationConfirmationProp } from "@/types/bookEyeExamSteps.types";
// const IconSVG = dynamic(() => import("Host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;


function NoRelationConfirmation(props: NoRelationConfirmationProp) {
  const router = useRouter();
  return (
    <Modal
      open={props.showNoRelationModal}
      onClose={() => props.setShowNoRelationModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.crossBtn}>
          <IconButton onClick={() => props.setShowNoRelationModal(false)}>
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
            This phone number is already in use.
          </Box>
          <Box className={style.bookEyeExamModalTitle}>
            To book your appointment, please enter a different
          </Box>
          <Box className={style.bookEyeExamModalTitle}>
            phone number.
          </Box>
          <Box mt={2} className={style.bookEyeExamModalSubTitle}></Box>
          <Box mt={3} className={style.bookEyeExamModalActionWrapper}>
            <Button className={style.backButton} onClick={props.handleGoBack}>
              GO BACK
            </Button>

            <Button className={style.continueButton} onClick={() => {
                router.replace('contact-us')
            }}>
              CONTACT SUPPORT
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default NoRelationConfirmation;
