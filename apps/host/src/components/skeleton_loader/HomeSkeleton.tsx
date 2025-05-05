import { Skeleton } from "@mui/material";
import styles from "./HomeSkeleton.module.scss";
import React from "react";

function HomeSkeleton() {
  return (
    <div className={styles.homeSkeleton}>
      <Skeleton variant="rectangular" className={styles.checkEyeExamDiv} />
      <div className={`${styles.actionIcon} ${styles.mobile}`}>
        {new Array(3).fill("").map((_v, i) => (
          <div className={styles.circularSkeleton} key={i}>
            <Skeleton variant="circular" className={styles.circularSkeletonIcon} />
            <Skeleton variant="text" className={styles.iconDescription} />
          </div>
        ))}
      </div>
      <div className={styles.actionIcon}>
        {new Array(5).fill("").map((_v, i) => (
          <div className={styles.circularSkeleton} key={i}>
            <Skeleton variant="circular" className={styles.circularSkeletonIcon} />
            <Skeleton variant="text" className={styles.iconDescription} />
          </div>
        ))}
      </div>
      <div className={styles.grid1Mobile}>
        {new Array(1).fill("").map((_v, i) => (
          <div className={styles.gridItem} key={i}>
            <Skeleton variant="rectangular" className={styles.boxSkeletion} />
            <Skeleton />
            <Skeleton width="80%" />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </div>
        ))}
      </div>
      <div className={styles.grid1}>
        {new Array(3).fill("").map((_v, i) => (
          <div className={styles.gridItem} key={i}>
            <Skeleton variant="rectangular" className={styles.boxSkeletion} />
            <Skeleton />
            <Skeleton width="80%" />
            <Skeleton width="60%" />
            <Skeleton width="40%" />
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        {new Array(3).fill("").map((_v, i) => (
          <div className={styles.gridItem} key={i}>
            <Skeleton variant="rectangular" className={styles.boxSkeletion} />
          </div>
        ))}
      </div>

      <div className={styles.grid2}>
        {new Array(3).fill("").map((_v, i) => (
          <div className={styles.gridItem} key={i}>
            <Skeleton variant="rectangular" className={styles.boxSkeletion} />
          </div>
        ))}
      </div>

      <Skeleton variant="rectangular" className={styles.checkEyeExamDiv} />
      <Skeleton variant="rectangular" className={styles.checkEyeExamDiv} />
    </div>
  );
}

export default HomeSkeleton;
