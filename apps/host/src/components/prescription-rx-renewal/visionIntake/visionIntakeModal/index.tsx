import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import IconButton from "@mui/material/IconButton";
import Image from "next/image";
import type {
  Dispatch,
  FunctionComponent,
  ReactNode,
  SetStateAction,
} from "react";
import styles from "./VisionIntakeModal.module.scss";
import CloseIcon from "@root/assets/Images/icons/crossIcon(notAvailable).svg";

const VisionIntakeModal: FunctionComponent<{
  modalOpen: boolean;
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  modalInner: ReactNode | ReactNode[];
}> = ({ modalOpen, setModalOpen, modalInner }) => {
  return (
    <PrimaryModal
      modalOpen={modalOpen}
      setModalOpen={setModalOpen}
      cstmStyle="transferClubModal"
      modalInner={
        <div className={styles.modalContainer}>
          <div className={styles.modalHeader}>
            <p className={styles.modalTitle}>Prescription Renewal</p>
            <IconButton
              onClick={() => setModalOpen(false)}
              data-testid="close-modal-btn"
            >
              <Image height={10} width={10} src={CloseIcon} alt="close-icon" />
            </IconButton>
          </div>

          {modalInner}
        </div>
      }
    />
  );
};

export default VisionIntakeModal;
