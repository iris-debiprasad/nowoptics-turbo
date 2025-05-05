import React from "react";
import styles from "./OrderStatusSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const OrderStatusSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Skeleton height={30} width="20%" variant="rectangular" />
        <div className={styles.text}>
          <Skeleton height={20} width="100%" variant="rectangular" />
        </div>
        <div className={styles.textMobile}>
          <Skeleton height={20} width="100%" variant="rectangular" />
          <Skeleton height={20} width="100%" variant="rectangular" />
          <Skeleton height={20} width="40%" variant="rectangular" />
        </div>
        <div className={styles.inputsContainer}>
          <Skeleton height={40} width="40%" variant="rectangular" />
          <Skeleton height={40} width="40%" variant="rectangular" />
        </div>
        <div className={styles.inputsContainerMobile}>
          <Skeleton height={40} width="100%" variant="rectangular" />
          <Skeleton height={40} width="100%" variant="rectangular" />
        </div>
        <Skeleton height={40} width="25%" variant="rectangular" />
      </div>
    </div>
  );
};

export default OrderStatusSkeleton;
