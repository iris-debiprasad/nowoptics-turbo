import { BRAND, BRAND_NAME } from "@/constants/common.constants";
import {
  ISpecial_Offer_Page,
  SO_SPECIAL_OFFERS_PAGES,
} from "@/constants/specialOffersConstants";
import { GetStaticPaths, GetStaticProps } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useGetBrand } from "@/hooks/useGetBrand";
import { useTranslation } from "react-i18next";
import dynamic from "next/dynamic";

interface Props {
  pageData: ISpecial_Offer_Page;
}

const SpecialOffersComponent = dynamic(
  () => import("@/components/static/special-offers/special-offer/specialOffer"),
  {
    ssr: true,
  }
);

const ReferAFriend = dynamic(
  () => import("@/components/static/refer-friend/ReferFriend"),
  {
    ssr: true,
  }
);

const BauschLombOffer = dynamic(
  () => import("@/components/static/bausch-lomb-offer/BauschLombOffer"),
  {
    ssr: true,
  }
);

const ProductDetailPage = ({ pageData }: Props) => {
  const { t } = useTranslation();
  const router = useRouter();
  const slug = router.query.slug as string;
  const brand = useGetBrand();

  if (slug === "refer-a-friend") {
    return (
      <>
        <Head>
          <title>
            {`${t("SPECIAL_OFFERS/REFER-A-FRIEND.META.TITLE")} - ${
              BRAND_NAME[brand]
            }`}
          </title>
          <meta
            name="description"
            content={
              brand === BRAND.MEL
                ? "Share the gift of sight! Refer a friend and get a free pair of sunglasses at any My Eyelab Store."
                : "Share the gift of sight! Refer a friend and get a free pair of sunglasses at any Stanton Optical Store."
            }
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <ReferAFriend />
        </main>
      </>
    );
  } else if (slug == "bausch-lomb-ultra") {
    return (
      <>
        <Head>
          <title>
            {`Annual Supply of Bausch + Lomb Ultra - ${BRAND_NAME[brand]}`}
          </title>
          <meta
            name="description"
            content="Experience all-day comfort+ with Bausch + Lomb ULTRA® Monthly Contact Lenses. Ideal for every lifestyle and every event, you’ll enjoy a front-row view of lenses built to retain maximum levels of moisture."
          />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <main>
          <BauschLombOffer />
        </main>
      </>
    );
  }

  const getPageTitle = (): string => {
    let title = "";
    const hasTranslation: boolean =
      pageData.meta.title.includes("SPECIAL_OFFERS");

    if (!hasTranslation) title = pageData.meta.title;
    else title = t(pageData.meta.title);

    title += ` - ${BRAND_NAME[brand]}`;

    return title;
  };

  return (
    <>
      <Head>
        <title>{getPageTitle()}</title>
        <meta name="description" content={pageData.meta.description} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <SpecialOffersComponent data={pageData} />
      </main>
    </>
  );
};

export const getStaticPaths = (() => ({
  paths: Object.keys(SO_SPECIAL_OFFERS_PAGES).map((slug) => ({
    params: { slug },
  })),
  fallback: false,
})) satisfies GetStaticPaths;

export const getStaticProps = (async ({ params }) => {
  const slug = (params?.slug as string) || "";
  const response: ISpecial_Offer_Page | undefined =
    SO_SPECIAL_OFFERS_PAGES[slug];

  if (!response) return { notFound: true };

  return { props: { pageData: response } };
}) satisfies GetStaticProps<Props>;

export default ProductDetailPage;
