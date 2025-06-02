import { FunctionComponent, memo } from "react";
import styles from "./Radio.module.scss";
import { RadioProps } from "@root/host/src/types/Intake.types";
import RadioCheck from "@root/assets/Images/icons/radio_Check.svg";
import Image from "next/image";

const Radio: FunctionComponent<RadioProps> = ({
  id,
  checked,
  handleChange,
  name,
  className,
  handleLabelClick,
  value,
}) => {
  return (
    <div
      className={`${styles.radioContainer} ${className}`}
      aria-label="radio-container"
    >
      <label
        aria-label="radio-label"
        htmlFor={id}
        onClick={(e) => handleLabelClick !== undefined && handleLabelClick(e)}
      >
        {checked && <Image height={14} width={14} src={RadioCheck} alt="radio-check-icon" />}
      </label>
      <input
        type={"radio"}
        data-testid="radio-input"
        checked={checked}
        id={id}
        onChange={(e) => handleChange !== undefined && handleChange()}
        name={name}
        value={value}
      />
    </div>
  );
};

export default memo(Radio);
