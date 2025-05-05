import { Box, Skeleton } from "@mui/material";
import CommonTableSkeleton from "../CommonTableSkeleton/CommonTableSkeleton";
import style from "./setupSkeleton.module.scss";
import CommonTabsSkeleton from "../CommonTabsSkeleton/CommonTabsSkeleton";

const SetupSkeleton = (props: {
  tabsCount: number;
  type?: string;
}) => {
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
          tabsCount={props.tabsCount}
          tabSkeletonHeight={40}
          tabSkeletonWidth={100}
        />
        <Box className={style.tableContainer}>
          <Box className={style.header}>
            <Box className={style.headerLeft}>
              <Skeleton variant="rectangular" height="50px" width="300px" />
            </Box>
            {props?.type === 'master' ? null :
              <Box className={style.headerRight}>
                <Skeleton variant="rectangular" height="50px" width="200px" />
                <Skeleton variant="rectangular" height="50px" width="150px" />
              </Box>}
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

export default SetupSkeleton;
