import TextField from "@mui/material/TextField";
import styles from "./Input.module.scss";
import { FunctionComponent, memo } from "react";
import { InputProps } from "@root/host/src/types/intakeInput.types";

const Input: FunctionComponent<InputProps> = ({
  value,
  onChange,
  onBlur,
  placeholder = "PI-01",
  id,
  fullWidth = false,
  readOnly = false,
  className,
  error,
  disabled,
  maxLength
}) => {
  return (
    <TextField
      className={className}
      fullWidth={fullWidth}
      id={id}
      disabled={disabled}
      error={error}
      value={value}
      onChange={onChange}
      onBlur={onBlur}
      classes={{ root: `${styles.inputRoot} ${disabled && styles.disabledInput}` }}
      sx={{
        "& legend": { display: "none" },
        "& fieldset": { top: 0 },
      }}
      placeholder={placeholder}
      inputProps={{
        "data-testid": "textbox",
        maxLength
      }}
      InputProps={{
        readOnly,
      }}
    />
  );
};

export default memo(Input);
