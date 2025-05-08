import React, { FunctionComponent, useEffect, useState } from "react";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import Head from "next/head";
import { GetServerSideProps } from "next";
import { GetProductSEO } from "@/service/seo.service";
import { ProductSEOData } from "@root/host/src/types/seo.types";
import ProductDetailsSkeleton from "@/components/skeleton_loader/productDetails/ProductDetailsSkeleton";
import { getProductDetail } from "@/service/product-searc.service";
import {
  generateProductDescription,
  generateProductTitle,
  getProductSEOStructuredData,
} from "@root/host/src/utils/seo.util";
import {
  SO_DEFAULT_STORE_NUMBER,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import { ProductViewProps } from "@root/host/src/types/order-common.types";
import { getToken } from "next-auth/jwt";
import PageNotFound404 from "../404";

const RemoteProductDetail = dynamic(() => import("order/ProductDetail"), {
  ssr: false,
  loading: () => <ProductDetailsSkeleton />,
}) as FunctionComponent<ProductViewProps>;

type Props = {
  title: string | null;
  description: string | null;
  schemaData: any;
  productDetails: any;
  productNotFound: boolean;
};

const ProductDetailPage = (props: Props) => {
  const router = useRouter();
  const { pid, requestId, sku } = router.query;

  return (
    <>
      <Head>
        <title>{props.title || "Product Details | Stanton Optical"}</title>
        <meta
          name="description"
          content={
            props.description ||
            "We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
          }
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {props.schemaData && (
          <script
            id="schema"
            type="application/ld+json"
            dangerouslySetInnerHTML={{
              __html: JSON.stringify(props.schemaData),
            }}
          />
        )}
      </Head>
      {props.productNotFound ? (
        <PageNotFound404 />
      ) : (
        <RemoteProductDetail
          pid={pid as string}
          requestId={requestId as string}
          sku={sku as string}
          productDetails={props?.productDetails}
        />
      )}
    </>
  );
};

const getProductSEOData = async (id: string) => {
  const resp = await GetProductSEO(id);
  const seoData = resp.data.Result as ProductSEOData;
  let title = generateProductTitle(seoData);
  let description = generateProductDescription(seoData);

  let schemaData = getProductSEOStructuredData(seoData);

  return { title, description, schemaData };
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const slug = context.query.slug as string;
  let title;
  let description;
  let schemaData;
  let productDetails = null;
  let productNotFound = false;

  const session = await getToken({
    req: context.req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });
  const userType = ((session?.user as any)?.authData as any)?.userType;
  try {
    const id = slug?.split("-")[0];
    const seoData = await getProductSEOData(id);
    title = seoData?.title;
    description = seoData?.description;
    schemaData = seoData?.schemaData;
  } catch (err) {
    title = null;
    description = null;
    schemaData = null;
  }

  if (userType !== USER_TYPE.ASSOCIATE) {
    try {
      const id = slug?.split("-")[0];
      const resp = await getProductDetail(id, SO_DEFAULT_STORE_NUMBER);
      productDetails = resp?.data?.Result;
    } catch (err) {
      productDetails = null;
      productNotFound = true;
    }
  }

  return {
    props: { title, description, schemaData, productDetails, productNotFound },
  };
};

export default ProductDetailPage;
