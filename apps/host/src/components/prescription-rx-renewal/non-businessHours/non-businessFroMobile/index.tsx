import { Box, Button, Typography } from "@mui/material";
import style from "../NonBusinessHours.module.scss";
import { useRouter } from "next/router";
import { RX_RENEWAL_CONSTANT } from "@/constants/RxRenewal.constants";
const NonBusinessForMobile = () => {
  const router = useRouter();
  return (
    <Box className={style.boxContainer}>
      <Box className={style.container}>
        <Box className={style.headingContainer}>
          <Typography variant="h2" className={style.primaryHeading}>
            {RX_RENEWAL_CONSTANT.RENEWAL_DEVICE_COMPATIBLE_HEADER}
          </Typography>
          <Typography variant="h2" className={style.secondaryHeading} dangerouslySetInnerHTML={{ __html: RX_RENEWAL_CONSTANT.RENEWAL_DEVICE_COMPATIBLE_DESC_1 }} />

        </Box>
        <Box className={style.btnContainer}>
          <Button className={style.visionBtn} onClick={() => router.push("/")}>
            {RX_RENEWAL_CONSTANT.NON_BUSINESS_HOURS_BTN1}
          </Button>
          <Button
            className={style.inStoreExamBtn}
            onClick={() => router.push("/schedule-exam/")}
          >
            {RX_RENEWAL_CONSTANT.NON_BUSINESS_HOURS_BTN2}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default NonBusinessForMobile;
