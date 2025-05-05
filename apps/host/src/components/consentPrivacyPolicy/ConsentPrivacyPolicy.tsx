import style from "./ConsentPrivacyPolicy.module.scss";
import React from "react";
import { Box, Button, Typography } from "@mui/material";
import IconSVG from "@root/host/src/components/iconsvg/IconSVG";
import i18n from "@root/host/src/language/i18n";

const ConsentPrivacyPolicy = (props: any) => {
  const handleClose = () => {
    props.setModalOpen(false);
  };

  return (
    <Box className={style.modalWrapper}>
      <Box className={style.modalHeader}>
        <Typography className={style.modalHeading} variant="h6" component="h4">
          {i18n.t("CONSENT_PRIVACY_POLICY.POLICY_HEADER")}
        </Typography>
        <Button onClick={handleClose}>
          <IconSVG
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="var(--primary-text-color)"
            name="modal_cross"
          />
        </Button>
      </Box>
      <Box className={style.modalBody}>
        <p>{i18n.t("CONSENT_PRIVACY_POLICY.POLICY_PART1")}</p>
        <p><b>{i18n.t("CONSENT_PRIVACY_POLICY.STANDARD_RATES_APPLY")}</b> {i18n.t("CONSENT_PRIVACY_POLICY.POLICY_PART2")}</p>
      </Box>
    </Box>
  );
};

export default ConsentPrivacyPolicy;
