import React from "react";
import style from "./PaperCaptureSkeleton.module.scss";
import { Grid, Skeleton } from "@mui/material";

const PaperCaptureSkeleton = () => {
  return (
    <div className={style.paperCaptureSkeleton}>
      <div className={style.modalContent}>
        <div className={style.topHead}>
          <Skeleton variant="rectangular" width={200} />
          <Skeleton variant="rectangular" width={20} />
        </div>
        <div className={style.mainSectionContainer}>
          <Grid container spacing={2}>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" className={style.topSection} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" className={style.topSection} />
            </Grid>
            <Grid item xs={3}>
              <Skeleton variant="rectangular" className={style.topSection} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" className={style.middleSection} />
            </Grid>
            <Grid item xs={6}>
              <Skeleton variant="rectangular" className={style.middleSection} />
            </Grid>
            <Grid item xs={12}>
              <Skeleton variant="rectangular" className={style.bottomSection} />
            </Grid>
          </Grid>
        </div>
        <div className={style.bottomButton}>
          <Skeleton
            variant="rectangular"
            width={100}
            className={style.buttonSkeleton}
          />
        </div>
      </div>
    </div>
  );
};

export default PaperCaptureSkeleton;
