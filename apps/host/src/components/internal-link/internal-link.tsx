import NextLink, { LinkProps } from "next/link";
import React from "react";
import styles from "./internal-link.module.scss";

export type Props = Omit<
  React.AnchorHTMLAttributes<HTMLAnchorElement>,
  keyof LinkProps
> &
  LinkProps & {
    children?: React.ReactNode;
  } & React.RefAttributes<HTMLAnchorElement>;

/**
 * Link that have the appearance of a button, but the functionality of a link, it is used
 * as internal redirection, use the NextJS Link Props.
 */
export const InternalLink = ({
  className,
  children,
  ...rest
}: Props): JSX.Element => {
  const classes: string = `${styles.link} ${className || ""}`;

  return (
    <NextLink {...rest} className={classes}>
      {children}
    </NextLink>
  );
};

InternalLink.displayName = "InternalLink";
