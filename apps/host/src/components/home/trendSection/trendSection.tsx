import { Section } from "@/types/home.types";
import style from "./trendSection.module.scss";
import ImageWithButton from "../imageWithButton/imageWithButton";
import { Grid } from "@mui/material";

const TrendSection = (props: { pageData: Section[] }) => {
    return (
        <>
            <div className={style.trendSectionContainer}>
                <Grid className={style.imageContainer} container spacing={3}>
                    {props?.pageData?.map((category: Section, index: number) => (
                        <Grid className={style.imagebox} key={index} item xs={12} md={4}>
                            <h1>{category.Heading}</h1>
                            <p>{category.SubHeading}</p>
                            <ImageWithButton
                                borderRadius={true}
                                imageAlt={category.Images[0].AltText}
                                image={category.Images[0].ImageUrl}
                                btnName={category.AnchorText as string}
                                btnLink={category.AnchorUrl as string}
                                disclaimer={category.Disclaimer as string}
                                key={index}
                            />
                        </Grid>
                    ))}
                </Grid>
            </div>
        </>
    );
};

export default TrendSection;
