import { SO_SPECIAL_OFFERS } from "@/constants/specialOffersConstants";
import style from "./specialOffers.module.scss";
import { Grid } from "@mui/material";
import Image from "next/image";
import { getStateCodeForUser, isMobileDevice } from "@/utils/common.utils";
import { useState, useEffect } from "react";
import Link from "next/link";
import { useTranslation } from "react-i18next";
import i18n from "@root/host/src/language/i18n";
import { ImageUrlConstants } from "@/constants/image.url.constants";
import { GetCurrentLocation } from "@/service/common.service";

const SPECIAL_OFFER_IMAGES = ImageUrlConstants.SPECIAL_OFFERS;

const SpecialOffers = () => {
  const { t } = useTranslation();
  const [isSpanish, setIsSpanish] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [filteredSpecialOffers, setFilteredSpecialOffers] =
    useState<any>(SO_SPECIAL_OFFERS);

  const setOffersWIthState = () => {
    GetCurrentLocation().then(async (response: any) => {
      const state = await getStateCodeForUser(
        response.data.location.lat,
        response.data.location.lng
      );
      if (state == "AR") {
        const filteredOffers = getBrandSpecialOffers().filter(
          (offer) => !offer.geoTargeted
        );
        setFilteredSpecialOffers(filteredOffers);
      } else {
        setFilteredSpecialOffers(getBrandSpecialOffers());
      }
    });
  };

  useEffect(() => {
    setIsMobile(isMobileDevice());
    setOffersWIthState();
  }, []);

  useEffect(() => {
    setIsSpanish(i18n.language == "de" ? true : false);
  }, [i18n.language]);

  const getBannerUrlByBrand = () => {
    if (isSpanish) {
      return isMobile
        ? SPECIAL_OFFER_IMAGES.SO.HERO_BANNER_SPANISH_MOBILE
        : SPECIAL_OFFER_IMAGES.SO.HERO_BANNER_SPANISH;
    } else {
      return isMobile
        ? SPECIAL_OFFER_IMAGES.SO.HERO_BANNER_ENGLISH_MOBILE
        : SPECIAL_OFFER_IMAGES.SO.HERO_BANNER_ENGLISH;
    }
  };

  const getBrandSpecialOffers = () => SO_SPECIAL_OFFERS;

  return (
    <div className={style.specialOffersContainer}>
      <Image
        className={style.banner}
        width={1915}
        height={463}
        layout="responsive"
        src={getBannerUrlByBrand()}
        alt="Special Offers"
      />
      <div className={style.gridContainer}>
        <p>{t(`SPECIAL_OFFERS.YOU_DESERVE_BETTER`)}</p>
        <Grid container spacing={4}>
          {filteredSpecialOffers.map((offer: any, index: number) => (
            <Grid
              item
              xs={12}
              md={6}
              key={index}
              className={style.flexContainer}
            >
              <Link href={offer.url}>
                <Image
                  title={isSpanish ? offer.spanish.alt : offer.alt}
                  className={style.tile}
                  width={600}
                  height={260}
                  src={isSpanish ? offer.spanish.image : offer.image}
                  alt={isSpanish ? offer.spanish.alt : offer.alt}
                />
              </Link>
            </Grid>
          ))}
        </Grid>
        <p className={style.disclaimer}>
          {t(`SPECIAL_OFFERS.FLORIDA_RESIDENTS`)}
        </p>
      </div>
    </div>
  );
};

export default SpecialOffers;
