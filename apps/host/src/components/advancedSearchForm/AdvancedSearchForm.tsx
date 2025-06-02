import {
  AlertColor,
  Box,
  Button,
  Divider,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import style from "./AdvancedSearchForm.module.scss";
import {
  AdvancedSearchFormDTO,
  AdvancedSearchFormPayloadType,
  AdvancedSearchFormProps,
} from "@root/host/src/types/AdvancedSearchForm.types";
import dayjs from "dayjs";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  DUPLICATE_PATIENT_NOT_FOUND,
  INPUT_MASK,
  ISD_CODE,
  MERGE_ERROR_MESSAGE,
  NO_PATIENT_FOUND,
  SNACKBAR_COLOR_TYPE,
  isEmailValidRegex,
  isNameValidRegex,
} from "@root/host/src/constants/common.constants";
import { useEffect, useState } from "react";
import { GetAdvancedSearchData } from "@root/host/src/service/search.service";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { nameFieldValidator } from "@root/host/src/utils/common.utils";
import { useDispatch, useSelector } from "react-redux";
import { FETCH_SEARCH_ADVANCED_DATA } from "@root/host/src/store/reducer/searchAdvancedReducer";
import { GetAdvancedSearchFormState } from "./advancedSearchForm.selector";
import { useAppSelector } from "@root/host/src/store/useStore";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";
import { Permission } from "@root/host/src/constants/host-permission.constant";
import { useMaskInput } from "@root/host/src/hooks/useMaskInput";
import useAxiosLoader from "@root/host/src/hooks/useAxiosLoader";
import BackdropLoader from "../backdrop_loader/BackdropLoader";

const INITIAL_VALUE: AdvancedSearchFormDTO = {
  patientId: {
    value: "",
    error: false,
  },
  firstName: {
    value: "",
    error: false,
    errorMessage: ERROR_MESSAGE.INVALID_FIRSTNAME,
  },
  lastName: {
    value: "",
    error: false,
    errorMessage: ERROR_MESSAGE.INVALID_LASTNAME,
  },
  mobileNumber: {
    value: "",
    error: false,
    errorMessage: ERROR_MESSAGE.MOBILE_NUMBER_LENGTH_MESSAGE,
  },
  countryCode: {
    value: ISD_CODE,
    error: false,
  },
  dob: {
    value: null,
    error: false,
    errorMessage: ERROR_MESSAGE.DOB,
  },
  email: {
    value: "",
    error: false,
    errorMessage: ERROR_MESSAGE.INVALID_EMAIL,
  },
};

