import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { FunctionComponent, useEffect, useState } from "react";

import { Box, Grid, Typography, AlertColor, Button } from "@mui/material";

import style from "./BookEyeExamContent.module.scss";
import { StoreContentDTO, StoreDetailsDTO } from "@root/host/src/types/store.type";
import {
  bookEyeExamHandler,
  handleBookAppointment,
} from "@root/host/src/utils/common.utils";
import Link from "next/link";
import {
  BRAND,
  BRAND_NAME,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { useAppSelector } from "@root/host/src/store/useStore";
import CustomMap from "@/components/custommap/CustomMap";
import IconSVG from "@/components/iconsvg/IconSVG";

type Props = {
  storeDetails: StoreContentDTO;
  selectedStore: StoreDetailsDTO;
  role: string | null;
  brand?: string;
};


export default function BookEyeExamContent({
  storeDetails,
  selectedStore,
  role,
  brand,
}: Props) {
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  return (
    <Box className={style.mainBox}>
      <div className={style.mobileImageWrapper}>
        {selectedStore ? (
          <CustomMap
            centers={[
              {
                id: Number(selectedStore?.Id),
                name: brand == BRAND.MEL ? BRAND_NAME.MEL : selectedStore?.BrandName || "",
                coordinates: {
                  lat: Number(selectedStore?.Latitude),
                  lng: Number(selectedStore?.Longitude),
                },
              },
            ]}
          />
        ) : null}
      </div>
      {storeDetails?.AboutEyeCareSection && (
        <Box
          className={style.title}
          dangerouslySetInnerHTML={{
            __html: storeDetails.AboutEyeCareSection.Heading,
          }}
        ></Box>
      )}

      <Grid container className={style.content}>
        <Grid item lg={3} xs={4}>
          <div className={style.imgBox}>
            {selectedStore ? (
              <CustomMap
                centers={[
                  {
                    id: Number(selectedStore?.Id),
                    name: brand == BRAND.MEL ? BRAND_NAME.MEL : selectedStore?.BrandName || "",
                    coordinates: {
                      lat: Number(selectedStore?.Latitude),
                      lng: Number(selectedStore?.Longitude),
                    },
                  },
                ]}
              />
            ) : null}
          </div>
        </Grid>
        <Grid item lg={9} md={8} xs={12} className={style.rightBox}>
          <Box>
            {storeDetails?.AboutEyeCareSection.Description ? (
              <Typography
                component="div"
                className={style.des}
                dangerouslySetInnerHTML={{
                  __html: storeDetails?.AboutEyeCareSection.Description,
                }}
              />
            ) : null}
          </Box>
          {storeDetails?.AboutEyeCareSection.Features.length
            ? storeDetails?.AboutEyeCareSection.Features.map(
                (feature, index) => {
                  return (
                    <Box key={feature.Heading} className={style.featureBox}>
                      <Box px={2} className={style.iconBox}>
                        <div className={style.sliderIconItem}>
                          <div>
                            <Box
                              className={style.sliderIconImg}
                              sx={{
                                backgroundImage: `url(${feature.Image.ImageUrl})`,
                              }}
                            ></Box>
                          </div>
                        </div>
                      </Box>
                      {isMounted && <Box>
                        <h2
                          className={style.heading}
                          dangerouslySetInnerHTML={{
                            __html: feature.Heading,
                          }}
                        />
                        <p
                          className={style.subText}
                          dangerouslySetInnerHTML={{
                            __html: feature.Description,
                          }}
                        />
                      </Box>}
                      
                    </Box>
                  );
                }
              )
            : null}

          <Box className={style.btnBookEye}>
            {role === USER_TYPE.ASSOCIATE ? (
              <Button
                onClick={() => {
                  if (!isCDC) {
                    handleBookAppointment(
                      router,
                      selectedStore?.Id.toString() || ""
                    );
                  } else {
                    showSnackBar(
                     "Please set this store first for appointment",
                      SNACKBAR_COLOR_TYPE.ERROR as AlertColor
                    );
                  }
                }}
                className={"seoBookExamBtn"}
                endIcon={
                  <IconSVG
                    width="17"
                    height="18"
                    viewBox="0 0 17 18"
                    fill="none"
                    fillP="#010101"
                    name="arrow_solid_right"
                  />
                }
              >
                Appointment
              </Button>
            ) : (
              <Link
                href="/book-eye-exam"
                className={"seoBookExamBtn"}
                onClick={() => {
                  if (selectedStore) {
                    bookEyeExamHandler(null, selectedStore);
                  }
                }}
              >
                Book Eye Exam &nbsp;
                <IconSVG
                  width="17"
                  height="18"
                  viewBox="0 0 17 18"
                  fill="none"
                  fillP="#010101"
                  name="arrow_solid_right"
                />
              </Link>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
