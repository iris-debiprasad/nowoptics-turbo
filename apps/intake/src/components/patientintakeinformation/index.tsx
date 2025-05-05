import { useSnackBar } from "@/context/SnackbarContext";
import { useDebounce } from "@/hooks/useDebounce";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  CheckValidPatientIntakeStep,
  GetIsLanguageUpdated,
  GetIsUpdatedPatientInformation,
  GetOTPModalValues,
  GetPatientInformationErrors,
  GetPatientInformationValue,
  GetPatientIntakeStepType
} from "@root/host/src/store/reducer/intake.selector";
import {
  CHANGE_FORM_LANGUAGE,
  CHANGE_PATIENT_INTAKE_STEP,
  SET_FILE_ELEMENT,
  SET_PATIENT_INTAKE_ERRORS,
  UPDATE_PATIENT_INFORMATION_VALUE,
} from "@root/host/src/store/reducer/intake.slice";
import {
  intakeApi,
  useGetAddressByZipCodeQuery,
  useGetLanguageTypesQuery,
  useSavePatientAddressCustomerMutation,
  useSavePatientAddressInformationAnonymousMutation,
  useSavePatientAddressMutation,
  useSavePatientInformationCustomerMutation,
  useSavePatientInformationMutation
} from "@root/host/src/store/reducer/intakeApi.slice";
import { SelectOptions } from "@root/host/src/types/intakeInput.types";
import {
  ChangePatientIntakeStepActionType,
  PatientInformationProps,
  UpdatePatientInformationValueActionType,
} from "@root/host/src/types/Intake.types";
import {
  ErrorResponseType,
  SavePatientAddressResponse,
  SavePatientInformationResponse,
} from "@root/host/src/types/intakeApi.types";
import {
  exportComponentToPDF,
  generateSavePatientInformationPayload,
  generateSavePatientInformationPayloadAnonymous,
  isOTPGenerated,
  validatePatientInformationForm,
} from "@root/host/src/utils/intake.utils";
import TextField from "@mui/material/TextField";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { DEFAULT_STORE_SUPPORT_NUMBER, INPUT_MASK, isZipcodeValidRegex } from "@root/host/src/constants/common.constants";
import { useMaskInput } from "@root/host/src/hooks/useMaskInput";
import dayjs from "dayjs";
import { FC, FunctionComponent, MutableRefObject, memo, useEffect, useRef, useState } from "react";
import DateInput from "../common/dateinput";
import Radio from "../common/radio";
import Select from "../common/select";
import OTPModal from "../otpmodal";
import styles from "./PatientIntakeInformation.module.scss";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { RECAPTCHA_ACTION } from "@/constants/intake.constants";
import { Checkbox } from "@mui/material";
import dynamic from "next/dynamic";
import { PrimaryModalDTO } from "@root/host/src/types/PrimaryModal.types";
import i18n from "@root/host/src/language/i18n";
import ConsentMessage from "@root/host/src/components/UserMarketingConsent/consentMessage";

const PrimaryModal = dynamic(() => import("host/PrimaryModal"), {
  ssr: false,
}) as FunctionComponent<PrimaryModalDTO>;

const ConsentPrivacyPolicy = dynamic(() => import("host/ConsentPrivacyPolicy"), {
  ssr: false,
}) as FunctionComponent<any>;

