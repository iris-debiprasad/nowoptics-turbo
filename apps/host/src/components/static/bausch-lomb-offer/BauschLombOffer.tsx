import { Button } from "@mui/material";
import { useRouter } from "next/router";
import style from "./BauschLombOffer.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import { ResponsiveBanner } from "@/components/responsive-banner";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import Image from "next/image";

const SPECIAL_OFFERS_IMAGES = ImageUrlConstants.SPECIAL_OFFERS;

const offerBannerTitleHtml = `<div><h1 style="color: #243152; font: 700 clamp(28px, 5vw, 48px)/1 'Recoleta'; text-align: center;">Annual Supply of<br>Bausch + Lomb ULTRA<sup style="font-size: clamp(0.5rem, 3vw, 1.5rem);">®</sup></h1></div>`;
const offerBannerDescriptionHtml = `<div><p style="color: #243152; text-transform: uppercase; font-size: clamp(20px, 5vw, 30px); font-weight: 400; text-align: center">With a Free Contact Lens Eye Exam*</p></div>`;
const offerBannerPriceHtml = `<div><div style="text-align: center;">
<p style="color: #243152; font: 700 clamp(20px, 5vw, 26px)/1 'Recoleta'; margin-top: 1.5rem;">For ONLY $127.17<br>
<span style="font-size: 16px;">(After Savings &amp; Rebate)</span></p>
</div>
</div>`

const BauschLombOffer = () => {
    const router = useRouter();
    return (
        <>
            <ResponsiveBanner
                mobile={{
                    alt: "Ultra Savings on Ultra Comfort",
                    src: SPECIAL_OFFERS_IMAGES.SO.BAUSCH_LOMB_PAGE_MOBILE
                }}
                tabletAndDesktop={{
                    alt: `Ultra Savings on Ultra Comfort`,
                    src: SPECIAL_OFFERS_IMAGES.SO.BAUSCH_LOMB_PAGE_DESKTOP
                }}
            />
            <div className={style.imageContainer}>
                <Image
                    src={SPECIAL_OFFERS_IMAGES.SO.BAUSCH_LOMB_PAGE_BUBBLE_BACKGROUND}
                    alt="Image description"
                    width={1915}
                    height={300}
                    style={{ width: '100%', opacity: "0.5" }}
                />
                <div className={style.overlay}>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: offerBannerTitleHtml
                        }}
                    ></div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: offerBannerDescriptionHtml
                        }}
                    ></div>
                    <div
                        dangerouslySetInnerHTML={{
                            __html: offerBannerPriceHtml
                        }}
                    ></div>
                </div>
            </div>
            <div className={style.OfferContainer}>
                <div className={style.contentContainer}>
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
                        onClick={() => router.push("/schedule-exam")}
                        data-testid="BookEyeExam"
                    >
                        Book Eye Exam
                    </Button>

                    <p>Experience all-day comfort+ with Bausch + Lomb ULTRA® Monthly Contact Lenses. Ideal for every lifestyle and every event, you’ll enjoy a front-row view of lenses built to retain maximum levels of moisture.</p>
                    <p>Save up to $265.79 on an Annual Supply with a FREE Contact Lens Eye Exam*. And yes! That includes eyeglass prescription. Now, that’s a deal on comfort you won’t want to miss.</p>

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
                        onClick={() => router.push("/schedule-exam")}
                        data-testid="BookEyeExam"
                    >
                        Find a Store
                    </Button>
                </div>
                <p className={style.disclaimer}>
                    *Save $265.79 on an Annual Supply of Bausch + Lomb ULTRA® (after savings, manufacturer rebate, and contact lens eye exam credit): Receive four boxes (6-pack box), one year supply, of Bausch + Lomb ULTRA® for $127.17 after $156.79 in instant savings and manufacturer rebate. All offers cannot be combined with other offers or insurance. Customer will be charged for the cost of the eye exam and will receive a credit applied to customer’s retail purchase (up to the total purchase price) for the value of the eye exam. Eye exams are provided by independent doctors of optometry or ophthalmology. Stanton Optical® does not perform eye exams. Contact lenses are not for sale in Arkansas. Offer valid in-store only. +Comfort Survey on ULTRA® contact lens wearers (n= 529).
                </p>
            </div>
        </>
    );
};

export default BauschLombOffer;
