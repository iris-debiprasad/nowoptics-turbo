import React, { useEffect, useRef, useState } from 'react'
import useResponsive from "@/hooks/useResponsive";
import style from "./FourStepsBanner.module.scss";
import Image from "next/image";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import Button from '@mui/material/Button';
import IconSVG from '@/components/iconsvg/IconSVG';
import { RX_RENEWAL_CONSTANT } from '@root/host/src/constants/RxRenewal.constants';
import { Box, Typography } from '@mui/material';

const FourStepsBanner = () => {
    const hasReached = useResponsive()
    const [index, setIndex] = useState(0)
    let timerRef = useRef<NodeJS.Timeout | null>(null);
    useEffect(() => {
        if (!hasReached.xl) {
            timerRef.current = setTimeout(() => {
                handleNext()
            }, 5000)
        }
        else {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
        return () => {
            if (timerRef.current) {
                clearTimeout(timerRef.current);
            }
        }
    }, [index, hasReached.xl])

    const handleNext = () => {
        setIndex((index + 1) % ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.MOBILE_FOUR_STEPS_IMAGE.length)
    }
    const handlePrev = () => {
        setIndex(!index ? ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.MOBILE_FOUR_STEPS_IMAGE.length - 1 : index - 1)
    }
    return (
        <Box className={style.fourStepsContainer}>
            <Typography
                variant="h1"
                className={style.bannerHeading}
            >
                {RX_RENEWAL_CONSTANT.FOUR_STEP_BANNER_HEADING}
            </Typography>
            {hasReached.xl ?
                <Image
                    className={style.bannerImage}
                    width={1366}
                    height={330}
                    layout="responsive"
                    src={ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.FOUR_STEPS_BANNER}
                    alt="Prescription renewal"
                /> :
                <Box className={style.mainCarousalContainer}>
                    <Box className={style.mainCarousal}>
                        <Button
                            onClick={handlePrev}
                        >
                            <IconSVG
                                width="42"
                                height="30"
                                viewBox="0 0 20 20"
                                fill="#687689 "
                                name="arrow_thin_left"
                            />
                        </Button>
                        <Box className={style.carousalInner}>
                            {ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.MOBILE_FOUR_STEPS_IMAGE.map((img: string, idx: number) => (
                                <Image
                                    key={idx}
                                    className={`${style.mobileBannerImage} ${idx === index ? style.act : style.nonAct}`}
                                    width={200}
                                    height={200}
                                    layout="responsive"
                                    src={img}
                                    alt="image"
                                />
                            ))}
                        </Box>
                        <Button
                            onClick={handleNext}
                        >
                            <IconSVG
                                width="42"
                                height="30"
                                viewBox="0 0 20 20"
                                fill="#687689 "
                                name="arrow_thin_right"
                            />
                        </Button>

                    </Box>
                    <Box className={style.dotContainer}>
                        {ImageUrlConstants.PRESCRIPTION_RENEWAL_IMG.MOBILE_FOUR_STEPS_IMAGE.map((_: string, idx: number) => (
                            <div key={idx} className={`${style.dot} ${idx === index ? style.active : ""}`} />
                        ))}
                    </Box>
                </Box>
            }
        </Box>
    );
};

export default FourStepsBanner;
