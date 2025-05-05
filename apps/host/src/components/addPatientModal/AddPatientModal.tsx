import {
  AddPatientFormDTO,
  AddPatientModalDTO,
  AddPatientPayloadDTO,
  PatientDetailsDTO,
  RelatedPatientsDTO,
} from "@root/host/src/types/addPatientModal.types";
import style from "./AddPatientModal.module.scss";
import IconSVG from "../iconsvg/IconSVG";
import {
  AlertColor,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
} from "@mui/material";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  INPUT_MASK,
  ISD_CODE,
  SNACKBAR_COLOR_TYPE,
  isEmailValidRegex,
  isNameValidRegex,
  isZipcodeValidRegex,
} from "@root/host/src/constants/common.constants";
import { useEffect, useState } from "react";
import dayjs from "dayjs";
import {
  formatPhoneNumber,
  nameFieldValidator,
} from "@root/host/src/utils/common.utils";
import Otp from "../authentication/Otp/Otp";
import PrimaryModal from "../primary_modal/PrimaryModal";
import { PatientDataTabPanelDTO } from "../../types/addPatientModal.types";
import AddRelationConsentModal from "../addRelationConsentModal/AddRelationConsentModal";
import { consentModalSendOtpPayload } from "@root/host/src/types/addRelationConsentModal.types";
import { CreatePatient } from "@root/host/src/service/common.service";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { useDispatch, useSelector } from "react-redux";
import { GetAdvancedSearchFormState } from "../advancedSearchForm/advancedSearchForm.selector";
import { useMaskInput } from "@root/host/src/hooks/useMaskInput";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import useAxiosLoader from "@root/host/src/hooks/useAxiosLoader";
import { ZipCodeMask } from "../ZipCodeMask/ZipCodeMask";
import { UPDATE_ADD_PATIENT_DATA } from "@root/host/src/store/reducer/addPatientReducer";

