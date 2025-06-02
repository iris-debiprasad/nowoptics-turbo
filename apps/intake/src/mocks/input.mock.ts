import { CheckboxProps, RadioProps } from "@root/host/src/types/Intake.types";
import { SelectInputProps } from "@root/host/src/types/intakeInput.types";

export const SelectInputMock: SelectInputProps = {
  options: [{
    label: "test",
    value: "test",
  }],
  value: "",
};

export const CheckboxMock: CheckboxProps = {
  checked: false,
  id: "checkbox-input-test",
  name: "checkbox-input-test",
  handleChange: () => null,
};

export const RadioMock: RadioProps = {
  checked: false,
  id: "radio-input-test",
  name: "radio-input-test",
};
