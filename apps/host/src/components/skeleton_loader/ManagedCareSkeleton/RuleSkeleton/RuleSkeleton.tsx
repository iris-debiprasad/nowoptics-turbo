import { Box, Skeleton } from "@mui/material";
import CommonTableSkeleton from "../../CommonTableSkeleton/CommonTableSkeleton";
import style from "./RuleSkeleton.module.scss";
import CommonTabsSkeleton from "../../CommonTabsSkeleton/CommonTabsSkeleton";

const RuleSkeleton = () => {
  return (
    <Box className={style.wrapper}>
      <Box className={style.container}>
        <Skeleton
          variant="rectangular"
          height="50px"
          width="300px"
          style={{ margin: "5px" }}
        />
        <CommonTabsSkeleton
          tabsCount={2}
          tabSkeletonHeight={50}
          tabSkeletonWidth={200}
        />
        <Box className={style.tableContainer}>
          <Box className={style.header}>
            <Box className={style.headerLeft}>
              <Skeleton variant="rectangular" height="50px" width="300px" />
            </Box>
            <Box className={style.headerRight}>
              <Skeleton variant="rectangular" height="50px" width="200px" />
              <Skeleton variant="rectangular" height="50px" width="150px" />
            </Box>
          </Box>
          <CommonTableSkeleton
            rows={5}
            columns={9}
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

export default RuleSkeleton;