const AddPatientModal = (props: AddPatientModalDTO) => {
  const {
    countryCodeOptions,
    relationTypesOptions,
    isListOfPatients,
    mobileNumberExistsMessage,
    patientListData,
    otpModalOpen,
    setOtpModalOpen,
    setMobileNumberExistsMessage,
    setPatientListData,
    setIsListOfPatients,
    addRelationSuccessModal,
    setAddRelationSuccessModal,
    patientData,
    setIsAddPatientModal,
    isAddRelationshipFromPatientFile,
    setSnackBar,
    setRecentlyCreatedPatientId,
    isCreateFromPatientModule,
  } = props;

  const advancesSearchFormState = useSelector((state: any) =>
    GetAdvancedSearchFormState({ ...state })
  );
  const dispatch = useDispatch();

  const INITIAL_VALUE = {
    firstName: {
      value: advancesSearchFormState?.firstName || "",
      error: false,
      errorMessage: ERROR_MESSAGE.FIRST_NAME,
    },
    lastName: {
      value: advancesSearchFormState?.lastName || "",
      error: false,
      errorMessage: ERROR_MESSAGE.LAST_NAME,
    },
    mobileNumber: {
      value: advancesSearchFormState?.phone || "",
      error: false,
      errorMessage: ERROR_MESSAGE.MOBILE_NUMBER,
    },
    countryCode: {
      value: advancesSearchFormState?.countryCode || ISD_CODE,
      error: false,
      errorMessage: ERROR_MESSAGE.COUNTRY_CODE,
    },
    dob: {
      value: dayjs(advancesSearchFormState?.dob) || null,
      error: false,
      errorMessage: ERROR_MESSAGE.DOB,
    },
    email: {
      value: advancesSearchFormState?.email || "",
      error: false,
      errorMessage: ERROR_MESSAGE.EMAIL_ID,
    },
    zipCode: {
      value: "",
      error: false,
      errorMessage: ERROR_MESSAGE.ZIP_CODE,
    },
  };

  const [formValues, setFormValues] =
    useState<AddPatientFormDTO>(INITIAL_VALUE);
  const [skipAddRelationship, setSkipAddRelationship] = useState(false);
  const [onlySkipRelationSection, setOnlySkipRelationSection] = useState(false);
  const [relatedPatientId, setRelatedPatientId] = useState(0);
  const [relationTypeValue, setRelationTypeValue] = useState({
    value: "",
    error: false,
    errorMessage: "",
  });
  const [storeId, setStoreId] = useState<string | null>(null);
  const [selectedPatient, setSelectedPatient] =
    useState<PatientDetailsDTO | null>(null);
  const [selectedPatientError, setSelectedPatientError] = useState("");
  const { showSnackBar } = useSnackBar();
  const [successMessage, setSuccessMessage] = useState("");
  const [createdPatientId, setCreatedPatientId] = useState(0);
  const [maskedZipcode, setMaskedZipcode] = useState("");
  const loading = useAxiosLoader();

  const dobMinDate = new Date(
    dayjs().year() - 100,
    dayjs().month(),
    dayjs().date()
  );

  const isOver18 = (dob: dayjs.Dayjs) => {
    const currentDate = dayjs();
    const birthDate = dayjs(dob);
    const age = currentDate.diff(birthDate, "year");
    return age >= 18;
  };

  useEffect(() => {
    setMobileNumberExistsMessage("");
    setPatientListData([]);
    setIsListOfPatients(false);
  }, []);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage?.getItem("selectedStore")
    ) {
      setStoreId(
        JSON.parse(localStorage?.getItem("selectedStore") as string)?.Id
      );
    }
  }, [typeof window !== "undefined" && localStorage]);

  useEffect(() => {
    if (patientListData?.length === 1) {
      setSelectedPatient(patientListData[0]);
      setSelectedPatientError("");
      setRelatedPatientId(patientListData[0].Id);
    } else {
      setSelectedPatient(null);
      setSelectedPatientError("");
    }
  }, [patientListData]);

  const handleClose = () => setIsAddPatientModal(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target as HTMLInputElement;

    if (name === "zipCode") {
      setMaskedZipcode(value);
      const unmaskedValue = value.replace("-", "");
      setFormValues({
        ...formValues,
        [name]: {
          ...formValues[name as keyof typeof formValues],
          value: unmaskedValue,
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

  const handleSelectChange = (e: SelectChangeEvent<number | string>) => {
    const { name, value } = e.target;
    if (name === "relationshipType") {
      setRelationTypeValue({
        value: value as string,
        error: false,
        errorMessage: "",
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

  const handleSkipRelationChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setSkipAddRelationship(event.target.checked);
    setOnlySkipRelationSection(!onlySkipRelationSection);
  };

  const handleSelectPatient = (
    event: React.MouseEvent<HTMLElement>,
    buttonId: number,
    patient: PatientDetailsDTO
  ) => {
    setRelatedPatientId(buttonId);
    setSelectedPatient(patient);
  };

  const payloadForSendOtpApi: consentModalSendOtpPayload = {
    patientId: createdPatientId as number,
    phone: {
      phoneNumber: formValues.mobileNumber.value,
      isdCode: formValues.countryCode.value,
    },
  };

  let relatedPatientArray: RelatedPatientsDTO[] = [];
  if (
    isListOfPatients &&
    relationTypeValue.value !== "" &&
    formValues.mobileNumber.value === patientListData[0].PhoneNumber.PhoneNumber
  ) {
    let DEFAULT_RELATION_TYPE_ID: number | null = null;
    let DEFAULT_REVERSE_RELATION_VALUE: boolean | null = null;
    for (const relationshipType of relationTypesOptions) {
      if (relationshipType.Description.toLowerCase().trim() === "other") {
        DEFAULT_RELATION_TYPE_ID = relationshipType.Id;
        DEFAULT_REVERSE_RELATION_VALUE = relationshipType.IsReverseRelationship;
        break;
      }
    }

    relatedPatientArray = patientListData?.map((patient) => {
      const RelationTypeId =
        patient.Id === relatedPatientId
          ? Number(relationTypeValue.value.split("_")[0])
          : (DEFAULT_RELATION_TYPE_ID as number);
      const isReverseRelationshipValue =
        patient.Id === relatedPatientId
          ? JSON.parse(relationTypeValue?.value?.split("_")[1])
          : DEFAULT_REVERSE_RELATION_VALUE;
      return {
        RelatedPatientId: patient.Id,
        RelationTypeId: RelationTypeId,
        IsReverseRelationshipSelected: isReverseRelationshipValue,
      };
    });
  }

  const payload: AddPatientPayloadDTO = {
    firstName: nameFieldValidator(formValues.firstName.value),
    lastName: nameFieldValidator(formValues.lastName.value),
    dob: formValues.dob.value?.format("YYYY-MM-DD") as string,
    email: formValues.email.value,
    zipCode: formValues.zipCode.value,
    primaryPhoneNo: {
      isdCode: formValues.countryCode.value,
      phoneNumber: formValues.mobileNumber.value,
    },
    createdAtStoreId: Number(storeId),
    OTP: "",
    RelatedPatients: !skipAddRelationship ? relatedPatientArray : [],
    skipRelation:
      skipAddRelationship === true
        ? "true"
        : relatedPatientArray.length > 0
        ? "false"
        : "",
  };

  const createPatientAndAddRelation = async (payload: AddPatientPayloadDTO) => {
    await CreatePatient(payload)
      .then((res) => {
        const IsRelationshipAdded = res?.data?.Result?.IsRelationshipAdded;
        const IsOtpGenerated = res?.data?.Result?.IsOtpGenerated;
        if (res?.status === 201 && !IsRelationshipAdded) {
          setRecentlyCreatedPatientId &&
            setRecentlyCreatedPatientId(res?.data?.Result?.PatientId);
          setOtpModalOpen(false);
          setIsAddPatientModal(false);
          if (isAddRelationshipFromPatientFile) {
            setSnackBar &&
              setSnackBar(
                res?.data?.SuccessMessage,
                SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
              );
          } else {
            showSnackBar(
              res?.data?.SuccessMessage,
              SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
            );
          }
        } else if (res?.status === 300) {
          setMobileNumberExistsMessage(res?.data?.SuccessMessage);
          setIsListOfPatients(true);
          setPatientListData(res?.data?.Result?.RelatedPatients);
        } else if (IsOtpGenerated) {
          setOtpModalOpen(true);
          if (isAddRelationshipFromPatientFile) {
            setSnackBar &&
              setSnackBar(
                res?.data?.SuccessMessage,
                SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
              );
          } else {
            showSnackBar(
              res?.data?.SuccessMessage,
              SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
            );
          }
        } else if (IsRelationshipAdded) {
          if (
            relationTypeValue?.value?.split("_")[3] === "Child" &&
            !isOver18(formValues.dob.value as dayjs.Dayjs)
          ) {
            setIsAddPatientModal(false);
            setRecentlyCreatedPatientId &&
              setRecentlyCreatedPatientId(res?.data?.Result?.PatientId);
            if (isAddRelationshipFromPatientFile) {
              setSnackBar &&
                setSnackBar(
                  res?.data?.SuccessMessage,
                  SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
                );
            } else {
              showSnackBar(
                res?.data?.SuccessMessage,
                SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
              );
            }
          } else {
            setAddRelationSuccessModal(true);
            setSuccessMessage(res?.data?.SuccessMessage);
            setCreatedPatientId(res?.data?.Result?.PatientId);
            if (isAddRelationshipFromPatientFile) {
              setSnackBar &&
                setSnackBar(
                  res?.data?.SuccessMessage,
                  SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
                );
            } else {
              showSnackBar(
                res?.data?.SuccessMessage,
                SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
              );
            }
          }
        }
      })
      .catch((err) => {
        const err_msg = err.response
          ? err.response?.data?.Error?.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        if (err.response?.status === 429) {
          setOtpModalOpen(false);
          setIsAddPatientModal(false);
          if (isAddRelationshipFromPatientFile) {
            setSnackBar &&
              setSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
          } else {
            showSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
          }
        } else {
          if (isAddRelationshipFromPatientFile) {
            setSnackBar &&
              setSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
          } else {
            showSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
          }
        }
      });
  };

  const { value: maskedMobileNumber, ref: maskedMobileNumberRef } =
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

  const handleAddPatientClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ) => {
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
      } else if (currentField === "email" && currentValue !== "") {
        if (!isEmailValidRegex.test(currentValue as string)) {
          newFormValues.email.errorMessage = ERROR_MESSAGE.INVALID_EMAIL;
          newFormValues.email.error = true;
        }
      } else if (currentField === "zipCode" && currentValue !== "") {
        if (!isZipcodeValidRegex.test(currentValue as string)) {
          newFormValues.zipCode.errorMessage = ERROR_MESSAGE.INVALID_ZIPCODE;
          newFormValues.zipCode.error = true;
        }
      } else if (currentField === "firstName" && currentValue !== "") {
        if ((currentValue as string).trim().length === 0) {
          newFormValues.firstName.errorMessage =
            ERROR_MESSAGE.INVALID_FIRSTNAME;
          newFormValues.firstName.error = true;
        }
        if (
          !isNameValidRegex.test(nameFieldValidator(currentValue as string))
        ) {
          newFormValues.firstName.errorMessage =
            ERROR_MESSAGE.INVALID_FIRSTNAME;
          newFormValues.firstName.error = true;
        }
      } else if (currentField === "lastName" && currentValue !== "") {
        if ((currentValue as string).trim().length === 0) {
          newFormValues.lastName.errorMessage = ERROR_MESSAGE.INVALID_LASTNAME;
          newFormValues.lastName.error = true;
        }
        if (
          !isNameValidRegex.test(nameFieldValidator(currentValue as string))
        ) {
          newFormValues.lastName.errorMessage = ERROR_MESSAGE.INVALID_LASTNAME;
          newFormValues.lastName.error = true;
        }
      } else if (currentField === "dob" && currentValue !== "") {
        if (
          !dayjs(currentValue as dayjs.Dayjs).isValid() ||
          currentValue > dayjs() ||
          currentValue < dayjs(dobMinDate)
        ) {
          newFormValues.dob.errorMessage = ERROR_MESSAGE.INVALID_DOB;
          newFormValues.dob.error = true;
        }
      } else if (
        currentField === "mobileNumber" &&
        typeof currentValue === "string" &&
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
      !newFormValues.zipCode.error &&
      !newFormValues.dob.error
    ) {
      if (
        isListOfPatients &&
        !skipAddRelationship &&
        formValues.mobileNumber.value ===
          patientListData[0].PhoneNumber.PhoneNumber
      ) {
        if (relationTypeValue.value === "") {
          setRelationTypeValue({
            ...relationTypeValue,
            error: true,
            errorMessage: ERROR_MESSAGE.RELATIONSHIP_TYPE,
          });
          return;
        } else if (!selectedPatient?.Id) {
          setSelectedPatientError(ERROR_MESSAGE.PATIENT_SELECT_ERROR);
          return;
        }
      }
      if (isCreateFromPatientModule) {
        dispatch(
          UPDATE_ADD_PATIENT_DATA({
            FirstName: newFormValues.firstName.value,
            LastName: newFormValues.lastName.value,
            Email: newFormValues.email.value,
            PhoneNumber: newFormValues.mobileNumber.value,
            CountryCode: newFormValues.countryCode.value,
            Dob: newFormValues.dob.value,
            Zipcode: newFormValues.zipCode.value,
          })
        );
      }
      createPatientAndAddRelation(payload);
    }
  };

  return (
    <div className={style.addPatientModalWrapper}>
      <BackdropLoader openLoader={loading} />
      <div className={style.headingwrapper}>
        <h1 className={style.headingText}>Add New Patient</h1>
        <div className={style.closeIconWrapper} onClick={handleClose}>
          <IconSVG
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#4d4d4d"
            name="modal_cross"
          />
        </div>
      </div>
      <Divider className={style.lineColor} />
      <div className={style.addPatientModalContainer}>
        <Box
          component="form"
          data-testid="form"
          noValidate
          className={style.formFields}
        >
          <label className={style.formLabel}>First Name*</label>
          <TextField
            margin="normal"
            autoFocus
            required
            id="firstName"
            placeholder="Enter First Name"
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
          />
          <label className={style.formLabel}>Last Name*</label>
          <TextField
            margin="normal"
            required
            id="lastName"
            placeholder="Enter Last Name"
            name="lastName"
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
          />
          <label className={style.formLabel}>Date of Birth*</label>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DesktopDatePicker
              readOnly={false}
              className={`${style.textInput} ${style.dobPicker}`}
              value={formValues.dob.value}
              minDate={dayjs(dobMinDate)}
              maxDate={dayjs()}
              onChange={(newValue) =>
                setFormValues({
                  ...formValues,
                  dob: {
                    value: newValue,
                    error: false,
                    errorMessage: formValues.dob.errorMessage,
                  },
                })
              }
              slotProps={{
                textField: {
                  inputProps: {
                    "data-testid": "add-new-check-check-date-input",
                    placeholder: "Select Date of Birth",
                  },
                  fullWidth: true,
                  error: formValues.dob.error,
                  helperText:
                    formValues.dob.error && formValues.dob.errorMessage,
                },
              }}
            />
          </LocalizationProvider>
          <Box className={style.mobileInput} sx={{ flexGrow: 1 }}>
            <label className={style.formLabel}>Phone Number*</label>
            <Grid container spacing={2}>
              <Grid item xs={3}>
                <label className={style.formLabel}>Country Code</label>
                <Select
                  name="countryCode"
                  fullWidth
                  value={formValues.countryCode.value}
                  error={formValues.countryCode.error}
                  className={`${style.textInput} ${style.countryCode}`}
                  onChange={handleSelectChange}
                  displayEmpty
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
                <FormHelperText className={style.selectCompErrorText}>
                  {formValues.countryCode.error &&
                    formValues.countryCode.errorMessage}
                </FormHelperText>
              </Grid>
              <Grid item xs={9}>
                <label className={style.formLabel}>Mobile Number</label>
                <TextField
                  margin="normal"
                  required
                  type="text"
                  id="mobileNumber"
                  placeholder="Enter Mobile Number"
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
                />
              </Grid>
            </Grid>
            {mobileNumberExistsMessage && (
              <span className={style.mobileNumberExistsMessage}>
                {mobileNumberExistsMessage}
              </span>
            )}
          </Box>
          <label className={style.formLabel}>Email *</label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="email"
            placeholder="Enter Email"
            name="email"
            className={style.textInput}
            value={formValues.email.value}
            onChange={handleChange}
            data-testid="email"
            error={formValues.email.error}
            helperText={formValues.email.error && formValues.email.errorMessage}
          />
          <label className={style.formLabel}>Zip Code *</label>
          <TextField
            margin="normal"
            required
            fullWidth
            id="zipCode"
            placeholder="Enter Zip Code"
            name="zipCode"
            InputProps={{
              inputComponent: ZipCodeMask as any,
            }}
            className={style.textInput}
            value={maskedZipcode}
            onChange={handleChange}
            data-testid="zipcode"
            error={formValues.zipCode.error}
            helperText={
              formValues.zipCode.error && formValues.zipCode.errorMessage
            }
          />
          {isListOfPatients && (
            <>
              {!onlySkipRelationSection && (
                <Box className={style.selectRelationshipBox}>
                  <h1 className={style.boxHeading}>
                    Please select the patient and add relationship.
                  </h1>
                  {patientListData &&
                    patientListData.map(
                      (patient: PatientDetailsDTO, index: number) => {
                        return (
                          <Box key={index}>
                            <Box
                              sx={{ flexGrow: 1 }}
                              className={style.patientListSection}
                            >
                              <Box className={style.namePhoneSection}>
                                <Box className={style.namePhoneSection}>
                                  <IconSVG
                                    width="40"
                                    height="40"
                                    viewBox="0 0 40 40"
                                    fill="#DEDEDE"
                                    name="patient_icon"
                                  />
                                  <span
                                    className={style.patientDataStyle}
                                    style={{
                                      textTransform: "capitalize",
                                      marginLeft: "12px",
                                    }}
                                  >{`${patient.FirstName} ${patient.LastName} - #${patient.Id}`}</span>
                                </Box>
                                <Box>
                                  <span className={style.patientDataStyle}>
                                    {formatPhoneNumber(
                                      patient.PhoneNumber.PhoneNumber,
                                      false
                                    )}
                                  </span>
                                </Box>
                              </Box>
                              <Box className={style.dateEmailSection}>
                                <Box className={style.dateEmailWrapper}>
                                  <Box>
                                    <span className={style.patientDataStyle}>
                                      {dayjs(patient.Dob).format("MM/DD/YYYY")}
                                    </span>
                                  </Box>
                                  <Box>
                                    <span className={style.patientDataStyle}>
                                      {patient.Email}
                                    </span>
                                  </Box>
                                </Box>
                                {patientListData?.length > 1 && (
                                  <Box>
                                    <ToggleButtonGroup
                                      value={relatedPatientId}
                                      exclusive
                                      onChange={(e) =>
                                        handleSelectPatient(
                                          e,
                                          patient.Id,
                                          patient
                                        )
                                      }
                                      aria-label="button group"
                                    >
                                      <ToggleButton
                                        value={patient.Id}
                                        aria-label="button toggle"
                                        classes={{
                                          selected: style.selectedPatientButton,
                                        }}
                                        className={style.selectPatientButton}
                                      >
                                        Select Patient
                                      </ToggleButton>
                                    </ToggleButtonGroup>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                            <Divider />
                          </Box>
                        );
                      }
                    )}
                  <FormHelperText className={style.selectCompErrorText}>
                    {!selectedPatient &&
                      selectedPatientError &&
                      selectedPatientError}
                  </FormHelperText>
                  <FormControl
                    fullWidth
                    className={style.selectRelationSection}
                    error={relationTypeValue.error}
                  >
                    <label className={style.formLabel}>Relation Type*</label>
                    <Select
                      id="relationshipType"
                      name="relationshipType"
                      displayEmpty
                      value={relationTypeValue.value}
                      onChange={handleSelectChange}
                      renderValue={(value) => {
                        const option: any = relationTypesOptions.find(
                          ({ Description }) =>
                            Description === value.toString().split("_")[2]
                        );
                        return value
                          ? option?.Description
                          : "Select Relationship Type";
                      }}
                    >
                      {relationTypesOptions.map((item: any, index) => {
                        return (
                          <MenuItem
                            key={index}
                            value={`${item.Id}_${item.IsReverseRelationship}_${item.Description}_${item.ReverseRelationship}`}
                          >
                            {item.Description}
                          </MenuItem>
                        );
                      })}
                    </Select>
                    <FormHelperText className={style.selectCompErrorText}>
                      {relationTypeValue.error &&
                        relationTypeValue.errorMessage}
                    </FormHelperText>
                  </FormControl>
                </Box>
              )}
              <div>
                <FormControlLabel
                  className={style.skipRelation}
                  control={
                    <Checkbox
                      onChange={handleSkipRelationChange}
                      name="skipAddRelationship"
                      checked={skipAddRelationship}
                    />
                  }
                  label="Skip Add Relationship"
                />
              </div>
            </>
          )}
        </Box>
      </div>
      <div>
        <Button className={style.createBtn} onClick={handleAddPatientClick}>
          Create
        </Button>
      </div>
      {otpModalOpen && (
        <PrimaryModal
          modalOpen={otpModalOpen}
          setModalOpen={setOtpModalOpen}
          modalInner={
            <Otp
              isModal={otpModalOpen}
              mobileNumber={formValues.mobileNumber.value}
              setIsModalOpen={setOtpModalOpen}
              createPatientAndAddRelation={createPatientAndAddRelation}
              createPatientPayload={payload}
              isModalForCreatePatient={true}
            />
          }
          cstmStyle={"addPatientOtpModal"}
        />
      )}
      {addRelationSuccessModal && (
        <PrimaryModal
          modalOpen={addRelationSuccessModal}
          setModalOpen={setAddRelationSuccessModal}
          modalInner={
            <AddRelationConsentModal
              setAddRelationSuccessModal={setAddRelationSuccessModal}
              setConsentNotChange={props.setConsentNotChange}
              consentNotChange={props.consentNotChange}
              successMessage={successMessage}
              patientData={patientData as PatientDataTabPanelDTO}
              createdPatientId={createdPatientId}
              selectedPatientDataFromList={selectedPatient as PatientDetailsDTO}
              setIsAddPatientModal={setIsAddPatientModal}
              isAddRelationshipFromPatientFile={
                isAddRelationshipFromPatientFile as boolean
              }
              payloadForSendOtpApi={payloadForSendOtpApi}
              setSnackBar={setSnackBar as any}
              setRecentlyCreatedPatientId={setRecentlyCreatedPatientId}
            />
          }
          cstmStyle={"patientRelationshipAddRelationSuccessModal"}
        />
      )}
    </div>
  );
};

export default AddPatientModal;
