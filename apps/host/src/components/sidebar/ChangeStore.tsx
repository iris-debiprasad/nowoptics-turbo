import Link from "next/link";
import { AxiosError } from "axios";
import React, { useCallback, useEffect, useState } from "react";

import {
  Box,
  Grid,
  Divider,
  Button,
  AlertColor,
  TextField,
  FormControlLabel,
  Checkbox,
  InputLabel,
} from "@mui/material";

import StoreHours from "./StoreHours";
import IconSVG from "../iconsvg/IconSVG";
import { useSnackBar } from "../../contexts/Snackbar/SnackbarContext";

import style from "./SideBar.module.scss";

import { calculateDistance } from "../../utils/calculateDistance";

import { GetAuthenticatedStoreLocatorGrid } from "../../service/storeLocator.service";

import { STORE_ERROR_MESSAGE } from "../../constants/store.constants";
import {
  APPOINTMENT_SELECT_STORE_ACTION,
  BRAND_NAME,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
  isZipcodeValidRegex,
  validLocationInputPattern,
} from "../../constants/common.constants";

import {
  ChangeStoreDTO,
  DateFormDTO,
  PhoneNumber,
  SchedulerStoreSelectActionTypeDTO,
  StoreAddressType,
  StoreDetailsDTO,
} from "../../types/SideBar.types";
import { useRouter } from "next/router";
import { stringToSlug } from "../../utils/common.utils";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import { FormSideBarConstant } from "../../constants/SideBarConstants";
import { DesktopDatePicker, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import dayjs from "dayjs";
import { GetGeoLocationData } from "@root/host/src/service/common.service";


const ChangeStore = ({
  handleClose,
  showSnackBar,
  changeStoreSelectCallBack,
  role,
}: ChangeStoreDTO) => {
  const router = useRouter();
  const [pageSize, setPageSize] = useState(0);
  const [pageNumber, setPageNumber] = useState(1);
  const [allStoreData, setAllStoreData] = useState<StoreAddressType[]>([]);
  const [lookupStr, setLookupStr] = useState<string>("");
  const [pressBckSpace, setPressBckSpace] = useState(false);
  const [isOnSiteDoctor, setIsOnsiteDoctor] = React.useState(false);
  const [isNowService, setIsNowService] = React.useState(false);
  const [openLoader, setLoaderOpen] = React.useState(false);
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

  const getGeoLocationFromZipCode = (zipCode: string) => {
    return new Promise((resolve, reject) => {
      GetGeoLocationData(zipCode).then(resp => {
        if (resp.data.results.length > 0) {
          const location = resp.data.results[0].geometry.location;
          resolve({ lat: location.lat, long: location.lng });
        } else {
          resolve({ lat: undefined, long: undefined });
        }
      })
    })

  }


  const getStoreData = async (page: number, searchTerm: string) => {
    const store: StoreAddressType = JSON.parse(
      localStorage.getItem("selectedStore") as string
    );
    setLoaderOpen(page === 1);

    let lat = null;
    let long = null;

    if (searchTerm && isZipcodeValidRegex.test(searchTerm)) {
      let zipCode = searchTerm;
      if (searchTerm.length > 5) {
        zipCode = `${searchTerm.slice(0, 5)}-${searchTerm.slice(5, searchTerm.length)}`

      }
      const locationData = await getGeoLocationFromZipCode(zipCode) as { lat: string, long: string };
      lat = locationData.lat;
      long = locationData.long
    } else {
      lat = store?.Latitude?.toString();
      long = store?.Longitude?.toString();
    }

    GetAuthenticatedStoreLocatorGrid(
      page.toString(),
      searchTerm || "",
      undefined,
      lat,
      long,
      true,
      isNowService,
      isOnSiteDoctor,
      true,
      formValues.fromDate.value?.toString() || false,
      formValues.toDate.value?.toString() || false,
    )
      .then((response) => {
        const data = response.data;
        setAllStoreData(
          page > 1
            ? [...allStoreData, ...data.Result.Results]
            : data.Result.Results
        );
        setPageSize(data.Result.PageCount);
      })
      .catch((err) => {
        showSnackBar(
          (err as AxiosError)?.message
            ? (err as AxiosError).message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      })
      .finally(() => {
        setLoaderOpen(false);
      });
  };

  useEffect(() => {
    getStoreData(pageNumber, lookupStr);
  }, [isOnSiteDoctor, isNowService, pressBckSpace]);

  const handleLoadMore = () => {
    if (pageSize > pageNumber) {
      getStoreData(pageNumber + 1, lookupStr);
      setPageNumber(pageNumber + 1);
    }
  };

  const selectStore = (store: StoreAddressType) => {
    if (!!changeStoreSelectCallBack) {
      const { Longitude, Latitude } = store;
      // Typecasitng.
      let storeData: StoreDetailsDTO = {
        ...store,
        Distance: store.Distance as number,
        Latitude: store.Latitude as number,
        Longitude: store.Longitude as number,
        PhoneNumber: store?.PhoneNumber as PhoneNumber[],
        WebDescription: store?.WebDescription as string,
        IsSpeakSpanish: null,
        LandMarks: "",
        StoreOpeningDateTime: "",
        TimeZone: "",
        TimeZoneCode: "",
        TotalCount: 0,
        WorkingHours: [],
      };
      changeStoreSelectCallBack(
        storeData,
        APPOINTMENT_SELECT_STORE_ACTION.RESCHEDULE as SchedulerStoreSelectActionTypeDTO
      );
    } else {
      window.localStorage.setItem("selectedStore", JSON.stringify(store));
    }
  };

  function lookupOnClearHandler(event: React.KeyboardEvent) {
    if (event.key === "Backspace" && lookupStr.length <= 1) {
      setPressBckSpace(!pressBckSpace);
      setLookupStr("");
    } else if (event.key === "Enter") {
      lookupOnClickHandler();
    }
  }
  function lookupOnClickHandler() {
    if (lookupStr && validLocationInputPattern.test(lookupStr)) {
      getStoreData(1, lookupStr); // Pass 1 because we need the search result starting from 1st page.
      setPageNumber(1); // Reset page number to 1
    } else {
      showSnackBar(
        "Please enter a valid city, state or zip code",
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
  }

  return (
    <>
      <BackdropLoader openLoader={openLoader} />
      <Grid container className={style.lookupSearch}>
        <Grid item xs={8} sm={8}>
          <Box>
            <TextField
              id="outlined-basic"
              placeholder="Enter City, State Or Zip"
              onKeyDown={lookupOnClearHandler}
              onChange={(e) => setLookupStr(e.target.value)}
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
      <div>

        {
          role === USER_TYPE.ASSOCIATE && (
            <Grid container className={style.lookupSearch}>
              <Grid item xs={8} sm={8}>
                <Box className={style.flexBox}>
                  <Box className={style.marginR}>

                    <InputLabel className={style.inputLabel} htmlFor="fromOrderDate">
                      From Date
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        minDate={
                          dayjs()
                        }
                        maxDate={formValues.toDate.value != null ? dayjs(formValues.toDate.value) : null}
                        className={`${style.textInput} ${style.width}`}
                        value={formValues.fromDate.value}
                        onChange={(newValue) => {
                          let _isvalid = dayjs(newValue).isValid();
                          let _errMsg =
                            FormSideBarConstant.ERROR_MESSAGE.FROM_DATE;
                          if (!_isvalid) {
                            _errMsg =
                              FormSideBarConstant.ERROR_MESSAGE
                                .INVALID_FROM_DATE;
                            _isvalid = false;
                          } else if (dayjs(newValue).isAfter(formValues.toDate.value)) {
                            _errMsg = FormSideBarConstant.ERROR_MESSAGE.INVALID_FROM_DATE;
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



                    <InputLabel className={style.inputLabel} htmlFor="toOrderDate">
                      To Date
                    </InputLabel>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                      <DesktopDatePicker
                        disabled={formValues.fromDate.value === null}
                        minDate={formValues.fromDate.value}
                        maxDate={dayjs(formValues.fromDate.value).add(2, 'year')}
                        className={`${style.textInput} ${style.width}`}
                        value={formValues.toDate.value}
                        onChange={(newValue) => {
                          let _isvalid = dayjs(newValue).isValid();
                          let _errMsg =
                            FormSideBarConstant.ERROR_MESSAGE.TO_DATE;
                          if (!_isvalid) {
                            _errMsg =
                              FormSideBarConstant.ERROR_MESSAGE.INVALID_TO_DATE;
                            _isvalid = false;
                          } else if (dayjs(newValue).isBefore(formValues.fromDate.value)) {

                            _errMsg = FormSideBarConstant.ERROR_MESSAGE.INVALID_TO_DATE;
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
                      getStoreData(1, lookupStr || "");
                    }}
                    data-testid="ApplyButton"
                  >
                    Apply
                  </Button>

                </Box>
              </Grid>
            </Grid>
          )
        }
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
              <span className={style.checkBoxLabelText}>Is On Site Doctor</span>
            }
          />
        </Box>
        <Divider />
        {allStoreData.length ? (
          allStoreData.map((storeAddress) => {
            return (
              <>
                <Grid
                  key={storeAddress.Id}
                  container
                  className={style.yourClosestStoreContainer}
                  sx={{
                    display: "flex",
                    flexDirection: { xs: "column-reverse", sm: "row" },
                  }}
                >
                  <Grid item xs={12} py={2}>
                    <Box sx={{ display: { xs: "block", sm: "none" } }}>
                      {storeAddress.IsOnSiteDoctorAvailable ? (
                        <Box
                          sx={{
                            width: "100%",
                            display: "flex",
                            justifyContent: "flex-end",
                          }}
                        >
                          <Box className={style.defaultAddressSameDay}>
                            <IconSVG
                              width="20"
                              height="20"
                              viewBox="0 0 20 20"
                              fill="none"
                              fillP="#7B7E7B"
                              name="doctor_onsite"
                            />
                            <Box sx={{ marginLeft: 1 }}>
                              On-site Doctor Available
                            </Box>
                          </Box>
                        </Box>
                      ) : null}
                      <Box
                        mt={2}
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          width: "100%",
                        }}
                      >
                        <Box
                          sx={{ width: "100%" }}
                          className={style.changeStoreSelectBtnBox}
                        >
                          <Button
                            variant="contained"
                            className={style.btnColor}
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
                            onClick={(e) => {
                              selectStore(storeAddress);
                              handleClose(e);
                            }}
                          >
                            Select
                          </Button>
                        </Box>
                        <Box sx={{ width: "100%" }}>
                          <div
                            role="button"
                            onClick={(event) => {
                              if (Boolean(storeAddress.LocationPageName)) {
                                router.push(
                                  {
                                    pathname: `/locations/${stringToSlug(
                                      storeAddress.LocationPageName as string
                                    )}`,
                                    query: {
                                      pid: storeAddress.Id,
                                    },
                                  },
                                  `/locations/${stringToSlug(
                                    storeAddress.LocationPageName as string
                                  )}`
                                );
                                handleClose(event);
                              }
                            }}
                            className={style.storeLink}
                          >
                            Store Details
                          </div>
                        </Box>
                      </Box>
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box
                      sx={{ flexDirection: "column" }}
                      className={style.defaultAddressContainer}
                    >
                      <Box>
                        <h2 className={style.defaultAddressHeading}>
                          <span className={style.changeStoreSerialNo}>
                            {storeAddress.StoreNumber.toString()}
                          </span>
                          {storeAddress.WebDescription}
                        </h2>
                        <Box
                          mt={0.5}
                          className={`${style.defaultAddressTiming} ${style.storeChangeTiming}`}
                        >
                          Closed :{" "}
                          {storeAddress?.CloseAt
                            ? `${new Date(
                              `2023-01-01T${storeAddress?.CloseAt}`
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })}`
                            : "Closed"}
                        </Box>
                        <Box className={style.storeChangeTiming}>
                          <StoreHours storeId={1} />
                        </Box>
                      </Box>
                      {storeAddress.HasSameDayDelivery ? (
                        <Box
                          sx={{ marginTop: 2 }}
                          className={style.defaultAddressSameDay}
                        >
                          <IconSVG
                            width="22"
                            height="16"
                            viewBox="0 0 22 16"
                            fill="none"
                            fillP="#7B7E7B"
                            name="sameDay_delivery_icon"
                          />
                          <Box sx={{ marginLeft: 1 }}>Same Day Pickup</Box>
                        </Box>
                      ) : null}
                    </Box>
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <Box className={`${style.defaultStoreAddress} ${storeAddress.BrandName === BRAND_NAME.MEL ? style.defaultStoreMEL : style.defaultStoreSO}`}>
                      <span className={style.eyeLabCircle}> </span>
                      <Box className={style.brandName}>{storeAddress.BrandName}</Box>
                      {storeAddress.Distance ? (
                        <span className={style.eyelab}></span>
                      ) : null}

                      {storeAddress.Distance ? (
                        <Box>
                          {(
                            Number(storeAddress?.Distance) * 0.001 * 0.6213712
                          ).toFixed(1)}&nbsp;
                          miles
                        </Box>
                      ) : null}
                    </Box>
                    <Box className={style.changeStoreBtnBox}>
                      <Box>
                        <div
                          role="button"
                          onClick={(event) => {
                            if (Boolean(storeAddress.LocationPageName)) {
                              router.push(
                                {
                                  pathname: `/locations/${stringToSlug(
                                    storeAddress.LocationPageName as string
                                  )}`,
                                  query: {
                                    pid: storeAddress.Id,
                                  },
                                },
                                `/locations/${stringToSlug(
                                  storeAddress.LocationPageName as string
                                )}`
                              );
                              handleClose(event);
                            }
                          }}
                          className={style.storeLink}
                        >
                          Store Details
                        </div>
                      </Box>
                    </Box>
                    <Box className={style.changeStoreSelectBtnBoxWrapper}>
                      <Box className={style.changeStoreSelectBtnBox}>
                        <Button
                          variant="contained"
                          className={style.btnColor}
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
                          onClick={(e) => {
                            handleClose(e);
                            selectStore(storeAddress);
                          }}
                        >
                          Select
                        </Button>
                      </Box>
                    </Box>
                    <Box className={style.onSiteDoctorWrapper}>
                      {storeAddress.IsOnSiteDoctorAvailable ? (
                        <Box className={style.defaultAddressSameDay}>
                          <IconSVG
                            width="20"
                            height="20"
                            viewBox="0 0 20 20"
                            fill="none"
                            fillP="#7B7E7B"
                            name="doctor_onsite"
                          />
                          <Box sx={{ marginLeft: 1 }}>
                            On-site Doctor Available
                          </Box>
                        </Box>
                      ) : null}
                    </Box>
                  </Grid>
                </Grid>
                <Divider />
              </>
            );
          })
        ) : (
          <Box className={style.noStoreText}>
            {" "}
            <p>No record found</p>{" "}
          </Box>
        )}
        {pageNumber < pageSize && allStoreData.length ? (
          <Box className={style.centerBtn}>
            <Button
              onClick={handleLoadMore}
              variant="contained"
              className={style.loadMoreBtn}
            >
              Load More
            </Button>
          </Box>
        ) : null}
      </div>
    </>
  );
};

export default ChangeStore;
