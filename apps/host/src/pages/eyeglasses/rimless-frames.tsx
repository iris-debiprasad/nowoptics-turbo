import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CatalogSkeleton from "@/components/skeleton_loader/catalog/CatalogSkeleton";
import { commonUtilForGetAllFacets } from "@/service/common.service";
import { facetKeyMappingWithPathName } from "@root/host/src/constants/catalog.constants";
import { getToken } from "next-auth/jwt";
import { BRAND_NAME, USER_TYPE } from "@root/host/src/constants/common.constants";
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
        <title>{`Rimless Glasses Frames Online & In-store - ${BRAND_NAME[brand]}`}</title>
        <meta
          name="description"
          content="Rimless glasses frames provide a sleek, minimalist look, combining lightweight comfort with understated elegance. Browse our selection to find your ideal pair."
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

  let query = facetKeyMappingWithPathName.EYEGLASSES_RIMLESS_FRAMES;

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
