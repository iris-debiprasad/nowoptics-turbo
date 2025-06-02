import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./RegistrationForm.module.scss";
import {
  AlertColor,
  FormControlLabel,
  FormHelperText,
  Radio,
  RadioGroup,
} from "@mui/material";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import dayjs from "dayjs";
import { RegistrationFormDTO, SignUpPropsDTO } from "@root/host/src/types/auth.type";
import { ERROR_MESSAGE } from "../../../constants/auth.constants";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import {
  ISD_CODE,
  SNACKBAR_COLOR_TYPE,
  isEmailValidRegex,
  isNameValidRegex,
  isZipcodeValidRegex,
  COMMON_DATE_FORMAT,
  INPUT_MASK,
} from "@root/host/src/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { nameFieldValidator } from "@root/host/src/utils/common.utils";
import { ValidateZipCode, createAccount } from "@/service/common.service";
import { useMaskInput } from "@/hooks/useMaskInput";
import { useTranslation } from "react-i18next";
import { ZipCodeMask } from "@/components/ZipCodeMask/ZipCodeMask";

export default function RegistrationForm(props: SignUpPropsDTO) {
  const { t } = useTranslation();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const [openLoader, setLoaderOpen] = React.useState(false);
  const { showSnackBar } = useSnackBar();
  const [maskedZipCode, setMaskedZipCode] = React.useState("");
  const [formValues, setFormValues] = React.useState<RegistrationFormDTO>({
    firstName: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.FIRST_NAME,
    },
    lastName: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.LAST_NAME,
    },
    mobileNumber: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.MOBILE_NUMBER,
    },
    countryCode: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.COUNTRY_CODE,
    },
    dob: {
      value: null,
      error: false,
      errorMessage: ERROR_MESSAGE.DOB,
    },
    email: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.EMAIL_ID,
    },
    zipCode: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.ZIP_CODE,
    },
    gender: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.GENDER,
    },
  });

  const handleZipCodeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target as HTMLInputElement;
    setMaskedZipCode(value);

    const unMaskedZip = value.replace(/-/g, "");
    setFormValues({
      ...formValues,
      zipCode: {
        value: unMaskedZip,
        error: false,
        errorMessage: ERROR_MESSAGE.ZIP_CODE,
      },
    });
  };
  const handleMobileNumberChange = (value: string) => {
    setFormValues({
      ...formValues,
      mobileNumber: {
        ...formValues.mobileNumber,
        value,
        error: false,
      },
    });
  };

  const { value: mobileNumber, ref: maskedMobileNumberRef } = useMaskInput(
    INPUT_MASK.MOBILE_NUMBER,
    formValues.mobileNumber.value,
    (unmaskedValue) => {
      handleMobileNumberChange(unmaskedValue);
    }
  );

  const dobMinDate = new Date(
    dayjs().year() - 100,
    dayjs().month(),
    dayjs().date()
  );

  const dobMaxDate = new Date(
    dayjs().year() - 4,
    dayjs().month(),
    dayjs().date()
  );

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

  const validateZipCodeLazy = (zipCode: string) => {
    ValidateZipCode(zipCode)
      .then((resp) => {})
      .catch((error) => {
        const message =
          error && error.message
            ? error.response?.data?.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        setFormValues({
          ...formValues,
          zipCode: {
            value: formValues.zipCode.value,
            error: true,
            errorMessage: message || ERROR_MESSAGE.ZIP_CODE,
          },
        });
      });
  };

  React.useEffect(() => {
    let timer: number | null = null;
    if (isZipcodeValidRegex.test(formValues.zipCode.value)) {
      setTimeout(() => {
        validateZipCodeLazy(formValues.zipCode.value);
      }, 500);
    }

    return () => {
      if (timer) clearTimeout(timer);
    };
  }, [formValues.zipCode.value]);

  const submitData = async () => {
    // Adding default store number to create patient account for stanton optical
    const gRecaptchaToken = await fetchRecaptchaToken("create_account");
    const payload = {
      firstName: nameFieldValidator(formValues.firstName.value),
      lastName: nameFieldValidator(formValues.lastName.value),
      isdCode: ISD_CODE,
      mobileNumber: formValues.mobileNumber.value,
      gender: formValues.gender.value,
      dateOfBirth: formValues.dob.value?.format(COMMON_DATE_FORMAT) as string,
      email: formValues.email.value,
      zipCode: formValues.zipCode.value,
    };
    createAccount(payload, gRecaptchaToken)
      .then((res) => {
        setLoaderOpen(false);
        props.setPatientId(res.data.Result.patientId);
        props.setMobileNumber(formValues.mobileNumber.value);
        props.setIsValidated(true);
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

  const handleSubmit = async (e?: React.FormEvent<HTMLFormElement>) => {
    e?.preventDefault();
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
      } else if (currentField === "email" && currentValue !== "") {
        if (!isEmailValidRegex.test(currentValue as string)) {
          newFormValues.email.errorMessage = t(
            `AUTHENTICATION.${ERROR_MESSAGE.INVALID_EMAIL}`
          );
          newFormValues.email.error = true;
        }
      } else if (currentField === "zipCode" && currentValue !== "") {
        if (!isZipcodeValidRegex.test(currentValue as string)) {
          newFormValues.zipCode.errorMessage = t(
            `AUTHENTICATION.${ERROR_MESSAGE.INVALID_ZIPCODE}`
          );
          newFormValues.zipCode.error = true;
        }
      } else if (currentField === "firstName" && currentValue !== "") {
        if ((currentValue as string).trim().length === 0) {
          newFormValues.firstName.errorMessage = t(
            `AUTHENTICATION.${ERROR_MESSAGE.INVALID_FIRSTNAME}`
          );
          newFormValues.firstName.error = true;
        }
        if (
          !isNameValidRegex.test(nameFieldValidator(currentValue as string))
        ) {
          newFormValues.firstName.errorMessage = t(
            `AUTHENTICATION.${ERROR_MESSAGE.INVALID_FIRSTNAME}`
          );
          newFormValues.firstName.error = true;
        }
      } else if (currentField === "lastName" && currentValue !== "") {
        if ((currentValue as string).trim().length === 0) {
          newFormValues.lastName.errorMessage = t(
            `AUTHENTICATION.${ERROR_MESSAGE.INVALID_LASTNAME}`
          );
          newFormValues.lastName.error = true;
        }
        if (
          !isNameValidRegex.test(nameFieldValidator(currentValue as string))
        ) {
          newFormValues.lastName.errorMessage = t(
            `AUTHENTICATION.${ERROR_MESSAGE.INVALID_LASTNAME}`
          );
          newFormValues.lastName.error = true;
        }
      } else if (currentField === "dob" && currentValue !== "") {
        if (
          !dayjs(currentValue).isValid() ||
          currentValue > dayjs(dobMaxDate) ||
          currentValue < dayjs(dobMinDate)
        ) {
          newFormValues.dob.errorMessage = t(
            `AUTHENTICATION.${ERROR_MESSAGE.INVALID_DOB}`
          );
          newFormValues.dob.error = true;
        }
      } else if (
        currentField === "mobileNumber" &&
        typeof currentValue === "string" &&
        currentValue.length < 10
      ) {
        newFormValues.mobileNumber.errorMessage = t(
          `AUTHENTICATION.${ERROR_MESSAGE.MOBILE_NUMBER_LENGTH_MESSAGE}`
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

    if (
      !newFormValues.firstName.error &&
      !newFormValues.lastName.error &&
      !newFormValues.email.error &&
      !newFormValues.mobileNumber.error &&
      !newFormValues.zipCode.error &&
      !newFormValues.dob.error &&
      !newFormValues.gender.error
    ) {
      setLoaderOpen(true);
      submitData();
    }
  };
  return (
    <Box className={style.registrationContainer}>
      <CssBaseline />
      <BackdropLoader openLoader={openLoader} />
      <Box className={style.regnBox}>
        <Typography
          component="h1"
          variant="h5"
          className={style.regnHead}
          role="heading"
          aria-label="Create Account Section"
          tabIndex={0}
        >
          {t("AUTHENTICATION.CREATE_ACCOUNT")}
        </Typography>
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
            id="firstName"
            label={t("AUTHENTICATION.FIRST_NAME")}
            name="firstName"
            autoFocus={!props?.focusLogin}
            fullWidth
            inputProps={{
              maxLength: 100,
            }}
            className={style.textInput}
            value={formValues.firstName.value}
            onChange={handleChange}
            data-testid="first-name"
            error={formValues.firstName.error}
            helperText={
              formValues.firstName.error &&
              t(`AUTHENTICATION.${formValues.firstName.errorMessage}`)
            }
          />
          <TextField
            margin="normal"
            required
            name="lastName"
            label={t("AUTHENTICATION.LAST_NAME")}
            id="lastName"
            fullWidth
            inputProps={{
              maxLength: 100,
            }}
            className={style.textInput}
            value={formValues.lastName.value}
            onChange={handleChange}
            data-testid="last-name"
            error={formValues.lastName.error}
            helperText={
              formValues.lastName.error &&
              t(`AUTHENTICATION.${formValues.lastName.errorMessage}`)
            }
          />
          {/* TODO -- ISD code input box may be added in future */}
          {/* <Box className={style.mobileInput}>
            <TextField
              margin="normal"
              required
              id="countryCode"
              label="Code"
              name="countryCode"
              value={formValues.countryCode.value}
              onChange={handleChange}
              data-testid="country-code"
              autoFocus
              className={`${style.textInput} ${style.countryCode}`}
              error={formValues.countryCode.error}
            /> */}
          <TextField
            margin="normal"
            required
            type="text"
            id="mobileNumber"
            label={t("AUTHENTICATION.MOBILE_NUMBER")}
            name="mobileNumber"
            inputProps={{
              maxLength: 14,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            className={`${style.textInput} ${style.mobileNumber}`}
            value={mobileNumber}
            inputRef={maskedMobileNumberRef}
            data-testid="mobile-number"
            error={formValues.mobileNumber.error}
            helperText={
              formValues.mobileNumber.error &&
              t(`AUTHENTICATION.${formValues.mobileNumber.errorMessage}`)
            }
          />
          {/* TODO -- ISD code input box may be added in future */}
          {/* </Box> */}
          <Box>
            <RadioGroup
              row
              aria-labelledby="demo-radio-buttons-group-label"
              defaultValue="female"
              name="gender"
              data-testid="gender"
              className={style.genderInput}
              onChange={handleChange}
              value={formValues.gender.value}
            >
              <FormControlLabel
                value="m"
                control={<Radio />}
                label={t("AUTHENTICATION.MALE")}
              />
              <FormControlLabel
                value="f"
                control={<Radio />}
                label={t("AUTHENTICATION.FEMALE")}
              />
            </RadioGroup>
            <FormHelperText className={style.genderErrorText}>
              {formValues.gender.error &&
                t(`AUTHENTICATION.${formValues.gender.errorMessage}`)}
            </FormHelperText>
          </Box>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label={t("AUTHENTICATION.DOB")}
              readOnly={false}
              className={`${style.textInput} ${style.dobPicker}`}
              value={formValues.dob.value}
              minDate={dayjs(dobMinDate)}
              maxDate={dayjs(dobMaxDate)}
              onChange={(newValue) =>
                setFormValues({
                  ...formValues,
                  dob: {
                    value: newValue,
                    error: false,
                    errorMessage: t(
                      `AUTHENTICATION.${formValues.dob.errorMessage}`
                    ),
                  },
                })
              }
              slotProps={{
                textField: {
                  inputProps: {
                    "data-testid": "add-new-check-check-date-input",
                    "aria-label": "Date of birth required",
                  },
                  error: formValues.dob.error,
                  helperText:
                    formValues.dob.error &&
                    t(`AUTHENTICATION.${formValues.dob.errorMessage}`),
                },
              }}
            />
          </LocalizationProvider>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            label={t("AUTHENTICATION.EMAIL")}
            name="email"
            className={style.textInput}
            value={formValues.email.value}
            onChange={handleChange}
            data-testid="email"
            error={formValues.email.error}
            helperText={
              formValues.email.error &&
              t(`AUTHENTICATION.${formValues.email.errorMessage}`)
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            id="zipCode"
            label={t("AUTHENTICATION.ZIPCODE")}
            name="zipCode"
            className={style.textInput}
            value={maskedZipCode}
            onChange={handleZipCodeChange}
            data-testid="zipcode"
            error={formValues.zipCode.error}
            helperText={
              formValues.zipCode.error && formValues.zipCode.errorMessage
            }
            InputProps={{
              inputComponent: ZipCodeMask as any,
            }}
          />
          <Box></Box>
          {!props.noRedirect && (
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={style.createAccBtn}
              data-testid="create-account"
            >
              {t("AUTHENTICATION.CREATE_ACCOUNT")}
            </Button>
          )}
        </Box>
        {props.noRedirect && (
          <Box className={style.rxRenewalCreate}>
            <Button
              type="submit"
              fullWidth
              variant="contained"
              className={style.createButton}
              data-testid="create-account"
              onClick={() => handleSubmit()}
            >
              {t("AUTHENTICATION.CREATE_ACCOUNT")}
            </Button>
          </Box>
        )}
        {props.noRedirect && <hr />}
        <Box className={style.belowContainer}>
          {props.noRedirect && (
            <>
              <Box className={style.alreadyAccountText}>
                {t(`AUTHENTICATION.ALREADY_HAVE_AN_ACCOUNT`)}
              </Box>
              <Box
                className={style.loginFormLink}
                onClick={props.hideRegistrationFormFun}
              >
                {t("nav.Sign In")}
              </Box>
            </>
          )}
        </Box>
      </Box>
    </Box>
  );
}
