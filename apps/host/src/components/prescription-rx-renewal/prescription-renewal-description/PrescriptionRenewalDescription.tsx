import { Box, Button, Typography } from "@mui/material";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";
import style from "./PrescriptionRenewalDescription.module.scss";
import { RX_RENEWAL_CONSTANT } from "@root/host/src/constants/RxRenewal.constants";
import { useRouter } from "next/router";
import { useState } from "react";
import NonBusinessHrsInfo from "@/components/nonBusinessHrsInfoModel/NonBusinessHrsInfo";

const PrescriptionRenewalDescription = ({
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
      <Box className={style.descriptionContainer}>
        <Box className={style.container}>
          <Box className={style.imageContainer}>
            <Image
              alt="Prescription Description"
              className={style.bannerImage}
              src={
                hasReached.xl
                  ? ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG
                      .RENEWAL_DESCRIPTION_SECTION_DESKTOP
                  : ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG
                      .RENEWAL_DESCRIPTION_SECTION_MOBILE
              }
              width={615}
              height={453}
              layout="responsive"
            />
          </Box>
          <Box className={style.textContainer}>
            <Box>
              <Typography variant="body1" className={style.firstText}>
                {RX_RENEWAL_CONSTANT.RENEWAL_DESCRIPTION_FIRST}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className={style.midText}>
                {RX_RENEWAL_CONSTANT.RENEWAL_DESCRIPTION_SECOND}
              </Typography>
            </Box>
            <Box>
              <Typography variant="body1" className={style.lastText}>
                {RX_RENEWAL_CONSTANT.RENEWAL_DESCRIPTION_THIRD}
              </Typography>
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
                <span>{RX_RENEWAL_CONSTANT.RENEWAL_DESCRIPTION_BUTTON}</span>
              </Button>
            </Box>
          </Box>
        </Box>
      </Box>
      {openModel && (
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

export default PrescriptionRenewalDescription;
