import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";

import { Box } from "@mui/system";

import style from "./AddressDescription.module.scss";

import { IconDTO } from "../../../../../host/src/types/IconSVG.types";

type Props = {};

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

function AddressDescription({}: Props) {
  return (
    <div>
      <div className={style.mainBox}>
        <Box className={style.heading}>
          Welcome to Stanton Optical Mishawaka
        </Box>
        <p className={style.content1}>
          All the convenience, none of the drama! At Stanton Optical, our team
          is dedicated to helping you get a fast, thorough eye exam utilizing
          state-of-the-art telehealth technology. With our selection of more
          than 3,000 stylish, affordable frames, you’ll find a fashionable look
          for every day of the week!
        </p>
        <p className={style.content2}>
          {
            "We're in the intersection of West Douglas Rd and N Main St, next to Chipotle Mexican Grill."
          }
        </p>
        <Box className={style.imgBox}>
          <IconSVG
            width="114"
            height="51"
            viewBox="0 0 136 60"
            fill="#F9FAFC"
            name="mountain_medium_icon"
          />
        </Box>
      </div>
    </div>
  );
}

export default AddressDescription;
