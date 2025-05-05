import { DialogProps } from "@root/host/src/types/Intake.types";
import MuiDialog from "@mui/material/Dialog";
import MuiDialogTitle from "@mui/material/DialogTitle";
import { FunctionComponent, memo } from "react";
import styles from "./Dialog.module.scss";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@root/assets/Images/icons/close.svg";
import Image from "next/image";

const Dialog: FunctionComponent<DialogProps> = ({
  children,
  handleCancel,
  handleConfirm,
  heading,
  open,
  headingStyles,
  altConfirmText,
  altCancelText,
  hideCancel,
  hideConfirm,
}) => {
  return (
    <MuiDialog open={open} fullWidth maxWidth="sm">
      <MuiDialogTitle className={`${styles.dialogTitle} ${headingStyles}`}>
        <span className={styles.dialogHeading}>{heading}</span>
        <IconButton onClick={handleCancel} data-testid="close-button">
          <Image
            height={14}
            width={14}
            src={CloseIcon}
            className={styles.closeIcon}
            alt="close-icon"
          />
        </IconButton>
      </MuiDialogTitle>

      {children ? children : null}
      <div className={styles.dialogButtons}>
        {!hideCancel && (
          <button
            aria-label="no-button"
            onClick={handleCancel}
            data-testid="cancel-button"
            className={styles.cancelButton}
          >
            {altCancelText ?? "No"}
          </button>
        )}
        {!hideConfirm && (
          <button
            aria-label="yes-button"
            onClick={handleConfirm}
            data-testid="confirm-button"
            className={styles.confirmButton}
          >
            {altConfirmText ?? "Yes"}
          </button>
        )}
      </div>
    </MuiDialog>
  );
};

export default memo(Dialog);
