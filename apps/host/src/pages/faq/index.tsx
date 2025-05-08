import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import { FAQLP, FaqHeadMarkups } from "@/components/static/faq-lp";
import React from "react";
import { BRAND } from "@root/host/src/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";

const FAQPage: NextPage = (): JSX.Element => {
  const { t } = useTranslation();
  const brand = useGetBrand();

  return (
    <>
      <Head>
        <title>{brand == BRAND.MEL ? t("FAQ.META.MEL_TITLE") : t("FAQ.META.TITLE")}</title>
        <meta name="description" content={t("FAQ.META.DESCRIPTION")} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

        <script
          dangerouslySetInnerHTML={{ __html: FaqHeadMarkups }}
          type="application/ld+json"
        />
      </Head>

      <main>
        <FAQLP brand={brand as keyof typeof BRAND} />
      </main>
    </>
  );
};

export default FAQPage;
