import { Control, FieldValues, Path } from "react-hook-form";

export interface UserMarketingConsentProps<T extends FieldValues> {
  control: Control<T, any>;
  fieldName: Path<string>;
  disabled?: boolean;
}
