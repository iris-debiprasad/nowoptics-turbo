import AboutUs from "@/components/static/about_us/AboutUs";
import { BRAND } from "@root/host/src/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const Index = () => {
  const { t } = useTranslation();
  const brand = useGetBrand();
  return (
    <>
      <Head>
        <title>
          {brand === BRAND.MEL
            ? "About Us - My Eyelab"
            : t(`PAGE_TITLE.ABOUT_US`)}
        </title>
        <meta
          name="description"
          content="We strive to bring value to the communities in which we serve by leading our business with integrity and providing a personalized customer experience."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <AboutUs />
      </main>
    </>
  );
};

export default Index;
