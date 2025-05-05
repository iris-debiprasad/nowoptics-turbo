import {
  SINGLE_IMAGE_SLIDER_SETTING
} from "@/constants/ImageSlider.constants";
import { BRAND } from "@/constants/common.constants";
import { SingleSliderDTO } from "@/types/ImageSlider.types";
import { Box, Typography } from "@mui/material";
import Image from "next/image";
import Slider from "react-slick";
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import circleProfile from "../../../../assets/Images/icons/subway_admin.svg";
import IconSVG from "../iconsvg/IconSVG";
import style from "./ImageSlider.module.scss";

const SingleImageSlider = ({ reviews, brand }: SingleSliderDTO) => {
  const settings = SINGLE_IMAGE_SLIDER_SETTING;

  return (
    <div className={style.carouselContainer}>
      <Slider
        {...settings}
        prevArrow={<></>}
        nextArrow={<></>}
        lazyLoad="ondemand"
        appendDots={(dots) => (
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <ul className={style.dotsLi}>{dots}</ul>
          </Box>
        )}
      >
        {reviews.map((review, index: number) => {
          return (
            <div key={index}>
              <div className={style.reviewWrapper}>
                <div className={"seoReviewSection"}>
                {review.AuthorImage ? (
                  <Image
                    src={review.AuthorImage}
                    alt={review.AuthorName}
                    width={80}
                    height={80}
                  />
                ) : (
                  <div className={style.reviewerImage}>
                    <Box className={style.imgMountain}>
                      <Image
                        src={circleProfile}
                        alt={review.AuthorName}
                        width={80}
                        height={80}
                      />
                    </Box>
                  </div>
                )}

                <div className={style.reviewContent}>
                  <h4>{review.AuthorName}</h4>
                  <h4>
                    {review.City},&nbsp;{review.State}
                  </h4>
                  <div className={style.starWrapper}>
                    {[...Array(review.Rating)].map((elementInArray, index) => (
                      <Box key={index}>
                        <IconSVG
                          width="12"
                          height="16"
                          viewBox="0 0 13 16"
                          fill="none"
                          fillP={brand === BRAND.MEL ? "#f4d806" : "#f98300"}
                          name="star_special"
                        />
                      </Box>
                    ))}
                  </div>
                </div>
                </div>

                <div
                  className={style.reviewText}
                  style={{
                    display: "-webkit-box",
                    WebkitBoxOrient: "vertical",
                    overflow: "hidden",
                    WebkitLineClamp: 8,
                  }}
                >
                  <Typography>{review.Text}</Typography>
                </div>
              </div>
            </div>
          );
        })}
      </Slider>
    </div>
  );
};

export default SingleImageSlider;
