import { Controller, FieldValues } from "react-hook-form";
import type { Props as InputProps } from "./input";
import { useTranslation } from "react-i18next";
import { FormControl, FormHelperText } from "@mui/material";
import { DatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { Dayjs } from "dayjs";
import { DATE_FORMAT } from "@/constants/common.constants";

import styles from "./index.module.scss";

interface Props<T extends FieldValues>
  extends Pick<InputProps<T>, "controllerProps"> { }

export function DOBInput<T extends FieldValues>({
  controllerProps,
}: Readonly<Props<T>>): JSX.Element {
  const { t } = useTranslation();

  return (
    <Controller
      {...controllerProps}
      rules={{
        required: t("STANTON_ACCESS.FORM.FIELDS.DOB.REQUIRED_VALIDATION"),
        ...controllerProps.rules,
      }}
      render={({ field, formState }) => {
        const keys = controllerProps.name.split(".");
        let error: any = formState.errors;
        keys.forEach((key) => (error = error?.[key]));
        const messageError: string | undefined = error?.message;

        return (
          <FormControl fullWidth error={Boolean(messageError)}>
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DatePicker<Dayjs>
                {...field}
                {...(!field.value && {
                  label: t("STANTON_ACCESS.FORM.FIELDS.DOB.PLACEHOLDER"),
                })}
                className={styles.dob}
                disableFuture
                format={DATE_FORMAT}
              />
            </LocalizationProvider>

            {messageError && <FormHelperText>{messageError}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
