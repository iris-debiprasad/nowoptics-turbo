import {
  DEBOUNCE_TIME,
  KEYBOARD_KEYS,
  RECAPTCHA_ACTION,
} from "@root/intake/src/constants/intake.constants";
import { useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetOTPErrors,
  GetOTPModalValues,
} from "@root/host/src/store/reducer/intake.selector";
import {
  CHANGE_PATIENT_INTAKE_STEP,
  RESET_OTP_FORM,
  SET_PATIENT_INTAKE_ERRORS,
  UPDATE_OTP_PROPERTY,
  UPDATE_OTP_VALUE,
} from "@root/host/src/store/reducer/intake.slice";
import {
  intakeApi,
  useResendPatientOtpAnonymousMutation,
  useResendPatientOtpMutation,
  useVerifyPatientOtpAnonymousMutation,
  useVerifyPatientOtpMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import {
  OTPModalProps,
  UpdateOtpValueActionType,
} from "@root/host/src/types/Intake.types";
import {
  formatOTPTime,
  generateOtpMessages,
  generateResendOtpPayload,
  generateVerifyOtpPayload,
  validateOtpInputs,
} from "@root/host/src/utils/intake.utils";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Grid from "@mui/material/Grid";
import Modal from "@mui/material/Modal";
import TextField from "@mui/material/TextField";
import Typography from "@mui/material/Typography";
import { FC, FormEvent, KeyboardEvent, useEffect } from "react";
import { batch, useDispatch } from "react-redux";
import style from "./OTPModal.module.scss";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { useSnackBar } from "@root/intake/src/context/SnackbarContext";
import {
  ErrorResponseType,
  GenericErrorResponseType,
  ResendPatientOtpAnonymousResponse,
  ResendPatientOtpResponse,
  VerifyPatientOtpAnonymousResponse,
  VerifyPatientOtpResponse,
  VerifyPatientOtpResult,
} from "@root/host/src/types/intakeApi.types";
import { IconButton } from "@mui/material";
import Image from "next/image";
import CloseIcon from "@root/assets/Images/icons/crossIcon.svg";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";

const OTPModal: FC<OTPModalProps> = ({ open, activeStep }) => {
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const dispatch = useDispatch();
  const { showSnackBar } = useSnackBar();
  const patientInformation = useAppSelector(
    (state) => state.intake.patientIntakeInformation
  );
  const patientIntakeMetaData = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );
  const otpValues = useAppSelector((state) => GetOTPModalValues({ ...state }));
  const otpErrors = useAppSelector((state) => GetOTPErrors({ ...state }));
  const {
    isEmailNeeded,
    isPhoneNeeded,
    otpValueEmail,
    otpValuePhone,
    timeLeft,
  } = otpValues;
  const [otpMessage, otpSentMessage] = generateOtpMessages(otpValues);
  const [resendOtp] = useResendPatientOtpMutation();
  const [verifyOtp] = useVerifyPatientOtpMutation();
  const [resendOtpAnonymous] = useResendPatientOtpAnonymousMutation();
  const [verifyOtpAnonymous] = useVerifyPatientOtpAnonymousMutation();
  const isPatient =
    patientIntakeMetaData?.session?.authData?.userType === "Patient";

  const handleOnKeyUp = ({ key, target }: KeyboardEvent<HTMLDivElement>) => {
    let next;
    switch (key) {
      case KEYBOARD_KEYS.DELETE:
      case KEYBOARD_KEYS.BACKSPACE:
      case KEYBOARD_KEYS.ARROWLEFT:
        next = (target as HTMLInputElement).tabIndex * 2 - 4;
        if (next > -2) {
          (target as HTMLFormElement).form.elements[next].focus();
        }
        return;
      case KEYBOARD_KEYS.TAB:
        return;
      default:
        if (isFinite(+key)) {
          next = (target as HTMLInputElement).tabIndex * 2;
          if (next < 24) {
            (target as HTMLFormElement).form.elements[next].focus();
          }
        }

        return;
    }
  };

  const handleOtpChange = (payload: UpdateOtpValueActionType) => {
    dispatch(UPDATE_OTP_VALUE(payload));
  };

  const handleOnInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    e.target.value = Math.max(0, parseInt(e.target.value))
      .toString()
      .slice(0, 1);
  };

  const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const otpErrors = validateOtpInputs(otpValues);
    dispatch(SET_PATIENT_INTAKE_ERRORS({ errors: otpErrors }));
    if (otpErrors.length > 0) return;
    if (patientIntakeMetaData.storeDetails == null) {
      showSnackBar("Please select a store", "error");
      return;
    }
    const recaptchaToken = (await fetchRecaptchaToken(RECAPTCHA_ACTION)) || "";
    const payload = generateVerifyOtpPayload(
      otpValues,
      patientIntakeMetaData.storeDetails.Id,
      patientIntakeMetaData.isAnonymous,
      patientIntakeMetaData.encryptedAppointmentId || "",
      recaptchaToken,
      patientInformation!
    );

    try {
      let response:
        | VerifyPatientOtpResponse
        | VerifyPatientOtpAnonymousResponse;
      if (patientIntakeMetaData.isAnonymous) {
        response = await verifyOtpAnonymous({ ...payload }).unwrap();
      } else {
        response = await verifyOtp({ ...payload, isPatient }).unwrap();
      }
      if (response.Error) {
        showSnackBar(
          response.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
        return;
      }

      const { EmailVerified, PhoneVerified, PhoneSuccessMsg, EmailSuccessMsg } =
        response?.Result;

      if (EmailVerified === true && PhoneVerified === true) {
        showSnackBar(PhoneSuccessMsg, "success");
        setTimeout(() => {
          showSnackBar(EmailSuccessMsg, "success");
        }, 2000);
      }

      if (EmailVerified === true) {
        showSnackBar(EmailSuccessMsg, "success");
      }

      if (PhoneVerified === true) {
        showSnackBar(PhoneSuccessMsg, "success");
      }

      batch(() => {
        dispatch(
          intakeApi.util.invalidateTags([
            "PatientInformation",
            "PatientAddress",
          ])
        );
        dispatch(RESET_OTP_FORM());
        dispatch(
          CHANGE_PATIENT_INTAKE_STEP({
            action: "Next",
            newStepValue: activeStep + 1,
          })
        );
      });
    } catch (error) {
      const errorRes =
        error as GenericErrorResponseType<VerifyPatientOtpResult>;
      const {
        EmailVerified,
        PhoneVerified,
        PhoneFailureMsg,
        EmailFailureMsg,
        EmailSuccessMsg,
        PhoneSuccessMsg,
      } = errorRes?.data?.Result;

      if (EmailVerified === false && PhoneVerified === false) {
        showSnackBar(
          PhoneFailureMsg ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
        setTimeout(() => {
          showSnackBar(
            EmailFailureMsg ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            "error"
          );
        }, 2000);
        return;
      }
      if (EmailVerified === false) {
        showSnackBar(
          EmailFailureMsg ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
        return;
      }

      if (PhoneVerified === false) {
        showSnackBar(
          PhoneFailureMsg ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
        return;
      }

      if (EmailVerified === true) {
        showSnackBar(EmailSuccessMsg, "success");
      }

      if (PhoneVerified === true) {
        showSnackBar(PhoneSuccessMsg, "success");
      }
    }
  };

  const handleResendOtp = async () => {
    const recaptchaToken = (await fetchRecaptchaToken(RECAPTCHA_ACTION)) || "";
    if (patientIntakeMetaData.storeDetails == null) {
      showSnackBar("Please select a store", "error");
      return;
    }
    const payload = generateResendOtpPayload(
      otpValues,
      patientIntakeMetaData.storeDetails.Id,
      patientIntakeMetaData.isAnonymous,
      patientIntakeMetaData.encryptedAppointmentId || "",
      recaptchaToken,
      patientInformation!
    );

    try {
      let response:
        | ResendPatientOtpResponse
        | ResendPatientOtpAnonymousResponse;
      if (patientIntakeMetaData.isAnonymous) {
        response = await resendOtpAnonymous({ ...payload }).unwrap();
      } else {
        response = await resendOtp({ ...payload, isPatient }).unwrap();
      }
      if (response.Result) {
        dispatch(UPDATE_OTP_PROPERTY({ key: "timeLeft", value: 300 }));
      }
      if (response.Error) {
        showSnackBar(
          response.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
        return;
      }
      showSnackBar(response.SuccessMessage, "success");
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  useEffect(() => {
    if (open) {
      let interval: ReturnType<typeof setInterval> | number = 0;
      if (timeLeft > 0) {
        interval = setInterval(() => {
          dispatch(
            UPDATE_OTP_PROPERTY({ key: "timeLeft", value: timeLeft - 1 })
          );
        }, DEBOUNCE_TIME);
      } else {
        clearInterval(interval);
      }
      return () => clearInterval(interval);
    }
  }, [timeLeft, open, dispatch]);

  return (
    <Modal open={open}>
      <Box className={style.otpContainer} data-testid="otp-phone-email">
        <CssBaseline />
        <Box className={style.otpBox}>
          <div className={style.otpHeaderWrapper}>
            <div>
              <Typography component="h1" variant="h5" className={style.otpHead}>
                Verification Code Validation
              </Typography>
              <IconButton
                className={style.closeButton}
                onClick={() => dispatch(RESET_OTP_FORM())}
              >
                <Image
                  src={CloseIcon}
                  alt="close-icon"
                  height={14}
                  width={14}
                />
              </IconButton>
            </div>
          </div>
          <Divider />
          <Box className={style.otpModal}>
            <Box className={style.otpMessageContainer}>
              <Typography className={style.otpMessage}>
                Update Profile
              </Typography>

              <Typography className={style.otpMessageBottom}>
                {otpSentMessage}
              </Typography>

              <Typography className={style.otpMessage}>{otpMessage}</Typography>
            </Box>
            <Box>
              <Box
                component="form"
                onSubmit={handleSubmit}
                noValidate
                className={style.formFields}
              >
                {isPhoneNeeded && (
                  <Box>
                    <Typography className={style.otpTypeHeading}>
                      Phone Number
                    </Typography>
                    <Box className={style.otpFormGroup}>
                      {otpValuePhone.map((value, i) => (
                        <TextField
                          margin="normal"
                          key={i}
                          required
                          id={"phoneOtp" + i}
                          name={"phoneOtp" + i}
                          type="number"
                          autoFocus={i === 0}
                          className={style.textInput}
                          value={value}
                          onInput={handleOnInput}
                          onChange={({ target: { value } }) =>
                            handleOtpChange({ index: i, value, type: "phone" })
                          }
                          onKeyUp={handleOnKeyUp}
                          inputProps={{
                            tabIndex: i + 1,
                            "data-testid": `phone-otp-input-${i + 1}`,
                          }}
                        />
                      ))}
                    </Box>
                    <span className={`${style.otpErrorMessage} errorMessage`}>
                      {otpErrors.PhoneOtp}
                    </span>
                    <Box></Box>
                  </Box>
                )}
                {isEmailNeeded && (
                  <Box>
                    <Typography className={style.otpTypeHeading}>
                      Email
                    </Typography>
                    <Box className={style.otpFormGroup}>
                      {otpValueEmail.map((value, i) => (
                        <TextField
                          margin="normal"
                          key={i}
                          required
                          id={"emailOtp" + i}
                          name={"emailOtp" + i}
                          type="number"
                          autoFocus={!isPhoneNeeded && isEmailNeeded && i === 0}
                          className={style.textInput}
                          value={value}
                          onInput={handleOnInput}
                          onChange={({ target: { value } }) =>
                            handleOtpChange({ index: i, value, type: "email" })
                          }
                          onKeyUp={handleOnKeyUp}
                          inputProps={{
                            tabIndex: Number(
                              `${
                                isPhoneNeeded && isEmailNeeded ? i + 7 : i + 1
                              }`
                            ),
                            "data-testid": `email-otp-input-${i + 1}`,
                          }}
                        />
                      ))}
                    </Box>
                    <span className={`${style.otpErrorMessage} errorMessage`}>
                      {otpErrors.EmailOtp}
                    </span>
                  </Box>
                )}
                <Grid container className={style.otpBottomContainer}>
                  <Grid item xs alignItems="center" justifyContent="center">
                    <Typography className={style.otpExpire}>
                      {timeLeft > 0
                        ? `The Verification Code will be expire in ${formatOTPTime(
                            timeLeft
                          )}`
                        : `The Verification Code has expired`}
                    </Typography>
                    <Button
                      className={style.otpFormLink}
                      tabIndex={isEmailNeeded && isPhoneNeeded ? 13 : 7}
                      onClick={handleResendOtp}
                      data-testid="resend-otp"
                    >
                      Resend Verification Code
                    </Button>
                  </Grid>
                </Grid>
                <Button
                  type="submit"
                  fullWidth
                  variant="contained"
                  className={style.otpBtn}
                  data-testid="verify-btn"
                  tabIndex={isEmailNeeded && isPhoneNeeded ? 14 : 8}
                >
                  Verify
                </Button>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
};

export default OTPModal;
