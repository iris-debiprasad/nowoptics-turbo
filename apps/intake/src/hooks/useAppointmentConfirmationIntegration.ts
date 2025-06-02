import { useRouter } from "next/router";

import * as BEEF_CONSTANTS from "@root/host/src/constants/book-eye-exam-flow.constants";
import { Cookies } from "@root/host/src/utils/cookie.utils";
import { AppointmentConfirmationData } from "@root/host/src/types/appointmentConfirmation.types";

interface Return {
  onBookEyeExamFlowIntegration: () => void;
}

export const useAppointmentConfirmationIntegration = (): Return => {
  const router = useRouter();

  /**
   * User can be redirected from Book Eye Exam to this form as part of a specific flow,
   * this code belongs to that flow follow up, checks if the cookie that contains the
   * appointment data exists, if it does exist, it will continue the flow, otherwise,
   * flow is not being followed and nothing will execute
   */
  const onBookEyeExamFlowIntegration = (): void => {
    const appointmentBEEFlowData: string | undefined = Cookies.get(
      BEEF_CONSTANTS.APPOINTMENT_CONFIRMATION_COOKIE_DATA,
    );

    if (appointmentBEEFlowData === undefined) return;

    const data: AppointmentConfirmationData = JSON.parse(
      appointmentBEEFlowData,
    );
    const updatedData: AppointmentConfirmationData = {
      ...data,
      user: {
        ...data.user,
        medicalFormCompleted: true,
      },
    };

    Cookies.create(
      BEEF_CONSTANTS.APPOINTMENT_CONFIRMATION_COOKIE_DATA,
      JSON.stringify(updatedData),
    ); // Updates the cookie

    Cookies.create(
      BEEF_CONSTANTS.APPOINTMENT_CONFIRMATION_COOKIE_FLOW
        .INTAKE_FORM_REDIRECTION,
      "true",
    );

    router.push("/appointment-confirmation");
  };

  return { onBookEyeExamFlowIntegration };
};
