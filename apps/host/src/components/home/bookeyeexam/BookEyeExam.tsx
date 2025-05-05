import React from "react";
import { Box, Button, Popper } from "@mui/material";
import style from "./BookEyeExam.module.scss";
import Link from "next/link";
import i18n from "@root/host/src/language/i18n";
import IconSVG from "@/components/iconsvg/IconSVG";
import { pageDataPropsDTO } from "@/types/home.types";

const BookEyeExam = (props: pageDataPropsDTO) => {
  const {
    Heading,
    SubHeading,
    Description,
    Images,
    AnchorText,
    AnchorUrl,
    Disclaimer,
  } = props.pageData || {};
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  const open = Boolean(anchorEl);
  const id = open ? "eye-exam-popper" : undefined;

  return (
    <Box
      className={`${style.bookMainBox} homeTopBanner`}
      sx={{
        backgroundImage: `url(${Images && Images.length > 0 ? Images[0]?.ImageUrl : ""
          })`,
        "@media (max-width: 768px)": {
          backgroundImage: `url(${Images && Images.length > 0 ? Images[1]?.ImageUrl : ""
            })`,
        },
      }}
    >
      <Box className={style.bookContainer}>
        <Box className={style.bookLeft}>
          <Box
            component={"h2"}
            className={style.bestCombo}
            dangerouslySetInnerHTML={{ __html: Heading }}
          ></Box>
          <Box className={style.plusEye}>
            <Box dangerouslySetInnerHTML={{ __html: SubHeading }}></Box>
          </Box>
          <Box className={style.btnBookEyeExam}>
            <Link href={AnchorUrl ? AnchorUrl : ""}>
              <Button
                className={style.btnBook}
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
              >
                <span>{AnchorText}</span>
              </Button>
            </Link>
            <>
              <Button
                aria-describedby={id}
                className={style.disclaimerBtn}
                onClick={handleClick}
                role="open_modal"
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
            </>
          </Box>
          {Description && (
            <Box
              className={style.astigmatism}
              dangerouslySetInnerHTML={{ __html: Description as string }}
            ></Box>
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default BookEyeExam;
