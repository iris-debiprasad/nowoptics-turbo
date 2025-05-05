import { Button, Link } from "@mui/material";
import style from "./OurGuarantee.module.scss";
import { useRouter } from "next/router";
import IconSVG from "@/components/iconsvg/IconSVG";
import { useTranslation } from "react-i18next";
import { CTLBanner } from "@/components/banner";
import { GuaranteePageProps } from "@/pages/our-guarantee";
import { ImageUrlConstants } from "@/constants/image.url.constants";

const BANNERS = ImageUrlConstants.OUR_GUARANTEE;

interface Props extends GuaranteePageProps { }

const OurGuarantee = ({ isSO }: Props) => {
    const { t } = useTranslation();
    const router = useRouter();

    return (
        <div className={style.aboutUsContainer}>
            <CTLBanner
                banner={{
                    mobile: {
                        alt: t("OUR_GUARANTEE.BANNER_TITLE"),
                        src: BANNERS[isSO ? "SO" : "MEL"].MOBILE,
                    },
                    tabletAndDesktop: {
                        alt: t("OUR_GUARANTEE.BANNER_TITLE"),
                        src: BANNERS[isSO ? "SO" : "MEL"].DESKTOP,
                    },
                }}
                title={{
                    as: "h1",
                    className: `${style["banner-title"]} ${isSO ? "" : style.mel}`,
                    text: t("OUR_GUARANTEE.BANNER_TITLE"),
                }}
            />

            <div className={style.gridContainer}>
                <div className={style.contentContainer}>
                    <div className={style.content}>
                        <h2>{t(`OUR_GUARANTEE.GUARANTEE_POLICY`)}</h2>
                        <p>{t(`OUR_GUARANTEE.YOUR_SATISFACTION`)}</p>
                        <p>
                            {t(`OUR_GUARANTEE.IF_YOU_ARE`)}{" "}
                            <Link
                                className={style.externalLink}
                                href="https://ansi.org/resource-center/american-national-standards"
                                target="_blank"
                                rel="noreferrer"
                            >
                                {t(`OUR_GUARANTEE.AMERICAN_NATIONAL`)}
                            </Link>{" "}
                            {t(`OUR_GUARANTEE.ANSI_GUIDELINES`)}
                        </p>
                        <p>{t(`OUR_GUARANTEE.CONTACT_LENSES`)}</p>
                        <p>
                            {t(`OUR_GUARANTEE.IF_YOU_HAVE`)}{" "}
                            {t(`OUR_GUARANTEE.RETURN_POLICY`)}{" "}
                            {t(`OUR_GUARANTEE.PLEASE_CONTACT`)}
                            <Link className={style.externalLink} href="tel:8775185788">
                                (877) 518-5788
                            </Link>
                            .
                        </p>
                        <div className={style.buttonContainer}>
                            <Button
                                className={style.appointmentBtn}
                                endIcon={
                                    <IconSVG
                                        width="17"
                                        height="18"
                                        viewBox="0 0 17 18"
                                        fill="none"
                                        fillP="#010101"
                                        name="arrow_solid_right"
                                    />
                                }
                                onClick={() => router.push("/schedule-exam/")}
                                data-testid="BookEyeExam"
                            >
                                {t(`OUR_GUARANTEE.BOOK_EYE_EXAM`)}
                            </Button>
                            <div className={style.disclaimer}>
                                <p>{t(`OUR_GUARANTEE.PURCHASE_PRICE`)}</p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default OurGuarantee;
