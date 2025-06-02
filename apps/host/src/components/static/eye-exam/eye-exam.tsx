import React from "react";
import styles from "./eye-exam.module.scss";
import Image from "next/image";
import Link from "next/link";
import { WhenToBookExamSection } from "./when-to-book-exam";
import { HowToBookExamAnual } from "./how-to-book-exam-anual";
import { EyeExamCta } from "./cta-btn";
import { useTranslation } from "react-i18next";
import { useGetBrand } from "@/hooks/useGetBrand";
import { BRAND } from "@root/host/src/constants/common.constants";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import { TBrand } from "@root/host/src/utils/common.utils";

const IMAGE1 = ImageUrlConstants.EYE_EXAM_PAGE.IMAGE1;

const IMAGE2 = ImageUrlConstants.EYE_EXAM_PAGE.IMAGE2;

export function EyeExam(): JSX.Element {
  const { t } = useTranslation();
  const brand = useGetBrand();
  const brandStyles =
    brand === BRAND.SO ? styles.soContainer : styles.melContainer;

  const brandReplaceCopy = (
    copy: string,
    soReplace: string,
    melReplace: string,
  ) => {
    return copy.replace("{brand}", brand === BRAND.SO ? soReplace : melReplace);
  };

  const assingBrandToCopy = (copy: string): string => {
    return brandReplaceCopy(copy, "Stanton Optical", "My Eyelab");
  };
  return (
    <article className={`${styles.container} ${brandStyles}`}>
      <section className={styles.splitBanner}>
        <div>
          <h1 tabIndex={0} className={styles.title}>
            {t("EYE_EXAM.EASY_AFFORDABLE")}
          </h1>
          <p>{t("EYE_EXAM.PRIORITIZING_YOUR_EYE")}</p>
          <p>
            {assingBrandToCopy(t("EYE_EXAM.AT_STANTON_OPTICAL"))}{" "}
            <Link
              className={styles.link}
              href="https://physicianseyecaregroup.com/"
              rel="noopener noreferrer"
              target="_blank"
            >
              {t("EYE_EXAM.PHYSICIANS_EYECARE_GROUP")} {": "}
            </Link>
            , {t("EYE_EXAM.A_GROUP_OF")}
          </p>
        </div>
        <Image
          src={IMAGE1}
          alt="Easy & Affordable Eye Exams"
          width={564}
          height={390}
        />
      </section>
      <HowToBookExamAnual brand={brand as TBrand} />
      <section className={styles.eyePerks}>
        <h1 tabIndex={0} className={styles.title}>
          {t("EYE_EXAM.THE_EYE_PERKS")}
        </h1>
        <p>{t("EYE_EXAM.EYE_EXAMS")}</p>
        <ol
          className={`list-styless ${styles.numberList} ${styles.showNumber} ${styles.ml1}`}
        >
          <li>
            <b>{t("EYE_EXAM.EARLY_DETECTION")}:</b>{" "}
            {t("EYE_EXAM.EYE_EXAMS_CAN_DETECT")}
          </li>
          <li>
            <b>{t("EYE_EXAM.DETECTION_OF_GENERAL")}:</b>{" "}
            {t("EYE_EXAM.EYE_EXAM_CAN_REVEL")}:
          </li>
          <ul className={`list-styless ${styles.numberSublist} ${styles.ml1}`}>
            <li>{t("EYE_EXAM.DIABETES")}</li>
            <li>{t("EYE_EXAM.HIGH_BLOOD_PRESSURE")}</li>
            <li>{t("EYE_EXAM.HIGH_CHOLESTEROL")}</li>
          </ul>
          <li>
            <b>{t("EYE_EXAM.UPDATING_YOUR_LOOK")}: </b>
            {t("EYE_EXAM.LET_BE_HONEST")}
          </li>
        </ol>
        <div className={styles.shopNow}>
          <EyeExamCta route="/book-eye-exam/">
            {t("EYE_EXAM.CHECK_EXAM_TIMES")}
          </EyeExamCta>
        </div>
        <div className={styles.faq}>
          <p>
            <b>{t("EYE_EXAM.HOW_MUCH_DOES")}</b>
          </p>

          <p>{t("EYE_EXAM.YOUR_COMPREHENSIVE_EYE_EXAM")}</p>

          <p>
            <b>{t("EYE_EXAM.DO_YOU_ACCEPT_INSURANCE")}</b>
          </p>

          <p>{t("EYE_EXAM.WE_ACCEPT_MOST")}</p>
        </div>
      </section>
      <section className={`${styles.whatToExpect} ${styles.grayBg}`}>
        <div className={styles.splitBanner}>
          <Image
            src={IMAGE2}
            alt="Easy & Affordable Eye Exams"
            width={564}
            height={390}
          />
          <div>
            <h1 tabIndex={0} className={styles.title}>
              {t("EYE_EXAM.WHAT_TO_EXPECT")}:{" "}
            </h1>
            <p>
              {assingBrandToCopy(t("EYE_EXAM.YOUR_COMPREHENSIVE_EYE_EXAM_AT"))}{" "}
              <b>{t("EYE_EXAM.THOROUGH_EVALUATION")}</b>{" "}
              {t("EYE_EXAM.BUT_THAT_JUST")}
            </p>
          </div>
        </div>

        <ul className={`${styles.numberList} ${styles.whatToExpectList}`}>
          <li>
            <b>
              {t("EYE_EXAM.STEP")} 1: {t("EYE_EXAM.PRESCREENING")}
            </b>
            <br />
            {t("EYE_EXAM.THIS_QUICK_PROCESS")}
            <ul className={`${styles.numberSublist} ${styles.ml1}`}>
              <li>
                <b>{t("EYE_EXAM.TONOMETRY")}:</b>{" "}
                {t("EYE_EXAM.MEASURE_THE_PRESSURE")}{" "}
              </li>
              <li>
                <b>{t("EYE_EXAM.AUTOREFRACTOR_KERATOMETER")}:</b>{" "}
                {t("EYE_EXAM.HELPS_PROVIDE_A_STARTING")}{" "}
              </li>
              <li>
                <b>{t("EYE_EXAM.RETINAL_IMAGING")}:</b>{" "}
                {t("EYE_EXAM.WE_TAKE_PICTURES_INSIDE")}
              </li>
              <li>
                <b>{t("EYE_EXAM.ANTERIOR_EYE_IMAGING")}:</b>{" "}
                {t("EYE_EXAM.WE_TAKE_PICTURES_FRONT")}
              </li>
            </ul>
          </li>

          <li>
            <b>
              {t("EYE_EXAM.STEP")} 2:{" "}
              {t("EYE_EXAM.ACUITIES_AND_REFRACTION_EXAM")}
            </b>
            <br />
            {t("EYE_EXAM.THE_DOCTOR_TECHNICIAN")}
          </li>
          <li>
            <b>
              {t("EYE_EXAM.STEP")} 3: {t("EYE_EXAM.EYE_HEALTH_EVALUATION")}
            </b>
            <br />
            {t("EYE_EXAM.AN_OPHTHALMOLOGIST")}
          </li>
        </ul>
      </section>
      <section className={styles.children}>
        <div className={styles.childrenBubble}>
          <h2 className={styles.subtitle}>
            {t("EYE_EXAM.CHILDREN’S_EYE_EXAM")}
          </h2>
          <p>{assingBrandToCopy(t("EYE_EXAM.CHILDREN_AS_YOUNG"))}</p>
        </div>
      </section>
      <section className={styles.whatToBring}>
        <h2 tabIndex={0} className={styles.subtitle}>
          {t("EYE_EXAM.WHAT_TO_BRING")}{" "}
        </h2>
        <ul>
          <li>- {t("EYE_EXAM.YOUR_CURRENT_EYEWEAR")} </li>
          <li>- {t("EYE_EXAM.YOUR_CURRENT_PRESCRIPTION")}</li>
          <li>- {t("EYE_EXAM.INSURANCE_CARD")} </li>
          <li>
            - {t("EYE_EXAM.REMEMBER_TO_FILL")}{" "}
            <Link className={styles.link} href={"/my-account/"}>
              {t("EYE_EXAM.MEDICAL_HISTORY")}
            </Link>{" "}
            {t("EYE_EXAM.PRIOR_TO_YOUR_EXAM")}{" "}
          </li>
        </ul>
        <Link className={styles["book-eye-exam-link"]} href="/book-eye-exam">
          <h3>{t("EYE_EXAM.WE_LOOK_FORWARD")}</h3>
        </Link>
      </section>
    </article>
  );
}
