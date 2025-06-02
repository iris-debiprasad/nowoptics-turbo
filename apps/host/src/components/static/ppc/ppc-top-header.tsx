import IconSVG from "@/components/iconsvg/IconSVG";
import { Box, Button } from "@mui/material";
import style from "./ppc.module.scss";
import Image from "next/image";

export const PPCTopHeader = (props: any) => {
    return (
        <>
            <Box className={style.bookMainBox}>
                <Box className={style.bookContainer}>
                    <Box className={style.bookRight}>
                        <Image height={100} width={100} alt="" src={props.data.topHeaderImage}></Image>
                    </Box>
                    <Box className={style.bookLeft}>
                        <Box component={"h2"} className={style.bestCombo} dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.BannerTitle }}></Box>
                        <Box className={style.plusEye}>
                            <Box dangerouslySetInnerHTML={{ __html: props.data.ppcPageData.Description.BannerDescription }}></Box>
                        </Box>
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
                                    {props.data.ppcPageData.Description.ButtonText}
                                </span>
                            </Button>
                            <Button
                                className={style.disclaimerBtn}
                                onClick={() => props.data.handleOpen(props.data.ppcPageData.Description.Disclaimer)}
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

export default PPCTopHeader;