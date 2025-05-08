import React from "react";
import Link from "next/link";
import LinkIcon from "@mui/icons-material/Link";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { QUICK_JUMPS, SectionReference } from "../faq-sections.constants";
import { UseNavigationSpyReturn } from "../use-navigation-spy";
import styles from "./navigation-mobile.module.scss";
import { throttle } from "@root/host/src/utils/performance.utils";
import { useTranslation } from "react-i18next";

interface Props extends UseNavigationSpyReturn {
  navigationRef: React.RefObject<HTMLDivElement>;
}

const NavigationMobileNoWrapper = ({
  activeSectionId,
  navigationRef,
  setActiveSectionId,
}: Props): JSX.Element => {
  const translation = useTranslation();
  const [isMenuOpen, setIsMenuOpen] = React.useState<boolean>(false);
  const { entry } = useIntersectionObserver({
    elementRef: navigationRef,
    options: { rootMargin: "-130px" },
  });

  const toggleMenu = (): void => setIsMenuOpen((prev) => !prev);
  const closeMenu = (): void => setIsMenuOpen(false);

  // === Render

  /** When top quick jumps are not visible, navigation should show */
  const shouldDisplay = !entry?.isIntersecting;

  return (
    <>
      <button
        className={`${styles["menu-button"]} ${shouldDisplay ? styles.show : ""
          }`}
        onClick={toggleMenu}
        type="button"
      >
        <LinkIcon />
      </button>

      {shouldDisplay ? (
        <nav
          className={`${styles.navigation} ${isMenuOpen && shouldDisplay ? styles.show : ""
            }`}
          onClick={closeMenu}
        >
          {QUICK_JUMPS(translation).map((jump) => (
            <div
              className={`${styles.navigation__link} ${activeSectionId === (jump.to as SectionReference)
                  ? styles.active
                  : ""
                }`}
              key={`desk-${jump.to}${jump.label}`}
              onClick={() => setActiveSectionId(jump.to as SectionReference)}
            >
              <Link href={`#${jump.to}`} scroll={false}>
                {jump.label}
              </Link>
            </div>
          ))}
        </nav>
      ) : (
        <></>
      )}
    </>
  );
};

/** Corresponds to "medium" css breakpoint */
const BREAKPOINT_TO_START_HIDING = 900;

export const NavigationMobile = (props: Props): JSX.Element => {
  const [shouldDisplayNavigation, setShouldDisplayNavigation] =
    React.useState<boolean>(false);

  React.useEffect(() => {
    const setNavigationVisibility = (): void =>
      setShouldDisplayNavigation(
        window.innerWidth <= BREAKPOINT_TO_START_HIDING,
      );

    const handleResize = throttle(setNavigationVisibility);

    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  return shouldDisplayNavigation ? (
    <NavigationMobileNoWrapper {...props} />
  ) : (
    <></>
  );
};

NavigationMobile.displayName = "NavigationMobile";
