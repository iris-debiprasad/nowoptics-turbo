import { Box, Skeleton } from "@mui/material";
import React from "react";
import style from "./StoreSkeleton.module.scss";

const StoreSkeleton = () => {
  return (
    <Box className={style.storeSkeletonMainBox}>
      <Box className={style.title}>
        <Skeleton height={30} width={30} variant="circular" />
        <Skeleton
          height={40}
          width={200}
          variant="text"
          style={{ marginLeft: "10px" }}
        />
      </Box>
      <div style={{ marginLeft: "30px" }}>
        <Skeleton height={25} width={100} variant="text" />
        <Skeleton height={30} width={180} variant="text" />
        <Skeleton height={25} width={180} variant="text" />
        <Skeleton height={25} width={100} variant="text" />
        <Skeleton height={25} width={180} variant="text" />
      </div>
    </Box>
  );
};

export default StoreSkeleton;
