import { Box } from "@mui/material";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import Image from "next/image";
import useResponsive from "@/hooks/useResponsive";
import style from "./hero-banner.module.scss";
import { useRouter } from "next/router";
import { isActionAllowed } from "@/utils/rxRenewal";
import { useState } from "react";
import NonBusinessHrsInfo from "@/components/nonBusinessHrsInfoModel/NonBusinessHrsInfo";
import { RX_RENEWAL_CONSTANT } from "@/constants/RxRenewal.constants";

const HeroBannerRxRenewal = ({
  isBusinessHours,
  timingConfig,
  messages,
}: {
  isBusinessHours: boolean;
  timingConfig: any;
  messages: any;
}) => {
  const router = useRouter();
  const hasReached = useResponsive();

  const [openModel, setOpenModel] = useState<boolean>(false);
  const handleClose = () => {
    setOpenModel(!openModel);
  };

  return (
    <>
      <Box
        className={style.heroBannerContainer}
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
        <Image
          alt="Prescription renewal"
          className={style.heroBanner}
          src={
            hasReached.md
              ? ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG
                  .HERO_BANNER_PRESCRIPTION_SECTION_DESKTOP
              : ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG
                  .HERO_BANNER_PRESCRIPTION_SECTION_MOBILE
          }
          width={1915}
          height={463}
          layout="responsive"
        />
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

export default HeroBannerRxRenewal;
