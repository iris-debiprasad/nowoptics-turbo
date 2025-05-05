import {
  AppEvents,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import axios from "axios";

export async function getDetails() {
  if (localStorage) {
    const sessionDetails = localStorage.getItem("session")
      ? JSON.parse(localStorage.getItem("session") as string)
      : "";
    if (sessionDetails && sessionDetails?.user) {
      if (sessionDetails?.user?.authData?.userType === USER_TYPE.ASSOCIATE) {
        const expires = sessionDetails?.user?.accessTokenExpires;
        if (!isNaN(expires) && parseInt(expires) * 1000 > Date.now()) {
          return sessionDetails.user;
        } else {
          try {
            let resp = await axios.get("/api/auth/session");
            localStorage.setItem("session", JSON.stringify(resp.data));
            return resp.data?.user as any;
          } catch (err) {
            if (typeof window !== undefined) {
              window.dispatchEvent(new Event(AppEvents.LOGOUT));
            }
            return {};
          }
        }
      } else if (
        sessionDetails?.user?.authData?.userType === USER_TYPE.PATIENT
      ) {
        return sessionDetails.user;
      } else {
        return {};
      }
    } else if (localStorage.getItem("auth_status") === "unauthenticate") {
      return null;
    } else {
      localStorage.setItem("auth_status", "unauthenticate");
      return null;
    }
  }
}
