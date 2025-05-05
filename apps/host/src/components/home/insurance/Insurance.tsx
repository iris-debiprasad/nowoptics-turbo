import React from "react";
import { Container, Box } from "@mui/material";
import style from "./Insurance.module.scss";
import Image from "next/image";
import Link from "next/link";
import { pageDataPropsDTO } from "@/types/home.types";

export default function Insurance(props: pageDataPropsDTO) {
  const { Heading, Images, Description, SubHeading, AnchorText, AnchorUrl } =
    props.pageData || {};
  return (
    <Box className={`${style.insuranceMainBox} insuranceBGColor `}>
      <Container maxWidth="xl" className={style.insuranceMainContainer}>
        <Box className={style.insuranceBox1}>
          <Box component={"h2"} className={style.insuraceHead}>{Heading}</Box>
          <Box className={style.insuranceSubHead}>{SubHeading}</Box>
          <Box className={style.insuranceThumbImg}>
            <Image
              src={Images && Images.length > 0 ? Images[0].ImageUrl : ""}
              alt={Images[0].AltText ? Images[0].AltText : Heading as string}
              width={1200}
              height={46}
              className={style.image}
            />
            <Image
              src={Images && Images.length > 0 ? Images[1].ImageUrl : ""}
              alt={Images[1].AltText ? Images[1].AltText : Heading as string}
              width={1000}
              height={500}
              className={style.mobileImage}
            />
          </Box>
          <Box className={style.insuraceFoot}>{Description}</Box>
          <Link href={AnchorUrl ? AnchorUrl : ""}>
            <Box className={style.insuranceSubFoot}>
              {AnchorText} {">"}
            </Box>
          </Link>
        </Box>
      </Container>
    </Box>
  );
}
