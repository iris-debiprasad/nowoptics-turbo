import styles from "./CopyRightFooter.module.scss";
import { BRAND_NAME } from "@/constants/common.constants";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";
import { useContext } from "react";

export default function CopyRight() {
  const { t } = useTranslation();
  const env = useContext(RuntimeVarContext);

  return (
    <div className={styles.ft_copyright}>
      &copy;{" "}
      {t("FOOTER.Copyright")
        .replace("/year/", `${new Date().getFullYear()}`)
        .replace("/brand/", BRAND_NAME.SO)}{" "}
      <Link href="/privacy-policy/">{t("FOOTER.Privacy Policy")}</Link>.
      {env?.NEXT_PUBLIC_RECAPTCHA_ENABLE === "true" && (
        <>
          This site is protected by reCAPTCHA and the{" "}
          <Link href="https://policies.google.com/privacy" target="_blank">
            Google Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="https://policies.google.com/terms" target="_blank">
            Terms of Service
          </Link>{" "}
          apply.
        </>
      )}
    </div>
  );
}
