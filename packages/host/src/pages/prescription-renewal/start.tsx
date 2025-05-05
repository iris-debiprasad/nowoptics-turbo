import React, { useContext, useEffect } from "react";
import Head from "next/head";
import MainStart from "@/components/static/prescription-renewal/mainStart/MainStart";
import { useRouter } from "next/router";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

const StartPage = () => {
  const router = useRouter();
  const env = useContext(RuntimeVarContext);
  useEffect(() => {
    if (env?.NEXT_PUBLIC_RX_RENEWAL_ENABLE === "false") {
      router.push("/");
    }
  }, [env?.NEXT_PUBLIC_RX_RENEWAL_ENABLE]);

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
