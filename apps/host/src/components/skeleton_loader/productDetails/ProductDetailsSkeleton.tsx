import React from "react";
import styles from "./ProductDetailsSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const ProductDetailsSkeleton = () => {
  return (
    <div className={styles.productDetailsSkeleton}>
      <div className={styles.container}>
        <div className={styles.header}>
          <div className={styles.imageContainer}>
            <Skeleton className={styles.image} variant="rectangular" />
            <div className={styles.imagePreviewContainer}>
              <Skeleton height={105} width={180} variant="rectangular" />
              <Skeleton height={105} width={180} variant="rectangular" />
              <Skeleton height={105} width={180} variant="rectangular" />
              <Skeleton height={105} width={180} variant="rectangular" />
            </div>
          </div>
          <div className={styles.titleDetails}>
            <Skeleton height={35} width={200} variant="rectangular" />
            <Skeleton sx={{ marginTop: "10px" }} height={20} width={200} variant="rectangular" />
            <div className={styles.price}>
              <Skeleton height={35} width={120} variant="rectangular" />
              <Skeleton height={35} width={100} variant="rectangular" />
            </div>
            <div className={styles.colorsContainer}>
              <Skeleton variant="circular" width={35} height={35} />
              <Skeleton variant="circular" width={35} height={35} />
              <Skeleton variant="circular" width={35} height={35} />
            </div>
            <div className={styles.primaryButtonsContainer}>
              <Skeleton height={40} width={150} variant="rectangular" />
              <Skeleton height={40} width={180} variant="rectangular" />
            </div>

            <div className={styles.secondaryButtonsContainer}>
              <Skeleton height={40} width={150} variant="rectangular" />
              <Skeleton height={40} width={180} variant="rectangular" />
            </div>
          </div>
        </div>
        <div className={styles.details}>
          <div className={styles.description}>
            <Skeleton height={40} width={180} variant="rectangular" />
            <div className={styles.text}>
              <span className={styles.line}>
                <Skeleton height={20} width="60%" variant="rectangular" />
                <Skeleton height={20} width="30%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="40%" variant="rectangular" />
                <Skeleton height={20} width="20%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="30%" variant="rectangular" />
                <Skeleton height={20} width="30%" variant="rectangular" />
                <Skeleton height={20} width="10%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="20%" variant="rectangular" />
                <Skeleton height={20} width="30%" variant="rectangular" />
                <Skeleton height={20} width="40%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="20%" variant="rectangular" />
                <Skeleton height={20} width="70%" variant="rectangular" />
              </span>
            </div>
            <div className={styles.text}>
              <span className={styles.line}>
                <Skeleton height={20} width="60%" variant="rectangular" />
                <Skeleton height={20} width="30%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="40%" variant="rectangular" />
                <Skeleton height={20} width="20%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="30%" variant="rectangular" />
                <Skeleton height={20} width="30%" variant="rectangular" />
                <Skeleton height={20} width="10%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="20%" variant="rectangular" />
                <Skeleton height={20} width="30%" variant="rectangular" />
                <Skeleton height={20} width="40%" variant="rectangular" />
              </span>
              <span className={styles.line}>
                <Skeleton height={20} width="20%" variant="rectangular" />
                <Skeleton height={20} width="70%" variant="rectangular" />
              </span>
            </div>
          </div>
          <div className={styles.specifications}>
            <Skeleton height={40} width={180} variant="rectangular" />
            <div className={styles.specificationDetails}>
              <div className={styles.row}>
                <Skeleton height={30} width={70} variant="rectangular" />
                <Skeleton height={30} width={50} variant="rectangular" />
              </div>
              <div className={styles.row}>
                <Skeleton height={30} width={90} variant="rectangular" />
                <Skeleton height={30} width={90} variant="rectangular" />
              </div>
              <div className={styles.row}>
                <Skeleton height={30} width={90} variant="rectangular" />
                <Skeleton height={30} width={40} variant="rectangular" />
              </div>
              <div className={styles.row}>
                <Skeleton height={30} width={70} variant="rectangular" />
                <Skeleton height={30} width={50} variant="rectangular" />
              </div>
              <div className={styles.row}>
                <Skeleton height={30} width={90} variant="rectangular" />
                <Skeleton height={30} width={90} variant="rectangular" />
              </div>
              <div className={styles.row}>
                <Skeleton height={30} width={90} variant="rectangular" />
                <Skeleton height={30} width={40} variant="rectangular" />
              </div>
              <div className={styles.row}>
                <Skeleton height={30} width={70} variant="rectangular" />
                <Skeleton height={30} width={50} variant="rectangular" />
              </div>
              <div className={styles.row}>
                <Skeleton height={30} width={90} variant="rectangular" />
                <Skeleton height={30} width={90} variant="rectangular" />
              </div>
            </div>
          </div>
        </div>
        <div className={styles.suggestions}>
          <Skeleton height={40} width={250} variant="rectangular" />
          <div className={styles.row}>
            <div className={styles.item}>
              <Skeleton height={250} width={300} variant="rectangular" />
              <Skeleton height={40} width={100} variant="rectangular" />
            </div>
            <div className={styles.item}>
              <Skeleton height={250} width={300} variant="rectangular" />
              <Skeleton height={40} width={100} variant="rectangular" />
            </div>
            <div className={styles.item}>
              <Skeleton height={250} width={300} variant="rectangular" />
              <Skeleton height={40} width={100} variant="rectangular" />
            </div>
          </div>
        </div>
        <div className={styles.suggestionsMobile}>
          <Skeleton height={40} width={250} variant="rectangular" />
          <div className={styles.row}>
            <div className={styles.item}>
              <Skeleton height={250} width={300} variant="rectangular" />
              <Skeleton height={40} width={100} variant="rectangular" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ProductDetailsSkeleton;
