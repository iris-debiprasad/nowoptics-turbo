export type TBreakPoint =
  | "sm"
  | "md"
  | "lg"
  | "md"
  | "lg"
  | "xl"
  | "xxl"
  | "2xxl";

export const BREAKPOINTS: Record<TBreakPoint, number> = {
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1400,
  "2xxl": 1600,
};
