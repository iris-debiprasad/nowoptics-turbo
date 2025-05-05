import Link from "next/link";
import styles from "./StaticFooter.module.scss";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";
import { useContext, useEffect, useState } from "react";

export default function StaticFooter() {
  const env = useContext(RuntimeVarContext);

  const [showRecaptchaMessage, setShowRecaptchaMessage] =
    useState<boolean>(true);


  const handleShowRecaptchaMessage = () => {
    const scrollTop = window.scrollY;
    const windowHeight = window.innerHeight;
    const documentHeight = document.documentElement.scrollHeight;
    const threshold = 20;
    const isReachBottom =
      scrollTop + windowHeight >= documentHeight - threshold;

    if (isReachBottom) {
      setShowRecaptchaMessage(false);
    } else {
      setShowRecaptchaMessage(true);
    }
  };

  useEffect(() => {
    window.addEventListener("scroll", handleShowRecaptchaMessage);
    () => window.removeEventListener("scroll", handleShowRecaptchaMessage);
  }, []);

  return (
    <div
      className={`${styles.st_ft} ${styles.st_ft_associate}`}
    >
      {env?.NEXT_PUBLIC_RECAPTCHA_ENABLE === "true" && (
        <div
          className={`${styles.st_ft_recaptcha_msg} ${showRecaptchaMessage ? styles.st_ft_recaptcha_msg_show : ""}`}
        >
          This site is protected by reCAPTCHA and the Google{" "}
          <Link href="https://policies.google.com/privacy" target="_blank">
            Privacy Policy
          </Link>{" "}
          and{" "}
          <Link href="https://policies.google.com/terms" target="_blank">
            Terms of Service
          </Link>{" "}
          apply.
        </div>
      )}
    </div>
  );
}
