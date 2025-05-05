import Link from "next/link";
import { useTranslation } from "react-i18next";
import AccessTimeIcon from "@mui/icons-material/AccessTime";

import styles from "./index.module.scss";

interface Props {
  encryptedPatientId: string;
}

export function SaveTimeInStore({
  encryptedPatientId,
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <div className={`${styles.save} ${styles.messages}`}>
      <p className={styles.messages__title}>
        <AccessTimeIcon style={{ fill: "#0028C4" }} />

        {t(
          "APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.UNCOMPLETE_FORM.TITLE",
        )}
      </p>
      <p className={styles.messages__subtitle}>
        {t(
          "APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.UNCOMPLETE_FORM.SUBTITLE",
        )}
      </p>
      <p className={styles.save__text}>
        {t(
          "APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.UNCOMPLETE_FORM.TEXT",
        )}
      </p>
      <Link
        className={styles.save__cta}
        href={`/medical-form/patient?key=${encryptedPatientId}`}
      >
        {t(
          "APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.UNCOMPLETE_FORM.CTA_TEXT",
        )}
      </Link>
    </div>
  );
}
