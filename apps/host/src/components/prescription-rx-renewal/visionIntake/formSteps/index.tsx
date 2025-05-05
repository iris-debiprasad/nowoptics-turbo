import { ERROR_MESSAGE } from "@/constants/auth.constants";
import {
  GOOGLE_MAP_RESPONSE_COUNTRY_KEY,
  GOOGLE_MAP_RESPONSE_STATE_KEY,
  GOOGLE_MAP_US_CODE,
  USA_COUNTRY_CODE,
} from "@/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import useDetectScrolledToBottom from "@/hooks/useDetectScrolledToBottom";
import { useRecaptchaToken } from "@/hooks/useGoogleRecaptcha";
import { GetLocationDataFromLatLng } from "@/service/common.service";
import { useGetConsentFormCheckboxesQuery } from "@/store/reducer/intakeApi.slice";
import { GetVisionFormErrors } from "@/store/reducer/visionIntake.selector";
import {
  CHANGE_STEP,
  SET_FILE_ELEMENT,
  SET_FORM_ERROR,
  SET_SAVE_VISION_INTAKE_PAYLOAD,
  SET_VISION_INTAKE_PROPERTY,
  SET_SELECTED_STATE_CODE,
} from "@/store/reducer/visionIntake.slice";
import {
  useGetLastExamDateOptionsQuery,
  useGetVisionIntakeByPatientIdForViewQuery,
  useGetVisionIntakeByPatientIdQuery,
  useLazyGetAllCountriesQuery,
  useLazyGetAllStatesQuery,
  useLazyGetVisionIntakeByPatientIdForViewQuery,
  useLazyValidateStateIdQuery,
  useSaveVisionIntakeMutation,
} from "@/store/reducer/visionIntakeApi.slice";
import { useAppDispatch, useAppSelector } from "@/store/useStore";
import { ErrorResponseType } from "@/types/intakeApi.types";
import { SelectOptions } from "@/types/intakeInput.types";
import {
  GetAllStatesResponse,
  GetVisionIntakeByPatientIdForView,
  GetVisionIntakeByPatientIdResponse,
  SaveVisionIntakeRequest,
  VisionIntakeRemoteTypes,
} from "@/types/visionIntake.types";
import {
  exportComponentToPDF,
  generateVisionIntakeFormPDF,
} from "@/utils/intake.utils";
import FormControlLabel from "@mui/material/FormControlLabel";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Radio from "@mui/material/Radio";
import RadioGroup from "@mui/material/RadioGroup";
import Select from "@mui/material/Select";
import TextField from "@mui/material/TextField";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers/DesktopDatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import ResetIcon from "@root/assets/Images/icons/refresh.svg";
import dayjs from "dayjs";
import Image from "next/image";
import { useRouter } from "next/router";
import {
  Dispatch,
  ReactNode,
  SetStateAction,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { batch } from "react-redux";
import SignatureCanvas from "react-signature-canvas";
import styles from "./FormStep.module.scss";
import Tooltip from "@mui/material/Tooltip";

function FirstStep({
  setModalOpen,
  setModalInner,
  viewMode,
  patientId,
  isPatient,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalInner: Dispatch<SetStateAction<ReactNode | ReactNode[]>>;
} & VisionIntakeRemoteTypes) {
  const formMappedErrors = useAppSelector((state) =>
    GetVisionFormErrors(state)
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  // TODO only for development purpose to enable state selection
  const enableState = router.query.enableState === "true";
  const [viewData, setViewData] = useState<
    GetVisionIntakeByPatientIdResponse | undefined
  >(undefined);
  const [stateData, setStateData] = useState<GetAllStatesResponse | undefined>(
    undefined
  );
  const { showSnackBar } = useSnackBar();
  const [coordinates, setCoordinates] = useState<
    { lat: number; lng: number } | undefined
  >(undefined);
  const containerRef = useRef<HTMLDivElement>(null);
  const [geoLocatedState, setGeoLocatedState] = useState<boolean>(false);
  const { activeStep, saveVisionIntakePayload, formErrors, EventId, authData } =
    useAppSelector((state) => state.visionIntake);
  const [getAllStates] = useLazyGetAllStatesQuery({});
  const [getAllCountries] = useLazyGetAllCountriesQuery({});
  const [validateState] = useLazyValidateStateIdQuery({});
  const [a] = useLazyGetVisionIntakeByPatientIdForViewQuery();

  const fetchDataForView = async () => {
    if (!patientId || isPatient == null || !viewMode) return;
    try {
      const response = await a({
        patientId: patientId.toString(),
        isPatient,
      }).unwrap();
      setViewData(response);
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  const shouldDisableContinue = viewMode
    ? viewData?.Result.VisionIntake == null
    : !saveVisionIntakePayload?.StateId || !coordinates;

  const options = useMemo(() => {
    return (
      stateData?.Result.map((item) => {
        return {
          value: item.Id,
          label: item.Description,
        };
      }) || ([] as SelectOptions[])
    );
  }, [stateData]);

  const saveStateCode = (stateId: number) => {
    const stateCode = stateData?.Result.find(
      (item) => item.Id === stateId
    )?.Code;
    if (stateCode) {
      dispatch(SET_SELECTED_STATE_CODE(stateCode));
    }
  };

  const fetchLocationAndSetState = async () => {
    try {
      // get all list of countries
      const data = await getAllCountries({}).unwrap();
      const countryId = data?.Result.find(
        (item) => item.Code === USA_COUNTRY_CODE
      )?.Id;
      if (!countryId) return;
      // get all states for USA
      const statesDropdown = await getAllStates({ countryId }).unwrap();
      setStateData(statesDropdown);
      // If state has already been set, return
      // If coordinates are not set, return
      if (!coordinates) return;
      const { lat, lng } = coordinates;
      const result = await GetLocationDataFromLatLng(lat, lng);
      const stateObj = result.data.results.find((item) => {
        return item.types.includes(GOOGLE_MAP_RESPONSE_STATE_KEY);
      });
      const countryObj = result.data.results.find((item) =>
        item.types.includes(GOOGLE_MAP_RESPONSE_COUNTRY_KEY)
      );
      if (!stateObj || !countryObj) return;

      // Check if country is USA or not
      const isCountryUS = countryObj.address_components.find(
        (s) =>
          s.short_name === USA_COUNTRY_CODE ||
          s.short_name === GOOGLE_MAP_US_CODE
      );
      if (!isCountryUS) {
        // TODO
        // Add error message if user is not in USA
        return;
      }

      const stateCodeObj = stateObj?.address_components.find((item) => {
        return item.types.includes(GOOGLE_MAP_RESPONSE_STATE_KEY);
      });
      if (!stateCodeObj) return;
      const stateShortCode = stateCodeObj.short_name;
      // find stateid from the statesdropdown with the one found with google
      // maps api
      const stateId = statesDropdown?.Result.find(
        (item) => item.Code === stateShortCode
      )?.Id;
      if (stateId) {
        // State was located using geolocation api
        setGeoLocatedState(true);
        dispatch(
          SET_SAVE_VISION_INTAKE_PAYLOAD({ key: "StateId", value: stateId })
        );
      } else {
        // TODO
        // Show error message if state could not be located
      }
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  // get user location and store it in the state
  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(async (position) => {
        setCoordinates({
          lat: position.coords.latitude,
          lng: position.coords.longitude,
        });
      });
    }
  }, []);

  // set state when user is in view mode
  useEffect(() => {
    const StateId = viewData?.Result.VisionIntake?.StateId;
    if (viewMode && StateId) {
      dispatch(
        SET_SAVE_VISION_INTAKE_PAYLOAD({
          key: "StateId",
          value: StateId,
        })
      );
    }
  }, [viewMode, viewData]);

  useEffect(() => {
    if (viewMode && patientId && isPatient != null) {
      fetchDataForView();
    }
  }, [viewMode, patientId, isPatient]);

  useEffect(() => {
    fetchLocationAndSetState();
  }, [coordinates]);

  const handleNextBtn = async () => {
    if (viewMode) {
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );

      return;
    }
    try {
      if (!containerRef.current || !saveVisionIntakePayload) return;

      const { StateId } = saveVisionIntakePayload;
      const stateError = options.length === 0 || StateId === -1;
      if (StateId > 0) saveStateCode(StateId);
      // Validation logic
      batch(() => {
        dispatch(
          SET_FORM_ERROR({
            action: stateError ? "add" : "remove",
            key: "StateId",
            error: stateError,
          })
        );
      });

      if (stateError || !EventId) return;
      // Check if the state is valid or not
      await validateState({ stateId: String(StateId), EventId }).unwrap();

      const file = await exportComponentToPDF(containerRef.current);
      dispatch(SET_FILE_ELEMENT({ index: 0, file }));
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );
    } catch (error) {
      const err = error as ErrorResponseType;
      // invalid state
      if (err.status === 400 && err.data.Result === false) {
        const modalInner = VisionIntakeModalInner({
          index: 0,
          handleBackBtn() {
            router.replace("/");
          },
          handleNextBtn() {
            router.replace("/schedule-exam/");
          },
          invalidState: true,
          invalidStateErrorMessage: err?.data?.Error?.Message,
        });
        setModalInner(modalInner);
        setModalOpen(true);
        return;
      }
    }
  };

  const handleEnableLocation = () => {
    navigator.permissions
      .query({ name: "geolocation" })
      .then(function (result) {
        if (result.state == "granted") {
        } else if (result.state == "prompt") {
          navigator.geolocation.getCurrentPosition(async (position) => {
            setCoordinates({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          });
        } else if (result.state == "denied") {
        }
      });
  };

  return (
    <div className={styles.formStepContainer} ref={containerRef}>
      <p className={styles.formStepHeader}>
        To ensure your prescription is issued by a doctor in your state, we need
        to verify your location.
      </p>
      <div className={styles.formInput}>
        <label htmlFor="vision-intake-state">State *</label>
        <Select
          id="vision-intake-state"
          value={saveVisionIntakePayload?.StateId}
          placeholder="Select"
          // TODO only for development purpose to enable state selection
          disabled={!enableState}
          displayEmpty
          renderValue={(value) => {
            const selectedOption = options.find(
              (option) => option.value === value
            );
            return selectedOption?.label || "Select State";
          }}
          className={`${styles.selectInput} 
          ${geoLocatedState && styles.selectDisabled}
          `}
          style={{
            borderColor: formMappedErrors.StateId?.error ? "red" : undefined,
          }}
          onChange={(e) => {
            dispatch(
              SET_SAVE_VISION_INTAKE_PAYLOAD({
                key: "StateId",
                value: e.target.value as number,
              })
            );
          }}
        >
          {options?.map((option) => (
            <MenuItem
              classes={{ root: styles.selectOption }}
              key={option.value}
              value={option.value}
            >
              {option.label}
            </MenuItem>
          ))}
        </Select>
        {formMappedErrors.StateId?.error && (
          <p className={"errorMessage"} style={{ marginTop: "5px" }}>
            {formMappedErrors?.StateId?.message}
          </p>
        )}
      </div>
      <div
        className={styles.formFooter}
        style={{ justifyContent: "space-between" }}
      >
        <Tooltip
          arrow
          title={
            <ol className={styles.locationTooltip}>
              <li>
                Click the Padlock icon or site info on the left side of the
                address bar
              </li>
              <li>Select &apos;Location&apos;</li>
              <li>Select &apos;Allow&apos;</li>
              <li>Refresh the page to apply changes</li>
            </ol>
          }
        >
          <button
            disabled={viewMode}
            className={styles.locationBtn}
            onClick={handleEnableLocation}
            style={{
              cursor: viewMode ? "not-allowed" : "pointer",
            }}
          >
            Use My Location
          </button>
        </Tooltip>
        <button
          disabled={shouldDisableContinue}
          className={styles.nextBtn}
          style={{
            cursor: shouldDisableContinue ? "not-allowed" : "pointer",
          }}
          onClick={handleNextBtn}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

function SecondStep({
  setModalOpen,
  setModalInner,
  viewMode,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalInner: Dispatch<SetStateAction<ReactNode | ReactNode[]>>;
} & VisionIntakeRemoteTypes) {
  const formMappedErrors = useAppSelector((state) =>
    GetVisionFormErrors(state)
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeStep, saveVisionIntakePayload } = useAppSelector(
    (state) => state.visionIntake
  );
  const { EventId } = useAppSelector((state) => state.visionIntake);
  useGetVisionIntakeByPatientIdQuery(
    { stateId: saveVisionIntakePayload.StateId, EventId: EventId! },
    {
      skip: !EventId || viewMode || !saveVisionIntakePayload.StateId,
    }
  );
  const { data } = useGetLastExamDateOptionsQuery({});

  const options = useMemo(() => {
    return (
      data?.Result.map((item) => {
        return {
          value: item.Id,
          label: item.Description,
        };
      }) || ([] as SelectOptions[])
    );
  }, [data]);

  const handleNextBtn = async () => {
    if (viewMode) {
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );
      return;
    }
    try {
      if (!containerRef.current || !saveVisionIntakePayload) return;
      const {
        LastEyeExamDateId,
        HaveContactLenses,
        HaveGlasses,
        HaveAnyMedicationAllergyPregnantOrBreastfeeding,
        HaveAnySurgeryDiseaseOrEyeDrop,
      } = saveVisionIntakePayload;

      // validation logic
      batch(() => {
        dispatch(
          SET_FORM_ERROR({
            action: LastEyeExamDateId == null ? "add" : "remove",
            key: "LastEyeExamDateId",
            error: LastEyeExamDateId == null,
          })
        );
        dispatch(
          SET_FORM_ERROR({
            action: HaveContactLenses == null ? "add" : "remove",
            key: "HaveContactLenses",
            error: HaveContactLenses == null,
          })
        );
        dispatch(
          SET_FORM_ERROR({
            action: HaveGlasses == null ? "add" : "remove",
            key: "HaveGlasses",
            error: HaveGlasses == null,
          })
        );
        dispatch(
          SET_FORM_ERROR({
            action:
              HaveAnyMedicationAllergyPregnantOrBreastfeeding == null
                ? "add"
                : "remove",
            key: "HaveAnyMedicationAllergyPregnantOrBreastfeeding",
            error: HaveAnyMedicationAllergyPregnantOrBreastfeeding == null,
          })
        );
        dispatch(
          SET_FORM_ERROR({
            action: HaveAnySurgeryDiseaseOrEyeDrop == null ? "add" : "remove",
            key: "HaveAnySurgeryDiseaseOrEyeDrop",
            error: HaveAnySurgeryDiseaseOrEyeDrop == null,
          })
        );
      });

      if (
        !LastEyeExamDateId ||
        isNaN(LastEyeExamDateId) ||
        HaveContactLenses == null ||
        HaveGlasses == null ||
        HaveAnyMedicationAllergyPregnantOrBreastfeeding == null ||
        HaveAnySurgeryDiseaseOrEyeDrop == null
      )
        return;

      // GT4 code will be same for all environments
      // GT4 -> greater than 4 years ago
      // LT4 -> 3 - 4 years ago
      let lastExamFourYearsAgo = false;
      if (!data?.Result.length) return;
      for (let i = 0; i < data?.Result.length; i++) {
        const code = data?.Result[i].Code;
        const id = data?.Result[i].Id;
        if ((code === "GT4" || code === "LT4") && id === LastEyeExamDateId) {
          lastExamFourYearsAgo = true;
          break;
        }
      }

      let handleBackBtn = () => {
          router.replace("/");
        },
        handleNextBtn = () => {
          router.replace("/schedule-exam/");
        },
        index = 1;

      if (lastExamFourYearsAgo) {
        const modalInner = VisionIntakeModalInner({
          index,
          handleBackBtn,
          handleNextBtn,
          lastExamFourYearsAgo: true,
        });
        setModalInner(modalInner);
        setModalOpen(true);
        return;
      }

      if (!HaveContactLenses && !HaveGlasses) {
        const modalInner = VisionIntakeModalInner({
          index,
          handleBackBtn,
          handleNextBtn,
          bothGlassesAndContacts: true,
        });
        setModalInner(modalInner);
        setModalOpen(true);
        return;
      }

      if (
        HaveAnySurgeryDiseaseOrEyeDrop ||
        HaveAnyMedicationAllergyPregnantOrBreastfeeding
      ) {
        const modalInner = VisionIntakeModalInner({
          index,
          handleBackBtn,
          handleNextBtn,
          surgeryDiseaseOrEyeDrop: true,
        });
        setModalInner(modalInner);
        setModalOpen(true);
        return;
      }

      const file = await exportComponentToPDF(containerRef.current);
      dispatch(SET_FILE_ELEMENT({ index: 1, file }));
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  return (
    <div className={styles.formStepContainer} ref={containerRef}>
      <p className={styles.formTitle}>VISION HISTORY</p>
      <div className={styles.formInputsParent}>
        <div className={styles.formLeft}>
          <div className={styles.formInput}>
            <label htmlFor="vision-intake-state">
              Date of Last Eye Examination? *
            </label>
            <Select
              id="vision-intake-lastdateexak"
              value={saveVisionIntakePayload?.LastEyeExamDateId}
              placeholder="Select"
              displayEmpty
              disabled={viewMode}
              renderValue={(value) => {
                const selectedOption = options.find(
                  (option) => option.value === value
                );
                return selectedOption?.label || "Select";
              }}
              className={`${styles.selectInput}`}
              style={{
                borderColor: formMappedErrors.LastEyeExamDateId?.error
                  ? "red"
                  : undefined,
                width: "100%",
              }}
              onChange={(e) => {
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "LastEyeExamDateId",
                    value: e.target.value as number,
                  })
                );
              }}
            >
              {options?.map((option) => (
                <MenuItem
                  classes={{ root: styles.selectOption }}
                  key={option.value}
                  value={option.value}
                >
                  {option.label}
                </MenuItem>
              ))}
            </Select>
            {formMappedErrors.LastEyeExamDateId?.error && (
              <p className={"errorMessage"} style={{ marginTop: "5px" }}>
                {formMappedErrors?.LastEyeExamDateId?.message}
              </p>
            )}
          </div>
          <div className={styles.formInput}>
            <label
              htmlFor="vision-intake-contactlenses"
              className={styles.boldLabel}
            >
              Do you or have you worn contact lenses? *
            </label>
            <RadioGroup
              className={styles.radioGroup}
              row
              id="vision-intake-contactlenses"
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "HaveContactLenses",
                    value: e.target.value === "true",
                  })
                )
              }
              value={
                saveVisionIntakePayload?.HaveContactLenses == null
                  ? ""
                  : saveVisionIntakePayload?.HaveContactLenses
                  ? "true"
                  : "false"
              }
            >
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="true"
                disabled={viewMode}
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                disabled={viewMode}
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="false"
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
            {formMappedErrors.HaveContactLenses?.error && (
              <p className={"errorMessage"}>
                {formMappedErrors?.HaveContactLenses?.message}
              </p>
            )}
          </div>
          <div className={styles.formInput}>
            <label
              htmlFor="vision-intake-havewornglasses"
              className={styles.boldLabel}
            >
              Do you or have you worn glasses? *
            </label>
            <RadioGroup
              className={styles.radioGroup}
              row
              id="vision-intake-havewornglasses"
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "HaveGlasses",
                    value: e.target.value === "true",
                  })
                )
              }
              value={
                saveVisionIntakePayload?.HaveGlasses == null
                  ? ""
                  : saveVisionIntakePayload?.HaveGlasses
                  ? "true"
                  : "false"
              }
            >
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="true"
                disabled={viewMode}
                control={<Radio size="small" />}
                label="Yes"
              />
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="false"
                disabled={viewMode}
                control={<Radio size="small" />}
                label="No"
              />
            </RadioGroup>
            {formMappedErrors.HaveGlasses?.error && (
              <p className={"errorMessage"}>
                {formMappedErrors?.HaveGlasses?.message}
              </p>
            )}
          </div>
          <div className={styles.formInput}>
            <label
              htmlFor="vision-intake-anyapply1"
              className={styles.boldLabel}
            >
              Do any of these apply? *
            </label>
            <ul>
              <li>Have you ever had eye surgery or injury?</li>
              <li>
                Do you or have you ever been diagnosed with an Eye Disease or
                Condition?
              </li>
              <li>Are you currently using eye drops?</li>
            </ul>
            <RadioGroup
              className={styles.radioGroup}
              row
              id="vision-intake-anyapply1"
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "HaveAnySurgeryDiseaseOrEyeDrop",
                    value: e.target.value === "true",
                  })
                )
              }
              value={
                saveVisionIntakePayload?.HaveAnySurgeryDiseaseOrEyeDrop == null
                  ? ""
                  : saveVisionIntakePayload?.HaveAnySurgeryDiseaseOrEyeDrop
                  ? "true"
                  : "false"
              }
            >
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="true"
                control={<Radio size="small" />}
                label="Yes"
                disabled={viewMode}
              />
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="false"
                control={<Radio size="small" />}
                label="No"
                disabled={viewMode}
              />
            </RadioGroup>
            {formMappedErrors.HaveAnySurgeryDiseaseOrEyeDrop?.error && (
              <p className={"errorMessage"}>
                {formMappedErrors?.HaveAnySurgeryDiseaseOrEyeDrop?.message}
              </p>
            )}
          </div>
        </div>
        <div className={styles.formRight}>
          <div className={styles.formInput}>
            <label htmlFor="vision-intake-primarydoc">
              Name of your Primary Care Doctor?
            </label>
            <TextField
              id="vision-intake-primarydoc"
              fullWidth
              disabled={viewMode}
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "PrimaryDoctorName",
                    value: e.target.value,
                  })
                )
              }
              classes={{ root: `${styles.inputRoot}` }}
              value={saveVisionIntakePayload?.PrimaryDoctorName}
            />
          </div>
          <div className={styles.formInput}>
            <label htmlFor="vision-intake-datephysical">
              Date of last physical?
            </label>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DesktopDatePicker
                disableFuture
                disabled={viewMode}
                value={dayjs(saveVisionIntakePayload?.LastPhysical)}
                onChange={(e) =>
                  dispatch(
                    SET_SAVE_VISION_INTAKE_PAYLOAD({
                      key: "LastPhysical",
                      value: e,
                    })
                  )
                }
                slotProps={{
                  textField: {
                    id: "vision-intake-datephysical",
                    fullWidth: true,
                    InputProps: {
                      "aria-label": "date-input",
                      classes: {
                        root: `${styles.dateInputRoot}`,
                      },
                    },
                  },
                }}
              />
            </LocalizationProvider>
          </div>
          <div className={styles.formInput}>
            <label
              htmlFor="vision-intake-anyapply2"
              className={styles.boldLabel}
            >
              Do any of these apply? *
            </label>
            <ul>
              <li>Are you currently taking any medications?</li>
              <li>Do you have any drug allergies?</li>
              <li>Do you have any other allergies?</li>
              <li>Are you pregnant or breastfeeding</li>
            </ul>
            <RadioGroup
              className={styles.radioGroup}
              row
              id="vision-intake-anyapply2"
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "HaveAnyMedicationAllergyPregnantOrBreastfeeding",
                    value: e.target.value === "true",
                  })
                )
              }
              value={
                saveVisionIntakePayload?.HaveAnyMedicationAllergyPregnantOrBreastfeeding ==
                null
                  ? ""
                  : saveVisionIntakePayload?.HaveAnyMedicationAllergyPregnantOrBreastfeeding
                  ? "true"
                  : "false"
              }
            >
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="true"
                control={<Radio size="small" />}
                label="Yes"
                disabled={viewMode}
              />
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="false"
                control={<Radio size="small" />}
                label="No"
                disabled={viewMode}
              />
            </RadioGroup>
            {formMappedErrors.HaveAnyMedicationAllergyPregnantOrBreastfeeding
              ?.error && (
              <p className={"errorMessage"}>
                {
                  formMappedErrors
                    ?.HaveAnyMedicationAllergyPregnantOrBreastfeeding?.message
                }
              </p>
            )}
          </div>
        </div>
      </div>
      <div className={styles.formFooter}>
        <button
          className={styles.prevBtn}
          onClick={() =>
            dispatch(
              CHANGE_STEP({
                currentStep: activeStep,
                newStep: activeStep - 1,
                type: "prev",
              })
            )
          }
        >
          Back
        </button>
        <button className={styles.nextBtn} onClick={handleNextBtn}>
          Continue
        </button>
      </div>
    </div>
  );
}

