import { Skeleton } from "@mui/material";
import React from "react";
import styles from "./CommonTabsTablePageSkeleton.module.scss";
import CommonTableSkeleton from "../CommonTableSkeleton/CommonTableSkeleton";
import CommonTabsSkeleton from "../CommonTabsSkeleton/CommonTabsSkeleton";

interface CommonTabsTablePageSkeletonProps {
  rows: number;
  columns: number;
  headSkeletonHeight: number;
  bodySkeletonHieght: number;
  showTabs?: boolean;
  tabsCount?: number;
}

const CommonTabsTablePageSkeleton: React.FC<
  CommonTabsTablePageSkeletonProps
> = ({
  rows,
  columns,
  headSkeletonHeight,
  bodySkeletonHieght,
  showTabs,
  tabsCount,
}) => {
  return (
    <div className={styles.operationsSkeleton}>
      <Skeleton height={15} width={280} variant="rectangular" />
      <div className={styles.container}>
        {showTabs && (
          <div className={styles.tabs}>
            <CommonTabsSkeleton
              tabsCount={tabsCount ?? 0}
              tabSkeletonHeight={30}
              tabSkeletonWidth={100}
            />
          </div>
        )}
        <div className={styles.header}>
          <Skeleton height={40} width={300} variant="rectangular" />
        </div>

        <div className={styles.table}>
          <CommonTableSkeleton
            rows={rows}
            columns={columns}
            headSkeletonHeight={headSkeletonHeight}
            bodySkeletonHeight={bodySkeletonHieght}
          />
        </div>
        <div className={styles.pagination}>
          <Skeleton height={30} width={200} variant="rectangular" />
          <Skeleton height={30} width={400} variant="rectangular" />
        </div>
      </div>
    </div>
  );
};

export default CommonTabsTablePageSkeleton;
