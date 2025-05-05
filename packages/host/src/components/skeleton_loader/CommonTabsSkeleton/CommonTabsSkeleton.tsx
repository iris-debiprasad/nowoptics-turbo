import { Box, Skeleton, Tab, Tabs } from "@mui/material";
import style from "./CommonTabsSkeleton.module.scss";

const CommonTabsSkeleton = (props: {
  tabsCount: number;
  tabSkeletonHeight: number;
  tabSkeletonWidth: number;
}) => {
  const { tabsCount, tabSkeletonHeight, tabSkeletonWidth } = props;
  return (
    <Box className={style.commonTabsWrapper}>
      <Box sx={{ width: "100%" }}>
        <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
          <Tabs className={style.tabs}>
            {new Array(tabsCount).fill("").map((data, index) => {
              return (
                <Tab
                  key={index}
                  label={
                    <Skeleton
                      variant="rectangular"
                      height={`${tabSkeletonHeight}px`}
                      width={`${tabSkeletonWidth}px`}
                    />
                  }
                />
              );
            })}
          </Tabs>
        </Box>
      </Box>
    </Box>
  );
};

export default CommonTabsSkeleton;
