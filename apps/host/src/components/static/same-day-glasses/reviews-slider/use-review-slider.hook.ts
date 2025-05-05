import React from "react";

import { debounce } from "@/utils/performance.utils";
import { SAME_DAY_GLASSES_REVIEWS } from "./reviews.constants";
import { useTranslation } from "react-i18next";

/** Represents the amount of time in MS units for debounced event of tracking visible slide */
const SLIDE_CHANGE_DELAY = 150;

/** Time defined in MS in which every slide will be visible */
const TIME_PER_SLIDE = 10000;

interface Return {
  sliderListRef: React.RefObject<HTMLDivElement>;
  visibleSlideIndex: number;
  goToSlide: (slide: number) => void;
}

export const useReviewSlider = (): Return => {
  const translation = useTranslation();
  const sliderListRef = React.useRef<HTMLDivElement>(null);
  const [visibleSlideIndex, setVisibleSlideIndex] = React.useState<number>(0);

  const reviews = SAME_DAY_GLASSES_REVIEWS(translation);

  // Effect for tracking the slide when moving the list horizontally
  React.useEffect(() => {
    const sliderElement = sliderListRef.current;
    if (!sliderElement) return;

    const trackVisibleSlide = debounce(() => {
      const reviewItemWidth: number =
        sliderElement.scrollWidth / reviews.length;
      const newVisibleSlideIndex: number = Math.floor(
        sliderElement.scrollLeft / reviewItemWidth,
      );

      setVisibleSlideIndex(newVisibleSlideIndex);
    }, SLIDE_CHANGE_DELAY);

    sliderElement.addEventListener("scroll", trackVisibleSlide);
    return () => sliderElement.removeEventListener("scroll", trackVisibleSlide);
  }, [sliderListRef]);

  const goToSlide = (slideIndex: number): void => {
    const sliderElement = sliderListRef.current;
    if (!sliderElement) return;

    const reviewItemWidth: number = sliderElement.scrollWidth / reviews.length;

    sliderElement.scrollTo({
      top: 0,
      left: reviewItemWidth * slideIndex,
      behavior: "smooth",
    }); // This line is smooth
    setVisibleSlideIndex(slideIndex);
  };

  // Effect for moving review slider after some time
  React.useEffect(() => {
    const slidingInterval: NodeJS.Timer = setInterval(
      () =>
        goToSlide(
          visibleSlideIndex >= reviews.length - 1 ? 0 : visibleSlideIndex + 1,
        ),
      TIME_PER_SLIDE,
    );

    return () => clearInterval(slidingInterval);
  }, [sliderListRef, visibleSlideIndex]);

  return { sliderListRef, visibleSlideIndex, goToSlide };
};
