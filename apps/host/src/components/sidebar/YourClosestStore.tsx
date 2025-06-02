import { AxiosError } from "axios";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import React, { useEffect, useMemo, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AlertColor,
  Box,
  Grid,
} from "@mui/material";
import Button from "@mui/material/Button";
import Divider from "@mui/material/Divider";

import { useSnackBar } from "../../contexts/Snackbar/SnackbarContext";
import IconSVG from "../iconsvg/IconSVG";

import style from "./SideBar.module.scss";

import {
  ClosestStoreDTO,
  LocationDTO,
  StoreAddressType,
  StoreHoursDTO,
} from "../../types/SideBar.types";

import storeHours from "../../../../assets/Images/icons/storeHours.svg";

import {
  getStoreWorkingHour,
  GetUserStoreDetailsByName,
} from "../../service/storeLocator.service";

import { STORE_HOURS } from "../../constants/SideBarConstants";
import {
  BRAND_NAME,
  DATE_FORMAT,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
  weekdays,
} from "../../constants/common.constants";
import { STORE_ERROR_MESSAGE } from "../../constants/store.constants";
import { useRouter } from "next/router";
import { isMobileDevice, stringToSlug } from "../../utils/common.utils";
import { getWeekday } from "../../utils/storeHourFormatter";
import { timezoneConverter } from "../../utils/timezone.utils";
import ShowBrandStore from "../showBrandStore/ShowBrandStore";
import StoreTiming from "../skeleton_loader/SelectStore/StoreTiming";
import useNonInitialEffect from "@root/host/src/hooks/useNonInitialEffect";
import StoreSkeleton from "../skeleton_loader/SelectStore/StoreSkeleton";
import { GetCurrentLocation } from "../../service/common.service";
import useLocationPermission from "@root/host/src/hooks/useLocationPermission";
import { IMask } from "react-imask";
import { useAppSelector } from "@root/host/src/store/useStore";
import earthIcon from "@root/assets/Images/icons/earth.svg";
import { getLatLong } from "@root/host/src/utils/getLocation.utils";

