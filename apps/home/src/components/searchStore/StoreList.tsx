import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AlertColor,
  Box,
  Button,
  Divider,
  Grid,
  Skeleton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";

import style from "./StoreList.module.scss";

import { AllLocationDTO } from "@root/home/src/types/searchPage.types";
import { BreadcrumbProps } from "@root/host/src/types/Breadcrumb.types";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { Props as MapDTO } from "@root/host/src/types/Map.type";
import {
  LocationDTO,
  StoreAddressType,
  StoreDetailsDTO,
  StoreHoursDTO,
} from "@root/host/src/types/SideBar.types";

import {
  AppEvents,
  APPOINTMENT_SELECT_STORE_ACTION,
  BRAND,
  DATE_FORMAT,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
  validLocationInputPattern,
  weekdays,
} from "../../../../host/src/constants/common.constants";

import {
  GetAuthenticatedStoreLocatorGrid,
  GetPublicStoreLocatorGrid,
} from "@/service/storeLocator.service";

import { useSnackBar } from "@root/home/src/contexts/Snackbar/SnackbarContext";
import { getDetails } from "../../../../host/src/utils/getSessionData";

import storeHours from "@root/assets/Images/icons/storeHours.svg";
import { IShowBrandStore } from "@root/host/src/components/showBrandStore/ShowBrandStore";
import { GA_TAG_EVENTS } from "@root/host/src/constants/google-analytics.constants";
import { STORE_ERROR_MESSAGE } from "@root/host/src/constants/store.constants";
import useNonInitialEffect from "@root/host/src/hooks/useNonInitialEffect";
import i18n from "@root/host/src/language/i18n";
import {
  GetCurrentLocation,
  GetGeoLocationData,
} from "@root/host/src/service/common.service";
import { getStoreWorkingHour } from "@root/host/src/service/storeLocator.service";
import {
  bookEyeExamHandler,
  checkBrand,
  isMobileDevice,
  stringToSlug,
} from "@root/host/src/utils/common.utils";
import AddGTMEvent from "@root/host/src/utils/gtmEvent";
import { getWeekday } from "@root/host/src/utils/storeHourFormatter";
import { timezoneConverter } from "@root/host/src/utils/timezone.utils";
import useLocationPermission from "@root/host/src/hooks/useLocationPermission";
import earthIcon from "@root/assets/Images/icons/earth.svg";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import { FAQ } from "./Faq";
import { IMask } from "react-imask";
import { useAppSelector } from "@root/host/src/store/useStore";
import { getLatLong } from "@root/host/src/utils/getLocation.utils";

export const links = [
  { label: "Home", href: "/" },
  { label: "Search", href: "/" },
];

const Breadcrumb = dynamic(() => import("Host/Breadcrumb"), {
  ssr: false,
}) as FunctionComponent<BreadcrumbProps>;

const CustomMap = dynamic(() => import("Host/Custommap"), {
  ssr: false,
}) as FunctionComponent<MapDTO>;

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

const ShowBrandStore = dynamic(() => import("Host/ShowBrandStore"), {
  ssr: false,
}) as FunctionComponent<IShowBrandStore>;

const RemoteStoreSkeleton = dynamic(() => import("Host/StoreSkeleton"), {
  ssr: false,
}) as FunctionComponent<any>;

const RemoteStoreTiming = dynamic(() => import("Host/StoreTiming"), {
  ssr: false,
}) as FunctionComponent<any>;

interface Location {
  lat: number;
  lng: number;
}

interface IStoreList {
  brand: string;
}

