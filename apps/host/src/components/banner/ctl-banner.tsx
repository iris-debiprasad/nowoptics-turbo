import React from "react";
import { BaseBanner, Props as BaseBannerProps } from "./base-banner";
import styles from "./banner.module.scss";

type HeadlineTag = keyof Pick<
  React.ReactHTML,
  "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "span" | "p"
>;

interface HeadlineAttributes {
  /** Text that will be rendered inside the tag, content can be html */
  text: string;
  /** Tag that will be used to render the text */
  as: HeadlineTag;
  /** Title className to extend the headline styles */
  className?: string;
}

interface Props extends Omit<BaseBannerProps, "children"> {
  /** Defines the title attributes for the rendered content */
  title: HeadlineAttributes;
  /** Defines the subtitle attributes for the rendered content */
  subtitle?: HeadlineAttributes;
}

/**
 * CTLBanner stands for "Content to Left banner", this banner displays a title to the left and
 * vertically centered, can also render a subtitle below it, but it's not required,
 * can pass attributes to modify and use title and subtitle final render (TitleAttributes).
 *
 * @example
 * <TTLBanner banner={{ ...banner }} title={{ ...title }} subtitle={{ ...subtitle }} />
 */
export const CTLBanner = ({
  title: { as: TitleTag, className: titleClassName, text: titleText },
  subtitle,
  ...rest
}: Props): JSX.Element => {
  let SubtitleElement: JSX.Element | null = null;

  if (typeof subtitle !== "undefined") {
    const {
      as: SubtitleTag,
      className: subtitleClassName,
      text: subtitleText,
    } = subtitle!;

    SubtitleElement = (
      <SubtitleTag
        className={`${styles["ttl-banner__subtitle"]} ${subtitleClassName || ""
          }`}
        tabIndex={0}
        dangerouslySetInnerHTML={{ __html: subtitleText }}
      />
    );
  }

  return (
    <BaseBanner {...rest} classes={{ content: styles["ttl-banner"] }}>
      <div className={styles["ttl-banner__wrapper"]}>
        <div>
          <TitleTag
            className={`${styles["ttl-banner__title"]} ${titleClassName || ""}`}
            dangerouslySetInnerHTML={{ __html: titleText }}
            tabIndex={0}
          />

          {SubtitleElement}
        </div>
      </div>
    </BaseBanner>
  );
};

CTLBanner.displayName = "TTLBanner";
