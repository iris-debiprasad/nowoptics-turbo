import { Controller, FieldValues, UseControllerProps } from "react-hook-form";
import { TextField, TextFieldProps } from "@mui/material";
import React from "react";

import styles from "./index.module.scss";

export interface Props<T extends FieldValues> {
  controllerProps: UseControllerProps<T>;
  inputProps: Omit<TextFieldProps, "variant">;
}

export function Input<T extends FieldValues>({
  controllerProps,
  inputProps,
}: Readonly<Props<T>>): React.JSX.Element {
  return (
    <Controller
      {...controllerProps}
      render={({ field, fieldState }) => (
        <TextField
          {...field}
          {...inputProps}
          className={styles.input}
          error={Boolean(fieldState.error)}
          fullWidth
          helperText={fieldState.error?.message || ""}
        />
      )}
    />
  );
}