const StoreList = ({ brand }: IStoreList) => {
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const isLocationAllowed = useLocationPermission();
  const search = router?.query?.q ? (router?.query?.q as string) : "";
  const [isSearchFound, setIsSearchFound] = useState(Boolean(search));
  const [allStoreData, setAllStoreData] = useState<StoreAddressType[]>([]);
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);

  const [allLocation, setAllLocation] = useState<AllLocationDTO[]>([]);
  const [userLocation, setUserLocation] = useState<LocationDTO | null>(null);
  const [lookupStr, setLookupStr] = useState<string>(search);
  const [pressBckSpace, setPressBckSpace] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [role, setRole] = useState<string | null>(null);
  const [locationTrigger, setLocationTrigger] = useState(false);
  const [searchedText, setSearchedText] = useState<string>("");
  const [homeLocation, setHomeLocation] = useState<LocationDTO | null>(null);
  const [isLoaderFirst, setIsLoaderFirst] = React.useState(false);
  const [alignment, setAlignment] = React.useState("");
  const [loading, setLoading] = useState(false);
  const [isPageReady, setIsPageReady] = useState(false);
  const [isMapLoader, setIsMapLoader] = React.useState(false);
  const [hours, setHours] = React.useState<any>([]);
  const [brandName, setBrandName] = React.useState<string>("");
  const [fetchingGeoLocation, setFetchingGeoLocation] = useState(true);
  const [useMyCurrentLocationClicked, setUseMyCurrentLocationClicked] = useState(false);
  // Memoize the `memoizedLocation` object to ensure stability
  const memoizedLocation = useMemo(() => userLocation, [userLocation?.latitude, userLocation?.longitude]);
  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });
  const getMaskedPhoneNumber = (phoneNumber: string) => {
    maskedMobile.resolve(phoneNumber);
    return maskedMobile.value;
  };
  const getPrimaryPhoneNumber = (
    phoneNumbers: {
      PhoneNumber: string;
      Type: string;
    }[]
  ) => {
    const primaryPhoneNumber = phoneNumbers.find(
      (phoneNumber) => phoneNumber.Type === "Primary"
    );
    if (primaryPhoneNumber) {
      return getMaskedPhoneNumber(primaryPhoneNumber.PhoneNumber);
    } else return "";
  };

  useEffect(() => {
    setSearchedText(search);
    setUseMyCurrentLocationClicked(false);
    setLookupStr(search);
    setPageNumber(1);
  }, [search]);

  useEffect(() => {
    setBrandName(checkBrand());
  }, []);

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    getStoreGridData(1, lookupStr || "", newAlignment); // Pass 1 because we need the search result starting from 1st page
    setPageNumber(1); // Reset page number to 1
    setAlignment(newAlignment);
    setIsLoaderFirst(true);
  };

  async function getLatLngFromAreaName(
    areaName: string
  ): Promise<Location | null> {
    try {
      let zipCode = areaName;
      if (areaName.length > 5) {
        zipCode = `${areaName.slice(0, 5)}-${areaName.slice(
          5,
          areaName.length
        )}`;
      }
      const response = await GetGeoLocationData(zipCode);

      if (response.data.results.length > 0) {
        const location = response.data.results[0].geometry.location;
        return {
          lat: location.lat,
          lng: location.lng,
        };
      } else {
        return null; // Location not found
      }
    } catch (error) {
      console.error("Error fetching location data:", error);
      return null;
    }
  }

  const updateLocationData = (
    location: Location | any,
    storeSearchData: any,
    page: number
  ): Promise<void> => {
    return new Promise<void>((resolve) => {
      let homeLocation: any = null;
      if (location) {
        setHomeLocation({
          latitude: location.lat,
          longitude: location.lng,
        });
        homeLocation = {
          id: 102,
          name: lookupStr,
          coordinates: {
            lat: location?.lat || 0,
            lng: location?.lng || 0,
          },
          showIcon: true,
        };
      }

      const locationData = storeSearchData.Result.Results.map(
        (store: StoreAddressType) => ({
          id: store.Id,
          name: store?.WebDescription || "",
          coordinates: {
            lat: store.Latitude || 0,
            lng: store.Longitude || 0,
          },
        })
      );

      const temp = page > 1 ? [...allLocation, ...locationData] : locationData;
      if (homeLocation) {
        temp.unshift(homeLocation);
      }
      setAllLocation(temp);
      const responseData = storeSearchData.Result.Results.length
        ? storeSearchData.Result.Results
        : [];
      setPageSize(storeSearchData.Result.PageCount);
      if (!responseData.length) {
        setIsSearchFound(false);
      }
      resolve();
    });
  };

  const getWorkingHour = (storeId: number) => {
    return getStoreWorkingHour(storeId.toString(), dayjs().format(DATE_FORMAT))
      .then(({ data }) => {
        if (data?.Result) {
          return data.Result;
        } else {
          return [];
        }
      })
      .catch((err) => {
        return [];
      });
  };
  useEffect(() => {
    if (allStoreData.length) {
      setIsMapLoader(true);
      const fetchWorkingHours = async () => {
        const arr = await Promise.all(
          allStoreData.map(async (storeAddress) => {
            const res = await getWorkingHour(storeAddress.Id);
            const temp = getWeekday(res);
            return {
              id: storeAddress.Id,
              hours: temp,
            };
          })
        );

        setHours((prevHours: any) =>
          pageNumber > 1 ? [...prevHours, ...arr] : arr
        );
        setIsMapLoader(false);
      };

      fetchWorkingHours();
    }
  }, [allStoreData]);

  const getStoreGridData = async (
    page: number,
    searchTerm?: string,
    filter?: string,
    sort?: boolean,
    locationClicked?: boolean
  ) => {
    const lat = memoizedLocation ? memoizedLocation?.latitude.toString() : undefined;
    const long = memoizedLocation ? memoizedLocation?.longitude.toString() : undefined;
    const brandName = role === USER_TYPE.ASSOCIATE ? filter : undefined;
    const storeGrid =
      role === USER_TYPE.ASSOCIATE
        ? GetAuthenticatedStoreLocatorGrid
        : GetPublicStoreLocatorGrid;
    if (searchTerm) {
      setLoading(true);
      let location: any = null;
      getLatLngFromAreaName(searchTerm)
        .then((resp1) => {
          location = resp1;
          return storeGrid(
            page.toString(),
            searchTerm,
            brandName,
            location ? location.lat.toString() : lat,
            location ? location.lng.toString() : long,
            sort
          );
        })
        .then((resp2) => {
          const storeSearchData = resp2.data;
          const responseData = storeSearchData.Result.Results.length
            ? storeSearchData.Result.Results
            : [];
          setAllStoreData(
            page > 1 ? [...allStoreData, ...responseData] : responseData
          );
          setPageSize(storeSearchData.Result.PageCount);
          return updateLocationData(location, storeSearchData, page);
        })
        .then(() => {
          setLoading(false);
          setIsLoaderFirst(false);
        })
        .catch((err) => {
          showSnackBar(
            err.message
              ? err.message
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
          setLoading(false);
          setIsLoaderFirst(false);
        });
    } else {
      setLoading(true);
      const storeGrid =
        role === USER_TYPE.ASSOCIATE
          ? GetAuthenticatedStoreLocatorGrid
          : GetPublicStoreLocatorGrid;
      storeGrid(page.toString(), searchTerm, brandName, lat, long, sort)
        .then(({ data }) => {
          const locationData = data.Result.Results.map(
            (store: StoreAddressType) => ({
              id: store.Id,
              name: store?.WebDescription || "",
              coordinates: {
                lat: store.Latitude || 0,
                lng: store.Longitude || 0,
              },
            })
          );

          const temp =
            page > 1 ? [...allLocation, ...locationData] : locationData;
          setHomeLocation(memoizedLocation);
          if (!locationClicked) {
            temp.push({
              id: 102,
              name: "Your Location",
              coordinates: {
                lat: memoizedLocation?.latitude,

                lng: memoizedLocation?.longitude,
              },
              showIcon: true,
            });
          } else {
            temp.unshift({
              id: 102,
              name: "Your Location",
              coordinates: {
                lat: memoizedLocation?.latitude,
                lng: memoizedLocation?.longitude,
              },
              showIcon: true,
            });
          }

          setAllLocation(temp);

          const responseData = data.Result.Results.length
            ? data.Result.Results
            : [];
          setAllStoreData(
            page > 1 ? [...allStoreData, ...responseData] : responseData
          );

          setPageSize(data.Result.PageCount);
          if (!responseData.length) {
            setIsSearchFound(false);
          }
        })
        .catch((err) => {
          showSnackBar(
            err.message
              ? err.message
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        })
        .finally(() => {
          setLoading(false);
          setIsLoaderFirst(false);
        });
    }
  };

  function lookupOnClearHandler(event: React.KeyboardEvent) {
    if (event.key === "Backspace" && lookupStr.length <= 1) {
      setPressBckSpace(!pressBckSpace);
      setLookupStr("");
    }
  }

  function lookupOnClickHandler() {
    if (lookupStr && validLocationInputPattern.test(lookupStr)) {
      setPageNumber(1); // Reset page number to 1
      setLocationTrigger(false);
      setSearchedText(lookupStr);
      setUseMyCurrentLocationClicked(false)
    } else {
      showSnackBar(
        "Please enter a valid city, state or zip code",
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
  }

  function getUserData() {
    return getDetails().then(function (data) {
      setRole(data?.authData?.userType ? data?.authData?.userType : null);
    });
  }
  useEffect(() => {
    getUserData();
  }, []);

  const handleLoadMore = () => {
    if (pageSize > pageNumber) {
      const brandName = role === USER_TYPE.ASSOCIATE ? alignment : undefined;
      getStoreGridData(pageNumber + 1, searchedText, brandName);
      setPageNumber(pageNumber + 1);
    }
  };

  const getGeoLocationFromAPI = () => {
    GetCurrentLocation().then((resp) => {
      const locationData = resp.data;
      if (locationData) {
        setUserLocation({
          latitude: locationData.location.lat,
          longitude: locationData.location.lng,
        });
        setFetchingGeoLocation(false);
      }
    });
  };

  useEffect(() => {
    if (navigator.geolocation) {
      setIsPageReady(true);
      if ((navigator.userAgent.includes("Firefox") || navigator.userAgent.includes("Mozilla")) && isMobileDevice() ) {
        getLatLong((lat, long) => {
           setUserLocation({
              latitude: lat,
              longitude: long,
            });
            setFetchingGeoLocation(false);
        })
      } else {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
            setFetchingGeoLocation(false);
          },
          (error) => {
            if (!isLocationAllowed) {
              setUserLocation(null);
              setFetchingGeoLocation(false);
            } else {
              getGeoLocationFromAPI();
            }
          },
          {
            enableHighAccuracy: true,
            timeout: 10000,
            maximumAge: 0,
          }
        );
      }
   

    } else {
      setUserLocation(null);
      setFetchingGeoLocation(false)
    }
  }, [isLocationAllowed, search]);

  const handleBookAppointment = (
    event: React.MouseEvent<Element, MouseEvent>,
    store: StoreAddressType
  ) => {
    router.push(
      {
        pathname: `/appointments}`,
        query: {
          actionType: APPOINTMENT_SELECT_STORE_ACTION.CREATE,
          storeIdToLoad: store?.Id,
        },
      },
      `/appointments/`
    );
  };

  useEffect(() => {
    setIsSearchFound(Boolean(search));
  }, [search]);

  useNonInitialEffect(() => {
    const brandName = role === USER_TYPE.ASSOCIATE ? alignment : undefined;
    if (!fetchingGeoLocation) {
      if ((memoizedLocation || searchedText)) {
        setIsPageReady(true);
        searchedText && setIsLoaderFirst(true);
        if(useMyCurrentLocationClicked){
          getStoreGridData(1, "", brandName, false, true);
         } else {
          setUseMyCurrentLocationClicked(false)
          getStoreGridData(pageNumber, searchedText, brandName);
        }
      }
    }
  }, [isSearchFound,
    pressBckSpace,
    role,
    searchedText,
    memoizedLocation,
    fetchingGeoLocation,
    useMyCurrentLocationClicked]);


  return (
    <div>
      <div className={style.storeListWrapper}>
        <Box ml={-2}>
          <Breadcrumb links={links} />
        </Box>
        <Box id="header" pb={4}>
          {search && !isSearchFound && !allStoreData.length ? (
            <>
              <Box className={style.noStoreFoundTxt}>No stores found</Box>
              <Box className={style.noStoreFoundSupportTxt}>
                {i18n.t("SCHEDULE_EXAM.SORRY_THERE_ARE_NO_STORES")} &quot;
                {lookupStr}&quot;. <br />
                {i18n.t("SCHEDULE_EXAM.PLEASE_MODIFY_YOUR_SEARCH")}
              </Box>
            </>
          ) : locationTrigger || searchedText ? (
            <Box className={style.areaName} component={"h1"}>
              {allStoreData.length > 1
                ? brandName
                  ? brandName === BRAND.SO
                    ? i18n.t("SCHEDULE_EXAM.SO_STORES_AT")
                    : i18n.t("SCHEDULE_EXAM.MEL_STORES_AT")
                  : ""
                : brandName
                ? brandName === BRAND.SO
                  ? i18n.t("SCHEDULE_EXAM.SO_STORE_AT")
                  : i18n.t("SCHEDULE_EXAM.MEL_STORE_AT")
                : ""}
              &nbsp;
              {locationTrigger
                ? i18n.t("SCHEDULE_EXAM.YOUR_LOCATION")
                : searchedText}
            </Box>
          ) : (
            <Box className={style.areaName} component={"h1"}>
              {brandName ? (
                brandName === BRAND.SO ? (
                  i18n.t("SCHEDULE_EXAM.SO_STORES")
                ) : (
                  i18n.t("SCHEDULE_EXAM.MEL_STORES")
                )
              ) : (
                <></>
              )}
            </Box>
          )}
          <Box className={style.searchPageContainer}>
            <Box id="left-side-wrapper" className={style.storeWrapper}>
              {!isSearchFound ? (
                <Box className={style.searchHelper}>
                  Discover Stanton Optical store locations near you with ease.
                  Input your zip code, city, or state in the given search box
                  and schedule your eye exam online.
                </Box>
              ) : null}

              {!isSearchFound ? (
                <>
                  <Tooltip
                    title={
                      memoizedLocation === null ? (
                        <Typography component={"h5"}>
                          {i18n.t("SCHEDULE_EXAM.PLEASE_ALLOW_LOCATION")}
                        </Typography>
                      ) : null
                    }
                  >
                    <Button
                      className={`${style.lookup} ${
                        memoizedLocation === null
                          ? style.lookupDisable
                          : style.lookupAllow
                      }`}
                      onClick={() => {
                        if (memoizedLocation !== null && !useMyCurrentLocationClicked) {
                          setUseMyCurrentLocationClicked(true)
                          setLocationTrigger(true);
                          setSearchedText("");
                          setLookupStr("");
                          setIsLoaderFirst(true);
                        }
                      }}
                    >
                      <IconSVG
                        width="18"
                        height="24"
                        viewBox="0 0 18 24"
                        fill="none"
                        fillP="#7B7E7B"
                        name="location_pointer_icon"
                      />
                      <Box
                        data-testid="location-header"
                        className={style.useMyCurrLoc}
                      >
                        {i18n.t("SCHEDULE_EXAM.USE_MY_CURRENT")}
                      </Box>
                    </Button>
                  </Tooltip>
                  <Box className={style.lookupSearch}>
                    <TextField
                      id="outlined-basic"
                      placeholder={i18n.t("SCHEDULE_EXAM.ENTER_CITY_STATE_ZIP")}
                      onKeyDown={lookupOnClearHandler}
                      onChange={(e) => {
                        setLookupStr(e.target.value);
                        if (e.target.value === "") {
                          setLookupStr("");
                          setPressBckSpace(!pressBckSpace);
                        }
                      }}
                      variant="outlined"
                      className={style.lookupTxt}
                      value={lookupStr}
                    />
                    <Button
                      variant="contained"
                      className={style.lookupBtn}
                      onClick={lookupOnClickHandler}
                      id="lookup"
                    >
                      Look Up
                    </Button>
                  </Box>
                </>
              ) : (
                <Box className={style.storeNumber}>
                  {!loading && (
                    <>
                      {allStoreData.length}&nbsp;
                      {allStoreData.length > 1
                        ? i18n.t("SCHEDULE_EXAM.STORES_NEAR")
                        : i18n.t("SCHEDULE_EXAM.STORE_NEAR")}
                    </>
                  )}
                </Box>
              )}
              {/* TODO - Need to be verify from the BE   */}
              {role === USER_TYPE.ASSOCIATE ? (
                <>
                  <Divider />
                  <Box className={style.toggleButtonWrapper}>
                    <ToggleButtonGroup
                      value={alignment}
                      exclusive
                      onChange={handleChange}
                    >
                      <ToggleButton className={style.toggleBtn} value="SO">
                        SO
                      </ToggleButton>
                      <ToggleButton className={style.toggleBtn} value="MEL">
                        MEL
                      </ToggleButton>
                    </ToggleButtonGroup>
                  </Box>
                </>
              ) : null}
              <Box>
                {!isLoaderFirst && allStoreData.length > 0 ? (
                  allStoreData.map((storeAddress, key) => {
                    const storeHour =
                      hours.find((item: any) => item.id === storeAddress.Id)
                        ?.hours || [];
                    let statusMessage = "Closed";
                    if (
                      storeAddress.CloseAt &&
                      storeAddress.OpenAt &&
                      storeAddress.TimeZoneCode
                    ) {
                      const storeTimezone = timezoneConverter(
                        storeAddress.TimeZoneCode
                      );

                      const closeTimeParts = storeAddress.CloseAt.split(":");
                      const openTimeParts = storeAddress.OpenAt.split(":");

                      const currentTime = new Date();

                      const options = { timeZone: storeTimezone };
                      const currentTimeInStoreTimezone = new Date(
                        currentTime.toLocaleString("en-US", options)
                      );

                      const currentDay = currentTimeInStoreTimezone.getDay();

                      const openTime = new Date();
                      openTime.setHours(
                        parseInt(openTimeParts[0], 10),
                        parseInt(openTimeParts[1], 10),
                        parseInt(openTimeParts[2], 10)
                      );
                      openTime.toLocaleString("en-US", options);

                      const closeTime = new Date();
                      closeTime.setHours(
                        parseInt(closeTimeParts[0], 10),
                        parseInt(closeTimeParts[1], 10),
                        parseInt(closeTimeParts[2], 10)
                      );
                      closeTime.toLocaleString("en-US", options);

                      if (
                        storeHour[currentDay] &&
                        storeHour[currentDay].status !== "CLOSED"
                      ) {
                        if (
                          currentTimeInStoreTimezone >= openTime &&
                          currentTimeInStoreTimezone <= closeTime
                        ) {
                          const formattedTime = new Date(
                            `2024-01-01T${storeAddress?.CloseAt}`
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          });
                          statusMessage = `${i18n.t(
                            "SCHEDULE_EXAM.OPEN_CLOSE"
                          )} ${formattedTime}`;
                        } else {
                          const formattedTime = new Date(
                            `2024-01-01T${storeAddress?.OpenAt}`
                          ).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          });
                          statusMessage = `${i18n.t(
                            "SCHEDULE_EXAM.CLOSE_OPEN"
                          )} ${formattedTime}`;
                        }
                      }
                    }
                    return (
                      <div key={storeAddress.Id}>
                        <Grid
                          container
                          className={style.yourClosestStoreContainer}
                        >
                          <Grid item xs={12} sm={6} md={12} lg={6}>
                            <Box className={style.defaultAddressContainer}>
                              <Box className={style.defaultAddressOrder}>
                                {key + 1}
                              </Box>
                              <Box sx={{ width: "100%" }}>
                                <h2 className={style.defaultAddressHeading}>
                                  {storeAddress?.WebDescription || ""}{" "}
                                  <ShowBrandStore
                                    optionBrandName={storeAddress?.BrandName}
                                    fontSize={12}
                                    brandProp={brand}
                                  />
                                </h2>
                                {(
                                  new Date(
                                    storeAddress.StoreOpeningDateTime || ""
                                  ) > new Date()
                                ) ? (
                                  <Box
                                    className={style.defaultAddressSameDay}
                                    sx={{ my: "22px" }}
                                  >
                                    <IconSVG
                                      className={style.flagIcon}
                                      width="20"
                                      height="16"
                                      viewBox="0 0 22 16"
                                      fill="none"
                                      fillP="#002e6d"
                                      name="flag_icon"
                                    />
                                    <Box className={style.grandOpening}>
                                      Grand Opening Soon
                                    </Box>
                                  </Box>
                                ) : (
                                  <Box className={style.defaultAddressTiming}>
                                    {statusMessage}
                                  </Box>
                                )}
                                <Box>
                                  {storeAddress.Distance ? (
                                    <Button
                                      className={style.directionbtn}
                                      size="small"
                                      variant="outlined"
                                      onClick={() => {
                                        const startLocation = `${homeLocation?.latitude},${homeLocation?.longitude}`;
                                        const targetLocation = `${storeAddress?.Latitude},${storeAddress?.Longitude}`;
                                        const url = `https://www.google.com/maps/dir/?api=1&origin=${startLocation}&destination=${targetLocation}`;
                                        window.open(url, "_blank");
                                      }}
                                      endIcon={
                                        <IconSVG
                                          width="15"
                                          height="15"
                                          viewBox="0 0 15 15"
                                          fill="none"
                                          fillP="#000000"
                                          name="direction_icon"
                                        />
                                      }
                                    >
                                      {i18n.t("SCHEDULE_EXAM.GET_DIRECTIONS")}
                                    </Button>
                                  ) : null}
                                </Box>
                                <Box className={style.defaultAddressDetails}>
                                  <Box>{storeAddress.AddressLine1}</Box>
                                  <Box>
                                    {storeAddress.City},&nbsp;
                                    {storeAddress.StateCode}&nbsp;
                                    {storeAddress.ZipCode}
                                  </Box>

                                  {storeAddress?.PhoneNumber &&
                                  storeAddress?.PhoneNumber.length ? (
                                    <Box>
                                      {getPrimaryPhoneNumber(
                                        storeAddress?.PhoneNumber
                                      )}
                                    </Box>
                                  ) : null}
                                </Box>{" "}
                                <Box
                                  sx={{
                                    display: "flex",
                                    gap: "10px",
                                  }}
                                >
                                  {storeAddress.HasSameDayDelivery ? (
                                    <Box
                                      className={style.defaultAddressSameDay}
                                    >
                                      <IconSVG
                                        width="20"
                                        height="16"
                                        viewBox="0 0 22 16"
                                        fill="none"
                                        fillP="#7B7E7B"
                                        name="sameDay_delivery_icon"
                                      />
                                      <Box>
                                        &nbsp;
                                        {i18n.t(
                                          "SCHEDULE_EXAM.SAVE_DAY_SERVICE"
                                        )}
                                      </Box>
                                    </Box>
                                  ) : null}
                                  {storeAddress?.LocationPageName ? (
                                    <Box
                                      className={style.showDetailsBtn}
                                      sx={{
                                        display: {
                                          xs: "block",
                                          sm: "none",
                                          md: "block",
                                          lg: "none",
                                        },
                                      }}
                                    >
                                      <Link
                                        href={`/locations/${stringToSlug(
                                          storeAddress.LocationPageName as string
                                        )}`}
                                        passHref
                                        onClick={() => {
                                          AddGTMEvent({
                                            event:
                                              GA_TAG_EVENTS.GOOGLE_MAP_API_CALL,
                                            [GA_TAG_EVENTS.MAPS_API_SEARCH_ORIGIN]:
                                              "header",
                                            [GA_TAG_EVENTS.MAPS_API_SEARCH_TERM]:
                                              storeAddress.WebDescription,
                                          });
                                        }}
                                      >
                                        <div
                                          role="button"
                                          aria-label="Show Details"
                                          tabIndex={0}
                                          className={style.storeLink}
                                        >
                                          {i18n.t(
                                            "SCHEDULE_EXAM.STORE_DETAILS"
                                          )}
                                        </div>
                                      </Link>
                                    </Box>
                                  ) : null}
                                </Box>
                                {storeAddress.IsSpeakSpanish && (
                                  <Box
                                    sx={{
                                      mt: "10px",
                                      display: "flex",
                                      alignItems: "center",
                                    }}
                                  >
                                    <Box mt={0.5} mr={1}>
                                      <Image
                                        src={earthIcon}
                                        height={16}
                                        width={16}
                                        alt="Earth icon"
                                      />
                                    </Box>
                                    <Box>Hablamos Español</Box>
                                  </Box>
                                )}
                                {storeAddress?.LocationPageName ? (
                                  <Box
                                    className={style.showDetailsBtn}
                                    sx={{
                                      display: {
                                        xs: "none",
                                        sm: "block",
                                        md: "none",
                                        lg: "block",
                                      },
                                    }}
                                  >
                                    <Link
                                      href={`/locations/${stringToSlug(
                                        storeAddress.LocationPageName as string
                                      )}`}
                                      passHref
                                      onClick={() => {
                                        AddGTMEvent({
                                          event:
                                            GA_TAG_EVENTS.GOOGLE_MAP_API_CALL,
                                          [GA_TAG_EVENTS.MAPS_API_SEARCH_ORIGIN]:
                                            "header",
                                          [GA_TAG_EVENTS.MAPS_API_SEARCH_TERM]:
                                            storeAddress.WebDescription,
                                        });
                                      }}
                                    >
                                      <div
                                        role="button"
                                        aria-label="Show Details"
                                        tabIndex={0}
                                        className={style.storeLink}
                                      >
                                        {i18n.t("SCHEDULE_EXAM.STORE_DETAILS")}
                                      </div>
                                    </Link>
                                  </Box>
                                ) : null}
                                {storeAddress.IsOnSiteDoctorAvailable &&
                                role === USER_TYPE.ASSOCIATE ? (
                                  <Box
                                    mt={2}
                                    className={style.defaultAddressSameDay}
                                  >
                                    <IconSVG
                                      width="16"
                                      height="16"
                                      viewBox="0 0 20 20"
                                      fill="none"
                                      fillP="#7B7E7B"
                                      name="doctor_onsite"
                                    />
                                    <Box>
                                      &nbsp;
                                      {i18n.t("SCHEDULE_EXAM.ON_SITE_DOCTOR")}
                                    </Box>
                                  </Box>
                                ) : null}
                                <Box
                                  sx={{
                                    display: {
                                      xs: "block",
                                      sm: "none",
                                      md: "block",
                                      lg: "none",
                                    },
                                  }}
                                >
                                  <Accordion
                                    elevation={0}
                                    sx={{
                                      backgroundColor: "transparent",
                                    }}
                                  >
                                    <AccordionSummary
                                      className={style.storeExpandSummary}
                                      expandIcon={
                                        <Box m={1}>
                                          <IconSVG
                                            width="11"
                                            height="11"
                                            viewBox="0 0 15 12"
                                            fill="none"
                                            fillP="#afb0b3"
                                            name="arrow_down"
                                          />
                                        </Box>
                                      }
                                    >
                                      <h2 className={style.storeExpandHeading}>
                                        Store Hours
                                      </h2>
                                    </AccordionSummary>
                                    <AccordionDetails>
                                      <Box>
                                        <Box
                                          className={style.storeHoursTimingItem}
                                        >
                                          <Box className={style.dayHeading}>
                                            Day
                                          </Box>
                                          <Box className={style.statusHeading}>
                                            Hours
                                          </Box>
                                        </Box>

                                        <Box>
                                          {storeHour.map(
                                            (
                                              storeHours: StoreHoursDTO,
                                              key: number
                                            ) => {
                                              return (
                                                <Box
                                                  key={key}
                                                  className={
                                                    style.storeHoursTimingItem
                                                  }
                                                >
                                                  <Box className={style.day}>
                                                    <p
                                                      className={
                                                        new Date().getDay() ===
                                                        key
                                                          ? style.highlightedDay
                                                          : style.normalDay
                                                      }
                                                    >
                                                      {storeHours.day}
                                                    </p>
                                                  </Box>
                                                  <Box className={style.status}>
                                                    <p
                                                      className={
                                                        new Date().getDay() ===
                                                        key
                                                          ? style.highlightedStatus
                                                          : style.normalStatus
                                                      }
                                                    >
                                                      {storeHours.status}
                                                    </p>
                                                  </Box>
                                                </Box>
                                              );
                                            }
                                          )}
                                        </Box>
                                      </Box>
                                    </AccordionDetails>
                                  </Accordion>
                                </Box>
                              </Box>
                            </Box>
                          </Grid>
                          <Grid item xs={12} sm={6} md={12} lg={6}>
                            <Box className={style.defaultAddressEyeLab}>
                              {storeAddress.Distance ? (
                                <Box>
                                  {parseFloat(
                                    (
                                      Number(storeAddress?.Distance) *
                                      0.001 *
                                      0.6213712
                                    ).toFixed(
                                      Number(storeAddress?.Distance) % 1 === 0
                                        ? 0
                                        : 1
                                    )
                                  ).toLocaleString("en-US")}
                                  &nbsp; miles
                                </Box>
                              ) : null}
                            </Box>
                            <Box
                              className={style.btnBox}
                              sx={{
                                justifyContent: storeAddress.Distance
                                  ? "space-between"
                                  : "flex-end",
                              }}
                            >
                              <Box>
                                {!isMapLoader &&
                                storeHour &&
                                storeHour?.length ? (
                                  <Box
                                    sx={{
                                      display: { xs: "none", sm: "block" },
                                    }}
                                    className={style.storeHoursContainer}
                                  >
                                    <Box className={style.storeHoursHeading}>
                                      <Image
                                        src={storeHours}
                                        alt="storeHours"
                                        width={16}
                                        height={16}
                                      />
                                      <span>Store Hours</span>
                                    </Box>

                                    <Box>
                                      {storeHour.length
                                        ? storeHour.map(
                                            (
                                              storeHours: StoreHoursDTO,
                                              key: number
                                            ) => {
                                              return (
                                                <Box
                                                  key={key}
                                                  className={
                                                    style.storeHoursTimingItem
                                                  }
                                                >
                                                  <Box className={style.day}>
                                                    <p
                                                      className={
                                                        new Date().getDay() ===
                                                        key
                                                          ? style.highlightedDay
                                                          : style.normalDay
                                                      }
                                                    >
                                                      {storeHours.day}
                                                    </p>
                                                  </Box>
                                                  <Box className={style.status}>
                                                    <p
                                                      className={
                                                        new Date().getDay() ===
                                                        key
                                                          ? style.highlightedStatus
                                                          : style.normalStatus
                                                      }
                                                    >
                                                      {storeHours.status}
                                                    </p>
                                                  </Box>
                                                </Box>
                                              );
                                            }
                                          )
                                        : weekdays.map(
                                            (
                                              storeHours: string,
                                              key: number
                                            ) => {
                                              return (
                                                <Box
                                                  key={key}
                                                  className={
                                                    style.storeHoursTimingItem
                                                  }
                                                >
                                                  <Box className={style.day}>
                                                    <p
                                                      className={
                                                        new Date().getDay() ===
                                                        key
                                                          ? style.highlightedDay
                                                          : style.normalDay
                                                      }
                                                    >
                                                      {storeHours}
                                                    </p>
                                                  </Box>
                                                  <Box className={style.status}>
                                                    <p
                                                      className={
                                                        new Date().getDay() ===
                                                        key
                                                          ? style.highlightedStatus
                                                          : style.normalStatus
                                                      }
                                                    >
                                                      Closed
                                                    </p>
                                                  </Box>
                                                </Box>
                                              );
                                            }
                                          )}
                                    </Box>

                                    <Box
                                      className={style.storeHoursVerticalBar}
                                    ></Box>
                                  </Box>
                                ) : (
                                  <Box>
                                    <Box
                                      sx={{
                                        display: { xs: "none", sm: "block" },
                                      }}
                                    >
                                      <RemoteStoreTiming />
                                    </Box>
                                    <Box
                                      sx={{
                                        display: { xs: "block", sm: "none" },
                                      }}
                                    >
                                      <Skeleton
                                        width={100}
                                        height={50}
                                        variant="rectangular"
                                      />
                                    </Box>
                                  </Box>
                                )}
                              </Box>
                            </Box>
                          </Grid>
                        </Grid>
                        <Box className={style.sideBarBtn}>
                          <Box sx={{ width: "50%" }}>
                            <Button
                              variant="contained"
                              className={style.btnColor}
                              sx={{ width: "100%" }}
                              disabled={isAgent}
                              onClick={(event) => {
                                localStorage.setItem(
                                  "selectedStore",
                                  JSON.stringify(storeAddress)
                                );
                                window.dispatchEvent(
                                  new Event(AppEvents.STORE_CHANGE)
                                );
                              }}
                              endIcon={
                                <IconSVG
                                  width="9"
                                  height="15"
                                  viewBox="0 0 9 15"
                                  fill="none"
                                  fillP="#010101"
                                  name="arrow_solid_right"
                                />
                              }
                            >
                              Set As my store
                            </Button>
                          </Box>
                          <Box sx={{ width: "50%" }}>
                            <Button
                              variant="contained"
                              className={style.btnColor}
                              sx={{ width: "100%" }}
                              onClick={(event) => {
                                if (role === USER_TYPE.ASSOCIATE) {
                                  handleBookAppointment(event, storeAddress);
                                } else {
                                  bookEyeExamHandler(
                                    router,
                                    storeAddress as StoreDetailsDTO
                                  );
                                }
                              }}
                              disabled={isAgent}
                              endIcon={
                                <IconSVG
                                  width="9"
                                  height="15"
                                  viewBox="0 0 9 15"
                                  fill="none"
                                  fillP="#010101"
                                  name="arrow_solid_right"
                                />
                              }
                            >
                              {(role === USER_TYPE.ASSOCIATE && !isAgent)
                                ? "Book Appointment"
                                : "Book Eye Exam"}
                            </Button>
                          </Box>
                        </Box>
                        <Divider />
                      </div>
                    );
                  })
                ) : (
                  <Box className={style.noStoreText}>
                    {" "}
                    {isPageReady && (
                      <p>
                        {!loading
                          ? i18n.t("SCHEDULE_EXAM.NO_RECORD_FOUND")
                          : null}
                      </p>
                    )}
                  </Box>
                )}
                {loading
                  ? Array.from({ length: 3 }).map((_, index) => (
                      <div key={index}>
                        <Grid container pb={2}>
                          <Grid item xs={12} sm={6}>
                            <RemoteStoreSkeleton />
                          </Grid>
                          <Grid item xs={12} sm={6}>
                            <Box
                              style={{
                                display: "flex",
                                justifyContent: "flex-end",
                              }}
                            >
                              <Skeleton width={80} height={20} variant="text" />
                            </Box>
                            <RemoteStoreTiming />
                          </Grid>
                        </Grid>
                        <Divider />
                      </div>
                    ))
                  : null}

                {!loading ? (
                  pageNumber < pageSize && allStoreData.length ? (
                    <Box className={style.centerBtn}>
                      <Button
                        onClick={handleLoadMore}
                        variant="contained"
                        className={style.loadMoreBtn}
                      >
                        {i18n.t("SCHEDULE_EXAM.LOAD_MORE")}
                      </Button>
                    </Box>
                  ) : null
                ) : (
                  <Box py={8} className={style.loadMoreSkeleton}>
                    <Skeleton height={35} width={100} variant="rectangular" />
                  </Box>
                )}
              </Box>
            </Box>
            <Box id="map-section" className={style.mapWrapper}>
              <Box className={style.mapArea}>
                <CustomMap centers={allLocation} />
              </Box>
              <Box>
                <FAQ brand={brand} />
              </Box>
            </Box>
          </Box>
        </Box>
      </div>
    </div>
  );
};

export default StoreList;
