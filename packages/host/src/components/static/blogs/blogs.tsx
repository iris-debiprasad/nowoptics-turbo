import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

import {
  BLOG_DESKTOP_BANNER,
  BLOG_MOBILE_BANNER,
} from "@/constants/blogConstants";
import { ResponsiveBanner } from "@/components/responsive-banner";
import BlogItem from "./blog-item";
import { useOnResize } from "@/hooks/use-on-resize";
import { useBlogsPagination } from "./use-blogs-pagination";
import style from "./blogs.module.scss";

/** Corresponds to medium breakpoint value in IRIS breakpoints */
export const BREAKPOINT_TO_STOP_INTERSECTING = 900;

const Blogs = () => {
  const { t } = useTranslation();

  const { hasNextPage, paginatedEntries, next } = useBlogsPagination();
  const doMatchedMd = useOnResize({
    breakpoint: BREAKPOINT_TO_STOP_INTERSECTING,
  });

  return (
    <div className={style.blogsContainer}>
      <ResponsiveBanner
        mobile={{ alt: "Stanton Optical Blogs", src: BLOG_MOBILE_BANNER }}
        tabletAndDesktop={{
          alt: "Stanton Optical Blogs",
          src: BLOG_DESKTOP_BANNER,
        }}
      />
      <div className={style.gridContainer}>
        <h1>{t("BLOGS.YOUR_EYE")}</h1>
        <Grid container spacing={4}>
          {paginatedEntries.map((offer) => (
            <BlogItem
              {...{ offer }}
              hasReachedMediumSize={doMatchedMd}
              key={offer.url}
            />
          ))}
        </Grid>

        {hasNextPage && (
          <div className={style.loadMore}>
            <button className={style.loadButton} onClick={next}>
              {t("BLOGS.LOAD_MORE")}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Blogs;
