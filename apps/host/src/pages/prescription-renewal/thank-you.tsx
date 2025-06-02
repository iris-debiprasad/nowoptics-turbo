import React from "react";
import Head from "next/head";
import ThankYouPage from "@/components/prescription-rx-renewal/thankYouPage";

const ThankYouPageComp = () => {
  return (
    <>
      <Head>
        <title>Prescription Renewal </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <ThankYouPage />
      </main>
    </>
  );
};

export default ThankYouPageComp;
