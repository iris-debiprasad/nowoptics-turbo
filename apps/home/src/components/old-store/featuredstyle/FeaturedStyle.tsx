import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";

import { Box } from "@mui/material";

import style from "./FeaturedStyle.module.scss";

import { Props as ImageSliderProps } from "@root/host/src/types/ImageSlider.types";
import { SLIDER_CONSTANT } from "@/constants/imageslider.constants";

import ImageSlider from "@root/host/src/components/image_slider/ImageSlider";

type Props = {};

const FeaturedStyle = (props: Props) => {
  return (
    <Box className={style.mainBox}>
      <Box className={style.heading}>Featured Styles</Box>
      <ImageSlider
        slideType={SLIDER_CONSTANT.NESTED_SLIDER_TEMP}
        name={true}
        productData={[]}
        sliderData={[]}
      />
    </Box>
  );
};

export default FeaturedStyle;
