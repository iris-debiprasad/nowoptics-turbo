import React from "react";
import styles from "./icon-button-toggling.module.scss";

interface IButtonAttributesItem {
  /** Button event when clicked */
  event: () => void;
  /** Tooltip when button is hovered */
  tooltip: string;
  /** Icon properties */
  icon: {
    /** Actual icon element */
    item: React.ReactNode;
    /** Type of icon, whether uses strokes or fills to color it, to handle hover transition */
    type: "stroke" | "fill";
  };
}

interface IProps {
  /** Toogle state to display in between normal and toggled */
  isToggled: boolean;
  /** Normal config for normal button and it's used when the `isToggled` prop is false */
  normal: IButtonAttributesItem;
  /** Toggled config for toggled button and it's used when the `isToggled` prop is true */
  toggled: IButtonAttributesItem;
}

/**
 * This component handles a transition for two state buttons, when not toggled, will display a button with an event and tooltip.
 * When toggled, will display another button with different event and tooltip
 */
export const IconButtonToggling = ({
  isToggled,
  normal,
  toggled,
}: IProps): JSX.Element => {
  const togglerClasses: string = `${styles.toggler} ${
    isToggled ? styles.toggled : ""
  }`;
  const normalButtonClasses: string = `${styles.toggler__button} ${
    styles[normal.icon.type]
  }`;
  const toggledButtonClasses: string = `${styles.toggler__button} ${
    styles[toggled.icon.type]
  }`;

  return (
    <div className={togglerClasses}>
      <div className={styles.toggler__wrapper}>
        <button
          aria-label={normal.tooltip}
          className={normalButtonClasses}
          onClick={normal.event}
          tabIndex={!isToggled ? 0 : -1}
          title={normal.tooltip}
          type="button"
        >
          {normal.icon.item}
        </button>

        <button
          aria-label={toggled.tooltip}
          className={toggledButtonClasses}
          onClick={toggled.event}
          tabIndex={isToggled ? 0 : -1}
          title={toggled.tooltip}
          type="button"
        >
          {toggled.icon.item}
        </button>
      </div>
    </div>
  );
};
