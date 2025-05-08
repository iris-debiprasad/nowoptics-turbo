import { useState, useEffect } from "react";
import css from "./ppc.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import { Box } from "@mui/material";
import { StoreHoursDTO } from "@root/host/src/types/SideBar.types";
import { getWeekday } from "@root/host/src/utils/storeHourFormatter";

export const statesList = {
  al: "alabama",
  ak: "alaska",
  az: "arizona",
  ar: "arkansas",
  ca: "california",
  co: "colorado",
  ct: "connecticut",
  de: "delaware",
  fl: "florida",
  ga: "georgia",
  hi: "hawaii",
  id: "idaho",
  il: "illinois",
  in: "indiana",
  ia: "iowa",
  ks: "kansas",
  ky: "kentucky",
  la: "louisiana",
  me: "maine",
  md: "maryland",
  ma: "massachusets",
  mi: "michigan",
  mn: "minnesota",
  ms: "mississippi",
  mo: "missouri",
  mt: "montana",
  ne: "nebraska",
  nv: "nevada",
  nh: "new hampshire",
  nj: "new jersey",
  nm: "new mexico",
  ny: "new york",
  nc: "north carolina",
  nd: "north dakota",
  oh: "ohio",
  ok: "oklahoma",
  or: "oregon",
  pa: "pennsylvania",
  ri: "rhode island",
  sc: "south carolina",
  sd: "south dakota",
  tn: "tennessee",
  tx: "texas",
  ut: "utah",
  vt: "vermont",
  va: "virginia",
  wa: "washington",
  wv: "west virginia",
  wi: "wisconsin",
  wy: "wyoming",
};

export enum StoreStatuses {
  OPEN = "Open",
  OPENING_SOON = "Opening Soon",
  CLOSED = "Closed",
  TEMPORARLLY_CLOSED = "Temporarily Closed",
  CLOSES_SOON = "Closes Soon",
}

export interface ILatLng {
  lat: number;
  lng: number;
}

export enum PPCTypes {
  BRAND = "brand",
  NOT_BRAND = "not_brand",
  COMPETITOR = "competitor",
}

export interface IStatesObject {
  [key: string]: string;
}

export interface IStore {
  WebDescription: string;
  distance?: number;
  SundayStart: string;
  MondayEnd: string;
  MondayStart: string;
  SundayEnd: string;
  TuesdayStart: string;
  TuesdayEnd: string;
  WednesdayStart: string;
  WednesdayEnd: string;
  ThursdayStart: string;
  ThursdayEnd: string;
  FridayStart: string;
  FridayEnd: string;
  SaturdayStart: string;
  SaturdayEnd: string;
  Latitude: string;
  Longitude: string;
  PosDescription: string;
  AddressLine1: string;
  AddressLine2: string;
  AddressLine3: string;
  City: string;
  State: string;
  PostalCode: string;
  Country: string;
  Phone: string;
  name: string;
  AssociatedStore: string;
  Brand: string;
  CompanyCategory: string;
  County: string;
  MarketingDma: string;
  StoreNumber: string;
  StoreId: string;
  StoreOpeningDate: string;
  StoreType: string;
  Timezone: string;
  phoneNumbers: IPhoneNumber;
  webPath: string;
  speakSpanish: boolean;
  bopis: boolean;
  sunbitUrl: string;
  photoUrl: string;
  photoAlt: string;
  sameDay: boolean;
  storeStatus?: string;
}

export interface IPhoneNumber {
  store_id: string;
  store_web_name: string;
  spd: string;
  spg: string;
}

export interface IHours {
  opensAt: string;
  closesAt: string;
}

export interface IWorkDay {
  name: string;
  abbreviationName?: string;
  hours: IHours | null;
  day?: number;
}

const getHour = (time: string) => {
  return time ? time.substring(0, 5) : null;
};

export enum timeZonesOffsets {
  EST = -5,
  EDT = -4,
  CST = -6,
  CDT = -5,
  MST = -7,
  MDT = -6,
  PST = -8,
  PDT = -7,
}

export enum timeZoneNames {
  AST = "America/Anchorage",
  EST = "America/Indiana/Indianapolis",
  CST = "America/Chicago",
  MST = "America/Denver",
  PST = "America/Los_Angeles",
}

export const getHourWithFormat = (t: string) => {
  const hourAndMinutes: Array<string> = t?.split(":");
  const hour: number = Number(hourAndMinutes[0]);
  let minutes: string = hourAndMinutes[1];
  let time: number = (hour + 24) % 24;
  let mid: string = "AM";

  if (time === 0) {
    //At 00 hours we need to show 12 am
    time = 12;
  } else if (time > 12) {
    time = time % 12;
    mid = "PM";
  } else if (time === 12) {
    mid = "PM";
  }

  if (minutes.length == 1) {
    minutes = "0" + minutes;
  }

  return `${time}:${minutes} ${mid}`;
};

