import { useEffect, useRef } from "react";
import { DEBOUNCE_TIME_FOR_FUNCTION } from "../../../host/src/constants/common.constants";

/**
 * Custom debounce hook to delay execution of a callback function.
 * @param callback - The function to execute after the debounce delay.
 * @param delay - The debounce delay in milliseconds.
 */
const useDebounceFunction = (
  callback: () => void,
  delay: number
): (() => void) => {
  const timeoutRef = useRef<NodeJS.Timeout | null>(null);

  const debouncedFunction = () => {
    if (timeoutRef.current) {
      clearTimeout(timeoutRef.current);
    }
    timeoutRef.current = setTimeout(() => {
      callback();
    }, delay);
  };

  useEffect(() => {
    return () => {
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, []);

  return debouncedFunction;
};

export default useDebounceFunction;
