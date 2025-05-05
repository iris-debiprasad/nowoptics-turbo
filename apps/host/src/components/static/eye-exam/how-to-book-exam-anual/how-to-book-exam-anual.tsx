import React from "react";
import styles from "./how-to-book-exam-anual.module.scss";
import generalStyles from "../eye-exam.module.scss";
import Image from "next/image";
import { EyeExamCta } from "../cta-btn";
import { useTranslation } from "react-i18next";
import Link from "next/link";
import { TBrand } from "@/utils/common.utils";
import {
  BRAND,
  SO_DEFAULT_STORE_CONTACT_NUMBER,
} from "@/constants/common.constants";
import { MEL_DEFAULT_STORE_CONTACT_NUMBER } from "@/constants/common.constants";
import { unformatPhoneNumber } from "@/utils/common.utils";
import { ImageUrlConstants } from "@/constants/image.url.constants";

export function HowToBookExamAnual({ brand }: { brand: TBrand }): JSX.Element {
  const { t } = useTranslation();

  const IMAGES = ImageUrlConstants.EYE_EXAM_PAGE;

  const BRANDED_IMAGES = brand === BRAND.SO ? IMAGES.SO : IMAGES.MEL;

  const COMPUTER_IMAGE = BRANDED_IMAGES.COMPUTER_IMAGE;
  const PHONE_IMAGE = BRANDED_IMAGES.PHONE_IMAGE;
  const SHOP_IMAGE = BRANDED_IMAGES.SHOP_IMAGE;

  const CONTACT_PHONE_NUMBER =
    brand === BRAND.SO
      ? SO_DEFAULT_STORE_CONTACT_NUMBER
      : MEL_DEFAULT_STORE_CONTACT_NUMBER;

  return (
    <section className={`${styles.anualExam} ${generalStyles.grayBg}`}>
      <h2 tabIndex={0} className={generalStyles.subtitle}>
        {t("EYE_EXAM.WHEN_AND_HOW")} <br /> {t("EYE_EXAM.BOOK_YOUR_EYE_EXAM")}
      </h2>
      <div className={styles.examItems}>
        <div className={styles.examItem}>
          <div className={styles.icon}>
            <Image
              src={COMPUTER_IMAGE}
              width={44}
              height={40}
              alt="Computer-Image"
            />
          </div>
          <p className={generalStyles.contentText}>
            <b>{t("EYE_EXAM.ONLINE")}:</b> {t("EYE_EXAM.CHOOSE_THE_LOCATION")}
          </p>
        </div>

        <div className={styles.examItem}>
          <div className={styles.icon}>
            <Image src={PHONE_IMAGE} width={38} height={38} alt="Phone-Image" />
          </div>
          <p className={generalStyles.contentText}>
            <b>{t("EYE_EXAM.CALL_US")}:</b>{" "}
            {t("EYE_EXAM.SPEAK_TO_OUR_CUSTOMER1")}{" "}
            <Link
              className={styles.externalLink}
              href={`tel:${unformatPhoneNumber(CONTACT_PHONE_NUMBER)}`}
            >
              {CONTACT_PHONE_NUMBER}
            </Link>{" "}
            {t("EYE_EXAM.SPEAK_TO_OUR_CUSTOMER2")}
          </p>
        </div>
        <div className={styles.examItem}>
          <div className={styles.icon}>
            <Image src={SHOP_IMAGE} width={52} height={45} alt="Phone-Image" />
          </div>
          <p className={generalStyles.contentText}>
            <b>{t("EYE_EXAM.WALK_INN")}:</b> {t("EYE_EXAM.RUN_IN_BETWEEN")}
          </p>
        </div>
      </div>
      <EyeExamCta route="/book-eye-exam/">
        {t("EYE_EXAM.FIND_YOUR_STORE")}
      </EyeExamCta>
    </section>
  );
}
