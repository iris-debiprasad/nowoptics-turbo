import React from "react";
import styles from "./WalkInSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const WalkInSkeleton = () => {
  return (
    <div className={styles.walkInSkeleton}>
      <div className={styles.container}>
        <Skeleton height={20} width={180} variant="rectangular" />
        <div className={styles.title}>
          <Skeleton height={40} width={200} variant="rectangular" />
          <Skeleton
            className={styles.bar}
            height={25}
            width={700}
            variant="rectangular"
          />
          <Skeleton
            className={styles.barMobile}
            height={25}
            width={400}
            variant="rectangular"
          />
        </div>
        <div className={styles.details}>
          <div className={styles.detailsLeft}>
            <Skeleton height={30} width={300} variant="rectangular" />
            <div className={styles.subDetails}>
              <Skeleton height={50} width={250} variant="rectangular" />
              <Skeleton height={50} width={250} variant="rectangular" />
            </div>
            <div className={styles.calendar}>
              <div className={styles.dobLabel}>
                <Skeleton height={30} width={300} variant="rectangular" />
              </div>
              <div className={styles.dobField}>
                <Skeleton height={50} width={220} variant="rectangular" />
              </div>
              <div className={styles.button}>
                <Skeleton height={40} width={70} variant="rectangular" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.disclaimer}>
          <Skeleton height={15} width={550} variant="rectangular" />
          <Skeleton
            sx={{ marginTop: "30px" }}
            height={15}
            width={650}
            variant="rectangular"
          />
          <Skeleton
            sx={{ marginTop: "10px" }}
            height={15}
            width={150}
            variant="rectangular"
          />
        </div>
        <div className={styles.disclaimerMobile}>
          <Skeleton height={15} width="100%" variant="rectangular" />
          <Skeleton
            sx={{ marginTop: "30px" }}
            height={15}
            width="100%"
            variant="rectangular"
          />
          <Skeleton
            sx={{ marginTop: "10px" }}
            height={15}
            width="20%"
            variant="rectangular"
          />
        </div>
      </div>
    </div>
  );
};

export default WalkInSkeleton;
