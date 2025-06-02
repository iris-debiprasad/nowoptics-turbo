import { useSnackBar } from "@root/intake/src/context/SnackbarContext";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";

import {
  GetHippaFormStepErrors,
  GetIsPatientUnderAge,
  GetPatientInformationValue,
  GetPatientIntakeFormForSubmit,
  GetPatientIntakeHippa,
  GetPatientIntakeStepType,
} from "@root/host/src/store/reducer/intake.selector";
import {
  CHANGE_PATIENT_INTAKE_STEP,
  RESET_PATIENT_INTAKE_FORM,
  SET_PATIENT_INTAKE_ERRORS,
  UPDATE_GUARDIAN_INTIALS,
} from "@root/host/src/store/reducer/intake.slice";
import {
  useGetConsentFormCheckboxesQuery,
  useGetStateHippaFilePreviewQuery,
  useMarkIntakeFormAsCompleteMutation,
  useSavePatientIntakeFormAnonymousMutation,
  useSavePatientIntakeFormMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import {
  ChangePatientIntakeStepActionType,
  PatientIntakeHippaHtmlInput,
  PatientIntakeHippaProps,
  UpdateGuardianInitialsActionType,
} from "@root/host/src/types/Intake.types";
import {
  ErrorResponseType,
  SavePatientIntakeFormRequest,
  SavePatientIntakeFormResponse,
  SavePatientIntakeFormResult,
} from "@root/host/src/types/intakeApi.types";
import {
  generatePDFComponent,
  generateSaveIntakeFormPayloadForSubmit,
  validateHippaFormStep,
} from "@root/host/src/utils/intake.utils";
import IconButton from "@mui/material/IconButton";
import ResetIcon from "@root/assets/Images/icons/refresh.svg";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import Image from "next/image";
import {
  FC,
  memo,
  useEffect,
  useRef,
  useState,
  cloneElement,
  useCallback,
  useMemo,
} from "react";
import SignatureCanvas from "react-signature-canvas";
import styles from "./PatientIntakeHippa.module.scss";
import { useRouter } from "next/router";
import { Box, Button, Modal, TextField } from "@mui/material";
import { RECAPTCHA_ACTION } from "@root/intake/src/constants/intake.constants";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { useAppointmentConfirmationIntegration } from "@root/intake/src/hooks/useAppointmentConfirmationIntegration";

const PatientIntakeHippa: FC<PatientIntakeHippaProps> = ({ activeStep }) => {
  const { onBookEyeExamFlowIntegration } = useAppointmentConfirmationIntegration();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const router = useRouter();
  const { selfCheckingId } = router.query;
  const { showSnackBar } = useSnackBar();
  const [selfCheckingConfirm, setSelfCheckingConfirm] = useState(false)
  const editing = useAppSelector((state) => {
    return state.intake.patientIntakeForm.editing;
  });
  const hippaRef = useRef<HTMLDivElement>(null);
  const hippaElementRef = useRef<HTMLDivElement>(null);
  const files = useAppSelector((state) => state.intake.files);
  const hippa = useAppSelector((state) => GetPatientIntakeHippa({ ...state }));
  const canvasRef = useRef<SignatureCanvas>(null);
  const [inputsError, setInputsError] = useState(false);
  const patientIntakeForm = useAppSelector((state) =>
    GetPatientIntakeFormForSubmit({ ...state })
  );
  const hippaErrors = useAppSelector((state) =>
    GetHippaFormStepErrors({ ...state })
  );
  const isPatientUnderAge = useAppSelector((state) =>
    GetIsPatientUnderAge({ ...state })
  );
  const patientIntakeMetaData = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );

  const { formLanguage } = useAppSelector((state) => state.intake);

  const isPatient =
    patientIntakeMetaData.session?.authData?.userType === "Patient";
  const {
    isAnonymous,
    encryptedAppointmentId,
    previewModeStateId,
    previewMode,
  } = patientIntakeMetaData;

  const resetSignature = () => {
    canvasRef.current?.clear();
  };
  const [saveIntakeForm] = useSavePatientIntakeFormMutation();
  const [saveIntakeFormAnonymous] = useSavePatientIntakeFormAnonymousMutation();
  const [markIntakeFormAsComplete] = useMarkIntakeFormAsCompleteMutation();
  const dispatch = useAppDispatch();
  const stepType = useAppSelector((state) =>
    GetPatientIntakeStepType({ ...state, activeStep })
  );
  const formValues = useAppSelector((state) =>
    GetPatientInformationValue({ ...state })
  );

  const { data } = useGetConsentFormCheckboxesQuery({});
  const { data: statePreviewData } = useGetStateHippaFilePreviewQuery(
    {
      stateId: previewModeStateId,
      languageId: formLanguage!,
    },
    {
      skip: !previewMode,
      selectFromResult: ({ data, error, isLoading }) => {
        return {
          data:
            Buffer.from(
              data?.Result?.BlobFile?.FileContents || "",
              "base64"
            ).toString() ?? "",
          error,
          isLoading,
        };
      },
    }
  );
  const filteredCheckboxes = useMemo(() => {
    return data?.Result.filter((item) => {
      const element = document.querySelector(
        `input[name="${item}"]`
      ) as HTMLInputElement;
      return element != null;
    }) || [];
  }, [data?.Result]);

  const handleChangeStep = (payload: ChangePatientIntakeStepActionType) => {
    const element = document.getElementById("patient-setup-container");
    if(element) {
      element.style.display = 'none';
      element.offsetHeight; // Trigger reflow
      element.style.display = 'flex';
      setTimeout(() => {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }, 10)
    }
    dispatch(CHANGE_PATIENT_INTAKE_STEP(payload));
  };

  // Side effect will run when hippa html file is loaded
  useEffect(() => {
    const allInputs = document.querySelectorAll(
      "input"
    ) as NodeListOf<HTMLInputElement>;
    allInputs.forEach((c, index) => {
      const isNamePresent = filteredCheckboxes?.find((item) => item === c.name);
      if (c.type === "text" && c.id === "patconsentname") {
        c.value = formValues.FirstName + " " + formValues.LastName;
        c.disabled = true;
      }

      if (isNamePresent && c.parentElement && data) {
        c.checked = true;
        const checkboxParent = c.parentElement;
        const checkboxSibling = document.createElement("label");
        checkboxSibling.setAttribute("for", c.id);
        checkboxSibling.setAttribute("data-index", index.toString());
        checkboxParent?.prepend(checkboxSibling);
      }
    });
  }, [hippa, formValues, filteredCheckboxes]);

  useEffect(() => {
    filteredCheckboxes.forEach((c) => {
      // find the label with the name of the checkbox and the input associated with it
      const labelElement = document.querySelector(
        `label[for="${c}"]`
      ) as HTMLLabelElement;
      const inputElement = document.querySelector(
        `input[name="${c}"]`
      ) as HTMLInputElement;
      if (!inputElement) return;
      if (inputElement.checked === false) {
        labelElement.classList.add(styles.checkboxError);
      } else {
        labelElement.classList.remove(styles.checkboxError);
      }
    });
  }, [filteredCheckboxes]);

  const handleUpdateGuardianInputs = (
    payload: UpdateGuardianInitialsActionType
  ) => {
    dispatch(UPDATE_GUARDIAN_INTIALS(payload));
  };

  const handleSubmit = async () => {
    const element = document.getElementById("patient-setup-container");
    const recaptchaToken = await fetchRecaptchaToken(RECAPTCHA_ACTION) || "";
    if (hippaRef.current && editing) {
      const checkboxNames = filteredCheckboxes;
      // add error classes
      checkboxNames?.forEach((name) => {
        const input = document.querySelector(
          `input[name="${name}"]`
        ) as HTMLInputElement;
        const label = document.querySelector(
          `label[for="${name}"]`
        ) as HTMLLabelElement;
        if(!input || !label) return;
        if (input?.checked === false) {
          label?.classList.add(styles.checkboxError);
        } else {
          label?.classList.remove(styles.checkboxError);
        }
      })

      // check if all the names in checkboxNames are checked
      const checked = checkboxNames?.every((name) => {
        const input = document.querySelector(
          `input[name="${name}"]`
        ) as HTMLInputElement;
        if(!input) return;
        return input?.checked;
      });
      setInputsError(Boolean(!checked));
      if (!checked) return;
      const errors = validateHippaFormStep(
        canvasRef.current?.isEmpty()!,
        isPatientUnderAge,
        patientIntakeForm?.GuardianFirstName,
        patientIntakeForm?.GuardianLastName
      );
      dispatch(SET_PATIENT_INTAKE_ERRORS({ errors }));
      if (errors.length > 0) return;
      const checkboxPayload: SavePatientIntakeFormRequest["Checkboxes"] = [];
      // Get value of checkboxes from the hippa html
      if(hippaElementRef.current) {
        const checkboxElements = hippaElementRef.current.querySelectorAll(
          "input[type='checkbox']"
        ) as NodeListOf<HTMLInputElement>;
        checkboxElements?.forEach((checkbox) => {
          checkboxPayload.push({
            Name: checkbox.name,
            Value: checkbox.checked,
          });
        });
      }
      const pdfBase64 = await generatePDFComponent(files, hippaRef.current);
      const payload = generateSaveIntakeFormPayloadForSubmit(
        pdfBase64.split(",")[1],
        checkboxPayload,
        recaptchaToken,
        patientIntakeForm
      );

      if (!payload) return;
      let result: SavePatientIntakeFormResponse;
      try {
        if(element) {
          element.style.display = 'none';
          element.offsetHeight; // Trigger reflow
          element.style.display = 'flex';
          setTimeout(() => {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
          }, 10)
        }
        if (isAnonymous) {
          result = await saveIntakeFormAnonymous({
            encryptedAppointmentId: encryptedAppointmentId!,
            ...payload,
            isPatient,
          }).unwrap();
        } else {
          result = await saveIntakeForm({ ...payload, isPatient }).unwrap();
        }

        if (result.Error) {
          showSnackBar(
            result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            "error"
          );
          return;
        }
        if (selfCheckingId) {
          setSelfCheckingConfirm(true)
        } else {
          showSnackBar(result.SuccessMessage, "success");
          dispatch(RESET_PATIENT_INTAKE_FORM());
        }
      } catch (error) {
        showSnackBar(
          (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
      }

      return;
    }

    try {
      if(element) {
        element.style.display = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.display = 'flex';
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10)
      }
      const result = await markIntakeFormAsComplete({
        ...patientIntakeMetaData,
        isPatient,
        recaptchaToken
      }).unwrap();
      showSnackBar(result.SuccessMessage, "success");
      dispatch(RESET_PATIENT_INTAKE_FORM());
      onBookEyeExamFlowIntegration();
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
        ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  return (
    <>
      {previewMode ? (
        <>
          <div
            className={styles.previewHipaaFormContainer}
            dangerouslySetInnerHTML={{ __html: statePreviewData }}
          ></div>
          <div className={styles.stepActions}>
            <button
              onClick={(_e) =>
                handleChangeStep({
                  action: "Back",
                  newStepValue: activeStep - 1,
                })
              }
              data-testid="back-step-btn"
            >
              Back
            </button>
          </div>
        </>
      ) : (
        <>
          <div ref={hippaRef}>
            <div
              ref={hippaElementRef}
              className={styles.hippaFormContainer}
              dangerouslySetInnerHTML={{ __html: hippa }}
            ></div>
            {isPatientUnderAge && editing && (
              <div className={styles.guardianInputs}>
                <div>
                  <TextField
                    className={`${styles.textFieldClass}  ${
                      !editing && styles.greyInput
                    }`}
                    required
                    type="text"
                    value={patientIntakeForm?.GuardianFirstName}
                    error={!!hippaErrors.GuardianFirstName}
                    placeholder="Guardian First Name"
                    onChange={(e) =>
                      handleUpdateGuardianInputs({
                        type: "GuardianFirstName",
                        value: e.target.value,
                      })
                    }
                    disabled={!editing}
                  />
                  <span className="errorMessage">
                    {hippaErrors.GuardianFirstName}
                  </span>
                </div>
                <div>
                  <TextField
                    className={`${styles.textFieldClass}  ${
                      !editing && styles.greyInput
                    }`}
                    required
                    type="text"
                    placeholder="Guardian Last Name"
                    value={patientIntakeForm?.GuardianLastName}
                    error={!!hippaErrors.GuardianLastName}
                    onChange={(e) =>
                      handleUpdateGuardianInputs({
                        type: "GuardianLastName",
                        value: e.target.value,
                      })
                    }
                    disabled={!editing}
                  />
                  <span className="errorMessage">
                    {hippaErrors.GuardianLastName}
                  </span>
                </div>
              </div>
            )}
            {editing && (
              <div className={styles.signatureCanvasContainer}>
                <div className="signatureContainer">
                  <SignatureCanvas
                    ref={canvasRef}
                    penColor="green"
                    canvasProps={{
                      width: 350,
                      height: 200,
                      className: styles.signatureCanvas,
                    }}
                  />
                </div>
                <div>
                  <IconButton
                    onClick={resetSignature}
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
                  <p
                    className={`${styles.errorHippa} errorMessage`}
                    id="hippainputerror"
                  >
                    {inputsError && "*Please fill all the fields"}
                  </p>
                  <p className={`${styles.errorHippa} errorMessage`}>
                    {hippaErrors.Hippa}
                  </p>
                </div>
              </div>
            )}
          </div>
          <div className={styles.stepActions}>
            <button
              onClick={(_e) =>
                handleChangeStep({
                  action: "Back",
                  newStepValue: activeStep - 1,
                })
              }
              data-testid="back-step-btn"
            >
              Back
            </button>
            <button onClick={handleSubmit} data-testid="next-step-btn">
              {stepType === "HippaForms" && editing ? "Submit" : "Complete"}
            </button>
          </div>
          <Modal
            open={selfCheckingConfirm}
            aria-labelledby="modal-modal-title"
            aria-describedby="modal-modal-description"
          >
            <Box className={styles.modalWrapper}>
              <Box className={styles.modalInner}>
                <Box mt={3} className={styles.title}>
                  Thank you for completing your Medical Form. Please return the
                  tablet and we will begin your exam shortly.
                </Box>

                <Box mt={6} className={styles.action}>
                  <Button
                    className={styles.continueButton}
                    onClick={() => {
                      router.replace("/self-checkin");
                    }}
                  >
                    Continue
                  </Button>
                </Box>
              </Box>
            </Box>
          </Modal>
        </>
      )}
    </>
  );
};

export default memo(PatientIntakeHippa);
