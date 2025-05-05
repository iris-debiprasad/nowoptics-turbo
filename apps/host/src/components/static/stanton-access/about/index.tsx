import Image from "next/image";
import { useTranslation } from "react-i18next";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./index.module.scss";

const IMAGES = ImageUrlConstants.STANTON_ACCESS.ABOUT;

export function About(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section>
      <div className={styles.banner}>
        <figure className={styles.banner__background_image}>
          <Image
            alt="Stanton Access Background"
            src={IMAGES.BACKGROUND_IMAGE}
            fill
          />
        </figure>

        <section className={styles.banner__content}>
          <div className={styles.banner__information}>
            <figure className={styles.banner__logo_container}>
              <Image alt="Stanton Access" src={IMAGES.LOGO} fill />
            </figure>

            <p className={styles.banner__title}>
              {t("STANTON_ACCESS.VISION_BANNER.TITLE")}
            </p>

            <p className={styles.banner__subtitle}>
              <span className={styles.banner__highlight_blue}>
                {t("STANTON_ACCESS.VISION_BANNER.DESCRIPTION.P1")}
              </span>{" "}
              <br />
              {t("STANTON_ACCESS.VISION_BANNER.DESCRIPTION.P2")}
              <br />
              {t("STANTON_ACCESS.VISION_BANNER.DESCRIPTION.P3")}
            </p>
          </div>

          <figure className={styles.banner__family_img_container}>
            <Image alt="Family" src={IMAGES.FAMILY} fill />
          </figure>
        </section>
      </div>

      <article className={styles.information}>
        <div className={styles.information__title_group}>
          <h1 className={styles.title_mobile}>
            {t("STANTON_ACCESS.ABOUT.WELCOME.P1")}
          </h1>{" "}
          <h1 className={styles.title_desktop}>
            {t("STANTON_ACCESS.ABOUT.WELCOME.DESKTOP_P1")}
          </h1>{" "}
          <h2 className={styles.subtitle_mobile}>
            {t("STANTON_ACCESS.ABOUT.WELCOME.P2")}
          </h2>
          <h2 className={styles.subtitle_desktop}>
            {t("STANTON_ACCESS.ABOUT.WELCOME.DESKTOP_P2.P1")}
            <br />
            {t("STANTON_ACCESS.ABOUT.WELCOME.DESKTOP_P2.P2")}
          </h2>
        </div>

        <p className={styles.perk_mobile}>
          {t("STANTON_ACCESS.ABOUT.PERKS.P1")}
        </p>
        <p className={styles.perk_mobile}>
          {t("STANTON_ACCESS.ABOUT.PERKS.P2")}
        </p>
        <p className={styles.perk_mobile}>
          {t("STANTON_ACCESS.ABOUT.PERKS.P3")}
        </p>

        <div className={styles.perks_group}>
          <p>
            <CheckIcon width={12} height={12} style={{ stroke: "#0080ff" }} />
            {t("STANTON_ACCESS.ABOUT.PERKS.P1")}
          </p>
          <p>
            <CheckIcon width={12} height={12} style={{ stroke: "#0080ff" }} />
            {t("STANTON_ACCESS.ABOUT.PERKS.P2")}
          </p>
          <p>
            <CheckIcon width={12} height={12} style={{ stroke: "#0080ff" }} />
            {t("STANTON_ACCESS.ABOUT.PERKS.P3")}
          </p>
        </div>
      </article>
    </section>
  );
}
