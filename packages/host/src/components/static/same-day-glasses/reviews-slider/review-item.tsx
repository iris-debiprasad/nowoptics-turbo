import React from "react";
import StarOutlinedIcon from "@mui/icons-material/StarOutlined";

import { Avatar, AvatarColor } from "./avatar";
import { generateKey } from "./review-slider.utils";

import styles from "./review-slider.module.scss";

interface IReviewAuthor {
    /** Author name */
    name: string;
    /** Author state */
    state: string;
    /** Author picture */
    picture: string;
}

export interface IReviewItem {
    /** Author object data */
    author: IReviewAuthor;
    /** Review content that will be displayed along with the author and score */
    content: string;
    /** Element index that will be used for handling background color when `author.picture` is not provided */
    index: number;
    /** Score are the stars given to a review, go from 1 to 5, if this range is not met, will throw an error */
    score: number;
}

const getAvatarColor = (index: number): AvatarColor => {
    if (index % 3 === 0) return AvatarColor.SKY_BLUE;
    if (index % 2 === 0) return AvatarColor.YELLOW;
    return AvatarColor.RED;
};

/**
 *  Review item to display review information such as score (stars from 1 to 5), author data and the review itself
 */
export const ReviewItem = ({
    author,
    content,
    index,
    score,
}: IReviewItem): JSX.Element => {
    const StarElements: JSX.Element[] = [...new Array(score)].map(
        (_, index: number) => {
            return (
                <StarOutlinedIcon
                    key={generateKey()}
                    className={index + 1 <= score ? styles.review__star : ""}
                />
            );
        },
    );

    return (
        <article className={styles.review} key={score + author.name}>
            <div className={styles.review__user}>
                <Avatar
                    color={getAvatarColor(index)}
                    name={author.name}
                    picture={author.picture}
                    size={93}
                />

                <div>
                    <span className={styles["review__user-name"]}>
                        {author.name}, <br /> {author.state}
                    </span>

                    <p>{StarElements}</p>
                </div>
            </div>

            <p className={styles.review__content}>{content}</p>
        </article>
    );
};

ReviewItem.displayName = "ReviewItem";
