import React, { useContext, useEffect, useRef, useState } from "react";
import Nav from "../nav/Nav";
import Header from "../header/Header";
import { useSession } from "next-auth/react";
import { StoreAddressType } from "@root/host/src/types/SideBar.types";
import { autoLogoutHandler, isProtectedPath } from "@root/host/src/utils/common.utils";
import useAppIdleTimerAssociate from "@/hooks/useAppIdleTimerAssociate";
import AutologoutModal from "../autoLogoutModal/AutoLogoutModal";
import { AppEvents, USER_TYPE } from "@root/host/src/constants/common.constants";
import { SearchProductsDataDTO } from "@root/host/src/types/Header.types";
import AddSpProductData from "../addSpProductData/AddspProductData";
import { useRouter } from "next/router";
import { useAppSelector } from "@/store/useStore";
import { getDetails } from "@root/host/src/utils/getSessionData";
import useAppIdleTimerPatient from "@/hooks/useAppIdeleTimmerPatient";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";
import StaticMessage from "../header/StaticMessage";

interface Props {
  onLogout: () => void;
  handleStore: (store: StoreAddressType | null) => any;
  handleCDCView: (view: boolean) => void;
  storeData: StoreAddressType | null;
  isCDCView: boolean;
  setUserType: (type: string) => void;
}

