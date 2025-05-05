import React from "react";
import styles from "./ExamFormSkeleton.module.scss";
import { Paper, Skeleton } from "@mui/material";

const ExamFormSkeleton = () => {
  return (
    <div className={styles.container}>
      <div className={styles.titleBar}>
        <Skeleton height={25} width={280} variant="rectangular" />
        <Skeleton height={35} width={60} variant="rectangular" />
      </div>
      <Paper className={styles.innerContainer}>
        <div className={styles.bar}>
          <Skeleton height={20} width={500} variant="rectangular" />
        </div>
        <div className={styles.details}>
          <Skeleton height={25} width={280} variant="rectangular" />
          <div className={styles.detailsTable}>
            <div className={styles.row}>
              <Skeleton height={30} width="100%" variant="rectangular" />
              <Skeleton height={30} width="100%" variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={30} width="100%" variant="rectangular" />
              <Skeleton height={30} width="100%" variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={30} width="100%" variant="rectangular" />
              <Skeleton height={30} width="100%" variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={30} width="100%" variant="rectangular" />
              <Skeleton height={30} width="100%" variant="rectangular" />
            </div>
            <div className={styles.row}>
              <Skeleton height={30} width="100%" variant="rectangular" />
              <Skeleton height={30} width="100%" variant="rectangular" />
            </div>
          </div>
          <div className={styles.nextButton}>
            <Skeleton height={30} width={60} variant="rectangular" />
          </div>
        </div>
      </Paper>
    </div>
  );
};

export default ExamFormSkeleton;