export const getNextWorkDay = (store: IStore, today: number): IWorkDay => {
  const tomorrow = today + 1;
  const nextWorkDay = getWorkDay(store, tomorrow > 6 ? 0 : tomorrow);

  if (!nextWorkDay?.hours && nextWorkDay.abbreviationName) {
    return getNextWorkDay(store, tomorrow);
  }

  return nextWorkDay;
};

export const checkOpen = (
  storeHours: any,
  formattedNowHours: string,
  openAt: any,
  closeAt: any
): boolean => {
  const currentHour = formattedNowHours + ":00";
  const openTime = openAt + ":00";
  const closeTime = closeAt + ":00";

  return storeHours && currentHour >= openTime && currentHour < closeTime;
};

export const checkNearlyClosed = (
  isOpen: any,
  formattedNowHours: string,
  closeAt: any
): boolean => {
  if (isOpen) {
    const currentHour = formattedNowHours + ":00";
    const closeTime = reduceHour(closeAt, 1);

    return closeTime <= currentHour;
  }

  return false;
};

export const checkOpeningSoon = (
  formattedNowHours: string,
  openAt: any,
  closeAt: any
): boolean => {
  const currentHour = formattedNowHours + ":00";
  const openTime = reduceHour(openAt, 1);
  const closeTime = closeAt + ":00";

  return currentHour >= openTime && currentHour < closeTime;
};

export const reduceHour = (hour: string, time: number): string => {
  const splitParts = splitTimeValues(hour);

  return checkDay(parseInt(splitParts[0]) - time) + ":" + splitParts[1] + ":00";
};

export const checkDay = (hour: number): string => {
  if (hour < 10) return "0" + hour;

  return hour.toString();
};

export const splitTimeValues = (time: string): any => {
  return time?.split(":");
};

export const getWorkDay = (store: IStore, dayNumber: number) => {
  let workDay: IWorkDay | null = null;
  let hours: IHours | null = null;
  let opensAt: string | null = "";
  let closesAt: string | null = "";

  switch (dayNumber) {
    case 0:
      opensAt = getHour(store.SundayStart);
      closesAt = getHour(store.SundayEnd);
      hours = opensAt && closesAt ? { opensAt, closesAt } : null;
      workDay = {
        hours,
        abbreviationName: "Sun",
        name: "Sunday",
        day: dayNumber,
      };
      break;
    case 1:
      opensAt = getHour(store.MondayStart);
      closesAt = getHour(store.MondayEnd);
      hours = opensAt && closesAt ? { opensAt, closesAt } : null;
      workDay = {
        hours,
        abbreviationName: "Mon",
        name: "Monday",
        day: dayNumber,
      };
      break;
    case 2:
      opensAt = getHour(store.TuesdayStart);
      closesAt = getHour(store.TuesdayEnd);
      hours = opensAt && closesAt ? { opensAt, closesAt } : null;
      workDay = {
        hours,
        abbreviationName: "Tue",
        name: "Tuesday",
        day: dayNumber,
      };
      break;
    case 3:
      opensAt = getHour(store.WednesdayStart);
      closesAt = getHour(store.WednesdayEnd);
      hours = opensAt && closesAt ? { opensAt, closesAt } : null;
      workDay = {
        hours,
        abbreviationName: "Wed",
        name: "Wednesday",
        day: dayNumber,
      };
      break;
    case 4:
      opensAt = getHour(store.ThursdayStart);
      closesAt = getHour(store.ThursdayEnd);
      hours = opensAt && closesAt ? { opensAt, closesAt } : null;
      workDay = {
        hours,
        abbreviationName: "Thu",
        name: "Thursday",
        day: dayNumber,
      };
      break;
    case 5:
      opensAt = getHour(store.FridayStart);
      closesAt = getHour(store.FridayEnd);
      hours = opensAt && closesAt ? { opensAt, closesAt } : null;
      workDay = {
        hours,
        abbreviationName: "Fri",
        name: "Friday",
        day: dayNumber,
      };
      break;
    case 6:
      opensAt = getHour(store.SaturdayStart);
      closesAt = getHour(store.SaturdayEnd);
      hours = opensAt && closesAt ? { opensAt, closesAt } : null;
      workDay = {
        hours,
        abbreviationName: "Sat",
        name: "Saturday",
        day: dayNumber,
      };
      break;
    default:
      workDay = {
        hours,
        name: "Temporarily closed",
      };
      break;
  }

  return workDay;
};

