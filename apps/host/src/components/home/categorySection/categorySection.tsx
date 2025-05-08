import { Section } from "@root/host/src/types/home.types";
import style from "./categorySection.module.scss";
import ImageWithButton from "../imageWithButton/imageWithButton";
import { Grid } from "@mui/material";

const CategorySection = (props: { pageData: Section[] }) => {
    return (
        <div className={style.categoriesContainer}>
            <Grid container>
                {props?.pageData?.map((category: Section, index: number) => (
                    <Grid item key={index} xs={12} md={4}>
                        <ImageWithButton
                            imageAlt={category.Images[0].AltText}
                            image={category.Images[0].ImageUrl}
                            btnName={category.AnchorText as string}
                            btnLink={category.AnchorUrl as string}
                            key={index}
                        />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default CategorySection;
