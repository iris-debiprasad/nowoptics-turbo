import { StepperProps } from "@root/host/src/types/Intake.types";
import type { StepIconProps } from "@mui/material";
import Step from "@mui/material/Step";
import StepLabel from "@mui/material/StepLabel";
import Stepper from "@mui/material/Stepper";
import RadioCheckIcon from "@root/assets/Images/icons/radio_Check.svg";
import RadioUnCheckedIcon from "@root/assets/Images/icons/radio_uncheck.svg";
import Image from "next/image";
import { FC, memo } from "react";
import styles from "./CustomStepper.module.scss";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  CHANGE_PATIENT_INTAKE_STEP,
  SET_PATIENT_INTAKE_ERRORS,
} from "@root/host/src/store/reducer/intake.slice";
import { GetPatientIntakeFormStep } from "@root/host/src/store/reducer/intake.selector";
import { validateIntakeStep } from "@root/host/src/utils/intake.utils";
import { HIPPA_LABEL } from "@/constants/intake.constants";

const CustomIconComponent: FC<StepIconProps> = ({ completed }) => {
  const icons = {
    default: RadioUnCheckedIcon,
    completed: RadioCheckIcon,
  };
  return (
    <Image
      height={18}
      width={18}
      alt="step-icon"
      src={completed ? icons.completed : icons.default}
    />
  );
};

const CustomStepper: FC<StepperProps> = ({ steps, activeStep }) => {
  const dispatch = useAppDispatch();

  const sectionStep = useAppSelector((state) =>
    GetPatientIntakeFormStep({ ...state, activeStep })
  );

  const { editing } = useAppSelector((state) => state.intake.patientIntakeForm);
  const { previewMode, previewModeStateId } = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );

  const handleChangeStep = (index: number) => {
    if (!steps.find((step) => step.index === index)?.completed) return;
    const isHippaStep = steps.at(-1)?.index === activeStep;

    if (isHippaStep) {
      dispatch(
        CHANGE_PATIENT_INTAKE_STEP({
          action: "Jump",
          newStepValue: index,
        })
      );
      return;
    }
    const errors = validateIntakeStep(sectionStep!);
    dispatch(SET_PATIENT_INTAKE_ERRORS({ errors }));
    if (errors.length > 0) return;
    dispatch(
      CHANGE_PATIENT_INTAKE_STEP({
        action: "Jump",
        newStepValue: index,
      })
    );
  };

  return (
    <Stepper
      activeStep={activeStep}
      alternativeLabel
      className={styles.stepperContainer}
      id="patient-setup-container"
    >
      {steps.map(({ label, index, completed, active }, _index) => {
        const isJumpDisabled = !steps.find((step) => step.index === index)
          ?.completed;

        if (!previewMode && !editing && label === HIPPA_LABEL) return null;
        if (previewMode && previewModeStateId === -1 && label === HIPPA_LABEL)
          return null;
        return (
          <Step key={index} completed={completed} active={active}>
            <StepLabel
              onClick={() => handleChangeStep(index)}
              StepIconComponent={CustomIconComponent}
              classes={{
                label: styles.label,
                active: styles.activeLabel,
                completed: styles.completedLabel,
                iconContainer: styles.iconContainer,
                root: isJumpDisabled
                  ? styles.disabledLabel
                  : styles.enabledLabel,
              }}
            >
              {label}
            </StepLabel>
          </Step>
        );
      })}
    </Stepper>
  );
};

export default memo(CustomStepper);
