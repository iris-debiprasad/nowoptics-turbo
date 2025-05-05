import * as React from "react";
import { Box, Button, Typography, Grid } from "@mui/material";
import styles from "./ChooseToRenew.module.scss";
import Image from "next/image";
import IconSpectable from "@root/assets/Images/icons/icon-spectable.svg";
import IconContacts from "@root/assets/Images/icons/icon-contacts.svg";
import Link from "next/link";
import IconSVG from "@/components/iconsvg/IconSVG";
import { ChooseToRenewType } from "@/types/rxRenewal.types";
import useResponsive from "@/hooks/useResponsive";

const ChooseToRenew = (props: ChooseToRenewType) => {
  const hasReached = useResponsive();
  const {
    handleBack,
    handleRenewGlass,
    handleRenewContacts,
    handleRenewGlassAndContacts,
  } = props;

  return (
    <Box className={styles.chooseToRenewWrapper}>
      <Box className={styles.chooseToRenewHeader}>
        <Typography variant="h1" className={styles.title}>
          Choose To Renew
        </Typography>
        <Typography variant="body1" className={styles.description}>
          Please select the option you would like to renew
        </Typography>
      </Box>

      <Box className={styles.container}>
        <Box className={styles.content}>
          <Box mt={2} mb={2} mr={1} p={2}>
            <Typography
              variant="body1"
              className={styles.backBtn}
              onClick={handleBack}
            >
              <IconSVG
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#687689"
                name="arrow_thin_left"
              />
              <Link href={"/prescription-renewal/start"}>
                Back to My Prescriptions
              </Link>
            </Typography>
          </Box>

          <Grid
            container
            rowSpacing={1}
            style={{ width: "100%", alignItems: "center", margin: "0 auto" }}
          >
            <Grid item xs={12} md={4}>
              <Box
                onClick={handleRenewGlass}
                sx={{ cursor: "pointer", textAlign: "center" }}
              >
                <Image
                  src={IconSpectable}
                  alt="icon-spectable"
                  height={150}
                  width={125}
                />
                <Box className={styles.buttonWrapper}>
                  <Button className={styles.primaryButton}>
                    Renew Glasses
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                onClick={handleRenewContacts}
                sx={{ cursor: "pointer", textAlign: "center" }}
              >
                <Image
                  src={IconContacts}
                  alt="icon-spectable"
                  height={150}
                  width={120}
                />
                <Box className={styles.buttonWrapper}>
                  <Button className={styles.primaryButton}>
                    Renew Contacts
                  </Button>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={12} md={4}>
              <Box
                onClick={handleRenewGlassAndContacts}
                sx={{
                  cursor: "pointer",
                  textAlign: hasReached.lg ? "unset" : "center",
                }}
              >
                <Box
                  style={{
                    display: "flex",
                    alignItems: "center",
                    flexWrap: "wrap",
                    justifyContent: "center",
                  }}
                >
                  <Image
                    src={IconSpectable}
                    alt="icon-spectable"
                    height={150}
                    width={100}
                  />
                  <IconSVG
                    width="50"
                    height="20"
                    viewBox="0 0 30 30"
                    fill="#687689"
                    name="plus_icon"
                  />
                  <Image
                    src={IconContacts}
                    alt="icon-spectable"
                    height={150}
                    width={100}
                  />
                </Box>

                <Box className={styles.buttonWrapper}>
                  <Button className={styles.primaryButton}>Renew Both</Button>
                </Box>
              </Box>
            </Grid>
          </Grid>
        </Box>
      </Box>
    </Box>
  );
};

export default ChooseToRenew;
