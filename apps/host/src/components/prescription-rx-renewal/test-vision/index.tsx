import { Box } from "@mui/material";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import { PRESCRIPTION_RX_RENEWAL } from "@root/host/src/constants/prescriptionRxRenewal.constants";
import useResponsive from "@/hooks/useResponsive";
import style from "./testVision.module.scss";

const TestVisionRxRenewal = () => {
  const hasReached = useResponsive();

  return (
    <Box
      className={style.centeredContainer}
      style={{
        backgroundImage: !hasReached.sm ? "none" : `url('${ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.TEST_YOUR_VISION_SECTION}')`,
        backgroundSize: !hasReached.sm ? "auto" : "70%",
        backgroundPosition: !hasReached.sm
                  ? "initial"
                  : "right 3rem bottom 0px",
      }}
    >
      <Box className={style.textContainer}>
        <Box className={style.contentText}>
          <h2 className={style.headerText}>
            {PRESCRIPTION_RX_RENEWAL.VISION_TEST_SECTION_HEADER_TEXT.toUpperCase()}
          </h2>
          <p className={style.descriptionText}>
            {PRESCRIPTION_RX_RENEWAL.VISION_TEST_SECTION_DESCRIPTION_TEXT}
          </p>
        </Box>
      </Box>
    </Box>
  );
};

export default TestVisionRxRenewal;
