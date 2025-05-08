import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./ImageSlider.module.scss";
import {
  PARENT_SLIDER_SETTING,
  CHILD_SLIDER_SETTING,
  PARENT_ICON_SLIDER_SETTING,
  MUTLTI_IMAGE_CONSTANTS,
  SINGLE_IMAGE_CONSTANTS,
  ICON_IMAGE_CONSTANT,
  SLIDER_CONSTANT,
  INLINE_STYLE,
} from "@root/host/src/constants/ImageSlider.constants";
import IconSVG from "../iconsvg/IconSVG";
import {
  Props,
  ArrowDTO,
  SliderItemDTO,
  MultiImgDTO,
  IconSliderItemDTO,
  ProductSliderData,
  CartSliderData,
  Product,
  Section,
} from "@root/host/src/types/ImageSlider.types";
import { Constants } from "../../constants/Constants";
import useMediaQuery from "@mui/material/useMediaQuery";
import { Box, Button, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import Variant from "../variant/Variant";
import { getVariantColor } from "@root/host/src/utils/common.utils";
import ContactLens from "../contactLens/ContactLens";
import { useTranslation } from "react-i18next";
import { ProductDTO } from "@root/host/src/types/order-common.types";

const ImageSlider = ({
  slideType,
  name,
  productData,
  patientCartData,
  patientProductData,
  sliderData,
  infinite,
  onAddToCart,
  showFavIcon = true,
  addToCartWrapper = "",
  addToCart = "",
  productUnbxdData,
  sliderLength,
  isContactLens,
  showDetails,
}: Props) => {
  const mobile_min = useMediaQuery(Constants.WINDOW_SIZE.MOBILE);
  const [currentSlide, setCurrentSlide] = React.useState(0);
  const { t } = useTranslation();
  //TODO: need to remove these variables with _TEMP
  const settings =
    slideType === SLIDER_CONSTANT.NESTED_SLIDER_TEMP ||
    slideType === SLIDER_CONSTANT.CARD_SLIDER ||
    slideType === SLIDER_CONSTANT.SINGLE_SLIDER ||
    slideType === SLIDER_CONSTANT.NESTED_SLIDER ||
    slideType === SLIDER_CONSTANT.UNBXD_SLIDER
      ? PARENT_SLIDER_SETTING
      : PARENT_ICON_SLIDER_SETTING;

  const getCurrentSlidesToShow = () => {
    const currentWidth = typeof window === 'undefined' ? 0 : window.innerWidth;

    for (const breakpoint of settings.responsive) {
      if (currentWidth <= breakpoint.breakpoint) {
        return breakpoint.settings.slidesToShow;
      }
    }

    return settings.slidesToShow;
  };

  const currentSlidesToShow = getCurrentSlidesToShow();

  const endSlide = currentSlidesToShow === 3 ? 4 : 1;

  const sliderRef = React.useRef<Slider>(null);

  React.useEffect(() => {
    if (sliderRef.current) {
      (sliderRef.current as Slider).slickGoTo(0);
    }
  }, []);

  function Arrow(props: ArrowDTO) {
    const { onClick, btnType } = props;
    return (
      <div
        onClick={onClick}
        className={`${
          btnType === "next" ? style.nextArrowCls : style.prevArrowCls
        }`}
      >
        {slideType === SLIDER_CONSTANT.NESTED_SLIDER_TEMP ||
        slideType === SLIDER_CONSTANT.CARD_SLIDER ||
        slideType === SLIDER_CONSTANT.SINGLE_SLIDER ||
        slideType === SLIDER_CONSTANT.NESTED_SLIDER ||
        slideType === SLIDER_CONSTANT.UNBXD_SLIDER ? (
          <IconSVG
            width="24"
            height="37"
            viewBox="0 0 24 37"
            fill="#000000"
            name="arrow_big_bold"
          />
        ) : (
          <IconSVG
            width="7"
            height="11"
            viewBox="0 0 7 11"
            fill="#000000"
            name="arrow_small"
          />
        )}
      </div>
    );
  }

  return (
    <div>
      <Slider
        {...settings}
        initialSlide={0}
        ref={sliderRef}
        arrows={mobile_min}
        dots={!mobile_min}
        lazyLoad="ondemand"
        prevArrow={
          !sliderLength ? (
            <Arrow btnType={"prev"} />
          ) : currentSlide !== 0 ? (
            <Arrow btnType={"prev"} />
          ) : (
            <></>
          )
        }
        nextArrow={
          !sliderLength ? (
            <Arrow btnType={"next"} />
          ) : currentSlide !== sliderLength - endSlide ? (
            <Arrow btnType={"next"} />
          ) : (
            <></>
          )
        }
        className={
          slideType === SLIDER_CONSTANT.ICON_SLIDER
            ? style.carouselHeadForIcon
            : !(patientCartData || patientProductData)
            ? style.carouselHead
            : style.patientCarouselHead
        }
        appendDots={(dots) => (
          <div style={INLINE_STYLE.dotContainer}>
            <ul style={INLINE_STYLE.dotsul} className={style.dotsLi}>
              {" "}
              {dots}{" "}
            </ul>
          </div>
        )}
        {...(infinite !== null ? { infinite: infinite } : {})}
        afterChange={(currentIndex: number) => setCurrentSlide(currentIndex)}
      >
        {slideType === SLIDER_CONSTANT.NESTED_SLIDER_TEMP &&
          productData &&
          productData?.length > 0 &&
          productData.map((product: ProductSliderData, index: number) => {
            return (
              <div key={product.name} className={style.relatedProductCard}>
                <div className={style.sliderItem}>
                  <Slider
                    {...CHILD_SLIDER_SETTING}
                    appendDots={(dots) => (
                      <div className={style.dotsCls}>
                        <ul className={style.dotsUL}> {dots} </ul>
                      </div>
                    )}
                  >
                    {product.images?.map((subImageItems, indx: number) => {
                      return (
                        <div key={indx} className={style.sliderItem}>
                          <div>
                            <div className={style.sliderImg}>
                              <IconSVG
                                width="114"
                                height="51"
                                viewBox="0 0 136 60"
                                fill="#F9FAFC"
                                name="mountain_medium_icon"
                              />
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </Slider>
                </div>
                {product?.name && <p className={style.name}>{product.name} </p>}
                {product?.newPrice && (
                  <p className={style.price}>
                    <span className={style.oldPrice}>${product.oldPrice}</span>{" "}
                    <span className={style.newPrice}>${product.newPrice}</span>
                  </p>
                )}
              </div>
            );
          })}

        {slideType === SLIDER_CONSTANT.CARD_SLIDER &&
          (patientCartData ?? patientProductData)?.map(
            (dataItem: CartSliderData, index: number) => {
              return (
                <div key={index} className={style.patientOverviewSliderWrapper}>
                  <div className={style.iconCartContainer}>
                    {showFavIcon && (
                      <div className={style.likeIconWrapper}>
                        <IconSVG
                          width="18"
                          height="16"
                          viewBox="0 0 18 16"
                          fill="#A9AFBB"
                          name="like_fill_icon"
                        />
                      </div>
                    )}
                    <div className={style.sliderCardItem}>
                      <div>
                        <div className={style.sliderCardImg}>
                          {dataItem?.image ? (
                            <Image
                              src={dataItem?.image}
                              alt="product"
                              width={404}
                              height={200}
                              layout="responsive"
                              className={style.imageThubmnail}
                            />
                          ) : (
                            <Box className={style.defaultThumbnail}>
                              <IconSVG
                                width="136"
                                height="60"
                                viewBox="0 0 136 60"
                                fill="#F9FAFC"
                                name="mountain_medium_icon"
                              />
                            </Box>
                          )}
                        </div>
                        <p className={style.cartName} tabIndex={0}>
                          {dataItem.name}{" "}
                        </p>
                        <p className={style.price}>
                          <span className={style.cartPrice} tabIndex={0}>
                            ${dataItem.price}{" "}
                          </span>{" "}
                        </p>
                        <div
                          className={`${
                            addToCartWrapper
                              ? addToCartWrapper
                              : style.buttonWrapper
                          }`}
                        >
                          <button
                            className={`${
                              addToCart ? addToCart : style.button
                            }`}
                            onClick={() =>
                              dataItem?.id &&
                              onAddToCart &&
                              onAddToCart(dataItem?.id)
                            }
                          >
                            ADD TO CART
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              );
            }
          )}

        {slideType === SLIDER_CONSTANT.NESTED_SLIDER &&
          sliderData &&
          sliderData[0]?.Products?.map(
            (sliderItems: Product, index: number) => {
              return (
                <div key={index}>
                  <div className={`${style.sliderItem} ${style.sliderCard}`}>
                    <Slider
                      {...CHILD_SLIDER_SETTING}
                      appendDots={(dots) => (
                        <div className={style.dotsCls}>
                          <ul className={style.dotsUL}> {dots} </ul>
                        </div>
                      )}
                      key={sliderItems.ProductCode}
                    >
                      {sliderItems?.Variants?.map(
                        (subImageItems: Product, indx: number) => {
                          return (
                            <div key={indx} className={`${style.sliderCard}`}>
                              <div>
                                <Box className={style.sliderImg}>
                                  <Image
                                    src={subImageItems?.Image?.ImageUrl || ""}
                                    alt={"frames"}
                                    width={280}
                                    height={180}
                                  />
                                </Box>
                              </div>
                            </div>
                          );
                        }
                      )}
                    </Slider>
                  </div>
                  <div className={style.multiSliderDescriptionContainer}>
                    {/* {sliderItems?.ProductName && (
                      <p className={style.name}>{sliderItems.ProductName} </p>
                    )} */}
                    {sliderItems?.newPrice && (
                      <p className={style.price}>
                        <span className={style.oldPrice}>
                          ${sliderItems.oldPrice}
                        </span>{" "}
                        <span className={style.newPrice}>
                          ${sliderItems.newPrice}
                        </span>
                      </p>
                    )}
                  </div>
                  {/* TODO: need to change this name part */}
                  {/* {name && (
                  <div className={style.sliderName}>{sliderItems?.name}</div>
                )} */}
                </div>
              );
            }
          )}
        {slideType === SLIDER_CONSTANT.UNBXD_SLIDER &&
          productUnbxdData &&
          productUnbxdData.map((product: ProductDTO) => {
            const variantColors = getVariantColor(product.variants);
            return (
              <div key={product.uniqueId}>
                {isContactLens ? (
                  <ContactLens
                    data={product}
                    showDetails={Boolean(showDetails)}
                  />
                ) : (
                  <Variant product={product} variantColors={variantColors} />
                )}
              </div>
            );
          })}

        {slideType === SLIDER_CONSTANT.SINGLE_SLIDER &&
          sliderData &&
          sliderData[0]?.Products?.map(
            (singleSlider: Product, index: number) => {
              return (
                <div key={index}>
                  <Link href={`/product/${singleSlider.ProductCode}`}>
                    <div className={style.sliderItem}>
                      <div>
                        <Box
                          className={style.sliderImg}
                          sx={{
                            backgroundImage: `url(${singleSlider?.Image?.ImageUrl})`,
                          }}
                        ></Box>
                      </div>
                      <Box className={style.seeDetails}>SEE DETAILS</Box>
                    </div>
                  </Link>
                </div>
              );
            }
          )}
        {slideType === SLIDER_CONSTANT.ICON_SLIDER &&
          sliderData &&
          sliderData[0]?.pageData?.map((iconSlider: Section, index: number) => {
            return (
              <div key={index}>
                <Link href={`/${iconSlider.AnchorUrl}`}>
                  <div className={style.iconSliderWrapper}>
                    <div className={style.sliderIconItem}>
                      <div>
                        <Box
                          className={style.sliderIconImg}
                          sx={{
                            backgroundImage: `url(${iconSlider.Images[0].ImageUrl})`,
                          }}
                        ></Box>
                      </div>
                    </div>
                    <Box
                      className={style.sliderDesc}
                      dangerouslySetInnerHTML={{ __html: iconSlider.Heading }}
                    />
                  </div>
                </Link>
              </div>
            );
          })}
      </Slider>
    </div>
  );
};

export default ImageSlider;
