import React, { FunctionComponent } from "react";
import style from "./Steps.module.scss";
import { Box, Button } from "@mui/material";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import dynamic from "next/dynamic";
import telephoneIcon from '@root/assets/Images/icons/telephone.svg';
import { StoreDetails } from "@/types/bookEyeExamSteps.types";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@root/host/src/constants/common.constants";
import Image from "next/image";
// const IconSVG = dynamic(() => import("Host/IconSVG"), {
//   ssr: false,
// }) as FunctionComponent<IconDTO>;

interface Props {
  storeDetails: StoreDetails | null;
  apptDateAndTime: string;
  patientName: string;
  handleClose: () => void;
}

function ModifyAppointmentConfirmation(props: Props) {
  
  return (
    <Box className={style.modifyAptmodalWrapper}>
      <Box className={style.modalInner}>
        <Box className={style.modifyAptmodalModalTitle}>
          Dear {props.patientName}
        </Box>
        <Box mt={2} className={style.modifyAptmodalModalSubTitle}>
          Here is a summary of your appointment
        </Box>
        <Box className={style.modifyAptmodalModalDetailsContainer}>
          <Box className={style.modifyAptmodalModalDetails}>
            <Box className={style.title}>Store</Box>
            <Box className={style.subTitle}>
              Stanton Optical - {props.storeDetails?.WebDescription}
            </Box>
          </Box>
          <Box className={style.modifyAptmodalModalDetails}>
            <Box className={style.title}>Date</Box>
            <Box className={style.subTitle}>
              {props.apptDateAndTime
                ? dayjs(props.apptDateAndTime).format(DATE_FORMAT)
                : ""}
            </Box>
          </Box>
          <Box className={style.modifyAptmodalModalDetails}>
            <Box className={style.title}>Time</Box>
            <Box className={style.subTitle}>
              {props.apptDateAndTime
                ? dayjs(props.apptDateAndTime).format("HH:mm")
                : ""}
            </Box>
          </Box>
        </Box>
        <Box mt={2} className={style.modifyAptmodalModalSubTitle}>
          From this page you can edit
        </Box>
        <Box className={style.modifyAptActionItem}>
          <Box className={style.iconContainer}>
            {/* <IconSVG
              width="30"
              height="30"
              viewBox="0 0 16 20"
              fill="#f98300"
              name="location_icon"
            /> */}
            <p>Store</p>
          </Box>
          <Box className={style.iconContainer}>
            {/* <IconSVG
              width="30"
              height="30"
              viewBox="0 0 16 20"
              fill="#f98300"
              name="calender_icon"
            /> */}
            <p>Date/Time</p>
          </Box>
          <Box className={style.iconContainer}>
            <Image src={telephoneIcon} width={30} height={30} alt="" />
            <p>Telephone</p>
          </Box>
        </Box>

        <Box mt={3} className={style.bookEyeExamModalActionWrapper}>
          <Button className={style.continueButton} onClick={props.handleClose}>
            Continue
          </Button>
        </Box>
      </Box>
    </Box>
  );
}

export default ModifyAppointmentConfirmation;
