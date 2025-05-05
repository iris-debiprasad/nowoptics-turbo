import { useTranslation } from "react-i18next";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import sharedStyles from "../index.module.scss";
import styles from "./index.module.scss";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import Image from "next/image";

const IMAGES = ImageUrlConstants.APPOINTMENT_CONFIRMATION.NEXT_STEPS;

export function GetReady(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={`${sharedStyles.section_container} ${styles.ready}`}>
      <div className={sharedStyles.wrapper}>
        <p className={styles.ready__title}>
          {t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.TITLE")}
        </p>
        <p className={styles.ready__subtitle}>
          {t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.SUBTITLE")}
        </p>

        <span className={styles.ready__bring_title}>
          {t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.BRING_TITLE")}
        </span>
        <p className={styles.ready__bring_item}>
          <CheckCircleOutlineIcon style={{ fill: "#F77A00" }} />
          <span>{t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.BRING_1")}</span>
        </p>
        <p className={styles.ready__bring_item}>
          <CheckCircleOutlineIcon style={{ fill: "#F77A00" }} />
          <span>{t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.BRING_2")}</span>
        </p>
        <p className={styles.ready__bring_item}>
          <CheckCircleOutlineIcon style={{ fill: "#F77A00" }} />
          <span>{t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.BRING_3")}</span>
        </p>
      </div>

      <div className={styles.group}>
        <figure className={styles.group__stan}>
          <Image
            alt={t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.TITLE")}
            height={265}
            src={IMAGES.STAN}
            width={311}
          />
        </figure>

        <p className={styles.group__text}>
          {t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.LOOK_FORWARD.P1")}
          <br />
          {t("APPOINTMENT_CONFIRMATION.NEXT_STEPS.LOOK_FORWARD.P2")}
        </p>
      </div>
    </section>
  );
}
