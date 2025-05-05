import * as React from "react";

import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./ForgotPassword.module.scss";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { ForgotPasswordDTO, ForgotPasswordPropsDTO } from "@/types/auth.type";
import { ERROR_MESSAGE } from "../../../constants/auth.constants";
import axios from "axios";
import { IrisUrlConstants } from "@/constants/iris.url.constants";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import { AlertColor } from "@mui/material";
import {
  INPUT_MASK,
  ISD_CODE,
  SNACKBAR_COLOR_TYPE,
} from "@/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { HeaderConfig } from "@/config/headerConfig";
import { useTranslation } from "react-i18next";
import { useMaskInput } from "@/hooks/useMaskInput";
import { generateOtpForgotPassword } from "@/service/common.service";

export default function ForgotPassword(props: ForgotPasswordPropsDTO) {
  const { t } = useTranslation();
  const [openLoader, setLoaderOpen] = React.useState(false);
  const { showSnackBar } = useSnackBar();
  const [formValues, setFormValues] = React.useState<ForgotPasswordDTO>({
    mobileNumber: {
      value: "",
      error: false,
      errorMessage: t("AUTHENTICATION.MOBILE_NUMBER_ERROR"),
    },
  });
  const { fetchRecaptchaToken } = useRecaptchaToken();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
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

  const { value: makskedMobileNumber, ref: maskedMobileNumberRef } =
    useMaskInput(
      INPUT_MASK.MOBILE_NUMBER,
      formValues.mobileNumber.value,
      (unmaskedValue) => {
        setFormValues({
          ...formValues,
          mobileNumber: {
            ...formValues.mobileNumber,
            value: unmaskedValue,
            error: false,
          },
        });
      }
    );

  const generateOtp = (recaptchaToken?: string | null) => {
    const payload = {
      isdCode: ISD_CODE,
      phoneNumber: formValues.mobileNumber.value,
    };
    generateOtpForgotPassword(payload, recaptchaToken)
      .then((res) => {
        setLoaderOpen(false);
        props.setPatientId(res.data.Result.patientId);
        props.setMobileNumber(formValues.mobileNumber.value);
        props.setIsFPValidated(true);
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

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
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
      } else if (currentValue.length < 10) {
        newFormValues.mobileNumber.errorMessage = t(
          "AUTHENTICATION.MOBILE_NUMBER_LENGTH_MESSAGE"
        );
        newFormValues.mobileNumber.error = true;
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
    if (!newFormValues.mobileNumber.error) {
      const gReCaptchaToken = await fetchRecaptchaToken("forgot_password");
      setLoaderOpen(true);
      generateOtp(gReCaptchaToken);
    }
  };

  return (
    <Box className={`${style.forgotContainer}`}>
      <CssBaseline />
      <BackdropLoader openLoader={openLoader} />
      <Box className={style.forgotBox}>
        <Typography component="h1" variant="h5" className={style.forgotHead}>
          {t("AUTHENTICATION.FORGOT_PASSWORD")}?
        </Typography>
        <Grid container className={style.forgotBottomContainer}>
          <Grid item xs alignItems="center" justifyContent="center">
            <Typography className={style.forgotFormLink}>
              {t("AUTHENTICATION.ENTER_YOUR_MOBILE_NUMBER")}.
            </Typography>
          </Grid>
        </Grid>
        <Box
          component="form"
          onSubmit={handleSubmit}
          data-testid="form"
          noValidate
          className={style.formFields}
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="mobileNumber"
            label={t("AUTHENTICATION.ENTER_MOBILE_NUMBER")}
            name="mobileNumber"
            type="text"
            autoFocus
            className={style.textInput}
            value={makskedMobileNumber}
            inputRef={maskedMobileNumberRef}
            data-testid="mobile-number"
            aria-label="mobile"
            inputProps={{
              "data-testid": "content-input",
              maxLength: 14,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            error={formValues.mobileNumber.error}
            helperText={
              formValues.mobileNumber.error &&
              formValues.mobileNumber.errorMessage
            }
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={style.forgotBtn}
          >
            {t("AUTHENTICATION.SUBMIT")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
