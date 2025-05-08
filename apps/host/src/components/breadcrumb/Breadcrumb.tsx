import * as React from "react";
import { useRouter } from "next/router";
import { Breadcrumbs, Typography } from "@mui/material";
import style from "./Breadcrumb.module.scss";
import Link from "next/link";
import { BreadcrumbProps } from "@root/host/src/types/Breadcrumb.types";

export default function Breadcrumb({ links }: BreadcrumbProps) {
  const router = useRouter();

  return (
    <div role="presentation" className={style.breadcrumbContainer}>
      <Breadcrumbs aria-label="breadcrumb" className={style.breadcrumbLabelBar}>
        {links?.map((link, index) =>
          index === links.length - 1 || link.href === "" ? (
            <Typography
              color="textPrimary"
              key={link.label}
              className={style.linkStyleActive}
            >
              {link.label}
            </Typography>
          ) : (
            <Link
              color="inherit"
              href={
                link?.label !== "Home" && router?.query?.ParentOrderId
                  ? {
                      pathname: link.href,
                      query: router?.query,
                    }
                  : link?.href
              }
              key={link.label}
              className={style.linkStyle}
            >
              {link.label}
            </Link>
          )
        )}
      </Breadcrumbs>
    </div>
  );
}
