import Image from "next/image";
import React from "react";
import KeyboardArrowRightIcon from "@mui/icons-material/KeyboardArrowRight";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";

import styles from "./page-not-found.module.scss";
import { INTEREST_LINKS } from "./interest-links.constants";
import { InterestLinkItem } from "./interest-link-item";
import { useGetBrand } from "@/hooks/useGetBrand";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import { BRAND } from "@/constants/common.constants";

const BRAND_IMAGE = ImageUrlConstants.PAGE_NOT_FOUND;

export const PageNotFound = (): JSX.Element => {
  const [routerHasHistory, setRouterHasHistory] = React.useState<
    boolean | null
  >(null);
  const translation = useTranslation();
  const { t } = translation;
  const router = useRouter();
  const brand = useGetBrand();

  React.useEffect(() => {
    setRouterHasHistory(window.history.length > 1);
    return () => setRouterHasHistory(null);
  }, []);

  const goToPreviousPage = () => routerHasHistory && router.back();

  // ==== Render

  const NavigationLinks: JSX.Element[] = INTEREST_LINKS(translation).map(
    (link) => <InterestLinkItem key={link.key} {...{ link }} />
  );

  return (
    <>
      {brand === BRAND.SO && (
        <main className={styles.soMain}>
          <div className={styles.container}>
            {routerHasHistory && (
              <button
                className={styles["go-back"]}
                type="button"
                onClick={goToPreviousPage}
              >
                <KeyboardArrowRightIcon />
                {t(`PAGE_NOT_FOUND.GO_BACK`)}
              </button>
            )}

            <section className={styles["not-found-container"]}>
              <article className={styles.content}>
                <h1
                  className={`informational-page-subtitle ${styles.content__title}`}
                >
                  <span className={styles.highlight}>
                    {t(`PAGE_NOT_FOUND.OOPS`)}
                  </span>{" "}
                  {t(`PAGE_NOT_FOUND.SEEMS_LIKE_YOUR`)}
                </h1>

                <h2 className={styles.content__subtitle}>
                  {t(`PAGE_NOT_FOUND.WE_ARE_SORRY`)}{" "}
                  <span className={styles.highlight}>
                    {t(`PAGE_NOT_FOUND.SEEMS`)}
                  </span>{" "}
                  {t(`PAGE_NOT_FOUND.THE_PAGE_YOU`)}
                </h2>

                <h3 className={styles.content__options}>
                  {t(`PAGE_NOT_FOUND.HERE_ARE_SOME`)}{" "}
                  <span className={styles.highlight}>
                    {t(`PAGE_NOT_FOUND.SIGHT`)}
                  </span>
                </h3>

                <nav className={styles.navigation}>{NavigationLinks}</nav>

                <h4 className={styles["content__more-options"]}>
                  {t(`PAGE_NOT_FOUND.NEED_MORE`)}
                </h4>
              </article>

              <figure className={styles.penguin}>
                <Image
                  className="img"
                  width={501}
                  height={501}
                  layout="responsive"
                  alt="404 - Page not found"
                  src={BRAND_IMAGE.SO_IMAGE}
                />
              </figure>
            </section>
          </div>
        </main>
      )}
    </>
  );
};

PageNotFound.displayName = "PageNotFound";
