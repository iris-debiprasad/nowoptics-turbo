import React from "react";
import styles from "./BookEyeExamSkeleton.module.scss";
import { Skeleton } from "@mui/material";

const BookEyeExamSkeleton = () => {
  return (
    <div className={styles.bookEyeExamSkeleton}>
      <div className={styles.container}>
        <Skeleton height={20} width={180} variant="rectangular" />
        <div className={styles.title}>
          <Skeleton height={40} width={200} variant="rectangular" />
          <Skeleton className={styles.bar} height={25} width={700} variant="rectangular" />
          <Skeleton className={styles.barMobile} height={25} width={400} variant="rectangular" />
        </div>
        <div className={styles.details}>
          <div className={styles.detailsLeft}>
            <Skeleton height={30} width={400} variant="rectangular" />
            <div className={styles.subDetails}>
              <Skeleton height={50} width={250} variant="rectangular" />
              <Skeleton height={50} width={250} variant="rectangular" />
            </div>
            <div className={styles.calendar}>
              <div className={styles.dobLabel}>
                <Skeleton height={30} width={300} variant="rectangular" />
              </div>
              <div className={styles.dobField}>
                <Skeleton height={50} width={220} variant="rectangular" />
              </div>
              <div className={styles.calendarLabel}>
                <Skeleton height={30} width={250} variant="rectangular" />
              </div>
              <div className={styles.calendarDetails}>
                <div className={styles.left}>
                  <Skeleton height={250} width={300} variant="rectangular" />
                </div>
                <div className={styles.right}>
                  <Skeleton height={10} width={250} variant="rectangular" />
                  <Skeleton sx={{ marginTop: "15px" }} height={25} width={150} variant="rectangular" />
                  <Skeleton className={styles.timebar} sx={{ marginTop: "20px" }} height={40} width={400} variant="rectangular" />
                  <Skeleton
                    className={styles.timebarMobile}
                    sx={{ marginTop: "20px" }}
                    height={40}
                    width={"100%"}
                    variant="rectangular"
                  />
                  <Skeleton
                    sx={{ marginTop: "30px", alignSelf: "flex-start", marginLeft: "25px" }}
                    height={25}
                    width={250}
                    variant="rectangular"
                  />
                </div>
              </div>
              <div className={styles.button}>
                <Skeleton height={40} width={70} variant="rectangular" />
              </div>
            </div>
          </div>
          <div className={styles.detailsRight}>
            <Skeleton height={30} width={150} variant="rectangular" />
            <div className={styles.subDetails}>
              <Skeleton height={25} width={200} variant="rectangular" />
              <Skeleton sx={{ marginTop: "10px" }} height={15} width={250} variant="rectangular" />
              <Skeleton sx={{ margin: "30px 0px" }} height={30} width={130} variant="rectangular" />
              <Skeleton height={15} width={180} variant="rectangular" />
              <Skeleton sx={{ marginTop: "10px" }} height={15} width={200} variant="rectangular" />
              <Skeleton sx={{ marginTop: "10px" }} height={15} width={220} variant="rectangular" />
            </div>
          </div>
        </div>
        <div className={styles.disclaimer}>
          <Skeleton height={15} width={550} variant="rectangular" />
          <Skeleton sx={{ marginTop: "30px" }} height={15} width={650} variant="rectangular" />
          <Skeleton sx={{ marginTop: "10px" }} height={15} width={150} variant="rectangular" />
        </div>
      </div>
    </div>
  );
};

export default BookEyeExamSkeleton;
