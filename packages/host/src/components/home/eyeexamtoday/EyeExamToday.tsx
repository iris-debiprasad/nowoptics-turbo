import React from "react";
import { Box, Button, Popper, Typography } from "@mui/material";
import i18n from "@root/host/src/language/i18n";
import Link from "next/link";
import style from "./EyeExamToday.module.scss";
import { pageDataPropsDTO } from "@/types/home.types";
import { BRAND } from "@/constants/common.constants";
import IconSVG from "@/components/iconsvg/IconSVG";

const EyeExamToday = (props: pageDataPropsDTO) => {
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "simple-popper" : undefined;

  const { pageData, brand } = props;
  const {
    Heading,
    Images,
    SubHeading,
    Description,
    AnchorText,
    AnchorUrl,
    Disclaimer,
  } = pageData || {};

  return (
    <Box
      className={`${style.eyeExamWrapperSO} homeTopBanner`}
      sx={{
        backgroundImage: `url(${Images && Images.length > 0 ? Images[0]?.ImageUrl : ""
          })`,
        "@media (max-width: 768px)": {
          backgroundImage: `url(${Images && Images.length > 0 ? Images[1]?.ImageUrl : ""
            })`,
        },
      }}
    >
      <Box
        sx={{
          backgroundImage: `url(${Images && Images.length > 1 ? Images[1]?.ImageUrl : ""
            })`,
          "@media (max-width: 1024px)": {
            backgroundImage: "none",
          },
        }}
        className={`${style.container} homeRightBanner`}
      >
        <Box className={`${style.eyeExamContents} brandEyeExamContents`}>
          <>
            <Typography
              component={"h1"}
              className={`${style.headingMain} ${style.heading}`}
              dangerouslySetInnerHTML={{ __html: Heading }}
            ></Typography>
            <Box
              className={`${style.subHeading} ${style.heading}`}
              dangerouslySetInnerHTML={{ __html: SubHeading }}
            />
            {Description && (
              <Typography
                className={style.description}
                dangerouslySetInnerHTML={{ __html: Description as string }}
              ></Typography>
            )}
          </>

          <Box className={style.eyeExamBottom}>
            <Link className={style.checkBtn} href={AnchorUrl ? AnchorUrl : ""}>
              <span>{AnchorText}</span> &nbsp;{" "}
              <IconSVG
                width="19"
                height="19"
                viewBox="0 0 19 19"
                fill="none"
                fillP="#010101"
                name="arrow_solid_right"
              />
            </Link>

            <Button
              aria-describedby={id}
              className={`${style.disclaimerBtn} ${brand === BRAND.MEL ? style.disclaimerBtnMEL : ""
                }`}
              onClick={handleClick}
            >
              {i18n.t("HOME_PAGE.SEE_OFFER_DETAILS")}
            </Button>
            <Popper
              id={id}
              open={open}
              anchorEl={anchorEl}
              placement="bottom-start"
            >
              <Box
                className={"popperDiv"}
                dangerouslySetInnerHTML={{ __html: Disclaimer as string }}
              ></Box>
            </Popper>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default EyeExamToday;
