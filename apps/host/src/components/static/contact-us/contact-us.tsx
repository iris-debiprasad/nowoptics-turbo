import { ResponsiveBanner } from "@/components/responsive-banner";

import Link from "next/link";
import styles from "./contact-us.module.scss";

import { SO_DEFAULT_STORE_CONTACT_NUMBER } from "../../../constants/common.constants";
import { useTranslation } from "react-i18next";

// todo : need to change the content of the banners according to the
const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
const DESKTOP_BANNER: string =
  BASE_IMAGE_URL + "m/3b7dbbc354b121e7/original/CONTACT-US_mel_1366X330.jpg";
const MOBILE_BANNER: string =
  BASE_IMAGE_URL + "m/12c0ffa6599b3377/original/CONTACT-US_mel_750X400.jpg";

const ContactUs = (): JSX.Element => {
  const { t } = useTranslation();
  return (
    <>
      <ResponsiveBanner
        mobile={{
          alt: "Contact Us",
          src: `${MOBILE_BANNER}`,
        }}
        tabletAndDesktop={{
          alt: `Contact Us`,
          src: `${DESKTOP_BANNER}`,
        }}
      />

      <article className={styles.container}>
        <h1 className="informational-page-title">
          {t("CONTACT_US.CUSTOMER_SUPPORT")}
        </h1>

        <p>{t("CONTACT_US.WE_CARE")}</p>

        <p>
          {t("CONTACT_US.CALL_US")}{" "}
          <a
            href={`tel:${SO_DEFAULT_STORE_CONTACT_NUMBER.replace(
              /[() -]/g,
              ""
            )}`}
          >
            {SO_DEFAULT_STORE_CONTACT_NUMBER}
          </a>
          .
        </p>

        <p>
          {t("CONTACT_US.HAVE_A_QUICK")}{" "}
          <Link target="_blank" href={`/faq`}>
            {t("CONTACT_US.FAQ")}
          </Link>{" "}
          {t("CONTACT_US.PAGE")}
        </p>
        <p>
          {t("CONTACT_US.WANT_TO_TRACK")}{" "}
          <Link target="_blank" href={`/order-status`}>
            {t("CONTACT_US.ORDER_STATUS")}
          </Link>{" "}
          {t("CONTACT_US.TOOL")}
        </p>
      </article>
    </>
  );
};

export default ContactUs;
