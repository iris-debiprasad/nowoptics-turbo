import Stepper from "@mui/material/Stepper";
import Step from "@mui/material/Step";
import styles from "./FormStepper.module.scss";
import { useAppSelector } from "@/store/useStore";

const FormStepper = () => {
  const activeStep = useAppSelector((state) => state.visionIntake.activeStep);
  const steps = useAppSelector((state) => state.visionIntake.steps);
  return (
    <Stepper activeStep={activeStep} classes={{ root: styles.stepperRoot }}>
      {steps.slice(0, -1).map((step) => (
        <Step className={styles.stepContainer} key={step.index}>
          <div
            className={`${styles.stepperDot} ${
              step.completed && styles.completedStep
            }`}
          ></div>
        </Step>
      ))}
    </Stepper>
  );
};

export default FormStepper;
