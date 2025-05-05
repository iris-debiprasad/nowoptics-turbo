import { useIMask } from "react-imask";

export const useMaskInput = (mask: string, initialValue: string, onAccept : (unmaskedValue : string) => void) => {

  const maskedInput = useIMask(
    { mask },
    {
      defaultValue: initialValue ?? "",
      onAccept(_value, maskRef, _e) {
        const { unmaskedValue } = maskRef;
        onAccept(unmaskedValue)
      },
    }
  );

  return maskedInput;
};
