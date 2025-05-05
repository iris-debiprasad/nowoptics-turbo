import React, { FunctionComponent, useEffect } from "react";
import { Box, Skeleton } from "@mui/material";
import style from "./IconSlider.module.scss";
import { Props, Section, SliderDTO } from "@/types/ImageSlider.types";
import { SLIDER_CONSTANT } from "@/constants/ImageSlider.constants";
import { useSelector } from "react-redux";
import dynamic from "next/dynamic";


const ImageSlider = dynamic(() => import("@/components/image_slider/ImageSlider"), {
  ssr: false,
  loading: () => <IconSliderSkeleton/>
}) as FunctionComponent<Props>;


const IconSliderSkeleton = () => {
  return <div className={style.actionIcon}>
    {new Array(5).fill("").map((_v, i) => (
      <div className={style.circularSkeleton} key={i}>
        <Skeleton variant="circular" className={style.circularSkeletonIcon} />
        <Skeleton variant="text" className={style.iconDescription} />
      </div>
    ))}
  </div>
}

export default function IconSlider(props: { pageData: Section[] }) {
  const isAgent = useSelector((state: any) => state?.cdcView?.data?.isAgent);
  const [sliderData, setSliderData] = React.useState<SliderDTO[]>([]);

  useEffect(() => {
    if (props.pageData) {
      setSliderData([
        {
          pageData: props.pageData.filter((data) => {
            if (isAgent && data.AnchorUrl !== 'schedule-exam') {
              return data;
            } else if (!isAgent) {
              return data;
            }
          }),
        },
      ]);
    }
  }, [
    props, isAgent
  ]);



  return (
    <div className={style.iconSliderMainBox}>
      <Box className={style.iconSliderWrapper}>
        <ImageSlider
          slideType={SLIDER_CONSTANT.ICON_SLIDER}
          sliderData={sliderData}
          productData={[]}
          sliderLength={props.pageData.length}
        />
      </Box>
    </div>
  );
}
