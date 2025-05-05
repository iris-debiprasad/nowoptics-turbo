import dynamic from "next/dynamic";
import Head from "next/head";
import { useTranslation } from "react-i18next";

const SpecialOffersComponent = dynamic(
  () => import("@/components/static/special-offers/specialOffers"),
  {
    ssr: true,
  }
);

const Index = () => {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.SPECIAL_OFFERS`)}</title>
        <meta
          name="description"
          content="We are one of the America's best glasses & contacts providers. Grab exciting special offers on glasses, contacts, and eye exams in-store and online. Find out more."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <SpecialOffersComponent />
      </main>
    </>
  );
};

export default Index;
