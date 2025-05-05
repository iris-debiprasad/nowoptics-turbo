import { FunctionComponent, memo } from "react";
import styles from "./Checkbox.module.scss";
import CheckMarkIcon from "@root/assets/Images/icons/checkmark.svg";
import { CheckboxProps } from "@root/host/src/types/Intake.types";
import Image from "next/image";

const Checkbox: FunctionComponent<CheckboxProps> = ({
  id,
  checked,
  handleChange,
  name,
  className,
  handleLabelClick,
  disabled
}) => {
  return (
    <div className={`${styles.checkboxContainer} ${className}`} aria-label="checkbox-container">
      <label
        data-pdf-label="label"
        aria-label="checkbox-label"
        htmlFor={id}
        onClick={(e) => handleLabelClick !== undefined && handleLabelClick(e)}
      >
        {checked && (
          <Image src={CheckMarkIcon} height={10} width={10} alt="check icon" />
        )}
      </label>
      <input
        data-pdf-checkbox="checkbox"
        type={"checkbox"}
        checked={checked}
        id={id}
        onChange={(e) => handleChange !== undefined && handleChange()}
        name={name}
        disabled={disabled}
      />
    </div>
  );
};

export default memo(Checkbox);
