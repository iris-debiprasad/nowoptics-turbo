import React from "react";
import styles from "../MyAccount.module.scss";
import { Paper, Skeleton } from "@mui/material";
import MenuCardSkeleton from "../menuCard/MenuCardSkeleton";
import CommonTableSkeleton from "../../CommonTableSkeleton/CommonTableSkeleton";

const MyAccountTableSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Skeleton height={20} width={180} variant="rectangular" />
        <div className={styles.innerContainer}>
          <MenuCardSkeleton />
          <Paper className={styles.right}>
            <Skeleton height={25} width={180} variant="rectangular" />
            <CommonTableSkeleton rows={5} columns={5} headSkeletonHeight={20} bodySkeletonHeight={30} />
          </Paper>
        </div>
      </div>
    </div>
  );
};

export default MyAccountTableSkeleton;
