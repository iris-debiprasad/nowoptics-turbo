import { Box, Container, Grid } from "@mui/material";
import style from "./ppc.module.scss";
import Image from "next/image";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import { useTranslation } from 'react-i18next';
import { BRAND } from "@/constants/common.constants";

const PPC_INSURANCE_IMAGES = ImageUrlConstants.PPC_INSURANCE;

const INSURANCE_IMAGES = [
    { size: 1, url: PPC_INSURANCE_IMAGES.UNITED_HEALTHCARE_VISION_LOGO },
    { size: 1, url: PPC_INSURANCE_IMAGES.CEC_LOGO },
    { size: 2, url: PPC_INSURANCE_IMAGES.DAVIS_VISION_LOGO },
    { size: 1, url: PPC_INSURANCE_IMAGES.NVA_LOGO },
    { size: 2, url: PPC_INSURANCE_IMAGES.SUPERIOR_VISION_LOGO },
    { size: 1, url: PPC_INSURANCE_IMAGES.AVESIS_LOGO },
    { size: 1, url: PPC_INSURANCE_IMAGES.SPECTERA_LOGO },
    { size: 2, url: PPC_INSURANCE_IMAGES.ARGUS_AFLAC_LOGO }
]
const PPCInsurance = (props: any) => {
    const { t } = useTranslation();
    return (
        <>
            {props.data.brand === BRAND.MEL ?
                <Box className={`${style.insuranceMainBox} ${props.data.brand === BRAND.MEL ? style.melInsuranceMainBox : ""}`}>
                    <Container maxWidth="xl" className={style.insuranceMainContainer}>
                        <Box className={style.insuranceBox1}>
                            <Box component={"h2"} className={style.insuraceHead}>{t(`PPC.GOT_INSURANCE`)}</Box>
                            <Box className={style.insuranceSubHead}>{t(`PPC.SAVE_BIG`)}</Box>
                            <Grid container spacing={"20px"}>
                                {INSURANCE_IMAGES.map((image: any, index: any) => {
                                    return <Grid key={index} item xs={4} md={image.size} className={style.multiselectContainer}>
                                        <Image className={style.insuranceImage} alt="" height={0} width={0} src={image.url}></Image>
                                    </Grid>
                                })}
                                <Grid item xs={4} md={1} className={style.andMoreContainer}>
                                    <span className={style.andMore}>...and more</span>
                                </Grid>
                            </Grid>
                            <Box className={style.insuraceFoot}>{t(`PPC.ALSO_ACCEPTED`)}</Box>
                        </Box>
                    </Container>
                </Box>
                :
                <Box className={style.insuranceMainBox}>
                    <Container maxWidth="xl" className={style.insuranceMainContainer}>
                        <Box className={style.insuranceBox1}>
                            <Box component={"h2"} className={style.insuraceHead}>{t(`PPC.INSURANCE`)}</Box>
                            <Box className={style.insuranceSubHead}>{t(`PPC.USE_YOUR_VISION`)}</Box>
                            <Box className={style.insuranceThumbImg}>
                                <Image
                                    alt="Insurance"
                                    src={ImageUrlConstants.INSURANCE_LOGO_GROUP}
                                    width={1100}
                                    height={46}
                                    className={style.image}
                                />
                                <Image
                                    src={ImageUrlConstants.INSURANCE_LOGO_MOBILE}
                                    alt="Insurance"
                                    width={600}
                                    height={400}
                                    className={style.mobileImage}
                                />
                            </Box>
                            <Box className={style.insuraceFoot}>{t(`PPC.ALSO_ACCEPTED`)}</Box>
                        </Box>
                    </Container>
                </Box>
            }
        </>
    )
}

export default PPCInsurance;