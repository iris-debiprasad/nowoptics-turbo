import { ResponsiveBanner } from "@/components/responsive-banner";
import styles from "./what-to-expect.module.scss";
import PrimaryDivider from "@/components/divider/PrimaryDivider";
import WTECheckItem from "./wte-check-item/WTECheckItem";
import Link from "next/link";
import Image from "next/image";
import TriangleIcon from "./icons/TriangleIcon";
import { useTranslation } from "react-i18next";

export default function WhatToExpect(): JSX.Element {
  const { t } = useTranslation();
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  return (
    <>
      <ResponsiveBanner
        mobile={{
          alt: t(`WHAT_TO_EXPECT.WHAT_TO_EXPECT_FROM`),
          src:
            BASE_IMAGE_URL +
            "transform/4125972e-cdbd-47b2-b964-bc6fcd1dee2b/1158_WEB_23_Mobile_WhatToExpect",
        }}
        tabletAndDesktop={{
          alt: t(`WHAT_TO_EXPECT.WHAT_TO_EXPECT_FROM`),
          src:
            BASE_IMAGE_URL +
            "transform/b816ea1a-17b9-4f51-bee1-e97e945eb2e5/1158_WEB_23_Desktop_WhatToExpect",
        }}
      />
      <article className={styles.container}>
        <h1 className="informational-page-title">
          {t(`WHAT_TO_EXPECT.GET_READY_FOR`)}
        </h1>
        <p>{t(`WHAT_TO_EXPECT.DURING_YOUR_APPOINTMENT`)}</p>

        <h2 className={`informational-page-subtitle`}>
          {t(`WHAT_TO_EXPECT.MAKE_SURE_TO`)}
        </h2>

        <ul className="list-styless">
          <WTECheckItem>
            {t(`WHAT_TO_EXPECT.YOUR_CURRENT_EYEWEAR`)}
          </WTECheckItem>

          <WTECheckItem>
            {t(`WHAT_TO_EXPECT.YOUR_CURRENT_PRESCRIPTION`)}
          </WTECheckItem>

          <WTECheckItem>
            {t(`WHAT_TO_EXPECT.INSURANCE_CARD`)}{" "}
            <Link href="/vision-insurance">
              {t(`WHAT_TO_EXPECT.ACCEPTED_INSURANCE_PLANS`)}
            </Link>
          </WTECheckItem>
        </ul>

        <PrimaryDivider />
        <h2 className={`informational-page-subtitle`}>
          {t(`WHAT_TO_EXPECT.HERE_WHAT_TO`)}
        </h2>
        <p>{t(`WHAT_TO_EXPECT.EYE_EXAMS_ARE`)}</p>

        <section className={styles.wteSection}>
          <Image
            src={
              BASE_IMAGE_URL +
              "transform/ecf6e73b-c603-47ad-9c3f-a8bffa3d9e1d/SlitLampExam"
            }
            alt="Slit Lamp eye exam at Stanton Optical"
            title="Slit Lamp eye exam at Stanton Optical"
            className="img"
            width={360}
            height={240}
          />
          <div>
            <p>{t(`WHAT_TO_EXPECT.DIAGONISTIC_TESTING`)}</p>
            <p>{t(`WHAT_TO_EXPECT.ACUITIES_AND_REFRACTION_EXAM`)}</p>
          </div>
        </section>
        <section className={styles.ActivateAccountSection}>
          <p>
            <Link href="/my-account/">
              <strong>{t(`WHAT_TO_EXPECT.ACTIVATE_YOUR`)} </strong>
            </Link>
            {t(`WHAT_TO_EXPECT.AND_YOU_WILL`)}{" "}
            <strong>
              <Link href="/my-account/">
                {t(`WHAT_TO_EXPECT.MEDICAL_HISTORY`)}
              </Link>
            </strong>
            &nbsp;{t(`WHAT_TO_EXPECT.TO_SAVE_YOU`)}
          </p>
          <Link href="/my-account/" className={styles.aaBtn}>
            <span>{t(`WHAT_TO_EXPECT.ACTIVATE_ACCOUNT`)}</span>
            <TriangleIcon />
          </Link>
        </section>
      </article>
    </>
  );
}
