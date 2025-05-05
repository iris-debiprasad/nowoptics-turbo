import { useTranslation } from "react-i18next";
import styles from "./index.module.scss";
import Link from "next/link";
import { Button } from "@mui/material";
import IconSVG from "@/components/iconsvg/IconSVG";
import Image from "next/image";

export function HoliDeals(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Image
        alt={t("SPECIAL_OFFERS/HOLI_DEALS.IMAGE_ALT")}
        src={t("SPECIAL_OFFERS/HOLI_DEALS.TOP_BANNER")}
        width={2000}
        height={483}
        className={styles["top-banner"]}
      />

      <section className={`${styles["container"]} ${styles["top-container"]}`}>
        <div>
          <h1 className={styles.title}>
            {t("SPECIAL_OFFERS/HOLI_DEALS.MAIN_TITLE")}
          </h1>
          <h2 className={styles["main-text"]}>
            {t("SPECIAL_OFFERS/HOLI_DEALS.MAIN_TEXT")}
          </h2>
        </div>

        <div className={styles["note"]}>
          <Image
            alt={t("SPECIAL_OFFERS/HOLI_DEALS.IMAGE_ALT")}
            src={t("SPECIAL_OFFERS/HOLI_DEALS.NOTE_IMAGE_DESKTOP")}
            className={styles["note-image-desktop"]}
            width={100}
            height={50}
          />
          <Image
            alt={t("SPECIAL_OFFERS/HOLI_DEALS.IMAGE_ALT")}
            src={t("SPECIAL_OFFERS/HOLI_DEALS.NOTE_IMAGE_MOBILE")}
            className={styles["note-image-mobile"]}
            width={100}
            height={50}
          />
        </div>

        <Link className={styles["button-link"]} href="/catalog/eyeglasses">
          <Button
            className="seoBookExamBtn"
            endIcon={
              <IconSVG
                width="9"
                height="15"
                viewBox="0 0 9 15"
                fill="none"
                fillP="#010101"
                name="arrow_solid_right"
              />
            }
          >
            {t("SPECIAL_OFFERS/HOLI_DEALS.SHOP_CTA_TEXT")}
          </Button>
        </Link>
      </section>
      <hr />
      <section className={styles.container}>
        <p className={styles.disclaimer}>
          {t("SPECIAL_OFFERS/HOLI_DEALS.DISCLAIMER")}
        </p>
      </section>
    </>
  );
}
