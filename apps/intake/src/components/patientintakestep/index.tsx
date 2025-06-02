import { IntakePermission } from "@root/intake/src/constants/intake-permission.constant";
import { useSnackBar } from "@root/intake/src/context/SnackbarContext";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  CheckValidPatientIntakeStep,
  GetPatientIntakeFormForSubmit,
  GetPatientIntakeFormStep,
  GetPatientIntakeStepType,
  IsCurrentStepUpdated
} from "@root/host/src/store/reducer/intake.selector";
import {
  CHANGE_PATIENT_INTAKE_STEP,
  RESET_PATIENT_INTAKE_FORM,
  SET_PATIENT_INTAKE_ERRORS,
} from "@root/host/src/store/reducer/intake.slice";
import {
  useMarkIntakeFormAsCompleteMutation,
  useSavePatientIntakeFormAnonymousMutation,
  useSavePatientIntakeFormMutation,
} from "@root/host/src/store/reducer/intakeApi.slice";
import {
  ChangePatientIntakeStepActionType,
  PatientIntakeStepProps,
} from "@root/host/src/types/Intake.types";
import {
  ErrorResponseType,
  SavePatientIntakeFormResponse,
} from "@root/host/src/types/intakeApi.types";
import {
  exportComponentToPDF,
  generateIntermediateSaveIntakeFormPayload,
  validateIntakeStep,
} from "@root/host/src/utils/intake.utils";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { USER_TYPE } from "@root/host/src/constants/common.constants";
import * as appStore from "@root/host/src/store/useStore";
import { FC, memo, useMemo, useRef } from "react";
import Patientintakequestion from "../patientintakequestion";
import styles from "./PatientIntakeStep.module.scss";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import { RECAPTCHA_ACTION } from "@root/intake/src/constants/intake.constants";
import { useAppointmentConfirmationIntegration } from "@root/intake/src/hooks/useAppointmentConfirmationIntegration";

