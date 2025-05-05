import React, { useEffect, useRef, useState } from "react";
import style from "./GetStartedSection.module.scss";
import Image from "next/image";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import Button from "@mui/material/Button";
import { RX_RENEWAL_CONSTANT } from "@/constants/RxRenewal.constants";
import { useRouter } from "next/router";
import { Box, Typography } from "@mui/material";
import NonBusinessHrsInfo from "@/components/nonBusinessHrsInfoModel/NonBusinessHrsInfo";
import useResponsive from "@/hooks/useResponsive";

const GetStartedSection = ({
  isBusinessHours,
  timingConfig,
  messages,
}: {
  isBusinessHours: boolean;
  timingConfig: any;
  messages: any;
}) => {
  const hasReached = useResponsive();
  const router = useRouter();
  const [openModel, setOpenModel] = useState<boolean>(false);

  const handleClose = () => {
    setOpenModel(!openModel);
  };
  return (
    <>
      <Box className={style.getStartedContainer}>
        <Typography variant="h2" className={style.bannerHeading}>
          {RX_RENEWAL_CONSTANT.GET_STARTED_HEADING}
        </Typography>
        <Box className={style.imageContainer}>
          <Box className={style.imageSection}>
            <Image
              className={style.bannerImage}
              width={100}
              height={100}
              src={
                ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG
                  .GET_STARTED_PRESCRIPTION
              }
              alt="Rx"
            />
            <Typography variant="body1" className={style.imageText}>
              {RX_RENEWAL_CONSTANT.GET_STARTED_FIRST_IMAGE_TEXT}
            </Typography>
          </Box>
          <Box className={style.imageSection}>
            <Image
              className={style.bannerImage}
              width={100}
              height={100}
              src={
                ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.GET_STARTED_LAPTOP
              }
              alt="Laptop"
            />
            <Typography variant="body1" className={style.imageText}>
              {RX_RENEWAL_CONSTANT.GET_STARTED_SECOND_IMAGE_TEXT}
            </Typography>
          </Box>
          <Box className={style.imageSection}>
            <Image
              className={style.bannerImage}
              width={100}
              height={100}
              src={
                ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.GET_STARTED_GLASSES
              }
              alt="Glasses"
            />
            <Typography variant="body1" className={style.imageText}>
              {RX_RENEWAL_CONSTANT.GET_STARTED_THIRD_IMAGE_TEXT}
            </Typography>
          </Box>
        </Box>
        <Box className={style.btnContainer}>
          <Button
            className={style.visionBtn}
            onClick={() => {
              if (!hasReached.md) {
                setOpenModel(true);
              } else if (isBusinessHours) {
                router.push("/prescription-renewal/start");
              } else {
                setOpenModel(true);
              }
            }}
          >
            <Box component="span">
              {RX_RENEWAL_CONSTANT.RENEWAL_DESCRIPTION_BUTTON}
            </Box>
          </Button>
        </Box>
      </Box>

      {openModel && timingConfig && messages && (
        <NonBusinessHrsInfo
          open={openModel}
          handleClose={handleClose}
          content={RX_RENEWAL_CONSTANT.NON_BUSINESS_HOURS_HEADING2}
          timingConfig={timingConfig}
          messages={messages}
        />
      )}
    </>
  );
};

export default GetStartedSection;
