import { SelectChangeEvent, SxProps } from "@mui/material";
import { Dayjs } from "dayjs";
import { ChangeEvent } from "react";
import { RecommendType } from "./Intake.types";

export type BaseInputTypes = {
  for?: string;
  id?: string;
  required?: boolean;
  label?: string;
  placeholder?: string;
  error?: boolean;
  errorText?: string;
  sx?: SxProps;
  className?: string;
  labelClassName?: string;
  value?: string | number | null;
  disabled?: boolean;
  name?: string;
  helperText?: string;
  disableStyle?: boolean;
  onChange?: (
    event: React.ChangeEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
  onBlur?: (
    event: React.FocusEvent<HTMLTextAreaElement | HTMLInputElement>
  ) => void;
};
export interface DateInputProps extends Omit<BaseInputTypes, "onChange" | "value">{
  onChange?: (value: any) => void;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  value?: Dayjs | null |string;
}
export interface InputProps extends BaseInputTypes {
    fullWidth?: boolean;
    readOnly?: boolean;
    className?: string;
    maxLength? : number;
}

export type SelectOptions = {
  value: string | number;
  label: string | number;
};

export interface SelectInputProps extends Omit<BaseInputTypes, "onChange"> {
  options: SelectOptions[];
  value: string | number | undefined;
  onChange?: (event: SelectChangeEvent<string | number>) => void;
  readOnly? : boolean;
  fullWidth? : boolean;
  displayEmpty?: boolean;
  renderValue?: (selected: string | number) => React.ReactNode;
}

export type CheckboxProps = {
  checked: boolean;
  label: string;
  id: string;
  name: string;
  className?: string;
  handleChange: () => void;
};

export type TableHeaderOptions = {
  id: string;
  name: string;
  isSort?: boolean;
  isFilter?: boolean;
  type?: string;
};



export type QuestionTypeTextProps = {
  value?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => void;
  placeholder?: string;
  QuestionIndex: number;
  SectionIndex: number;
  maxLength?: number;
};

export type BaseOptionType = {
  questionIndex?: number;
  label: string;
  answerCode: string;
  isSelected?: boolean;
  index?: number;
  recommend?: RecommendType;
};