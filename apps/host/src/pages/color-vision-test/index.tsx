import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { ColorVisionTest } from "@/components/static/color-vision-test";
import { useEffect, useState } from "react";
import { checkBrand } from "@root/host/src/utils/common.utils";
import { BRAND } from "@root/host/src/constants/common.constants";

const ColorVisionTestPage: NextPage = (): JSX.Element => {
  const { t } = useTranslation();
  const [brand, setBrand] = useState<string>("");
  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrand(checkBrand());
    }
  }, []);
  return (
    <>
      <Head>
        <title>
          {brand === BRAND.MEL
            ? "Take our Free Color Blind Test - My Eyelab"
            : t(`PAGE_TITLE.COLOR_VISION_TEST`)}
        </title>
        <meta
          name="description"
          content="Check out our color blindness online test to get insights about your vision's health. It's fast and easy, take the test now!"
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <ColorVisionTest />
      </main>
    </>
  );
};

export default ColorVisionTestPage;
