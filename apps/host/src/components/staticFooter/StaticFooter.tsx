import Link from "next/link";
import Image from "next/image";
import styles from "./StaticFooter.module.scss";
import { STATIC_FOOTER } from "@/constants/FooterConstants";
import { useTranslation } from "react-i18next";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";
import { useContext, useEffect, useState } from "react";
import useIsAssociate from "@/hooks/useIsAssociate";

export default function StaticFooter() {
  const { t } = useTranslation();
  const env = useContext(RuntimeVarContext);

  const [showRecaptchaMessage, setShowRecaptchaMessage] =
    useState<boolean>(true);

  const isAssociateView = useIsAssociate();

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
      className={`${styles.st_ft} ${isAssociateView ? styles.st_ft_associate : ""}`}
    >
      {!isAssociateView && (
        <>
          {STATIC_FOOTER.map((item) => (
            <Link className={styles.st_ft_item} key={item.id} href={item.link}>
              <Image src={item.img} width={30} height={30} alt={item.title} />
              <div>{t(`STATIC_FOOTER.${item.title}`)}</div>
            </Link>
          ))}
        </>
      )}
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
