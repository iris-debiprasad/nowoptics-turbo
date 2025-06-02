import React from "react";
import styles from "./ScheduleExamSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const ScheduleExamSkeleton = () => {
  return (
    <div className={styles.scheduleExamSkeleton}>
      <div className={styles.container}>
        <Skeleton height={20} width={180} variant="rectangular" />
        <div className={styles.title}>
          <Skeleton height={40} width={100} variant="rectangular" />
        </div>
        <div className={styles.details}>
          <div className={styles.left}>
            <div className={styles.searchBar}>
              <Skeleton height={20} width="40%" variant="rectangular" />
              <Skeleton height={40} width="100%" variant="rectangular" />
            </div>
            {new Array(3).fill(0).map((_, idx) => (
              <div key={idx} className={styles.storeDetails}>
                <Skeleton
                  sx={{ marginLeft: "auto" }}
                  height={40}
                  width={120}
                  variant="rectangular"
                />
                <Skeleton height={40} width="100%" variant="rectangular" />
                <Skeleton height={10} width="30%" variant="rectangular" />
                <Skeleton height={10} width="20%" variant="rectangular" />
                <Skeleton height={10} width="20%" variant="rectangular" />
                <Skeleton
                  sx={{ marginTop: "20px" }}
                  height={40}
                  width="100%"
                  variant="rectangular"
                />
              </div>
            ))}
          </div>
          <div className={styles.right}>
            <Skeleton height={500} width="100%" variant="rectangular" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default ScheduleExamSkeleton;
