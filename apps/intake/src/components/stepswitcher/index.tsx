import { useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetPatientIntakeStepType,
} from "@root/host/src/store/reducer/intake.selector";
import { StepSwitcherProps } from "@root/host/src/types/Intake.types";
import { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";
import dynamic from "next/dynamic";
import {
  FC,
  FunctionComponent,
  useEffect,
  useMemo,
  useState
} from "react";
import Patientintakehippa from "../patientintakehippa";
import Patientintakeinformation from "../patientintakeinformation";
import PatientIntakeStep from "../patientintakestep";
const ConfirmationModal = dynamic(() => import("host/ConfirmationModal"), {
  ssr: false,
}) as FunctionComponent<ConfirmationModalProps>;

function sleep(ms : number) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

const StepSwitcher: FC<StepSwitcherProps> = ({ activeStep }) => {
  const [editConfirmModal, setEditConfirmModal] = useState(false);
  const [hasOpened, setHasOpened] = useState(false);
  const stepType = useAppSelector((state) =>
    GetPatientIntakeStepType({ ...state, activeStep })
  );
  const { form, steps, editing } = useAppSelector(
    (state) => state.intake.patientIntakeForm
  );

  // move user to the step last completed
  useEffect(() => {
    // Previous edit save modal will only show on the first step (Patient Information)
    if (
      form?.LastFilledSectionCode &&
        !editConfirmModal &&
        activeStep === 0 && !hasOpened && editing
    ) {
      setEditConfirmModal(true);
      setHasOpened(true);
    }
  }, [form, activeStep, editConfirmModal, hasOpened, editing]);

  const handleMoveStep = async () => {
    if(!form) return;
    const { LastFilledSectionCode, PatientIntakeForm : { IsCompleted } } = form;

    if(!LastFilledSectionCode || IsCompleted) return;

    const stepsToTraverse = steps.map(s => s.sectionCode);
    // traverse steps to find the last completed step until the last step is equal to LastFilledSectionCode
    for (let i = 0; i < stepsToTraverse.length; i++) {
      const nextButton = document.getElementById("next-step-btn-" + i);
      const isCurrentStepLastCompleted = stepsToTraverse[i] === LastFilledSectionCode;
      if(nextButton) {

        if(isCurrentStepLastCompleted) {
          nextButton.click();
          break;
        }

        nextButton.click();
        await sleep(1);

      }

    }
    setEditConfirmModal(false);
  };


  const stepComponent = useMemo(() => {

    switch (stepType) {
      case "PatientInformation":
        return (
          <Patientintakeinformation
            activeStep={activeStep}
          />
        );
      case "HippaForms":
        return (
          <Patientintakehippa
            activeStep={activeStep}
          />
        );
      case "GenericStep":
        return (
          <PatientIntakeStep
            activeStep={activeStep}
          />
        );
      default:
        return <></>;
    }
  }, [stepType, activeStep]);

  return (
    <>
      {stepComponent}{" "}
      <ConfirmationModal
        content="We have saved your previous progress, Would you like to continue where you left off?"
        open={editConfirmModal}
        handleClose={() => setEditConfirmModal(false)}
        performAction={() => handleMoveStep()}
        Id={1}
        btnOneText="No"
        btnTwoText="Yes"
      />
    </>
  );
};

export default StepSwitcher;
