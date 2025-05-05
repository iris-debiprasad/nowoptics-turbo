import NextLink from "next/link";
import { useTranslation } from "react-i18next";

import { ResponsiveBanner } from "@/components/responsive-banner";
import { FAQ } from "@/components/faq";
import { HowItem } from "./how-item/how-item";
import { FAQs, HOW_IT_WORKS_ITEMS } from "./bopis.constants";
import { InternalLinkPrimary } from "@/components/internal-link";
import { FramesCarousel, FramesCarouselProps } from "./frames-carousel";
import styles from "./bopis.module.scss";
import { ImageUrlConstants } from "@/constants/image.url.constants";

const BOPIS_IMAGES = ImageUrlConstants.BOPIS;

interface Props extends FramesCarouselProps { }

/**
 * Bopis stands for "Buy Online, Pickup in store"
 */
export const BopisLP = ({ frames }: Props) => {
    const translation = useTranslation();
    const { t } = translation;

    return (
        <>
            <NextLink href="/catalog/all-frames">
                <ResponsiveBanner
                    mobile={{
                        alt: t("BOPIS.TOP_BANNER_ALT"),
                        src: BOPIS_IMAGES.TOP_BANNER_MOBILE,
                    }}
                    tabletAndDesktop={{
                        alt: t("BOPIS.TOP_BANNER_ALT"),
                        src: BOPIS_IMAGES.TOP_BANNER_DESKTOP,
                    }}
                />
            </NextLink>

            <section className={styles["top-content"]}>
                <h1 className="informational-page-title text-center">
                    {t("BOPIS.HEADLINE")}
                </h1>

                <h2
                    className={`informational-page-subtitle text-center ${styles["top-content__pick-title"]}`}
                >
                    Check out what{"'"}s available for store pickup!
                </h2>

                <FramesCarousel {...{ frames }} />

                <InternalLinkPrimary
                    className={styles["top-content__see-more-frames"]}
                    href="/catalog/all-frames"
                >
                    See More Frames
                </InternalLinkPrimary>

                <h2
                    className={`informational-page-subtitle text-center ${styles["top-content__subtitle"]}`}
                >
                    {t("BOPIS.HOW_WORKS")}
                </h2>

                <p className={styles["top-content__undertext"]}>
                    {t("BOPIS.HOW_WORKS_DESC")}
                </p>

                <div className={styles["top-content__how-it-works-list"]}>
                    {HOW_IT_WORKS_ITEMS(translation).map((item) => (
                        <HowItem key={item.title} {...{ item }} />
                    ))}
                </div>

                <InternalLinkPrimary
                    className={styles["top-content__shop-now"]}
                    href="/catalog/all-frames"
                >
                    {t("BOPIS.SHOP_NOW")}
                </InternalLinkPrimary>
            </section>

            <NextLink href="/catalog/all-frames">
                <ResponsiveBanner
                    mobile={{
                        alt: t("BOPIS.FAQ_BANNER_ALT"),
                        src: BOPIS_IMAGES.FAQ_BANNER_MOBILE,
                    }}
                    tabletAndDesktop={{
                        alt: t("BOPIS.FAQ_BANNER_ALT"),
                        src: BOPIS_IMAGES.FAQ_BANNER_DESKTOP,
                    }}
                />
            </NextLink>

            <section className={styles.faq}>
                <h2
                    className={`informational-page-subtitle text-center ${styles.faq__title}`}
                >
                    {t("BOPIS.FAQ_TITLE")}
                </h2>

                <FAQ className={styles.faq__qas} faqs={FAQs(translation)} />

                <div className={styles.faq__disclaimers}>
                    <p className={styles.faq__disclaimer}>{t("BOPIS.DISCLAIMER_1")}</p>
                    <p className={styles.faq__disclaimer}>{t("BOPIS.DISCLAIMER_2")}</p>
                </div>
            </section>
        </>
    );
};
BopisLP.displayName = "Bopis";
