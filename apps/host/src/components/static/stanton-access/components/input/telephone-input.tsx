import { FieldValues, Path, PathValue, UseFormReturn } from "react-hook-form";
import { Input, type Props as InputProps } from "./input";
import { ONLY_NUMBERS_REGEX, phoneRegex } from "@root/host/src/constants/common.constants";
import { useTranslation } from "react-i18next";

interface Props<T extends FieldValues> extends InputProps<T> {
  form: UseFormReturn<T>;
}

export function TelephoneInput<T extends FieldValues>({
  controllerProps,
  form,
  inputProps,
}: Readonly<Props<T>>): JSX.Element {
  const { t } = useTranslation();

  const maskPhoneNumber = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentPhone: string = e.target.value
      .replace(ONLY_NUMBERS_REGEX, "")
      .slice(0, 10);
    let formattedPhone: string = "";

    if (currentPhone.length <= 3) {
      formattedPhone = currentPhone.replace(phoneRegex, "$1");
    } else if (currentPhone.length <= 6) {
      formattedPhone = currentPhone.replace(phoneRegex, "($1) $2");
    } else {
      formattedPhone = currentPhone.replace(phoneRegex, "($1) $2-$3");
    }

    form.setValue(
      controllerProps.name,
      formattedPhone as PathValue<T, Path<T>>,
    );

    if (currentPhone.length === 10) {
      form.clearErrors(controllerProps.name);
    }
  };

  return (
    <Input
      controllerProps={{
        ...controllerProps,
        rules: {
          required: t(
            "STANTON_ACCESS.FORM.FIELDS.TELEPHONE.REQUIRED_VALIDATION",
          ),
          validate: (value) => {
            const currentLength = value
              .replace(ONLY_NUMBERS_REGEX, "")
              .slice(0, 10)
              .trim().length;
            return (
              currentLength === 10 ||
              t("STANTON_ACCESS.FORM.FIELDS.TELEPHONE.FORMAT_VALIDATION")
            );
          },
          ...controllerProps.rules,
        },
      }}
      inputProps={{ type: "tel", onChange: maskPhoneNumber, ...inputProps }}
    />
  );
}
