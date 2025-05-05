import { Section } from "@/types/home.types";
import style from "./shopByShapeSection.module.scss";
import { Chip, Grid } from "@mui/material";
import Image from "next/image";
import { useRouter } from "next/router";

const ShopByShapeSection = (props: { pageData: Section[] }) => {
    const router = useRouter();

    return (
        <div className={style.shopByShapeSectionContainer}>
            <h1>{props.pageData[0].Heading}</h1>
            <Grid container spacing={3}> 
                {props.pageData.map((section: any, index: number) =>
                    <Grid className={style.chipContainer} item key={index} xs={6} md={2}>
                        <Chip key={index} onClick={() => router.push(section.AnchorUrl || "")} className={style.chip} label={section.Images[0].AltText} icon={
                            <Image className={style.image} src={section.Images[0].ImageUrl} alt={section.Images[0].AltText} width={50} height={50} />
                        }
                        />
                    </Grid>
                )}
            </Grid>
        </div>
    );
};

export default ShopByShapeSection;
