import Image from "next/image";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";
import { ImageUrlConstants } from "@/constants/image.url.constants";

const IMAGES = ImageUrlConstants.STANTON_ACCESS.SIXTY_OFF_PROMO;

export function SixtyOffPromo(): React.JSX.Element {
  const { t, i18n } = useTranslation();

  return (
    <section className={styles.promo}>
      <header className={styles.promo__header}>
        <p>{t("STANTON_ACCESS.SIXTY_OFF_PROMO.TITLE")}</p>
      </header>

      <figure className={styles.promo__image}>
        <Image
          alt={t("STANTON_ACCESS.SIXTY_OFF_PROMO.IMAGE_ALT")}
          src={
            i18n.language === "de" ? IMAGES.PROMO_IMAGE_SPA : IMAGES.PROMO_IMAGE
          }
          fill
        />
      </figure>

      <p className={styles.promo__disclaimer}>
        <strong>{t("STANTON_ACCESS.SIXTY_OFF_PROMO.DISCLAIMER.TITLE")}</strong>
        {t("STANTON_ACCESS.SIXTY_OFF_PROMO.DISCLAIMER.TEXT")}
      </p>

      <p className={styles.promo__disclaimer}>
        <strong>{t("STANTON_ACCESS.DISCLAIMER.P1")}</strong>
        {t("STANTON_ACCESS.DISCLAIMER.P2")}
      </p>
    </section>
  );
}
