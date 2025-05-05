import React from "react";
import styles from "./JobStatusSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const JobStatusSkeleton = () => {
  return (
    <div className={styles.operationsSkeleton}>
      <Skeleton height={15} width={280} variant="rectangular" />
      <div className={styles.container}>
        <div className={styles.header}>
          <Skeleton height={20} width={250} variant="rectangular" />
        </div>
        <div className={styles.form}>
          <div className={styles.row}>
            <Skeleton height={40} width="100%" variant="rectangular" />
            <Skeleton height={40} width="100%" variant="rectangular" />
          </div>
          <div className={styles.row}>
            <Skeleton height={40} width="100%" variant="rectangular" />
            <Skeleton height={40} width="100%" variant="rectangular" />
          </div>
          <div className={styles.row}>
            <Skeleton height={40} width="100%" variant="rectangular" />
            <Skeleton height={40} width="100%" variant="rectangular" />
          </div>
        </div>
        <Skeleton height={30} width={100} variant="rectangular" />
      </div>
    </div>
  );
};

export default JobStatusSkeleton;
