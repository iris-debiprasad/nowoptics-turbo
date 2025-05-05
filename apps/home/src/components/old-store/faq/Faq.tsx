import React from "react";
import Link from "next/link";

import { Box } from "@mui/system";
import { Grid } from "@mui/material";

import style from "./Faq.module.scss";

type Props = {};

function Faq({}: Props) {
  return (
    <div>
      <div className={style.mainBox}>
        <Box className={style.heading}>Frequently Asked Questions</Box>
        <Grid container spacing={5}>
          <Grid item lg={6} xs={12}>
            <Box className={style.heading}>
              What are the steps you are taking to improve the safety and
              hygiene of your stores?
            </Box>
            <Box className={style.headingUl}>
              Due to the Coronavirus, extra safety measures are being taken at
              each store. These include:
            </Box>
            <ul className={style.ulCls}>
              <li>
                A pre-screening questionnaire before patients are let in for an
                exam.
              </li>
              <li>
                Temperature check using a touchless forehead/temporal artery
                thermometer.
              </li>
              <li>
                Enforcement of municipal capacity guidelines to keep employees
                and patients within safe social distancing proximity.
              </li>
              <li>
                {
                  "A safety mask is required in-store (our team will be wearing one too). If you don't have one, we'll provide you with a mask."
                }
              </li>
              <li>
                Additional cleaning and sanitizing precautions based on the
                Centers for Disease Control and Prevention guidelines, including
                all glasses, equipment and furniture.
              </li>
              <li>
                Alternative forms of dispensing will be implemented, including
                curbside order pick-up and order delivery options where
                permitted.
              </li>
            </ul>
          </Grid>
          <Grid item lg={6} xs={12}>
            <Box className={style.heading}>
              What are the steps you are taking to improve the safety and
              hygiene of your stores?
            </Box>
            <Box className={style.paraCls}>
              The eye exam cost is included with the purchase of glasses. A
              contact lens exam typically costs $99.00* and includes
              prescriptions for both contacts and glasses, and a free pair of
              trial lenses. *Exam pricing may vary by state, visit or call your
              local store for more details.
            </Box>
            <Box className={style.heading}>
              Can I bring a prescription from another doctor and just purchase
              the glasses from you?
            </Box>
            <Box className={style.paraCls}>
              Yes, as long as your prescription is still valid, our specialists
              can help you fill the order accordingly.
            </Box>
          </Grid>
        </Grid>
        <Box className={style.terms}>
          See more answers on our{" "}
          <Link href="#" className={style.linkFaq}>
            {" "}
            FAQ Page
          </Link>
        </Box>
      </div>
    </div>
  );
}

export default Faq;
