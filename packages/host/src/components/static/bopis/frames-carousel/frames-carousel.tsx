import React from "react";
import Image from "next/image";
import Link from "next/link";
import ArrowBackIosOutlinedIcon from "@mui/icons-material/ArrowBackIosOutlined";
import ArrowForwardIosOutlinedIcon from "@mui/icons-material/ArrowForwardIosOutlined";

import { FrameItem } from "../bopis.api";
import styles from "./frames-carousel.module.scss";
import useResponsive from "@/hooks/useResponsive";

export interface Props {
  frames: FrameItem[];
}

const SLIDES_VISIBLE = {
  md: 2,
  xl: 3,
};

export const FramesCarousel = ({ frames }: Props): JSX.Element => {
  const [active, setActive] = React.useState<number>(0);
  const hasReached = useResponsive();

  const next = (): void =>
    setActive((prev) => (prev + 1 > frames.length - 1 ? prev : prev + 1));

  const previous = (): void =>
    setActive((prev) => (prev - 1 < 0 ? prev : prev - 1));

  // === Render

  // Logic to avoid sliding when no more items will be showed and will show blank space
  const stopSlidingNext = hasReached.xl
    ? SLIDES_VISIBLE.xl - 1
    : hasReached.md
      ? SLIDES_VISIBLE.md - 1
      : 0;

  return (
    <div className={styles.carousel}>
      <button
        className={`${styles.carousel__button} ${active <= 0 ? styles.hidden : ""
          }`}
        onClick={previous}
        type="button"
      >
        <ArrowBackIosOutlinedIcon />
      </button>

      <div className={styles.carousel__container}>
        <div
          className={styles.carousel__wrapper}
          style={
            {
              "--slide": active,
            } as React.CSSProperties
          }
        >
          {frames.map((frame) => (
            <div className={styles.carousel__item} key={frame.sku}>
              <Link href={frame.pdp} as={frame.pdp} className={styles.frame}>
                <figure>
                  <Image
                    alt={frame.webName}
                    className={`img ${styles.frame__img}`}
                    width={349}
                    height={190}
                    layout="responsive"
                    src={frame.imageUrl}
                  />
                </figure>

                <p className={styles.frame__name}>{frame.webName}</p>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button
        className={`${styles.carousel__button} ${active >= frames.length - 1 - stopSlidingNext ? styles.hidden : ""
          }`}
        onClick={next}
        type="button"
      >
        <ArrowForwardIosOutlinedIcon />
      </button>
    </div>
  );
};

FramesCarousel.displayNamev = "FramesCarousel";
