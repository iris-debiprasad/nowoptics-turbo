import PlaceOutlinedIcon from "@mui/icons-material/PlaceOutlined";
import MicNoneOutlinedIcon from "@mui/icons-material/MicNoneOutlined";
import { useTranslation } from "react-i18next";
import { Button } from "@mui/material";
import CustomMap from "@/components/custommap/CustomMap";
import {
  AppointmentConfirmationDateAndTime,
  AppointmentConfirmationStore,
} from "@/types/appointmentConfirmation.types";
import { formatPhoneNumber } from "@/utils/common.utils";

import sharedStyles from "../index.module.scss";
import styles from "./index.module.scss";

interface Props {
  appointment: AppointmentConfirmationDateAndTime;
  store: AppointmentConfirmationStore;
}

export function AppointmentDetails({
  appointment,
  store,
}: Readonly<Props>): React.JSX.Element {
  const { t } = useTranslation();

  const formatDate = (): string =>
    Intl.DateTimeFormat("en-US", { dateStyle: "full" }).format(
      new Date(`${appointment.date}T00:00`),
    );

  const onGetDirectionsClick = (): void => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${store.latitude},${store.longitude}`,
      "_blank",
    );
  };

  return (
    <section className={`${sharedStyles.section_container} ${styles.details}`}>
      <div className={sharedStyles.wrapper}>
        <p className={styles.details__title}>
          {t("APPOINTMENT_CONFIRMATION.APPOINTMENT_DETAILS.TITLE")}
        </p>
        <p className={styles.details__date}>
          {formatDate()} | {appointment.time}
        </p>

        <p className={styles.details__store}>
          {store.brandName} - {store.name}
        </p>
        <p className={styles.details__info}>
          <PlaceOutlinedIcon />
          {store.address} <br /> {store.city}, {store.stateCode} {store.zipCode}
        </p>

        <a
          href={`tel:${store.primaryPhoneNumber}`}
          className={styles.details__info}
        >
          <MicNoneOutlinedIcon />
          {formatPhoneNumber(store.primaryPhoneNumber, false)}
        </a>

        <Button onClick={onGetDirectionsClick} type="button">
          {t("APPOINTMENT_CONFIRMATION.APPOINTMENT_DETAILS.DIRECTIONS_CTA")}
        </Button>

        <div className={styles.details__map}>
          <CustomMap
            centers={[
              {
                id: store.id,
                name: `${store.brandName} - ${store.name}`,
                coordinates: {
                  lat: store.latitude,
                  lng: store.longitude,
                },
              },
            ]}
          />
        </div>
      </div>
    </section>
  );
}
