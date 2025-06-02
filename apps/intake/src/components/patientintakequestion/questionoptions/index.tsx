import Select from "@root/intake/src/components/common/select";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetPatientIntakeChildQuestions,
  GetPatientIntakeStepErrors,
} from "@root/host/src/store/reducer/intake.selector";
import { UPDATE_PATIENT_INTAKE_OPTION } from "@root/host/src/store/reducer/intake.slice";
import { QuestionOptionsProps, QuestionTypeEnum } from "@root/host/src/types/Intake.types";
import { FC, memo, useCallback, useMemo } from "react";
import Patientintakequestion from "..";
import Questionoptionitem from "../questionoptionitem";
import styles from "./QuestionOptions.module.scss";

const QuestionOptions: FC<QuestionOptionsProps> = ({
  sectionCode,
  question,
}) => {
  const dispatch = useAppDispatch();
  const { previewMode } = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );
  const key = previewMode ? "previewIntakeForm" : "patientIntakeForm";
  const editing = useAppSelector((state) => state.intake[key].editing);
  const isDropdown = question?.Type === QuestionTypeEnum.DROPDOWN;
  const isCheckbox = question?.Type === QuestionTypeEnum.CHECKBOX_LIST;
  const selectedOption = useMemo(() => {
    return question.QuestionOptions.find(o => o.Code === question?.AnswerValue);
  }, [question.QuestionOptions, question?.AnswerValue]);
  const questionErrors = useAppSelector((state) =>
    GetPatientIntakeStepErrors({
      ...state,
      sectionCode,
      questionCode: question?.Code,
    })
  );

  const errorElements = (
    <>
      {Object.entries(questionErrors).map(([key, value], index) => {
        return (
          <p key={index} className={`${styles.spanError} errorMessage`}>
            {value}
          </p>
        );
      })}
    </>
  );

  const childQuestions = useAppSelector((state) =>
    GetPatientIntakeChildQuestions({
      ...state,
      sectionCode,
      parentQuestionCode: question?.Code,
      parentOptionCode: selectedOption?.Code!,
    })
  );

  const handleSelectDropdownChange = useCallback(
    (optionCode: string) => {
      dispatch(
        UPDATE_PATIENT_INTAKE_OPTION({
          questionCode: question?.Code,
          sectionCode,
          optionCode,
          value: optionCode,
        })
      );
    },
    [sectionCode, question?.Code, dispatch]
  );

  return (
    <>
      {!isDropdown ? (
        <div className={styles.multiOptionGrid} data-option="pdf-multi-option">
          {question.QuestionOptions?.map((option, index) => {
            return (
              <Questionoptionitem
                key={index}
                option={option}
                question={question}
                sectionCode={sectionCode}
              />
            );
          })}
        </div>
      ) : (
        <Select
          displayEmpty
          renderValue={(selected) =>
            question.QuestionOptions.find((o) => o.Code === selected)?.Text ||
            "Select an option"
          }
          options={question.QuestionOptions.filter(
            (s) => !s.Code.endsWith("None1")
          ).map((o) => {
            return {
              label: o.Text,
              value: o.Code,
            };
          })}
          placeholder="Select an option"
          fullWidth
          value={selectedOption?.Code}
          disabled={!editing}
          onChange={(e) => handleSelectDropdownChange(e.target.value as string)}
        />
      )}
      {errorElements}
      {!isCheckbox &&
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
    </>
  );
};

export default memo(QuestionOptions);
