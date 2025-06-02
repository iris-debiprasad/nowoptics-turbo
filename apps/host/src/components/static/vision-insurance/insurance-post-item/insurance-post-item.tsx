import Image from "next/image";
import Link from "next/link";
import { useTranslation } from 'react-i18next';

import styles from "./insurance-post-item.module.scss";

export interface Props {
  content: string;
  goTo?: string;
  image: { alt: string; src: string };
  title: string;
}

export const InsurancePostItem = ({
  content,
  goTo,
  image,
  title,
}: Props): JSX.Element => {
  const { t } = useTranslation();
  const PostItem: JSX.Element = (
    <article {...(!goTo && {"aria-label":image.alt})} className={styles.article} tabIndex={goTo ? -1 : 0}>
      <figure className={styles.article__img}>
        <Image
          alt={image.alt}
          className={`img`}
          width={588}
          height={255}
          src={image.src}
        />
      </figure>

      <div>
        <h3 className={styles.article__title}>{t(`VISION_INSURANCE.${title}`)}</h3>
        <p className={styles.article__content}>{t(`VISION_INSURANCE.${content}`)}</p>
      </div>
    </article>
  );

  return goTo ? (
    <Link aria-label={image.alt} href={goTo} target="_blank" rel="nooneper noreferrer">
      {PostItem}
    </Link>
  ) : (
    PostItem
  );
};
