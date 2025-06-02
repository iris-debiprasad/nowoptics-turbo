import { forwardRef } from "react";
import { IMaskInput } from "react-imask";

interface ZipCodeMaskProps {
  onChange: (event: { target: { name: string; value: string } }) => void;
  name: string;
}

export const ZipCodeMask = forwardRef<HTMLInputElement, ZipCodeMaskProps>(
  function ZipCodeMask(props, ref) {
    const { onChange, ...other } = props;
    return (
      <IMaskInput
        {...other}
        mask="00000-0000"
        inputRef={ref}
        onAccept={(value: any) =>
          onChange({ target: { name: props.name, value } })
        }
        overwrite="shift"
      />
    );
  }
);
