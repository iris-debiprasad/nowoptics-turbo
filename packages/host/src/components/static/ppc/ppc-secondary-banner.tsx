import IconSVG from "@/components/iconsvg/IconSVG";
import { Box, Button } from "@mui/material";
import style from "./ppc.module.scss";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BRAND } from "@/constants/common.constants";
import { ImageUrlConstants } from "@/constants/image.url.constants";

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
export const SO_IMAGE =
  BASE_IMAGE_URL + "m/22ea66e8579e6977/original/Test_PPC_SO.png";
const PPC_IMAGES = ImageUrlConstants.PPC_BANNER;

const PPCSecondaryBanner = (props: any) => {
  const [secondBannerDescription, setSecondBannerDescription] = useState([]);
  const [showAll, setShowAll] = useState(false);

  const handleClick = () => {
    setShowAll(!showAll);
  };

  useEffect(() => {
    setSecondBannerDescription(
      props.data.ppcPageData.Description.SecondBannerDescription.split(
        "</p>"
      ).filter((data: any) => data != "") || []
    );
  }, [props]);

  return (
    <>
      <div
        className={`${style.secondaryBannerContainer} ${
          props.data.brand === BRAND.MEL
            ? style.melSecondaryBannerContainer
            : ""
        }`}
      >
        <Box className={style.imageBox}>
          <Image
            width={100}
            height={100}
            alt=""
            src={
              props.data.brand === BRAND.MEL
                ? props.data.isContacts
                  ? PPC_IMAGES.MEL_CONTACT_IMAGE
                  : PPC_IMAGES.MEL_IMAGE
                : SO_IMAGE
            }
          ></Image>
        </Box>
        <div className={style.contentBox}>
          <Box
            dangerouslySetInnerHTML={{
              __html: props.data.ppcPageData.Description.SecondBannerTitle,
            }}
          ></Box>
          <Box
            className={style.desktopView}
            dangerouslySetInnerHTML={{
              __html:
                props.data.ppcPageData.Description.SecondBannerDescription,
            }}
          ></Box>

          <div className={style.mobileView}>
            {secondBannerDescription.slice(0, 1).map((paragraph, index) => (
              <div
                key={index}
                dangerouslySetInnerHTML={{ __html: paragraph }}
              ></div>
            ))}
            {showAll && (
              <div>
                {secondBannerDescription.slice(1).map((paragraph, index) => (
                  <div
                    key={index}
                    dangerouslySetInnerHTML={{ __html: paragraph }}
                  ></div>
                ))}
              </div>
            )}
            {secondBannerDescription.length > 1 && (
              <div className={style.moreButton} onClick={handleClick}>
                {showAll ? "...less" : "...more"}
              </div>
            )}
          </div>
          <div className={style.textCenter}>
            <Button
              className={style.secondaryBannerButton}
              endIcon={
                <IconSVG
                  width="9"
                  height="15"
                  viewBox="0 0 9 15"
                  fill="none"
                  fillP="#010101"
                  name="arrow_solid_right"
                />
              }
              onClick={props.data.handleBookEyeExamClick}
            >
              <span>
                {props.data.ppcPageData.Description.SecondBannerButton}
              </span>
            </Button>
          </div>
        </div>
      </div>
    </>
  );
};

export default PPCSecondaryBanner;
