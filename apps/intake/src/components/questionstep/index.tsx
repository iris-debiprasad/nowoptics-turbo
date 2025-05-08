import Radio from "@root/intake/src/components/common/radio";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetFormSectionByCode,
  GetSectionColumnCount,
  IsIntakeFormSpanish,
} from "@root/host/src/store/reducer/intake.selector";
import { ADD_QUESTION, UPDATE_COLUMN_COUNT } from "@root/host/src/store/reducer/intake.slice";
import { QuestionStepProps } from "@root/host/src/types/Intake.types";
import AddIcon from "@root/assets/Images/icons/add.svg";
import Image from "next/image";
import React, { FunctionComponent, memo, useMemo } from "react";
import QuestionForm from "../questionform";
import styles from "./QuestionStep.module.scss";
import { useGetLanguageTypesQuery } from "@root/host/src/store/reducer/intakeApi.slice";

const QuestionStep: FunctionComponent<QuestionStepProps> = ({
  SectionIndex,
}) => {
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );
  const dispatch = useAppDispatch();

  const columnCount = useAppSelector((state) =>
    GetSectionColumnCount({ ...state, SectionIndex })
  );
  const radioBtnIdentifier = Date.now();
  const formSection = useAppSelector((state) =>
    GetFormSectionByCode({ ...state, sectionIndex: SectionIndex })
  );
  const questions = formSection?.Questions;

  const handleLayoutChange = (value: number) => {
    if (isSpanishIntake) return;
    dispatch(
      UPDATE_COLUMN_COUNT({
        SectionIndex,
        value,
      })
    );
  }
    

  const gridStyle = useMemo(() => {
    switch (columnCount) {
      case 1:
        return styles.oneColumn;
      case 2:
        return styles.twoColumn;
    }
  }, [columnCount]);

  const handleAddQuestion = () => {
    if (isSpanishIntake) return;
    dispatch(
      ADD_QUESTION({
        SectionIndex,
      })
    );
  };

  return (
    <div className={styles.stepContainer}>
      <div className={styles.stepHeader}>
        <h1>{formSection?.Description}</h1>
        <div className={styles.layoutControls}>
          <p>Choose Layout</p>
          <div>
            <Radio
              id={"layout-grid-1" + radioBtnIdentifier}
              name={"layout-grid-1" + radioBtnIdentifier}
              data-testid="radio-button"
              value={1}
              checked={columnCount == 1}
              handleChange={() => handleLayoutChange(1)}
            />
            <div className={styles.layoutBars}>
              <div></div>
            </div>
            <span>One Column</span>
          </div>
          <div>
            <Radio
              id={"layout-grid-2" + radioBtnIdentifier}
              name={"layout-grid-2" + radioBtnIdentifier}
              data-testid="radio-button"
              value={2}
              checked={columnCount == 2}
              handleChange={() => handleLayoutChange(2)}
            />
            <div className={styles.layoutBars}>
              <div></div>
              <div></div>
            </div>
            <span>Two Column</span>
          </div>
        </div>
      </div>

      <div
        data-testid="grid-layout-question"
        className={`${styles.stepContent} ${gridStyle}`}
      >
        {questions?.map((question, index) => {
          return (
            <React.Fragment key={index}>
              {question.ParentQuestionIndex === -1 && (
                <QuestionForm
                  key={index}
                  SectionIndex={SectionIndex!}
                  QuestionIndex={question.QuestionIndex!}
                />
              )}
            </React.Fragment>
          );
        })}
        <div className={styles.addQuestionBtnContainer}>
          <div
            className={`${styles.addQuestionBtn} ${
              isSpanishIntake && styles.disabledBtn
            }`}
            onClick={handleAddQuestion}
          >
            <Image
              src={AddIcon}
              height={72}
              width={72}
              alt="Add Question Icon"
            />
            <p>Add New Question</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default memo(QuestionStep);
