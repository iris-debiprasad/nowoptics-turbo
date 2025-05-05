import React from "react";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";

import { NavItem } from "@/types/Header.types";
import sharedStyles from "../index.module.scss";
import styles from "./index.module.scss";
import type { Props as NavbarProps } from ".";
import Link from "next/link";

export interface SubMenuItem extends Pick<NavItem, "name" | "id" | "url"> { }

interface Props extends NavbarProps {
  label: string;
  items: SubMenuItem[];
}

export function SubMenu({
  label,
  items,
  onClose,
}: Readonly<Props>): React.JSX.Element {
  const [visible, setVisible] = React.useState<boolean>(false);

  const toggleSubmenu = () => setVisible((prev) => !prev);

  return (
    <div>
      <button
        className={`${styles.toggle} ${visible ? styles.visible : ""}`}
        onClick={toggleSubmenu}
        type="button"
      >
        {label}

        <ChevronRightIcon />
      </button>

      <div className={`${styles.submenu} ${visible ? styles.visible : ""}`}>
        <div className={styles.submenu_content}>
          {items.map((item) => (
            <Link
              key={item.id}
              href={item.url}
              className={sharedStyles.link}
              onClick={onClose}
            >
              {item.name}
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
