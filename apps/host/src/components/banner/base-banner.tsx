import {
    ResponsiveBanner,
    Props as ResponsiveBannerProps,
} from "../responsive-banner";
import styles from "./banner.module.scss";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

interface BaseBannerClasses {
    /** Parent container */
    banner: string;
    /** Content container (child container) */
    content: string;
}

export interface Props {
    /** Banner to be used as background image, includes mobile and table-desktop resolutions */
    banner: ResponsiveBannerProps;
    /** Content to be  */
    children: React.ReactNode;
    /** Classnames prop to style the containers used in banner component */
    classes?: Partial<BaseBannerClasses>;
}

/** 
 * Base Banner component is a banner that can be extended for particular use cases
 * Displays banner images based on "banner" props, and renders over content
 *
 * @example
   <BaseBanner
     banner={{
       mobile: {
         alt: t("FAQ.PAGE_TITLE"),
         src: ImageUrlConstants.BASE_BANNER,
       },
       tabletAndDesktop: {
         alt: t("FAQ.PAGE_TITLE"),
         src: ImageUrlConstants.BASE_BANNER_MOBILE,
       },
    }}>
      <h1>Hello World</h1>
    </BaseBanner>
 */
export const BaseBanner = ({
    banner,
    children,
    classes,
}: Props): JSX.Element => (
    <section className={`${styles.banner} ${classes?.banner || ""}`}>
        <ResponsiveBanner {...banner} />

        <div className={`${styles.banner__content} ${classes?.content || ""}`}>
            {children}
        </div>
    </section>
);

BaseBanner.displayName = "BaseBanner";
