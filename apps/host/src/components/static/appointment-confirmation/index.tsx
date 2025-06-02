import React from "react";
import Cookies from "js-cookie";
import {
  APPOINTMENT_CONFIRMATION_COOKIE_DATA,
  APPOINTMENT_CONFIRMATION_COOKIE_FLOW,
} from "@root/host/src/constants/book-eye-exam-flow.constants";
import { AppointmentConfirmationData } from "@root/host/src/types/appointmentConfirmation.types";
import { AppointmentDetails } from "./appointment-details";
import { BookingConfirmation } from "./booking-confirmation";
import { GetReady } from "./get-ready";
import styles from "./index.module.scss";

interface Props {
  data: AppointmentConfirmationData;
}

export function AppointmentConfirmation({
  data,
}: Readonly<Props>): React.JSX.Element {
  React.useEffect(() => {
    // Keeping the cookie when the medical form is not completed, gives the possibility of the user
    // completing their medical form by using the CTA found in BookingConfirmation component and
    // once completing the form, be redirected to this page successfully
    if (!data.user.isExamForSomeoneElse && data.user.medicalFormCompleted)
      Cookies.remove(APPOINTMENT_CONFIRMATION_COOKIE_DATA);

    // Removing the cookie when exam is for someone else, since the intake form flow 
    // does not apply to exams for someone else
    if (data.user.isExamForSomeoneElse)
      Cookies.remove(APPOINTMENT_CONFIRMATION_COOKIE_DATA);

    Cookies.remove(
      APPOINTMENT_CONFIRMATION_COOKIE_FLOW.INTAKE_FORM_REDIRECTION,
    );
    Cookies.remove(APPOINTMENT_CONFIRMATION_COOKIE_FLOW.STRAIGHT_REDIRECTION);
  }, []);

  return (
    <section className={styles.grid}>
      <BookingConfirmation user={data.user} />
      <AppointmentDetails store={data.store} appointment={data.appointment} />
      <GetReady />
    </section>
  );
}
