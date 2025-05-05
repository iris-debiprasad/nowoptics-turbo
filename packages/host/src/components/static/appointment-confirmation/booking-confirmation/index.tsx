import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ImageUrlConstants } from "@/constants/image.url.constants";

import sharedStyles from "../index.module.scss";
import styles from "./index.module.scss";
import { SaveTimeInStore } from "./save-time-in-store";
import { MedicalFormCompleted } from "./medical-form-completed";
import { AppointmentConfirmationUser } from "@/types/appointmentConfirmation.types";

const IMAGES = ImageUrlConstants.APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION;

interface Props {
  user: AppointmentConfirmationUser;
}

export function BookingConfirmation({
  user,
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={`${sharedStyles.section_container} ${styles.booking}`}>
      <div className={`${sharedStyles.wrapper}`}>
        <figure className={styles.booking__picture}>
          <Image
            alt={t("APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.TITLE")}
            src={IMAGES.EXAM}
            width={243}
            height={122}
          />
        </figure>

        <h1 className={styles.booking__title}>
          {t("APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.TITLE")}
        </h1>
        <h2 className={styles.booking__subtitle}>
          {t("APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.TEXT")}
        </h2>
        <p className={styles.booking__email}>{user.email}</p>

        <p className={styles.booking__provided_by}>
          {t("APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.PROVIDED_BY.P1")}
          <br />
          <span>
            {t("APPOINTMENT_CONFIRMATION.BOOKING_CONFIRMATION.PROVIDED_BY.P2")}
          </span>
        </p>

        {!user.isExamForSomeoneElse && user.medicalFormCompleted && (
          <MedicalFormCompleted />
        )}

        {!user.isExamForSomeoneElse && !user.medicalFormCompleted && (
          <SaveTimeInStore encryptedPatientId={user.encryptedPatientId} />
        )}
      </div>
    </section>
  );
}
