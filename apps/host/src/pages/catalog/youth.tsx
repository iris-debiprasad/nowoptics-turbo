import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CatalogSkeleton from "@/components/skeleton_loader/catalog/CatalogSkeleton";
import { commonUtilForGetAllFacets } from "@/service/common.service";
import { facetKeyMappingWithPathName } from "@root/host/src/constants/catalog.constants";
import { getToken } from "next-auth/jwt";
import { useOnResize } from "@/hooks/use-on-resize";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";
import { getSmallScreenBreakpoint } from "@root/host/src/utils/common.utils";
import { BRAND_NAME, USER_TYPE } from "@root/host/src/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";
import { useTranslation } from "react-i18next";

const ProductComponent = dynamic<{ facets: any }>(
  () => import("order/Products"),
  {
    ssr: false,
    loading: () => <CatalogSkeleton />,
  }
);

const Products = (props: { facets: any }) => {
  const smallScreenBreakpoint = getSmallScreenBreakpoint();
  const isMobile = useOnResize({ breakpoint: smallScreenBreakpoint });
  const backgroundImage = isMobile
    ? `url(${ImageUrlConstants.CATALOG_PAGE_BANNER.YOUTH_EYEGLASSES_BANNER.DESKTOP})`
    : `url(${ImageUrlConstants.CATALOG_PAGE_BANNER.YOUTH_EYEGLASSES_BANNER.MOBILE})`;

  const { t } = useTranslation();
  const brand = useGetBrand();
  return (
    <>
      <Head>
        <title>
          {`${t("EYEGLASSES/YOUTH.META.TITLE")} - ${BRAND_NAME[brand]}`}
        </title>
        <meta
          name="description"
          content="Pair your kid's prescription with durable, comfortable, and fun frames. Discover trending glasses for kids with Free Eye Exam. Buy in-store or online today."
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="catalog_page">
        <div
          style={{
            background: backgroundImage,
          }}
          className="catalog_banner_section"
        >
          <div className="banner_text_section">
            <div className="banner_title">
              <h1>Kids’ Glasses</h1>
              <p>Trendy and fun frames designed for their comfort</p>
            </div>
          </div>
        </div>
        <ProductComponent facets={props.facets} />
      </div>
    </>
  );
};

//TODO: will add in future if required
// export const getStaticProps = async () => {
//   const query = facetKeyMappingWithPathName.CATALOG_YOUTH_EYEGLASSES;
//   const result = await commonUtilForGetAllFacets(query);
//   return result;
// };

export async function getServerSideProps(context: any) {
  const session = await getToken({
    req: context.req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  let query = facetKeyMappingWithPathName.CATALOG_YOUTH_EYEGLASSES;

  if ((session?.user as any)?.authData?.userType !== USER_TYPE.ASSOCIATE) {
    query += "&filter=mIsWebEnabled_uFilter:true";
    query += '&filter=isWebEnabled_uFilter:true';
  }
  const result = await commonUtilForGetAllFacets(query);

  return {
    props: result.props,
  };
}

export default Products;
