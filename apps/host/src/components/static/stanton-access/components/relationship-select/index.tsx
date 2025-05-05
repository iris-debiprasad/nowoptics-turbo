import React from "react";
import { PatientRelationShipType } from "@root/home/src/types/bookEyeExamSteps.types";
import {
  FormControl,
  FormHelperText,
  InputLabel,
  MenuItem,
  Select,
} from "@mui/material";
import { Controller, FieldValues } from "react-hook-form";
import { InputProps } from "../input";
import { useTranslation } from "react-i18next";

interface Props<T extends FieldValues>
  extends Pick<InputProps<T>, "controllerProps"> {
  relationships: PatientRelationShipType[] | null;
}

export function RelationshipSelect<T extends FieldValues>({
  relationships,
  controllerProps,
}: Readonly<Props<T>>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <Controller
      {...controllerProps}
      rules={{
        validate: (value) =>
          value !== "" ||
          t("STANTON_ACCESS.FORM.FIELDS.RELATIONSHIP.REQUIRED_VALIDATION"),
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
                {t("STANTON_ACCESS.FORM.FIELDS.RELATIONSHIP.PLACEHOLDER")}
              </InputLabel>
            )}

            <Select
              error={Boolean(messageError)}
              {...field}
              {...(field.value === "" && {
                label: t("STANTON_ACCESS.FORM.FIELDS.RELATIONSHIP.PLACEHOLDER"),
              })}
              labelId={controllerProps.name}
            >
              {relationships ? (
                relationships.map((relationship) => (
                  <MenuItem
                    key={`${controllerProps.name}-${Math.random().toString(16).slice(2)}-${relationship.Id}`}
                    value={`${relationship.Id}-${relationship.IsReverseRelationship}`}
                  >
                    {t(`STANTON_ACCESS.FORM.FIELDS.RELATIONSHIP.VALUES.${relationship.Code}`)}
                  </MenuItem>
                ))
              ) : (
                <MenuItem value="">Loading...</MenuItem>
              )}
            </Select>

            {error && <FormHelperText>{messageError}</FormHelperText>}
          </FormControl>
        );
      }}
    />
  );
}
