import React, { useEffect, useState } from "react";
import HeroBannerRxRenewal from "@/components/prescription-rx-renewal/hero-banner";
import TestVisionRxRenewal from "@/components/prescription-rx-renewal/test-vision";
import PrescriptionRenewalFAQ from "@/components/prescription-rx-renewal/prescription-faq";
import PrescriptionRenewalDescription from "@/components/prescription-rx-renewal/prescription-renewal-description/PrescriptionRenewalDescription";
import FourStepsBanner from "@/components/prescription-rx-renewal/four-steps-banner/FourStepsBanner";
import GetStartedSection from "@/components/prescription-rx-renewal/getStartedSection/GetStartedSection";
import { getRxRenewalTimingConfig } from "@/service/rxRenewal.service";
import { isActionAllowed } from "@/utils/rxRenewal";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@/constants/common.constants";
import { AlertColor } from "@mui/material";
import { useRouter } from "next/router";

const PrescriptionRenewal = (): JSX.Element => {
  const router = useRouter();
  const flagValue = router?.query?.enableNonBusinessHours === "true";
  const [flag, setFlag] = useState<boolean>(flagValue);
  const [timingConfig, setTimingConfig] = useState<string[]>([]);
  const [isBusinessHours, setIsBusinessHours] = useState<boolean>(false);
  const [messages, setMessages] = useState<any>({});

  const { showSnackBar } = useSnackBar();
  const getTimeConfigFromMasterSetup = () => {
    getRxRenewalTimingConfig()
      .then((response) => {
        const result = response.data.Result;
        const timingConfig = JSON.parse(result);
        setTimingConfig(timingConfig.WeekDayName);
        setMessages(timingConfig.messages);
        setIsBusinessHours(
          isActionAllowed(timingConfig.WeekDayName, flag) ? true : false
        );
      })
      .catch((error) => {
        showSnackBar(
          error.response
            ? error.response.data.Error?.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };
  useEffect(() => {
    getTimeConfigFromMasterSetup();
  }, []);

  return (
    <>
      <HeroBannerRxRenewal
        isBusinessHours={isBusinessHours}
        timingConfig={timingConfig}
        messages={messages}
      />
      <PrescriptionRenewalDescription
        isBusinessHours={isBusinessHours}
        timingConfig={timingConfig}
        messages={messages}
      />
      <FourStepsBanner />
      <TestVisionRxRenewal />
      <GetStartedSection
        isBusinessHours={isBusinessHours}
        timingConfig={timingConfig}
        messages={messages}
      />
      <PrescriptionRenewalFAQ />
    </>
  );
};

export default PrescriptionRenewal;
