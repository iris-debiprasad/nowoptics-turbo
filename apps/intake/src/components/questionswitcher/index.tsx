import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetFormErrorByType,
  GetQuestionByCode,
} from "@root/host/src/store/reducer/intake.selector";
import { UPDATE_QUESTION_PROPERTY } from "@root/host/src/store/reducer/intake.slice";
import {
  QuestionSwitcherProps,
  QuestionTypeEnum,
} from "@root/host/src/types/Intake.types";
import TextField from "@mui/material/TextField";
import { ChangeEvent, FunctionComponent, memo, useMemo } from "react";
import MultiOption from "../questiontypes/multioption";
import Text from "../questiontypes/text";
import styles from "./QuestionSwitcher.module.scss";
import { FREE_TEXT_MAX_LENGTH } from "@root/intake/src/constants/intake.constants";
import Collapse from "@mui/material/Collapse";

const QuestionSwitcher: FunctionComponent<QuestionSwitcherProps> = ({
  QuestionIndex,
  SectionIndex,
  expanded,
}) => {
  const dispatch = useAppDispatch();
  const question = useAppSelector((state) =>
    GetQuestionByCode({ ...state, QuestionIndex, SectionIndex })
  );
  const questionDescriptionError = useAppSelector((state) =>
    GetFormErrorByType({
      ...state,
      SectionIndex,
      QuestionIndex,
      type: "Question",
      field: "QuestionDescription",
    })
  );

  const renderQuestionInput = useMemo(() => {
    const questionInputProps = {
      QuestionIndex,
      SectionIndex,
    };
    switch (question?.Type) {
      case QuestionTypeEnum.TEXT:
      case QuestionTypeEnum.TEXT_AREA:
        return <Text {...questionInputProps} placeholder="Enter the answer" />;
      case QuestionTypeEnum.DATE:
        return <Text {...questionInputProps} placeholder="Enter the date" />;
      case QuestionTypeEnum.DATE_AND_TIME:
        return (
          <Text {...questionInputProps} placeholder="Enter the date and time" />
        );
      case QuestionTypeEnum.EMAIL:
        return <Text {...questionInputProps} placeholder="Enter the email" />;
      case QuestionTypeEnum.NUMBER:
        return <Text {...questionInputProps} placeholder="Enter the number" />;
      case QuestionTypeEnum.CHECKBOX_LIST:
      case QuestionTypeEnum.RADIOLIST:
      case QuestionTypeEnum.DROPDOWN:
        return (
          <MultiOption {...questionInputProps} questionType={question.Type} />
        );
    }
  }, [question?.Type, QuestionIndex, SectionIndex]);

  const handleQuestionText = (
    e: ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => {
    const value = e.target.value;
    dispatch(
      UPDATE_QUESTION_PROPERTY({
        key: "Description",
        value,
        QuestionIndex,
        SectionIndex,
      })
    );
  };

  return (
    <div className={styles.questionSwitcherContainer}>
      <div className={`${styles.questionTextContainer} ${!expanded && styles.marginBottom}`}>
        <TextField
          multiline
          error={!!questionDescriptionError}
          inputProps={{
            "data-testid": "text-field",
            maxLength: FREE_TEXT_MAX_LENGTH,
          }}
          placeholder="Enter your question"
          onChange={handleQuestionText}
          value={question?.Description}
          variant="standard"
          className={`${styles.questionTextInput} ${
            !!questionDescriptionError && styles.errorInput
          }`}
          InputProps={{ disableUnderline: true }}
          fullWidth
        />
        {questionDescriptionError && (
          <p
            className={`${styles.errorSpan} errorMessage`}
            data-section={SectionIndex}
          >
            {questionDescriptionError?.errorMessage}
          </p>
        )}
      </div>
      <Collapse in={expanded}>
        <div className={styles.questionInputs}>{renderQuestionInput}</div>
      </Collapse>
    </div>
  );
};

export default memo(QuestionSwitcher);
