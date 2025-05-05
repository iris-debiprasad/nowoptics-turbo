import { Box, Container } from "@mui/material";
import style from "./ppc.module.scss";
import Image from "next/image";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import { useTranslation } from 'react-i18next';
import { BRAND } from "@/constants/common.constants";

const PPCBuyNow = (props: any) => {
    const { t } = useTranslation();
    return (
        <>
            <Box className={`${style.buyNowMainBox} ${props.data.brand === BRAND.MEL ? style.melBuyNowMainBox : ""}`}>
                <Container maxWidth="lg" className={style.buyNowMainContainer}>
                    <Box className={style.buyNowbox1}>
                        {props.data.brand === BRAND.MEL ? "" : <Box className={style.buyNowImage}>
                            <Image
                                alt="Buy Now and Pay Later"
                                src={ImageUrlConstants.BUY_NOW}
                                width={37}
                                height={39}
                            />
                        </Box>}
                        <Box component={"h2"} className={style.buyNowHeading}>{t(`${props.data.brand === BRAND.MEL ? "PPC.WANNA_BUY_NOW" : "PPC.BUY_NOW"}`)}</Box>
                        <Box className={style.buyNowSubHeading}>{t(`PPC.WE_OFFER_FINANCING`)}</Box>
                    </Box>
                </Container>
            </Box>
        </>
    )
}

export default PPCBuyNow;
