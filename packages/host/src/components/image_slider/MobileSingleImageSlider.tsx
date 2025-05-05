import React, { useEffect, useState } from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import style from "./ImageSlider.module.scss";
import {
  SINGLE_IMAGE_SLIDER_SETTING,
  INLINE_STYLE,
} from "@/constants/ImageSlider.constants";
import IconSVG from "../iconsvg/IconSVG";
import { ArrowDTO, StoreOfferSliderDTO } from "@/types/ImageSlider.types";
import { Box, Button, Typography } from "@mui/material";
import PrimaryModal from "../primary_modal/PrimaryModal";
import { LocationDTO } from "@/types/SideBar.types";
import { calculateDistance } from "@/utils/calculateDistance";
import { useTranslation } from "react-i18next";
import { IMask } from "react-imask";
import { INPUT_MASK } from "@root/host/src/constants/common.constants";
import { PhoneNumber } from "@/types/store.type";
import dayjs from "dayjs";
import { stringToSlug } from "@/utils/common.utils";
import { useRouter } from "next/router";

function Arrow(props: ArrowDTO) {
  const { onClick, btnType } = props;
  return (
    <div
      onClick={onClick}
      className={`${
        btnType === "next" ? style.nextArrowCls : style.prevArrowCls
      }`}
    >
      <IconSVG
        width="7"
        height="11"
        viewBox="0 0 7 11"
        fill="#000000"
        name="arrow_small"
      />
    </div>
  );
}

const ModalContent = ({
  handleOpen,
  content,
}: {
  handleOpen: () => void;
  content: string;
}) => {
  const { t } = useTranslation();
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography id="modal-modal-title" variant="h6" component="h2">
          Offer Details
        </Typography>
        <Button className={style.crossBtn} onClick={handleOpen}>
          <IconSVG
            width="16"
            height="16"
            viewBox="0 0 16 16"
            fill="var(--primary-text-color)"
            name="modal_cross"
          />
        </Button>
      </Box>
      <Typography id="modal-modal-description">{content}</Typography>
    </>
  );
};

const MobileSingleImageSlider = ({
  Promotions,
  sectionName,
  NearByStores,
}: StoreOfferSliderDTO) => {
  const router = useRouter();
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");
  const settings = SINGLE_IMAGE_SLIDER_SETTING;
  const [userLocation, setUserLocation] = useState<LocationDTO | null>(null);
  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });
  const getMaskedPhoneNumber = (phoneNumber: string) => {
    maskedMobile.resolve(phoneNumber);
    return maskedMobile.value;
  };

  useEffect(() => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition((position) => {
        setUserLocation({
          latitude: position.coords.latitude,
          longitude: position.coords.longitude,
        });
      });
    }
  }, []);
  const handleOpen = (content: string) => {
    setModalOpen(true);
    setModalContent(content);
  };
  const { t } = useTranslation();

  return (
    <div className={style.carouselContainer}>
      <Slider
        {...settings}
        prevArrow={
          NearByStores?.length ? <Arrow btnType={"prev"} /> : undefined
        }
        nextArrow={
          NearByStores?.length ? <Arrow btnType={"next"} /> : undefined
        }
        lazyLoad="ondemand"
        appendDots={(dots) => (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <ul style={INLINE_STYLE.dotsul} className={style.dotsLi}>
              {dots}
            </ul>
          </div>
        )}
      >
        {Promotions
          ? Promotions?.length
            ? Promotions.map((item, index: number) => {
                return (
                  <div key={index}>
                    <div className={style.imgBox}>
                      {item.PromotionalText ? (
                        <Box
                          className={style.boxContent}
                          dangerouslySetInnerHTML={{
                            __html: item.PromotionalText,
                          }}
                        ></Box>
                      ) : null}

                      <Box
                        sx={{
                          marginTop: "20px",
                        }}
                      >
                        <Button
                          className={style.disclaimerBtn}
                          onClick={() => handleOpen(item.Disclaimer)}
                        >
                          *See details
                        </Button>
                      </Box>
                    </div>
                  </div>
                );
              })
            : null
          : NearByStores?.length
          ? NearByStores.map((item, index: number) => {
              return (
                <div key={index}>
                  <div className={style.nearbyStoreWrapper}>
                    <Box className={style.boxContent}>
                      <h2>
                        <u
                          onClick={() => {
                            router.push(
                              {
                                pathname: `/locations/${stringToSlug(
                                  item.BrandName as string
                                )}`,
                                query: {
                                  pid: item.Id,
                                },
                              },
                              `/locations/${stringToSlug(
                                item.BrandName as string
                              )}`,
                              { shallow: true }
                            );
                          }}
                        >
                          {item.BrandName}
                        </u>
                        &nbsp;
                        {item?.Distance ? (
                          <span className={style.distance}>
                            {item.Distance} miles
                          </span>
                        ) : null}
                      </h2>

                      <Box className={style.storeDetails}>
                        <h4 style={{ fontWeight: 400 }}>{item.AddressLine1}</h4>
                        <h4 style={{ fontWeight: 400 }}>
                          {item?.City}, {item?.StateCode} {item?.ZipCode}
                        </h4>
                        {item?.PhoneNumber.length
                          ? item?.PhoneNumber.map((phone: PhoneNumber) =>
                              phone.Type === "Google" ? (
                                <a
                                  key={phone.PhoneNumber}
                                  href={`tel:${phone.PhoneNumber}`}
                                >
                                  {getMaskedPhoneNumber(phone.PhoneNumber)}
                                </a>
                              ) : null
                            )
                          : null}
                        <h4
                          style={{ fontWeight: 400 }}
                          className={style.workingHour}
                        >
                          {item?.OpenAt && item?.CloseAt
                            ? `${dayjs().format("ddd")}: ${new Date(
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
                </div>
              );
            })
          : null}
      </Slider>
      <PrimaryModal
        modalOpen={modalOpen}
        setModalOpen={setModalOpen}
        modalInner={
          <ModalContent
            handleOpen={() => setModalOpen(false)}
            content={modalContent}
          />
        }
        cstmStyle={"seoOfferDetailsModal"}
      />
    </div>
  );
};

export default MobileSingleImageSlider;
