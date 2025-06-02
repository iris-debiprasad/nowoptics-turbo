import styles from "./Divider.module.scss";
interface IBaseDivider {
  thickness?: number;
  color: string;
}
export default function BaseDivider({
  thickness = 5,
  color,
}: IBaseDivider): JSX.Element {
  return (
    <hr
      className={styles.divider}
      style={{ height: `${thickness}px`, backgroundColor: color }}
    ></hr>
  );
}
