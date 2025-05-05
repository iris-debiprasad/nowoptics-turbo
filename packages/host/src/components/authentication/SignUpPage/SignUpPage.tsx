import style from "./SignUpPage.module.scss";
import { Box } from "@mui/material";
import LoginForm from "../LoginForm/LoginForm";
import RegistrationForm from "../RegistrationForm/RegistrationForm";
import Otp from "../Otp/Otp";
import { useEffect, useRef, useState } from "react";
import SetPassword from "../SetPassword/SetPassword";
import Success from "../Success/Success";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

export default function SignUpPage() {
  const [isValidated, setIsValidated] = useState(false);
  const [isOtpValidated, setIsOtpValidated] = useState(false);
  const [isPassValidated, setIsPassValidated] = useState(false);
  const [patientId, setPatientId] = useState(0);
  const [mobileNumber, setMobileNumber] = useState("");
  const { t } = useTranslation();
  const router = useRouter();
  const registrationFormRef = useRef<HTMLDivElement>(null);
  const loginFormRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsValidated(false);
    setIsOtpValidated(false);
    setIsPassValidated(false);
  }, [router]);

  useEffect(() => {
    const { st } = router.query;

    switch (st) {
      case "sign-up":
        registrationFormRef.current?.scrollIntoView();
        break;
      case "sign-in":
        loginFormRef.current?.scrollIntoView();
        break;
      default:
        break;
    }
  }, [router.query]);

  return (
    <>
      <Box className={style.authOuterWrapper}>
        <Box className={style.authContainer}>
          {!isValidated && (
            <Box className={style.signUpWrapper}>
              {router?.isReady && (
                <>
                  <section ref={registrationFormRef}>
                    <RegistrationForm
                      isValidated={isValidated}
                      setIsValidated={setIsValidated}
                      setPatientId={setPatientId}
                      setMobileNumber={setMobileNumber}
                      focusLogin={router?.query?.isLogin === "true"}
                    />
                  </section>

                  <section ref={loginFormRef}>
                    <LoginForm
                      formHead={t(`AUTHENTICATION.SIGN_IN`)}
                      formMessage={t(`AUTHENTICATION.ALREADY_HAVE_ACCOUNT`)}
                      focusLogin={router?.query?.isLogin === "true"}
                    />
                  </section>
                </>
              )}
            </Box>
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
          {isPassValidated && isOtpValidated && isValidated && (
            <Box className={style.wrapper}>
              <Success content={t(`AUTHENTICATION.YOUR_ACCOUNT_CREATED`)} />
            </Box>
          )}
        </Box>
      </Box>
    </>
  );
}