function ThirdStep({
  setModalOpen,
  setModalInner,
  viewMode,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalInner: Dispatch<SetStateAction<ReactNode | ReactNode[]>>;
} & VisionIntakeRemoteTypes) {
  const formMappedErrors = useAppSelector((state) =>
    GetVisionFormErrors(state)
  );
  const router = useRouter();
  const dispatch = useAppDispatch();
  const { showSnackBar } = useSnackBar();
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeStep, saveVisionIntakePayload } = useAppSelector(
    (state) => state.visionIntake
  );

  const handleNextBtn = async () => {
    if (viewMode) {
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );
      return;
    }
    try {
      if (!containerRef.current || !saveVisionIntakePayload) return;

      // Validation logic
      const { HaveAnyPastOrCurrentDisease } = saveVisionIntakePayload;
      dispatch(
        SET_FORM_ERROR({
          action: HaveAnyPastOrCurrentDisease == null ? "add" : "remove",
          key: "HaveAnyPastOrCurrentDisease",
          error: HaveAnyPastOrCurrentDisease == null,
        })
      );

      if (HaveAnyPastOrCurrentDisease == null) return;

      if (saveVisionIntakePayload?.HaveAnyPastOrCurrentDisease) {
        const modalInner = VisionIntakeModalInner({
          index: 2,
          handleBackBtn() {
            router.replace("/");
          },
          handleNextBtn() {
            router.replace("/schedule-exam/");
          },
        });
        setModalInner(modalInner);
        setModalOpen(true);
        return;
      }
      const file = await exportComponentToPDF(containerRef.current);
      dispatch(SET_FILE_ELEMENT({ index: 2, file }));
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  return (
    <div className={styles.formStepContainer} ref={containerRef}>
      <p className={styles.formTitle}>HEALTH INFORMATION</p>
      <div className={styles.formInput}>
        <label htmlFor="vision-intake-healthinfo" className={styles.boldLabel}>
          Have you had any of the following in the past or currently? *
        </label>
        <div className={styles.gridCols4}>
          <ul>
            <li>Macular Degenration</li>
            <li>Retinal Disease or Detachment</li>
            <li>High Blood Pressure</li>
            <li>Ear Nose and Throat Problems</li>
          </ul>
          <ul>
            <li>Intestinal Disease</li>
            <li>Migranes</li>
            <li>Cataracts</li>
            <li>Cancer</li>
            <li>Sleep Apnea</li>
          </ul>
          <ul>
            <li>Stroke</li>
            <li>Glaucoma</li>
            <li>Lazy Eye</li>
            <li>Heart Conditions</li>
            <li>Asthma</li>
          </ul>
          <ul>
            <li>HIV</li>
            <li>Diabetes</li>
            <li>Arthritis</li>
            <li>Thyroid Disease</li>
            <li>Lung Disease</li>
          </ul>
        </div>
        <RadioGroup
          row
          className={styles.centerAligned}
          id="vision-intake-healthinfo"
          onChange={(e) =>
            dispatch(
              SET_SAVE_VISION_INTAKE_PAYLOAD({
                key: "HaveAnyPastOrCurrentDisease",
                value: e.target.value === "true",
              })
            )
          }
          value={
            saveVisionIntakePayload?.HaveAnyPastOrCurrentDisease == null
              ? ""
              : saveVisionIntakePayload?.HaveAnyPastOrCurrentDisease
              ? "true"
              : "false"
          }
        >
          <FormControlLabel
            classes={{
              label: styles.radioButtonLabel,
              root: styles.radioButton,
            }}
            value={"true"}
            control={<Radio size="small" />}
            label="Yes"
            disabled={viewMode}
          />
          <FormControlLabel
            classes={{
              label: styles.radioButtonLabel,
              root: styles.radioButton,
            }}
            value={"false"}
            control={<Radio size="small" />}
            label="No"
            disabled={viewMode}
          />
        </RadioGroup>
        {formMappedErrors.HaveAnyPastOrCurrentDisease?.error && (
          <p className={"errorMessage"}>
            {formMappedErrors?.HaveAnyPastOrCurrentDisease?.message}
          </p>
        )}
      </div>
      <div className={styles.formFooter}>
        <button
          className={styles.prevBtn}
          onClick={() =>
            dispatch(
              CHANGE_STEP({
                currentStep: activeStep,
                newStep: activeStep - 1,
                type: "prev",
              })
            )
          }
        >
          Back
        </button>
        <button className={styles.nextBtn} onClick={handleNextBtn}>
          Continue
        </button>
      </div>
    </div>
  );
}

