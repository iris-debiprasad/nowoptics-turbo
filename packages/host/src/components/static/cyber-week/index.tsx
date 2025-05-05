import { ResponsiveBanner } from "@/components/responsive-banner";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";
import Link from "next/link";
import { Button } from "@mui/material";
import IconSVG from "@/components/iconsvg/IconSVG";
import Image from "next/image";

export function CyberWeek(): JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <ResponsiveBanner
        mobile={{
          alt: t("SPECIAL_OFFERS/CYBER_WEEK.MAIN_TITLE"),
          src: t("SPECIAL_OFFERS/CYBER_WEEK.TOP_BANNER_MOBILE"),
        }}
        tabletAndDesktop={{
          alt: t("SPECIAL_OFFERS/CYBER_WEEK.MAIN_TITLE"),
          src: t("SPECIAL_OFFERS/CYBER_WEEK.TOP_BANNER_DESKTOP"),
        }}
      />

      <section className={styles.container}>
        <div>
          <h1 className={styles.title}>
            {t("SPECIAL_OFFERS/CYBER_WEEK.MAIN_TITLE")}
          </h1>
          <p className={styles.subtitle}>
            {t("SPECIAL_OFFERS/CYBER_WEEK.MAIN_SUBTITLE")}
          </p>
          <h2 className={styles["main-text"]}>
            {t("SPECIAL_OFFERS/CYBER_WEEK.MAIN_TEXT")}
          </h2>
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
            {t("SPECIAL_OFFERS/CYBER_WEEK.SHOP_CTA_TEXT")}
          </Button>
        </Link>

        <div className={styles["info-group"]}>
          <h3 className={styles["info-group__question"]}>
            {t("SPECIAL_OFFERS/CYBER_WEEK.ACCOUNT_QUESTION")}
          </h3>
          <p>
            {t("SPECIAL_OFFERS/CYBER_WEEK.ACCOUNT_RESPONSE.P1")}{" "}
            <Link href="/my-account">
              <strong>
                {t("SPECIAL_OFFERS/CYBER_WEEK.ACCOUNT_RESPONSE.P2")}
              </strong>
            </Link>{" "}
            {t("SPECIAL_OFFERS/CYBER_WEEK.ACCOUNT_RESPONSE.P3")}
          </p>
        </div>

        <div className={styles["info-group"]}>
          <h4 className={styles["info-group__question"]}>
            {t("SPECIAL_OFFERS/CYBER_WEEK.NO_ACCOUNT_QUESTION")}
          </h4>
          <p>{t("SPECIAL_OFFERS/CYBER_WEEK.NO_ACCOUNT_RESPONSE.P1")}</p>
          <ul className={styles.list}>
            <li>{t("SPECIAL_OFFERS/CYBER_WEEK.NO_ACCOUNT_RESPONSE.P2")}</li>
            <li>{t("SPECIAL_OFFERS/CYBER_WEEK.NO_ACCOUNT_RESPONSE.P3")}</li>
            <li>{t("SPECIAL_OFFERS/CYBER_WEEK.NO_ACCOUNT_RESPONSE.P4")}</li>
            <li>{t("SPECIAL_OFFERS/CYBER_WEEK.NO_ACCOUNT_RESPONSE.P5")}</li>
            <li>{t("SPECIAL_OFFERS/CYBER_WEEK.NO_ACCOUNT_RESPONSE.P6")}</li>
          </ul>
        </div>

        <Link className={styles["button-link"]} href="/my-account">
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
            {t("SPECIAL_OFFERS/CYBER_WEEK.SIGN_UP_CTA_TEXT")}
          </Button>
        </Link>
      </section>

      <div className={styles.footer}>
        <Image
          alt="Free Shipping"
          src="https://dam.nowoptics.net/transform/f201aeb0-7722-46d9-beeb-98be4eccebc3/1863_Cyber-Week_Online_LTO_FreeShipping_Logo"
          width={64}
          height={64}
        />
        <p>{t("SPECIAL_OFFERS/CYBER_WEEK.FREE_SHIPPING")}</p>
      </div>

      <section className={styles.container}>
        <p className={styles.disclaimer}>
          {t("SPECIAL_OFFERS/CYBER_WEEK.DISCLAIMER")}
        </p>
      </section>
    </>
  );
}
