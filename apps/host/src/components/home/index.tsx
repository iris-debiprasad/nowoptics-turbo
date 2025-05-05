import { SnackBarProvider } from "../../contexts/Snackbar/SnackbarContext";
import { useEffect } from "react";
import useAxiosLoader from "../../hooks/useAxiosLoader";
import { useRouter } from "next/router";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import { HomePageDTO } from "@/types/home.types";
import i18n from "@root/host/src/language/i18n";
import HomePage from "./homePage";

export default function Home({
  homePageData,
  apiFailed,
  incomingLang,
  eyeglasses,
  sunglasses,
  contacts
}: {
  homePageData: HomePageDTO;
  apiFailed?: boolean;
  incomingLang: string;
  eyeglasses: any[];
  sunglasses: any[];
  contacts: any[];
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
      <HomePage homePageData={homePageData} incomingLanguage={incomingLang} eyeglasses={eyeglasses} sunglasses={sunglasses} contacts={contacts} />
    </SnackBarProvider>
  );
}
