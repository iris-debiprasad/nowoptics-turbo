import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import styles from "./Select.module.scss";
import type { SelectInputProps } from "@root/host/src/types/intakeInput.types";
import { FunctionComponent, memo } from "react";

const SelectInput: FunctionComponent<SelectInputProps> = ({
  id,
  options,
  value = "",
  onChange,
  className,
  readOnly = false,
  fullWidth = false,
  placeholder,
  displayEmpty,
  disabled,
  renderValue,
}) => {
  return (
    <Select
      fullWidth={fullWidth}
      id={id}
      onChange={onChange}
      variant="standard"
      disableUnderline
      className={`${styles.select} ${className} ${disabled && styles.disabledInput}`}
      renderValue={renderValue}
      displayEmpty={displayEmpty}
      value={value}
      disabled={disabled}
      inputProps={{
        "data-testid": "select-input",
      }}
      readOnly={readOnly}
    >
      <MenuItem disabled>
        {placeholder}
      </MenuItem>
      {options.map((option, index) => {
        return (
          <MenuItem
            data-testid="menu-item"
            value={option.value}
            key={index}
            classes={{ root: styles.option }}
          >
            {option.label}
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default memo(SelectInput);
