import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";

import { Box } from "@mui/system";
import { Grid } from "@mui/material";

import style from "./TwoPairs.module.scss";

import { IconDTO } from "../../../../../host/src/types/IconSVG.types";

type Props = {};

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

function TwoPairs({}: Props) {
  return (
    <div>
      <div className={style.mainBox}>
        <Grid container>
          <Grid item lg={9} xs={12} className={style.leftBox}>
            <Box className={style.heading}>
              TWO PAIRS <sup>$</sup> 79
            </Box>
            
          </Grid>
          <Grid item lg={3} xs={12}>
            <Box className={style.imgBox}>
              <IconSVG
                width="114"
                height="51"
                viewBox="0 0 136 60"
                fill="#F9FAFC"
                name="mountain_medium_icon"
              />
            </Box>
          </Grid>
          <Grid item lg={12} xs={12}>
          <Box className={style.subHeading}>
              + EYE EXAM PLUS + ANTI-GLARE LENSES + SAME DAY DELIVERY
            </Box>
            <Box className={style.note}> Eye Care Seen Differently</Box>
          </Grid>
        </Grid>
      </div>
    </div>
  );
}

export default TwoPairs;
