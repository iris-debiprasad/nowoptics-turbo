import { GetCurrentLocation } from "@root/host/src/service/common.service";
import { isMobileDevice } from "./common.utils";

export function getLatLong(
  callback: (lat: number, long: number) => void
): void {
  if (typeof navigator === "undefined") {
    return;
  }

  if ("userAgent" in navigator) {
    if ((navigator.userAgent.includes("Firefox") || navigator.userAgent.includes("Mozilla")) && isMobileDevice()) {
      const locationString = localStorage.getItem("location");
      if (locationString) {
        let location = JSON.parse(locationString) as { longitude: any, latitude: any };
        callback(location.latitude, location.longitude);
      } else {
        GetCurrentLocation().then((resp) => {
          const locationData = resp.data;
          if (locationData) {
            const latitude = locationData.location.lat;
            const longitude = locationData.location.lng;
            callback(latitude, longitude);
          }
        });
      }

    } else {
      if ("geolocation" in navigator && typeof window !== "undefined") {
        const locationString = localStorage.getItem("location");
        if (locationString) {
          let location = JSON.parse(locationString) as { longitude: any, latitude: any };
          callback(location.latitude, location.longitude);
        } else {
          navigator.geolocation.getCurrentPosition((position) => {
            const lat = position.coords.latitude;
            const long = position.coords.longitude;
            callback(lat, long);
          });
        }
      } else {
        localStorage.removeItem("location");
      }

    }

  }


}
