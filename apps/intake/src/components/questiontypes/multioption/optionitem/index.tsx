import Input from "@root/intake/src/components/common/input";
import Recommend from "@root/intake/src/components/common/recommend";
import Questionform from "@root/intake/src/components/questionform";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetFormErrorByType,
  GetQuestionsByParentIndex,
  IsIntakeFormSpanish,
} from "@root/host/src/store/reducer/intake.selector";
import {
  ADD_CHILD_QUESTION,
  DELETE_OPTION,
  UPDATE_OPTION_PROPERTY,
} from "@root/host/src/store/reducer/intake.slice";
import { OptionItemProps, QuestionTypeEnum } from "@root/host/src/types/Intake.types";
import { QuestionOption } from "@root/host/src/types/intakeApi.types";
import Tooltip from "@mui/material/Tooltip";
import AddIcon from "@root/assets/Images/icons/add.svg";
import ArrowDownIcon from "@root/assets/Images/icons/arrow-down.svg";
import DeleteIcon from "@root/assets/Images/icons/delete.svg";
import Image from "next/image";
import React, { FunctionComponent, memo, useMemo } from "react";
import styles from "../MultiOption.module.scss";
import {
  COMMON_INPUT_MAX_LENGTH,
  FREE_TEXT_MAX_LENGTH,
} from "@root/intake/src/constants/intake.constants";
import { useGetLanguageTypesQuery } from "@root/host/src/store/reducer/intakeApi.slice";

const OptionItem: FunctionComponent<OptionItemProps> = ({
  index,
  option,
  questionType,
  QuestionIndex,
  SectionIndex,
}) => {
  const dispatch = useAppDispatch();
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );
  const childQuestions = useAppSelector((state) =>
    GetQuestionsByParentIndex({
      ...state,
      SectionIndex,
      QuestionIndex,
      OptionIndex: option.OptionIndex,
    })
  );

  const optionDescriptionError = useAppSelector((state) =>
    GetFormErrorByType({
      ...state,
      SectionIndex,
      QuestionIndex,
      OptionIndex: option.OptionIndex,
      type: "Option",
      field: "OptionDescription",
    })
  );

  const optionCodeError = useAppSelector((state) =>
    GetFormErrorByType({
      ...state,
      SectionIndex,
      QuestionIndex,
      OptionIndex: option.OptionIndex,
      type: "Option",
      field: "OptionCode",
    })
  );

  const isNoneOption = useMemo(() => {
    return option.Code.endsWith("None1") && option.Description === "None";
  }, [option.Code, option.Description]);

  const childQuestionsMemo = useMemo(() => {
    const questionElements =
      childQuestions?.map((childQuestion, index) => {
        return (
          <Questionform
            key={index}
            QuestionIndex={childQuestion.QuestionIndex!}
            SectionIndex={SectionIndex}
            handleAddQuestion={() =>
              dispatch(
                ADD_CHILD_QUESTION({
                  SectionIndex,
                  QuestionIndex,
                  OptionIndex: option.OptionIndex,
                })
              )
            }
          />
        );
      }) ?? [];
    return <>{questionElements}</>;
  }, [
    childQuestions,
    dispatch,
    SectionIndex,
    QuestionIndex,
    option.OptionIndex,
  ]);

  const OptionIcon = useMemo(() => {
    switch (questionType) {
      case QuestionTypeEnum.CHECKBOX_LIST:
        return <div className={styles.checkboxIcon}></div>;
      case QuestionTypeEnum.RADIOLIST:
        return <div className={styles.radioIcon}></div>;
      case QuestionTypeEnum.DROPDOWN:
        return (
          <Image
            height={14}
            width={14}
            src={ArrowDownIcon}
            alt="arrow-down-icon"
          />
        );
    }
  }, [questionType]);

  const handleUpdateOptionProperty = (
    key: keyof QuestionOption,
    value: string
  ) => {
    dispatch(
      UPDATE_OPTION_PROPERTY({
        key,
        value,
        QuestionIndex,
        SectionIndex,
        OptionIndex: option.OptionIndex,
      })
    );
  };

  const handleDeleteOption = () => {
    if (isSpanishIntake) return;
    dispatch(
      DELETE_OPTION({
        SectionIndex,
        OptionIndex: option.OptionIndex!,
        QuestionIndex,
      })
    );
  };

  const handleAddChildQuestion = () => {
    if (isSpanishIntake) return;

    dispatch(
      ADD_CHILD_QUESTION({
        QuestionIndex,
        SectionIndex,
        OptionIndex: option.OptionIndex,
      })
    );
  };

  return (
    <React.Fragment key={index}>
      {!isNoneOption && (
        <>
          <div className={styles.multiOptionItem}>
            <div>
              {OptionIcon}
              <input
                type="text"
                aria-label="new-option-input"
                placeholder="Enter option description"
                value={option.Description}
                className={`${
                  !!optionDescriptionError?.errorMessage && styles.errorInput
                }`}
                onChange={(e) =>
                  handleUpdateOptionProperty("Description", e.target.value)
                }
                maxLength={FREE_TEXT_MAX_LENGTH}
              />
              {optionDescriptionError?.errorMessage && (
                <span
                  className={`${styles.optionDescriptionError} errorMessage`}
                  data-section={SectionIndex}
                >
                  {optionDescriptionError?.errorMessage}
                </span>
              )}
            </div>
            <div>
              {optionCodeError?.errorMessage && (
                <span
                  className={`${styles.optionCodeError} errorMessage`}
                  data-section={SectionIndex}
                >
                  {optionCodeError?.errorMessage}
                </span>
              )}
              <Input
                error={!!optionCodeError?.errorMessage}
                value={option.Code}
                onChange={(e) =>
                  handleUpdateOptionProperty("Code", e.target.value)
                }
                maxLength={COMMON_INPUT_MAX_LENGTH}
                disabled={isSpanishIntake}
                placeholder="A01"
              />
              <Tooltip title="Add child question" arrow>
                <Image
                  height={14}
                  width={14}
                  aria-label="add-child-question-button"
                  src={AddIcon}
                  className={`${styles.addIcon} ${
                    isSpanishIntake && styles.disabledIcon
                  }`}
                  alt="Add icon"
                  onClick={handleAddChildQuestion}
                />
              </Tooltip>
              <Tooltip title="Delete option" arrow>
                <Image
                  height={14}
                  width={14}
                  aria-label="delete-icon-button"
                  alt="Delete icon"
                  src={DeleteIcon}
                  className={`${styles.deleteIcon} ${
                    isSpanishIntake && styles.disabledIcon
                  }`}
                  onClick={handleDeleteOption}
                />
              </Tooltip>
            </div>
          </div>
          {childQuestionsMemo}
          <Recommend
            QuestionIndex={QuestionIndex}
            SectionIndex={SectionIndex}
            OptionIndex={option.OptionIndex!}
          />
        </>
      )}
    </React.Fragment>
  );
};

export default memo(OptionItem);
