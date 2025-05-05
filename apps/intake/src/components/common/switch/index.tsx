import { FunctionComponent } from "react";
import styles from "./Switch.module.scss";
import { SwitchInputProps } from "@root/host/src/types/Intake.types";

const SwitchInput : FunctionComponent<SwitchInputProps> = ({ checked, onChange, disabled }) => {
  return (
    <label className={`${styles.switch} ${disabled && styles.disabledInput}`}>
      <input type="checkbox" checked={checked} onChange={onChange} data-testid="switch-input" disabled={disabled} />
      <span className={`${styles.slider} ${styles.round}`}></span>
    </label>
  );
};

export default SwitchInput;
