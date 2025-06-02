import React, { useContext, useEffect } from "react";
import Head from "next/head";
import MainStart from "@/components/static/prescription-renewal/mainStart/MainStart";

const StartPage = () => {

  return (
    <>
      <Head>
        <title>Prescription Renewal </title>
        <meta name="description" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <MainStart />
      </main>
    </>
  );
};

export default StartPage;

export const getServerSideProps = async () => {
  const rxRenewal = true;
  return {
    props: { rxRenewal },
  };
};