export const formatPhoneNumber = (phoneNumber: string) => {
  if (phoneNumber) {
    const plainPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    const phoneRegex = /^\(?([0-9]{3})\)?[-. ]?([0-9]{3})[-. ]?([0-9]{4})$/;

    return plainPhoneNumber.replace(phoneRegex, "($1) $2 - $3");
  }
  return "";
};

export const formatPhoneNumberNew = (phoneNumber: string) => {
  if (phoneNumber) {
    const plainPhoneNumber = phoneNumber.replace(/[^\d]/g, "");
    const phoneRegex = /^\(?([0-9]{3})\)?[.]?([0-9]{3})[.]?([0-9]{4})$/;

    return plainPhoneNumber.replace(phoneRegex, "($1) $2-$3");
  }
  return "";
};

export const getPhoneNumberByType = (
  store: IStore,
  type: string | undefined
) => {
  let plainPhoneNumber: string;

  switch (type) {
    case PPCTypes.BRAND:
      plainPhoneNumber = store.phoneNumbers?.spg;
      break;
    case PPCTypes.NOT_BRAND:
      plainPhoneNumber = store.phoneNumbers?.spg;
      break;
    case PPCTypes.COMPETITOR:
      plainPhoneNumber = store.phoneNumbers?.spg;
      break;
    default:
      plainPhoneNumber = store.phoneNumbers?.spg;
      break;
  }
  return formatPhoneNumber(plainPhoneNumber);
};

export const getPlaneNumber = (phoneNumber: string) => {
  return phoneNumber
    .replace("(", "")
    .replace(")", "")
    .replace("-", "")
    .replace(" ", "");
};

export const getDateTimeInTimezone = (timezone: string) => {
  let tz: string | undefined = timezone.match(/\b(\w)/g)?.join("");

  if (timezone.length === 3 && tz?.length === 1) {
    tz = timezone;
  }

  try {
    if (tz) {
      const offset: string = (timeZoneNames as any)[tz];
      const currentDate = new Date();
      const adjustedDate = new Date(
        currentDate.toLocaleString("en-US", { timeZone: offset })
      );
      return adjustedDate;
    }
  } catch (e) {
    console.error("Error to use timeZone", e);
  }

  return new Date();
};

export const getShortState = (longState: string | null) => {
  const states: IStatesObject = statesList;

  if (longState?.length == 2) {
    return longState;
  }

  for (const prop in states) {
    if (states[prop] === longState?.toLowerCase())
      return prop.toLocaleUpperCase();
  }

  return "";
};

export const getNextRadius = (actualRadius: number | undefined) => {
  switch (actualRadius) {
    case 25: {
      return 50;
    }
    case 50: {
      return 100;
    }
    case 100: {
      return 250;
    }
    case 250: {
      return 500;
    }
    case 500: {
      return 750;
    }
    default: {
      return 25;
    }
  }
};

export const getDistanceToStoreLocationB = (
  currentLocation: ILatLng,
  storeLocation: ILatLng
) => {
  if (
    currentLocation.lat == storeLocation.lat &&
    currentLocation.lng == storeLocation.lng
  ) {
    return 0;
  }
  const radLatA: number = (Math.PI * currentLocation.lat) / 180;
  const radLatB: number = (Math.PI * storeLocation.lat) / 180;
  const theta: number = currentLocation.lng - storeLocation.lng;
  const radtheta: number = (Math.PI * theta) / 180;
  let dist: number =
    Math.sin(radLatA) * Math.sin(radLatB) +
    Math.cos(radLatA) * Math.cos(radLatB) * Math.cos(radtheta);
  if (dist > 1) {
    dist = 1;
  }
  dist = Math.acos(dist);
  dist = (dist * 180) / Math.PI;
  dist = dist * 60 * 1.1515;
  return dist;
};

export const getDistanceToStoreB = (
  currentLocation: ILatLng | null,
  storeLocation: ILatLng | null
) => {
  if (currentLocation && storeLocation && process.browser) {
    return getDistanceToStoreLocationB(
      { lat: currentLocation.lat, lng: currentLocation.lng },
      { lat: storeLocation.lat, lng: storeLocation.lng }
    );
  }
  return 0;
};

export const generateMELLink = () => {
  const host = window.location.host;

  if (host.startsWith("staging")) {
    return "https://staging.myeyelab.com";
  }

  if (host.startsWith("uat")) {
    return "https://uat.myeyelab.com";
  }

  if (host.startsWith("localhost")) {
    return `http://localhost:3014`;
  }

  return "https://www.myeyelab.com";
};

