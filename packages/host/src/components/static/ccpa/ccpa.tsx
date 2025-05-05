import Link from "next/link";
import React from "react";
import css from "./ccpa.module.scss";
import { CcpaBlueprintForm } from "./CcpaBlueprintForm/CcpaBlueprintForm";
import { useTranslation } from "react-i18next";

export default function Ccpa() {
  const { t } = useTranslation();
  const [showSuccess, setShowSuccess] = React.useState(false);

  return (
    <>
      {!showSuccess && (
        <article className={css.container}>
          <h1 className="informational-page-title header-title">
            {t("CCPA.YOUR_PERSONAL_INFORMATION")}
          </h1>

          <p>
            {t("CCPA.WE_COLLECT_AND")}{" "}
            <Link className={css.link} href="/privacy-policy" target="_blank">
              {t("CCPA.PRIVACY_POLICY")}
            </Link>{" "}
            {t("CCPA.FOR_MORE_DETAILS")}
          </p>

          <CcpaBlueprintForm updateSuccess={setShowSuccess} />
          <p>
            <Link className={css.link} href="/privacy-policy" target="_blank">
              {t("CCPA.VIEW_THE_PRIVACY_POLICY")}
            </Link>
          </p>
        </article>
      )}
      {showSuccess && (
        <div className={css.successCcpaMessage}>
          <div className={css.circleContainer}>
            <div className={css.circle}>
              <div className={css.checkmark}></div>
            </div>
          </div>
          <h1>Request Submitted</h1>
          <p>
            Thanks for your submission. We’re currently verifying your
            information and will send you an email with next steps.
          </p>
        </div>
      )}
    </>
  );
}
