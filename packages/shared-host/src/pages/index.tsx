import { USER_TYPE } from "@/constants/common.constants";
import { HomePageDTO } from "@/types/home.types";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useTranslation } from "react-i18next";

interface HomeProps {
  homePageData: HomePageDTO;
  language: string;
  eyeglasses: any[];
  sunglasses: any[];
  contacts: any[];
}


export default function Home({ homePageData, language, eyeglasses, sunglasses, contacts }: HomeProps) {
  const { t } = useTranslation();


  return (
    <>
      <Head>
        <title>{t("PAGE_TITLE.HOME_PAGE")}</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>

      </div>
    </>
  );
}
