import Image from "next/image";
import styles from "./responsive-banner.module.scss";

interface IBannerItem {
    alt: string;
    src: string;
}

export interface Props {
    /** Image that will be displayed on mobile breakpoint */
    mobile: IBannerItem;
    /** Image that will be displayed on tablet and desktop breakpoint (will start displaying on tablet and keep until desktop) */
    tabletAndDesktop: IBannerItem;
}

/**
 * Component that will display a banner image depending wheter if the breakpoint for mobile is reached
 * or tablet and desktop breakpoint is reached (if breakpoint is under 600px width, it will display mobile image,
 * otherwise, will display tablet and desktop image), images have full width and auto height.
 *
 * @example
 * <ResponsiveBanner
 *     mobile={{ alt: "Alt text", src: "https://placekitten.com/150" }}
 *     tabletAndDesktop={{ alt: "Alt text", src: "https://placekitten.com/150" }}
 * />
 */
export const ResponsiveBanner = ({
    mobile,
    tabletAndDesktop,
}: Props): JSX.Element => (
    <>
        <Image
            alt={mobile.alt}
            className={`${styles.banner} ${styles["banner--mobile"]}`}
            width={750}
            height={400}
            src={mobile.src}
        />

        <Image
            alt={tabletAndDesktop.alt}
            className={`${styles.banner} ${styles["banner--tablet-and-desktop"]}`}
            width={1915}
            height={463}
            src={tabletAndDesktop.src}
        />
    </>
);
