import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";

import { Box, Grid } from "@mui/material";

import style from "./StoreOffer.module.scss";

import { IconDTO } from "../../../../../host/src/types/IconSVG.types";
import IconSVG from "@shared/host/IconSVG";

type Props = {};


export default function StoreOffer({}: Props) {
  return (
    <Box className={style.mainBox}>
     
        <Grid container spacing={10}>
          <Grid item lg={7} xs={12} className={style.leftBox}>
            <Box className={style.heading1}>
              Take advantage of the most competitive in-store offer!
            </Box>
            <p>
              {
                "Enjoy a 1-year supply of Acuvue Oasys contact lenses with HydraClear Plus for only $189 after rebate. This deal includes a comprehensive eye exam that covers a prescription for both contacts and glasses. Get a 1-year supply of Acuvue Oasys with HydraClear Plus for Astigmatism for an additional $100 after rebate."
              }
            </p>
          </Grid>
          <Grid item lg={5} xs={12}>
            <div className={style.imgBox}>
              <IconSVG
                width="136"
                height="60"
                viewBox="0 0 136 60"
                fill="#F9FAFC"
                name="mountain_medium_icon"
              />
            </div>
          </Grid>
        </Grid>
      
    </Box>
  );
}
