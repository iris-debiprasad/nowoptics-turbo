import React from "react";
import { useTranslation } from "react-i18next";

import { InternalLinkPrimary } from "@/components/internal-link";

import { Disclaimer } from "./disclaimer";
import styles from "./hero.module.scss";

/**
 * Hero component that renders an title, subtitle, call to action and disclaimer, it displays a
 * custom background image for the section
 */
export const Hero = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <section className={styles.hero}>
      <span role="img" aria-label={t("SAME_DAY_GLASSES.HERO_TITLE")} />

      <div className={`content-wrapper ${styles.wrapper}`}>
        <h1 className={styles.hero__title}>
          {t("SAME_DAY_GLASSES.HERO_TITLE")}
        </h1>

        <p className={styles.hero__subtitle}>
          {t("SAME_DAY_GLASSES.HERO_DESCRIPTION")}
        </p>

        <div className={styles.actions}>
          <InternalLinkPrimary
            href="/schedule-exam"
            className={styles.actions__link}
          >
            {t("SAME_DAY_GLASSES.HERO_CTA")}
          </InternalLinkPrimary>

          <Disclaimer />
        </div>
      </div>
    </section>
  );
};

Hero.displayName = "Hero";
