import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@root/assets/Images/icons/crossIcon(notAvailable).svg";
import Image from "next/image";
import {
  useMemo,
  type Dispatch,
  type FunctionComponent,
  type SetStateAction,
} from "react";
import styles from "./RenewalModal.module.scss";
import { useRouter } from "next/router";

const RenewalModal: FunctionComponent<{
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  activeStatus: "both" | "contact" | "eyeglass";
}> = ({ modalOpen, setModalOpen, activeStatus }) => {
    const router = useRouter();
  const renderModalInner = useMemo(() => {
    switch (activeStatus) {
      case "both":
        return (
          <div className={styles.modalInner}>
            <p>Good news, your prescription is still active!</p>
            <div className={styles.modalBtns}>
              <button className={styles.shopNowBtn} onClick={() => {
                setModalOpen(false);
                router.replace("/catalog/eyeglasses/")
              }}>Shop Now</button>
            </div>
          </div>
        );

      case "contact":
        return (
          <div className={styles.modalInner}>
            <p>Good news, your Contact Lens prescription is still active!</p>
            <div className={styles.modalBtns}>
              <button className={styles.shopNowBtn} onClick={() => router.replace("/catalog/contacts/")}>Shop Now</button>
              <button className={styles.renewBtn} onClick={() => setModalOpen(false)}>Renew Eyeglass RX</button>
            </div>
          </div>
        );

      case "eyeglass":
        return (
          <div className={styles.modalInner}>
            <p>Good news, your Eyeglass Prescription is still active!</p>
            <div className={styles.modalBtns}>
              <button className={styles.shopNowBtn} onClick={() => router.replace("/catalog/eyeglasses/")}>Shop Now</button>
              <button className={styles.renewBtn} onClick={() => setModalOpen(false)}>Renew Contact Lens RX</button>
            </div>
          </div>
        );
    }
  }, [activeStatus]);
  return (
    <PrimaryModal
      modalOpen={modalOpen}
      cstmStyle="rxRenewalModal"
      modalInner={
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            {activeStatus === "both" && (
              <IconButton
                onClick={() => {
                    setModalOpen(false)
                    router.replace("/")
                }}
                data-testid="close-modal-btn"
              >
                <Image
                  height={10}
                  width={10}
                  src={CloseIcon}
                  alt="close-icon"
                />
              </IconButton>
            )}
          </div>
          {renderModalInner}
        </div>
      }
    />
  );
};

export default RenewalModal;
