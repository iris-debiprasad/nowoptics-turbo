import { Section } from "@root/host/src/types/home.types";
import style from "./militaryDiscountSection.module.scss";
import ImageWithButton from "../imageWithButton/imageWithButton";
import { Grid } from "@mui/material";

const MilitaryDiscountSection = (props: { pageData: Section[] }) => {

    return (
        <>
            <div className={style.militaryDiscountSectionContainer}>
                <Grid container className={style.militaryDiscountSectionGrid}>
                    <Grid item md={7} xs={12}>
                        <ImageWithButton
                            borderRadius={true}
                            imageAlt={props.pageData[0].Images[0].AltText}
                            image={props.pageData[0].Images[0].ImageUrl}
                            btnName={props.pageData[0].AnchorText as string}
                            btnLink={props.pageData[0].AnchorUrl as string}
                            disclaimer={props.pageData[0].Disclaimer as string}
                        />
                    </Grid>
                    <Grid item md={5} xs={12} className={style.headerContainer}>
                        <div>
                            <h1>{props.pageData[0].Heading}</h1>
                            <p>{props.pageData[0].SubHeading}</p>
                        </div>
                    </Grid>
                </Grid>
            </div>
        </>
    );
};

export default MilitaryDiscountSection;
