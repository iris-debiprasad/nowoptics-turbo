import React, { useEffect, useState } from "react";

import AddressWithMap from "./addresswithMap/AddressWithStoreImage";

import BookEyeExamContent from "./bookeyeexamcontent/BookEyeExamContent";
import StoreOffer from "./storeoffer/StoreOffer";

import Faq from "./faq/Faq";
import OurCustomerVoice from "./ourcustomervoice/OurCustomerVoice";

import style from "./Store.module.scss";

import {
  StoreContentDTO,
  StoreDetailsDTO,
} from "@/types/store.type";
import {
  SnackBarProvider,
  useSnackBar,
} from "@/contexts/Snackbar/SnackbarContext";
import NearbyStore from "./nearbyStore/NearbyStore";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import { useRouter } from "next/router";
import AddGTMEvent from "@root/host/src/utils/gtmEvent";
import { GA_TAG_EVENTS } from "@root/host/src/constants/google-analytics.constants";
import useLocationPermission from "@root/host/src/hooks/useLocationPermission";
import { getDetails } from "@root/host/src/utils/getSessionData";
import { COLOR_KEYS, COLOR_ROOT_NAMES, MEL_COLOR, SO_COLOR } from "@root/host/src/constants/color.constants";
import { checkBrand } from "@root/host/src/utils/common.utils";



type StoreDTO = {
  pid: string;
  storeData?: StoreContentDTO;
  brand?: string | undefined;
  selectedStoreData: StoreDetailsDTO | null
};

function StoreDetails({ pid, storeData, brand, selectedStoreData }: StoreDTO) {
  const router = useRouter();

  const [selectedStore, setSelectedStore] = useState<StoreDetailsDTO | null>(
    selectedStoreData || null
  );
  const [storeDetails, setStoreDetails] = useState<StoreContentDTO | null>(
    storeData || null
  );
  const [iSMELBrand, setISMELBrand] = useState("SO");
  const [role, setRole] = useState<string | null>(null);
  function getUserData() {
    return getDetails().then(function (data) {
      setRole(data?.authData?.userType ? data?.authData?.userType : null);
    });
  }
  useEffect(() => {
    getUserData();
  }, []);

  // TODO - Will be removed later, temporarily used to show one MEL Store in SO Website
  useEffect(() => {
    if (typeof window !== "undefined") {
      const currentRoute = router.asPath;
      const storePageDiv = document.getElementById("store_page");
      // setPageLoading(false);
      if (storePageDiv && currentRoute.includes("bowling-green")) {
        storePageDiv.classList.add(checkBrand());
        COLOR_ROOT_NAMES.map((rootName: string, index: number) => {
          const colorKey = COLOR_KEYS[index];
          storePageDiv.style.setProperty(
            rootName,
            MEL_COLOR[colorKey]
          );
        });
      } else {
        setISMELBrand("SO");
        storePageDiv?.classList.remove(checkBrand());
        COLOR_ROOT_NAMES.map((rootName: string, index: number) => {
          const colorKey = COLOR_KEYS[index];
          storePageDiv?.style.setProperty(
            rootName,
            SO_COLOR[colorKey]
          );
        });
      }
    }
  }, [router.asPath]);


  useEffect(() => {
    if (selectedStore) {
      if (selectedStore?.StoreNumber == "7054") {
        setISMELBrand("MEL");
      }
      AddGTMEvent({
        event: GA_TAG_EVENTS.STORE_VISIT,
        [GA_TAG_EVENTS.STORE_ID]: selectedStore?.Id,
        [GA_TAG_EVENTS.STORE_ADDRESS]:
          selectedStore?.AddressLine1 +
          " " +
          selectedStore?.City +
          " " +
          selectedStore?.StateCode +
          " " +
          selectedStore?.ZipCode,
        [GA_TAG_EVENTS.STORE_NAME]: selectedStore?.WebDescription,
      });
    }
  }, [selectedStore]);



  return (
    <SnackBarProvider>
      <div className={style.storeDetailWrapper}>
        <div>
          {selectedStore && (
            <AddressWithMap
              selectedStore={selectedStore}
              storeDetails={storeDetails}
              brand={iSMELBrand === "MEL" ? "MEL" : brand}
              role={role}
            />
          )}
        </div>
        <div>
          {storeDetails?.AboutEyeCareSection && selectedStore && (
            <BookEyeExamContent
              storeDetails={storeDetails}
              selectedStore={selectedStore}
              brand={iSMELBrand === "MEL" ? "MEL" : brand}
              role={role}
            />
          )}
        </div>
        <div>
          {storeDetails?.PromotionSection && (
            <StoreOffer
              storeDetails={storeDetails}
              selectedStore={selectedStore}
              brand={iSMELBrand === "MEL" ? "MEL" : brand}
              role={role}
            />
          )}
        </div>
        <div>
          {storeDetails?.FAQSection && (
            <Faq
              storeDetails={storeDetails}
              selectedStore={selectedStore}
              brand={iSMELBrand === "MEL" ? "MEL" : brand}
              role={role}
            />
          )}
        </div>
        <div>
          {storeDetails?.NearBySection && (
            <NearbyStore
              storeDetails={storeDetails}
              selectedStore={selectedStore}
            />
          )}
        </div>
        <div>
          {storeDetails?.ReviewSection && (
            <OurCustomerVoice storeDetails={storeDetails} brand={iSMELBrand === "MEL" ? "MEL" : brand} />
          )}
        </div>
      </div>
    </SnackBarProvider>
  );
}

export default StoreDetails;
