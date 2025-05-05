import LensSelection from "@/components/static/lens-selection/LensSelection";
import { BRAND } from "@/constants/common.constants";
import { checkBrand } from "@/utils/common.utils";
import Head from "next/head";
import React from "react";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const [brand, setBrand] = React.useState("");

  React.useEffect(() => {
    if (typeof window !== "undefined") {
      setBrand(checkBrand());
    }
  }, []);
  return (
    <>
      <Head>
        <title>{brand == BRAND.MEL ? t("PAGE_TITLE.MEL_LENSES_THAT_SUIT_YOU") : t("PAGE_TITLE.LENSES_THAT_SUIT_YOU")}</title>
        <meta
          name="description"
          content="With so many choices in lenses, it can be overwhelming to understand all the options. We have made it easy to discover the benefits of each. Click here!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <LensSelection brand={brand} />
      </main>
    </>
  );
};

export default Index;
