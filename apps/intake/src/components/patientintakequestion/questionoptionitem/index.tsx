import Checkbox from "@root/intake/src/components/common/checkbox";
import Radio from "@root/intake/src/components/common/radio";
import { useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetPatientIntakeChildQuestions,
  GetPatientIntakeEditing,
} from "@root/host/src/store/reducer/intake.selector";
import { UPDATE_PATIENT_INTAKE_OPTION } from "@root/host/src/store/reducer/intake.slice";
import {
  QuestionOptionItemProps,
  QuestionTypeEnum,
} from "@root/host/src/types/Intake.types";
import { FC, memo, useMemo } from "react";
import { useDispatch } from "react-redux";
import Patientintakequestion from "..";
import styles from "../questionoptions/QuestionOptions.module.scss";

const QuestionOptionItem: FC<QuestionOptionItemProps> = ({
  question,
  option,
  sectionCode,
}) => {
  const dispatch = useDispatch();
  const editing = useAppSelector((state) =>
    GetPatientIntakeEditing({ ...state })
  );

  const isRadio = question?.Type === QuestionTypeEnum.RADIOLIST;
  const isCheckbox = question?.Type === QuestionTypeEnum.CHECKBOX_LIST;

  const isOptionSelected = useMemo(() => {
    if (isRadio) return question?.AnswerValue === option.Code;
    if (isCheckbox) {
      const answerOptions = question?.AnswerValue?.split(",");
      return answerOptions?.includes(option.Code);
    }
    return false;
  }, [isRadio, isCheckbox, option.Code, question?.AnswerValue]);

  const isNoneSelected = useMemo(() => {
    if(isCheckbox) {
      const answerOptions = question?.AnswerValue?.split(",");
      return answerOptions?.some(op => op.endsWith("None1"));
    }
    return false;
  }, [isCheckbox, question?.AnswerValue])

  const isSelectedOptionNone = useMemo(() => {
    return option.Code.endsWith("None1");
  }, [option.Code]);

  const handleChange = () => {
    // If none is selected and the current option is not none, then return
    if(isNoneSelected && !isSelectedOptionNone) return;
    dispatch(
      UPDATE_PATIENT_INTAKE_OPTION({
        optionCode: option.Code,
        questionCode: question?.Code,
        sectionCode: sectionCode,
        value: option.Code,
        remove : isOptionSelected
      })
    );
  };

  const childQuestions = useAppSelector((state) =>
    GetPatientIntakeChildQuestions({
      ...state,
      sectionCode,
      parentQuestionCode: question?.Code,
      parentOptionCode: option?.Code!,
    })
  );

  const optionProps = {
    className: `${styles.singleOptionContainer} ${isNoneSelected && !isSelectedOptionNone && styles.disabledDiv}`,
    onClick: !editing ? undefined : handleChange,
    "data-testid": "multi-option-container",
  };

  return (
    <>
      {isRadio && (
        <div {...optionProps}>
          <Radio checked={isOptionSelected} />
          <span className={styles.optionText}>{option?.Text}</span>
        </div>
      )}
      {isCheckbox && (
        <div className={styles.checkboxParentContainer}>
          <div {...optionProps}>
            <Checkbox checked={isOptionSelected} />
            <span className={styles.optionText}>{option?.Text}</span>
          </div>
          {isOptionSelected &&
            childQuestions &&
            childQuestions.map((question, index) => {
              return (
                <Patientintakequestion
                  key={index}
                  question={question}
                  sectionCode={sectionCode}
                />
              );
            })}
        </div>
      )}
    </>
  );
};

export default memo(QuestionOptionItem);
