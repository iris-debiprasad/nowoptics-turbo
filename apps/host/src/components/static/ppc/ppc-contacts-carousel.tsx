import React from "react";
import { AlertColor, Box, Button, Container, } from "@mui/material";
import style from "./ppc.module.scss";
import Link from "next/link";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { BRAND, SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { getAllConfigurations } from "@/service/common.service";
import IconSVG from "@/components/iconsvg/IconSVG";
import ImageSlider from "@/components/image_slider/ImageSlider";
import { SLIDER_CONSTANT } from "@root/host/src/constants/ImageSlider.constants";
import { useRouter } from "next/router";


const PPCContactsCarousel = (props: any) => {
    const router = useRouter();
    const slug: any = router.query.slug;
    const { Heading, Description, AnchorText, AnchorUrl } = props.data.brand === BRAND.MEL ?
        {
            Heading: "We got Contacts!",
            Description: "Check out all our contact lens brands.",
            AnchorText: "see all brands",
            AnchorUrl: slug[0] == "bowling-green" ? "/catalog/contacts/?redirectedfrom=myeyelab" : "/catalog/contacts/"
        } :
        {
            Heading: "Keep your eyes fresh.",
            Description: "Top contact lens brands available.",
            AnchorText: "see all brands",
            AnchorUrl: "/catalog/contacts/"
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
                    const mappedData = parsedResult.contacts.map((data: any) => {
                        return {
                            brand: [data.brand],
                            uniqueId: [data.brand],
                            mimages: JSON.stringify([data.imageUrl]),
                            modelnumber: data.sku,
                            title: data.webName,
                            variants: []
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

    React.useEffect(() => {
        fetchFacets();
    }, []);

    return (
        <>
            {
                (frameData && frameData.length > 0) && <Box className={style.stockupMainBox}>
                    <Container className={style.stockupContainer}>
                        <Box className={style.stockupTextbox}>
                            {props.data.brand === BRAND.MEL ?
                                <Box component={"h2"} className={`${style.stockupHeading} ${style.melStockupHeading}`}>
                                    {Heading}
                                </Box>
                                :
                                <Box component={"h2"} className={style.stockupHeading}>
                                    {formattedHeading}
                                </Box>
                            }
                            <Box className={style.stockupSubHeading}>{Description}</Box>
                        </Box>
                    </Container>
                    <ImageSlider
                        slideType={SLIDER_CONSTANT.UNBXD_SLIDER}
                        productData={[]}
                        productUnbxdData={frameData}
                        sliderLength={frameData.length}
                        isContactLens={true}
                        showDetails={true}
                    />
                    <Container className={style.stockupContainer}>
                        <Box className={style.stockupTextbox}>
                            <Link href={AnchorUrl ? AnchorUrl : ""}>
                                <Button
                                    className={`${props.data.brand === BRAND.MEL ? style.melBtnStockup : style.btnStockup}`}
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

export default PPCContactsCarousel;