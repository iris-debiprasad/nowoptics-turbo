import React from "react";
import { useTranslation } from "react-i18next";

import styles from "./disclaimer.module.scss";
import CloseIcon from "@mui/icons-material/Close";

/**
 * Disclaimer that will be displayed below CTA, if disclaimer is not provided,
 * will not be displayed
 */
export const Disclaimer = (): JSX.Element => {
    const { t } = useTranslation();
    const [isVisible, setIsVisible] = React.useState<boolean>(false);

    const toggleVisibility = (
        event: React.MouseEvent<HTMLButtonElement, MouseEvent>,
    ): void => {
        event.stopPropagation();
        setIsVisible((prevState) => !prevState);
    };

    const closeDisclaimer = () => setIsVisible(false);

    React.useEffect(() => {
        if (isVisible) window.addEventListener("click", closeDisclaimer);
        else window.removeEventListener("click", closeDisclaimer);
        return () => window.removeEventListener("click", closeDisclaimer);
    }, [isVisible]);

    return (
        <>
            <section className={styles.disclaimer}>
                <button
                    className={styles.disclaimer__toggler}
                    type="button"
                    onClick={toggleVisibility}
                >
                    {t("SAME_DAY_GLASSES.HERO_DISCLAIMER_BUTTON")}
                </button>
            </section>

            {isVisible && (
                // onClick prevents the popup to be closed when clicked (due to propagation until window object, see Effect above)
                <div
                    className={styles.popup}
                    onClick={(event) => event.stopPropagation()}
                >
                    <p className={styles.popup__content}>
                        {t("SAME_DAY_GLASSES.HERO_DISCLAIMER_TEXT")}
                    </p>

                    <button
                        className={styles.popup__close}
                        onClick={toggleVisibility}
                        type="button"
                    >
                        <CloseIcon />
                    </button>
                </div>
            )}
        </>
    );
};

Disclaimer.displayName = "Disclaimer";
