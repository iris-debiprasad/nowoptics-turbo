import { Box, Button, Typography } from "@mui/material";
import style from "./Inconvenience.module.scss";
import { useRouter } from "next/router";
import { RX_RENEWAL_CONSTANT } from "@/constants/RxRenewal.constants";
const Inconvenience = () => {
  const router = useRouter();
  return (
    <Box className={style.boxContainer}>
      <Box className={style.container}>
        <Box className={style.headingContainer}>
          <Typography variant="h2" className={style.primaryHeading}>
            {RX_RENEWAL_CONSTANT.INCOVENENIENCE_SERVICE_HEADER_1}
          </Typography>
          <Typography variant="h6" className={style.primaryHeading}>
            {RX_RENEWAL_CONSTANT.INCOVENENIENCE_SERVICE_HEADER_2}
          </Typography>
          <Typography variant="h6" className={style.secondaryHeading}>
            {RX_RENEWAL_CONSTANT.INCOVENENIENCE_SERVICE_DESC_1}
          </Typography>
        </Box>
        <Box className={style.btnContainer}>
          <Button
            className={style.inStoreExamBtn}
            onClick={() => router.push("/schedule-exam/")}
          >
            {RX_RENEWAL_CONSTANT.INCOVENENIENCE_SERVICE_BTN}
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default Inconvenience;
