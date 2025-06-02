import Head from "next/head";
import type { NextPage } from "next";
import { useTranslation } from "react-i18next";

import { PageNotFound } from "@/components/static/page-not-found";
import { useGetBrand } from "@/hooks/useGetBrand";
import { BRAND } from "@root/host/src/constants/common.constants";

const PageNotFound404: NextPage = (): JSX.Element => {
  const { t } = useTranslation();
  const brand = useGetBrand();
  return (
    <>
      <Head>
        <title>
          {brand === BRAND.SO
            ? t(`PAGE_TITLE.PAGE_NOT_FOUND`)
            : "Page Not Found - My Eyelab"}
        </title>
        <meta
          name="description"
          content="Oops! Seems like your path to clear vision got a bit foggy"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <PageNotFound />
    </>
  );
};

export default PageNotFound404;
