import React from "react";
import styles from "../MyAccount.module.scss";
import { Paper, Skeleton } from "@mui/material";
import MenuCardSkeleton from "../menuCard/MenuCardSkeleton";
import MyProfileSkeleton from "./MyProfileSkeleton";

const MyAccountProfileSkeleton = () => {
  return (
    <div className={styles.wrapper}>
      <div className={styles.container}>
        <Skeleton height={20} width={180} variant="rectangular" />
        <div className={styles.innerContainer}>
          <MenuCardSkeleton />
          <MyProfileSkeleton />
        </div>
      </div>
    </div>
  );
};

export default MyAccountProfileSkeleton;
