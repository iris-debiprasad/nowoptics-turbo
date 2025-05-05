import { Section } from "@/types/home.types";
import style from "./meetStanSection.module.scss";
import { Button, Grid } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const MeetStanSection = (props: { pageData: Section[] }) => {
    const router = useRouter();

    return (
        <div className={style.meetStanContainer}>
            <Grid container>
                <Grid item xs={5} md={5} className={style.imageContainer}>
                    <Image
                        src={props.pageData[0].Images[0].ImageUrl}
                        alt=""
                        width={479}
                        height={400}
                    />
                </Grid>
                <Grid item xs={7} md={4} className={style.headingContainer}>
                    <h1 className={style.heading}>{props.pageData[0].Heading}</h1>
                    <p className={style.subHeading}>{props.pageData[0].Description}</p>
                    <Button
                        className={style.disclaimerBtn}
                        onClick={() => router.push(props.pageData[0].AnchorUrl || "")}
                    >
                        <span>{props.pageData[0].AnchorText}</span>
                    </Button>
                </Grid>
            </Grid>
        </div>
    );
};

export default MeetStanSection;
