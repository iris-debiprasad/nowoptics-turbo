import { useTranslation } from "react-i18next";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import styles from "./index.module.scss";

export function MedicalFormCompleted(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={styles.messages}>
      <p className={styles.messages__title}>
        <CheckCircleOutlineIcon style={{ fill: "#0705f8" }} />

        {t("APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.COMPLETE_FORM.TITLE")}
      </p>
      <p className={styles.messages__subtitle}>
        {t(
          "APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.COMPLETE_FORM.TEXT.P1",
        )}
      </p>

      <p className={styles.messages__subtitle}>
        {t(
          "APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.COMPLETE_FORM.TEXT.P2",
        )}
      </p>
    </div>
  );
}
