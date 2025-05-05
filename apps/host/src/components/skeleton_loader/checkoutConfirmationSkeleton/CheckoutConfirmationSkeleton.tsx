import React from "react";
import styles from "./CheckoutConfirmationSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const CheckoutConfirmationSkeleton = () => {
  return (
    <div className={styles.checkoutConfirmationSkeleton}>
      <div className={styles.container}>
        <div className={styles.topDetails}>
          <div className={styles.details}>
            <Skeleton height={10} width={200} variant="rectangular" />
            <Skeleton height={10} width={180} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
            <Skeleton height={10} width={190} variant="rectangular" />
            <Skeleton height={10} width={100} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
          </div>
          <div className={styles.details}>
            <Skeleton height={10} width={200} variant="rectangular" />
            <Skeleton height={10} width={180} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
            <Skeleton height={10} width={190} variant="rectangular" />
            <Skeleton height={10} width={100} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
          </div>
          <div className={styles.details}>
            <Skeleton height={150} width={150} variant="rectangular" />
          </div>
        </div>
        <Skeleton sx={{ marginTop: "40px" }} height={40} width="100%" variant="rectangular" />
        {[...new Array(3)].map((idx) => (
          <div key={idx} style={{ marginTop: "10px" }} className={styles.topDetails}>
            <div className={styles.details}>
              <Skeleton height={10} width={180} variant="rectangular" />
              <Skeleton height={10} width={100} variant="rectangular" />
            </div>
            <div className={`${styles.details} ${styles.detailsMiddle}`}>
              <Skeleton height={10} width="80%" variant="rectangular" />
              <Skeleton height={10} width={180} variant="rectangular" />
              <Skeleton height={10} width={150} variant="rectangular" />
              <Skeleton sx={{ marginTop: "10px" }} height={10} width="60%" variant="rectangular" />
              <Skeleton height={10} width={100} variant="rectangular" />
              <Skeleton height={10} width={150} variant="rectangular" />
            </div>
            <div className={styles.details}>
              <Skeleton className={styles.detailsImage} height={150} width={300} variant="rectangular" />
              <Skeleton className={styles.detailsImageMobile} height={100} width={200} variant="rectangular" />
            </div>
          </div>
        ))}
        <Skeleton sx={{ marginTop: "40px" }} height={40} width="100%" variant="rectangular" />
        <div style={{ marginTop: "10px" }} className={styles.topDetails}>
          <div className={styles.details}>
            <Skeleton height={10} width={200} variant="rectangular" />
            <Skeleton height={10} width={180} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
            <Skeleton height={10} width={190} variant="rectangular" />
            <Skeleton height={10} width={100} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
          </div>
          <div className={styles.details}>
            <Skeleton height={10} width={200} variant="rectangular" />
            <Skeleton height={10} width={180} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
            <Skeleton height={10} width={190} variant="rectangular" />
            <Skeleton height={10} width={100} variant="rectangular" />
            <Skeleton height={10} width={150} variant="rectangular" />
          </div>
          <div className={styles.details}>
            <Skeleton height={150} width={150} variant="rectangular" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default CheckoutConfirmationSkeleton;
