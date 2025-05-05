import { Box, Grid, Skeleton } from "@mui/material";
import React from "react";
import style from "./StoreSkeleton.module.scss";

const StoreTiming = () => {
  const items = Array.from({ length: 14 });
  return (
    <Box sx={{ display: { xs: "none", md: "block" } }} className={style.storeTimingSkeletonMainBox}>
      <Skeleton height={30} width={200} variant="text" />
      <Grid container  alignItems="center" justifyContent="center">
        {items.map((_, index) => (
          <Grid item xs={6} key={index}>
            <Skeleton height={25} width={80} variant="text" />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};

export default StoreTiming;
