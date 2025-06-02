import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import { GetOptionsByQuestionCode, IsIntakeFormSpanish } from "@root/host/src/store/reducer/intake.selector";
import { ADD_OPTION } from "@root/host/src/store/reducer/intake.slice";
import { MultiOptionProps } from "@root/host/src/types/Intake.types";
import AddIcon from "@root/assets/Images/icons/add.svg";
import Image from "next/image";
import { FunctionComponent, memo } from "react";
import styles from "./MultiOption.module.scss";
import OptionItem from "./optionitem";
import { useGetLanguageTypesQuery } from "@root/host/src/store/reducer/intakeApi.slice";

const MultiOption: FunctionComponent<MultiOptionProps> = ({
  questionType,
  QuestionIndex,
  SectionIndex,
}) => {
  const dispatch = useAppDispatch();
  const options = useAppSelector((state) =>
    GetOptionsByQuestionCode({ ...state, QuestionIndex, SectionIndex })
  );
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );

  const handleAddOption = () => {
    if(isSpanishIntake) return;
    dispatch(
      ADD_OPTION({
        QuestionIndex,
        SectionIndex,
      })
    );
  };

  return (
    <div>
      <div className={styles.multiOptions}>
        {options &&
          options.length > 0 &&
          options?.map((option, index) => {
            return (
              <OptionItem
                questionType={questionType}
                SectionIndex={SectionIndex}
                QuestionIndex={QuestionIndex}
                index={index}
                option={option}
                key={index}
              />
            );
          })}
      </div>
      {options && options.length > 0 && (
        <div className={styles.horizontalLine}></div>
      )}
      <div className={`${styles.multiOptionFooter} ${isSpanishIntake && styles.disabledIcon}`} onClick={handleAddOption}>
        <Image
          height={14}
          width={14}
          src={AddIcon}
          className={`${styles.addIcon} ${isSpanishIntake && styles.disabledIcon}`}
          alt="Add icon"
          data-testid="new-option-icon-button"
        />
        <p>Add Option</p>
      </div>
    </div>
  );
};

export default memo(MultiOption);
