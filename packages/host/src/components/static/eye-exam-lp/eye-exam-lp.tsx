import React from "react";
import Image from "next/image";
import styles from "./eye-exam-lp.module.scss";
import Link from "next/link";
import { SO_DEFAULT_STORE_SUPPORT_NUMBER } from "@/constants/common.constants";
import { unformatPhoneNumber } from "@/utils/common.utils";
import { TelephoneNumber } from "@/components/telephone-number";
import { useTranslation } from "react-i18next";

export const EyeExamLP = (): JSX.Element => {
  const { t } = useTranslation();
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;

  return (
    <>
      <Image
        alt="Comprehensive Eye Exam: Fast, Easy & Affordable."
        className={`${styles.banner} ${styles["banner--desktop"]}`}
        height={0}
        src={
          BASE_IMAGE_URL +
          "transform/467244e2-9564-46cd-ad5c-fa90e8232cec/1158_WEB_23_Desktop_EyeExam"
        }
        width={0}
      />

      <Image
        alt="Comprehensive Eye Exam: Fast, Easy & Affordable."
        className={`${styles.banner} ${styles["banner--mobile"]}`}
        height={0}
        src={
          BASE_IMAGE_URL +
          "transform/aeb22222-bdb5-4c85-9821-af7d71a423cc/1158_WEB_23_Mobile_EyeExam"
        }
        width={0}
      />

      <article className={styles.container}>
        <h1 className="informational-page-title">
          {t("EYE_EXAM_LP.YOUR_EYE_EXAM")}
        </h1>
        <p>{t("EYE_EXAM_LP.MANY_PEOPLE")}</p>
        <p>{t("EYE_EXAM_LP.EYE_EXAMS")}</p>
        <p>{t("EYE_EXAM_LP.AT_STANTON_OPTICAL")}</p>
        <p>
          <strong>{t("EYE_EXAM_LP.EASY_TO_SCHEDULE")}</strong>
          {t("EYE_EXAM_LP.YOU_CAN_BOOK_YOUR_APPOINTMENT")}{" "}
          <TelephoneNumber telephone={SO_DEFAULT_STORE_SUPPORT_NUMBER} />
          {t("EYE_EXAM_LP.OR_IN_STORE")}{" "}
          <Link target="_blank" href="/my-account/my-appointments">
            {t("EYE_EXAM_LP.CREATING_YOUR_ACCOUNT")}
          </Link>{" "}
          {t("EYE_EXAM_LP.OR")} {""}
          <Link target="_blank" href="/my-account/my-appointments">
            {t("EYE_EXAM_LP.LOGGING_IN")}
          </Link>
          {t("EYE_EXAM_LP.CREATING_YOUR_ACCOUNT_TAKE")}{" "}
          <Link target="_blank" href="/my-account">
            {t("EYE_EXAM_LP.ACCESS_MY_ACCOUNT_NOW")}
          </Link>
          .
        </p>
        <p>
          <strong>{t("EYE_EXAM_LP.WALK_IN_AVAILABLE")}</strong>
          {t("EYE_EXAM_LP.IF_YOU_NEED")}{" "}
          <Link target="_blank" href="/schedule-exam">
            {t("EYE_EXAM_LP.FIND_YOUR_NEAREST_STORE_NOW")}
          </Link>
          .
        </p>
        <p>
          <strong>{t("EYE_EXAM_LP.AFFORDABLE")}</strong>
          {"EYE_EXAM_LP.YOUR_EYE_EXAM_IS"}
        </p>
        <p>{t("EYE_EXAM_LP.WE_ACCEPT_MOST")}</p>
        <Link className={styles["schedule-exam-link"]} href="/schedule-exam">
          {t("EYE_EXAM_LP.SCHEDULE_YOUR_EXAM_TODAY")}
        </Link>
        <h2 className="informational-page-subtitle">
          {t("EYE_EXAM_LP.HERE_WHAT_YOU")}
        </h2>
        <p>{t("EYE_EXAM_LP.A_COMPLETE_EYE_EXAM")}</p>
        <p>
          {t("EYE_EXAM_LP.WE_OFFER_EYE_EXAM")}{" "}
          <Link target="_blank" href="/catalog/eyeglasses">
            {t("EYE_EXAM_LP.EYEGLASES")}
          </Link>{" "}
          {t("EYE_EXAM_LP.AND")}{" "}
          <Link target="_blank" href="/catalog/contacts">
            {t("EYE_EXAM_LP.CONTACT_LENSES")}
          </Link>
          {t("EYE_EXAM_LP.PLUS")}
        </p>
        <h3 className="informational-page-headline">
          {t("EYE_EXAM_LP.WHAT_TO_EXPECT")}
        </h3>
        <p>
          <strong>{t("EYE_EXAM_LP.FULL_PATIENT_CASE_HISTORY")}</strong>
        </p>
        <p>
          {t("EYE_EXAM_LP.WHEN_YOU_CREATE_YOUR")}{" "}
          <Link target="_blank" href="/my-account/exam-intake-form">
            {t("EYE_EXAM_LP.ACCOUNT_ONLINE")}
          </Link>
          {t("EYE_EXAM_LP.YOU_CAN_EASILY")}
          {""}
          <Link target="_blank" href="/my-account/exam-intake-form">
            {t("EYE_EXAM_LP.PATIENT_OPTICAL")}
          </Link>{" "}
          {t("EYE_EXAM_LP.AND")}{" "}
          <Link target="_blank" href="/my-account/exam-intake-form">
            {t("EYE_EXAM_LP.MEDICAL_HISTORY")}
          </Link>{" "}
          {t("EYE_EXAM_LP.IN_THE_CONVENIENCE")}{" "}
          <Link target="_blank" href="/my-account">
            {t("EYE_EXAM_LP.CLICK_HERE")}
          </Link>{" "}
          {t("EYE_EXAM_LP.TO_CREATE_YOUR_ACCOUNT")}
        </p>
        <p>
          <strong>{t("EYE_EXAM_LP.PRESCREENING")}</strong>
        </p>
        <p>{t("EYE_EXAM_LP.THE_DOCTOR")} </p>
        <p>{t("EYE_EXAM_LP.THE_FOLLOWING_TESTS")}</p>

        <ul>
          <li>{t("EYE_EXAM_LP.AUTOREFRACTION")}</li>
          <li>{t("EYE_EXAM_LP.KERATOMETRY")}</li>
          <li>{t("EYE_EXAM_LP.TONOMETRY")}</li>
          <li>{t("EYE_EXAM_LP.RETINAL_EVALUATION")}</li>
          <li>{t("EYE_EXAM_LP.VISUAL_FIELDS")}</li>
        </ul>

        <p>{t("EYE_EXAM_LP.OUR_TECHNICIAN")} </p>

        <p>
          <strong>{t("EYE_EXAM_LP.SLIT_LAMP_EVALUATION")}</strong>
        </p>

        <p>{t("EYE_EXAM_LP.ADMINISTERED_BY_THE")} </p>

        <p>
          <strong>{t("EYE_EXAM_LP.RECEIVE_PRESCRIPTION")}</strong>
        </p>

        <p>{t("EYE_EXAM_LP.THE_OPTHALMOLOGIST")}</p>

        <h3 className="informational-page-headline">
          {t("EYE_EXAM_LP.WHAT_TO_BRING_WITH_YOU")}
        </h3>

        <ul>
          <li>{t("EYE_EXAM_LP.YOUR_CURRENT_EYEWEAR")}</li>
          <li>{t("EYE_EXAM_LP.Your current prescription")}</li>
          <li>
            {t("EYE_EXAM_LP.INSURANCE_CARD")}{" "}
            <Link target="_blank" href="/vision-insurance">
              {t("EYE_EXAM_LP.ACCEPTEED_INSURANCE_PLANS")}
            </Link>
          </li>
          <li>{t("EYE_EXAM_LP.YOUR_COVID_SATEFTY_MASK")}</li>
          <li>
            {t("EYE_EXAM_LP.REMEMBER_TO_FILL")}{" "}
            <Link target="_blank" href="/my-account/exam-intake-form">
              {t("EYE_EXAM_LP.MEDICAL_HISTORY")}
            </Link>{" "}
            {t("EYE_EXAM_LP.PRIOR_TO_YOUR_EXAM_VISIT")}
          </li>
        </ul>

        <p>{t("EYE_EXAM_LP.THE_INDEPENDANT")} </p>
      </article>
    </>
  );
};
