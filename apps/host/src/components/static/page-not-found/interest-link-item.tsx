import Link from "next/link";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";

import {
  FormulatedInterestLink,
  InterestLink,
} from "./interest-links.constants";
import styles from "./page-not-found.module.scss";

export const InterestLinkItem = ({
  link,
}: {
  link: InterestLink | FormulatedInterestLink;
}) => {
  const isFormulated = "formulate" in link;

  if (isFormulated) {
    link satisfies FormulatedInterestLink;

    return (
      <p className={styles.navigation__text}>
        <span>
          {link.formulate.map((formula) =>
            typeof formula === "string" ? (
              formula
            ) : (
              <Link
                href={formula.href}
                key={formula.key}
                className={styles.navigation__link}
              >
                {formula.text}
              </Link>
            ),
          )}
        </span>

        <KeyboardArrowRightIcon />
      </p>
    );
  }

  link satisfies InterestLink;

  return (
    <Link href={link.href} className={styles.navigation__link}>
      {link.text}
      <KeyboardArrowRightIcon />
    </Link>
  );
};

InterestLinkItem.displayName = "InterestLinkItem";
