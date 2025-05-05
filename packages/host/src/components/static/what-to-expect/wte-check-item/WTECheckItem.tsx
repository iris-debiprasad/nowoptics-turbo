import styles from "./wtecheckItem.module.scss";
import CheckCircleIcon from "../icons/CheckCircleIcon";
import { ReactNode } from "react";

interface WTECheckItem {
  children: ReactNode;
}

export default function WTECheckItem({ children }: WTECheckItem): JSX.Element {
  return (
    <li className={styles.item}>
      <span className={styles.icon}>
        <CheckCircleIcon />
      </span>
      <span className={styles.text}>{children}</span>
    </li>
  );
}