const YourClosestStore = ({
  setShowStores,
  handleClose,
  handleShippingModeOnStoreChangeForCustomer,
}: ClosestStoreDTO) => {
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);
  const { showSnackBar } = useSnackBar();
  const router = useRouter();
  const isLocationAllowed = useLocationPermission();
  const [storeData, setStoreData] = useState<StoreAddressType | null>(null);
  const [storeHour, setStoreHour] = useState<StoreHoursDTO[]>([]);
  const [statusMessage, setStatusMessage] = useState("Closed");
  const [openLoader, setLoaderOpen] = React.useState(true);
  const [userLocation, setUserLocation] = useState<LocationDTO | null>({
    latitude: 0,
    longitude: 0,
  });
  const memoizedLocation = useMemo(() => userLocation, [userLocation?.latitude, userLocation?.longitude]);
  const [storeDetailsLoading, setStoreDetailsLoading] = useState(true);
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

  const getGeoLocationFromAPI = () => {
    GetCurrentLocation().then((resp) => {
      const locationData = resp.data;
      if (locationData) {
        setUserLocation({
          latitude: locationData.location.lat,
          longitude: locationData.location.lng,
        });
      }
    });
  };

  useEffect(() => {
    if ((navigator.userAgent.includes("Firefox") || navigator.userAgent.includes("Mozilla")) && isMobileDevice()) {
      getLatLong((lat, long) => {
        setUserLocation({
          latitude: lat,
          longitude: long,
        });
      })
    } else {

      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              latitude: position.coords.latitude,
              longitude: position.coords.longitude,
            });
          },
          (error) => {
            if (!isLocationAllowed) {
              setUserLocation(null);
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
      } else {
        setUserLocation(null);
      }

    }

  }, [isLocationAllowed]);

  useNonInitialEffect(() => {
    if (
      storeData &&
      storeData.CloseAt &&
      storeData.OpenAt &&
      storeData.TimeZoneCode
    ) {
      const storeTimezone = timezoneConverter(storeData.TimeZoneCode);

      const closeTimeParts = storeData.CloseAt.split(":");
      const openTimeParts = storeData.OpenAt.split(":");

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
          setStatusMessage(
            `Open : Closes at ${new Date(
              `2024-01-01T${storeData?.CloseAt}`
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}`
          );
        } else {
          setStatusMessage(
            `Closed : Opens at ${new Date(
              `2024-01-01T${storeData?.OpenAt}`
            ).toLocaleTimeString("en-US", {
              hour: "numeric",
              minute: "numeric",
              hour12: true,
            })}`
          );
        }
      }
    }
  }, [storeData]);

  const getStoreDetailsByName = async (slug: string) => {
    if (slug) {
      setStoreDetailsLoading(true);
      const lat = memoizedLocation ? memoizedLocation?.latitude.toString() : undefined;
      const long = memoizedLocation
        ? memoizedLocation?.longitude.toString()
        : undefined;

      await GetUserStoreDetailsByName(
        slug,
        dayjs().format(DATE_FORMAT),
        lat,
        long
      )
        .then(({ data }) => {
          setStoreData(data?.Result);
        })
        .catch((err) => {
          showSnackBar(
            err?.response
              ? err?.response?.data?.Error?.Description
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        })
        .finally(() => {
          setStoreDetailsLoading(false);
        });
    }
  };

  useNonInitialEffect(() => {
    const selectedStore = JSON.parse(
      localStorage.getItem("selectedStore") as string
    );

    if (selectedStore) {
      if (Boolean(selectedStore.LocationPageName)) {
        getStoreDetailsByName(selectedStore.LocationPageName);
      } else {
        setStoreData(selectedStore);
        setStoreDetailsLoading(false);
      }
      getWorkingHour(selectedStore.Id);
    }
  }, [memoizedLocation]);

  useEffect(() => {
    if (storeData) {
      handleShippingModeOnStoreChangeForCustomer &&
        handleShippingModeOnStoreChangeForCustomer(
          storeData as StoreAddressType
        );
    }
  }, [storeData]);

  const getWorkingHour = async (storeId: number) => {
    setLoaderOpen(true);
    getStoreWorkingHour(storeId.toString(), dayjs().format(DATE_FORMAT))
      .then(({ data }) => {
        if (data?.Result) {
          const temp = data.Result.length
            ? getWeekday(data.Result)
            : STORE_HOURS;
          setStoreHour(temp);
        }
      })
      .catch((err) => {
        const errorMessage = (err as AxiosError).message
          ? (err as AxiosError).message
          : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      })
      .finally(() => {
        setLoaderOpen(false);
      });
  };

  return (
    <Box>
      <Divider />
      <Grid container spacing={2} className={style.yourClosestStoreContainer}>
        <Grid item xs={12} sm={6}>
          {storeDetailsLoading ? (
            <StoreSkeleton />
          ) : (
            <Box className={style.defaultAddressContainer}>
              <Box
                className={`${style.defaultAddressOrder} ${style.closestStoreDefaultAddressWidth}`}
              >
                1
              </Box>
              <Box>
                <h2 className={style.defaultAddressHeading}>
                  {storeData?.WebDescription}{" "}
                  <ShowBrandStore
                    optionBrandName={storeData?.BrandName ?? "Stanton Optical"}
                  />
                </h2>
                {(
                  new Date(storeData?.StoreOpeningDateTime || "") > new Date()
                ) ? (
                  <Box className={style.defaultAddressSameDay} sx={{ marginY : "22px" }}>
                    <IconSVG
                      width="20"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                      fillP="#002e6d"
                      name="flag_icon"
                    />
                    <Box className={style.grandOpening}>Grand Opening Soon</Box>
                  </Box>
                ) : (
                  <Box className={style.defaultAddressTiming}>
                    {statusMessage}
                  </Box>
                )}

                <Box
                  className={`${style.defaultAddressEyeLab} ${
                    storeData?.BrandName === BRAND_NAME.MEL
                      ? style.defaultStoreMEL
                      : style.defaultStoreSO
                  }`}
                >
                  <span className={style.eyeLabCircle}> </span>
                  <Box className={style.brandName}>{storeData?.BrandName}</Box>
                  {storeData?.Distance ? (
                    <span className={style.eyeLabCircle}> </span>
                  ) : null}
                  {storeData?.Distance ? (
                    <Box>
                      {parseFloat(
                        (
                          Number(storeData?.Distance) *
                          0.001 *
                          0.6213712
                        ).toFixed(Number(storeData?.Distance) % 1 === 0 ? 0 : 1)
                      ).toLocaleString("en-US")}
                      &nbsp;miles
                    </Box>
                  ) : null}
                </Box>
                {storeData?.Distance ? (
                  <Box className={style.directionBox}>
                    <Button
                      className={style.directionbtn}
                      size="small"
                      variant="outlined"
                      onClick={() => {
                        window.open(
                          `https://www.google.com/maps/dir/?api=1&destination=${storeData?.Latitude},${storeData?.Longitude}`,
                          "_blank"
                        );
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
                      Get Directions
                    </Button>
                  </Box>
                ) : null}
                <Box className={style.defaultAddressDetails}>
                  <Box>{storeData?.AddressLine1}</Box>
                  <Box>
                    {storeData?.City},&nbsp;{storeData?.StateCode}&nbsp;
                    {storeData?.ZipCode}
                  </Box>
                  {storeData?.PhoneNumber && storeData?.PhoneNumber.length ? (
                    <Box>{getPrimaryPhoneNumber(storeData?.PhoneNumber)}</Box>
                  ) : null}
                </Box>
                {storeData?.HasSameDayDelivery ? (
                  <Box className={style.defaultAddressSameDay}>
                    <IconSVG
                      width="22"
                      height="16"
                      viewBox="0 0 22 16"
                      fill="none"
                      fillP="#7B7E7B"
                      name="sameDay_delivery_icon"
                    />
                    <Box ml={1}>Same Day Pickup</Box>
                  </Box>
                ) : null}
                {storeData?.IsSpeakSpanish && (
                  <Box sx={{ mt: "10px", display : "flex", alignItems : "center" }}>
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
              </Box>
            </Box>
          )}
          <Box sx={{ display: { xs: "block", md: "none" } }}>
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
                <h2 className={style.storeExpandHeading}>Store Hours</h2>
              </AccordionSummary>
              <AccordionDetails>
                <Box sx={{ marginLeft: "25px", marginTop: "-15px" }}>
                  <Box className={style.storeHoursTimingItem}>
                    <Box className={style.dayHeading}>Day</Box>
                    <Box className={style.statusHeading}>Hours</Box>
                  </Box>

                  <Box>
                    {storeHour.map((storeHours: StoreHoursDTO, key: number) => {
                      return (
                        <Box key={key} className={style.storeHoursTimingItem}>
                          <Box className={style.day}>
                            <p
                              className={
                                new Date().getDay() === key
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
                                new Date().getDay() === key
                                  ? style.highlightedStatus
                                  : style.normalStatus
                              }
                            >
                              {storeHours.status}
                            </p>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                </Box>
              </AccordionDetails>
            </Accordion>
          </Box>
        </Grid>
        <Grid item xs={12} sm={6}>
          {openLoader ? (
            <StoreTiming />
          ) : storeHour.length ? (
            <Box
              sx={{ display: { xs: "none", md: "block" } }}
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
                  ? storeHour.map((storeHours: StoreHoursDTO, key: number) => {
                      return (
                        <Box key={key} className={style.storeHoursTimingItem}>
                          <Box className={style.day}>
                            <p
                              className={
                                new Date().getDay() === key
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
                                new Date().getDay() === key
                                  ? style.highlightedStatus
                                  : style.normalStatus
                              }
                            >
                              {storeHours.status}
                            </p>
                          </Box>
                        </Box>
                      );
                    })
                  : weekdays.map((storeHours: string, key: number) => {
                      return (
                        <Box key={key} className={style.storeHoursTimingItem}>
                          <Box className={style.day}>
                            <p
                              className={
                                new Date().getDay() === key
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
                                new Date().getDay() === key
                                  ? style.highlightedStatus
                                  : style.normalStatus
                              }
                            >
                              Closed
                            </p>
                          </Box>
                        </Box>
                      );
                    })}
              </Box>

              <Box className={style.storeHoursVerticalBar}></Box>
            </Box>
          ) : null}
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: "0px 50px" }}>
          {!isAgent && (
            <Link href="/book-eye-exam">
              <Button
                variant="contained"
                className={style.drawerEyeExamBtn}
                onClick={handleClose}
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
                Book eye exam
              </Button>
            </Link>
          )}
        </Grid>
        <Grid item xs={12} sm={6} sx={{ padding: "0px 50px" }}>
          {storeData ? (
            <Button
              variant="contained"
              disabled={!Boolean(storeData.LocationPageName)}
              onClick={(event) => {
                router.push(
                  {
                    pathname: `/locations/${stringToSlug(
                      storeData.LocationPageName as string
                    )}`,
                    query: {
                      pid: storeData.Id,
                    },
                  },
                  `/locations/${stringToSlug(
                    storeData.LocationPageName as string
                  )}`
                );
                handleClose(event);
              }}
              className={style.drawerStoreDetailsBtn}
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
              store details
            </Button>
          ) : null}
        </Grid>
      </Grid>
      <Divider />
      <Box className={style.centerBtn}>
        <Button
          variant="contained"
          className={style.drawerActionBtn}
          onClick={() => setShowStores(true)}
        >
          FIND A DIFFERENT LOCATION
        </Button>
      </Box>
    </Box>
  );
};

export default YourClosestStore;
