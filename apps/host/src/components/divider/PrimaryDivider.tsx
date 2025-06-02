import BaseDivider from "./BaseDivider";

interface IPrimaryDivider {
  thickness?: number;
}

export default function PrimaryDivider({
  thickness = 5,
}: IPrimaryDivider): JSX.Element {
  return <BaseDivider color="#f98300" thickness={thickness} />;
}
