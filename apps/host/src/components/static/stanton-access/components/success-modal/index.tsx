import { Modal } from "@mui/material";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";

interface Props {
  open: boolean;
  onClose: () => void;
}

export function SuccessModal({
  open,
  onClose,
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Modal {...{ open, onClose }}>
      <div className={styles.modal_content}>
        <p>{t("STANTON_ACCESS.FORM.SUCCESS_MODAL.MESSAGE")}</p>

        <div className={styles.group}>
          <Link className={styles.cta} href="/schedule-exam">
            {t("STANTON_ACCESS.FORM.SUCCESS_MODAL.FIND_STORE")}

            <IconSVG
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              fillP="#010101"
              name="arrow_solid_right"
            />
          </Link>

          <Link className={styles.cta} href="/book-eye-exam">
            {t("STANTON_ACCESS.FORM.SUCCESS_MODAL.BOOK_EYE_EXAM")}

            <IconSVG
              width="17"
              height="18"
              viewBox="0 0 17 18"
              fill="none"
              fillP="#010101"
              name="arrow_solid_right"
            />
          </Link>
        </div>
      </div>
    </Modal>
  );
}
