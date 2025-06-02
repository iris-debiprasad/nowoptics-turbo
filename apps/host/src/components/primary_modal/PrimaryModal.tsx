import React from "react";
import { Box, Button, Modal, Typography } from "@mui/material";
import style from "./PrimaryModal.module.scss";
import IconSVG from "../iconsvg/IconSVG";
import { PrimaryModalDTO } from "@root/host/src/types/PrimaryModal.types";
import { useAppSelector } from "@root/host/src/store/useStore";

const PrimaryModal = (props: PrimaryModalDTO) => {
  const { modalOpen, setModalOpen, setModalOpenWIthId } = props;
  const guidedSalesStep = useAppSelector(
    (state) => state?.guidedSales?.state?.currentStep
  );
  const handleClose = () => setModalOpen && setModalOpen(false);
  const handleCloseWithId = () =>
    setModalOpenWIthId && setModalOpenWIthId({ id: null });

  return (
    <Modal
      aria-describedby="modal-modal-description"
      aria-labelledby="modal-modal-title"
      aria-modal={modalOpen ? "true" : "false"}
      onClose={setModalOpen ? handleClose : handleCloseWithId}
      open={modalOpen}
      role="dialog"
      sx={{
        zIndex: props.increaseZIndex ? 2002 : 1300, // 1300 is the default zIndex for MUI Modal
      }}
      disableEnforceFocus={guidedSalesStep === 0}
      disableAutoFocus={guidedSalesStep === 0}
      slotProps={{
        backdrop: {
          onClick: () => {
            if (!props.preventBackdropClick) {
              handleClose();
            }
          },
        },
      }}
    >
      <Box
        className={`${style.modalWrapper} ${
          props.cstmStyle ? style[props.cstmStyle] : style.formModal
        }`}
      >
        {typeof props.modalInner === "string" && (
          <>
            <Box className={style.modalInner}>
              <Typography id="modal-modal-description">
                {props.modalInner}
              </Typography>
              <Button
                className={style.crossBtn}
                onClick={setModalOpen ? handleClose : handleCloseWithId}
              >
                <IconSVG
                  width="16"
                  height="16"
                  viewBox="0 0 16 16"
                  fill="var(--primary-text-color)"
                  name="modal_cross"
                />
              </Button>
            </Box>
          </>
        )}
        {typeof props.modalInner !== "string" && props.modalInner}
      </Box>
    </Modal>
  );
};

export default PrimaryModal;
