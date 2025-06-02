import { Box, Button, Popper, Typography } from "@mui/material";
import style from "./blogs.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import { useRouter } from "next/router";
import { useState } from "react";
import i18n from "@root/host/src/language/i18n";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

const BLOG_IMAGES = ImageUrlConstants.BLOG;

const BlogBanner = () => {
  const router = useRouter();
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  return (
    <>
      <Box
        className={`${style.blogBannerWrapperSO} homeTopBanner`}
        sx={{
          backgroundImage: `url(${BLOG_IMAGES.BLOG_BANNER})`,
          "@media (max-width: 768px)": {
            backgroundImage: `url(${BLOG_IMAGES.BLOG_BANNER_MOBILE})`,
          },
        }}
      >
        <Box className={style.blogBannerContent}>
          <Typography component={"h2"} className={style.heading}>
            {" "}
            {i18n.t("BLOGS.BLOG_BANNER.HEADING")}
          </Typography>
          <Typography className={style.subHeading}>
            <strong>{i18n.t("BLOGS.BLOG_BANNER.SUB_HEADING_1")}</strong>
            {i18n.t("BLOGS.BLOG_BANNER.SUB_HEADING_2")}
          </Typography>
          <Box className={style.blogBannerBottom}>
            <Button
              className={style.checkBtn}
              endIcon={
                <IconSVG
                  width="19"
                  height="19"
                  viewBox="0 0 19 19"
                  fill="none"
                  fillP="#010101"
                  name="arrow_solid_right"
                />
              }
              onClick={() => router.push("/schedule-exam")}
            >
              {i18n.t("BLOGS.BLOG_BANNER.CTA")}
            </Button>
            <Button
              aria-describedby={id}
              className={style.disclaimerBtn}
              onClick={handleClick}
            >
              {i18n.t("BLOGS.BLOG_BANNER.DECLAIMER_CTA")}
            </Button>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
            >
              <Box className={"popperDiv"}>
                {i18n.t("BLOGS.BLOG_BANNER.DECLAIMER_TEXT")}
              </Box>
            </Popper>
          </Box>
        </Box>
      </Box>
    </>
  );
};

export default BlogBanner;
