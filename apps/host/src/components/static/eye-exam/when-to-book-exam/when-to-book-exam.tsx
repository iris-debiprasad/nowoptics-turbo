import React from "react";
import styles from "./when-to-book-exam.module.scss";
import Image from "next/image";
import generalStyles from "../eye-exam.module.scss";
import { EyeExamCta } from "../cta-btn";
import { useTranslation } from "react-i18next";

const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const CHECK_ICON =
  BASE_IMAGE_URL +
  "transform/98a808bc-dcbd-4d58-89e3-26715bb9855e/check-icon-iris";

export function WhenToBookExamSection(): JSX.Element {
  const { t } = useTranslation();
  const renderCheck = (): JSX.Element => {
    return <Image width={22} height={20} src={CHECK_ICON} alt="check" />;
  };

  return (
    <section className={styles.howToBookExam}>
      <h2 className={generalStyles.subtitle}>
        {t("EYE_EXAM.WHEN_AND_HOW")}
        <br /> {t("EYE_EXAM.BOOK_YOUR_EYE_EXAM")}
      </h2>
      <table className={styles.checkTable}>
        <thead>
          <tr className={generalStyles.contentText}>
            <th></th>
            <th>{t("EYE_EXAM.BOOK_ONLINE")}</th>
            <th>{t("EYE_EXAM.CALL_US")}</th>
            <th>{t("EYE_EXAM.WALK_IN")}</th>
          </tr>
        </thead>
        <tbody className={generalStyles.contentText}>
          <tr>
            <td>{t("EYE_EXAM.PRESCRIPTION_RECENTLY_EXPIRED")} </td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
          </tr>
          <tr>
            <td>{t("EYE_EXAM.VISION_HAS_CHANGED")}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
          </tr>
          <tr>
            <td>{t("EYE_EXAM.EYE_HEALTH_CONCERN")}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
          </tr>
          <tr>
            <td>{t("EYE_EXAM.NEVER_WORN_GLASSES_BEFORE")} </td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
          </tr>
          <tr>
            <td>{t("EYE_EXAM.ONLY_AVAILABLE")} </td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td className={styles.centerCell}>{renderCheck()}</td>
            <td></td>
          </tr>
          <tr>
            <td>{t("EYE_EXAM.HAVE_VERY_LITTLE")} </td>
            <td></td>
            <td></td>
            <td className={styles.centerCell}>{renderCheck()}</td>
          </tr>
        </tbody>
      </table>
      <EyeExamCta route="/schedule-exam/">
        {t("EYE_EXAM.FIND_YOUR_STORE")}
      </EyeExamCta>
    </section>
  );
}
