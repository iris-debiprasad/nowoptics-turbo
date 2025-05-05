import React from "react";
import styles from "./MyProfileSkeleton.module.scss";
import { Paper, Skeleton } from "@mui/material";

const MyProfileSkeleton = () => {
  return (
    <Paper className={styles.right}>
      <Skeleton height={25} width={180} variant="rectangular" />
      <div className={styles.topDetails}>
        <div className={styles.table}>
          <div className={styles.col}>
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
          </div>
          <div className={styles.col}>
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
            <Skeleton height={10} width={120} variant="rectangular" />
          </div>
        </div>
        <div className={styles.fillerDetails}>
          <Skeleton width={150} height={150} variant="circular" />
          <Skeleton width={150} height={150} variant="circular" />
        </div>
      </div>
      <Skeleton sx={{ marginTop: "30px" }} height={2} width="100%" variant="rectangular" />
      <div className={styles.addressDetails}>
        <Skeleton height={25} width={180} variant="rectangular" />
        <div className={styles.addressTable}>
          <div className={styles.addressCol}>
            <Skeleton sx={{ marginBottom: "10px" }} height={20} width={100} variant="rectangular" />
            <Skeleton height={10} width={200} variant="rectangular" />
            <Skeleton height={10} width={180} variant="rectangular" />
            <Skeleton height={10} width={100} variant="rectangular" />
          </div>
          <div className={styles.addressCol}>
            <Skeleton sx={{ marginBottom: "10px" }} height={20} width={100} variant="rectangular" />
            <Skeleton height={10} width={200} variant="rectangular" />
            <Skeleton height={10} width={180} variant="rectangular" />
            <Skeleton height={10} width={100} variant="rectangular" />
          </div>
        </div>
        <Skeleton sx={{ marginTop: "30px" }} height={20} width={60} variant="rectangular" />
      </div>
      <Skeleton height={2} width="100%" variant="rectangular" />
      <div className={styles.communicationDetails}>
        <Skeleton height={25} width={300} variant="rectangular" />
        <Skeleton height={10} width="100%" variant="rectangular" />
        <div className={styles.text}>
          <Skeleton height={10} width="100%" variant="rectangular" />
          <Skeleton height={10} width="100%" variant="rectangular" />
          <Skeleton height={10} width="80%" variant="rectangular" />
        </div>
      </div>
      <Skeleton height={2} width="100%" variant="rectangular" />
      <div className={styles.relationshipDetails}>
        <Skeleton height={25} width={250} variant="rectangular" />
        <Skeleton className={styles.desktopView} height={10} width={400} variant="rectangular" />
        <Skeleton className={styles.tabletView} height={10} width="100%" variant="rectangular" />
        <div className={styles.relationships}>
          <Skeleton height={10} width={500} variant="rectangular" />
          <Skeleton height={10} width={500} variant="rectangular" />
          <Skeleton height={10} width={500} variant="rectangular" />
          <Skeleton height={10} width={500} variant="rectangular" />
          <Skeleton height={10} width={500} variant="rectangular" />
        </div>
        <div className={styles.relationshipsTablet}>
          <Skeleton height={10} width="100%" variant="rectangular" />
          <Skeleton height={10} width="100%" variant="rectangular" />
          <Skeleton height={10} width="100%" variant="rectangular" />
          <Skeleton height={10} width="100%" variant="rectangular" />
          <Skeleton height={10} width="100%" variant="rectangular" />
        </div>
        <Skeleton className={styles.desktopView} height={10} width={400} variant="rectangular" />
        <Skeleton className={styles.tabletView} height={10} width="100%" variant="rectangular" />
      </div>
    </Paper>
  );
};

export default MyProfileSkeleton;
