import React from "react";
import Head from "next/head";
import AccesibilityStatement from "@/components/static/accesibilityStatement/AccesibilityStatement";
import { useGetBrand } from "@/hooks/useGetBrand";
import { BRAND_NAME } from "@root/host/src/constants/common.constants";

const AccesibilityPage = () => {
  const brand = useGetBrand();
  return (
    <>
      <Head>
        <title>Eyecare for Everyone - Accessibility Statement - {BRAND_NAME[brand]}</title>
        <meta
          name="description"
          content={`${BRAND_NAME[brand]} offers highly accessible eyecare products, services and experiences online and in-store to all, including people with special abilities. Learn more!`}
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <AccesibilityStatement brand={brand} />
      </main>
    </>
  );
};

export default AccesibilityPage;
