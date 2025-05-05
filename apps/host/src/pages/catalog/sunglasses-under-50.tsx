import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CatalogSkeleton from "@/components/skeleton_loader/catalog/CatalogSkeleton";
import { commonUtilForGetAllFacets } from "@/service/common.service";
import { getToken } from "next-auth/jwt";
import { BRAND_NAME, USER_TYPE } from "@/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";
import { useTranslation } from "react-i18next";
import { facetKeyMappingWithPathName } from "@/constants/catalog.constants";

const ProductComponent = dynamic<{ facets: any, filters?:string[] }>(
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
        <title>{`Sunglasses Under $50  - ${BRAND_NAME[brand]} | Gafas de Sol por Menos de $50 - ${
          BRAND_NAME[brand]
        }`}</title>
        <meta
          name="description"
          content="Great style meets affordability with sunglasses under $50. Browse our selection of trendy, quality shades and find your ideal pair today."
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="robots" content="index, follow"/>
      </Head>
      <div>
        <ProductComponent facets={props.facets} />
      </div>
    </>
  );
};

export async function getServerSideProps(context: any) {
  const session = await getToken({
    req: context.req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  let query = facetKeyMappingWithPathName.SUNGLASSES_UNDER_50;

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
