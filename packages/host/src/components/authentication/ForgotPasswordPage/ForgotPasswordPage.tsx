import { Box } from "@mui/material";
import React, { useEffect, useState } from "react";
import ForgotPassword from "../ForgotPassword/ForgotPassword";
import Otp from "../Otp/Otp";
import SetPassword from "../SetPassword/SetPassword";
import Success from "../Success/Success";
import style from "./ForgotPasswordPage.module.scss";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

function ForgotPasswordPage() {
  const INITIAL_STATE = {
    isFPValidated: false,
    isOtpValidated: false,
    isPassValidated: false,
  };
  const { t } = useTranslation();
  const [isFPValidated, setIsFPValidated] = useState(
    INITIAL_STATE.isFPValidated
  );
  const [isOtpValidated, setIsOtpValidated] = useState(
    INITIAL_STATE.isOtpValidated
  );
  const [isPassValidated, setIsPassValidated] = useState(
    INITIAL_STATE.isPassValidated
  );
  const [patientId, setPatientId] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");

  const router = useRouter();
  useEffect(() => {
    setIsFPValidated(INITIAL_STATE.isFPValidated);
    setIsOtpValidated(INITIAL_STATE.isOtpValidated);
    setIsPassValidated(INITIAL_STATE.isPassValidated);
  }, [router]);

  return (
    <Box className={style.authOuterWrapper}>
      <Box className={style.authContainer}>
        {!isFPValidated && (
          <ForgotPassword
            isFPValidated={isFPValidated}
            setIsFPValidated={setIsFPValidated}
            setPatientId={setPatientId}
            setMobileNumber={setMobileNumber}
          />
        )}
        {!isOtpValidated && isFPValidated && (
          <Otp
            isOtpValidated={isOtpValidated}
            setIsOtpValidated={setIsOtpValidated}
            patientId={patientId}
            mobileNumber={mobileNumber}
          />
        )}
        {!isPassValidated && isOtpValidated && isFPValidated && (
          <SetPassword
            formHead={t("AUTHENTICATION.RESET_PASSWORD")}
            isPassValidated={isPassValidated}
            setIsPassValidated={setIsPassValidated}
            patientId={patientId}
          />
        )}
        {isPassValidated && isOtpValidated && isFPValidated && (
          <Success content={t("AUTHENTICATION.PASSWORD_RESET")} />)}
      </Box>
    </Box>
  );
}

export default ForgotPasswordPage;