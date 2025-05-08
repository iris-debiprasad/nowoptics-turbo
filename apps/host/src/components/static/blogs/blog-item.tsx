import Link from "next/link";
import React from "react";
import ArrowForwardIcon from "@mui/icons-material/ArrowForward";
import { useTranslation } from "react-i18next";
import { Grid } from "@mui/material";

import { useIntersectionObserver } from "@/hooks/use-intersection-observer";
import { IBlogMeta } from "@root/host/src/constants/blogConstants";
import style from "./blogs.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";

interface IBlogItem {
  offer: IBlogMeta;
  hasReachedMediumSize: boolean;
}

export default function BlogItem({
  hasReachedMediumSize,
  offer,
}: IBlogItem): JSX.Element {
  const { t } = useTranslation();

  const blogRef = React.useRef<HTMLDivElement>(null);
  const { entry, observer, elementRef } = useIntersectionObserver({
    elementRef: blogRef,
    options: {
      root: null,
      threshold: 1.0,
    },
  });

  React.useEffect(() => {
    if (!elementRef.current) return;

    if (hasReachedMediumSize) observer?.unobserve(elementRef.current);
    else observer?.observe(elementRef.current);
  }, [hasReachedMediumSize]);

  return (
    <Grid className={style.tile} ref={blogRef} item xs={12} md={6}>
      <Link href={offer.url}>
        <figure
          className={`${style["tile__image"]} ${entry?.isIntersecting && !hasReachedMediumSize ? style.active : ""
            }`}
          style={{ backgroundImage: `url(${offer.image})` }}
        />
      </Link>

      <div className={style.tile__content}>
        <h2 className={style["tile__title"]}>
          <Link href={offer.url}>{offer.title}</Link>
        </h2>

        <div>
          <p className={style["tile__description"]}>{offer.description}</p>

          <Link className={style["tile__link"]} href={offer.url}>
            {t("BLOGS.READ_POST")} <IconSVG
              width="17"
              height="14"
              viewBox="0 0 17 18"
              fill="none"
              fillP="#010101"
              name="arrow_solid_right"
            />
          </Link>
        </div>
      </div>
    </Grid>
  );
}
