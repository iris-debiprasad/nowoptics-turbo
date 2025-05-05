import { GetStaticProps, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import { Hero } from "@/components/static/same-day-glasses/hero";
import { OurLab } from "@/components/static/same-day-glasses/our-lab";
import { GlassesSteps } from "@/components/static/same-day-glasses/glasses-steps";
import { ReviewsSlider } from "@/components/static/same-day-glasses/reviews-slider";
import { checkBrandBaseURL } from "@/utils/common.utils";
import { BRAND } from "@/constants/common.constants";

const SameDayGlassesPage: NextPage = (): JSX.Element => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("SAME_DAY_GLASSES.METATITLE")}</title>
        <meta
          name="description"
          content={t("SAME_DAY_GLASSES.METADESCRIPTION")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <Hero />
        <OurLab />
        <GlassesSteps />
        <ReviewsSlider />
      </main>
    </>
  );
};

export default SameDayGlassesPage;

export const getStaticProps = (() => {
  const brand = checkBrandBaseURL();
  if (brand === BRAND.MEL) return { notFound: true };
  return { props: {} };
}) satisfies GetStaticProps;
