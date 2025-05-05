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
        <title>{`Eye Care Products - ${BRAND_NAME[brand]}`}</title>
        <meta
          name="description"
          content="Enhance your vision with our premium eye care products. Discover the best eye care supplements now! See clearer, live better. Shop online or in-store today!"
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
//   const query = facetKeyMappingWithPathName.CATALOG_EYECARE_PRODUCTS;
//   const result = await commonUtilForGetAllFacets(query);
//   return result;
// };


export async function getServerSideProps(context: any) {
  
  const session = await getToken({
    req: context.req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  let query = facetKeyMappingWithPathName.CATALOG_EYECARE_PRODUCTS;

  if((session?.user as any)?.authData?.userType !== USER_TYPE.ASSOCIATE) {
    query += '&filter=mIsWebEnabled_uFilter:true';
  }
  const result = await commonUtilForGetAllFacets(query);

  return {
    props: result.props,
  }
}

export default Products;
