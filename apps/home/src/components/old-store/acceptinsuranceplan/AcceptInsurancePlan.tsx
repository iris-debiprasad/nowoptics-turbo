import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";

import { Box } from "@mui/system";
import { Grid } from "@mui/material";

import style from "./AcceptInsurancePlan.module.scss";

import { ACCEPTED_INSURANCE_PLANS } from "@/constants/store.constants";

import { AcceptedInsurancePlansDTO } from "@/types/store.type";
import { IconDTO } from "../../../../../host/src/types/IconSVG.types";

type Props = {};

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

function AcceptInsurancePlan({}: Props) {
  return (
    <div>
      <div className={style.mainBox}>
        <Box className={style.heading}>Accepted Insurance Plans</Box>
        <Grid container spacing={5}>
          <Grid item lg={4} xs={12}>
            {ACCEPTED_INSURANCE_PLANS.section_1.map(
              (section: AcceptedInsurancePlansDTO, key: number) => {
                return (
                  <Box className={style.listBox} key={key}>
                    <IconSVG
                      name="cross_small"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#A9AFBB"
                    />
                    <Box className={style.listItemCls}>{section.name}</Box>
                  </Box>
                );
              }
            )}
          </Grid>
          <Grid item lg={4} xs={12}>
            {ACCEPTED_INSURANCE_PLANS.section_2.map(
              (section: AcceptedInsurancePlansDTO, key: number) => {
                return (
                  <Box className={style.listBox} key={key}>
                    <IconSVG
                      name="cross_small"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#A9AFBB"
                    />
                    <Box className={style.listItemCls}>{section.name}</Box>
                  </Box>
                );
              }
            )}
          </Grid>
          <Grid item lg={4} xs={12}>
            {ACCEPTED_INSURANCE_PLANS.section_3.map(
              (section: AcceptedInsurancePlansDTO, key: number) => {
                return (
                  <Box className={style.listBox} key={key}>
                    <IconSVG
                      name="cross_small"
                      width="16"
                      height="16"
                      viewBox="0 0 16 16"
                      fill="#A9AFBB"
                    />
                    <Box className={style.listItemCls}>{section.name}</Box>
                  </Box>
                );
              }
            )}
          </Grid>
        </Grid>
        <Box className={style.terms}>
          {
            '˚ We accept "out-of-network" benefits for VSP members, which we apply towards your total purchase and submit a claim on your behalf to VSP for payment'
          }
        </Box>
        <Box className={style.terms}>
          {
            "Don't see your insurance listed? Call this store at 574.230.4522 to check for additional accepted plans"
          }
        </Box>
      </div>
    </div>
  );
}

export default AcceptInsurancePlan;
