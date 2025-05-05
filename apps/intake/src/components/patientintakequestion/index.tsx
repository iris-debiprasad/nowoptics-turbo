import { PatientIntakeQuestionProps } from "@root/host/src/types/Intake.types";
import { FC, memo } from "react";
import styles from "./PatientIntakeQuestion.module.scss";
import Questioninput from "./questioninput";

const PatientIntakeQuestion: FC<PatientIntakeQuestionProps> = ({
  sectionCode,
  question,
}) => {
  const isChildQuestion = question.ParentQuestionCode !== null;
  return (
    <div className={`${styles.singleQuestionContainer} ${isChildQuestion && styles.questionOffset}`}>
      <p className={styles.questionTitle}>
        {question?.Text}
        {question.IsRequired && <span>*</span>}
      </p>
      <Questioninput sectionCode={sectionCode} question={question} />
    </div>
  );
};

export default memo(PatientIntakeQuestion);