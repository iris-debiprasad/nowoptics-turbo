import { BREAKPOINTS, TBreakPoint } from "@root/host/src/constants/responsive.contstants";
import { throttle } from "@root/host/src/utils/performance.utils";
import { useEffect, useState } from "react";

type TResponsiveState = Record<TBreakPoint, boolean>;

const INITIAL_STATE: TResponsiveState = {
  sm: true,
  md: false,
  lg: false,
  xl: false,
  xxl: false,
  "2xxl": false,
};

export default function useResponsive(): TResponsiveState {
  const [hasReached, setHasReached] = useState(INITIAL_STATE);

  const verifyWindowSize: () => void = () => {
    const size = window.innerWidth;
    setHasReached({
      sm: size >= BREAKPOINTS["sm"],
      md: size >= BREAKPOINTS["md"],
      lg: size >= BREAKPOINTS["lg"],
      xl: size >= BREAKPOINTS["xl"],
      xxl: size >= BREAKPOINTS["xxl"],
      "2xxl": size >= BREAKPOINTS["2xxl"],
    });
  };

  useEffect(() => {
    verifyWindowSize();
    const handleResize = throttle(verifyWindowSize);
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return hasReached;
}
