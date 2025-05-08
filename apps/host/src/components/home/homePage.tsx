
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { AlertColor } from "@mui/material";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { SNACKBAR_COLOR_TYPE } from "@root/host/src/constants/common.constants";
import { useEffect, useState } from "react";
import { GetSOHomePageData, } from "@root/host/src/service/common.service";
import { HomePageDTO } from "@root/host/src/types/home.types";
import { useTranslation } from "react-i18next";
import InformationSection from "./informationSection/informationSection";
import LifeStyleSection from "./lifeStyleSection/lifeStyleSection";
import TrendSection from "./trendSection/trendSection";
import ShopByShapeSection from "./shopByShapeSection/shopByShapeSection";
import DonationSection from "./donationSection/donationSection";
import MilitaryDiscountSection from "./militaryDiscountSection/militaryDiscountSection";
import InsuranceSection from "./insuranceSection/insuranceSection";
import MeetStanSection from "./meetStanSection/meetStanSection";
import CarouselSection from "./carouselSection/carouselSection";
import CategorySection from "./categorySection/categorySection";
import ProductSection from "./productSection/productSection";

export default function HomePage({
  homePageData,
  incomingLanguage,
  eyeglasses,
  sunglasses,
  contacts
}: {
  homePageData: HomePageDTO;
  incomingLanguage: string;
  eyeglasses: any[];
  sunglasses: any[];
  contacts: any[];
}) {
  const [incomingLanguageCode, setIncomingLanguageCode] = useState<string>(incomingLanguage);
  const { i18n } = useTranslation();
  const [pageData, setPageData] = useState<HomePageDTO>(homePageData as HomePageDTO);
  const { showSnackBar } = useSnackBar();
  const languageCode =
    typeof window !== "undefined"
      ? (localStorage?.getItem("language") as string)
      : "en";

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

  useEffect(() => {
    if (i18n.language !== incomingLanguageCode) {
      setIncomingLanguageCode(i18n.language);
      getHomePageData();
    }
  }, [i18n.language, incomingLanguageCode])

  return (
    <>
      {pageData && (
        <div style={{ background: 'white' }}>
          <div>
            <CarouselSection pageData={pageData?.CarouselSection} />
          </div>
          <div>
            <ProductSection eyeglasses={eyeglasses} sunglasses={sunglasses} contacts={contacts}></ProductSection>
          </div>
          <div>
            <CategorySection pageData={pageData?.CategorySection} />
          </div>
          <div>
            <InformationSection pageData={pageData?.InformationSection} />
          </div>
          <div>
            <LifeStyleSection pageData={pageData?.LifeStyleSection} />
          </div>
          <div>
            <TrendSection pageData={pageData?.TrendSection} />
          </div>
          <div>
            <ShopByShapeSection pageData={pageData?.ShopByShapeSection} />
          </div>
          <div>
            <InformationSection pageData={pageData?.SecondInformationSection} />
          </div>
          <div>
            <DonationSection pageData={pageData?.DonationSection} />
          </div>
          <div>
            <MilitaryDiscountSection pageData={pageData?.MilitaryDiscountSection} />
          </div>
          <div style={{ "position": "relative" }}>
            <div>
              <InsuranceSection pageData={pageData?.InsuranceSection} />
            </div>
            <div>
              <MeetStanSection pageData={pageData?.MeetStanSection} />
            </div>
          </div>
        </div>
      )}
    </>
  );
}