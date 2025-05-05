import Head from "next/head";
import { EyeExam } from "@/components/static/eye-exam";
import FooterPPC from "@/components/static/ppc/ppc-footer";
import { useRouter } from "next/router";
import { useTranslation } from "react-i18next";
import { useGetBrand } from "@/hooks/useGetBrand";
import { BRAND } from "@/constants/common.constants";

const EyeExamPage = (): JSX.Element => {
  const { t } = useTranslation();
  const brand = useGetBrand();
  const brandTitle = brand === BRAND.SO ? "Stanton Optical" : "My Eyelab";
  return (
    <>
      <Head>
        <title>
          {t(`PAGE_TITLE.GET_YOUR_EYES_EXAMINED`).replace(
            "{brand}",
            `${brand === BRAND.SO ? "| " : "- "} ${brandTitle}`
          )}
        </title>
        <meta
          name="description"
          content={t(`EYE_EXAM.META_DESCRIPTION`).replace(
            "{brand}",
            brandTitle
          )}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <main>
        <EyeExam />
      </main>
    </>
  );
};

export default EyeExamPage;

export const getServerSideProps = async () => {
  const eyeExam = true;

  return {
    props: { eyeExam },
  };
};
