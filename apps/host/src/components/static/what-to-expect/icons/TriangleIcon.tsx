import { SVGProps } from "react";

export default function TriangleIcon(
  props: SVGProps<SVGSVGElement>
): JSX.Element {
  return (
    <svg
      fill="#000000"
      width="15px"
      height="15px"
      viewBox="0 0 24 24"
      xmlns="http://www.w3.org/2000/svg"
      style={{ transform: "rotate(90deg) translateY(-10px) translateX(-1px)" }}
      {...props}
    >
      <path d="M21,21H3L12,3Z" />
    </svg>
  );
}
