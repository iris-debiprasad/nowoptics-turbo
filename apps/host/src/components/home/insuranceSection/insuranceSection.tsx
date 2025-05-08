import { Section } from "@root/host/src/types/home.types";
import styles from "./insuranceSection.module.scss";
import { Button } from "@mui/material";
import { useRouter } from "next/router";
import Image from "next/image";

const InsuranceSection = (props: { pageData: Section[] }) => {
    const router = useRouter();

    return (
        <div className={styles.insuranceSectionContainer}>
            <h1>{props.pageData[0].Heading}</h1>
            <p>{props.pageData[0].SubHeading}</p>
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeImagesLeftToRight}>
                    {props.pageData[0].Images.map((image: any, index: number) => <Image alt="" key={index} src={image.ImageUrl} height={100} width={100} />)}
                </div>
            </div>
            <div className={styles.marqueeContainer}>
                <div className={styles.marqueeImagesRightToLeft}>
                    {props.pageData[0].Images.map((image: any, index: number) => <Image alt="" key={index} src={image.ImageUrl} height={100} width={100} />)}
                </div>
            </div>
            <Button
                className={styles.appointmentBtn}
                tabIndex={0}
                onClick={() => router.push(props.pageData[0].AnchorUrl || "")}
            >
                <span>{props.pageData[0].AnchorText}</span>
            </Button>
            <p className={styles.description}>{props.pageData[0].Description}</p>
        </div>
    );
};

export default InsuranceSection;
