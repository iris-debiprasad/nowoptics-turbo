import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./OperationsSkeleton.module.scss";
import CommonTableSkeleton from "../CommonTableSkeleton/CommonTableSkeleton";

const ClinicalSchedulerSkeleton = () => {
  return (
    <div className={styles.operationsSkeleton}>
      <Skeleton height={15} width={180} variant="rectangular" />
      <Skeleton height={30} width={175} sx={{ marginTop: "20px" }} variant="rectangular" />
      <div className={styles.container}>
        <div className={styles.clinicalSchedulerHeader}>
          <Skeleton height={30} width={100} variant="rectangular" />
          <Skeleton height={20} width="50%" variant="rectangular" />
        </div>
        <div className={styles.header}>
          <Skeleton height={30} width={250} variant="rectangular" />
          <Skeleton height={30} width={100} variant="rectangular" />
        </div>
        <div className={styles.table}>
          <CommonTableSkeleton rows={5} columns={11} headSkeletonHeight={20} bodySkeletonHeight={30} />
        </div>
      </div>
    </div>
  );
};

export default ClinicalSchedulerSkeleton;
