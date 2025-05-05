import Head from "next/head";
import React from "react";
import { useTranslation } from 'react-i18next';

function EyeExam() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.EYE_EXAM`)}</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <></>
    </>
  );
}

export default EyeExam;
