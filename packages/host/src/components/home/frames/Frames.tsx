import IconSVG from "@/components/iconsvg/IconSVG";
import ImageSlider from "@/components/image_slider/ImageSlider";
import { SLIDER_CONSTANT } from "@/constants/ImageSlider.constants";
import { pageDataPropsDTO } from "@/types/home.types";
import {
  Box,
  Button,
  Container,
} from "@mui/material";
import Link from "next/link";
import React from "react";
import style from "./Frames.module.scss";


export default function Frames(props: pageDataPropsDTO) {
  const { Heading, Description, AnchorText, AnchorUrl } = props.pageData || {};
  const formattedHeading =
    Heading.charAt(0).toUpperCase() + Heading.slice(1).toLowerCase();


  return (
    <Box className={style.framesMainBox}>
      <Container className={style.framesContainer}>
        <Box className={style.framesTextbox}>
          <Box component={"h2"} className={style.frameHeading}>
            {formattedHeading}
          </Box>
          <Box className={style.frameSubHeading}>{Description}</Box>
          <Link href={AnchorUrl ? AnchorUrl : ""}>
            <Button
              className={"stockUpNFrameBtn"}
              endIcon={
                <IconSVG
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  fillP="#010101"
                  name="arrow_solid_right"
                />
              }
            >
              <span>{AnchorText}</span>
            </Button>
          </Link>
        </Box>
      </Container>
      {props?.frameSliderData?.length ? (
        <ImageSlider
          slideType={SLIDER_CONSTANT.UNBXD_SLIDER}
          productData={[]}
          productUnbxdData={props?.frameSliderData || []}
          sliderLength={props?.frameSliderData?.length ? props?.frameSliderData?.length + 1 : props?.frameSliderData?.length}
        />
      ) : null}
    </Box>
  );
}