const AppHeader = React.memo((props: Props) => {
  const env = useContext(RuntimeVarContext);
  const broadCastChannelRef = useRef<any>();
  const { data, status } = useSession();
  const [session, setSession] = useState<any>(data ? data : null);
  const [showTimerModal, setShowTimerModal] = useState(false);
  const router = useRouter();
  const tabId = useAppSelector((state) => state.cdcView.data.currentTabId);
  const IsAutoLogoutEnabled = useAppSelector(
    (state) => state.userPermission.data.IsAutoLogoutEnabled
  );
  const [spProductData, setSelectedSpProductData] =
    useState<SearchProductsDataDTO>();
  const [showSelectPatientModel, setShowSelectPatientModal] = useState(false);

  const {
    handleResetTimer: handleResetTimerAssociate,
    setAuthStatus: setAuthStatusAssociate,
    showPrompt: showPromptAssociate,
    setShowPrompt: setShowPromptAssociate,
  } = useAppIdleTimerAssociate({
    onPrompt: () => {
      if (
        status === "authenticated" &&
        (data as any)?.user?.authData?.userType === USER_TYPE.ASSOCIATE
      )
        setShowTimerModal(true);
    },
  });

  const {
    handleResetTimer: handleResetTimerPatient,
    setAuthStatus: setAuthStatusPatient,
    showPrompt: showPromptPatient,
    setShowPrompt: setShowPromptPatient,
  } = useAppIdleTimerPatient({
    onPrompt: () => {
      if (
        status === "authenticated" &&
        (data as any)?.user?.authData?.userType === USER_TYPE.PATIENT
      )
        setShowTimerModal(true);
    },
  });

  useEffect(() => {
    if (data) {
      props.setUserType((data as any)?.user?.authData?.userType || "");
      localStorage.setItem("session", JSON.stringify(data));
      setSession(data);
    } else {
      setSession(null);
      props.setUserType("");
    }
  }, [data]);

  const handleLogout = () => {
    window.dispatchEvent(new Event(AppEvents.LOGOUT));
    setShowTimerModal(false);
    if ((data as any)?.user?.authData?.userType === USER_TYPE.ASSOCIATE) {
      handleResetTimerAssociate(false);
    } else if ((data as any)?.user?.authData?.userType === USER_TYPE.PATIENT) {
      handleResetTimerPatient(false);
    }
    broadCastChannelRef.current?.postMessage({
      action: "destroy_session",
      customData: {
        tabId: tabId,
      },
    });
  };

  useEffect(() => {
    window.addEventListener(AppEvents.UPDATE_SESSION, () => {
      getDetails().then((data) => {
        if (data) {
          const session = {
            user: { ...data },
          };
          setSession(session);
        }
      });
    });

    return () => {
      window.removeEventListener(AppEvents.UPDATE_SESSION, () => {});
    };
  }, []);

  //TODO: will add in future if store event listener fails for cross tab redirect
  // const handleSessionChange = () => {
  //   if (isProtectedPath(router.pathname)) {
  //     router.replace("/");
  //   }
  // };

  useEffect(() => {
    // Listen for changes in localStorage
    const handleStorageChange = (event: StorageEvent) => {
      if (event.key === "isLogout" && event.newValue === "true") {
        // Redirect to home page on logout
        router.push("/");
      }
    };

    // Add an event listener for storage changes
    window.addEventListener("storage", handleStorageChange);

    // Clean up the event listener on component unmount
    return () => {
      window.removeEventListener("storage", handleStorageChange);
    };
  }, [router]);

  //Remove local storage if session expire
  useEffect(() => {
    if (
      status === "unauthenticated" &&
      typeof window !== "undefined" &&
      localStorage
    ) {
      autoLogoutHandler();
      handleResetTimerAssociate(false);
      handleResetTimerPatient(false);
      //handleSessionChange();
    }
    if (typeof window !== undefined) {
      localStorage.setItem("auth_status", status);
    }
    if ((data?.user.authData as any)?.userType === USER_TYPE.ASSOCIATE) {
      setAuthStatusAssociate(status);
    } else if ((data?.user.authData as any)?.userType === USER_TYPE.PATIENT) {
      setAuthStatusPatient(status);
    }
  }, [status, data, router]);

  const addShippingProductToCart = (productData: SearchProductsDataDTO) => {
    setSelectedSpProductData(productData);
    setShowSelectPatientModal(true);
  };

  const resetTimerByUserType = () => {
    if ((session?.user.authData as any)?.userType === USER_TYPE.ASSOCIATE) {
      handleResetTimerAssociate(true);
    } else if (
      (session?.user.authData as any)?.userType === USER_TYPE.PATIENT
    ) {
      handleResetTimerPatient(true);
    }
  };

  const resetTimer = () => {
    if ((session?.user.authData as any)?.userType === USER_TYPE.ASSOCIATE) {
      if (!showPromptAssociate) {
        resetTimerByUserType();
        broadCastChannelRef.current?.postMessage({
          action: "reset_timer",
          customData: {
            tabId: tabId,
          },
        });
      }
    } else if (
      (session?.user.authData as any)?.userType === USER_TYPE.PATIENT
    ) {
      if (!showPromptPatient) {
        resetTimerByUserType();
        broadCastChannelRef.current?.postMessage({
          action: "reset_timer",
          customData: {
            tabId: tabId,
          },
        });
      }
    }
  };

  useEffect(() => {
    let isThrottled = false;
    const throttleDelay = 500; // in milliseconds
    const throttledResetTimer = () => {
      if (!isThrottled) {
        resetTimer();
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleDelay);
      }
    };

    if (typeof window !== undefined) {
      broadCastChannelRef.current = new BroadcastChannel("message_channel");
      broadCastChannelRef.current.onmessage = (event: any) => {
        const action = event.data?.action;
        const incomingTabId = event.data?.customData?.tabId;
        if (incomingTabId !== tabId) {
          if (action === "continue_session") {
            setShowTimerModal(false);
            resetTimerByUserType();
          } else if (action === "destroy_session") {
            window.dispatchEvent(new Event(AppEvents.LOGOUT));
            setShowTimerModal(false);
            resetTimerByUserType();
          } else if (action === "reset_timer") {
            resetTimerByUserType();
          }
        }
      };

      if (
        env?.NEXT_PUBLIC_AUTO_LOGOUT_ENABLE === "true" &&
        IsAutoLogoutEnabled &&
        (session?.user.authData as any)?.userType === USER_TYPE.ASSOCIATE
      ) {
        window.addEventListener("keypress", resetTimer);
        window.addEventListener("mousemove", throttledResetTimer);
      } else if (
        (session?.user.authData as any)?.userType === USER_TYPE.PATIENT &&
        env?.NEXT_PUBLIC_PATIENT_AUTO_LOGOUT_ENABLE === "true"
      ) {
        window.addEventListener("keypress", resetTimer);
        window.addEventListener("mousemove", throttledResetTimer);
      }

      navigator.permissions
        .query({ name: "geolocation" })
        .then((resp) => {
          if (resp.state === "denied") {
            localStorage.removeItem("location");
          }
        })
        .catch((err) => {
          localStorage.removeItem("location");
        });
    }

    return () => {
      window.removeEventListener("keypress", resetTimer);
      window.removeEventListener("mousemove", throttledResetTimer);
      broadCastChannelRef.current.close();
    };
  }, [
    tabId,
    showPromptAssociate,
    session,
    IsAutoLogoutEnabled,
    showPromptPatient,
  ]);

  return (
    <>
      {(session?.user.authData as any)?.userType !== USER_TYPE.ASSOCIATE && (
        <StaticMessage />
      )}
      <div style={{ position: "sticky", top: "0", zIndex: "200" }}>
        <Header
          roleType={
            session?.user.authData
              ? (session?.user.authData as any).userType
              : null
          }
          storeData={props.storeData}
          isCDCView={props.isCDCView}
          session={session}
          addShippingProductToCart={addShippingProductToCart}
        />
        <Nav
          onLogout={props.onLogout}
          handleStore={props.handleStore}
          handleCDCView={props.handleCDCView}
          session={session}
          sessionStatus={status}
          setShowTimerModal={setShowTimerModal}
          showTimerModal={showTimerModal}
        />
      </div>
      {showTimerModal && (
        <AutologoutModal
          showAutoLogoutModal={showTimerModal}
          hideAutoLogoutModal={setShowTimerModal}
          userType={(data as any)?.user?.authData?.userType}
          handleLogout={handleLogout}
          cancelLogout={() => {
            setShowTimerModal(false);
            if (
              (data as any)?.user?.authData?.userType === USER_TYPE.ASSOCIATE
            ) {
              handleResetTimerAssociate(true);
              setShowPromptAssociate(false);
            } else if (
              (data as any)?.user?.authData?.userType === USER_TYPE.PATIENT
            ) {
              handleResetTimerPatient(true);
              setShowPromptPatient(false);
            }

            broadCastChannelRef.current?.postMessage({
              action: "continue_session",
              customData: {
                tabId: tabId,
              },
            });
          }}
        />
      )}
      {showSelectPatientModel && (
        <AddSpProductData
          isVisible={showSelectPatientModel}
          handleClose={() => {
            setShowSelectPatientModal(false);
          }}
          spProductData={spProductData!}
        />
      )}
    </>
  );
});

AppHeader.displayName = "AppHeader";

export default AppHeader;
