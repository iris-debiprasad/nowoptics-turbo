import { AxiosError } from "axios";
import { useRouter } from "next/router";
import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AlertColor,
  Box,
  Button,
  Checkbox,
  Divider,
  FormControlLabel,
  Grid,
  InputLabel,
  Skeleton,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";

import {
  GetCurrentLocation,
  GetGeoLocationData,
} from "@root/host/src/service/common.service";
import { useSnackBar } from "../../contexts/Snackbar/SnackbarContext";
import IconSVG from "../iconsvg/IconSVG";

import style from "./SideBar.module.scss";

import {
  APPOINTMENT_SELECT_STORE_ACTION,
  DATE_FORMAT,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
  isZipcodeValidRegex,
  validLocationInputPattern,
  weekdays,
} from "../../constants/common.constants";
import { STORE_ERROR_MESSAGE } from "../../constants/store.constants";

import {
  DateFormDTO,
  LocationDTO,
  SelectStoreDTO,
  StoreAddressType,
  StoreHoursDTO,
} from "../../types/SideBar.types";

import {
  GetAuthenticatedStoreLocatorGrid,
  GetPublicStoreLocatorGrid,
  getStoreWorkingHour,
} from "../../service/storeLocator.service";

import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import Image from "next/image";
import Link from "next/link";
import storeHours from "../../../../assets/Images/icons/storeHours.svg";
import { GetPermissionConfig } from "../../config/permissionConfig";
import { FormSideBarConstant } from "../../constants/SideBarConstants";
import CommonPermission from "../../constants/common-permission.constants";
import { useAppSelector } from "../../store/useStore";
import { stringToSlug, bookEyeExamHandler, isMobileDevice } from "../../utils/common.utils";
import { getDetails } from "../../utils/getSessionData";
import { getWeekday } from "../../utils/storeHourFormatter";
import { timezoneConverter } from "../../utils/timezone.utils";
import ShowBrandStore from "../showBrandStore/ShowBrandStore";
import StoreSkeleton from "../skeleton_loader/SelectStore/StoreSkeleton";
import StoreTiming from "../skeleton_loader/SelectStore/StoreTiming";
import useNonInitialEffect from "@root/host/src/hooks/useNonInitialEffect";
import useLocationPermission from "@root/host/src/hooks/useLocationPermission";
import { IMask } from "react-imask";
import earthIcon from "@root/assets/Images/icons/earth.svg";
import { getLatLong } from "@root/host/src/utils/getLocation.utils";

