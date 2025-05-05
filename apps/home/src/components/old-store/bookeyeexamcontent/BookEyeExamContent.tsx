import dynamic from "next/dynamic";
import { useRouter } from 'next/router';
import React, { FunctionComponent } from "react";

import { Box, Button, Grid } from "@mui/material";

import style from "./BookEyeExamContent.module.scss";

import { IconDTO } from "../../../../../host/src/types/IconSVG.types";

type Props = {};

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

export default function BookEyeExamContent({}: Props) {
  const router = useRouter();

  return (
    <Box className={style.mainBox}>
      
        <Grid container spacing={10}>
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
          <Grid item lg={7} xs={12} className={style.rightBox}>
            <Box className={style.heading1}>Convenient, Free Eye Exams</Box>
            <p>
              {
                "With our telehealth technology, you’ll gain accurate eye health information quickly and conveniently. From the eye exam to frame selection, the Stanton Optical team walks you through the entire process to make sure you get exactly what you need and leave completely satisfied."
              }
            </p>
            <Box className={style.heading2}>
              How much does an eye exam cost?
            </Box>
            <ul>
              <li className={style.ulCls}>Eyeglasses</li>
            </ul>
            <ul>
              <li className={style.liCls}>
                {
                  "Your eyeglasses eye exam is 100% Free with our Buy 1 Get 1 FREE in-store promotion. This means there is no cost for your eye exam when you purchase 2 pairs of glasses."
                }
              </li>
              <li className={style.liCls}>
                {
                  "The average price of an eye exam is $59 without insurance. Prices vary by state."
                }
              </li>
            </ul>
            <ul>
              <li className={style.ulCls}>Contact Lenses</li>
            </ul>
            <ul>
              <li className={style.liCls}>
                {
                  "The average price for a contact lens exam is $99 without insurance, and it includes your eyeglasses prescription. Prices vary by state. A FREE trial pair of contacts is included with your exam."
                }
              </li>
            </ul>

            <Box className={style.subHeading}>
              The following tests are included in your eye exam:
            </Box>
            <ul className={style.ulCls}>
              <li>Autorefraction</li>
              <li>Keratometry</li>
              <li>Tonometry</li>
              <li>Retinal Evaluation</li>
              <li>Visual Fields</li>
              <li>Acuities & Refraction</li>
              <li>Slit Lamp Test (as needed)</li>
            </ul>
            <Box className={style.btnBookEye}>
              <Button
                variant="contained"
                className={style.btnColor}
                endIcon={
                  <IconSVG
                    width="15"
                    height="15"
                    viewBox="0 0 15 15"
                    fill="#010101"
                    name="arrow_solid_right"
                  />
                }
                onClick={() => router.push("/book-eye-exam")}
              
              >
                Book eye exam
              </Button>
            </Box>
          </Grid>
        </Grid>
     
    </Box>
  );
}