export interface IStoreSearch {
  value: IStoreSearchDetail;
}

export interface IStoreSearchDetail {
  search: string;
  stores?: any;
  isBookEyeExam?: boolean;
  lat?: number;
  lng?: number;
  selectedStore?: any;
  sameDay?: boolean;
  setStore?: (store: IStore) => void;
  setTerm?: (term: any) => void;
}

const PPCStoreHours = (props: any) => {
  const [grandOpeningSoon, setGrandOpeningSoon] = useState(false);
  const [showFullHoursList, setShowFullHoursList] = useState(false);
  const [mappedStoreData, setMappedStoreData] = useState<any>();

  useEffect(() => {
    if (
      props.store &&
      new Date(props.store.StoreOpeningDateTime) > new Date() &&
      props.store.StatusCode == "IA"
    ) {
      setGrandOpeningSoon(true);
    }
    if (
      props.store &&
      props.store.WorkingHours &&
      props.store.WorkingHours.length > 0
    ) {
      const mapStoreData: IStore = {
        WebDescription: props.store.WebDescription,
        distance: props.store.Distance,
        SundayStart: props.store.WorkingHours[0]?.OpenAt,
        MondayEnd: props.store.WorkingHours[0]?.CloseAt,
        MondayStart: props.store.WorkingHours[1]?.OpenAt,
        SundayEnd: props.store.WorkingHours[1]?.CloseAt,
        TuesdayStart: props.store.WorkingHours[2]?.OpenAt,
        TuesdayEnd: props.store.WorkingHours[2]?.CloseAt,
        WednesdayStart: props.store.WorkingHours[3]?.OpenAt,
        WednesdayEnd: props.store.WorkingHours[3]?.CloseAt,
        ThursdayStart: props.store.WorkingHours[4]?.OpenAt,
        ThursdayEnd: props.store.WorkingHours[4]?.CloseAt,
        FridayStart: props.store.WorkingHours[5]?.OpenAt,
        FridayEnd: props.store.WorkingHours[5]?.CloseAt,
        SaturdayStart: props.store.WorkingHours[6]?.OpenAt,
        SaturdayEnd: props.store.WorkingHours[6]?.CloseAt,
        Latitude: props.store.Latitude,
        Longitude: props.store.Longitude,
        PosDescription: props.store.WebDescription,
        AddressLine1: props.store.AddressLine1,
        AddressLine2: props.store.AddressLine2,
        AddressLine3: props.store.AddressLine3,
        City: props.store.City,
        State: props.store.StateCode,
        PostalCode: props.store.ZipCode,
        Country: "US",
        Phone: props.store.PhoneNumber[0],
        name: props.store.City,
        AssociatedStore: props.store.WebDescription,
        Brand: props.store.BrandName,
        CompanyCategory: props.store.WebDescription,
        County: "US",
        MarketingDma: "",
        StoreNumber: props.store.StoreNumber,
        StoreId: props.store.Id,
        StoreOpeningDate: props.store.StoreOpeningDateTime,
        StoreType: "",
        storeStatus: props.store.StatusCode,
        Timezone: props.store.TimeZone,
        phoneNumbers: props.store.PhoneNumber,
        webPath: "",
        speakSpanish: false,
        bopis: false,
        sunbitUrl: "",
        photoUrl: "",
        photoAlt: "",
        sameDay: false,
      };
      setMappedStoreData(mapStoreData);
    }
  }, [props.store]);

  const getLabelClassName = (label: string) => {
    let className: string = "";

    switch (label) {
      case StoreStatuses.OPEN:
        className = css.openLabel;
        break;
      case StoreStatuses.OPENING_SOON:
      case StoreStatuses.CLOSES_SOON:
        className = css.openingSoonLabel;
        break;
      default:
        className = css.closedLabel;
        break;
    }

    return className;
  };

  const renderFullHoursList = (currentDay: number) => {
    if (mappedStoreData) {
      return (
        <div
          className={css.hoursListConteiner}
          style={props.containerStyles}
          onClick={() => setShowFullHoursList(false)}
        >
          <Box className={css.hoursContainer}>
            {getWeekday(props.store?.WorkingHours || []).map(
              (storeHours: StoreHoursDTO, key: number) => {
                return (
                  <Box key={key} className={css.hourItem}>
                    <Box className={css.daysColumn}>
                      <p
                        className={
                          new Date().getDay() === key
                            ? css.highlightedDay
                            : css.normalDay
                        }
                      >
                        {storeHours.day}
                      </p>
                    </Box>
                    <Box className={css.hoursColumn}>
                      <p
                        className={`${
                          new Date().getDay() === key
                            ? css.highlightedStatus
                            : css.normalStatus
                        }
                            ${
                              storeHours.status === "CLOSED" &&
                              css.highlightedStatus
                            }`}
                      >
                        {storeHours.status}
                      </p>
                    </Box>
                  </Box>
                );
              }
            )}
          </Box>
          <i className={`${css.closeIcon} fas fa-times`}>
            <IconSVG
              width="14"
              height="14"
              viewBox="0 0 27 27"
              fill="none"
              fillP="#002e6d"
              name="close_icon"
            />
          </i>
        </div>
      );
    }
    return <div />;
  };

  const renderOpeningHours = () => {
    if (mappedStoreData) {
      const now = getDateTimeInTimezone(mappedStoreData.Timezone);
      const today = getWorkDay(mappedStoreData, now.getDay());
      const formattedNowHours = `${now.getHours().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}:${now.getMinutes().toLocaleString("en-US", {
        minimumIntegerDigits: 2,
        useGrouping: false,
      })}`;
      let label: string = "";
      let message: string = "";
      let closes: string = "";

      if (today) {
        ///const isOpen = today.hours && formattedNowHours > today.hours.opensAt && formattedNowHours < today.hours.closesAt
        const isOpen = checkOpen(
          today.hours,
          formattedNowHours,
          today.hours?.opensAt,
          today.hours?.closesAt
        );
        const isNearlyClosed = checkNearlyClosed(
          isOpen,
          formattedNowHours,
          today.hours?.closesAt
        );

        if (isNearlyClosed) {
          closes = today.hours ? today.hours.closesAt : "";
          label = StoreStatuses.CLOSES_SOON;
          message = `${getHourWithFormat(closes)}`;
        } else if (isOpen && today.hours) {
          label = StoreStatuses.OPEN;
          message = `${"Closes"} ${getHourWithFormat(today.hours.closesAt)}`;
        } else {
          if (today.hours) {
            const openingSoon = checkOpeningSoon(
              formattedNowHours,
              today.hours?.opensAt,
              today.hours?.closesAt
            );
            if (openingSoon) {
              label = StoreStatuses.OPENING_SOON;
              message = getHourWithFormat(today.hours.opensAt);
            } else {
              const tooEarly =
                today.hours && formattedNowHours < today.hours.opensAt;
              const nextWorkDay = tooEarly
                ? today
                : getNextWorkDay(mappedStoreData, now.getDay());

              if (nextWorkDay.hours) {
                label = StoreStatuses.CLOSED;
                message = `${"Opens"} ${getHourWithFormat(
                  nextWorkDay?.hours.opensAt
                )} ${tooEarly ? "" : nextWorkDay.name}`;
              } else {
                label = StoreStatuses.TEMPORARLLY_CLOSED;
              }
            }
          } else {
            const nextWorkDay = getNextWorkDay(mappedStoreData, now.getDay());
            if (nextWorkDay.hours) {
              label = StoreStatuses.CLOSED;
              message = `${"Opens"} ${getHourWithFormat(
                nextWorkDay?.hours.opensAt
              )} ${nextWorkDay.name}`;
            }
          }
        }
      }

      return (
        <div className={`${css.marginTopSmall} ${css.mt13}`}>
          {!showFullHoursList && message && (
            <span
              className={`${css.hoursText} ${css.cursorPointer}`}
              onClick={() => setShowFullHoursList(true)}
            >
              <b className={getLabelClassName(label)}>{label}:</b> {message}
              <i className={`${css.hoursIcon} fas fa-caret-down`}>
                <IconSVG
                  width="14"
                  height="14"
                  viewBox="0 0 15 12"
                  fill="none"
                  fillP="#002e6d"
                  name="arrow_down"
                />
              </i>
            </span>
          )}
          {!showFullHoursList && !message && (
            <span className={css.marginTopSmall}>
              <b className={getLabelClassName(label)}>{label}</b>
            </span>
          )}
          {showFullHoursList && renderFullHoursList(now.getDay())}
        </div>
      );
    }
    return <div />;
  };

  return (
    <>
      {!grandOpeningSoon && renderOpeningHours()}
      {grandOpeningSoon && (
        <div className={css.grandOpeningContanier}>
          <IconSVG
            className={css.flagIcon}
            width="20"
            height="16"
            viewBox="0 0 22 16"
            fill="none"
            fillP="#002e6d"
            name="flag_icon"
          />
          <Box className={css.grandOpening}>Grand Opening Soon</Box>
        </div>
      )}
    </>
  );
};

export default PPCStoreHours;
