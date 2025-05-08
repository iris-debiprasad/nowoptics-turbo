import dynamic from "next/dynamic";
import React, { FC, FunctionComponent } from "react";

import StepConnector, {
  stepConnectorClasses,
} from "@mui/material/StepConnector";
import {
  Box,
  Step,
  StepIconProps,
  StepLabel,
  Stepper,
  styled,
} from "@mui/material";

import style from "./EyeExamHeader.module.scss";

import { BreadcrumbProps } from "@root/host/src/types/Breadcrumb.types";

import i18n from "@root/host/src/language/i18n";
import Breadcrumb from "@shared/host/Breadcrumb";


export const links = [
  { label: "Home", href: "/" },
  { label: "BookEyeExam", href: "/" },
];

const steps = ["Step 1", "Step 2"];

function QontoStepIcon(props: StepIconProps) {
  const { active, completed, className } = props;

  return (
    <div
      className={style.QontoStepIconRoot}
      style={{
        color: active ? "var(--blue-600)" : "var(--secondary-bg-color)",
      }}
    >
      <div className={style.QontoStepIconCircle} />
    </div>
  );
}
const QontoConnector = styled(StepConnector)(({ theme }) => ({
  [`&.${stepConnectorClasses.alternativeLabel}`]: {
    top: 10,
    left: "calc(-50% + 16px)",
    right: "calc(50% + 16px)",
  },
  [`&.${stepConnectorClasses.active}`]: {
    [`& .${stepConnectorClasses.line}`]: {
      borderColor: "var(--blue-600)",
    },
  },

  [`& .${stepConnectorClasses.line}`]: {
    borderTopWidth: 3,
    borderRadius: 1,
  },
}));

const EyeExamHeader: FC<{
  stepCount: number;
}> = ({ stepCount }) => {
  return (
    <>
      <Breadcrumb links={links} />
      <div className={style.eyeExamHeaderWrapper}>
        <Box className={style.eyeExamHeaderTitle}>{i18n.t("BOOK_EYE_EXAM.BOOK_EYE_EXAM")}</Box>
        <Box>
          <Stepper
            activeStep={stepCount}
            alternativeLabel
            connector={<QontoConnector />}
          >
            {steps.map((label) => (
              <Step key={label}>
                <StepLabel StepIconComponent={QontoStepIcon}>{i18n.t(`BOOK_EYE_EXAM.${label}`)}</StepLabel>
              </Step>
            ))}
          </Stepper>
        </Box>
      </div>
    </>
  );
};

export default EyeExamHeader;
