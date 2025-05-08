export interface IconNameDTO {
  [index: string]: string;
}
// TODO : need to review with ayush
export interface IconDTO {
  width: string;
  height: string;
  className?: string;
  viewBox: string;
  fill: string;
  fillP?: string;
  name: string;
  stroke?: string;
  strokeWidth?: string;
  strokeLinecap?: string | any;
  strokeLinejoin?: string | any;
  fillRule?: "nonzero" | "evenodd" | "inherit" | undefined;
  clipRule?: string;
}
