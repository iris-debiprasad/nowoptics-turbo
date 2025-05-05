import HomeSkeleton from "@/components/skeleton_loader/HomeSkeleton";
import { BRAND, USER_TYPE } from "@/constants/common.constants";
import { getProducts, GetSOHomePageData } from "@/service/common.service";
import { HomePageDTO } from "@/types/home.types";
import { GetServerSideProps } from "next";
import { getToken } from "next-auth/jwt";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useTranslation } from "react-i18next";

interface HomeProps {
  homePageData: HomePageDTO | undefined;
  apiFailed: boolean;
  language: string;
  stockUpFrameData: any[];
  frameSliderData: any[]
}

const HomeComponent = dynamic(() => import("@/components/home/index"), {
  ssr: true,
  loading: () => <HomeSkeleton />,
});

export default function Home({ homePageData, apiFailed, language, stockUpFrameData, frameSliderData }: HomeProps) {
  const { t, i18n } = useTranslation();


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
          brand={BRAND.SO}
          homePageData={homePageData}
          incomingLang={language}
          stockUpFrameData={stockUpFrameData}
          frameSliderData={frameSliderData}
        />
      </div>
    </>
  );
}
// TODO: We can use this if needed in future
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
  let stockUpFrameData: any[];
  let frameSliderData: any[];

  try {
    const res = await GetSOHomePageData(language);
    homePageData = res.data.Result;
  } catch (err) {
    homePageData = {};
    apiFailed = true;
  }

  //Get Frame data for stockup section home page

  try {
    let resp = await getProducts(1, 10, true, "wear_frequency:*");
    stockUpFrameData = resp?.data?.response?.products
  } catch (err) {
    stockUpFrameData = []
  }

  //Get Frame data for Frame section home page

  try {
    let resp = await getProducts(1, 10, true, 'vHasHisResImage:true', true);
    frameSliderData = resp?.data?.response?.products?.filter((product: any) => {
      return product.variants.length > 0;
    });
  } catch (err) {
    frameSliderData = []
  }

  return { props: { homePageData, apiFailed, language, stockUpFrameData, frameSliderData } };
};
