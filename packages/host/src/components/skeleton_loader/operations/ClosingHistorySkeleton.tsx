import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./OperationsSkeleton.module.scss";

const ClosingHistorySkeleton = () => {
  return (
    <div className={styles.operationsSkeleton}>
      <Skeleton height={15} width={200} variant="rectangular" />
      <div className={styles.container}>
        <div className={styles.closingHistoryHeader}>
          <Skeleton height={40} width="25%" variant="rectangular" />
          <Skeleton height={40} width="25%" variant="rectangular" />
          <Skeleton height={40} width="10%" variant="rectangular" />
        </div>
      </div>
    </div>
  );
};

export default ClosingHistorySkeleton;
