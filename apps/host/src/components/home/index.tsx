import { SnackBarProvider } from "../../contexts/Snackbar/SnackbarContext";
import { useEffect } from "react";
import useAxiosLoader from "../../hooks/useAxiosLoader";
import { useRouter } from "next/router";
import SOHomePage from "./SOHomePage";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import { HomePageDTO } from "@/types/home.types";
import i18n from "@root/host/src/language/i18n";

export default function Home({
  homePageData,
  apiFailed,
  brand,
  incomingLang,
  stockUpFrameData,
  frameSliderData
}: {
  homePageData?: HomePageDTO;
  apiFailed?: boolean;
  brand: string;
  incomingLang: string;
  stockUpFrameData: any[];
  frameSliderData: any[]
}) {
  const languageCode =
    typeof window !== "undefined"
      ? (localStorage?.getItem("language") as string)
      : "en";
  const router = useRouter();
  useEffect(() => {
    if (apiFailed) router.push("/404");
  }, [apiFailed]);


  useEffect(() => {
    i18n.changeLanguage(languageCode ? languageCode : "en");
  }, [languageCode]);

  const loading = useAxiosLoader();
  return (
    <SnackBarProvider>
      <BackdropLoader openLoader={loading} />
      <SOHomePage 
      homePageData={homePageData} 
      stockUpFrameData={stockUpFrameData} incomingLanguage={incomingLang} frameSliderData={frameSliderData} />
    </SnackBarProvider>
  );
}
