import React from "react";
import { Modal } from "@mui/material";
import style from "./ConfirmationModal.module.scss";
import IconSVG from "../iconsvg/IconSVG";
import { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";

function ConfirmationModal(props: ConfirmationModalProps) {
  const {
    open,
    handleClose,
    performAction,
    content,
    Id,
    btnOneText,
    btnTwoText,
    reverseBtns,
    isMergeGuestCartFlow,
    performActionForMergeCart,
    isRxGuestGridCartFlow,
    performActionForRxGuestGridCart,
  } = props;
  return (
    <div data-testid="delete-modal">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modalContainer}>
          <div className={style.headingwrapper}>
            <div
              className={style.closeIconWrapper}
              onClick={() =>
                isMergeGuestCartFlow
                  ? performActionForMergeCart &&
                    performActionForMergeCart(false)
                  : handleClose()
              }
            >
              <IconSVG
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#4d4d4d"
                name="modal_cross"
              />
            </div>
          </div>
          <div className={style.modalContent}>
            <span className={style.contentMessage}>{content}</span>
            <div className={style.actionContent}>
              {reverseBtns ? (
                <>
                  <button
                    onClick={() => performAction(Id)}
                    className={style.primaryButtonStyle}
                    style={{ marginRight: "35px" }}
                  >
                    {btnOneText}
                  </button>
                  <button
                    onClick={handleClose}
                    className={style.tertiaryButtonStyle}
                  >
                    {btnTwoText}
                  </button>
                </>
              ) : (
                <>
                  <button
                    onClick={() =>
                      isMergeGuestCartFlow
                        ? performActionForMergeCart &&
                          performActionForMergeCart(false)
                        : isRxGuestGridCartFlow
                        ? performActionForRxGuestGridCart &&
                          performActionForRxGuestGridCart()
                        : handleClose()
                    }
                    className={style.tertiaryButtonStyle}
                    style={{ marginRight: "35px" }}
                  >
                    {btnOneText}
                  </button>
                  <button
                    onClick={() =>
                      isMergeGuestCartFlow
                        ? performActionForMergeCart &&
                          performActionForMergeCart(true)
                        : performAction(Id)
                    }
                    className={style.primaryButtonStyle}
                  >
                    {btnTwoText}
                  </button>
                </>
              )}
            </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmationModal;
