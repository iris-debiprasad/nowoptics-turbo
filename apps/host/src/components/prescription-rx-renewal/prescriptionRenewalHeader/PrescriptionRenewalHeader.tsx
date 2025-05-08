import Image from "next/image";
import { Box, Skeleton, Typography } from "@mui/material";
import style from "./PrescriptionRenewalHeader.module.scss";
import React from "react";
import useAppLogo from "@/hooks/useAppLogo";
import { RX_RENEWAL_CONSTANT } from "@root/host/src/constants/RxRenewal.constants";
import { useRouter } from "next/router";

const PrescriptionRenewalHeader = () => {
    const appLogo = useAppLogo();
    const router = useRouter();
    return (
        <>
            <Box className={style.prescriptionHeaderWrapper}>
                <div className={style.header}>
                    <div className={style.headerContainer}>
                        <Box>
                            {appLogo ? (
                                <Image src={appLogo} alt="logo" width={153} height={65} onClick={() => router.push("/")} style={{ cursor : "pointer" }}/>
                            ) : (
                                <Skeleton width={153} height={65} variant="rectangular" />
                            )}
                        </Box>
                        <Box>
                            <Typography className={style.headingText} variant="h6">{RX_RENEWAL_CONSTANT.HEADER_MAIN_HEADING}</Typography>
                        </Box>
                        <Box className={style.normalHeading}>
                            <Typography
                                variant="h6"
                                className={style.headingTextSecondary}
                            >
                                {RX_RENEWAL_CONSTANT.HEADER_SECONDARY_HEADING}
                            </Typography>
                            <Typography className={style.boldText}>{RX_RENEWAL_CONSTANT.HEADER_SECONDARY_TEXT}</Typography>
                        </Box>
                    </div>
                </div>
            </Box >
        </>
    );
};

export default PrescriptionRenewalHeader;
