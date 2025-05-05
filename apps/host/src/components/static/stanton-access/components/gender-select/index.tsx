import { Controller, FieldValues } from "react-hook-form";
import { InputProps } from "../input";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { useTranslation } from "react-i18next";

interface Props<T extends FieldValues>
  extends Pick<InputProps<T>, "controllerProps"> { }

export function GenderSelect<T extends FieldValues>({
  controllerProps,
}: Readonly<Props<T>>): JSX.Element {
  const { t } = useTranslation();

  return (
    <Controller
      {...controllerProps}
      rules={{
        validate: (value) =>
          value !== "" ||
          t("STANTON_ACCESS.FORM.FIELDS.GENDER.REQUIRED_VALIDATION"),
        ...controllerProps.rules,
      }}
      render={({ field, formState }) => {
        const keys = controllerProps.name.split(".");
        let error: any = formState.errors;
        keys.forEach((key) => (error = error?.[key]));
        const messageError: string | undefined = error?.message;

        return (
          <FormControl fullWidth size="small" error={Boolean(messageError)}>
            {field.value === "" && (
              <InputLabel id={controllerProps.name}>
                {t("STANTON_ACCESS.FORM.FIELDS.GENDER.PLACEHOLDER")}
              </InputLabel>
            )}

            <Select
              error={Boolean(messageError)}
              {...field}
              {...(field.value === "" && {
                label: t("STANTON_ACCESS.FORM.FIELDS.GENDER.PLACEHOLDER"),
              })}
              labelId={controllerProps.name}
            >
              <MenuItem value="M">
                {t("STANTON_ACCESS.FORM.FIELDS.GENDER.MALE")}
              </MenuItem>
              <MenuItem value="F">
                {t("STANTON_ACCESS.FORM.FIELDS.GENDER.FEMALE")}
              </MenuItem>
            </Select>

            {error && <FormHelperText>{messageError}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
