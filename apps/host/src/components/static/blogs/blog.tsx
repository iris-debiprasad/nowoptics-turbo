import { Grid } from "@mui/material";
import style from "./blogs.module.scss";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import Image from "next/image";
import { BLOGS, IBlogMeta } from "@root/host/src/constants/blogConstants";
import Link from "next/link";
import BlogItem from "./blog-item";
import { BREAKPOINT_TO_STOP_INTERSECTING } from "./blogs";
import { useOnResize } from "@/hooks/use-on-resize";
import BlogBanner from "./blog-banner";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";

const Blog = (props: any) => {
  const router = useRouter();
  const [blogs, setBlogs] = useState<IBlogMeta[]>([]);

  const doMatchedMd = useOnResize({
    breakpoint: BREAKPOINT_TO_STOP_INTERSECTING,
  });

  const BLOGS_BREADCRUMB_LINK = [
    {
      label: "Home",
      href: "/",
    },
    {
      label: "Blog",
      href: "/blog",
    },
    {
      label: props.data.title,
      href: props.data.url,
    },
  ];

  useEffect(() => {
    let matchedBlogs = [];
    for (let i = 0; i < BLOGS.length; i++) {
      if (
        BLOGS[i].tag == props.data.tag &&
        matchedBlogs.length < 2 &&
        BLOGS[i].url !== props.data.url
      ) {
        matchedBlogs.push(BLOGS[i]);
      }
    }
    setBlogs(matchedBlogs);
  }, []);

  const [scrolledValue, setScrolledValue] = useState(0);

  function logit() {
    var winScroll =
      window.document.body.scrollTop ||
      window.document.documentElement.scrollTop;
    var height =
      window.document.documentElement.scrollHeight -
      window.document.documentElement.clientHeight;
    var scrolled = (winScroll / height) * 100;
    setScrolledValue(Math.round(scrolled));
  }

  useEffect(() => {
    function watchScroll() {
      window.addEventListener("scroll", logit);
    }
    watchScroll();
    return () => {
      window.removeEventListener("scroll", logit);
    };
  }, []);

  return (
    <div className={style.blogDetailContainer}>
      <div className={style.header}>
        <div className={style.progressContainer}>
          <div
            className={style.progressBar}
            style={{ width: scrolledValue + "%" }}
          >
            {scrolledValue > 5 ? scrolledValue + "% Read" : ""}
          </div>
        </div>
      </div>

      {props.data.image && (
        <div className={style.bannerContainer}>
          <Image
            onClick={() => router.push("/schedule-exam")}
            className={style.offerBanner}
            width={1915}
            height={463}
            src={props.data.image}
            alt={props.data.alt}
          />
          <div className={style.overlay}></div>
          <div className={style.bannerTitleContainer}>
            <div className={style.textCenter}>
              <h1>{props.data.title}</h1>
              <p>{props.data.date}</p>
            </div>
          </div>
        </div>
      )}

      <div
        className={`${style.gridContainer} ${!props.data.image ? style["with-top-padding"] : ""}`}
      >
        <Breadcrumb links={BLOGS_BREADCRUMB_LINK} />
        <div className={style.contentContainer}>
          <div
            className={style.content}
            dangerouslySetInnerHTML={{ __html: props.data.content.content1 }}
          ></div>
          {props.data.content.image1 && (
            <div className={style.content}>
              <Image
                className={style.offerBanner}
                width={1915}
                height={463}
                src={props.data.content.image1}
                alt={""}
              />
            </div>
          )}
          {props.data.content.content2 && (
            <div
              className={style.content}
              dangerouslySetInnerHTML={{ __html: props.data.content.content2 }}
            ></div>
          )}
          {props.data.content.image2 && !props.data.hasDynamicBanner && (
            <div className={style.content}>
              <Link href="/schedule-exam/ ">
                <Image
                  className={style.contentBanner}
                  width={1915}
                  height={463}
                  src={props.data.content.image2}
                  alt={""}
                />
              </Link>
            </div>
          )}
          {props.data.hasDynamicBanner && <BlogBanner />}
          {blogs && blogs.length && (
            <div className={style.content}>
              <div>
                <div className={style.relatedContainer}>
                  <span>RELATED POSTS</span>
                </div>
                <Grid container spacing={4}>
                  {blogs.map((offer) => (
                    <BlogItem
                      {...{ offer }}
                      hasReachedMediumSize={doMatchedMd}
                      key={offer.url}
                    />
                  ))}
                </Grid>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Blog;