function FourthStep({
  setModalOpen,
  setModalInner,
  viewMode,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalInner: Dispatch<SetStateAction<ReactNode | ReactNode[]>>;
} & VisionIntakeRemoteTypes) {
  const formMappedErrors = useAppSelector((state) =>
    GetVisionFormErrors(state)
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const containerRef = useRef<HTMLDivElement>(null);
  const { activeStep, saveVisionIntakePayload } = useAppSelector(
    (state) => state.visionIntake
  );

  const handleNextBtn = async () => {
    if (viewMode) {
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );
      return;
    }
    try {
      if (!containerRef.current || !saveVisionIntakePayload) return;

      // Validation logic
      const { HaveAnyCurrentSymptoms } = saveVisionIntakePayload;
      dispatch(
        SET_FORM_ERROR({
          action: HaveAnyCurrentSymptoms == null ? "add" : "remove",
          key: "HaveAnyCurrentSymptoms",
          error: HaveAnyCurrentSymptoms == null,
        })
      );

      if (HaveAnyCurrentSymptoms == null) return;

      if (saveVisionIntakePayload?.HaveAnyCurrentSymptoms) {
        const modalInner = VisionIntakeModalInner({
          index: 3,
          handleBackBtn() {
            router.replace("/");
          },
          handleNextBtn() {
            router.replace("/schedule-exam/");
          },
        });
        setModalInner(modalInner);
        setModalOpen(true);
        return;
      }
      const file = await exportComponentToPDF(containerRef.current);
      dispatch(SET_FILE_ELEMENT({ index: 3, file }));
      dispatch(
        CHANGE_STEP({
          currentStep: activeStep,
          newStep: activeStep + 1,
          type: "next",
        })
      );
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  return (
    <div className={styles.formStepContainer} ref={containerRef}>
      <p className={styles.formTitle}>HEALTH INFORMATION (continued)</p>
      <div className={styles.formInput}>
        <label
          htmlFor="vision-intake-healthinfo-continued"
          className={styles.boldLabel}
        >
          Are you currently experiencing any of the following: *
        </label>
        <div className={styles.gridCols3}>
          <ul>
            <li>Irritated eyes?</li>
            <li>Pain in and around your eyes?</li>
            <li>Headaches?</li>
            <li>Do you have green, or yellow, brown discharge?</li>
          </ul>
          <ul>
            <li>Feel a foreign body sensation?</li>
            <li>New/Sudden onset double vision?</li>
            <li>New or sudden change in floaters?</li>
            <li>Do your eyelashes stick together?</li>
          </ul>
          <ul>
            <li>Red eyes?</li>
            <li>Flashes of light?</li>
            <li>
              Occasional blurring or fluctuating vision which clears upon
              blinking?
            </li>
          </ul>
        </div>
        <RadioGroup
          row
          className={styles.centerAligned}
          id="vision-intake-healthinfo-continued"
          onChange={(e) =>
            dispatch(
              SET_SAVE_VISION_INTAKE_PAYLOAD({
                key: "HaveAnyCurrentSymptoms",
                value: e.target.value === "true",
              })
            )
          }
          value={
            saveVisionIntakePayload?.HaveAnyCurrentSymptoms == null
              ? ""
              : saveVisionIntakePayload?.HaveAnyCurrentSymptoms
              ? "true"
              : "false"
          }
        >
          <FormControlLabel
            classes={{
              label: styles.radioButtonLabel,
              root: styles.radioButton,
            }}
            value={"true"}
            control={<Radio size="small" />}
            label="Yes"
            disabled={viewMode}
          />
          <FormControlLabel
            classes={{
              label: styles.radioButtonLabel,
              root: styles.radioButton,
            }}
            value={"false"}
            control={<Radio size="small" />}
            label="No"
            disabled={viewMode}
          />
        </RadioGroup>
        {formMappedErrors.HaveAnyCurrentSymptoms?.error && (
          <p className={"errorMessage"}>
            {formMappedErrors?.HaveAnyCurrentSymptoms?.message}
          </p>
        )}
      </div>
      <div className={styles.formFooter}>
        <button
          className={styles.prevBtn}
          onClick={() =>
            dispatch(
              CHANGE_STEP({
                currentStep: activeStep,
                newStep: activeStep - 1,
                type: "prev",
              })
            )
          }
        >
          Back
        </button>
        <button className={styles.nextBtn} onClick={handleNextBtn}>
          Continue
        </button>
      </div>
    </div>
  );
}

function FifthStep({
  setModalOpen,
  setModalInner,
  viewMode,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalInner: Dispatch<SetStateAction<ReactNode | ReactNode[]>>;
} & VisionIntakeRemoteTypes) {
  const canvasRef = useRef<SignatureCanvas>(null);
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const formMappedErrors = useAppSelector((state) =>
    GetVisionFormErrors(state)
  );
  const dispatch = useAppDispatch();
  const router = useRouter();
  const containerRef = useRef<HTMLDivElement>(null);
  const hippaRef = useRef<HTMLDivElement>(null);
  const { isBottom } = useDetectScrolledToBottom(hippaRef);
  const { showSnackBar } = useSnackBar();
  const { activeStep, saveVisionIntakePayload, files, Hipaa, authData } =
    useAppSelector((state) => state.visionIntake);
  const [hipaaHTMLError, setHipaaHTMLError] = useState(false);
  const [hippaSignError, setHippaSignError] = useState(false);

  const [saveVisionIntake] = useSaveVisionIntakeMutation();
  const { data } = useGetConsentFormCheckboxesQuery(
    {},
    {
      skip: viewMode,
    }
  );
  const [hasScrolledToBottom, setHasScrolledToBottom] = useState(false);
  const [scrollError, setScrollError] = useState(false);

  useEffect(() => {
    if (isBottom && !hasScrolledToBottom) {
      setHasScrolledToBottom(true);
    }
  }, [isBottom]);

  const handleNextBtn = async () => {
    // array of string of ids that have input checkboxes that need to be checked
    try {
      if (
        !containerRef.current ||
        !hippaRef.current ||
        hipaaHTMLError ||
        viewMode
      )
        return;

      const {
        CanSeeClearlyWithCurrentRx,
        DoesDrive,
        HaveAnyDryItchyTearyOrBurningEyes,
      } = saveVisionIntakePayload;

      // Validation logic
      batch(() => {
        dispatch(
          SET_FORM_ERROR({
            action: CanSeeClearlyWithCurrentRx == null ? "add" : "remove",
            key: "CanSeeClearlyWithCurrentRx",
            error: CanSeeClearlyWithCurrentRx == null,
          })
        );
        dispatch(
          SET_FORM_ERROR({
            action: DoesDrive == null ? "add" : "remove",
            key: "DoesDrive",
            error: DoesDrive == null,
          })
        );
        dispatch(
          SET_FORM_ERROR({
            action:
              HaveAnyDryItchyTearyOrBurningEyes == null ? "add" : "remove",
            key: "HaveAnyDryItchyTearyOrBurningEyes",
            error: HaveAnyDryItchyTearyOrBurningEyes == null,
          })
        );
      });

      if (
        CanSeeClearlyWithCurrentRx == null ||
        DoesDrive == null ||
        HaveAnyDryItchyTearyOrBurningEyes == null
      )
        return;

      const modalInner = VisionIntakeModalInner({
        index: 4,
        handleBackBtn() {
          router.replace("/");
        },
        handleNextBtn() {
          router.replace("/schedule-exam/");
        },
      });

      if (!CanSeeClearlyWithCurrentRx) {
        setModalInner(modalInner);
        setModalOpen(true);
        return;
      }

      // Signature is present or not validation
      if (canvasRef?.current?.isEmpty()) {
        setHippaSignError(true);
        return;
      } else {
        setHippaSignError(false);
      }

      // check if hipaa scrolled to bottom
      if (!hasScrolledToBottom) {
        setScrollError(true);
        return;
      } else {
        setScrollError(false);
      }

      // hipaa checkboxes
      const checkboxInputs = hippaRef.current.querySelectorAll(
        "input[type=checkbox]"
      );
      const Checkboxes: SaveVisionIntakeRequest["data"]["Checkboxes"] = [];
      checkboxInputs.forEach((input) => {
        Checkboxes.push({
          name: input.id,
          value: (input as HTMLInputElement).checked,
        });
      });

      const recaptchaToken = (await fetchRecaptchaToken("submit")) || "";
      const pdfBase64 = await generateVisionIntakeFormPDF(
        files,
        containerRef.current
      );
      const response = await saveVisionIntake({
        data: {
          ...saveVisionIntakePayload,
          Checkboxes,
        },
        file: pdfBase64.split(",")[1],
        recaptchaToken,
      }).unwrap();

      if (response.Result) {
        showSnackBar(response.SuccessMessage, "success");
        dispatch(
          SET_VISION_INTAKE_PROPERTY({
            key: "formState",
            value: "currentPrescription",
          })
        );
      }
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  useEffect(() => {
    const container = hippaRef.current;

    if (container) {
      // Find all input elements inside the container
      const inputs = container.querySelectorAll("input");
      // Attach onChange event to each input element
      inputs.forEach((input) => {
        const mandatoryCheckboxes = data?.Result || [];
        if (mandatoryCheckboxes.includes(input.id)) {
          // mark input as checked
          input.checked = true;
        }

        if (input.type === "text" && input.id === "patconsentname") {
          input.value = `${authData?.FirstName} ${authData?.LastName}`;
          input.disabled = true;
        }

        input.addEventListener("input", handleChange);
      });

      // Cleanup: Remove event listeners when component unmounts
      return () => {
        inputs.forEach((input) => {
          input.removeEventListener("input", handleChange);
        });
      };
    }
  }, [hippaRef.current, data?.Result, authData?.FirstName, authData?.LastName]);

  const handleChange = (event: Event) => {
    const mandatoryCheckboxes = data?.Result || [];
    const hipaaHtml = hippaRef.current;
    if (!hipaaHtml) return;
    const target = event.target as HTMLInputElement;
    if (
      target.type === "checkbox" &&
      !target.checked &&
      mandatoryCheckboxes.includes(target.id)
    ) {
      (
        hipaaHtml.querySelector(`#${target.id}`) as HTMLInputElement
      ).style.boxShadow = "0 0 0 2px red";
      setHipaaHTMLError(true);
    } else {
      (
        hipaaHtml.querySelector(`#${target.id}`) as HTMLInputElement
      )?.style.removeProperty("box-shadow");
      setHipaaHTMLError(false);
    }
  };

  return (
    <div className={styles.formStepContainer} ref={containerRef}>
      <p className={styles.formTitle}>SOCIAL INFORMATION</p>
      <div className={styles.formInputsParent}>
        <div className={styles.formLeft}>
          <div className={styles.formInput}>
            <label htmlFor="vision-intake-contactlenses">Do you drive? *</label>
            <RadioGroup
              className={styles.radioGroup}
              row
              id="vision-intake-contactlenses"
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "DoesDrive",
                    value: e.target.value === "true",
                  })
                )
              }
              value={
                saveVisionIntakePayload?.DoesDrive == null
                  ? ""
                  : saveVisionIntakePayload?.DoesDrive
                  ? "true"
                  : "false"
              }
            >
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="true"
                control={<Radio size="small" />}
                label="Yes"
                disabled={viewMode}
              />
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="false"
                control={<Radio size="small" />}
                label="No"
                disabled={viewMode}
              />
            </RadioGroup>
            {formMappedErrors.DoesDrive?.error && (
              <p className={"errorMessage"}>
                {formMappedErrors?.DoesDrive?.message}
              </p>
            )}
          </div>
          <div className={styles.formInput}>
            <label htmlFor="vision-intake-contactlenses">
              While reading, using a computer, or watching TV, do you ever
              experience any of the following: dry, itchy, tearing, or burning
              eyes? *
            </label>
            <RadioGroup
              className={styles.radioGroup}
              row
              id="vision-intake-contactlenses"
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "HaveAnyDryItchyTearyOrBurningEyes",
                    value: e.target.value === "true",
                  })
                )
              }
              value={
                saveVisionIntakePayload?.HaveAnyDryItchyTearyOrBurningEyes ==
                null
                  ? ""
                  : saveVisionIntakePayload?.HaveAnyDryItchyTearyOrBurningEyes
                  ? "true"
                  : "false"
              }
            >
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="true"
                control={<Radio size="small" />}
                label="Yes"
                disabled={viewMode}
              />
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="false"
                control={<Radio size="small" />}
                label="No"
                disabled={viewMode}
              />
            </RadioGroup>
            {formMappedErrors.HaveAnyDryItchyTearyOrBurningEyes?.error && (
              <p className={"errorMessage"}>
                {formMappedErrors?.HaveAnyDryItchyTearyOrBurningEyes?.message}
              </p>
            )}
          </div>
        </div>
        <div className={styles.formRight}>
          <div className={styles.formInput}>
            <label htmlFor="vision-intake-contactlenses">
              Are you seeing clearly through your current prescription? *
            </label>
            <RadioGroup
              className={styles.radioGroup}
              row
              id="vision-intake-contactlenses"
              onChange={(e) =>
                dispatch(
                  SET_SAVE_VISION_INTAKE_PAYLOAD({
                    key: "CanSeeClearlyWithCurrentRx",
                    value: e.target.value === "true",
                  })
                )
              }
              value={
                saveVisionIntakePayload?.CanSeeClearlyWithCurrentRx == null
                  ? ""
                  : saveVisionIntakePayload?.CanSeeClearlyWithCurrentRx
                  ? "true"
                  : "false"
              }
            >
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="true"
                control={<Radio size="small" />}
                label="Yes"
                disabled={viewMode}
              />
              <FormControlLabel
                classes={{
                  label: styles.radioButtonLabel,
                  root: styles.radioButton,
                }}
                value="false"
                control={<Radio size="small" />}
                label="No"
                disabled={viewMode}
              />
            </RadioGroup>
            {formMappedErrors.CanSeeClearlyWithCurrentRx?.error && (
              <p className={"errorMessage"}>
                {formMappedErrors?.CanSeeClearlyWithCurrentRx?.message}
              </p>
            )}
          </div>
        </div>
      </div>

      {!viewMode && Hipaa && Hipaa.length > 0 && (
        <>
          <p className={styles.hipaaTitle}>Privacy Statement *</p>
          <div
            id="hippa-container"
            className={`${styles.hippaContainer} ${
              hipaaHTMLError && styles.hippaHTMLError
            }`}
            style={{ height: "400px" }}
            dangerouslySetInnerHTML={{
              __html: Buffer.from(Hipaa, "base64").toString(),
            }}
            ref={hippaRef}
          ></div>
          <div
            className={`${styles.canvasContainer} ${
              hippaSignError && styles.canvasError
            }`}
          >
            <SignatureCanvas
              ref={canvasRef}
              penColor="green"
              canvasProps={{
                width: 350,
                height: 200,
              }}
            />
            <IconButton
              onClick={() => canvasRef?.current?.clear()}
              className={styles.resetSignature}
              data-testid="reset-signature"
            >
              <Image
                src={ResetIcon}
                alt="reset-icon"
                height={20}
                width={20}
                className="resetsignature"
              />
            </IconButton>
          </div>
          {hipaaHTMLError && (
            <p className={`${styles.hipaaHTMLFooter} errorMessage`}>
              Some fields are required.
            </p>
          )}
          <p
            className={styles.hipaaFooter}
            style={{ color: scrollError ? "red" : "initial" }}
          >
            Please consent to the above statements and provide your signature.
          </p>
        </>
      )}
      <div className={styles.formFooter}>
        <button
          className={styles.prevBtn}
          onClick={() =>
            dispatch(
              CHANGE_STEP({
                currentStep: activeStep,
                newStep: activeStep - 1,
                type: "prev",
              })
            )
          }
        >
          Back
        </button>
        <button
          className={`${styles.nextBtn}`}
          onClick={handleNextBtn}
          disabled={viewMode}
          style={{
            cursor: viewMode ? "not-allowed" : "pointer",
          }}
        >
          Continue
        </button>
      </div>
    </div>
  );
}

