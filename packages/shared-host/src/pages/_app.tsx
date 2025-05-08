import { Provider } from "react-redux";
import NextApp from "next/app";
import { SessionProvider } from "next-auth/react";
import Footer from "@/components/footer/Footer";
import "../../../assets/styles/globals.scss";
import type { AppProps } from "next/app";
import "../language/i18n";
import { store } from "@/store/store";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";
import React, { useEffect, useState } from "react";
import NextNProgress from "nextjs-progressbar";
import { useRouter } from "next/router";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import { StoreAddressType } from "@/types/SideBar.types";
import { getLatLong } from "@/utils/getLocation.utils";
import Head from "next/head";
import { checkBrand, checkGuidedSalesEnableForState, getLatLongForUser, getStateCodeForUser, setBrand, guidedSalesPilotOnlyCheck, getPublicEnv } from "@/utils/common.utils";
import PPCPage from "./ppc/[[...slug]]";
import useRefetchSession from "@/hooks/useRefetchSession";
import SocialPage from "./social/[[...slug]]";
import AppHeader from "@/components/appHeader/AppHeader";
import {
  COLOR_KEYS,
  COLOR_ROOT_NAMES,
  MEL_COLOR,
  SO_COLOR,
} from "@/constants/color.constants";
import { BRAND, USER_TYPE } from "@/constants/common.constants";
import StartPage from "./prescription-renewal/start";
import { HasInHousePxsContextProvider } from "@/contexts/ HasInHousePxs/ HasInHousePxsContext";
import GuidedSales from "@/components/guided-sales/GuidedSales";
import BrandTransitionModal from "@/components/brandTransitionModal/BrandTransition";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";
import { ApplicationInsights } from "@microsoft/applicationinsights-web";
import { ReactPlugin } from "@microsoft/applicationinsights-react-js";
import StaticFooter from "@/components/staticFooter/StaticFooter";

var reactPlugin = new ReactPlugin();

export default function App({
  Component,
  pageProps: { session, ...pageProps },
  initialData,
}: AppProps & { initialData: any }) {
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [isCDCView, setIsCDCView] = useState(false);
  const [storeData, setStoreData] = useState<StoreAddressType | null>(null);
  const [isOnline, setIsOnline] = useState(true);
  const [envData, setEnvData] = useState<any>(null);
  useEffect(() => {
    setBrand();
  }, []);

  useEffect(() => {
    if (typeof window !== "undefined") {
      checkBrand();
      const isMEL_Brand_Site = checkBrand() === BRAND.MEL; // TODO : Remove Brand Check
      document.body.classList.add(checkBrand());
      COLOR_ROOT_NAMES.map((rootName: string, index: number) => {
        const colorKey = COLOR_KEYS[index];
        return document.body.style.setProperty(
          rootName,
          isMEL_Brand_Site ? MEL_COLOR[colorKey] : SO_COLOR[colorKey]
        );
      });
    }
  }, [router.asPath]);

  useEffect(() => {
    if (initialData && Object.entries(initialData).length > 0) {
      // check if NEXT_PUBLIC_RECAPTCHA_ENABLE is present if there add it to window object
      if (initialData.NEXT_PUBLIC_RECAPTCHA_ENABLE) {
        window["NEXT_PUBLIC_RECAPTCHA_ENABLE"] = initialData.NEXT_PUBLIC_RECAPTCHA_ENABLE;
      }

      if(initialData.NEXT_PUBLIC_EMARSYS_TEST_MODE_ENABLE){
        window["NEXT_PUBLIC_EMARSYS_TEST_MODE_ENABLE"] = initialData.NEXT_PUBLIC_EMARSYS_TEST_MODE_ENABLE;
      }
      setEnvData(initialData);
    }
  }, [initialData]);

  useEffect(() => {
    const handleRouteChange = () => {
      setLoading(true);
    };

    const handleRouteChangeComplete = () => {
      setLoading(false);
    };

    router.events.on("routeChangeStart", handleRouteChange);
    router.events.on("routeChangeComplete", handleRouteChangeComplete);

    return () => {
      router.events.off("routeChangeStart", handleRouteChange);
      router.events.off("routeChangeComplete", handleRouteChangeComplete);
    };
  }, []);

  useEffect(() => {
    getLatLong((lat, long) => {
      localStorage.setItem(
        "location",
        JSON.stringify({
          latitude: lat,
          longitude: long,
        })
      );
    });
    if (!envData) return;
    try {
      const enableAppInsights = envData && envData?.NEXT_PUBLIC_AZURE_APP_INSIGHTS_ENABLE === 'true';
      if (enableAppInsights) {
        const appInsights = new ApplicationInsights({
          config: {
            connectionString: process.env.NEXT_PUBLIC_APP_INSIGHT,
            extensions: [reactPlugin],
            enableAutoRouteTracking: true,
          },
        });

        appInsights.loadAppInsights();
      }
    } catch (err) {
      console.log("Unable to load azure app insight", err)
    }
  }, [envData]);

  const updateNetworkStatus = () => {
    setIsOnline(navigator.onLine);
  };

  useEffect(() => {
    if (typeof window !== "undefined") {
      window.ononline = updateNetworkStatus;
      window.onoffline = updateNetworkStatus;
    }
  }, []);

  return (
    <Provider store={store}>
      {/* TODO: checking token update in every 5 min */}
      <RuntimeVarContext.Provider value={envData}>
        <SessionProvider session={session} refetchOnWindowFocus={false}>
          <ApplicationWrapper
            Component={Component}
            pageProps={pageProps}
            loading={loading}
            storeData={storeData}
            setStoreData={setStoreData}
            isCDCView={isCDCView}
            setIsCDCView={setIsCDCView}
          />
        </SessionProvider>
      </RuntimeVarContext.Provider>
    </Provider>
  );
}

export const ApplicationWrapper = React.memo(
  ({
    Component,
    pageProps,
    loading,
    storeData,
    setStoreData,
    isCDCView,
    setIsCDCView,
  }: any) => {
    useRefetchSession();
    const router = useRouter();
    const [canonicalUrl, setCanonicalUrl] = React.useState("");
    const [userType, setUserType] = useState("");
    const env = React.useContext(RuntimeVarContext);
    const [isGuidedSalesAgentEnabled, setIsGuidedSalesAgentEnabled] = useState(false)
    const [crawlingDisable, setCrawlingDisable] = useState(false);

    React.useEffect(() => {
      if (typeof window !== "undefined") {
        const path = window.location.pathname;
        const canonicalUrl = `${window?.location.origin}${path ? path.split("?")[0] : ""
          }`;
        setCanonicalUrl(canonicalUrl);
        const hostName = window.location.hostname;
        if (hostName !== 'www.stantonoptical.com') {
          setCrawlingDisable(true)
        }
      }
    }, [router.pathname]);

    React.useEffect(() => {
      // load script
      // `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_APP_GOOGLE_CAPTCHA_SITE_KEY}`
      if (env?.NEXT_PUBLIC_RECAPTCHA_ENABLE === "true") {
        const script = document.createElement("script");
        script.src = `https://www.google.com/recaptcha/enterprise.js?render=${process.env.NEXT_PUBLIC_APP_GOOGLE_CAPTCHA_SITE_KEY}`;
        script.async = true;
        document.body.appendChild(script);
        return () => {
          document.body.removeChild(script);
        };
      }
    }, [env?.NEXT_PUBLIC_RECAPTCHA_ENABLE]);

    useEffect(() => {
      const getUserStateCode = async () => {
        const data = await getLatLongForUser() as { lat: any, lng: any };
        if (data?.lat && data?.lng) {
          const state = await getStateCodeForUser(data.lat, data.lng) as any;
          if (state) {
            const guidedSalesEnable = await checkGuidedSalesEnableForState(state) as boolean;
            setIsGuidedSalesAgentEnabled(guidedSalesEnable);
          }
        }
      }
      let sessionData = localStorage.getItem("session") as any;
      sessionData = JSON.parse(sessionData ? sessionData : '{}');
      const userType = sessionData?.user?.authData?.userType;
      if (typeof window !== "undefined" && userType !== USER_TYPE.ASSOCIATE) {
        getUserStateCode();

      } else if (typeof window !== "undefined" && userType === USER_TYPE.ASSOCIATE) {
        setIsGuidedSalesAgentEnabled(true)
      }
    }, [typeof window !== "undefined" && localStorage.getItem("session")])



    return (
      <>
        <Head>
          {crawlingDisable ? (
            <meta name="robots" content="noindex, nofollow" />
          ) :
            <meta name="robots" content="index, follow" />
          }
          <link rel="canonical" href={canonicalUrl} />
        </Head>
        {/* TODO: We will find a generic solution for header footer removal */}
        {pageProps?.support ? (
          <Component {...pageProps} />
        ) : pageProps?.ppc ? (
          <PPCPage {...pageProps} />
        ) : pageProps?.social ? (
          <SocialPage {...pageProps} />
        ) : pageProps?.rxRenewal ? (
          <StartPage {...pageProps} />
        ) : (
          <>
            <SnackBarProvider>
              <HasInHousePxsContextProvider>
                <AppHeader
                  onLogout={() => {
                    setStoreData(null);
                    setIsCDCView(false);
                  }}
                  handleStore={(store: StoreAddressType | null) =>
                    setStoreData(store)
                  }
                  handleCDCView={(view: boolean) => {
                    setIsCDCView(view);
                  }}
                  storeData={storeData}
                  isCDCView={isCDCView}
                  setUserType={setUserType}
                />

                <BackdropLoader openLoader={loading} />
                {env?.NEXT_PUBLIC_GUIDED_SALE_ENABLE === "true" &&
                  guidedSalesPilotOnlyCheck(env?.NEXT_PUBLIC_GUIDED_SALES_PILOT_ONLY_ENABLE) &&
                  isGuidedSalesAgentEnabled && (
                    <GuidedSales userType={userType} env={env} />
                  )}
                <Component {...pageProps} />
                <NextNProgress />
                <Footer />
                <StaticFooter/>
              </HasInHousePxsContextProvider>
            </SnackBarProvider>
          </>
        )}

        <BrandTransitionModal />
      </>
    );
  }
);

ApplicationWrapper.displayName = "ApplicationWrapper";

App.getInitialProps = async (appContext: any) => {
  const initialData = getPublicEnv();

  // Call the page's `getInitialProps` if it exists
  const appProps = await NextApp.getInitialProps(appContext);

  return { ...appProps, initialData };
};