const PatientIntakeStep: FC<PatientIntakeStepProps> = ({ activeStep }) => {
  const { onBookEyeExamFlowIntegration } = useAppointmentConfirmationIntegration();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const isCDC = appStore.useAppSelector((state) => state.cdcView.data.isCDCView);
  const [canCompletePatientIntake] = appStore.useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [IntakePermission.COMPLETE_PATIENT_INTAKE],
    })
  ) as boolean[];
  const dispatch = useAppDispatch();
  const containerRef = useRef(null);
  const { showSnackBar } = useSnackBar();
  const sectionStep = useAppSelector((state) =>
    GetPatientIntakeFormStep({ ...state, activeStep })
  );
  const [saveIntakeForm] = useSavePatientIntakeFormMutation();
  const [saveIntakeFormAnonymous] = useSavePatientIntakeFormAnonymousMutation();
  const { hasNextStep, hasPreviousStep } = useAppSelector((state) =>
    CheckValidPatientIntakeStep({ ...state, activeStep })
  );

  const patientIntakeMetaData = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );

  const patientIntakeForm = useAppSelector(state => state.intake.patientIntakeForm)

  const steps = useAppSelector((state) => state.intake.patientIntakeForm);

  const isSecondLastStep = useMemo(() => {
    return (
      !patientIntakeMetaData.previewMode &&
      !patientIntakeForm.editing &&
      steps.activeStep === steps.steps.at(-1)?.index! - 1
    );
  }, [steps.activeStep, steps.steps, patientIntakeMetaData?.previewMode, patientIntakeForm.editing]);

  const parentQuestions = useMemo(() => {
    return sectionStep?.Questions?.filter(
      (question) => !question.ParentQuestionCode
    ).sort((a, b) => a.SequenceNumber - b.SequenceNumber);
  }, [sectionStep?.Questions]);

  const stepType = useAppSelector((state) =>
    GetPatientIntakeStepType({ ...state, activeStep })
  );
  const { previewMode, isAnonymous, encryptedAppointmentId } = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );
  const patientIntakeFormForSave = useAppSelector((state) =>
    GetPatientIntakeFormForSubmit({ ...state })
  );
  const IsCurrentStepModified = useAppSelector(
    (state) => IsCurrentStepUpdated({ ...state, activeStep })
  );

  const [markIntakeFormAsComplete] = useMarkIntakeFormAsCompleteMutation();

  const isPatient =
    patientIntakeMetaData.session?.authData?.userType === USER_TYPE.PATIENT;

  const isAssociate = patientIntakeMetaData.session?.authData?.userType === USER_TYPE.ASSOCIATE;

  const handleChangeStep = async (
    payload: ChangePatientIntakeStepActionType
  ) => {
    // TODO - Delete later
    const element = document.getElementById("patient-setup-container");
    if (payload.action === "Back") {
      dispatch(CHANGE_PATIENT_INTAKE_STEP(payload));

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
    const errors = validateIntakeStep(sectionStep!);
    dispatch(SET_PATIENT_INTAKE_ERRORS({ errors }));
    if (errors.length > 0) return;
    // Need to save the form at every step before moving onto the next one after theres not error
    try {
      const recaptchaToken = await fetchRecaptchaToken(RECAPTCHA_ACTION) || "";
      let result: SavePatientIntakeFormResponse;
      if (patientIntakeForm.editing && IsCurrentStepModified) {
        const payloadForSave = generateIntermediateSaveIntakeFormPayload(
          recaptchaToken,
          patientIntakeFormForSave
        );
        if (!payloadForSave) return;

        if (isAnonymous) {
          result = await saveIntakeFormAnonymous({
            encryptedAppointmentId: encryptedAppointmentId!,
            ...payloadForSave,
            isPatient,
          }).unwrap();
        } else {
          result = await saveIntakeForm({
            ...payloadForSave,
            isPatient,
          }).unwrap();
        }

        if (result.Error) {
          showSnackBar(
            result.Error.Message ?? ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            "error"
          );
          return;
        }
        showSnackBar(result.SuccessMessage, "success");
      }
      const file = await exportComponentToPDF(containerRef.current, true);
      dispatch(CHANGE_PATIENT_INTAKE_STEP({ ...payload, file }));

      if(element) {
        element.style.display = 'none';
        element.offsetHeight; // Trigger reflow
        element.style.display = 'flex';
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 10)
      }
    } catch (error) {
      showSnackBar(
        (error as ErrorResponseType)?.data?.Error?.Message ??
          ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        "error"
      );
    }
  };

  const handleMarkFormAsComplete = async () => {
    try {
      const recaptchaToken = await fetchRecaptchaToken(RECAPTCHA_ACTION) || "";
      const result = await markIntakeFormAsComplete({
        ...patientIntakeMetaData,
        isPatient,
        recaptchaToken,
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

  const canCompleteOrSubmit = () => {
    if(stepType === "HippaForms" || isSecondLastStep) {
      return !isAssociate || (isAssociate && !isCDC && canCompletePatientIntake);
    } else {
      return true;
    }
  }

  return (
    <div
      className={`${styles.patientStepContainer} ${
        previewMode && styles.patientIntakeStepModal
      }`}
    >
      <div className="page-break" ref={containerRef}>
        <h1 className="iris_table_heading">{sectionStep?.Text}</h1>
        <div
          data-section="pdf-section"
          className={styles.questionContainer}
          style={{
            display: "inline-grid",
            width: "100%",
            gridTemplateColumns:
              sectionStep?.ColumnCount === 1 ? "1fr" : "repeat(2, minmax(0, 1fr))",
            gap: "24px",
          }}
          ref={containerRef}
          data-patientstep='patientstep'
        >
          {parentQuestions?.map((question, index) => {
            return (
              <Patientintakequestion
                key={index}
                sectionCode={sectionStep?.Code!}
                question={question}
              />
            );
          })}
        </div>
      </div>
      <div className={styles.stepActions}>
        {hasPreviousStep ? (
          <button
            onClick={(_e) =>
              handleChangeStep({ action: "Back", newStepValue: activeStep - 1 })
            }
            data-testid="back-step-btn"
          >
            Back
          </button>
        ) : (
          <div></div>
        )}
        {hasNextStep && canCompleteOrSubmit() && (
          <button
            id={`next-step-btn-${activeStep}`}
            onClick={
              isSecondLastStep
                ? handleMarkFormAsComplete
                : (_e) =>
                    handleChangeStep({
                      action: "Next",
                      newStepValue: activeStep + 1,
                    })
            }
            data-testid="next-step-btn"
          >
            {stepType === "HippaForms" ? "Submit" : isSecondLastStep ? "Complete" : "Next"}
          </button>
        )}
      </div>
    </div>
  );
};

export default memo(PatientIntakeStep);
