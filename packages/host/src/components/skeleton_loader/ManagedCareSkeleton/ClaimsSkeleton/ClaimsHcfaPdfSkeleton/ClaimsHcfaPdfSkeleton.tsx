import { Box, Skeleton } from "@mui/material";
import style from "./ClaimsHcfaPdfSkeleton.module.scss";

const ClaimHcfaPdfSkeleton = () => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.container}>
        <Skeleton
          variant="rectangular"
          height="50px"
          width="350px"
          style={{ margin: "5px" }}
        />
        <Box className={style.tableContainer}>
          <Box className={style.header}>
            <Box className={style.headerLeft}>
              <Skeleton variant="rectangular" height="50px" width="200px" />
            </Box>
            <Box className={style.headerRight}>
              <Skeleton variant="rectangular" height="50px" width="150px" />
            </Box>
          </Box>
          <Skeleton variant="rectangular" height="70vh" />
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimHcfaPdfSkeleton;
