
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { AlertColor } from "@mui/material";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { useEffect, useState } from "react";
import { GetUserSate } from "@root/host/src/service/special-offer.service";
import {
  GetCurrentLocation,
  GetSOHomePageData,
} from "@root/host/src/service/common.service";
import useLocationPermission from "@root/host/src/hooks/useLocationPermission";
import HomeSkeleton from "../skeleton_loader/HomeSkeleton";
import { HomePageDTO } from "@/types/home.types";
import Cookies from "js-cookie";
import Refer from "./refer/Refer";
import IconSlider from "./iconslider/IconSlider";
import ShopImages from "./shopimages/ShopImages";
import StockUp from "./stockup/StockUp";
import Frames from "./frames/Frames";
import EyeExamToday from "./eyeexamtoday/EyeExamToday";
import BookEyeExam from "./bookeyeexam/BookEyeExam";
import BuyNow from "./buynow/BuyNow";
import Insurance from "./insurance/Insurance";
import useNonInitialEffect from "@/hooks/useNonInitialEffect";
import { useTranslation } from "react-i18next";
import { getLatLong } from "@/utils/getLocation.utils";

export default function SOHomePage({
  homePageData,
  stockUpFrameData,
  frameSliderData,
  incomingLanguage
}: {
  homePageData?: HomePageDTO;
  stockUpFrameData: any[],
  frameSliderData: any[],
  incomingLanguage: string
}) {
  const [incomingLanguageCode, setIncomingLanguageCode] = useState<string>(incomingLanguage);
  const { i18n } = useTranslation();
  const [pageData, setPageData] = useState<HomePageDTO>(homePageData as HomePageDTO);
  const isLocationAllowed = useLocationPermission();
  const { showSnackBar } = useSnackBar();
  const languageCode =
    typeof window !== "undefined"
      ? (localStorage?.getItem("language") as string)
      : "en";
  const RESTRICTED_AREA_LOCATION = {
    AREA_TYPE: "administrative_area_level_1",
    STATE: "Arkansas",
  };

  const getHomePageData = () => {
    GetSOHomePageData(languageCode)
      .then((res) => {
        setPageData(res.data.Result);
      })
      .catch((err) => {
        showSnackBar(
          err.response
            ? err.response.data.Error.Description
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const getUserState = (lat: any, lng: any) => {
    GetUserSate(lat, lng).then((response: any) => {
      const results = response.data.results;
      if (results && results.length > 0) {
        const addressComponents = results[0].address_components;
        const state = addressComponents.find((component: any) =>
          component.types.includes(RESTRICTED_AREA_LOCATION.AREA_TYPE)
        ).long_name;
      }
    });
  };

  const getUserLatLng = () => {
    getLatLong((lat, long) => {
      getUserState(lat, long);
    })
  };


  useNonInitialEffect(() => {
    if(i18n.language !== incomingLanguageCode) {
      setIncomingLanguageCode(i18n.language);
      getHomePageData();
    }
  }, [i18n.language, incomingLanguageCode])


  useEffect(() => {
    getUserLatLng();
  }, [homePageData])
 

  return (
    <>
      {/* TODO: IR-1922  {!pageData && <HomeSkeleton />} */}
      {pageData && (
        <>
          <div>
            <Refer pageData={pageData?.ReferSection[0]} />
          </div>
          {/* No SSR */}
          <div style={{ backgroundColor: "white" }}>
            <IconSlider pageData={pageData?.FeaturedServicesSection} />
          </div>
          <div>
            <ShopImages pageData={pageData?.CategorySection} />
          </div>
          {/* Parital SSR */}
          <div>
            <StockUp pageData={pageData?.ContactLensesSection[0]} stockUpFrameData={stockUpFrameData} />
          </div>
          {/* Parital SSR */}
          <div style={{ background: "white" }}>
            <Frames pageData={pageData?.FramesSection[0]} frameSliderData={frameSliderData} />
          </div>
          <div>
            <BookEyeExam pageData={pageData?.BookEyeExamSection[0]} />
          </div>
          <div>
            <EyeExamToday pageData={pageData?.HeaderBannerSection[0]} />
          </div>
          <div>
            <BuyNow pageData={pageData?.BuyNowSection[0]} />
          </div>
          <div>
            <Insurance pageData={pageData?.InsuranceSection[0]} />
          </div>
        </>
      )}
    </>
  );
}