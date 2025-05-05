import { Section } from "@/types/home.types";
import style from "./informationSection.module.scss";
import ImageWithButton from "../imageWithButton/imageWithButton";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

const InformationSection = (props: { pageData: Section[] }) => {
    const router = useRouter();
    const { t } = useTranslation();

    return (
        <>
            <div className={style.informationSectionContainer}>
                <Grid className={style.gridContainer} container spacing={3}>
                    {props?.pageData?.map((category: Section, index: number) => (
                        <Grid className={style.imageContainer} item key={index} xs={12} md={6}>
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
            <Button
                className={style.appointmentBtn}
                aria-label="BookEyeExam"
                tabIndex={0}
                onClick={() => router.push("/book-eye-exam")}
                data-testid="BookEyeExam"
            >
                <span>{t("HEADER.BOOK_EYE_EXAM")}</span>
            </Button>
        </>
    );
};

export default InformationSection;
