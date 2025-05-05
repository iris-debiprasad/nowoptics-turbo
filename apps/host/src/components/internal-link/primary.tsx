import IconSVG from "../iconsvg/IconSVG";
import { InternalLink, Props } from "./internal-link";
import styles from "./internal-link.module.scss";

/**
 * Internal Link with Primary Button appearance, use it for internal page redirections, Nextjs's Link props are allowed
 */
export const InternalLinkPrimary = ({
  children,
  className,
  ...rest
}: Props): JSX.Element => (
  <InternalLink
    {...rest}
    className={`${styles["link--primary"]} ${className || ""}`}
  >
    {children}

    <IconSVG
      width="17"
      height="18"
      viewBox="0 0 17 18"
      fill="none"
      fillP="#010101"
      name="arrow_solid_right"
    />
  </InternalLink>
);

InternalLinkPrimary.displayName = "InternalLinkPrimary";
