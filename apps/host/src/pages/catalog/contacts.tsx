import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CatalogSkeleton from "@/components/skeleton_loader/catalog/CatalogSkeleton";
import { commonUtilForGetAllFacets } from "@/service/common.service";
import { facetKeyMappingWithPathName } from "@/constants/catalog.constants";
import { getToken } from "next-auth/jwt";
import { BRAND_NAME, USER_TYPE } from "@/constants/common.constants";
import { useGetBrand } from "@/hooks/useGetBrand";
import { useTranslation } from "react-i18next";
import { getSmallScreenBreakpoint } from "@/utils/common.utils";
import { useOnResize } from "@/hooks/use-on-resize";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import i18n from "@root/host/src/language/i18n";

const ProductComponent = dynamic<{ facets: any }>(
  () => import("order/Products"),
  {
    ssr: false,
    loading: () => <CatalogSkeleton />,
  }
);

const Products = (props: { facets: any; err: string }) => {
  const { t } = useTranslation();
  const brand = useGetBrand();
  const smallScreenBreakpoint = getSmallScreenBreakpoint();
  const isMobile = useOnResize({ breakpoint: smallScreenBreakpoint });
  const backgroundImageEng = isMobile
    ? `url(${ImageUrlConstants.CATALOG_PAGE_BANNER.CONTACTS_BANNER.DESKTOP_ENG})`
    : `url(${ImageUrlConstants.CATALOG_PAGE_BANNER.CONTACTS_BANNER.MOBILE_ENG})`;
  const backgroundImageSpa = isMobile
    ? `url(${ImageUrlConstants.CATALOG_PAGE_BANNER.CONTACTS_BANNER.DESKTOP_SPA})`
    : `url(${ImageUrlConstants.CATALOG_PAGE_BANNER.CONTACTS_BANNER.MOBILE_SPA})`;

  return (
    <>
      <Head>
        <title>
          {`${t("CONTACT/CONTACTS.META.TITLE")} - ${BRAND_NAME[brand]}`}
        </title>
        <meta
          name="description"
          content="We offer a wide range of contact lenses with different replacement range, frequent or disposable. Shop contacts online or in-store near you today."
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div className="catalog_page">
        <div
          style={{
            background:
              i18n.language === "en" ? backgroundImageEng : backgroundImageSpa,
          }}
          className="catalog_banner_section"
        >
          <div className="banner_text_section">
            <div className="banner_title contacts">
              {!isMobile ? (
                <>
                  <h1>
                    {t("CONTACTS_BANNER.MOBILE.HEADING_1")}
                    <br />
                    {t("CONTACTS_BANNER.MOBILE.HEADING_2")}
                    <br />
                    {t("CONTACTS_BANNER.MOBILE.HEADING_3")}
                  </h1>
                </>
              ) : (
                <>
                  <h1>
                    {t("CONTACTS_BANNER.DESKTOP.HEADING_1")}
                    <br />
                    {t("CONTACTS_BANNER.DESKTOP.HEADING_2")}
                  </h1>
                </>
              )}
              <br />
              <p>{t("CONTACTS_BANNER.SUB_HEADING")}</p>
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

//   const query = facetKeyMappingWithPathName.CATALOG_CONTACTS;
//   const result = await commonUtilForGetAllFacets(query);
//   return result;
// };

export async function getServerSideProps(context: any) {
  const session = await getToken({
    req: context.req,
    secret: process.env.NEXT_PUBLIC_SECRET,
  });

  let query = facetKeyMappingWithPathName.CATALOG_CONTACTS;

  if ((session?.user as any)?.authData?.userType !== USER_TYPE.ASSOCIATE) {
    query += "&filter=mIsWebEnabled_uFilter:true";
  }

  const result = await commonUtilForGetAllFacets(query);

  return {
    props: result.props,
  };
}

export default Products;
