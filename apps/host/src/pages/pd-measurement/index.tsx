import { FramesCarouselProps, getFrames } from "@/components/static/bopis";
import PupillaryDistance from "@/components/static/pupillary-distance/PupillaryDistance";
import { BRAND } from "@/constants/common.constants";
import { checkBrand } from "@/utils/common.utils";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

interface Props extends FramesCarouselProps {}

const Index: NextPage<Props> = ({ frames }): JSX.Element => {
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
            ? "Measure your Pupillary Distance and Buy Glasses Online - My Eyelab"
            : t(`PAGE_TITLE.PD_MEASUREMENT`)}
        </title>
        <meta
          name="description"
          content={
            brand === BRAND.MEL
              ? "If you want to order glasses online from My Eyelab you will need to know your Pupillary Distance. We will show you how to measure it here!"
              : "If you want to order glasses online from Stanton Optical you will need to know your Pupillary Distance. We will show you how to measure it here!"
          }
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <PupillaryDistance {...{ frames }} />
      </main>
    </>
  );
};

export const getServerSideProps = (async () => {
  const frames = await getFrames();
  return { props: { frames } };
}) satisfies GetServerSideProps<Props>;

export default Index;
