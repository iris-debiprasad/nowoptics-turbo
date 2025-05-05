import { useTranslation } from "react-i18next";
import CheckIcon from "@mui/icons-material/Check";
import styles from "./index.module.scss";
import Image from "next/image";
import { ImageUrlConstants } from "@/constants/image.url.constants";

// This value has to be coordinated with the translation one so that benefits
// are displayed correctly, if in the translation file appear 8 benefits, this
// value has to be 8
const BENEFITS_COUNT = 7;
const IMAGES = ImageUrlConstants.STANTON_ACCESS.CONTACTS_PROMO;

export function MemberBenefits(): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <section className={styles.benefits}>
      <p className={styles.benefits__title}>
        {t("STANTON_ACCESS.BENEFITS.TITLE")}
      </p>

      <div className={styles.benefits__list}>
        {[...new Array(BENEFITS_COUNT)].map((_, index) => (
          <p className={styles.benefits__item} key={`benefit-${index}`}>
            <CheckIcon width={12} height={12} style={{ stroke: "#0080ff" }} />
            <span>{t(`STANTON_ACCESS.BENEFITS.B${index + 1}`)}</span>
          </p>
        ))}
      </div>

      <figure className={styles.benefits__promo_image}>
        <Image
          alt={t("STANTON_ACCESS.CONTACTS_PROMO.IMAGE_ALT")}
          src={IMAGES.CONTACTS_IMAGE}
          fill
        />
      </figure>
    </section>
  );
}