const PatientIntakeInformation: FC<PatientInformationProps> = ({
  activeStep,
}) => {
  const [showModal, setShowModal] = useState(false);

  const { fetchRecaptchaToken } = useRecaptchaToken();
  const languageLoaded = useRef<boolean | null>(null)
  const dispatch = useAppDispatch();
  const editing = useAppSelector(
    (state) => state.intake.patientIntakeForm.editing
  );
  const containerRef = useRef<HTMLDivElement>(null);
  const { showSnackBar } = useSnackBar();
  const [savePatientInformationAnonymous] =
    useSavePatientAddressInformationAnonymousMutation();
  const [savePatientInformation] = useSavePatientInformationMutation();
  const [savePatientAddress] = useSavePatientAddressMutation();
  const [savePatientInformationCustomer] =
    useSavePatientInformationCustomerMutation();
  const [savePatientAddressCustomer] = useSavePatientAddressCustomerMutation();
  const [currentLanguage, setCurrentLanguage] = useState<string | null>("en");

  useEffect(() => {
    const newLanguage = localStorage.getItem("language");
    i18n.changeLanguage(newLanguage as string);
    setCurrentLanguage(newLanguage);
  }, [typeof window !== "undefined" && localStorage.getItem("language")]);
  
  const { encryptedAppointmentId, isAnonymous } = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );
  const otpValues = useAppSelector((state) => GetOTPModalValues({ ...state }));
  const patientIntakeMetaData = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );
  const patientInformation = useAppSelector(
    (state) => state.intake.patientIntakeInformation
  );
  const formErrors = useAppSelector((state) =>
    GetPatientInformationErrors({ ...state })
  );
  const formValues = useAppSelector((state) =>
    GetPatientInformationValue({ ...state })
  );
  const debouncedZipCode = useDebounce<string>(
    formValues.ShippingAddress.ZipCode,
    500
  );
  const isPatient =
    patientIntakeMetaData.session?.authData?.userType === "Patient";

  const { isAddressUpdated, isInformationUpdated } = useAppSelector((state) =>
    GetIsUpdatedPatientInformation({ ...state })
  );

  const isLanguageUpdated = useAppSelector((state) =>
    GetIsLanguageUpdated({ ...state })
  );

  const { data } = useGetAddressByZipCodeQuery(
    {
      zipCode: debouncedZipCode,
    },
    {
      skip:
        !debouncedZipCode ||
        debouncedZipCode.length === 0 ||
        !isZipcodeValidRegex.test(debouncedZipCode),
    }
  );
  const patientAge = dayjs().diff(dayjs(formValues.Dob), "year");
  const { data: languageOptions } = useGetLanguageTypesQuery(
    {},
    {
      selectFromResult: ({ data, error, isLoading }) => ({
        data: data?.Result?.map(
          (item) =>
            ({ label: item.Description, value: item.Code } as SelectOptions)
        ),
        error,
        isLoading,
      }),
    }
  );
  const { value, ref } = useMaskInput(
    INPUT_MASK.MOBILE_NUMBER,
    formValues.PrimaryPhoneNo.PhoneNumber,
    (unmaskedValue) => {
      handleFormInputChange({
        key: "PrimaryPhoneNo",
        value: unmaskedValue,
        childKey: "PhoneNumber",
      });
    }
  );

  useEffect(() => {
    if(languageOptions && languageOptions.length > 0 && !languageLoaded.current) {
      dispatch(CHANGE_FORM_LANGUAGE({ value: languageOptions[0].value as number}));
      languageLoaded.current = true;
    }
  }, [languageOptions])

  const multipleCityOptions = data?.Result.AddressCityZip.CitiesNameList.map(
    (name) => {
      return {
        label: name,
        value: name,
      } as SelectOptions;
    }
  );

  const stepType = useAppSelector((state) =>
    GetPatientIntakeStepType({ ...state, activeStep })
  );

  const { hasNextStep, hasPreviousStep } = useAppSelector((state) =>
    CheckValidPatientIntakeStep({ ...state, activeStep })
  );

  const handleChangeStep = async (
    payload: ChangePatientIntakeStepActionType
  ) => {
    const noUpdates = !isAddressUpdated && !isInformationUpdated;
    const container = containerRef.current;
    const element = document.getElementById("patient-setup-container");




    if (!editing) {
      dispatch(CHANGE_PATIENT_INTAKE_STEP(payload));
      // TODO - Delete Later
      // document.getElementById("patient-setup-container")?.scrollIntoView(true);
      if(element) {
        element.style.display = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.display = 'flex';
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10)
      }
      return;
    }
    const errors = validatePatientInformationForm(formValues);
    dispatch(SET_PATIENT_INTAKE_ERRORS({ errors }));

    if (errors.length === 0) {
      if (container) {
        const file = await exportComponentToPDF(container, true);
        dispatch(
          SET_FILE_ELEMENT({
            file,
            index: 0,
          })
        );
      }
      try {
        const recaptchaToken = await fetchRecaptchaToken(RECAPTCHA_ACTION) || "";
        if (isAnonymous) {
          if (!isAddressUpdated && !isInformationUpdated) {
            dispatch(CHANGE_PATIENT_INTAKE_STEP(payload));
            // TODO - Delete Later
            // document.getElementById("patient-setup-container")?.scrollIntoView(true);
            if(element) {
              element.style.display = 'none';
              element.offsetHeight; // Trigger reflow
              element.style.display = 'flex';
              setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 10)
            }
            return;
          }
          const payloadAnon = generateSavePatientInformationPayloadAnonymous(
            encryptedAppointmentId!,
            formValues,
            recaptchaToken,
            data?.Result
          );
          const isValidatedAddress = true;
          payloadAnon.isValidateAddress = isValidatedAddress;
          const result = await savePatientInformationAnonymous(
              payloadAnon,
          ).unwrap();

          if (result.Error) {
            showSnackBar(
              result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              "error"
            );
            return;
          }
          if (!isOTPGenerated(result.Result)) {
            dispatch(
              intakeApi.util.invalidateTags([
                "PatientInformation",
                "PatientAddress",
              ])
            );
            dispatch(CHANGE_PATIENT_INTAKE_STEP(payload));
            // TODO - Delete Later
            // document.getElementById("patient-setup-container")?.scrollIntoView(true);
            if(element) {
              element.style.display = 'none';
              element.offsetHeight; // Trigger reflow
              element.style.display = 'flex';
              setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 10)
            }
            showSnackBar(result.SuccessMessage, "success");
          }
          return;
        }
        if (patientIntakeMetaData.storeDetails == null) {
          showSnackBar("Please select a store", "error");
          return;
        }
        if (!isPatient) {
          const [addressPayload, informationPayload] =
            generateSavePatientInformationPayload(
              formValues,
              patientInformation,
              patientIntakeMetaData.storeDetails?.Id,
              recaptchaToken,
              data?.Result
            );
          let informationResult: SavePatientInformationResponse | undefined =
            undefined,
            addressResult: SavePatientAddressResponse | undefined = undefined;
          if (isInformationUpdated) {
            informationResult = await savePatientInformation(
              informationPayload
            ).unwrap();
            if (informationResult.Error) {
              showSnackBar(
                informationResult.Error.Message ??
                ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
                "error"
              );
              return;
            }
            if (informationResult.SuccessMessage.length > 0) {
              showSnackBar(informationResult.SuccessMessage, "success");
            }
          }
          if (isAddressUpdated) {
            const isValidatedAddress = true;
            addressPayload.isValidateAddress = isValidatedAddress;
            addressResult = await savePatientAddress(addressPayload).unwrap();

            if (addressResult.Error) {
              showSnackBar(
                addressResult.Error.Message ??
                ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
                "error"
              );
              return;
            }

            showSnackBar(addressResult.SuccessMessage, "success");
          }

          const otpValues =
            informationResult && isOTPGenerated(informationResult.Result);

          if (
            (informationResult && !otpValues) ||
            (informationResult && addressResult && !otpValues) ||
            (!isAddressUpdated && !isInformationUpdated) ||
            (informationResult === undefined && addressResult)
          ) {
            if (!noUpdates) {
              dispatch(
                intakeApi.util.invalidateTags([
                  "PatientInformation",
                  "PatientAddress",
                ])
              );
            }
            dispatch(CHANGE_PATIENT_INTAKE_STEP(payload));
            // TODO - Delete Later
            // document.getElementById("patient-setup-container")?.scrollIntoView(true);
            if(element) {
              element.style.display = 'none';
              element.offsetHeight; // Trigger reflow
              element.style.display = 'flex';
              setTimeout(() => {
                element.scrollIntoView({ behavior: 'smooth', block: 'start' });
              }, 10)
            }

          }
          return;
        }

        const [addressPayloadCustomer, informationPayloadCustomer] =
          generateSavePatientInformationPayload(
            formValues,
            patientInformation,
            patientIntakeMetaData.storeDetails?.Id,
            recaptchaToken,
            data?.Result
          );

        let informationResult: SavePatientInformationResponse | undefined =
          undefined,
          addressResult: SavePatientAddressResponse | undefined = undefined;

        if (isInformationUpdated) {
          informationResult = await savePatientInformationCustomer(
            informationPayloadCustomer
          ).unwrap();

          if (informationResult.Error) {
            showSnackBar(
              informationResult.Error.Message ??
              ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              "error"
            );
            return;
          }

          if (informationResult.SuccessMessage.length > 0) {
            showSnackBar(informationResult.SuccessMessage, "success");
          }
        }
        if (isAddressUpdated) {
          const isValidatedAddress = true;
          addressPayloadCustomer.isValidateAddress = isValidatedAddress;
          addressResult = await savePatientAddressCustomer([
            addressPayloadCustomer,
          ]).unwrap();

          if (addressResult.Error) {
            showSnackBar(
              addressResult.Error.Message ??
              ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              "error"
            );
            return;
          }
        }

        const otpValues =
          informationResult && isOTPGenerated(informationResult.Result);

        if (
          (informationResult && !otpValues) ||
          (informationResult && addressResult && !otpValues) ||
          (!isAddressUpdated && !isInformationUpdated) ||
          (informationResult === undefined && addressResult)
        ) {
          if (!noUpdates) {
            dispatch(
              intakeApi.util.invalidateTags([
                "PatientInformation",
                "PatientAddress",
              ])
            );
          }
          dispatch(CHANGE_PATIENT_INTAKE_STEP(payload));
          // TODO - Delete Later
          // document.getElementById("patient-setup-container")?.scrollIntoView(true);
          if(element) {
            element.style.display = 'none';
            element.offsetHeight; // Trigger reflow
            element.style.display = 'flex';
            setTimeout(() => {
              element.scrollIntoView({ behavior: 'smooth', block: 'start' });
            }, 10)
          }

        }
        return;
      } catch (error) {
        showSnackBar(
          (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
      } finally {
        if (isLanguageUpdated) {
          dispatch(intakeApi.util.invalidateTags(["GetPatientIntakeForm"]));
        }
      }
    }
  };

  const handleFormInputChange = (
    payload: UpdatePatientInformationValueActionType
  ) => {
    dispatch(UPDATE_PATIENT_INFORMATION_VALUE(payload));
  };

  const handleRenderSelectValue = (
    selected: string | number,
    type: "City" | "PreferredLanguageCode"
  ) => {
    if (type === "City") {
      return (
        multipleCityOptions?.find((item) => item.value === selected)?.label ||
        "City"
      );
    }
    return (
      languageOptions?.find((item) => item.value === selected)?.label ||
      "Preferred Language"
    );
  };

  return (
    <div className={styles.informationContainer}>
      <div ref={containerRef} className="keepTogether">
        <h2 className={styles.formHeader}>Patient Information</h2>
        <div
          className={styles.formInputs}
          data-patientinformation='patientinformation'
          style={{
            display: "flex",
            width: "100%",
            flexDirection: "row",
            alignItems: "flex-start",
            justifyContent: "space-between",
          }}
        >
          <div className={styles.patientInformationInputs}>
            <div>
              <TextField
                className={`${styles.textField} ${!editing && styles.greyInput}`}
                value={formValues.FirstName}
                placeholder="First Name"
                onChange={(e) =>
                  handleFormInputChange({
                    key: "FirstName",
                    value: e.target.value,
                  })
                }
                disabled={!editing}
              />

              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.FirstName}
              </span>
            </div>
            <div>
              <TextField
                className={`${styles.textField} ${!editing && styles.greyInput}`}
                value={formValues.LastName}
                placeholder="Last Name"
                onChange={(e) =>
                  handleFormInputChange({
                    key: "LastName",
                    value: e.target.value,
                  })
                }
                disabled={!editing}
              />

              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.LastName}
              </span>
            </div>
            <div>
              <TextField
                className={`${styles.textField} ${!editing && styles.greyInput}`}
                value={value}
                placeholder="Phone Number"
                disabled={!editing}
                inputRef={ref}
              />
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.PrimaryPhoneNo}
              </span>
            </div>
            <div>
              <TextField
                className={`${styles.textField} ${!editing && styles.greyInput}`}
                value={formValues.Email}
                placeholder="Email"
                onChange={(e) =>
                  handleFormInputChange({ key: "Email", value: e.target.value })
                }
                disabled={!editing}
              />

              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.Email}
              </span>
            </div>
            <div className={styles.dobInput}>
              <div>
                <p className={styles.inputLabel}>Date of Birth*</p>
                <DateInput
                  value={dayjs(formValues.Dob)}
                  onChange={(value) =>
                    handleFormInputChange({ key: "Dob", value: value! })
                  }
                  disableFuture
                  minDate={dayjs().subtract(100, "year")}
                  disabled={!editing}
                />
                <span className={`errorMessage ${styles.errorSpan}`}>
                  {formErrors.Dob}
                </span>
              </div>
              <div className={styles.ageDiv1}>
                <p className={styles.inputLabel}>Age*</p>
                <TextField
                  className={`${styles.textField} ${styles.greyInput}`}
                  value={isNaN(patientAge) ? "" : patientAge}
                  placeholder="Age"
                  disabled={true}
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                />

                <span className={`errorMessage ${styles.errorSpan}`}></span>
              </div>
            </div>
            <div className={styles.genderInput}>
              <span>Gender*</span>
              <div className={styles.genderRadioBtns}>
                <div>
                  <Radio
                    checked={formValues.GenderCode === "M"}
                    handleLabelClick={() =>
                      editing
                        ? handleFormInputChange({
                          key: "GenderCode",
                          value: "M",
                        })
                        : undefined
                    }
                  />
                  <span>Male</span>
                </div>
                <div>
                  <Radio
                    checked={formValues.GenderCode === "F"}
                    handleLabelClick={() =>
                      editing
                        ? handleFormInputChange({
                          key: "GenderCode",
                          value: "F",
                        })
                        : undefined
                    }
                  />
                  <span>Female</span>
                </div>
              </div>
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.GenderCode}
              </span>
            </div>
            <div>
              <Select
                className={styles.selectInput}
                options={languageOptions || []}
                value={formValues.PreferredLanguageCode}
                placeholder="Preferred Language"
                displayEmpty
                renderValue={(selected) =>
                  handleRenderSelectValue(selected, "PreferredLanguageCode")
                }
                onChange={(e) =>
                  handleFormInputChange({
                    key: "PreferredLanguageCode",
                    value: e.target.value,
                  })
                }
                disabled={!editing}
              />
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.PreferredLanguageCode}
              </span>
            </div>
          </div>
          <div className={styles.patientAddressInputs}>
            <div>
              <TextField
                className={`${styles.textField} ${!editing && styles.greyInput}`}
                value={formValues?.ShippingAddress.AddressLine1}
                placeholder="Address Line 1"
                onChange={(e) =>
                  handleFormInputChange({
                    key: "ShippingAddress",
                    value: e.target.value,
                    childKey: "AddressLine1",
                  })
                }
                disabled={!editing}
              />
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.Address1}
              </span>
            </div>

            <div>
              <TextField
                className={`${styles.textField} ${!editing && styles.greyInput}`}
                placeholder="Address Line 2"
                value={formValues?.ShippingAddress.AddressLine2}
                onChange={(e) =>
                  handleFormInputChange({
                    key: "ShippingAddress",
                    value: e.target.value,
                    childKey: "AddressLine2",
                  })
                }
                disabled={!editing}
              />
            </div>

            <div>
              <TextField
                className={`${styles.textField} ${!editing && styles.greyInput}`}
                value={formValues?.ShippingAddress.ZipCode}
                placeholder="Zip Code"
                onChange={(e) =>
                  handleFormInputChange({
                    key: "ShippingAddress",
                    value: e.target.value,
                    childKey: "ZipCode",
                  })
                }
                disabled={!editing}
              />
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.ZipCode}
              </span>
            </div>

            <div>
              {multipleCityOptions && multipleCityOptions?.length === 1 ? (
                <TextField
                  className={`${styles.textField} ${styles.greyInput}`}
                  required
                  type="text"
                  value={formValues?.ShippingAddress.City}
                  placeholder="City"
                  onChange={(e) =>
                    handleFormInputChange({
                      key: "ShippingAddress",
                      value: e.target.value,
                      childKey: "City",
                    })
                  }
                  sx={{
                    "& legend": { display: "none" },
                    "& fieldset": { top: 0 },
                  }}
                  disabled={true}
                />)
                : (
                  <Select
                    className={styles.selectInput}
                    options={multipleCityOptions || []}
                    value={formValues?.ShippingAddress.City}
                    placeholder="City"
                    displayEmpty
                    renderValue={(selected) =>
                      handleRenderSelectValue(selected, "City")
                    }
                    onChange={(e) =>
                      handleFormInputChange({
                        key: "ShippingAddress",
                        value: e.target.value,
                        childKey: "City",
                      })
                    }
                    disabled={!editing || formValues.ShippingAddress.ZipCode.length == 0}
                  />
                )}

              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.City}
              </span>
            </div>

            <div>
              <p
                style={{ height: "17px", visibility: "hidden" }}
                className={styles.stateHiddenElement}
              >
                .
              </p>
              <TextField
                className={`${styles.textField} ${styles.greyInput}`}
                value={formValues?.ShippingAddress.State}
                placeholder="State"
                disabled={true}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.State}
              </span>
            </div>

            <div>
              <TextField
                placeholder="County"
                className={`${styles.textField} ${styles.greyInput}`}
                value={formValues?.ShippingAddress.County}
                disabled={true}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.County}
              </span>
            </div>

            <div>
              <TextField
                placeholder="Country"
                className={`${styles.textField} ${styles.greyInput}`}
                value={formValues?.ShippingAddress.Country}
                disabled={true}
                sx={{
                  "& legend": { display: "none" },
                  "& fieldset": { top: 0 },
                }}
              />
              <span className={`errorMessage ${styles.errorSpan}`}>
                {formErrors.Country}
              </span>
            </div>
          </div>
        </div>
      </div>
      <div className={styles.concentContainer}>
        <Checkbox
          disabled={!editing}
          checked={formValues.IsMarketingConsent}
          onChange={(e) => {
            handleFormInputChange({ key: "IsMarketingConsent", value: !formValues.IsMarketingConsent })
          }}
          className={editing ? styles.concentChekcBox : ''}
          color="default"
        />
        <span className={styles.concentDescription}>
        <ConsentMessage />
        {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P1")}
        <span
           className={styles.privacyModalLink} 
           onClick={() => {
             setShowModal(!showModal) 
            }}
          >
            {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P2")}
          </span>
          {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P3")}{" "}
          {`${DEFAULT_STORE_SUPPORT_NUMBER.SO}`}{" "}
          {i18n.t("BOOK_EYE_EXAM.MARKETING_CALLS_USER_CONSENT.P4")}
        </span>
      </div>
      <PrimaryModal
        modalOpen={showModal}
        setModalOpen={setShowModal}
        modalInner={<ConsentPrivacyPolicy setModalOpen={setShowModal} />}
      />
      <div className={styles.stepActions}>
        <button
          id={`next-step-btn-${activeStep}`}
          disabled={!hasNextStep}
          onClick={(_e) =>
            handleChangeStep({ action: "Next", newStepValue: activeStep + 1 })
          }
          className={!hasNextStep ? styles.disabledButton : ""}
          data-testid="next-step-btn"
        >
          {stepType === "HippaForms" ? "Submit" : "Next"}
        </button>
      </div>
      <OTPModal open={otpValues.open} activeStep={activeStep} />
    </div>
  );
};

export default memo(PatientIntakeInformation);
