import { FC, memo } from "react";
import Input from "../input";
import Checkbox from "../checkbox";
import styles from "./DateValidation.module.scss";
import { DateValidationProps } from "@root/host/src/types/Intake.types";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import {
  GetFormErrorByType,
  GetIntakeValidation,
  IsIntakeFormSpanish,
} from "@root/host/src/store/reducer/intake.selector";
import { UPDATE_DATE_VALIDATION } from "@root/host/src/store/reducer/intake.slice";
import { useGetLanguageTypesQuery } from "@root/host/src/store/reducer/intakeApi.slice";

const DateValidation: FC<DateValidationProps> = ({
  QuestionIndex,
  SectionIndex,
}) => {
  const dispatch = useAppDispatch();
  const [checkboxValidation, inputValidation] = useAppSelector((state) =>
    GetIntakeValidation({ ...state, SectionIndex, QuestionIndex })
  );
  const { data : languageTypes } = useGetLanguageTypesQuery({});
  const isSpanishIntake = useAppSelector((state) =>
    IsIntakeFormSpanish({ ...state, languageTypes })
  );
  const dateValidationError = useAppSelector((state) =>
    GetFormErrorByType({
      ...state,
      SectionIndex,
      QuestionIndex,
      type: "Validation",
      field: "BackDays",
    })
  );

  const { Value: checkboxValue } = checkboxValidation || {};
  const { Value: inputValue } = inputValidation || {};

  const handleValueChange = (type: "min" | "max", value: string) => {
    if (isSpanishIntake) return;
    dispatch(
      UPDATE_DATE_VALIDATION({ SectionIndex, QuestionIndex, value, type })
    );
  };

  return (
    <div className={styles.dateValidationContainer}>
      <div>
        <p>Validation Range</p>
        <div className={styles.checkboxInput}>
          <Checkbox
            checked={checkboxValue === "0"}
            handleLabelClick={() =>
              handleValueChange("min", checkboxValue === "0" ? "1" : "0")
            }
            disabled={isSpanishIntake}
          />
          <span>Is Today Included</span>
        </div>
      </div>
      <div>
        <p># of Days Back</p>
        <div className={styles.backdaysInputContainer}>
          <Input
            placeholder="Enter number of back days"
            value={inputValue}
            onChange={(e) => handleValueChange("max", e.target.value)}
            disabled={isSpanishIntake}
          />
          {dateValidationError?.errorMessage && (
            <span className="errorMessage" data-section={SectionIndex}>
              {dateValidationError?.errorMessage}
            </span>
          )}
        </div>
      </div>
    </div>
  );
};

export default memo(DateValidation);
