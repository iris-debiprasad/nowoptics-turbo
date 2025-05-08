import { Section } from "@root/host/src/types/home.types";
import style from "./lifeStyleSection.module.scss";
import ImageWithButton from "../imageWithButton/imageWithButton";

const LifeStyleSection = (props: { pageData: Section[] }) => {
    const sections = props?.pageData.sort((a, b) => Number(a.Description) - Number(b.Description));

    return (
        <>
            <div className={style.lifeStyleSectionContainer}>
                <div className={style.headerContainer}>
                    <h1>{sections[0].Heading}</h1>
                    <p>{sections[0].SubHeading}</p>
                </div>
                <div className={style.imageContainer}>
                    <div className={style.w40}>
                        <div className={style.p05}>
                            <ImageWithButton
                                borderRadius={true}
                                imageAlt={sections[0].Images[0].AltText}
                                image={sections[0].Images[0].ImageUrl}
                                btnName={sections[0].AnchorText as string}
                                btnLink={sections[0].AnchorUrl as string}
                                disclaimer={sections[0].Disclaimer as string}
                                key={0}
                            />
                        </div>
                    </div>
                    <div className={`${style.w40} ${style['d-none']}`}>
                        <div className={style.p05}>
                            <ImageWithButton
                                borderRadius={true}
                                imageAlt={sections[1].Images[0].AltText}
                                image={sections[1].Images[0].ImageUrl}
                                btnName={sections[1].AnchorText as string}
                                btnLink={sections[1].AnchorUrl as string}
                                disclaimer={sections[1].Disclaimer as string}
                                key={1}
                            />
                        </div>
                    </div>
                    <div className={style.w20}>
                        <div className={`${style.p05} ${style['w-50']}`}>
                            <ImageWithButton
                                borderRadius={true}
                                imageAlt={sections[2].Images[0].AltText}
                                image={sections[2].Images[0].ImageUrl}
                                btnName={sections[2].AnchorText as string}
                                btnLink={sections[2].AnchorUrl as string}
                                disclaimer={sections[2].Disclaimer as string}
                                key={2}
                            />
                        </div>
                        <div className={`${style.p05} ${style['w-50']}`}>
                            <ImageWithButton
                                borderRadius={true}
                                imageAlt={sections[3].Images[0].AltText}
                                image={sections[3].Images[0].ImageUrl}
                                btnName={sections[3].AnchorText as string}
                                btnLink={sections[3].AnchorUrl as string}
                                disclaimer={sections[3].Disclaimer as string}
                                key={3}
                            />
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default LifeStyleSection;
