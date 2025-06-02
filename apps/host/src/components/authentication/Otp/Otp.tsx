import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./Otp.module.scss";
import { OtpDTO, OtpPropsDTO } from "@root/host/src/types/auth.type";
import {
  SO_DEFAULT_STORE_NUMBER,
  INPUT_MASK,
  ISD_CODE,
  KEYBOARD_KEYS,
  SNACKBAR_COLOR_TYPE,
} from "../../../constants/common.constants";
import axios from "axios";
import { IrisUrlConstants } from "@root/host/src/constants/iris.url.constants";
import BackdropLoader from "@root/host/src/components/backdrop_loader/BackdropLoader";
import { AlertColor, Divider } from "@mui/material";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { useSnackBar } from "@root/host/src/contexts/Snackbar/SnackbarContext";
import { HeaderConfig } from "@root/host/src/config/headerConfig";
import IconSVG from "@root/host/src/components/iconsvg/IconSVG";
import { AddPatientPayloadDTO } from "@root/host/src/types/addPatientModal.types";
import { consentModalSendOtpPayload } from "@root/host/src/types/addRelationConsentModal.types";
import { patientRelationshipSendOtp } from "@root/host/src/service/common.service";
import { IMask } from "react-imask";
import { useTranslation } from "react-i18next";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";

const INITIAL_STATE = {
  otp1: {
    value: "",
    error: false,
  },
  otp2: {
    value: "",
    error: false,
  },
  otp3: {
    value: "",
    error: false,
  },
  otp4: {
    value: "",
    error: false,
  },
  otp5: {
    value: "",
    error: false,
  },
  otp6: {
    value: "",
    error: false,
  },
};

