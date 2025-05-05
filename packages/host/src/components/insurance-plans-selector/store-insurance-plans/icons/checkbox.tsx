import * as React from "react";
import { SVGProps } from "react";

export const CheckboxIcon = (props: SVGProps<SVGSVGElement>) => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width={14}
    height={14}
    fill="none"
    {...props}
  >
    <path
      stroke="#b7da99"
      strokeLinecap="square"
      strokeMiterlimit={10}
      d="m10.25 4.5-4.375 5L4 7.625"
    />
    <rect width={13} height={13} x={0.5} y={0.5} stroke="#b7da99" rx={1.5} />
  </svg>
);
