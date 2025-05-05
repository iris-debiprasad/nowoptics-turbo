import React from "react";
import styles from "./LoyaltyClubSkeleton.module.scss";
import { Paper, Skeleton } from "@mui/material";

const LoyaltyClubSkeleton = () => {
  return (
    <Paper className={styles.container}>
      <Skeleton height={30} width={150} variant="rectangular" />
      <Skeleton height={30} width="100%" variant="rectangular" />
      <Skeleton height={30} width="100%" variant="rectangular" />
      <Skeleton height={30} width="100%" variant="rectangular" />
      <Skeleton height={30} width="100%" variant="rectangular" />
    </Paper>
  );
};

export default LoyaltyClubSkeleton;
