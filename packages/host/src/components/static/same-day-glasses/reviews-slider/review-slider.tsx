import React from "react";

import { ReviewItem } from "./review-item";
import { generateKey } from "./review-slider.utils";
import { SAME_DAY_GLASSES_REVIEWS } from "./reviews.constants";
import { useReviewSlider } from "./use-review-slider.hook";

import styles from "./review-slider.module.scss";
import { useTranslation } from "react-i18next";

/**
 * Component that renders a list of reviews, displays the review content and
 * related information such as the score for the review and author information, if the author picture
 * is not provided, a picture will be generated using the initials of the author name
 */
export const ReviewsSlider = (): JSX.Element => {
    const translation = useTranslation();
    const { goToSlide, visibleSlideIndex, sliderListRef } = useReviewSlider();

    // ==== React Render

    const reviews = SAME_DAY_GLASSES_REVIEWS(translation);

    const ReviewItems: JSX.Element[] = React.useMemo(
        () =>
            reviews.map((review, index) => (
                <ReviewItem key={generateKey()} {...{ index }} {...review} />
            )),
        [],
    );

    const NavigationDots: JSX.Element[] = [...new Array(reviews.length)].map(
        (_, index: number) => (
            <span
                className={`${styles.navigation__dot} ${visibleSlideIndex === index ? styles.active : ""
                    }`}
                key={generateKey()}
                onClick={() => goToSlide(index)}
            />
        ),
    );

    return (
        <section className={`content-wrapper ${styles.slider}`}>
            <div className={styles.slider__list} ref={sliderListRef}>
                {ReviewItems}
            </div>

            <div className={styles.navigation}>{NavigationDots}</div>
        </section>
    );
};

ReviewsSlider.displayName = "ReviewSlider";
