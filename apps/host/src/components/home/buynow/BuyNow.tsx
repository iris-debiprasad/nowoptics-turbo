import React from "react";
import { Container, Box } from "@mui/material";
import style from "./BuyNow.module.scss";
import Image from "next/image";
import { pageDataPropsDTO } from "@/types/home.types";

const BuyNow = (props: pageDataPropsDTO) => {
  const { Images, Heading, Description } = props.pageData || {};

  return (
    <Box className={`${style.buyNowMainBox} buyNowBGColor `}>
      <Container maxWidth="lg" className={style.buyNowMainContainer}>
        <Box className={style.buyNowbox1}>
          <Box className={style.buyNowImage}>
            <Image
              src={Images && Images.length > 0 ? Images[0].ImageUrl : ""}
              width={37}
              height={39}
              alt={Heading as string}
            />
          </Box>
          <Box component={"h2"} className={style.buyNowHeading}>
            {Heading}
          </Box>
          <Box className={style.buyNowSubHeading}>{Description}</Box>
        </Box>
      </Container>
    </Box>
  );
};

export default BuyNow;
