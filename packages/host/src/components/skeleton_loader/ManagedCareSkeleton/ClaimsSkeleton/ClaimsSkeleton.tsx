import { Box, Skeleton } from "@mui/material";
import CommonTableSkeleton from "../../CommonTableSkeleton/CommonTableSkeleton";
import style from "./ClaimsSkeleton.module.scss";

const ClaimsSkeleton = () => {
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
          <Box className={style.searchBox}>
            <Skeleton variant="rectangular" height="50px" width="200px" />
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-start"}
              style={{ marginTop: "20px" }}
              gap={"150px"}
            >
              <Skeleton variant="rectangular" height="30px" width="150px" />
              <Skeleton variant="rectangular" height="30px" width="150px" />
            </Box>
            <Box
              display={"flex"}
              flexDirection={"row"}
              justifyContent={"flex-start"}
              style={{ marginTop: "10px" }}
              gap={"50px"}
            >
              <Skeleton variant="rectangular" height="50px" width="250px" />
              <Skeleton variant="rectangular" height="50px" width="250px" />
              <Skeleton variant="rectangular" height="50px" width="150px" />
              <Skeleton variant="rectangular" height="50px" width="150px" />
            </Box>
          </Box>
          <Box className={style.header}>
            <Box className={style.headerLeft}>
              <Skeleton variant="rectangular" height="50px" width="300px" />
            </Box>
            <Box className={style.headerRight}>
              <Skeleton variant="rectangular" height="50px" width="200px" />
            </Box>
          </Box>
          <CommonTableSkeleton
            rows={5}
            columns={12}
            headSkeletonHeight={40}
            bodySkeletonHeight={30}
          />
          <Box
            display={"flex"}
            flexDirection={"row"}
            justifyContent={"space-between"}
            style={{ marginTop: "20px" }}
          >
            <Skeleton
              variant="rectangular"
              height="50px"
              width="250px"
              style={{ margin: "5px" }}
            />
            <Skeleton
              variant="rectangular"
              height="50px"
              width="350px"
              style={{ margin: "5px" }}
            />
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ClaimsSkeleton;
