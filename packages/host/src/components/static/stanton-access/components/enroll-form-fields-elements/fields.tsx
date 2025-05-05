import { DOBInput, Input, TelephoneInput } from "../input";
import { PatientRelationShipType } from "@root/home/src/types/bookEyeExamSteps.types";
import { Dayjs } from "dayjs";
import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { RelationshipSelect } from "../relationship-select";
import { isEmailValidRegex } from "@/constants/common.constants";
import { GenderSelect } from "../gender-select";

type EnrollFormFieldKey =
  | "firstName"
  | "lastName"
  | "coc"
  | "telephone"
  | "email"
  | "dob"
  | "gender"
  | "zip"
  | "relationshipType";

type FieldItem<T extends FieldValues> = {
  [x in EnrollFormFieldKey]: {
    name: Path<T>;
    initialValue: string | Dayjs | null;
  } | null;
};

export interface Props<T extends FieldValues> {
  fields: FieldItem<T>;
  form: UseFormReturn<T>;
  relationships: PatientRelationShipType[] | null;
}

export const Fields = <T extends FieldValues>({
  fields,
  form,
  relationships,
}: Readonly<Props<T>>) => {
  const { t } = useTranslation();

  return (
    <>
      {fields.firstName && (
        <Input
          controllerProps={{
            control: form.control,
            defaultValue: fields.firstName.initialValue as PathValue<
              T,
              Path<T>
            >,
            name: fields.firstName.name,
            rules: {
              required: t(
                "STANTON_ACCESS.FORM.FIELDS.FIRST_NAME.REQUIRED_VALIDATION",
              ),
            },
          }}
          inputProps={{
            placeholder: t("STANTON_ACCESS.FORM.FIELDS.FIRST_NAME.PLACEHOLDER"),
          }}
        />
      )}

      {fields.lastName && (
        <Input
          controllerProps={{
            control: form.control,
            defaultValue: fields.lastName.initialValue as PathValue<T, Path<T>>,
            name: fields.lastName.name,
            rules: {
              required: t(
                "STANTON_ACCESS.FORM.FIELDS.LAST_NAME.REQUIRED_VALIDATION",
              ),
            },
          }}
          inputProps={{
            placeholder: t("STANTON_ACCESS.FORM.FIELDS.LAST_NAME.PLACEHOLDER"),
          }}
        />
      )}

      {fields.coc && (
        <Input
          controllerProps={{
            control: form.control,
            defaultValue: fields.coc.initialValue as PathValue<T, Path<T>>,
            name: fields.coc.name,
            rules: {
              required: t("STANTON_ACCESS.FORM.FIELDS.COC.REQUIRED_VALIDATION"),
            },
          }}
          inputProps={{
            placeholder: t("STANTON_ACCESS.FORM.FIELDS.COC.PLACEHOLDER"),
          }}
        />
      )}

      {fields.telephone && (
        <TelephoneInput
          {...{ form }}
          controllerProps={{
            control: form.control,
            defaultValue: fields.telephone.initialValue as PathValue<
              T,
              Path<T>
            >,
            name: fields.telephone.name,
          }}
          inputProps={{
            placeholder: t("STANTON_ACCESS.FORM.FIELDS.TELEPHONE.PLACEHOLDER"),
          }}
        />
      )}

      {fields.email && (
        <Input
          controllerProps={{
            defaultValue: fields.email.initialValue as PathValue<T, Path<T>>,
            name: fields.email.name,
            control: form.control,
            rules: {
              required: t(
                "STANTON_ACCESS.FORM.FIELDS.EMAIL.REQUIRED_VALIDATION",
              ),
              pattern: {
                value: isEmailValidRegex,
                message: t(
                  "STANTON_ACCESS.FORM.FIELDS.EMAIL.FORMAT_VALIDATION",
                ),
              },
            },
          }}
          inputProps={{
            placeholder: t("STANTON_ACCESS.FORM.FIELDS.EMAIL.PLACEHOLDER"),
            type: "email",
          }}
        />
      )}

      {fields.dob && (
        <DOBInput
          controllerProps={{
            defaultValue: fields.dob.initialValue as PathValue<T, Path<T>>,
            name: fields.dob.name,
            control: form.control,
          }}
        />
      )}

      {fields.gender && (
        <GenderSelect
          controllerProps={{
            defaultValue: fields.gender.initialValue as PathValue<T, Path<T>>,
            name: fields.gender.name,
            control: form.control,
          }}
        />
      )}

      {fields.zip && (
        <Input
          controllerProps={{
            defaultValue: fields.zip.initialValue as PathValue<T, Path<T>>,
            name: fields.zip.name,
            control: form.control,
            rules: {
              required: t("STANTON_ACCESS.FORM.FIELDS.ZIP.REQUIRED_VALIDATION"),
              pattern: {
                value: /(^\d{5}$)|(^\d{5}-\d{4}$)/,
                message: t("STANTON_ACCESS.FORM.FIELDS.ZIP.FORMAT_VALIDATION"),
              },
            },
          }}
          inputProps={{
            placeholder: t("STANTON_ACCESS.FORM.FIELDS.ZIP.PLACEHOLDER"),
          }}
        />
      )}

      {fields.relationshipType && (
        <RelationshipSelect
          {...{ relationships }}
          controllerProps={{
            control: form.control,
            defaultValue: fields.relationshipType.initialValue as PathValue<
              T,
              Path<T>
            >,
            name: fields.relationshipType.name,
          }}
        />
      )}
    </>
  );
};
