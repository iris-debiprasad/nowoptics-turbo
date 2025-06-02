import { UseTranslationResponse } from "react-i18next";

export interface ReviewAuthor {
    /** Author name */
    name: string;
    /** Author state */
    state: string;
    /** Author picture */
    picture: string;
}

export interface IReviewItem {
    /** Author object data */
    author: ReviewAuthor;
    /** Review content that will be displayed along with the author and score */
    content: string;
    /** Score are the stars given to a review, go from 1 to 5, if this range is not met, will throw an error */
    score: number;
}

export const SAME_DAY_GLASSES_REVIEWS = ({
    t,
}: UseTranslationResponse<"translation", undefined>): IReviewItem[] => [
        {
            author: {
                name: "Toledo",
                picture: "",
                state: "OH",
            },
            content: t("SAME_DAY_GLASSES.REVIEW_1_CONTENT"),
            score: 5,
        },
        {
            author: {
                name: "Knoxville",
                picture: "",
                state: "TN",
            },
            content: t("SAME_DAY_GLASSES.REVIEW_2_CONTENT"),
            score: 5,
        },
        {
            author: {
                name: "La Mesa",
                picture: "",
                state: "CA",
            },
            content: t("SAME_DAY_GLASSES.REVIEW_3_CONTENT"),
            score: 5,
        },
        {
            author: {
                name: "Davenport",
                picture: "",
                state: "IA",
            },
            content: t("SAME_DAY_GLASSES.REVIEW_4_CONTENT"),
            score: 5,
        },
    ];
