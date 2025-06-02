import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetFormErrorByType,
  GetQuestionByIndex,
} from "@root/host/src/store/reducer/intake.selector";
import {
  UPDATE_FORM_ERRORS,
  UPDATE_QUESTION_PROPERTY,
} from "@root/host/src/store/reducer/intake.slice";
import { CheckboxModalProps } from "@root/host/src/types/Intake.types";
import { validateIntakeForm, validateQuestions } from "@root/host/src/utils/intake.utils";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@root/assets/Images/icons/close.svg";
import Image from "next/image";
import {
  ChangeEvent,
  FunctionComponent,
  memo,
  useEffect,
  useState,
} from "react";
import Input from "../common/input";
import styles from "./CheckboxModal.module.scss";

const CheckboxModal: FunctionComponent<CheckboxModalProps> = ({
  QuestionIndex,
  questions,
  setOpen,
  SectionIndex,
  childQuestions,
}) => {
  const dispatch = useAppDispatch();
  const [hasFormError, setHasFormError] = useState(false);
  const parentQuestion = useAppSelector((state) =>
    GetQuestionByIndex({ ...state, QuestionIndex, SectionIndex })
  );
  const currentSection = useAppSelector(
    (state) => state.intake.intakeForm.IntakeFormSections[SectionIndex!]
  );
  const recommendationToggles = useAppSelector(
    (state) => state.intake.intakeRecommendationToggles
  );

  const handleParentQuestionCode = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    dispatch(
      UPDATE_QUESTION_PROPERTY({
        SectionIndex: SectionIndex!,
        QuestionIndex: QuestionIndex!,
        key: "Code",
        value: e.target.value,
      })
    );
  };

  const handleSave = () => {
    const formErrors = validateQuestions(
      childQuestions,
      currentSection,
      recommendationToggles
    );
    dispatch(UPDATE_FORM_ERRORS({ formErrors }));
    if (formErrors.length > 0) setHasFormError(true);
    else {
      setHasFormError(false);
      setOpen(false);
    }
  };

  useEffect(() => {
    if (childQuestions.length === 0) setOpen(false);

    return () => {
      setHasFormError(false);
    }
  }, [childQuestions, setOpen]);

  return (
    <div>
      <div className={styles.modalHeader}>
        <span>Child Questions For Code </span>
        <Input
          placeholder="EH-02"
          value={parentQuestion?.Code}
          onChange={handleParentQuestionCode}
        />
        <IconButton
          onClick={handleSave}
          className={styles.closeBtn}
          aria-label="close-icon-button"
          disabled={hasFormError}
        >
          <Image height={14} width={14} src={CloseIcon} alt="close" />
        </IconButton>
      </div>
      <div className={styles.modalBody}>{questions}</div>
      <div className={styles.modalFooter}>
        <button
          data-testid="modal-cancel-button"
          onClick={handleSave}
          disabled={hasFormError}
        >
          Cancel
        </button>
        <button onClick={handleSave}>Save</button>
      </div>
    </div>
  );
};

export default memo(CheckboxModal);
