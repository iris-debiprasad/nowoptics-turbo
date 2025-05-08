import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetFormErrorByType,
  IsIntakeFormSpanish,
} from "@root/host/src/store/reducer/intake.selector";
import {
  DELETE_FORM_SECTION,
  TOGGLE_STEP_ACCORDION,
  UPDATE_SECTION_DESCRIPTION,
} from "@root/host/src/store/reducer/intake.slice";
import { AccordionStepProps } from "@root/host/src/types/Intake.types";
import { Tooltip } from "@mui/material";
import Accordion from "@mui/material/Accordion";
import AccordionDetails from "@mui/material/AccordionDetails";
import AccordionSummary from "@mui/material/AccordionSummary";
import IconButton from "@mui/material/IconButton";
import ArrowDownIcon from "@root/assets/Images/icons/arrow-down.svg";
import DeleteIcon from "@root/assets/Images/icons/delete.svg";
import type { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";
import Image from "next/image";
import {
  FC,
  FunctionComponent,
  MouseEvent,
  memo,
  useRef,
  useState,
} from "react";
import styles from "./AccordionStep.module.scss";
import { COMMON_INPUT_MAX_LENGTH } from "@root/intake/src/constants/intake.constants";
import  ConfirmationModal  from "@root/host/src/components/confirmationModal/ConfirmationModal";
import EditIcon from "@root/assets/Images/icons/editProfileIcon.svg";
import { useGetLanguageTypesQuery } from "@root/host/src/store/reducer/intakeApi.slice";

const AccordionStep: FunctionComponent<AccordionStepProps> = ({
  children,
  SectionIndex,
  index,
  title,
  Expanded,
}) => {
  const stepRefInput = useRef<HTMLInputElement>(null);
  const [open, setOpen] = useState(false);
  const dispatch = useAppDispatch();
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );

  const stepDescriptionError = useAppSelector((state) =>
    GetFormErrorByType({
      ...state,
      SectionIndex,
      type: "Section",
      field: "SectionDescription",
    })
  );

  const handleDeleteStep = () => {
    dispatch(DELETE_FORM_SECTION({ SectionIndex }));
    setOpen(false);
  };

  const handleDialogOpen = (e: MouseEvent<HTMLButtonElement>) => {
    e.stopPropagation();
    setOpen(true);
  };

  const handleCancel = () => setOpen((open) => !open);

  const handleUpdateDescription = (value: string) => {
    dispatch(
      UPDATE_SECTION_DESCRIPTION({
        SectionIndex,
        value,
      })
    );
  };

  const handleToggleAccordion = (Expanded: boolean) => {
    dispatch(TOGGLE_STEP_ACCORDION({ SectionIndex, Expanded }));
  };

  return (
    <>
      <Accordion
        classes={{ root: styles.accordionRoot }}
        expanded={Expanded}
        onChange={(_, expanded) => handleToggleAccordion(expanded)}
      >
        <AccordionSummary
          classes={{
            content: styles.accordionSummary,
            root: styles.summaryRoot,
          }}
          expandIcon={
            <Image
              height={14}
              width={14}
              src={ArrowDownIcon}
              alt="drop-down-icon"
            />
          }
        >
          <div>
            <span aria-label="step-label">Step {index}</span>
            <div className={styles.stepInputContainer}>
              <input
                type="text"
                aria-label="step-title-input"
                placeholder="Enter step title"
                value={title}
                className={`${
                  !!stepDescriptionError?.errorMessage && styles.errorInput
                }`}
                onClick={(e) => e.stopPropagation()}
                onChange={(e) => handleUpdateDescription(e.target.value)}
                maxLength={COMMON_INPUT_MAX_LENGTH}
                size={title.length === 0 ? 12 : title.length}
                ref={stepRefInput}
              />
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  stepRefInput.current?.focus();
                }}
              >
                <Image src={EditIcon} alt="edit-icon" height={15} width={15} />
              </IconButton>
            </div>
            {stepDescriptionError?.errorMessage && (
              <span
                className={`${styles.stepErrorTitle} errorMessage`}
                data-section={SectionIndex}
              >
                {stepDescriptionError?.errorMessage}
              </span>
            )}
          </div>
          <Tooltip title="Delete Step">
            <IconButton
              onClick={handleDialogOpen}
              data-testid="delete-step-button"
              disabled={isSpanishIntake}
            >
              <Image
                height={18}
                width={18}
                src={DeleteIcon}
                alt="delete-icon"
              />
            </IconButton>
          </Tooltip>
        </AccordionSummary>
        <AccordionDetails className={styles.accordionDetails}>
          {children ? children : null}
        </AccordionDetails>
      </Accordion>

      <ConfirmationModal
        content="Do you want to delete the step?"
        open={open}
        handleClose={handleCancel}
        performAction={handleDeleteStep}
        Id={1}
        btnOneText="CANCEL"
        btnTwoText="YES"
      />
    </>
  );
};

export default memo(AccordionStep);
