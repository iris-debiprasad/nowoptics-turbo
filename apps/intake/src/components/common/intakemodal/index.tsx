import { IntakeModalProps } from "@root/host/src/types/Intake.types";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@root/assets/Images/icons/close.svg";
import { FunctionComponent, memo } from "react";
import styles from "./IntakeModal.module.scss";
import Image from "next/image";

const IntakeModal: FunctionComponent<IntakeModalProps> = ({
  open,
  children,
  modalTitle,
  handleClose,
}) => {
  return (
    <Dialog
      open={open}
      onClose={handleClose}
      scroll={"paper"}
      fullWidth
      maxWidth="md"
      aria-labelledby="scroll-dialog-title"
      aria-describedby="scroll-dialog-description"
    >
      <DialogTitle id="scroll-dialog-title" className={styles.modalTitle}>
        {modalTitle ? modalTitle : null}
        <IconButton
          onClick={handleClose}
          className={styles.closeIcon}
          data-testid="close-icon"
        >
          <Image
            height={14}
            width={14}
            src={CloseIcon}
            alt="close-modal-icon"
            className={styles.closeIcon}
          />
        </IconButton>
      </DialogTitle>
      <DialogContent>{children ? children : null}</DialogContent>
      <DialogActions className={styles.modalActions}>
        <button data-testid="cancel-button" onClick={handleClose}>
          Cancel
        </button>
        <button onClick={handleClose}>Save</button>
      </DialogActions>
    </Dialog>
  );
};

export default memo(IntakeModal);
