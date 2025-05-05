import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CatalogSkeleton from "@/components/skeleton_loader/catalog/CatalogSkeleton";
import { commonUtilForGetAllFacets } from "@/service/common.service";
import { facetKeyMappingWithPathName } from "@/constants/catalog.constants";
import { getToken } from "next-auth/jwt";
import { BRAND_NAME, USER_TYPE } from "@/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";

const ProductComponent = dynamic<{ facets: any }>(
  () => import("order/Products"),
  {
    ssr: false,
    loading: () => <CatalogSkeleton />,
  }
);

const Products = (props: { facets: any }) => {
  const brand = useGetBrand();
  return (
    <>
      <Head>
        <title>{`Cat Eye Sunglasses Online & In-store - ${BRAND_NAME[brand]}`}</title>
        <meta
          name="description"
          content="Cat eye sunglasses deliver a chic, vintage-inspired look, adding elegance and playful sophistication to your style. Explore our collection and find your perfect pair today."
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="catalog_page">
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

  let query = facetKeyMappingWithPathName.SUNGLASSES_CAT_EYE_FRAMES;

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