/**
 *
 * @param index number
 * @param handleBackBtn Function for modals back button
 * @param handleNextBtn Function for modals next button
 * @param bothGlassesAndContacts boolean edge case for both glasses and contacts in second step
 * @param lastExamFourYearsAgo boolean edge case for last exam being 4 years ago in second step
 * @returns JSX.Element | undefined
 */
function VisionIntakeModalInner({
  index,
  handleBackBtn,
  handleNextBtn,
  bothGlassesAndContacts,
  lastExamFourYearsAgo,
  invalidState,
  surgeryDiseaseOrEyeDrop,
  invalidStateErrorMessage,
}: {
  index: number;
  handleBackBtn: () => void;
  handleNextBtn: () => void;
  bothGlassesAndContacts?: boolean;
  lastExamFourYearsAgo?: boolean;
  invalidState?: boolean;
  surgeryDiseaseOrEyeDrop?: boolean;
  invalidStateErrorMessage?: string;
}) {
  switch (index) {
    case 0:
      return (
        <div className={styles.modalInner}>
          <p>
            {invalidState
              ? invalidStateErrorMessage ?? ""
              : "You need to be wearing your glasses and/or contacts with the prescription you want to renew to continue with your renewal process."}
          </p>
          <div className={styles.buttons}>
            <button className={styles.backBtn} onClick={handleBackBtn}>
              {invalidState ? "Exit To Homepage" : "Book In-Store Exam Instead"}
            </button>
            <button className={styles.nextBtn} onClick={handleNextBtn}>
              {invalidState ? "Book In-Store Exam" : "I Have Them On Now"}
            </button>
          </div>
        </div>
      );
    case 1:
      return (
        <div className={styles.modalInner}>
          <p>
            {bothGlassesAndContacts &&
              "Prescription renewal is only valid if you have already worn either glasses and/or contact lenses. We encourage you to schedule an eye exam at one of our stores."}
            {lastExamFourYearsAgo &&
              `It's been too long since your last eye exam. We encourage you to
          schedule a comprehensive eye exam with one of our independent eye
          doctors in-store.`}
            {surgeryDiseaseOrEyeDrop &&
              `We are sorry, but you are not eligible for the online prescription renewal. You can schedule a comprehensive eye exam at one of our stores.`}
          </p>
          <div className={styles.buttons}>
            <button className={styles.backBtn} onClick={handleBackBtn}>
              Exit To Homepage
            </button>
            <button className={styles.nextBtn} onClick={handleNextBtn}>
              Book In-Store Exam
            </button>
          </div>
        </div>
      );
    case 2:
    case 3:
      return (
        <div className={styles.modalInner}>
          <p>
            We are sorry, but you are not eligible for the online prescription
            renewal. You can schedule a comprehensive eye exam at one of our
            stores.
          </p>
          <div className={styles.buttons}>
            <button className={styles.backBtn} onClick={handleBackBtn}>
              Exit To Homepage
            </button>
            <button className={styles.nextBtn} onClick={handleNextBtn}>
              Book In-Store Exam
            </button>
          </div>
        </div>
      );
    case 4:
      return (
        <div className={styles.modalInner}>
          <p>
            We are sorry, but you are not eligible for the online prescription
            renewal. You can schedule a comprehensive eye exam at one of our
            stores.
          </p>
          <div className={styles.buttons}>
            <button className={styles.backBtn} onClick={handleBackBtn}>
              Exit To Homepage
            </button>
            <button className={styles.nextBtn} onClick={handleNextBtn}>
              Book In-Store Exam
            </button>
          </div>
        </div>
      );
  }
}

