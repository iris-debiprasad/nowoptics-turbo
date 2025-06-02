import { Box, Button } from "@mui/material";
import style from "./ppc.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import { useTranslation } from "react-i18next";
import { BRAND } from "@root/host/src/constants/common.constants";

const PPCPromotionalBanner = (props: any) => {
    const { t } = useTranslation();
    return (
        <>
            <div className={style.promotionBannerContainer}>
                <div className={`${style.promotionBannerBoxContainer} ${props.data.brand === BRAND.MEL ? style.melPromotionBannerBoxContainer : ""}`}>
                    <h2 className={`${props.data.isContacts ? style.contactsHeader : ""}`} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner01Title }}></h2>
                    <div className={style.firstParagragh} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner01Description }}></div>
                    <div className={style.promoPrice} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner01Price }}></div>
                    <Button
                        className={style.disclaimerBtn}
                        onClick={() => props.data.handleOpen(props.data.ppcPageData.Description.PromoBanner01Disclaimer)}
                        role="open_modal"
                    >
                        *See offer details
                    </Button>
                </div>
                <div className={`${style.promotionBannerBoxContainer} ${props.data.brand === BRAND.MEL ? style.melPromotionBannerBoxContainer : ""}`}>
                    <h2 className={`${props.data.isContacts ? style.contactsHeader : ""}`} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner02Title }}></h2>
                    <div className={style.firstParagragh} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner02Description }}></div>
                    <div className={style.promoPrice} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner02Price }}></div>
                    <Button
                        className={style.disclaimerBtn}
                        onClick={() => props.data.handleOpen(props.data.ppcPageData.Description.PromoBanner02Disclaimer)}
                        role="open_modal"
                    >
                        *See offer details
                    </Button>
                </div>
                <div className={`${style.promotionBannerBoxContainer} ${props.data.brand === BRAND.MEL ? style.melPromotionBannerBoxContainer : ""}`}>
                    <h2 className={`${props.data.isContacts ? style.contactsHeader : style.thirdElementHeader}`} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner03Title }}></h2>
                    <div className={`${style.thirdElement} ${style.firstParagragh}`} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner03Description }}></div>
                    <div className={`${style.thirdElement} ${style.promoPrice}`} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.PromoBanner03Price }}></div>
                    <Button
                        className={style.disclaimerBtn}
                        onClick={() => props.data.handleOpen(props.data.ppcPageData.Description.PromoBanner03Disclaimer)}
                        role="open_modal"
                    >
                        *See offer details
                    </Button>
                </div>
            </div>
            <Box className={style.btnBookEyeExam}>
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
                    onClick={props.data.handleBookEyeExamClick}
                    data-testid="BookEyeExam"
                >
                    <span>
                        Book eye exam
                    </span>
                </Button>
            </Box>
        </>
    )
}

export default PPCPromotionalBanner;