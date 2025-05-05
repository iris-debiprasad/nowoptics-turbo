import React, { useEffect, useState } from "react";
import style from "./LoginRegisterForm.module.scss";
import { Box } from "@mui/material";
import { useTranslation } from "react-i18next";
import LoginForm from "@/components/authentication/LoginForm/LoginForm";
import LoginHeader from "../../../prescription-rx-renewal/LoginHeader/LoginHeader";
import RegistrationForm from "@/components/authentication/RegistrationForm/RegistrationForm";
import SetPassword from "@/components/authentication/SetPassword/SetPassword";
import Otp from "@/components/authentication/Otp/Otp";
import Success from "@/components/authentication/Success/Success";

export default function LoginRegisterForm() {
  const { t } = useTranslation();
  const [isValidated, setIsValidated] = useState(false);
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [isPassValidated, setIsPassValidated] = useState(false);
  const [patientId, setPatientId] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const [showRegistrationForm, setShowRegistrationForm] = useState(true);
  useEffect(() => {
    setIsValidated(false);
    setIsOtpValidated(false);
    setIsPassValidated(false);
  }, [showRegistrationForm]);

  const showRegistrationFormFun = () => {
    setShowRegistrationForm(true);
  };
  const hideRegistrationFormFun = () => {
    setShowRegistrationForm(false);
  };
  return (
    <>
      <Box className={style.authOuterWrapper}>
        <LoginHeader />
        <Box className={style.authContainer}>
          {!showRegistrationForm && !isValidated && (
            <LoginForm
              formHead={t("AUTHENTICATION.SIGN_IN")}
              formMessage=""
              noRedirect={true}
              showRegistrationFormFun={showRegistrationFormFun}
            />
          )}
          {showRegistrationForm && !isValidated && (
            <RegistrationForm
              isValidated={isValidated}
              setIsValidated={setIsValidated}
              setPatientId={setPatientId}
              setMobileNumber={setMobileNumber}
              noRedirect={true}
              hideRegistrationFormFun={hideRegistrationFormFun}
            />
          )}

          {!isOtpValidated && isValidated && (
            <Box className={style.wrapper}>
              <Otp
                isOtpValidated={isOtpValidated}
                setIsOtpValidated={setIsOtpValidated}
                patientId={patientId}
                mobileNumber={mobileNumber}
              />
            </Box>
          )}
          {!isPassValidated && isOtpValidated && isValidated && (
            <Box className={style.wrapper}>
              <SetPassword
                formHead={t(`AUTHENTICATION.SET_PASSWORD`)}
                isPassValidated={isPassValidated}
                setIsPassValidated={setIsPassValidated}
                patientId={patientId}
              />
            </Box>
          )}
          {/* TO DO :- THIS IS OF NO USE AS AFTER SETTING PASSWORD, IT TAKES US TO VISION INTAKE */}
          {/* {isPassValidated && isOtpValidated && isValidated && (
                        <Box className={style.wrapper}>
                            <Success content={t(`AUTHENTICATION.YOUR_ACCOUNT_CREATED`)} />
                        </Box>
                    )} */}
        </Box>
      </Box>
    </>
  );
}
