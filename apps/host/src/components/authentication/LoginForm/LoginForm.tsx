import * as React from "react";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "next/link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import style from "./LoginForm.module.scss";
import { LoginFormDTO, SignInPropsDTO } from "@/types/auth.type";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { ERROR_MESSAGE } from "../../../constants/auth.constants";
import { getSession, signIn } from "next-auth/react";
import { useRouter } from "next/router";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import { AlertColor, IconButton, InputAdornment } from "@mui/material";
import {
  SNACKBAR_COLOR_TYPE,
  AppEvents,
  INPUT_MASK,
} from "@/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { usePathname } from "next/navigation";
import { getGuestToLocalStorage } from "@/utils/common.utils";
import { getDetails } from "@/utils/getSessionData";
import { signin } from "@/service/common.service";
import { useDispatch } from "react-redux";
import AddGTMEvent from "@/utils/gtmEvent";
import { GA_TAG_EVENTS } from "@/constants/google-analytics.constants";
import { useTranslation } from "react-i18next";
import { useMaskInput } from "@/hooks/useMaskInput";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";
import { Cookies } from "@/utils/cookie.utils";
import { MODIFY_APPOINTMENT_COOKIE } from "@/constants/mobile-menu.constants";

export default function LoginForm(props: SignInPropsDTO) {
  const env = React.useContext(RuntimeVarContext);
  const { t } = useTranslation();
  const [openLoader, setLoaderOpen] = React.useState(false);
  const [showPassword, setShowPassword] = React.useState(false);
  const { shouldRedirectToCheckout = false } = props;
  const router = useRouter();
  const pathname = usePathname();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const dispatch = useDispatch();

  const { page, storeId, custph } = router.query as {
    page: string;
    storeId: string;
    custph: string;
  };
  const { showSnackBar } = useSnackBar();
  const handleClickShowPassword = () => setShowPassword((show) => !show);
  const [formValues, setFormValues] = React.useState<LoginFormDTO>({
    mobileNumber: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.MOBILE_NUMBER,
    },
    passWord: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.PASSWORD,
    },
  });
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
      },
    );

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
      } else if (currentField === "mobileNumber" && currentValue.length < 10) {
        newFormValues.mobileNumber.errorMessage =
          ERROR_MESSAGE.MOBILE_NUMBER_LENGTH_MESSAGE;
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
    if (!newFormValues.mobileNumber.error && !newFormValues.passWord.error) {
      setLoaderOpen(true);
      const captchaToken = await fetchRecaptchaToken("login");
      signin(formValues, captchaToken)
        .then(async (res) => {
          setLoaderOpen(false);
          if (res?.ok) {
            localStorage.setItem("isComingFromLoginForm", "true");
            AddGTMEvent({
              event: GA_TAG_EVENTS.HEADER_SIGN_IN,
            });
            props?.setSnackBar
              ? props?.setSnackBar(
                "Signed in",
                SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor,
              )
              : showSnackBar(
                "Signed in",
                SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor,
              );
            props.handleClose && props.handleClose();
            try {
              const session = await getSession();
              if (session) {
                localStorage.setItem("session", JSON.stringify(session));
                window.dispatchEvent(new Event(AppEvents.LOGIN_SUCCESS));
                if (getGuestToLocalStorage()) {
                  window.dispatchEvent(new Event(AppEvents.MERGE_GUEST_CART));
                }
              }
            } catch (err) {
              window.dispatchEvent(new Event(AppEvents.LOGOUT));
            }
            if (page === "support") {
              router.push(`/${page}?storeId=${storeId}&custph=${custph}`);
            } else if (page === "my-account-order") {
              router.push(`/my-account/order-history`);
            } else if (page === "my-account-prescription") {
              router.push(`/my-account/my-prescriptions`);
            }
            localStorage.removeItem("auth_status");
            
            const comesFromModifyAppointmentFlow: string | undefined = 
              Cookies.get(MODIFY_APPOINTMENT_COOKIE); 
            
            if (comesFromModifyAppointmentFlow) 
              router.push("/my-account/my-appointments")
          } else {
            throw new Error(
              res?.error ? res?.error : ERROR_MESSAGE.SIGNIN_ERROR,
            );
          }
        })
        .catch((err) => {
          props?.setSnackBar
            ? props?.setSnackBar(
              err ? err.message : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
            )
            : showSnackBar(
              err ? err.message : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
            );
        });
    }
  };

  const translate = props?.t || t;

  return (
    <Box
      className={`${style.loginContainer} ${props.cstmStyles === "dropDown" && style.dropDownFormStyle
        } ${props.cstmStyles === "sideBar" && style.sideBarFormStyle}`}
    >
      <CssBaseline />
      <BackdropLoader openLoader={openLoader} />
      <Box className={style.loginBox}>
        <Typography
          component="span"
          className={style.loginHead}
          role="heading"
          aria-label={`${props.formHead} Section`}
          tabIndex={0}
        >
          {props.formHead}
        </Typography>
        {props.formMessage && (
          <Box className={style.loginMessageContainer}>
            <Typography className={style.loginMessage}>
              {props.formMessage}
            </Typography>
          </Box>
        )}
        <Box
          component="form"
          onSubmit={handleSubmit}
          noValidate
          className={style.formFields}
          data-testid="form"
        >
          <TextField
            margin="normal"
            required
            fullWidth
            id="login_mobileNumber"
            label={translate("nav.Mobile Number")}
            name="mobileNumber"
            type="text"
            autoFocus={pathname === "/my-account/" ? props?.focusLogin : true}
            className={style.textInput}
            value={makskedMobileNumber}
            inputProps={{
              maxLength: 14,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            inputRef={maskedMobileNumberRef}
            data-testid="mobile-number-login"
            error={formValues.mobileNumber.error}
            helperText={
              formValues.mobileNumber.error &&
              translate(`nav.${formValues.mobileNumber.errorMessage}`)
            }
          />
          <TextField
            margin="normal"
            required
            fullWidth
            name="passWord"
            label={translate("nav.Password")}
            type={showPassword ? "text" : "password"}
            id="passWord"
            className={style.textInput}
            value={formValues.passWord.value}
            onChange={handleChange}
            data-testid="password"
            error={formValues.passWord.error}
            helperText={
              formValues.passWord.error &&
              translate(`nav.${formValues.passWord.errorMessage}`)
            }
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                    data-testid="toggle-click"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={style.logInBtn}
          >
            {translate("nav.Sign In")}
          </Button>
          <Grid container spacing={1} className={style.loginBottomContainer}>
            <Grid item alignItems="center" justifyContent="center" xs={12}>
              <Link
                href="/my-account/?view=forgot-password"
                className={style.loginFormLink}
                onClick={props.handleClose}
              >
                {translate("nav.Forgot your password?")}
              </Link>
            </Grid>
            {props.cstmRender !== "guestCheckout" && !props.noRedirect && (
              <Grid item alignItems="center" justifyContent="center" xs={12}>
                {props.noRedirect ? (
                  <Box
                    className={style.loginFormLink}
                    onClick={props.showRegistrationFormFun}
                  >
                    {translate("nav.Create a new account")}
                  </Box>
                ) : (
                  <Link
                    href="/my-account"
                    className={style.loginFormLink}
                    onClick={props.handleClose}
                  >
                    {translate("nav.Create a new account")}
                  </Link>
                )}
              </Grid>
            )}
            {props.cstmRender !== "guestCheckout" &&
              typeof window !== "undefined" &&
              window.location.hostname.includes(
                env?.NEXT_PUBLIC_EMPLOYEE_LOGIN_DOMAIN_NAME as string,
              ) && (
                <Grid item alignItems="center" justifyContent="center" xs={12}>
                  <Box
                    component={"span"}
                    tabIndex={0}
                    className={style.loginFormLink}
                    onClick={() => {
                      signIn("azure-ad").then(async () => {
                        localStorage.removeItem("selectedStore");
                        localStorage.removeItem("storeHour");
                        localStorage.setItem("isEmployee", "1");
                        localStorage.removeItem("guestCartId");
                        localStorage.removeItem("auth_status");
                      });
                    }}
                    sx={{ ml: 1 }}
                  >
                    {translate("nav.Employee sign in")}
                  </Box>
                </Grid>
              )}
          </Grid>
          {props.noRedirect && <hr />}
          <Box className={style.belowContainer}>
            {props.noRedirect && (
              <>
                <Box className={style.newToText}>
                  {translate(`AUTHENTICATION.NEW_TO_STANTON_OPTICAL`)}
                </Box>
                <Box
                  className={style.createAccountLink}
                  onClick={props.showRegistrationFormFun}
                >
                  {translate("AUTHENTICATION.CREATE_ACCOUNT")}
                </Box>
              </>
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
