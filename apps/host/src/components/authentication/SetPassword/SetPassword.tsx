import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./SetPassword.module.scss";
import { SetPasswordDTO, SetPasswordPropsDTO } from "@/types/auth.type";
import { ERROR_MESSAGE } from "../../../constants/auth.constants";
import {
  AlertColor,
  IconButton,
  InputAdornment,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import CheckIcon from "@mui/icons-material/Check";
import ClearIcon from "@mui/icons-material/Clear";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import { MyTextFieldDisplayProps } from "../../../types/auth.type";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import {
  SO_DEFAULT_STORE_NUMBER,
  SNACKBAR_COLOR_TYPE,
  ISD_CODE,
} from "@/constants/common.constants";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { useTranslation } from "react-i18next";
import { signIn } from "next-auth/react";
import { useRouter } from "next/router";
import { resetPassword } from "@/service/common.service";
import { Cookies } from "@/utils/cookie.utils";
import { MODIFY_APPOINTMENT_COOKIE } from "@/constants/mobile-menu.constants";

export default function SetPassword(props: SetPasswordPropsDTO) {
  const [openLoader, setLoaderOpen] = React.useState(false);
  const [showNewPassword, setShowNewPassword] = React.useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = React.useState(false);
  const [passLengthMsg, setPassLengthMsg] = React.useState(false);
  const [passWhiteSpaceMsg, setPassWhiteSpaceMsg] = React.useState(false);
  const [passCasingMsg, setPassCasingMsg] = React.useState(false);
  const [passCharMsg, setPassCharMsg] = React.useState(false);
  const { showSnackBar } = useSnackBar();
  const { t } = useTranslation();
  const router = useRouter();
  const { view } = router.query;
  const { fetchRecaptchaToken } = useRecaptchaToken();

  const handleClickShowNewPassword = () => setShowNewPassword((show) => !show);
  const handleClickShowConfirmPassword = () =>
    setShowConfirmPassword((show) => !show);
  const [formValues, setFormValues] = React.useState<SetPasswordDTO>({
    newPassword: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.NEW_PASSWORD,
    },
    confirmPassword: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.CONFIRM_PASSWORD,
    },
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "newPassword" && value.length > 0) {
      if (value.length >= 8 && value.length <= 16) {
        setPassLengthMsg(true);
      } else {
        props.setIsPassValidated(false);
        setPassLengthMsg(false);
      }
      if (!/\s/.test(value)) {
        setPassWhiteSpaceMsg(true);
      } else {
        props.setIsPassValidated(false);
        setPassWhiteSpaceMsg(false);
      }
      if (/(?=.*[a-z])(?=.*[A-Z])/.test(value)) {
        setPassCasingMsg(true);
      } else {
        props.setIsPassValidated(false);
        setPassCasingMsg(false);
      }
      if (/[0-9!@#$%^&*()_+-={};:'",<>.?\[\]\|\\]/.test(value)) {
        setPassCharMsg(true);
      } else {
        props.setIsPassValidated(false);
        setPassCharMsg(false);
      }
      setFormValues({
        ...formValues,
        [name]: {
          ...formValues[name as keyof typeof formValues],
          value,
          error: false,
        },
      });
    } else {
      setFormValues({
        ...formValues,
        [name]: {
          ...formValues[name as keyof typeof formValues],
          value,
          error: false,
        },
      });
    }
  };

  const handleAutoLogin = async (phoneNumber: string, password: string) => {
    const storeNumber = JSON.parse(
      localStorage?.getItem("selectedStore") as string
    )?.StoreNumber
      ? JSON.parse(localStorage?.getItem("selectedStore") as string)
          ?.StoreNumber
      : SO_DEFAULT_STORE_NUMBER;
    const recaptchaToken = await fetchRecaptchaToken("login");
    await signIn("credentials", {
      redirect: false,
      isdCode: ISD_CODE,
      username: phoneNumber,
      password: password,
      storeNumber: storeNumber,
      recaptchaToken: recaptchaToken,
    })
      .then((resp) => {
        showSnackBar("Signed in", SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor);
        if (router.pathname === "/prescription-renewal/start") return;
      
        const comesFromModifyAppointmentFlow: string | undefined = 
          Cookies.get(MODIFY_APPOINTMENT_COOKIE); 
      
        if (comesFromModifyAppointmentFlow) {
          router.push("/my-account/my-appointments")
          return
        } 
      
        router.push("/");
      })
      .catch((err) => {
        showSnackBar(
          err ? err.message : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const setPassword = async () => {
    const recaptchaToken = await fetchRecaptchaToken("login");
    const storeNumber = localStorage?.getItem("selectedStore")
      ? JSON.parse(localStorage?.getItem("selectedStore") as string)
          ?.StoreNumber
      : SO_DEFAULT_STORE_NUMBER;
    resetPassword(
      formValues.newPassword.value,
      props.patientId,
      storeNumber,
      recaptchaToken
    )
      .then((res) => {
        const userData = res.data?.Result as {
          patientId: number;
          phoneNumber: string;
        };
        setLoaderOpen(false);
        props.setIsPassValidated(true);
        if (
          userData.phoneNumber &&
          formValues.newPassword.value &&
          view !== "forgot-password"
        ) {
          handleAutoLogin(userData.phoneNumber, formValues.newPassword.value);
        }
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
        props.setIsPassValidated(false);
      } else if (newFormValues.newPassword.value !== currentValue) {
        newFormValues.confirmPassword.errorMessage = t(
          `AUTHENTICATION.${ERROR_MESSAGE.CONFIRM_PASSWORD_MESSAGE}`
        );
        newFormValues.confirmPassword.error = true;
        props.setIsPassValidated(false);
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
      passLengthMsg &&
      passWhiteSpaceMsg &&
      passCasingMsg &&
      passCharMsg &&
      !newFormValues.newPassword.error &&
      !newFormValues.confirmPassword.error
    ) {
      setLoaderOpen(true);
      setPassword();
    }
  };

  return (
    <Box
      className={`${style.setPassContainer} `}
      data-testid="setPassword-comp"
    >
      <CssBaseline />
      <BackdropLoader openLoader={openLoader} />
      <Box className={style.setPassBox}>
        <Typography component="h1" variant="h5" className={style.setPassHead}>
          {props.formHead}
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
            fullWidth
            id="newPassword"
            label={t("AUTHENTICATION.NEW_PASSWORD")}
            name="newPassword"
            type={showNewPassword ? "text" : "password"}
            autoFocus
            className={style.textInput}
            value={formValues.newPassword.value}
            onChange={handleChange}
            error={formValues.newPassword.error}
            data-testid="new-password"
            FormHelperTextProps={
              { component: "div" } as MyTextFieldDisplayProps
            }
            helperText={
              (formValues.newPassword.error &&
                t(`AUTHENTICATION.${formValues.newPassword.errorMessage}`)) ||
              (formValues.newPassword.value.length > 0 && (
                <Box className={style.validBox}>
                  <List aria-label="validations">
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: "28px" }}>
                        {passLengthMsg ? (
                          <CheckIcon sx={{ color: "green" }} />
                        ) : (
                          <ClearIcon sx={{ color: "red" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        sx={
                          passLengthMsg ? { color: "green" } : { color: "red" }
                        }
                        primary={t("AUTHENTICATION.PASSWORD_LENGTH_MESSAGE")}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: "28px" }}>
                        {passWhiteSpaceMsg ? (
                          <CheckIcon sx={{ color: "green" }} />
                        ) : (
                          <ClearIcon sx={{ color: "red" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        sx={
                          passWhiteSpaceMsg
                            ? { color: "green" }
                            : { color: "red" }
                        }
                        primary={t(
                          "AUTHENTICATION.PASSWORD_WHITESPACE_MESSAGE"
                        )}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: "28px" }}>
                        {passCasingMsg ? (
                          <CheckIcon sx={{ color: "green" }} />
                        ) : (
                          <ClearIcon sx={{ color: "red" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        sx={
                          passCasingMsg ? { color: "green" } : { color: "red" }
                        }
                        primary={t("AUTHENTICATION.PASSWORD_CASING_MESSAGE")}
                      />
                    </ListItem>
                    <ListItem disablePadding>
                      <ListItemIcon sx={{ minWidth: "28px" }}>
                        {passCharMsg ? (
                          <CheckIcon sx={{ color: "green" }} />
                        ) : (
                          <ClearIcon sx={{ color: "red" }} />
                        )}
                      </ListItemIcon>
                      <ListItemText
                        sx={passCharMsg ? { color: "green" } : { color: "red" }}
                        primary={t("AUTHENTICATION.PASSWORD_CHARACTER_MESSAGE")}
                      />
                    </ListItem>
                  </List>
                </Box>
              ))
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle new password visibility"
                    onClick={handleClickShowNewPassword}
                    edge="end"
                    data-testid="toggle-icon"
                  >
                    {showNewPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="confirmPassword"
            label={t("AUTHENTICATION.CONFIRM_PASSWORD")}
            type={showConfirmPassword ? "text" : "password"}
            id="confirmPassword"
            className={style.textInput}
            value={formValues.confirmPassword.value}
            onChange={handleChange}
            error={formValues.confirmPassword.error}
            data-testid="confirm-password"
            helperText={
              formValues.confirmPassword.error &&
              t(`AUTHENTICATION.${formValues.confirmPassword.errorMessage}`)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle confirm password visibility"
                    onClick={handleClickShowConfirmPassword}
                    edge="end"
                    data-testid="toggleConfirm-click"
                  >
                    {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={style.setPassBtn}
          >
            {t("AUTHENTICATION.SUBMIT")}
          </Button>
        </Box>
      </Box>
    </Box>
  );
}
