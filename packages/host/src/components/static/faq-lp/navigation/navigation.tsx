import React from "react";
import Link from "next/link";

import { QUICK_JUMPS, SectionReference } from "../faq-sections.constants";
import { type UseNavigationSpyReturn } from "../use-navigation-spy";
import styles from "./navigation.module.scss";
import { useTranslation } from "react-i18next";

type Ref = HTMLDivElement;
interface Props extends UseNavigationSpyReturn { }

export const Navigation = React.forwardRef<Ref, Props>(
  ({ activeSectionId, setActiveSectionId }, ref): JSX.Element => {
    const translation = useTranslation();
    const { t } = translation;

    return (
      <nav className={styles.navigation} {...{ ref }}>
        <p className={styles.navigation__title}>{t("FAQ.QUICK_JUMPS")}</p>

        {QUICK_JUMPS(translation).map((jump) => (
          <div
            key={`mobi-${jump.to}${jump.label}`}
            onClick={() => setActiveSectionId(jump.to as SectionReference)}
          >
            <Link
              className={`${styles.navigation__link} ${activeSectionId === (jump.to as SectionReference)
                  ? styles.active
                  : ""
                }`}
              href={`#${jump.to}`}
              scroll={false}
            >
              {jump.label}
            </Link>
          </div>
        ))}
      </nav>
    );
  },
);

Navigation.displayName = "Navigation";
