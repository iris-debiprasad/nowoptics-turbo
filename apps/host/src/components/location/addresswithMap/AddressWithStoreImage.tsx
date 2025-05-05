import dynamic from "next/dynamic";
import Image from "next/image";
import { FunctionComponent, useEffect, useState } from "react";

import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AlertColor,
  Box,
  Button,
  Grid,
} from "@mui/material";

import style from "./AddressWithImage.module.scss";

import earthIcon from "@root/assets/Images/icons/earth.svg";


import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { StoreContentDTO, StoreDetailsDTO } from "@/types/store.type";
import {
  BRAND,
  BRAND_NAME,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import { useAppSelector } from "@root/host/src/store/useStore";
import { PhoneNumber, StoreHoursDTO } from "@root/host/src/types/SideBar.types";
import {
  bookEyeExamHandler,
  handleBookAppointment,
} from "@root/host/src/utils/common.utils";
import Link from "next/link";
import { useRouter } from "next/router";
import { IMask } from "react-imask";
import Breadcrumb from "@/components/breadcrumb/Breadcrumb";
import IconSVG from "@/components/iconsvg/IconSVG";
import { getWeekday } from "@/utils/storeHourFormatter";
import { timezoneConverter } from "@/utils/timezone.utils";


type StoreDTO = {
  selectedStore: StoreDetailsDTO;
  storeDetails: StoreContentDTO | null;
  role: string | null;
  brand?: string;
};


const AddressWithMap = ({
  selectedStore,
  storeDetails,
  role,
  brand,
}: StoreDTO) => {
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);
  const [googlePhoneNumber, setGooglePhoneNumber] = useState<string>("");
  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });
  const getMaskedPhoneNumber = (phoneNumber: string) => {
    maskedMobile.resolve(phoneNumber);
    return maskedMobile.value;
  };

  useEffect(() => {
    if (selectedStore?.PhoneNumber.length) {
      const googlePhoneNumber = selectedStore?.PhoneNumber.find(
        (phone: PhoneNumber) => phone.Type?.toLowerCase() === "google"
      );
      if (googlePhoneNumber) {
        setGooglePhoneNumber(
          googlePhoneNumber.PhoneNumber
            ? getMaskedPhoneNumber(googlePhoneNumber.PhoneNumber)
            : ""
        );
      }
    }
  }, [selectedStore]);

  const [statusMessage, setStatusMessage] = useState("Closed");
  const [timing, setTiming] = useState("");

  useEffect(() => {
    if (
      selectedStore &&
      selectedStore.CloseAt &&
      selectedStore.OpenAt &&
      selectedStore.TimeZoneCode
    ) {
      const storeTimezone = timezoneConverter(selectedStore.TimeZoneCode);

      const closeTimeParts = selectedStore.CloseAt.split(":");
      const openTimeParts = selectedStore.OpenAt.split(":");

      const currentTime = new Date();

      const options = { timeZone: storeTimezone };
      const currentTimeInStoreTimezone = new Date(
        currentTime.toLocaleString("en-US", options));
      const storeHour = getWeekday(selectedStore?.WorkingHours);

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
        storeHour[currentDay].status == "CLOSED"
        ) {

        setStatusMessage("Closed");
        setTiming("");
        
      } else if (
        currentTimeInStoreTimezone >= openTime &&
        currentTimeInStoreTimezone <= closeTime
      ) {
        setStatusMessage("Open Now");
        setTiming(
          ` Closes at ${new Date(
            `2024-01-01T${selectedStore?.CloseAt}`
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}`
        );
      } else {
        setStatusMessage("Closed");
        setTiming(
          ` Opens at ${new Date(
            `2024-01-01T${selectedStore?.OpenAt}`
          ).toLocaleTimeString("en-US", {
            hour: "numeric",
            minute: "numeric",
            hour12: true,
          })}`
        );
      }
    }
  }, [selectedStore]);

  return (
    <div className={style.mainBox}>
      <Grid container spacing={2} sx={{ display: { xs: "none", md: "block" } }}>
        <Grid item xs={12} sx={{ ml: -2 }}>
          {selectedStore && selectedStore.BrandName ? (
            <Breadcrumb
              links={[
                { label: "Home", href: "/" },
                { label: "All Locations", href: "/schedule-exam" },
                {
                  label:
                    selectedStore.City.charAt(0).toUpperCase() +
                    selectedStore.City.slice(1),
                  href: "/",
                },
              ]}
            />
          ) : null}
        </Grid>
      </Grid>
      {Boolean(selectedStore) ? (
        <Box className={style.addressMapWrapper}>
          <Box className={style.leftSideAddressWrapper}>
            <Box className={style.defaultAddressContainer}>
              <Box sx={{ width: "100%" }} className={style.addressDetails}>
                <p className={style.storeDetailing}>
                  <span className={style.defaultAddressHeading}>
                    {brand == BRAND.MEL
                      ? BRAND_NAME.MEL
                      : selectedStore.BrandName}{" "}
                    Near You
                  </span>
                  <span className={style.brandName}>
                    {selectedStore?.WebDescription}, {selectedStore?.StateCode}
                  </span>
                </p>
                {(
                  new Date(selectedStore?.StoreOpeningDateTime || "") >
                  new Date()
                ) ? (
                  <Box className={style.serviceSubTxt}>
                    <Box mr={1}>
                      <Box mt={0.5}>
                        <IconSVG
                          width="14"
                          height="14"
                          viewBox="0 0 22 16"
                          fill="none"
                          fillP="#002e6d"
                          name="flag_icon"
                        />
                      </Box>
                    </Box>
                    <Box className={style.grandOpening}>Grand Opening Soon</Box>
                  </Box>
                ) : (
                  <Box className={style.defaultAddressTiming}>
                    <span className={statusMessage != "Closed" ? style.openNowTxt : style.closeTxt}>{statusMessage}</span>
                    {selectedStore?.CloseAt ? <span>{timing}</span> : null}
                  </Box>
                )}

                <Box
                  sx={{
                    width: "100%",
                    display: "flex",
                    alignItems: { xs: "center", md: "flex-start" },
                    justifyContent: "space-between",
                  }}
                  className={style.detailsAddressWrapper}
                >
                  <Box className={style.detailsAddress}>
                    <Box className={style.defaultAddressDetails}>
                      <Box className={style.addressLine}>
                        <Box mr={1}>
                          <Box mt={0.5}>
                            <IconSVG
                              width="16"
                              height="16"
                              viewBox="0 0 22 22"
                              fill="none"
                              fillP="#4D4D4D"
                              name="location_icon"
                            />
                          </Box>
                        </Box>
                        <Box>{selectedStore?.AddressLine1}</Box>
                      </Box>
                      <Box ml={3} className={style.city}>
                        {selectedStore?.City},&nbsp;{selectedStore?.StateCode}
                        &nbsp;
                        {selectedStore?.ZipCode}
                      </Box>
                    </Box>

                    <Box className={style.directionBox}>
                      {selectedStore?.Distance ? (
                        <Box className={style.distanceTxt}>
                          {parseFloat(
                            (
                              Number(selectedStore?.Distance) *
                              0.001 *
                              0.6213712
                            ).toFixed(
                              Number(selectedStore?.Distance) % 1 === 0 ? 0 : 1
                            )
                          )}{" "}
                          Miles Away
                        </Box>
                      ) : null}
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
                      >
                        (GET DIRECTIONS)
                      </Button>
                    </Box>

                    {selectedStore?.PhoneNumber.length && googlePhoneNumber ? (
                      <Box className={style.telephone}>
                        <Box mr={0.5}>
                          <Box mt={0.5}>
                            <IconSVG
                              width="16"
                              height="16"
                              viewBox="0 0 22 22"
                              fill="none"
                              fillP="#4D4D4D"
                              name="phone_icon"
                            />
                          </Box>
                        </Box>
                        <Box>
                          {googlePhoneNumber ? (
                            <a
                              href={"tel:" + googlePhoneNumber}
                              className={style.phoneLink}
                            >
                              {googlePhoneNumber}
                            </a>
                          ) : null}
                        </Box>
                      </Box>
                    ) : null}
                    <Box className={style.serviceWrapper}>
                      <Box
                        sx={{ display: "flex", justifyContent: "center" }}
                        className={style.serviceTxt}
                      >
                        Services Offered Here
                      </Box>
                      {brand === BRAND.SO &&
                        selectedStore.HasSameDayDelivery && (
                          <Box
                            sx={{ display: "flex", justifyContent: "center" }}
                            className={style.hasSameDay}
                          >
                            <Box mr={1}>
                              <Box mt={0.5}>
                                <IconSVG
                                  width="14"
                                  height="14"
                                  viewBox="0 0 512 512"
                                  fill="#48c87e"
                                  name="sameDay_delivery_icon"
                                />
                              </Box>
                            </Box>
                            <Box>Same Day Pickup</Box>
                          </Box>
                        )}
                      {selectedStore?.IsSpeakSpanish && (
                        <Box
                          sx={{ display: "flex", justifyContent: "center" }}
                          className={style.serviceSubTxt}
                        >
                          <Box mr={1}>
                            <Box mt={0.5}>
                              <Image
                                src={earthIcon}
                                height={16}
                                width={16}
                                alt="Earth icon"
                              />
                            </Box>
                          </Box>
                          <Box>Hablamos Español</Box>
                        </Box>
                      )}

                      <Box>
                        <Accordion
                          elevation={0}
                          sx={{
                            backgroundColor: "transparent",
                          }}
                        >
                          <AccordionSummary
                            sx={{
                              display: "flex",
                              justifyContent: "center",
                              padding: "0px 20px",
                              minHeight: "0px",
                              marginLeft: "30px",
                            }}
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
                            <Box
                              sx={{
                                width: "100%",
                                marginLeft: "30px",
                                marginTop: "-15px",
                              }}
                            >
                              <Box className={style.storeHoursTimingItem}>
                                <Box className={style.dayHeading}>Day</Box>
                                <Box className={style.statusHeading}>Hours</Box>
                              </Box>

                              <Box>
                                {getWeekday(
                                  selectedStore?.WorkingHours || []
                                ).map(
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
                                )}
                              </Box>
                            </Box>
                          </AccordionDetails>
                        </Accordion>
                      </Box>
                      <Box className={style.mobileBookExamBtnWrapper}>
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
                          <Button
                            component={Link}
                            href="/book-eye-exam"
                            onClick={() => {
                              bookEyeExamHandler(null, selectedStore);
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
                            Book Eye Exam
                          </Button>
                        )}
                      </Box>
                    </Box>
                  </Box>
                  <Box className={style.storeHereSection}>
                    <Box>
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
                        <Button
                          component={Link}
                          href="/book-eye-exam"
                          onClick={() => {
                            bookEyeExamHandler(null, selectedStore);
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
                          Book Eye Exam
                        </Button>
                      )}
                      <Box className={style.serviceTxt}>
                        Services Offered Here
                      </Box>
                      {brand === BRAND.SO &&
                        selectedStore.HasSameDayDelivery && (
                          <Box className={style.hasSameDay}>
                            <Box mr={1}>
                              <Box mt={0.5}>
                                <IconSVG
                                  width="22"
                                  height="16"
                                  viewBox="0 0 22 16"
                                  fill="#48c87e"
                                  name="sameDay_delivery_icon"
                                />
                              </Box>
                            </Box>
                            <Box>Same Day Pickup</Box>
                          </Box>
                        )}
                      {selectedStore?.IsSpeakSpanish && (
                        <Box className={style.serviceSubTxt}>
                          <Box mr={1}>
                            <Box mt={0.5}>
                              <Image
                                src={earthIcon}
                                height={16}
                                width={16}
                                alt="Earth icon"
                              />
                            </Box>
                          </Box>
                          <Box>Hablamos Español</Box>
                        </Box>
                      )}
                    </Box>
                  </Box>
                </Box>
              </Box>
            </Box>
            <Box className={style.storeHoursContainer}>
              <Box className={style.storeHoursTimingItem}>
                <Box className={style.dayHeading}>Day</Box>
                <Box className={style.statusHeading}>Hours</Box>
              </Box>

              <Box>
                {getWeekday(selectedStore?.WorkingHours || []).map(
                  (storeHours: StoreHoursDTO, key: number) => {
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
                  }
                )}
              </Box>
            </Box>
          </Box>
          <Box className={style.rightSideMapWrapper}>
            <div className={style.imgStore}>
              <Image
                src={storeDetails?.AboutEyeCareSection?.Image?.ImageUrl || ""}
                alt={storeDetails?.AboutEyeCareSection?.Image?.AltText || ""}
                className={style.storeImage}
                width={900}
                height={700}
              />
            </div>
          </Box>
        </Box>
      ) : null}
    </div>
  );
};

export default AddressWithMap;
