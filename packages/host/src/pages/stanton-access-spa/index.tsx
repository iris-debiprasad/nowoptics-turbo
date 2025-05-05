import { useTranslation } from "react-i18next";
import Head from "next/head";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const StantonAccess = dynamic(
  () => import("@/components/static/stanton-access/index"),
  {
    ssr: true,
  }
);

export default function StantonAccessPage(): React.JSX.Element {
  const { t, i18n } = useTranslation();
  
  useEffect(() => {
    i18n.changeLanguage("de");
  }, []);

  return (
    <>
      <Head>
        <title>{t("STANTON_ACCESS.META.TITLE")}</title>
        <meta
          name="description"
          content={t("STANTON_ACCESS.META.DESCRIPTION")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <StantonAccess />
      </main>
    </>
  );
}