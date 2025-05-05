import { Skeleton } from "@mui/material";

import styles from "./ImageSlider.module.scss";

const ImageSliderSkeleton = () => {
  return (
    <div className={styles.skeletonImageSliderContainer}>
      <Skeleton
        className={styles.leftArrow}
        key={`left-arrow`}
        variant="circular"
        width={40}
        height={40}
      />
      {Array(3)
        .fill("")
        .map((_v, i) => (
          <div key={`${i}_image_slider`} className={styles.imageSliderDesktop}>
            <Skeleton
              className={styles.imageSliderAvtar}
              key={`${i}_avtar`}
              variant="rectangular"
              width={180}
              height={180}
            />
            <Skeleton
              key={`${i}_title`}
              animation="wave"
              height={20}
              width="60%"
            />
            <Skeleton
              key={`${i}_price`}
              animation="wave"
              height={20}
              width="40%"
            />
          </div>
        ))}
      {Array(1)
        .fill("")
        .map((_v, i) => (
          <div key={`${i}_image_slider`} className={styles.imageSliderMobile}>
            <Skeleton
              className={styles.imageSliderAvtar}
              key={`${i}_avtar`}
              variant="rectangular"
              width={180}
              height={180}
            />
            <Skeleton
              key={`${i}_title`}
              animation="wave"
              height={20}
              width="60%"
            />
            <Skeleton
              key={`${i}_price`}
              animation="wave"
              height={20}
              width="40%"
            />
          </div>
        ))}
      <Skeleton
        className={styles.rightArrow}
        key={`right-arrow`}
        variant="circular"
        width={40}
        height={40}
      />
    </div>
  );
};

export default ImageSliderSkeleton;
