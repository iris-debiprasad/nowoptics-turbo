import React, { FunctionComponent } from "react";
import dynamic from "next/dynamic";

import { Box } from "@mui/system";

import style from "./OurCustomerVoice.module.scss";

import { IconDTO } from "@root/host/src/types/IconSVG.types";

type Props = {};

const SingleImageSlider = dynamic(
  () => import("Host/SingleImageSlider"),
  {
    ssr: false,
  }
);

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

function OurCustomerVoice({}: Props) {
  return (
    <div>
      <div className={style.mainBox}>
        <Box className={style.heading}>{"Our Customer's Voice"}</Box>

        <SingleImageSlider />

        <Box className={style.reviewStore}>
          <span className={style.reviewTxt}>Review this store: </span>

          {[...Array(2)].map((elementInArray, index) => (
            <Box key={index} className={style.imgMountain}>
              <IconSVG
                width="35"
                height="16"
                viewBox="0 0 35 16"
                fill="none"
                fillP="#F9FAFC"
                name="mountain_xs_icon"
              />
            </Box>
          ))}
        </Box>
      </div>
    </div>
  );
}

export default OurCustomerVoice;
