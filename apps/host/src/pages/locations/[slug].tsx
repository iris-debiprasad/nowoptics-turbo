import StoreDetailsSkeleton from "@/components/skeleton_loader/storeDetailsSkeleton/StoreDetailsSkeleton";
import { BRAND, DATE_FORMAT } from "@root/host/src/constants/common.constants";
import { LocationSEO } from "@root/host/src/constants/seo.constant";
import { GetUserStoreContent } from "@/service/common.service";
import { GetLocationSEO } from "@/service/seo.service";
import { GetUserStoreDetailsByName } from "@/service/storeLocator.service";
import { StoreSEOData } from "@root/host/src/types/seo.types";
import { StoreContentDTO, StoreDetailsDTO, StoreDetailsPageDTO } from "@root/host/src/types/store.type";
import dayjs from "dayjs";
import { GetServerSideProps } from "next";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const StoreDetails = dynamic(() => import("@/components/location/index"), {
  loading: () => <StoreDetailsSkeleton />,
  ssr: true,
}) as React.FunctionComponent<StoreDetailsPageDTO>;

type Props = {
  title: string | null;
  description: string | null;
  schemaData: any;
  pid: string | null;
  selectedStore: StoreDetailsDTO | null;
  storeDetails: StoreContentDTO | null;
};
export default function StorePage(props: Props) {

  const { pid } = props

  return (
    <>
      <Head>
        <title>{props.title || "Store Details | Stanton Optical"}</title>
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
      <div id="store_page">
        <StoreDetails key={props.selectedStore?.Id} pid={pid as string} brand={BRAND.SO} selectedStoreData={props.selectedStore} storeData={props.storeDetails} />
      </div>
    </>
  );
}
/**
 *  create rich text data
 * @param storeDetails
 * @returns
 */
const getStoreSEOStructuredData = (storeDetails: StoreSEOData) => {
  let openingHours = storeDetails?.StoreWorkingHours.map((data) => ({
    dayOfWeek: dayjs(data.ScheduleDate).format("dd"),
    opens: data.OpenAt,
    closes: data.CloseAt,
  }));
  return {
    "@context": "https://schema.org",
    "@type": ["Optician", "Optometric"],
    name: storeDetails.WebDescription,
    url: storeDetails.Url || "",
    logo: storeDetails.LogoPath || "",
    description: storeDetails.WebDescription,
    address: {
      "@type": "PostalAddress",
      streetAddress: storeDetails.Address?.AddressLine1 || "",
      addressLocality: storeDetails.Address?.City || "",
      addressRegion: storeDetails.Address?.State || "",
      postalCode: storeDetails.Address?.ZipCode || "",
      addressCountry: storeDetails.Address?.Country || "",
    },
    telephone: storeDetails.PhoneDetails[0]?.PhoneNumber || "",
    email: storeDetails.Email || "",
    paymentAccepted: storeDetails.PaymentAccepted || "",
    currenciesAccepted: ["USD"],
    priceRange: "$$",
    sameAs: [
      "https://www.facebook.com/StantonOptical",
      "https://twitter.com/stantonoptical1",
      "https://instagram.com/stantonoptical/",
      "https://www.linkedin.com/company/stanton-optical",
    ],
    OpeningHoursSpecification: openingHours,
    contactPoint: {
      "@type": "ContactPoint",
      telephone: storeDetails.PhoneDetails[0]?.PhoneNumber || "",
      contactType: "customer service",
      availableLanguage: storeDetails.Languages, // for multiple ["English", "Spanish"]
    },
    geo: {
      "@type": "GeoCoordinates",
      latitude: storeDetails.GeoLocation?.Latitude || "",
      longitude: storeDetails.GeoLocation?.Longitude || "",
    },
  };
};

const getStoreDetailsByName = async (storeName: string) => {

  return GetUserStoreDetailsByName(storeName, dayjs().format(DATE_FORMAT))

}


const getStorePageData = (storeId: string) => {
  return GetUserStoreContent(storeId)
}


export const getServerSideProps: GetServerSideProps = async (context) => {
  const storeName = context.query.slug as string;
  const pid = context.query.pid as string || null;
  let title;
  let description;
  let schemaData;
  let selectedStore: StoreDetailsDTO | null;
  let storeDetails: StoreContentDTO | null = null;


  if (storeName !== storeName.toLowerCase()) {
    return {
      redirect: {
        destination: `/locations/${storeName.toLowerCase()}`,
        permanent: true,
      },
    };
  }

  try {
    const seoData: StoreSEOData | null = (await GetLocationSEO(storeName)).data
      .Result;

    if (!seoData) return { notFound: true };



    title = LocationSEO.SO.title
      .replace("[CITY]", seoData.Address.City)
      .replace("[STATE]", seoData.Address?.StateCode);

    description = LocationSEO.SO.description
      .replace("[CITY]", seoData.Address.City)
      .replace("[STATE]", seoData.Address?.StateCode);

    schemaData = getStoreSEOStructuredData(seoData);
  } catch (err) {
    title = null;
    description = null;
    schemaData = null;
  }

  try {
    const storeRep = await getStoreDetailsByName(storeName);
    selectedStore = storeRep.data.Result;
    if (selectedStore) {
      const storeDatRep = await getStorePageData(selectedStore?.LocationPageName);
      storeDetails = storeDatRep.data.Result;
    }
  } catch (err) {
    selectedStore = null;
    storeDetails = null;
  }
  return {
    props: { title, description, schemaData, pid, selectedStore, storeDetails },
  };
};
