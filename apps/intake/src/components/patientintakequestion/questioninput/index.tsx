import DateInput from "@root/intake/src/components/common/dateinput";
import Input from "@root/intake/src/components/common/input";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetPatientIntakeColumnCount,
  GetPatientIntakeEditing,
  GetPatientIntakeStepErrors,
} from "@root/host/src/store/reducer/intake.selector";
import { UPDATE_PATIENT_INTAKE_OPTION } from "@root/host/src/store/reducer/intake.slice";
import {
  QuestionInputProps,
  QuestionTypeEnum,
} from "@root/host/src/types/Intake.types";
import dayjs from "dayjs";
import { ChangeEvent, FC, memo, useCallback, useMemo } from "react";
import Questionoptions from "../questionoptions";
import styles from "./QuestionInput.module.scss";

const QuestionInput: FC<QuestionInputProps> = ({ sectionCode, question }) => {
  const dispatch = useAppDispatch();
  const columnCount = useAppSelector(state => GetPatientIntakeColumnCount({ ...state, sectionCode }))
  const editing = useAppSelector((state) =>
    GetPatientIntakeEditing({ ...state })
  );
  const questionErrors = useAppSelector((state) =>
    GetPatientIntakeStepErrors({
      ...state,
      sectionCode,
      questionCode: question?.Code,
    })
  );
  const handleTextChange = useCallback(
    ({
      target: { value },
    }: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>) => {
      dispatch(
        UPDATE_PATIENT_INTAKE_OPTION({
          questionCode: question?.Code,
          sectionCode,
          value,
        })
      );
    },
    [sectionCode, question?.Code, dispatch]
  );

  const handleDateChange = useCallback(
    (date: dayjs.Dayjs | null) => {
      if (!date) return;
      dispatch(
        UPDATE_PATIENT_INTAKE_OPTION({
          questionCode: question?.Code,
          sectionCode,
          value: date,
        })
      );
    },
    [sectionCode, question?.Code, dispatch]
  );

  const errorElements = useMemo(() => {
    return (
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
  }, [questionErrors]);

  const isHalfWidthInput = useMemo(() => {
    switch (question?.Type) {
      case QuestionTypeEnum.DROPDOWN:
      case QuestionTypeEnum.DATE_AND_TIME:
      case QuestionTypeEnum.DATE:
      case QuestionTypeEnum.EMAIL:
      case QuestionTypeEnum.NUMBER:
      case QuestionTypeEnum.TEXT_AREA:
      case QuestionTypeEnum.TEXT:
        return columnCount === 1 || question.ParentQuestionCode !== null;
      default:
        return false;
    }
  }, [question?.Type]);

  const renderQuestionInput = useMemo(() => {
    switch (question?.Type) {
      case QuestionTypeEnum.TEXT:
      case QuestionTypeEnum.TEXT_AREA:
      case QuestionTypeEnum.EMAIL:
      case QuestionTypeEnum.NUMBER:
        return (
          <>
            <Input
              value={question?.AnswerValue}
              onChange={handleTextChange}
              fullWidth
              disabled={!editing}
              placeholder="Enter an answer"
            />
            {errorElements}
          </>
        );
      case QuestionTypeEnum.DATE:
        return (
          <>
            <DateInput
              fullWidth
              value={dayjs(question?.AnswerValue)}
              onChange={handleDateChange}
              disabled={!editing}
              placeholder="Enter a date"
              enableKeyBoardInput
            />
            {errorElements}
          </>
        );
      case QuestionTypeEnum.DATE_AND_TIME:
        return (
          <>
            <DateInput
              fullWidth
              value={dayjs(question?.AnswerValue)}
              onChange={handleDateChange}
              disabled={!editing}
              placeholder="Enter a date and time"
              type="datetime-picker"
              enableKeyBoardInput
            />
            {errorElements}
          </>
        );
      case QuestionTypeEnum.CHECKBOX_LIST:
      case QuestionTypeEnum.RADIOLIST:
      case QuestionTypeEnum.DROPDOWN:
        return (
          <Questionoptions sectionCode={sectionCode} question={question} />
        );
    }
  }, [
    sectionCode,
    question,
    handleTextChange,
    handleDateChange,
    errorElements,
    editing,
  ]);

  return (
    <div
      className={`${styles.questionInputContainer} ${
        isHalfWidthInput && styles.halfWidth
      }`}
    >
      <div
        style={{
          width : "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "flex-start",
        }}
      >
        {renderQuestionInput}
      </div>
    </div>
  );
};

export default memo(QuestionInput);