export default function FormSwitcher({
  setModalOpen,
  setModalInner,
  patientId,
  viewMode,
  isPatient,
}: {
  setModalOpen: Dispatch<SetStateAction<boolean>>;
  setModalInner: Dispatch<SetStateAction<ReactNode | ReactNode[]>>;
} & VisionIntakeRemoteTypes) {
  const { activeStep } = useAppSelector((state) => state.visionIntake);

  return (
    <div className={styles.formContainer}>
      {activeStep === 0 && (
        <FirstStep
          setModalOpen={setModalOpen}
          setModalInner={setModalInner}
          patientId={patientId}
          viewMode={viewMode}
          isPatient={isPatient}
        />
      )}
      {activeStep === 1 && (
        <SecondStep
          setModalOpen={setModalOpen}
          setModalInner={setModalInner}
          patientId={patientId}
          viewMode={viewMode}
          isPatient={isPatient}
        />
      )}
      {activeStep === 2 && (
        <ThirdStep
          setModalOpen={setModalOpen}
          setModalInner={setModalInner}
          patientId={patientId}
          viewMode={viewMode}
          isPatient={isPatient}
        />
      )}
      {activeStep === 3 && (
        <FourthStep
          setModalOpen={setModalOpen}
          setModalInner={setModalInner}
          patientId={patientId}
          viewMode={viewMode}
          isPatient={isPatient}
        />
      )}
      {activeStep === 4 && (
        <FifthStep
          setModalOpen={setModalOpen}
          setModalInner={setModalInner}
          patientId={patientId}
          viewMode={viewMode}
          isPatient={isPatient}
        />
      )}
    </div>
  );
}
