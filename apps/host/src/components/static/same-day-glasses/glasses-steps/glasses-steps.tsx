import Image from "next/image";
import styles from "./glasses-steps.module.scss";
import { GLASSES_STEPS } from "./process.constants";
import { useTranslation } from "react-i18next";

export const GlassesSteps = (): JSX.Element => {
    const translation = useTranslation();

    return (
        <section className={`content-wrapper ${styles.steps}`}>
            {GLASSES_STEPS(translation).map((step) => (
                <article className={styles.step} key={step.title}>
                    <figure>
                        <Image
                            alt={step.image.alt}
                            className="img"
                            width={345}
                            height={280}
                            layout="responsive"
                            src={step.image.src}
                        />
                    </figure>

                    <span className={styles.step__title}>{step.title}</span>
                    <p className={styles.step__description}>{step.description}</p>
                </article>
            ))}
        </section>
    );
};

GlassesSteps.displayName = "GlassesSteps";
