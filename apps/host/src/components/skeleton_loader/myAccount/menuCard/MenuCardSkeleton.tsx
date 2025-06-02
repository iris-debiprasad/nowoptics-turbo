import React from "react";
import styles from "./MenuCardSkeleton.module.scss";
import { Paper, Skeleton } from "@mui/material";

const MenuCardSkeleton = () => {
  return (
    <Paper className={styles.menuCard}>
      <Skeleton sx={{ marginTop: "-90px" }} width={150} height={150} variant="circular" />
      <div className={styles.title}>
        <Skeleton height={25} width={180} variant="rectangular" />
        <Skeleton height={10} width={90} variant="rectangular" />
      </div>
      <Skeleton height={25} width={120} variant="rectangular" />
      <div className={styles.details}>
        <Skeleton height={10} width={110} variant="rectangular" />
        <Skeleton height={10} width={110} variant="rectangular" />
        <Skeleton height={10} width={110} variant="rectangular" />
        <Skeleton height={10} width={110} variant="rectangular" />
        <Skeleton height={10} width={110} variant="rectangular" />
        <Skeleton height={10} width={110} variant="rectangular" />
      </div>
    </Paper>
  );
};

export default MenuCardSkeleton;
