import { Box, Button } from "@mui/material";
import style from "./ppc.module.scss";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

const PPC_TOP_HEADER_IMAGES = ImageUrlConstants.PPC_TOP_HEADER;

export const MELPPCTopHeader = (props: any) => {
    const headerData = { ...props.data.ppcPageData.Description };

    return (
        <>
            <Box className={style.melBookMainBox} sx={{
                backgroundImage: `url(${props.data.isContacts ? PPC_TOP_HEADER_IMAGES.MEL_CONTACT_HEADER_DESKTOP : PPC_TOP_HEADER_IMAGES.MEL_HEADER_DESKTOP})`,
                "@media (max-width: 768px)": {
                    backgroundImage: `url(${props.data.isContacts ? PPC_TOP_HEADER_IMAGES.MEL_CONTACT_HEADER_MOBILE : PPC_TOP_HEADER_IMAGES.MEL_HEADER_MOBILE})`,
                },
            }}>
                <Box className={style.bookContainer}>
                    <Box className={style.melBookLeft}>
                        <Box
                            component={"h2"}
                            className={style.bestCombo}
                            dangerouslySetInnerHTML={{ __html: headerData.BannerTitle }}
                        ></Box>
                        <Box className={style.plusEye}>
                            <Box dangerouslySetInnerHTML={{ __html: headerData.BannerDescription }}></Box>
                        </Box>
                        <Box className={style.btnBookEyeExam}>

                            <Button
                                className={style.btnBook}
                                onClick={props.data.handleBookEyeExamClick}
                                data-testid="BookEyeExam"
                            >
                                <span>
                                    {headerData.ButtonText}
                                </span>
                            </Button>
                            <Button
                                className={style.disclaimerBtn}
                                onClick={() => props.data.handleOpen(headerData.Disclaimer)}
                                role="open_modal"
                            >
                                *See offer details
                            </Button>
                        </Box>
                    </Box>
                </Box>
            </Box>
        </>
    )
}

export default MELPPCTopHeader;