export default function Otp(props: OtpPropsDTO) {
  const {
    isModal,
    setIsModalOpen,
    createPatientAndAddRelation,
    createPatientPayload,
    payloadForValidateOtpForConsent,
    validateOtpForConsent,
    isModalForCreatePatient,
    isOtpModalForConsent,
    isOtpModalForCreatePatientCheckout,
    handleVerfiyForCreatePatientGuestCheckout,
    resendOtpForCreatePatientGuestCheckout,
    translate,
  } = props;
  const { t = props?.translate } = useTranslation();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const [openLoader, setLoaderOpen] = React.useState(false);
  const { showSnackBar } = useSnackBar();
  const [seconds, setSeconds] = React.useState(300);
  const [formValues, setFormValues] = React.useState<OtpDTO>(INITIAL_STATE);
  const [otpError, setOtpError] = React.useState("");
  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });
  maskedMobile.resolve(props.mobileNumber as string);

  React.useEffect(() => {
    let interval: any = null;
    if (seconds > 0) {
      interval = setInterval(() => {
        setSeconds(seconds - 1);
      }, 1000);
    } else {
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [seconds]);

  const formatTime = (time: any) => {
    const minutes = Math.floor(time / 60);
    const seconds = time % 60;
    return `${minutes.toString().padStart(2, "0")}:${seconds
      .toString()
      .padStart(2, "0")}`;
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setOtpError("");
    const { name, value } = e.target as HTMLInputElement;

    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name as keyof typeof formValues],
        value,
        error: false,
      },
    });
  };

  const generateOtp = async () => {
    setLoaderOpen(true);
    const recaptchaToken = await fetchRecaptchaToken("resend_otp");
    await axios
      .post(
        IrisUrlConstants.OTP_GENERATE_URL,
        {
          isdCode: ISD_CODE,
          phoneNumber: props.mobileNumber,
        },
        {
          headers: {
            ...HeaderConfig().headers,
            recaptchaToken: recaptchaToken,
          },
        }
      )
      .then((res) => {
        setFormValues(INITIAL_STATE);
        setLoaderOpen(false);
        setSeconds(300);
        showSnackBar(
          res.data.SuccessMessage,
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
        );
      })
      .catch((err) => {
        setLoaderOpen(false);
        showSnackBar(
          err.response
            ? err.response.data.Error.Description
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const otpCombine =
    formValues.otp1.value +
    formValues.otp2.value +
    formValues.otp3.value +
    formValues.otp4.value +
    formValues.otp5.value +
    formValues.otp6.value;

  const validateOtp = async () => {
    let HeaderConfigs = HeaderConfig();
    if (HeaderConfigs.headers) {
      HeaderConfigs.headers["CreatedAtStoreNumber"] = JSON.parse(
        localStorage?.getItem("selectedStore") as string
      )?.StoreNumber
        ? JSON.parse(localStorage?.getItem("selectedStore") as string)
            ?.StoreNumber
        : SO_DEFAULT_STORE_NUMBER;
    }
    const token = await fetchRecaptchaToken("otp_validation");
    await axios
      .post(
        IrisUrlConstants.OTP_VALIDATE_URL,
        {
          patientId: props.patientId,
          otp: otpCombine,
        },
        {
          headers: {
            ...HeaderConfigs.headers,
            recaptchaToken: token,
          },
        }
      )
      .then((res) => {
        setLoaderOpen(false);
        props.setIsOtpValidated && props.setIsOtpValidated(true);
      })
      .catch((err) => {
        setLoaderOpen(false);
        showSnackBar(
          err.response?.data.Error.Description,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };
  const resendOtpForAddPatient = () => {
    createPatientAndAddRelation &&
      createPatientAndAddRelation(createPatientPayload as AddPatientPayloadDTO);
    if (isModal) {
      setFormValues(INITIAL_STATE);
      setSeconds(300);
    }
  };
  const sendOtpForAddPatient = () => {
    let payload: AddPatientPayloadDTO = {
      ...(createPatientPayload as AddPatientPayloadDTO),
      OTP: otpCombine ? otpCombine : "",
    };
    createPatientAndAddRelation && createPatientAndAddRelation(payload);
  };

  const patientRelationshipResendOtpForConsent = async (
    payload: consentModalSendOtpPayload
  ) => {
    await patientRelationshipSendOtp(payload)
      .then((res) => {
        setFormValues(INITIAL_STATE);
        setSeconds(300);
        if (props.isAddRelationshipFromPatientFile) {
          props.setSnackBar &&
            props.setSnackBar(
              res?.data?.SuccessMessage,
              SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
            );
        } else {
          showSnackBar(
            res?.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        }
      })
      .catch((err) => {
        const err_msg = err.response
          ? err.response.data.Error.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;

        if (props.isAddRelationshipFromPatientFile) {
          props.setSnackBar &&
            props.setSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        }
        showSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue =
        formValues[currentField as keyof typeof formValues].value;
      if (!currentValue) {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField as keyof typeof formValues],
            error: true,
          },
        };
      } else {
        newFormValues = {
          ...newFormValues,
          [currentField]: {
            ...newFormValues[currentField as keyof typeof formValues],
            error: false,
          },
        };
      }
    }
    setFormValues(newFormValues);
    if (
      !newFormValues.otp1.error &&
      !newFormValues.otp2.error &&
      !newFormValues.otp3.error &&
      !newFormValues.otp4.error &&
      !newFormValues.otp5.error &&
      !newFormValues.otp6.error
    ) {
      if (isModal) {
        if (isModalForCreatePatient) {
          sendOtpForAddPatient();
        } else if (isOtpModalForCreatePatientCheckout) {
          handleVerfiyForCreatePatientGuestCheckout &&
            handleVerfiyForCreatePatientGuestCheckout(false, otpCombine);
        } else {
          let payload: consentModalSendOtpPayload = {
            ...(payloadForValidateOtpForConsent as consentModalSendOtpPayload),
            otp: otpCombine,
          };
          validateOtpForConsent && validateOtpForConsent(payload);
        }
      } else {
        setLoaderOpen(true);
        validateOtp();
      }
    } else {
      setOtpError(t("AUTHENTICATION.OTP_ERROR"));
    }
  };

  const resendOtp = () => {
    if (isModal) {
      if (isModalForCreatePatient) {
        resendOtpForAddPatient();
      } else if (isOtpModalForCreatePatientCheckout) {
        resendOtpForCreatePatientGuestCheckout &&
          resendOtpForCreatePatientGuestCheckout();
      } else {
        patientRelationshipResendOtpForConsent(
          props.payloadForResendOtpApi as consentModalSendOtpPayload
        );
      }
    } else {
      generateOtp();
    }
  };

  const inputfocus = (elmnt: React.KeyboardEvent<HTMLInputElement>) => {
    if (
      elmnt.key === KEYBOARD_KEYS.DELETE ||
      elmnt.key === KEYBOARD_KEYS.BACKSPACE ||
      elmnt.key === KEYBOARD_KEYS.ARROWLEFT
    ) {
      const next = (elmnt.target as HTMLInputElement).tabIndex * 2 - 4;
      if (next > -2) {
        (elmnt.target as HTMLFormElement).form.elements[next].focus();
      }
    } else if (elmnt.key === KEYBOARD_KEYS.TAB) {
      return;
    } else {
      const next = (elmnt.target as HTMLInputElement).tabIndex * 2;
      if (next < 12) {
        (elmnt.target as HTMLFormElement).form.elements[next].focus();
      }
    }
  };

  return (
    <Box
      className={`${style.otpContainer} ${isModal && style.otpContainerModal}`}
      data-testid="otp-comp"
    >
      <CssBaseline />
      <BackdropLoader openLoader={openLoader} />
      <Box className={`${style.otpBox} ${isModal && style.otpBoxModal}`}>
        {!isModal && (
          <Typography component="h1" variant="h5" className={style.otpHead}>
            {t("AUTHENTICATION.VERIFICATION_CODE_VALIDATION")}
          </Typography>
        )}
        {isModal && (
          <>
            <div className={style.otpHeaderWrapperModal}>
              <div>
                <Typography
                  component="h1"
                  variant="h5"
                  className={style.otpHeadModal}
                >
                  {t("AUTHENTICATION.VERIFICATION_CODE_VALIDATION")}
                </Typography>
              </div>
              <div
                onClick={() => setIsModalOpen && setIsModalOpen(false)}
                className={style.crossIcon}
              >
                <IconSVG
                  width="12"
                  height="12"
                  viewBox="0 0 15 15"
                  fill="#4d4d4d"
                  name="modal_cross"
                />
              </div>
            </div>
            <Divider />
          </>
        )}
        <Box className={style.otpMessageContainer}>
          {!isModal && (
            <Typography className={style.otpMessage}>
              {t("AUTHENTICATION.VERIFY_PHONE_NUMBER")}
            </Typography>
          )}
          <Typography className={style.otpMessageBottom}>
            {t("AUTHENTICATION.VERIFICATION_CODE_SEND")} {maskedMobile.value}.
            <br />
            {t("AUTHENTICATION.PLEASE_ENTER_VERIFICATION_CODE")}{" "}
            {!isOtpModalForConsent
              ? t("AUTHENTICATION.VERIFY_YOUR_PHONE_NUMBER")
              : t("AUTHENTICATION.GIVE_YOUR_PROFILE_ACCESS")}
          </Typography>
        </Box>
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className={style.formFields}
          data-testid="form"
        >
          <Box className={style.otpFormGroup}>
            {Object.entries(formValues).map((formItem, i) => (
              <TextField
                margin="normal"
                key={i}
                required
                id={formItem[0]}
                name={formItem[0]}
                type="text"
                autoFocus={i === 0}
                className={style.textInput}
                value={formItem[1].value}
                inputProps={{
                  maxLength: 1,
                  pattern: "[0-9]*",
                  tabIndex: i + 1,
                  inputMode: "numeric",
                }}
                onInput={(e: React.ChangeEvent<HTMLInputElement>) => {
                  e.target.value = e.target.value.replace(/\D/g, "");
                }}
                onChange={handleChange}
                data-testid={`otp-input-${i + 1}`}
                error={formItem[1].error}
                onKeyUp={(e) =>
                  inputfocus(e as React.KeyboardEvent<HTMLInputElement>)
                }
              />
            ))}
          </Box>
          {otpError && <span className={style.otpErrorText}>{otpError}</span>}
          <Grid container className={style.otpBottomContainer}>
            <Grid item xs alignItems="center" justifyContent="center">
              <Typography className={style.otpExpire}>
                {seconds
                  ? `${t(
                      "AUTHENTICATION.THE_VERIFICATION_CODE_WILL_EXPIRE"
                    )} ${formatTime(seconds)}`
                  : t("AUTHENTICATION.THE_VERIFICATION_CODE_EXPIRED")}
              </Typography>
              <Button
                className={style.otpFormLink}
                onClick={resendOtp}
                data-testid="resend-button"
                tabIndex={7}
              >
                {t("AUTHENTICATION.RESEND_VERIFICATION_CODE")}
              </Button>
            </Grid>
          </Grid>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={style.otpBtn}
            tabIndex={8}
          >
            {t("AUTHENTICATION.VERIFY")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
