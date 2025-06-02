import { Grid, Skeleton } from "@mui/material";
import React from "react";
import styles from "./CatalogSkeleton.module.scss";

const CatalogSkeleton = () => {
  return (
    <div className={styles.catalogSkeleton}>
      <div className={styles.container}>
        <div className={styles.snackbar_filter}>
          <Skeleton className={styles.snackbar} variant="rectangular" height={25} width={80} />
        </div>
        <div className={styles.title}>
          <Skeleton variant="rectangular" height={40} width={80} />
          <Skeleton className={styles.filters} variant="rectangular" height={25} width={150} />
        </div>
        <div className={styles.itemCount}>
          <Skeleton variant="rectangular" height={25} width={230} />
        </div>
        <Grid container className={styles.productsGrid} spacing={4}>
          {[...new Array(9)].map((val, i) => (
            <Grid key={i} item lg={4} xs={12}>
              <div className={styles.product}>
                <Skeleton variant="rectangular" sx={{ width: "100%" }} height={288} />
                <div className={styles.colorsContainer}>
                  <Skeleton variant="circular" width={35} height={35} />
                  <Skeleton variant="circular" width={35} height={35} />
                  <Skeleton variant="circular" width={35} height={35} />
                </div>
                <Skeleton variant="rectangular" height={10} width={80} />
                <Skeleton className={styles.price} variant="rectangular" height={30} width={80} />
              </div>
            </Grid>
          ))}
        </Grid>
        <div className={styles.loadMore}>
          <Skeleton variant="rectangular" width={100} height={30} />
        </div>
      </div>
    </div>
  );
};

export default CatalogSkeleton;