function SelectAStore({
  handleClose,
  handleNewStore,
  handleForceClose,
  forceClose,
  closeDrawer,
  brandName,
  hasSameDayDelivery,
  handleShippingModeOnStoreChangeForCustomer,
  isBookEyeExam
}: SelectStoreDTO) {
  const isAgent = useAppSelector((state) => state.cdcView.data.isAgent);
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const isLocationAllowed = useLocationPermission();
  const [userLocation, setUserLocation] = useState<LocationDTO | null>({
    latitude: 0,
    longitude: 0,
  });
  // Memoize the `memoizedLocation` object to ensure stability
  const memoizedLocation = useMemo(() => userLocation, [userLocation?.latitude, userLocation?.longitude]);
  const containerRef = useRef<HTMLDivElement>(null);
  const [role, setRole] = useState<string | null>(null);
  const [lookupStr, setLookupStr] = useState<string>("");
  const [allStoreData, setAllStoreData] = useState<StoreAddressType[]>([]);
  const [pressBckSpace, setPressBckSpace] = useState(false);
  const [pageSize, setPageSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [pageTemp, setPageTemp] = useState(1);
  const [alignment, setAlignment] = React.useState("");
  const [openLoader, setLoaderOpen] = React.useState(false);
  const [isOnSiteDoctor, setIsOnsiteDoctor] = React.useState(false);
  const [isLoaderFirst, setIsLoaderFirst] = React.useState(false);
  const [hours, setHours] = React.useState<any>([]);
  const [isMapLoader, setIsMapLoader] = React.useState(false);
  const [isNowService, setIsNowService] = React.useState(
    hasSameDayDelivery ? hasSameDayDelivery : false
  );
  const [useMyCurrentLocationClicked, setUseMyCurrentLocationClicked] = useState(false);
  const [formValues, setFormValues] = React.useState<DateFormDTO>({
    fromDate: {
      value: null,
      error: false,
      errorMessage: FormSideBarConstant.ERROR_MESSAGE.FROM_DATE,
    },
    toDate: {
      value: null,
      error: false,
      errorMessage: FormSideBarConstant.ERROR_MESSAGE.TO_DATE,
    },
  });
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

  const handleChange = (
    event: React.MouseEvent<HTMLElement>,
    newAlignment: string
  ) => {
    setAlignment(newAlignment);
    if (newAlignment === "SO" || newAlignment === "MEL") {
      setPageNumber(1);
      getStoreGridData(1, lookupStr || "", newAlignment);
      setIsLoaderFirst(true);
    } else {
      setAlignment("");
      setPageNumber(1);
      getStoreGridData(1, lookupStr || "", "");
    }
  };

  const getGeoLocationFromZipCode = (zipCode: string) => {
    return new Promise((resolve, reject) => {
      GetGeoLocationData(zipCode).then((resp) => {
        if (resp.data.results.length > 0) {
          const location = resp.data.results[0].geometry.location;
          resolve({ lat: location.lat, long: location.lng });
        } else {
          resolve({ lat: undefined, long: undefined });
        }
      });
    });
  };

  const getStoreGridData = async (
    page: number,
    searchTerm?: string,
    filter?: string,
    sort?: boolean
  ) => {
    setLoaderOpen(true);
    let lat = null;
    let long = null;
    lat =
      isLocationAllowed && memoizedLocation && memoizedLocation?.latitude
        ? memoizedLocation?.latitude.toString()
        : undefined;
    long =
      isLocationAllowed && memoizedLocation && memoizedLocation?.longitude
        ? memoizedLocation?.longitude.toString()
        : undefined;
    //TODO: Remove zipcode check for geo location, now geo location API will call for all kind of search
    if (searchTerm) {
      let zipCode = searchTerm;
      if (searchTerm.length > 5 && isZipcodeValidRegex.test(searchTerm)) {
        zipCode = `${searchTerm.slice(0, 5)}-${searchTerm.slice(
          5,
          searchTerm.length
        )}`;
      }
      const locationData = (await getGeoLocationFromZipCode(zipCode)) as {
        lat: string;
        long: string;
      };
      if (locationData.lat && locationData.long) {
        lat = locationData.lat;
        long = locationData.long;
      }
    }

    const isEmployee = localStorage.getItem("isEmployee") || "";
    const selectedBrandName =
      role === USER_TYPE.ASSOCIATE && filter && !isAgent ? filter : undefined;
    const storeGrid =
      Boolean(isEmployee) && !isAgent
        ? GetAuthenticatedStoreLocatorGrid
        : GetPublicStoreLocatorGrid;

    storeGrid(
      page.toString(),
      searchTerm,
      selectedBrandName || brandName,
      lat,
      long,
      sort,
      isNowService,
      isOnSiteDoctor,
      false,
      formValues.fromDate.value?.toString() || false,
      formValues.toDate.value?.toString() || false
    )
      .then(({ data }) => {
        const responseData = data.Result.Results.length
          ? data.Result.Results
          : [];
        setPageTemp(page);
        setPageSize(data.Result.PageCount);
        setAllStoreData(
          page > 1 && alignment === filter
            ? [...allStoreData, ...responseData]
            : responseData
        );
      })
      .catch((err) => {
        const errorMessage = (err as AxiosError).message
          ? (err as AxiosError).message
          : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(errorMessage, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      })
      .finally(() => {
        setLoaderOpen(false);
        setIsLoaderFirst(false);
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

  useNonInitialEffect(() => {
    if (useMyCurrentLocationClicked) {
      const selectedBrandName =
        role === USER_TYPE.ASSOCIATE && !isAgent
          ? alignment
          : undefined;
      getStoreGridData(1, "", selectedBrandName || brandName, false);
    } else {
      getStoreGridData(pageNumber, lookupStr || "", alignment);
    }

  }, [pressBckSpace,
    isNowService,
    isOnSiteDoctor,
    role,
    isAgent,
    alignment,
    memoizedLocation,
    useMyCurrentLocationClicked]);

  function lookupOnClearHandler(event: React.KeyboardEvent) {
    if (event.key === "Backspace" && lookupStr.length <= 1) {
      setPressBckSpace(!pressBckSpace);
      setUseMyCurrentLocationClicked(false);
      setLookupStr("");
    } else if (event.key === "Enter") {
      lookupOnClickHandler();
    }
  }
  function lookupOnClickHandler() {
    if (lookupStr && validLocationInputPattern.test(lookupStr)) {
      const selectedBrandName =
        role === USER_TYPE.ASSOCIATE && !isAgent ? alignment : undefined;
      getStoreGridData(1, lookupStr, selectedBrandName || brandName); // Pass 1 because we need the search result starting from 1st page.
      setPageNumber(1); // Reset page number to 1
    } else {
      showSnackBar(
        "Please enter a valid city, state or zip code",
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
  }

  function handleSetStore(
    event: React.MouseEvent<Element, MouseEvent>,
    store: StoreAddressType
  ) {
    if (hasSameDayDelivery) {
      handleShippingModeOnStoreChangeForCustomer &&
        handleShippingModeOnStoreChangeForCustomer(store);
    } else {
      window.localStorage.setItem("selectedStore", JSON.stringify(store));
      handleNewStore && handleNewStore();
      handleForceClose && handleForceClose();
      closeDrawer(event);
    }
  }

  const handleLoadMore = () => {
    if (pageSize > pageNumber) {
      getStoreGridData(pageNumber + 1, lookupStr || "", alignment);
      setPageNumber(pageNumber + 1);
    }
  };

  function getUserData() {
    return getDetails().then(function (data) {
      setRole(data?.authData?.userType ? data?.authData?.userType : null);
    });
  }
  useEffect(() => {
    getUserData();
  }, []);
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
          pageTemp > 1 ? [...prevHours, ...arr] : arr
        );
        setIsMapLoader(false);
      };

      fetchWorkingHours();
    }
  }, [allStoreData]);

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
    handleSetStore(event, store);
  };

  const [createAppintmentPermisison] = useAppSelector((state) =>
    GetPermissionConfig({
      ...state,
      permissionName: [CommonPermission.APPOINTMENTS.CREATE_POS_APPOINTMENT],
    })
  ) as boolean[];

  return (
    <>
      <Box ref={containerRef}>
        <Tooltip
          title={
            memoizedLocation === null ? (
              <Typography component={"h5"}>
                Please Allow Location and Refresh the Page
              </Typography>
            ) : null
          }
        >
          <Button
            className={`${style.lookup} ${memoizedLocation === null ? style.lookupDisable : style.lookupAllow
              }`}
            onClick={() => {
              if (memoizedLocation !== null && !useMyCurrentLocationClicked) {
                setUseMyCurrentLocationClicked(true)
                setLookupStr("");
                setIsLoaderFirst(true);
              }
            }}
            startIcon={
              <IconSVG
                width="16"
                height="20"
                viewBox="0 0 18 24"
                fill="none"
                fillP="#afb0b3"
                name="location_pointer_icon"
              />
            }
          >
            <Box data-testid="location-header" className={style.useMyCurrLoc}>
              Use my current location
            </Box>
          </Button>
        </Tooltip>

        <Grid container className={style.lookupSearch}>
          <Grid item xs={8} sm={8}>
            <Box>
              <TextField
                id="outlined-basic"
                placeholder="Enter City, State Or Zip"
                onKeyDown={lookupOnClearHandler}
                value={lookupStr}
                onChange={(e) => {
                  setUseMyCurrentLocationClicked(false)
                  setLookupStr(e.target.value);
                  if (e.target.value === "") {
                    setLookupStr("");
                    setPressBckSpace(!pressBckSpace);
                  }
                }}
                variant="outlined"
                className={`${style.lookupTxt} ${style.width}`}
                data-testid="location-input"
              />
            </Box>
          </Grid>
          <Grid item xs={4} sm={4}>
            <Box className={style.height}>
              <Button
                variant="contained"
                className={`${style.lookupBtn} ${style.width}`}
                onClick={lookupOnClickHandler}
                data-testid="lookup"
              >
                Look Up
              </Button>
            </Box>
          </Grid>
        </Grid>

        {role === USER_TYPE.ASSOCIATE && !isAgent && (
          <Grid container className={style.lookupSearch}>
            <Grid item xs={8} sm={8}>
              <Box className={style.flexBox}>
                <Box className={style.marginR}>
                  <InputLabel
                    className={style.inputLabel}
                    htmlFor="fromOrderDate"
                  >
                    From Date
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      minDate={dayjs()}
                      maxDate={
                        formValues.toDate.value != null
                          ? dayjs(formValues.toDate.value)
                          : null
                      }
                      className={`${style.textInput} ${style.width}`}
                      value={formValues.fromDate.value}
                      onChange={(newValue) => {
                        let _isvalid = dayjs(newValue).isValid();
                        let _errMsg =
                          FormSideBarConstant.ERROR_MESSAGE.FROM_DATE;
                        if (!_isvalid) {
                          _errMsg =
                            FormSideBarConstant.ERROR_MESSAGE.INVALID_FROM_DATE;
                        } else if (
                          dayjs(newValue).isAfter(formValues.toDate.value)
                        ) {
                          _errMsg =
                            FormSideBarConstant.ERROR_MESSAGE.INVALID_FROM_DATE;
                          _isvalid = false;
                        }
                        setFormValues({
                          ...formValues,

                          fromDate: {
                            value: newValue,
                            error: !_isvalid,
                            errorMessage: _errMsg,
                          },
                        });
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          inputProps: {
                            "data-testid": "fromDateTestid",
                          },
                          error: formValues.fromDate.error,
                          helperText:
                            formValues.fromDate.error &&
                            formValues.fromDate.errorMessage,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>

                <Box className={style.marginL}>
                  <InputLabel
                    className={style.inputLabel}
                    htmlFor="toOrderDate"
                  >
                    To Date
                  </InputLabel>
                  <LocalizationProvider dateAdapter={AdapterDayjs}>
                    <DesktopDatePicker
                      disabled={formValues.fromDate.value === null}
                      minDate={formValues.fromDate.value}
                      maxDate={dayjs(formValues.fromDate.value).add(2, "year")}
                      className={`${style.textInput} ${style.width}`}
                      value={formValues.toDate.value}
                      onChange={(newValue) => {
                        let _isvalid = dayjs(newValue).isValid();
                        let _errMsg = FormSideBarConstant.ERROR_MESSAGE.TO_DATE;
                        if (!_isvalid) {
                          _errMsg =
                            FormSideBarConstant.ERROR_MESSAGE.INVALID_TO_DATE;
                          _isvalid = false;
                        } else if (
                          dayjs(newValue).isBefore(formValues.fromDate.value)
                        ) {
                          _errMsg =
                            FormSideBarConstant.ERROR_MESSAGE.INVALID_TO_DATE;
                          _isvalid = false;
                        }
                        setFormValues({
                          ...formValues,
                          toDate: {
                            value: newValue,
                            error: !_isvalid,
                            errorMessage: _errMsg,
                          },
                        });
                      }}
                      slotProps={{
                        textField: {
                          size: "small",
                          inputProps: {
                            "data-testid": "toDateTestid",
                          },
                          error: formValues.toDate.error,
                          helperText:
                            formValues.toDate.error &&
                            formValues.toDate.errorMessage,
                        },
                      }}
                    />
                  </LocalizationProvider>
                </Box>
              </Box>
            </Grid>
            <Grid item xs={4} sm={4}>
              <Box className={style.height}>
                <div></div>
                <Button
                  disabled={formValues.fromDate.value === null}
                  variant="contained"
                  className={`${style.lookupBtn} ${style.btnapply}`}
                  onClick={() => {
                    getStoreGridData(1, lookupStr || "", alignment);
                  }}
                  data-testid="ApplyButton"
                >
                  {" Apply "}
                </Button>
              </Box>
            </Grid>
          </Grid>
        )}
        {role === USER_TYPE.ASSOCIATE && !isAgent ? (
          <Box className={style.checkBoxWrapper}>
            <FormControlLabel
              className={style.checkBoxController}
              control={
                <Checkbox
                  className={style.checkBox}
                  checked={isNowService}
                  value={isNowService}
                  onChange={(e) => {
                    if (!isNowService || !e.target.checked) {
                      setPageNumber(1);
                    }
                    setIsNowService(e.target.checked);
                  }}
                />
              }
              label={
                <span className={style.checkBoxLabelText}>Is Now Service</span>
              }
            />
            <FormControlLabel
              className={style.checkBoxController}
              control={
                <Checkbox
                  className={style.checkBox}
                  checked={isOnSiteDoctor}
                  value={isOnSiteDoctor}
                  onChange={(e) => {
                    if (!isOnSiteDoctor || !e.target.checked) {
                      setPageNumber(1);
                    }
                    setIsOnsiteDoctor(e.target.checked);
                  }}
                />
              }
              label={
                <span className={style.checkBoxLabelText}>
                  Is On Site Doctor
                </span>
              }
            />
          </Box>
        ) : null}
        <Divider />
        {forceClose && !isBookEyeExam ? (
          <Box mt={2}>
            <span className={style.baMessage}>
              {" "}
              You&apos;re accessing the application from an external location.
              Please pick a store to continue.
            </span>
          </Box>
        ) : null}
        {role === USER_TYPE.ASSOCIATE && !isAgent ? (
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
        ) : null}
        {!isLoaderFirst && allStoreData.length ? (
          allStoreData.map((storeAddress: StoreAddressType, key: number) => {
            let statusMessage = "Closed";

            const storeHour =
              hours.find((item: any) => item.id === storeAddress.Id)?.hours ||
              [];


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
                  statusMessage = `Open : Closes at ${formattedTime}`;
                } else {
                  const formattedTime = new Date(
                    `2024-01-01T${storeAddress?.OpenAt}`
                  ).toLocaleTimeString("en-US", {
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                  });
                  statusMessage = `Closed : Opens at ${formattedTime}`;
                }
              }
            }

            const storeName =
              role === USER_TYPE.ASSOCIATE && !isAgent
                ? storeAddress?.WebDescription
                  ? `${storeAddress.StoreNumber} - ${storeAddress?.WebDescription} `
                  : storeAddress.StoreNumber
                : storeAddress?.WebDescription || "";

            return (
              storeAddress.StoreNumber && (
                <div key={key}>
                  <Grid container className={style.selectStoreContainer}>
                    <Grid item xs={12} sm={6}>
                      <Box className={style.defaultAddressContainer}>
                        <Box
                          className={`${style.defaultAddressOrder} ${style.selectStoreDefaultAddressWidth}`}
                        >
                          {key + 1}
                        </Box>
                        <Box sx={{ width: "100%" }}>
                          <Box
                            sx={{
                              display: { xs: "flex", md: "none" },
                              justifyContent: "space-between",
                              alignItems: "flex-start",
                            }}
                          >
                            <Box>
                              <h2 className={style.defaultAddressHeading}>
                                {storeName}
                                <ShowBrandStore
                                  optionBrandName={storeAddress.BrandName}
                                  fontSize={12}
                                />
                              </h2>
                            </Box>
                          </Box>
                          <Box sx={{ display: { xs: "none", md: "inline" } }}>
                            <h2 className={style.defaultAddressHeading}>
                              {storeName}
                              <ShowBrandStore
                                optionBrandName={storeAddress.BrandName}
                                fontSize={12}
                              />
                            </h2>
                          </Box>
                          {(
                            new Date(storeAddress?.StoreOpeningDateTime || "") >
                            new Date()
                          ) ? (
                            <Box className={style.defaultAddressSameDay} sx={{ marginY: "22px" }}>
                              <IconSVG
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

                          <Box className={style.mobileDirectionBox}>
                            {storeAddress.Distance ? (
                              <Button
                                className={style.directionbtn}
                                size="small"
                                variant="outlined"
                                onClick={() => {
                                  window.open(
                                    `https://www.google.com/maps/dir/?api=1&destination=${storeAddress?.Latitude},${storeAddress?.Longitude}`,
                                    "_blank"
                                  );
                                }}
                                endIcon={
                                  <IconSVG
                                    width="10"
                                    height="10"
                                    viewBox="0 0 15 15"
                                    fill="none"
                                    fillP="#000000"
                                    name="direction_icon"
                                  />
                                }
                              >
                                Get Directions
                              </Button>
                            ) : null}
                          </Box>

                          <Grid container spacing={2}>
                            <Grid item xs={7} md={12}>
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
                              </Box>
                              {storeAddress.HasSameDayDelivery ? (
                                <Box className={style.defaultAddressSameDay}>
                                  <IconSVG
                                    width="22"
                                    height="16"
                                    viewBox="0 0 22 16"
                                    fill="none"
                                    fillP="#7B7E7B"
                                    name="sameDay_delivery_icon"
                                  />
                                  <Box>&nbsp;Same Day Pickup</Box>
                                </Box>
                              ) : null}
                              {storeAddress.IsSpeakSpanish && (
                                <Box sx={{ mt: "10px", display: "flex", alignItems: "center" }}>
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
                            </Grid>

                            <Grid
                              item
                              xs={5}
                              md={12}
                              sx={{ display: { xs: "flex", md: "none" } }}
                            >
                              {storeAddress?.LocationPageName ? (
                                <Box className={style.showDetailsBtn}>
                                  <Link
                                    href={`/locations/${stringToSlug(
                                      storeAddress.LocationPageName as string
                                    )}`}
                                    passHref
                                  >
                                    <div
                                      role="button"
                                      aria-label="Show Details"
                                      tabIndex={0}
                                      onClick={(event) => {
                                        handleClose(event);
                                      }}
                                      className={style.storeLink}
                                    >
                                      {role === USER_TYPE.ASSOCIATE && !isAgent
                                        ? "Show Details"
                                        : "Store Details"}
                                    </div>
                                  </Link>
                                </Box>
                              ) : null}
                            </Grid>
                          </Grid>
                          {storeAddress?.LocationPageName ? (
                            <Box
                              sx={{ display: { xs: "none", md: "block" } }}
                              className={style.showDetailsBtn}
                            >
                              <Link
                                href={`/locations/${stringToSlug(
                                  storeAddress.LocationPageName as string
                                )}`}
                                passHref
                              >
                                <div
                                  role="button"
                                  aria-label="Show Details"
                                  tabIndex={0}
                                  onClick={(event) => {
                                    handleClose(event);
                                  }}
                                  className={style.storeLink}
                                >
                                  {role === USER_TYPE.ASSOCIATE && !isAgent
                                    ? "Show Details"
                                    : "Store Details"}
                                </div>
                              </Link>
                            </Box>
                          ) : null}
                          {!isMapLoader && storeHour && storeHour?.length ? (
                            <Box sx={{ display: { xs: "block", sm: "none" } }}>
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
                                    <Box className={style.storeHoursTimingItem}>
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
                                        }
                                      )}
                                    </Box>
                                  </Box>
                                </AccordionDetails>
                              </Accordion>
                            </Box>
                          ) : (
                            <Box
                              mt={2}
                              sx={{ display: { xs: "block", sm: "none" } }}
                            >
                              <Skeleton
                                width={100}
                                height={25}
                                variant="rectangular"
                              />
                            </Box>
                          )}
                        </Box>
                      </Box>
                    </Grid>
                    <Grid item xs={12} sm={6}>
                      {storeAddress.Distance ? (
                        <Box
                          className={style.defaultAddressTiming}
                          role="heading"
                          aria-level={4}
                          aria-label={`${Math.round(
                            Number(storeAddress?.Distance) * 0.001 * 0.6213712
                          )}`}
                          tabIndex={0}
                          sx={{
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <>
                            {" "}
                            {parseFloat(
                              (
                                Number(storeAddress?.Distance) *
                                0.001 *
                                0.6213712
                              ).toFixed(
                                Number(storeAddress?.Distance) % 1 === 0 ? 0 : 1
                              )
                            ).toLocaleString("en-US")}
                            &nbsp; miles
                          </>
                        </Box>
                      ) : null}
                      {!isMapLoader && storeHour && storeHour?.length ? (
                        <Box
                          sx={{ display: { xs: "none", sm: "block" } }}
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
                                (storeHours: StoreHoursDTO, key: number) => {
                                  return (
                                    <Box
                                      key={key}
                                      className={style.storeHoursTimingItem}
                                    >
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
                                }
                              )
                              : weekdays.map(
                                (storeHours: string, key: number) => {
                                  return (
                                    <Box
                                      key={key}
                                      className={style.storeHoursTimingItem}
                                    >
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
                                }
                              )}
                          </Box>

                          <Box className={style.storeHoursVerticalBar}></Box>
                        </Box>
                      ) : (
                        <Box>
                          <Box sx={{ display: { xs: "none", sm: "block" } }}>
                            <StoreTiming />
                          </Box>
                        </Box>
                      )}
                    </Grid>
                  </Grid>

                  <Box className={style.sideBarBtn}>
                    <Box sx={{ width: "100%" }}>
                      <Button
                        variant="contained"
                        className={style.btnColor}
                        sx={{ width: "100%" }}
                        onClick={(event) => {
                          handleSetStore(event, storeAddress);
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
                        Set as my store
                      </Button>
                    </Box>
                    {!isAgent && (
                      <Box
                        sx={{ width: "100%" }}
                        className={style.storeBtnMarginLeft}
                      >
                        {role !== USER_TYPE.ASSOCIATE ? (
                          <Box>
                            <Button
                              variant="contained"
                              className={style.btnColor}
                              sx={{ width: "100%" }}
                              onClick={(event) => {
                                bookEyeExamHandler(router, storeAddress);
                                handleClose(event);
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
                              Book Eye Exam
                            </Button>
                          </Box>
                        ) : createAppintmentPermisison ? (
                          <Button
                            variant="contained"
                            className={style.btnColor}
                            sx={{ width: "100%" }}
                            onClick={(event) =>
                              handleBookAppointment(event, storeAddress)
                            }
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
                            Book Appointment
                          </Button>
                        ) : (
                          <></>
                        )}
                      </Box>
                    )}
                  </Box>
                  <Divider />
                </div>
              )
            );
          })
        ) : (
          <Box className={style.noStoreText}>
            {" "}
            <p>{!openLoader ? "No stores found" : null}</p>{" "}
          </Box>
        )}
        {openLoader
          ? Array.from({ length: 3 }).map((_, index) => (
            <div key={index}>
              <Grid container pb={2}>
                <Grid item xs={12} sm={6}>
                  <StoreSkeleton />
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
                  <StoreTiming />
                </Grid>
              </Grid>
              <Divider />
            </div>
          ))
          : null}
        {!openLoader ? (
          pageNumber < pageSize && allStoreData.length ? (
            <Box className={style.centerBtn}>
              <Button
                onClick={handleLoadMore}
                variant="contained"
                className={style.loadMoreBtn}
              >
                Load More
              </Button>
            </Box>
          ) : null
        ) : (
          <Box py={8} className={style.loadMoreSkeleton}>
            <Skeleton height={35} width={100} variant="rounded" />
          </Box>
        )}
      </Box>
    </>
  );
}

export default SelectAStore;