const AdvancedSearchForm = (props: AdvancedSearchFormProps) => {
  const {
    countryCodeOptions,
    setAllSearchOptions,
    setIsSearchAdvancedSection,
    setAnchorEl,
    setIsSelectPatientForMergeModal,
    setPatientIdsForMerge,
    setOpen,
    isAdvancedSearchFromDiffModule,
    setSnackBar,
  } = props;
  const dispatch = useDispatch();
  const { showSnackBar } = useSnackBar();
  const data = useSelector((state: any) =>
    GetAdvancedSearchFormState({ ...state })
  );
  const [mergeErrMsg, setMergeErrMsg] = useState("");
  const [btnDisabled, setBtnDisabled] = useState(false);

  const [canMergePatient] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [Permission.PATIENT_MERGE],
    })
  ) as boolean[];
  const apiLoading = useAxiosLoader();

  const INITIAL_STATE_VALUE: AdvancedSearchFormDTO = {
    patientId: {
      value: data?.id ? data?.id : "",
      error: false,
    },
    firstName: {
      value: data?.firstName ? data?.firstName : "",
      error: false,
      errorMessage: ERROR_MESSAGE.INVALID_FIRSTNAME,
    },
    lastName: {
      value: data?.lastName ? data?.lastName : "",
      error: false,
      errorMessage: ERROR_MESSAGE.INVALID_LASTNAME,
    },
    mobileNumber: {
      value: data?.phone ? data?.phone : "",
      error: false,
      errorMessage: ERROR_MESSAGE.MOBILE_NUMBER_LENGTH_MESSAGE,
    },
    countryCode: {
      value: data?.countryCode ? data?.countryCode : ISD_CODE,
      error: false,
    },
    dob: {
      value: data?.dob ? dayjs(data?.dob) : null,
      error: false,
      errorMessage: ERROR_MESSAGE.DOB,
    },
    email: {
      value: data?.email ? data?.email : "",
      error: false,
      errorMessage: ERROR_MESSAGE.INVALID_EMAIL,
    },
  };

  const [formValues, setFormValues] =
    useState<AdvancedSearchFormDTO>(INITIAL_STATE_VALUE);

  useEffect(() => {
    if (
      !formValues.patientId.value &&
      !formValues.firstName.value &&
      !formValues.lastName.value &&
      !formValues.email.value &&
      !formValues.mobileNumber.value &&
      !formValues.dob.value
    ) {
      setBtnDisabled(true);
    } else {
      setBtnDisabled(false);
    }
  }, [formValues]);

  const dobMinDate = new Date(
    dayjs().year() - 100,
    dayjs().month(),
    dayjs().date()
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setMergeErrMsg("");
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

  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    setMergeErrMsg("");
    const { name, value } = e.target;
    setFormValues({
      ...formValues,
      [name]: {
        ...formValues[name as keyof typeof formValues],
        value,
        error: false,
      },
    });
  };

  const getAdvancedSearchPatientData = (isMergePatient: boolean) => {
    const payload: AdvancedSearchFormPayloadType = {
      Id: formValues.patientId.value ? formValues.patientId.value : null,
      FirstName: formValues.firstName.value
        ? nameFieldValidator(formValues.firstName.value)
        : null,
      LastName: formValues.lastName.value
        ? nameFieldValidator(formValues.lastName.value)
        : null,
      Email: formValues.email.value ? formValues.email.value : null,
      PhoneNumber: {
        isdcode: formValues.countryCode.value,
        phonenumber: formValues.mobileNumber.value
          ? formValues.mobileNumber.value
          : null,
      },
      Dob: formValues.dob.value
        ? (formValues.dob.value?.format("YYYY-MM-DD") as string)
        : null,
    };

    GetAdvancedSearchData(payload)
      .then((res) => {
        if (isMergePatient) {
          if (res.data?.Result.length === 0) {
            if (isAdvancedSearchFromDiffModule) {
              setSnackBar &&
                setSnackBar(
                  NO_PATIENT_FOUND,
                  SNACKBAR_COLOR_TYPE.ERROR as AlertColor
                );
            } else {
              showSnackBar(
                NO_PATIENT_FOUND,
                SNACKBAR_COLOR_TYPE.ERROR as AlertColor
              );
            }
          } else if (res.data?.Result.length === 1) {
            if (isAdvancedSearchFromDiffModule) {
              setSnackBar &&
                setSnackBar(
                  DUPLICATE_PATIENT_NOT_FOUND,
                  SNACKBAR_COLOR_TYPE.ERROR as AlertColor
                );
            } else {
              showSnackBar(
                DUPLICATE_PATIENT_NOT_FOUND,
                SNACKBAR_COLOR_TYPE.ERROR as AlertColor
              );
            }
          } else {
            const patientIds = res.data?.Result.map(
              (patient: any) => patient.Id
            );
            setPatientIdsForMerge(patientIds);
            setIsSelectPatientForMergeModal(true);
            setOpen(false);
          }
        } else {
          setAllSearchOptions(res.data?.Result);
          setIsSearchAdvancedSection && setIsSearchAdvancedSection(false);
          setOpen(true);
          setAnchorEl && setAnchorEl(null);
        }
      })
      .catch((err) => {
        if (isAdvancedSearchFromDiffModule) {
          setSnackBar &&
            setSnackBar(
              err.response
                ? err.response.data.Error.Message
                : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              SNACKBAR_COLOR_TYPE.ERROR as AlertColor
            );
        } else {
          showSnackBar(
            err.response
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        }
      });
  };

  const handleSubmit = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    isMergePatient: boolean
  ) => {
    e.preventDefault();
    const formFields = Object.keys(formValues);
    let newFormValues = { ...formValues };
    for (let index = 0; index < formFields.length; index++) {
      const currentField = formFields[index];
      const currentValue =
        formValues[currentField as keyof typeof formValues].value;
      if (currentField === "email" && currentValue !== "") {
        if (!isEmailValidRegex.test(currentValue as string)) {
          newFormValues.email.errorMessage = ERROR_MESSAGE.INVALID_EMAIL;
          newFormValues.email.error = true;
        }
      } else if (currentField === "firstName" && currentValue !== "") {
        if ((currentValue as string).trim().length === 0) {
          newFormValues.firstName.errorMessage =
            ERROR_MESSAGE.INVALID_FIRSTNAME;
          newFormValues.firstName.error = true;
        }
        if (!isNameValidRegex.test(currentValue as string)) {
          newFormValues.firstName.errorMessage =
            ERROR_MESSAGE.INVALID_FIRSTNAME;
          newFormValues.firstName.error = true;
        }
      } else if (currentField === "lastName" && currentValue !== "") {
        if ((currentValue as string).trim().length === 0) {
          newFormValues.lastName.errorMessage = ERROR_MESSAGE.INVALID_LASTNAME;
          newFormValues.lastName.error = true;
        }
        if (!isNameValidRegex.test(currentValue as string)) {
          newFormValues.lastName.errorMessage = ERROR_MESSAGE.INVALID_LASTNAME;
          newFormValues.lastName.error = true;
        }
      } else if (
        currentField === "dob" &&
        currentValue !== "" &&
        currentValue !== null
      ) {
        if (
          !dayjs(currentValue).isValid() ||
          (currentValue && currentValue > dayjs()) ||
          (currentValue && currentValue < dayjs(dobMinDate))
        ) {
          newFormValues.dob.errorMessage = ERROR_MESSAGE.INVALID_DOB;
          newFormValues.dob.error = true;
        }
      } else if (
        currentField === "mobileNumber" &&
        typeof currentValue === "string" &&
        currentValue.length > 0 &&
        currentValue.length < 10
      ) {
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

    if (
      !newFormValues.firstName.error &&
      !newFormValues.lastName.error &&
      !newFormValues.email.error &&
      !newFormValues.mobileNumber.error &&
      !newFormValues.dob.error
    ) {
      if (
        newFormValues.patientId.value ||
        newFormValues.firstName.value ||
        newFormValues.lastName.value ||
        newFormValues.email.value ||
        newFormValues.mobileNumber.value ||
        newFormValues.dob.value
      ) {
        dispatch(
          FETCH_SEARCH_ADVANCED_DATA({
            Id: newFormValues.patientId.value,
            UserFirstName: newFormValues.firstName.value,
            UserLastName: newFormValues.lastName.value,
            Email: newFormValues.email.value,
            PhoneNumber: newFormValues.mobileNumber.value,
            CountryCode: newFormValues.countryCode.value,
            Dob: newFormValues.dob.value,
          })
        );
        getAdvancedSearchPatientData(isMergePatient);
      }
    }
  };

  const handleReset = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    setFormValues(INITIAL_VALUE);
    setPhoneNumber('')
    dispatch(
      FETCH_SEARCH_ADVANCED_DATA({
        Id: "",
        UserFirstName: "",
        UserLastName: "",
        Email: "",
        PhoneNumber: "",
        CountryCode: ISD_CODE,
        Dob: null,
      })
    );
  };

  const handleMerge = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
    e.preventDefault();
    const fieldsWithData = [
      formValues.firstName.value,
      formValues.lastName.value,
      formValues.dob.value,
      formValues.mobileNumber.value,
    ].filter(Boolean);
    const isSearchable = fieldsWithData.length >= 3;
    if (!isSearchable) {
      setMergeErrMsg(MERGE_ERROR_MESSAGE);
      return;
    }
    handleSubmit(e, true);
  };

  const { value: maskedMobileNumber, ref: maskedMobileNumberRef, setValue: setPhoneNumber } =
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

  return (
    <Box className={style.advancedSearchContainer}>
      <BackdropLoader openLoader={apiLoading} />
      <Grid
        container
        spacing={2}
        component="form"
        data-testid="form"
        noValidate
        className={style.formFields}
      >
        <Grid item xs={6}>
          <TextField
            margin="normal"
            id="firstName"
            label="First Name"
            name="firstName"
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
              formValues.firstName.error && formValues.firstName.errorMessage
            }
            FormHelperTextProps={{
              className: style.helperText,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            name="lastName"
            label="Last Name"
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
              formValues.lastName.error && formValues.lastName.errorMessage
            }
            FormHelperTextProps={{
              className: style.helperText,
            }}
          />
        </Grid>
        <Grid item xs={6}>
          <TextField
            margin="normal"
            fullWidth
            type="number"
            id="patientId"
            label="Patient ID"
            name="patientId"
            className={style.textInput}
            value={formValues.patientId.value}
            onChange={handleChange}
            data-testid="patientId"
          />
        </Grid>
        <Grid item xs={6}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              label="Date of birth"
              readOnly={false}
              className={`${style.textInput} ${style.dobPicker}`}
              value={formValues.dob.value}
              minDate={dayjs(dobMinDate)}
              maxDate={dayjs()}
              onChange={(newValue) => {
                setMergeErrMsg("");
                setFormValues({
                  ...formValues,
                  dob: {
                    value: newValue,
                    error: false,
                    errorMessage: formValues.dob.errorMessage,
                  },
                });
              }}
              slotProps={{
                textField: {
                  inputProps: {
                    "data-testid": "add-new-check-check-date-input",
                  },
                  error: formValues.dob.error,
                  helperText:
                    formValues.dob.error && formValues.dob.errorMessage,
                  FormHelperTextProps: {
                    className: style.helperText,
                  },
                  fullWidth: true,
                },
              }}
            />
          </LocalizationProvider>
        </Grid>
        <Grid item xs={4}>
          <Select
            name="countryCode"
            fullWidth
            value={formValues.countryCode.value}
            className={`${style.textInput} ${style.countryCode}`}
            onChange={handleSelectChange}
            displayEmpty
            defaultValue=""
            renderValue={(value) => {
              const option: any = countryCodeOptions.find(
                ({ IsdCode }) => IsdCode === value
              );
              return value
                ? `${option?.IsdCode} (${option?.Code})`
                : "Enter Country Code";
            }}
          >
            {countryCodeOptions.map(({ Code, IsdCode }, index) => {
              return (
                <MenuItem key={index} value={IsdCode}>
                  {`${IsdCode} (${Code})`}
                </MenuItem>
              );
            })}
          </Select>
        </Grid>
        <Grid item xs={8}>
          <TextField
            margin="normal"
            type="text"
            id="mobileNumber"
            label="Mobile Number"
            name="mobileNumber"
            inputProps={{
              maxLength: 14,
              pattern: "[0-9]*",
              inputMode: "numeric",
            }}
            className={`${style.textInput} ${style.mobileNumber}`}
            value={maskedMobileNumber}
            inputRef={maskedMobileNumberRef}
            data-testid="mobile-number"
            error={formValues.mobileNumber.error}
            helperText={
              formValues.mobileNumber.error &&
              formValues.mobileNumber.errorMessage
            }
            FormHelperTextProps={{
              className: style.helperText,
            }}
          />
        </Grid>
        <Grid item xs={12}>
          <TextField
            margin="normal"
            fullWidth
            id="email"
            label="Email"
            name="email"
            className={style.textInput}
            value={formValues.email.value}
            onChange={handleChange}
            data-testid="email"
            error={formValues.email.error}
            helperText={formValues.email.error && formValues.email.errorMessage}
            FormHelperTextProps={{
              className: style.helperText,
            }}
          />
        </Grid>
        {mergeErrMsg && (
          <span className={style.mergeErrorMessage} data-testid="error-msg">
            {mergeErrMsg}
          </span>
        )}
      </Grid>
      <div className={style.buttonContainer}>
        <Divider />
        <div className={style.btnSection}>
          <Button
            type="submit"
            fullWidth
            variant="contained"
            className={`${style.submitBtn} ${btnDisabled && style.disabledBtn}`}
            data-testid="submit-btn"
            disabled={btnDisabled}
            onClick={(e) => handleSubmit(e, false)}
          >
            Submit
          </Button>
          {canMergePatient && (
            <Button
              type="reset"
              fullWidth
              variant="contained"
              className={style.submitBtn}
              data-testid="reset-btn"
              onClick={(e) => handleMerge(e)}
            >
              Merge Files
            </Button>
          )}
          <Button
            type="reset"
            fullWidth
            variant="contained"
            className={`${style.submitBtn} ${btnDisabled && style.disabledBtn}`}
            data-testid="reset-btn"
            disabled={btnDisabled}
            onClick={handleReset}
          >
            Reset
          </Button>
        </div>
      </div>
    </Box>
  );
};

export default AdvancedSearchForm;
