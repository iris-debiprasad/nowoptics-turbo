import { InternalLinkPrimary } from "@/components/internal-link";
import { PlayVideoOnClick } from "./play-video-on-click";
import styles from "./our-lab.module.scss";

export const OurLab = (): JSX.Element => (
    <section className={`content-wrapper ${styles.lab}`}>
        <div className={styles["video-container"]}>
            <h2
                className={`${styles.content__title} ${styles["content__title--mobile"]}`}
            >
                Take a peek inside our lab
            </h2>

            <PlayVideoOnClick />
        </div>

        <div className={styles.content}>
            <h2
                className={`${styles.content__title} ${styles["content__title--desktop"]}`}
            >
                Take a peek inside our lab
            </h2>

            <p className={styles.content__description}>
                Our trained lab technicians use quality, automated technology to make
                your single-vision glasses quickly and efficiently.
            </p>

            <InternalLinkPrimary
                href="/book-eye-exam"
                className={styles.content__cta}
            >
                Visit Us
            </InternalLinkPrimary>
        </div>
    </section>
);

OurLab.displayName = "OurLab";
