import HomeSkeleton from "@/components/skeleton_loader/HomeSkeleton";
import { USER_TYPE } from "@/constants/common.constants";
import { getProducts, GetSOHomePageData } from "@/service/common.service";
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

const HomeComponent = dynamic(() => import("@/components/home/index"), {
  ssr: true,
  loading: () => <HomeSkeleton />,
});

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

        <HomeComponent
          homePageData={homePageData}
          incomingLang={language}
          eyeglasses={eyeglasses}
          sunglasses={sunglasses}
          contacts={contacts}
        />
      </div>
    </>
  );
}
export const getServerSideProps: GetServerSideProps = async (context) => {
  const session = await getToken({
    req: context.req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  const userType = ((session?.user as any)?.authData as any)?.userType;
  const cookie = context.req.cookies;
  const language = userType === USER_TYPE.ASSOCIATE ? 'en' : (cookie.language || "en");
  let homePageData = null;
  let apiFailed = false;
  let eyeglasses = [];
  let sunglasses = [];
  let contacts = [];

  try {
    const res = await GetSOHomePageData(language);
    homePageData = res.data.Result;
  } catch (err) {
    homePageData = {};
    apiFailed = true;
  }

  try {
    let products = await getProducts(1, 4, true, 'vHasHisResImage:true', true, `categoryPath:"Glasses>Eyeglasses"`);
    eyeglasses = products?.data?.response?.products || [];
  } catch (err) {
    eyeglasses = [];
    apiFailed = true;
  }

  try {
    let products = await getProducts(1, 4, true, 'vHasHisResImage:true', true, `categoryPath:"Glasses>Sunglasses"`);
    sunglasses = products?.data?.response?.products || [];
  } catch (err) {
    sunglasses = [];
    apiFailed = true;
  }

  try {
    let products = await getProducts(1, 4, true, "wear_frequency:*");
    contacts = products?.data?.response?.products || [];
  } catch (err) {
    contacts = [];
    apiFailed = true;
  }

  return { props: { homePageData, apiFailed, language, eyeglasses, sunglasses, contacts } };
};
