import React, { useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import LeftContentBanner from "../leftContentBanner/leftContentBanner";
import { homePageDataPropsDTO, Section } from "@/types/home.types";
import style from "./carouselSection.module.scss";

const CarouselSection = (props: homePageDataPropsDTO) => {
    const settings = {
        arrows: false,
        autoplay: true,
        dots: true
    };

    const slides = props.pageData as Section[];
    const [sliderIndex, setSliderIndex] = useState(1);

    return (
        <Slider {...settings} className={style.carouselContainer} beforeChange={(index: number) => setSliderIndex(index)}>
            {slides && slides.map((slide: Section, index: number) => {
                return <LeftContentBanner sliderIndex={sliderIndex} key={index} pageData={slide} />
            })}
        </Slider>
    );
}

export default CarouselSection;