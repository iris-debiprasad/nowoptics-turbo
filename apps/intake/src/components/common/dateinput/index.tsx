import { DateInputProps } from "@root/host/src/types/Intake.types";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DesktopDatePicker } from "@mui/x-date-pickers";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs, { Dayjs } from "dayjs";
import Image from "next/image";
import { FormEvent, FunctionComponent, useMemo } from "react";
import ErrorIcon from "../../../../../assets/Images/icons/error.svg";
import styles from "./DateInput.module.scss";

const DateInput: FunctionComponent<DateInputProps> = ({
  error = false,
  errorText,
  required,
  label,
  labelClassName,
  sx,
  className,
  value,
  disabled,
  disablePast,
  disableFuture,
  onChange,
  fullWidth = false,
  readOnly = false,
  minDate,
  maxDate,
  type = "date-picker",
  enableKeyBoardInput = false,
}) => {
  const props = {
    readOnly,
    value,
    disablePast,
    disableFuture,
    disabled,
    onChange,
    minDate,
    maxDate,
    slotProps: {
      textField: {
        onBeforeInput: (e: FormEvent<HTMLDivElement>) => {
          if (!enableKeyBoardInput) {
            e.preventDefault();
            e.stopPropagation();
          }
        },
        fullWidth,
        sx,
        InputProps: {
          "aria-label": "date-input",
          classes: {
            root: `${styles.root} ${disabled && styles.disabledInput}`,
            error: error ? styles.inputError : "",
          },
        },
      },
    },
  };

  const renderInput = useMemo(() => {
    switch (type) {
      case "date-picker":
        return <DesktopDatePicker<Dayjs> {...props} />;
      case "datetime-picker":
        return <DateTimePicker<Dayjs> {...props} />;
    }
  }, [type, props]);

  return (
    <div className={`${styles.inputContainer} ${className} `}>
      <label className={`${styles.label} ${labelClassName}`}>
        {label} {required ? "*" : ""}
      </label>
      <LocalizationProvider dateAdapter={AdapterDayjs}>
        {renderInput}
      </LocalizationProvider>
      {error ? (
        <div className={styles.errorContainer}>
          <Image alt="error-icon" src={ErrorIcon} width={20} height={20} />
          <span className={styles.errorText}>{errorText}</span>
        </div>
      ) : null}
    </div>
  );
};

export default DateInput;
