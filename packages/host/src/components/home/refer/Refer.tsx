import IconSVG from "@/components/iconsvg/IconSVG";
import { Constants } from "@/constants/Constants";
import { pageDataPropsDTO } from "@/types/home.types";
import { Box, Button, Container, Popper, useMediaQuery } from "@mui/material";
import { USER_TYPE } from "@root/host/src/constants/common.constants";
import i18n from "@root/host/src/language/i18n";
import { getDetails } from "@root/host/src/utils/getSessionData";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import style from "./Refer.module.scss";
import BannerHomepageDesktopImg from "@root/assets/Images/Banner_homepage.jpg";

const Refer = (props: pageDataPropsDTO) => {
  const mobile_min = useMediaQuery(Constants.WINDOW_SIZE.MOBILE);
  const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
  const [role, setRole] = React.useState<string | null>(null);
  const [windowWidth, setWindowWidth] = useState(0);

  function getUserData() {
    return getDetails().then(function (data) {
      setRole(data?.authData?.userType ? data?.authData?.userType : null);
    });
  }

  React.useEffect(() => {
    getUserData();
  }, []);

  const handleClick = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(anchorEl ? null : event.currentTarget);
  };

  useEffect(() => {
    const handleResize = () => {
      setWindowWidth(window.innerWidth);
    };

    handleResize();
    if (typeof window !== "undefined")  {
      window.addEventListener("resize", handleResize);
    }
    

    return () => {
      if (typeof window === "undefined") return;
      window.removeEventListener("resize", handleResize);
    };
  }, [typeof window !== "undefined"]);

  const open = Boolean(anchorEl);
  const id = open ? "refer-popper" : undefined;
  const {
    Heading,
    Images,
    Description,
    SubHeading,
    AnchorText,
    AnchorUrl,
    Disclaimer,
  } = props.pageData || {};

  const getAnchorUrl = (): string => {
    if (!role) return AnchorUrl || "/book-eye-exam";
    return role === USER_TYPE.ASSOCIATE ? "/appointments" : "/book-eye-exam";
  };

  return (
    <Box
      className={style.referMainBox}
      sx={{ position: "relative", width: "100%", height: "100%" }}
    >
      {Images && Images.length > 0 && (
        <figure className={style["background-image"]}>
          {windowWidth >= 992 && (
            <Image
              src={Images[0]?.ImageUrl || ""}
              alt="Desktop Background"
              fill
            />
          )}
          {windowWidth < 992 && (
            <Image
              src={Images[1]?.ImageUrl || ""}
              alt="Mobile Background"
              fill
            />
          )}
        </figure>
      )}
      <Container className={style.referContainer}>
        <Box className={`${style.referRight}`}>
          <Box>
            <Box
              component={"h2"}
              className={`${style.headingMain} ${style.heading}`}
              dangerouslySetInnerHTML={{ __html: Heading }}
            />
            <Box
              className={`${style.subHeading} ${style.heading}`}
              dangerouslySetInnerHTML={{ __html: SubHeading }}
            />
          </Box>
          <Box className={style.eyeExamBottom}>
            <Link href={getAnchorUrl()}>
              <Button
                className={style.checkBtn}
                style={{ marginLeft: 0, marginBottom: 0 }}
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
                {AnchorText}
              </Button>
            </Link>
            <>
              <Button
                aria-describedby={id}
                className={style.disclaimerBtn}
                onClick={handleClick}
                style={{ color: "#54565a", marginBottom: 0 }}
              >
                {i18n.t("HOME_PAGE.SEE_OFFER_DETAILS")}
              </Button>
              <Popper
                id={id}
                open={open}
                anchorEl={anchorEl}
                placement="bottom-start"
                className={style.popperContainer}
              >
                {Disclaimer && (
                  <Box
                    className={"popperDiv"}
                    dangerouslySetInnerHTML={{ __html: Disclaimer as string }}
                  ></Box>
                )}
              </Popper>
            </>
          </Box>

          {mobile_min && Description && (
            <Box
              className={style.astigmatism}
              dangerouslySetInnerHTML={{ __html: Description as string }}
            ></Box>
          )}
        </Box>
      </Container>
    </Box>
  );
};

export default Refer;
