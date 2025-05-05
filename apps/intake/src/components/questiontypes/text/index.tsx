import TextField from "@mui/material/TextField";
import styles from "./Text.module.scss";
import { FunctionComponent } from "react";
import { QuestionTypeTextProps } from "@root/host/src/types/intakeInput.types";

const Text: FunctionComponent<QuestionTypeTextProps> = ({
  value,
  onChange,
  placeholder = "",
  maxLength
}) => {
  return (
    <div className={styles.textContainer}>
      <TextField
        className={styles.textInput}
        fullWidth
        variant="standard"
        onChange={onChange}
        value={value}
        placeholder={placeholder}
        disabled
        InputProps={{ disableUnderline: true }}
        inputProps={{ maxLength }}
      />
    </div>
  );
};

export default Text;
