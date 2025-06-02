import React, { FunctionComponent, useEffect, useState } from "react";
import { useRouter } from "next/router";
import Steps from "./steps/Steps";
import EyeExamHeader from "./header/EyeExamHeader";
import EyeExamFooter from "./footer/EyeExamFooter";
import useAxiosLoader from "@root/home/src/hooks/useAxiosLoader";
import dynamic from "next/dynamic";
import { SnackBarProvider } from "@root/home/src/contexts/Snackbar/SnackbarContext";
import { USER_TYPE } from "@root/host/src/constants/common.constants";
import useLanguageTranslation from "@root/host/src/hooks/useLanguageTranslation";
import BackdropLoader from "@shared/host/BackdropLoader";



interface BookEyeExamProp {
  userType: any;
  brand: string;
}

const BookEyeExamSteps = ({ userType,brand }: BookEyeExamProp) => {
  useLanguageTranslation();
  const [stepCount, setStepCount] = useState(0);
  const router = useRouter();
  const { patientId, appointmentId, apptid } = router.query;
  const [reschedulingMode, setReschedulingMode] = useState(false);
  const loading = useAxiosLoader();

  useEffect(() => {
    if (appointmentId && patientId && userType === USER_TYPE.PATIENT) {
      setReschedulingMode(true);
    } else if ((appointmentId || apptid) && userType === USER_TYPE.ANONYMOUS) {
      setReschedulingMode(true);
    } else {
      setReschedulingMode(false);
    }
  }, [patientId, appointmentId]);

  return (
    <SnackBarProvider>
      <div>
        <EyeExamHeader stepCount={stepCount} />
        <Steps
          stepCount={stepCount}
          setStepCount={(step) => setStepCount(step)}
          appointmentId={(appointmentId as string) || (apptid as string)}
          patientId={patientId as string}
          reschedulingMode={reschedulingMode}
          userType={userType}
          brand={brand}
        />
        <EyeExamFooter />
        <BackdropLoader openLoader={loading} />
      </div>
    </SnackBarProvider>
  );
};

export default BookEyeExamSteps;
