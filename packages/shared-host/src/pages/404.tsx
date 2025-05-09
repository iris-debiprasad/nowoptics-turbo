import Head from "next/head";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";
import { Box, Typography, Container, Button } from "@mui/material";
import { useRouter } from "next/router";

import { BRAND } from "@/constants/common.constants";

const PageNotFound404: NextPage = (): JSX.Element => {
  const { t } = useTranslation();
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{t("404.title")}</title>
        <meta
          name="description"
          content="Oops! Seems like your path to clear vision got a bit foggy"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <Container maxWidth="md">
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "80vh",
            textAlign: "center",
            gap: 3
          }}
        >
          <Typography variant="h1" component="h1">
            {t("404.heading")}
          </Typography>
          <Typography variant="h5" component="h2">
            {t("404.subheading")}
          </Typography>
          <Button 
            variant="contained" 
            color="primary"
            onClick={() => router.push("/")}
          >
            {t("404.backToHome")}
          </Button>
        </Box>
      </Container>
    </>
  );
};

export default PageNotFound404;
