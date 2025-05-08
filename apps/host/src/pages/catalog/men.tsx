import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CatalogSkeleton from "@/components/skeleton_loader/catalog/CatalogSkeleton";
import { commonUtilForGetAllFacets } from "@/service/common.service";
import { getToken } from "next-auth/jwt";
import { BRAND_NAME, USER_TYPE } from "@root/host/src/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";
import { useTranslation } from "react-i18next";
import { facetKeyMappingWithPathName } from "@root/host/src/constants/catalog.constants";

const ProductComponent = dynamic<{ facets: any }>(
  () => import("order/Products"),
  {
    ssr: false,
    loading: () => <CatalogSkeleton />,
  }
);

const Products = (props: { facets: any }) => {
  const { t } = useTranslation();
  const brand = useGetBrand();

  return (
    <>
      <Head>
        <title>{`${t("EYEGLASSES/MEN.META.TITLE")} - ${
          BRAND_NAME[brand]
        }`}</title>
        <meta
          name="description"
          content="Discover latest and trending prescription eyeglasses for men's. Upgrade your look and vision today. Get Free Eye Exam and Shipping. Buy men's glasses today."
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <ProductComponent facets={props.facets} />
      </div>
    </>
  );
};

//TODO: will add in future if required
// export const getStaticProps = async () => {
//   const result = await commonUtilForGetAllFacets();
//   return result;
// };

export async function getServerSideProps(context: any) {
  const session = await getToken({
    req: context.req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  let query = facetKeyMappingWithPathName.CATALOG_MEN_EYEGLASSES;

  if ((session?.user as any)?.authData?.userType !== USER_TYPE.ASSOCIATE) {
    query += "&filter=mIsWebEnabled_uFilter:true";
    query += "&filter=isWebEnabled_uFilter:true";
  }
  const result = await commonUtilForGetAllFacets(query);

  return {
    props: result.props,
  };
}

export default Products;
