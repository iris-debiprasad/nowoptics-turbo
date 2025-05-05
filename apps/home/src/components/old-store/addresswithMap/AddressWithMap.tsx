import dayjs from "dayjs";
import Image from "next/image";
import dynamic from "next/dynamic";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Box, Button, Grid } from "@mui/material";

import { GetUserStoreDetails } from "@/service/storeLocator.service";

import style from "./AddressWithMap.module.scss";

import storeHours from "@root/assets/Images/icons/storeHours.svg";

import { getWeekday } from "@root/host/src/utils/storeHourFormatter";

import { DATE_FORMAT } from "@root/host/src/constants/common.constants";

import { StoreHoursDTO } from "@/types/sidebar.type";
import { StoreDetailsDTO, StoreIdDTO } from "@/types/store.type";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { Props as MapDTO } from "@root/host/src/types/Map.type";
import { BreadcrumbProps } from "@root/host/src/types/Breadcrumb.types";
import { PhoneNumber } from "@root/host/src/types/SideBar.types";

const IconSVG = dynamic(() => import("Host/IconSVG"), {
  ssr: false,
}) as FunctionComponent<IconDTO>;

const CustomMap = dynamic(() => import("Host/Custommap"), {
  ssr: false,
}) as FunctionComponent<MapDTO>;

const Breadcrumb = dynamic(() => import("Host/Breadcrumb"), {
  ssr: false,
}) as FunctionComponent<BreadcrumbProps>;

export const links = [
  { label: "Home", href: "/" },
  { label: "Mishwaka", href: "/" },
];

const AddressWithMap = ({ pid }: StoreIdDTO) => {
  const storeId = pid;
  const [selectedStore, setSelectedStore] = useState<StoreDetailsDTO | null>(
    null
  );

  const getStoreDetailsById = async () => {
    try {
      if (storeId) {
        const { data } = await GetUserStoreDetails(
          storeId,
          dayjs().format(DATE_FORMAT)
        );
        setSelectedStore(data.Result);
      }
    } catch (err) {
      //TODO- Snackbar will be add here
    }
  };
  useEffect(() => {
    getStoreDetailsById();
  }, [storeId]);

  return (
    <div className={style.mainBox}>
      <Grid container spacing={2}>
        <Grid item xs={12} sx={{ ml: -2 }}>
          <Breadcrumb links={links} />
        </Grid>
      </Grid>
      {Boolean(selectedStore) ? (
        <Box className={style.addressMapWrapper}>
          <Box className={style.leftSideAddressWrapper}>
            <Box className={style.defaultAddressContainer}>
              <Box>
                <h2 className={style.defaultAddressHeading}>
                  {selectedStore?.BrandName}
                </h2>
                <Box className={style.defaultAddressTiming}>
                  Closed : {selectedStore?.CloseAt}
                </Box>

                <Box className={style.defaultAddressDetails}>
                  <Box>{selectedStore?.AddressLine1}</Box>
                  <Box>{selectedStore?.City}</Box>
                  <Box>
                    {selectedStore?.StateCode}&nbsp;{selectedStore?.ZipCode}
                  </Box>
                </Box>

                <Box className={style.directionBox}>
                  <Button
                    className={style.directionBtn}
                    size="small"
                    variant="outlined"
                    onClick={() => {
                      window.open(
                        `https://www.google.com/maps/dir/?api=1&destination=${selectedStore?.Latitude},${selectedStore?.Longitude}`,
                        "_blank"
                      );
                    }}
                    endIcon={
                      <IconSVG
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="#000000"
                        name="direction_icon"
                      />
                    }
                  >
                    Get Directions
                  </Button>
                </Box>
                <Box className={style.telephone}>
                  {selectedStore?.PhoneNumber.length
                    ? selectedStore?.PhoneNumber.map((phone: PhoneNumber) => (
                        <Box key={phone.PhoneNumber}>{`(${String(
                          phone?.PhoneNumber
                        ).slice(0, 3)}) ${String(phone?.PhoneNumber).slice(
                          3
                        )}`}</Box>
                      ))
                    : null}
                </Box>
                <Box className={style.defaultAddressSameDay}>
                  <Button
                    variant="contained"
                    className={style.btnAppointments}
                    endIcon={
                      <IconSVG
                        width="15"
                        height="15"
                        viewBox="0 0 15 15"
                        fill="#010101"
                        name="arrow_solid_right"
                      />
                    }
                  >
                    CHECK APPOINTMENTS
                  </Button>
                </Box>
              </Box>
            </Box>

            <Box className={style.storeHoursContainer}>
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
                {getWeekday(selectedStore?.WorkingHours || []).map(
                  (storeHours: StoreHoursDTO, key: number) => {
                    let colorBlack: Object = {};
                    if (new Date().getDay() === key) {
                      colorBlack = { color: "#000000" };
                    }
                    return (
                      <Box key={key} className={style.storeHoursTimingItem}>
                        <Box className={style.day} sx={colorBlack}>
                          {storeHours.day}
                        </Box>
                        <Box className={style.status} sx={colorBlack}>
                          {storeHours.status}
                        </Box>
                      </Box>
                    );
                  }
                )}
              </Box>

              <Box className={style.storeHoursVerticalBar}></Box>
            </Box>
          </Box>
          <Box className={style.rightSideMapWrapper}>
            {selectedStore ? (
              <CustomMap
                centers={[
                  {
                    id: Number(selectedStore?.Id),
                    name: selectedStore?.BrandName || "",
                    coordinates: {
                      lat: Number(selectedStore?.Latitude),
                      lng: Number(selectedStore?.Longitude),
                    },
                  },
                ]}
              />
            ) : null}
          </Box>
        </Box>
      ) : null}
    </div>
  );
};

export default AddressWithMap;
