import React, { FunctionComponent, useEffect, useState } from "react";
import { IMask } from "react-imask";
import style from "./NearbyStore.module.scss";
import {
  PhoneNumber,
  StoreContentDTO,
  StoreDetailsDTO,
} from "@root/host/src/types/store.type";
import { AlertColor, Box, Grid } from "@mui/material";
import Link from "next/link";
import { GetPublicStoreLocatorGridForLocation } from "@/service/storeLocator.service";
import {
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
} from "@root/host/src/constants/common.constants";
import { STORE_ERROR_MESSAGE } from "@root/host/src/constants/store.constants";
import {
  useSnackBar,
} from "@/contexts/Snackbar/SnackbarContext";
import dayjs from "dayjs";
import { stringToSlug } from "@root/host/src/utils/common.utils";
import MobileSingleImageSlider from "@/components/image_slider/MobileSingleImageSlider";

type Props = {
  storeDetails: StoreContentDTO;
  selectedStore: StoreDetailsDTO | null;
};


const NearbyStore = ({ storeDetails, selectedStore }: Props) => {
  const { showSnackBar } = useSnackBar();
  const [nearByStore, setNearByStore] = useState<StoreDetailsDTO[]>([]);
  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });
  const getMaskedPhoneNumber = (phoneNumber: string) => {
    maskedMobile.resolve(phoneNumber);
    return maskedMobile.value;
  };

  useEffect(() => {
    if (selectedStore?.Latitude && selectedStore?.Longitude)
      GetPublicStoreLocatorGridForLocation(
        "1",
        "",
        "",
        selectedStore.Latitude.toString(),
        selectedStore.Longitude.toString(),
        5
      )
        .then((response) => {
          const data = response?.data?.Result.Results;
          const filterData = data.filter((item: StoreDetailsDTO ) => item.Id !== selectedStore.Id);
          setNearByStore(filterData);
        })
        .catch((err) => {
          showSnackBar(
            err?.response
              ? err?.response?.data?.Error?.Description
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
  }, []);

  return (
    <div className={style.mainBox}>
      {storeDetails?.NearBySection && (
        <Box className={style.title}>
          <Box
            dangerouslySetInnerHTML={{
              __html: `${storeDetails.NearBySection.Heading}`,
            }}
          ></Box>
          {selectedStore?.City ? <h2> &nbsp;IN {selectedStore.City.toUpperCase()}</h2> : null}
        </Box>
      )}
      <Box
        sx={{
          width: "100%",
          display: { xs: "none", md: "flex", justifyContent: "center" },
        }}
      >
        <Grid container sx={{ maxWidth: "1200px" }} spacing={8}>
          {nearByStore &&
            nearByStore.length &&
            nearByStore.map((item, index) => {
              return (
                <Grid item lg={3} xs={12} key={index}>
                  <div className={style.imgBox}>
                    <Box className={style.boxContent}>
                      <Box className={style.storeBox}>
                        <h3>
                          <u>{item.LocationPageName ? <Link href={
                            {
                              pathname: `/locations/${stringToSlug(
                                item.LocationPageName as string
                              )}`,
                              query: {
                                pid: item.Id,
                              },
                            }
                          } as={`/locations/${stringToSlug(
                            item.LocationPageName as string
                          )}`}>{item?.WebDescription}</Link> : item?.WebDescription }</u>&nbsp;
                        </h3>
                        {item?.Distance ? (
                          <div className={style.distance}>
                            {(
                              Number(item?.Distance) *
                              0.001 *
                              0.6213712
                            ).toFixed(
                              Number(item?.Distance) % 1 === 0 ? 0 : 1
                            )}{" "}
                            miles
                          </div>
                        ) : null}
                      </Box>

                      <Box>
                        <Box className={style.storeDetails}>
                          <h4>{item?.AddressLine1}</h4>
                          <h4>
                            {item?.City}, {item?.StateCode} {item?.ZipCode}
                          </h4>
                          {item?.PhoneNumber.length
                            ? item?.PhoneNumber.map((phone: PhoneNumber) =>
                              phone.Type === "Google" ? (
                                <Box key={phone.PhoneNumber}>
                                  {getMaskedPhoneNumber(phone.PhoneNumber)}
                                </Box>
                              ) : null
                            )
                            : null}
                        </Box>
                        <h4 className={style.workingHour}>
                          {item?.OpenAt && item?.CloseAt
                            ? `${dayjs().format('ddd')}: ${new Date(
                              `2023-01-01T${item?.OpenAt}`
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })} to ${new Date(
                              `2023-01-01T${item?.CloseAt}`
                            ).toLocaleTimeString("en-US", {
                              hour: "numeric",
                              minute: "numeric",
                              hour12: true,
                            })} `
                            : "Closed"}
                        </h4>
                      </Box>
                    </Box>
                  </div>
                </Grid>
              );
            })}
        </Grid>
      </Box>
      <Box sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
        {nearByStore.length ? (
          <MobileSingleImageSlider
            NearByStores={nearByStore.map((item) => {
              return {
                BrandName: item.WebDescription,
                AddressLine1: item.AddressLine1,
                Latitude: item.Latitude,
                Longitude: item.Longitude,
                PhoneNumber: item.PhoneNumber,
                OpenAt: item.OpenAt,
                CloseAt: item.CloseAt,
                Distance: (Number(item?.Distance) * 0.001 * 0.6213712).toFixed(
                  Number(item?.Distance) % 1 === 0 ? 0 : 1
                ),
                City: item.City,
                StateCode: item.StateCode,
                ZipCode: item.ZipCode,
                Id: item.Id.toString(),
              };
            })}
            sectionName="NearBySection"
          />
        ) : null}
      </Box>
      <Box className={style.locationBtn}>
        <Link href="/schedule-exam" className={"seoLinkBtn"}>
          <u>ALL LOCATIONS</u>
        </Link>
      </Box>
    </div>
  );
};

export default NearbyStore;
