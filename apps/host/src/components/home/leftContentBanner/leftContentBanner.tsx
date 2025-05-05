import React, { useEffect } from "react";
import { Box, Button, Popper, Typography } from "@mui/material";
import i18n from "@root/host/src/language/i18n";
import style from "./leftContentBanner.module.scss";
import { pageDataPropsDTO } from "@/types/home.types";
import { BRAND } from "@/constants/common.constants";
import { useRouter } from "next/router";

const LeftContentBanner = (props: pageDataPropsDTO) => {
    const router = useRouter();

    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);

    const handleClick = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(anchorEl ? null : event.currentTarget);
    };

    const open = Boolean(anchorEl);
    const id = open ? "simple-popper" : undefined;

    const { pageData, brand, sliderIndex } = props;
    const {
        Heading,
        Images,
        SubHeading,
        Description,
        AnchorText,
        AnchorUrl,
        Disclaimer,
    } = pageData || {};

    useEffect(() => setAnchorEl(null), [sliderIndex])

    return (
        <Box
            className={`${style.leftBannerWrapper} homeTopBanner`}
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
                <Box className={`${style.leftBannerContents} brandEyeExamContents`}>
                    <>
                        {Heading && <Typography
                            component={"h1"}
                            className={`${style.headingMain} ${style.heading}`}
                            dangerouslySetInnerHTML={{ __html: Heading }}
                        ></Typography>}
                        {SubHeading && <Box
                            className={`${style.subHeading} ${style.heading}`}
                            dangerouslySetInnerHTML={{ __html: SubHeading }}
                        />}
                        {Description && (
                            <Box
                                className={style.description}
                                dangerouslySetInnerHTML={{ __html: Description as string }}
                            ></Box>
                        )}
                    </>

                    {(AnchorText || Disclaimer) && <Box className={style.leftBannerBottom}>
                        {AnchorText && <Button
                            className={style.appointmentBtn}
                            aria-label="BookEyeExam"
                            tabIndex={0}
                            onClick={() => router.push(AnchorUrl ? AnchorUrl : "")}
                            data-testid="BookEyeExam"
                        >
                            <span>{AnchorText}</span>
                        </Button>}

                        {Disclaimer && <Button
                            aria-describedby={id}
                            className={`${style.disclaimerBtn} ${brand === BRAND.MEL ? style.disclaimerBtnMEL : ""
                                }`}
                            onClick={handleClick}
                        >
                            {i18n.t("HOME_PAGE.SEE_OFFER_DETAILS")}
                        </Button>}
                        {Disclaimer && <Popper
                            id={id}
                            open={open}
                            anchorEl={anchorEl}
                            placement="bottom-start"
                            className={style.popperContainer}
                        >
                            <Box
                                className={"popperDiv"}
                                dangerouslySetInnerHTML={{ __html: Disclaimer as string }}
                            ></Box>
                        </Popper>}
                    </Box>}
                </Box>
            </Box>
        </Box>
    );
};

export default LeftContentBanner;
