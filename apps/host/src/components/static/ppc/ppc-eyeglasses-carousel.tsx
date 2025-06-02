import React, { useEffect } from "react";
import { AlertColor, Box, Button, Container } from "@mui/material";
import style from "./ppc.module.scss";
import Link from "next/link";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { BRAND, SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import IconSVG from "@/components/iconsvg/IconSVG";
import ImageSlider from "@/components/image_slider/ImageSlider";
import { SLIDER_CONSTANT } from "@root/host/src/constants/ImageSlider.constants";
import { getAllConfigurations } from "@/service/common.service";
import { useRouter } from "next/router";

const PPCEyeglassesCarousel = (props: any) => {
    const router = useRouter();
    const slug: any = router.query.slug;
    const { Heading, Description, AnchorText, AnchorUrl } = props.data.brand === BRAND.MEL ?
        {
            Heading: "STYLISH FRAMES",
            Description: "Choose from over 1,000 frames for yourself and rest of the fam.",
            AnchorText: slug[0] == "bowling-green" ? "Shop Now at Stanton Optical" : "Check them out",
            AnchorUrl: slug[0] == "bowling-green" ? "/catalog/all-frames/?redirectedfrom=myeyelab" : "/catalog/all-frames/"
        } : {
            Heading: "Frames that will make you happy",
            Description: "Choose from over 1,500 stylish frames for women, men, and kids.",
            AnchorText: "take a look",
            AnchorUrl: "/catalog/all-frames/"
        };
    const [frameData, setFrameData] = React.useState([]);
    const { showSnackBar } = useSnackBar();
    const formattedHeading =
        Heading.charAt(0).toUpperCase() + Heading.slice(1).toLowerCase();


    const fetchFacets = () => {
        getAllConfigurations("PPCProducts")
            .then((res) => {
                if (res && res.data && res.data.Result) {
                    const parsedResult = JSON.parse(res.data.Result);
                    const mappedData = parsedResult.eyeglasses.map((data: any) => {
                        return {
                            id: data.sku,
                            uniqueId: [data.modelNumber],
                            modelnumber: data.modelNumber,
                            title: data.sku,
                            variants: [{
                                modelnumber: data.modelNumber,
                                vTitle: data.sku,
                                sku: data.sku,
                                images: JSON.stringify([props.data.brand === BRAND.MEL && data.imageUrl34 ? data.imageUrl34 : data.imageUrl])
                            }]
                        }
                    });
                    setFrameData(mappedData);
                }
            })
            .catch((err) => {
                const message = err.response
                    ? err.response.data?.Error?.Message
                    : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
                showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
            });
    };

    useEffect(() => {
        fetchFacets();
    }, []);

    return (
        <>
            {
                (frameData && frameData.length > 0) && <Box className={style.framesMainBox}>
                    <Container className={style.framesContainer}>
                        <Box className={style.framesTextbox}>
                            {props.data.brand === BRAND.MEL ?
                                <Box component={"h2"} className={`${style.frameHeading} ${style.melFrameHeading}`}>
                                    {Heading}
                                </Box>
                                :
                                <Box component={"h2"} className={style.frameHeading}>
                                    {formattedHeading}
                                </Box>}
                            <Box className={style.frameSubHeading}>{Description}</Box>
                        </Box>
                    </Container>
                    <ImageSlider
                        slideType={SLIDER_CONSTANT.UNBXD_SLIDER}
                        productData={[]}
                        productUnbxdData={frameData}
                        sliderLength={frameData.length}
                    />
                    <Container className={style.framesContainer}>
                        <Box className={style.framesTextbox}>
                            <Link href={AnchorUrl ? AnchorUrl : ""}>
                                <Button
                                    className={`${props.data.brand === BRAND.MEL ? style.melBtnFrame : style.btnFrame}`}
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
                        </Box>
                    </Container>
                </Box>
            }
        </>
    );
}


export default PPCEyeglassesCarousel;