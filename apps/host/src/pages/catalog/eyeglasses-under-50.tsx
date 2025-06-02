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
        <title>{`Glasses Under $50  - ${BRAND_NAME[brand]} | Gafas por Menos de $50 - ${
          BRAND_NAME[brand]
        }`}</title>
        <meta
          name="description"
          content="Stylish glasses don’t have to break the bank. Discover fashionable, quality frames under $50 and find your perfect pair today."
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

  let query = facetKeyMappingWithPathName.EYEGLASSES_UNDER_50;

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
