import React from "react";

import styles from "./avatar.module.scss";
import Image from "next/image";

const SPECIAL_CHARACTERS_REGEX = /[&/\\#, +()$~%.'":*?<>{}]/g;

export enum AvatarColor {
    RED = "red",
    YELLOW = "yellow",
    SKY_BLUE = "sky-blue",
}

interface IProps {
    /** Background colors to set to avatar if picture is not provided */
    color: AvatarColor;
    /** Name that will be used as base text to get the initials or alt text */
    name: string;
    /** Avatar picture to display */
    picture?: string;
    /** Size of the avatar picture */
    size: number;
}

/**
 * UI Component to display a circle-rounded picture, if picture is not provided, will display a fallback,
 * displays a colored background and the provided name initials.
 */
export const Avatar = ({ color, name, picture, size }: IProps): JSX.Element => {
    if (picture)
        return (
            <Image
                alt={name}
                className={`${styles.avatar}`}
                src={picture}
                width={size}
                height={size}
            />
        );

    const wordsWithNoSpecialCharacters: string[] = name
        .split(" ")
        .map((word) => word.replace(SPECIAL_CHARACTERS_REGEX, ""));

    const initials: string = wordsWithNoSpecialCharacters.reduce(
        (nameInitials, word) => (nameInitials += word.at(0)),
        "",
    );

    const classes: string = `${styles.avatar} ${styles.initials} ${styles[`avatar--${color}`]
        }`;

    const avatarSizeStyles: React.CSSProperties = {
        width: size,
        height: size,
    };

    return (
        <div className={classes} style={avatarSizeStyles}>
            {initials}
        </div>
    );
};

Avatar.displayName = "Avatar";
