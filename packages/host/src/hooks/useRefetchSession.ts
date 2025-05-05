import { USER_TYPE } from "@/constants/common.constants";
import { getDetails } from "@/utils/getSessionData";
import { useSession } from "next-auth/react";
import { useEffect } from "react";

const useRefetchSession = () => {
  const { data: session, status } = useSession();
  // Polling the session every 1 hour
  const updateSession = async () => {
    await getDetails()
  }
  useEffect(() => {
    let interval: any;
    if (status === "authenticated" && (session as any)?.user?.authData?.userType == USER_TYPE.ASSOCIATE && Date) {
      let timeInterval = 1000 * 60 * 60;
      //Calculate time interval for refetch
      if (session?.user && (session?.user as any).accessTokenExpires) {
        const tokenExpire = (session?.user as any).accessTokenExpires * 1000;
        if (tokenExpire > Date.now()) {
          interval = setInterval(() => {
            updateSession()
          }, tokenExpire - Date.now());
        }
      } else {
        interval = setInterval(() => {
          updateSession()
        }, timeInterval);
      }
    }

    return () => {
      clearInterval(interval);
    };
  }, [status, session]);

  //Updating the session on network change
  useEffect(() => {
    const onlineHandler = () => {
      updateSession()
    };
    window.addEventListener("online", onlineHandler);

    return () => {
      window.removeEventListener("online", onlineHandler);
    };
  }, [status]);

  // Listen for when the page is visible, if the user switches tabs
  // and makes our tab visible again, re-fetch the session
  // TODO: will Remove in future if session api call issue fixed
  // useEffect(() => {
  //   const visibilityHandler = () =>
  //     document.visibilityState === "visible" && navigator.onLine && update();
  //
  //   window.addEventListener("visibilitychange", visibilityHandler, false);
  //   return () =>
  //     window.removeEventListener("visibilitychange", visibilityHandler, false);
  // }, [update]);
};

export default useRefetchSession;