import IconSVG from "@/components/iconsvg/IconSVG";
import ImageSlider from "@/components/image_slider/ImageSlider";
import { SLIDER_CONSTANT } from "@/constants/ImageSlider.constants";
import { pageDataPropsDTO } from "@/types/home.types";
import { Box, Button, Container } from "@mui/material";
import Link from "next/link";
import React from "react";
import style from "./StockUp.module.scss";

export default function StockUp(props: pageDataPropsDTO) {
  const { Heading, Description, AnchorText, AnchorUrl } =
    props.pageData || {};
  const formattedHeading =
    Heading.charAt(0).toUpperCase() + Heading.slice(1).toLowerCase();




  return (
    <Box className={style.stockupMainBox}>
      <Container className={style.stockupContainer}>
        <Box className={style.stockupTextbox}>
          <Box component={"h2"} className={style.stockupHeading}>
            {formattedHeading}
          </Box>
          <Box className={style.stockupSubHeading}>{Description}</Box>
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
      {props.stockUpFrameData?.length ? (
        <ImageSlider
          slideType={SLIDER_CONSTANT.UNBXD_SLIDER}
          productData={[]}
          productUnbxdData={props.stockUpFrameData || []}
          sliderLength={props.stockUpFrameData.length || 0}
          isContactLens={true}
          showDetails={true}
        />
      ) : null}
    </Box>
  );
}
