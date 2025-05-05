import { Button } from "@mui/material";
import style from "../specialOffers.module.scss";
import IconSVG from "@/components/iconsvg/IconSVG";
import { useRouter } from "next/router";
import Image from "next/image";
import { ISpecial_Offer_Page } from "@/constants/specialOffersConstants";
import useResponsive from "@/hooks/useResponsive";
import { useEffect, useState } from "react";
import i18n from "@root/host/src/language/i18n";
import { useTranslation } from "react-i18next";

interface ISpecialOffer {
  data: ISpecial_Offer_Page;
}

const SpecialOffer = (props: ISpecialOffer) => {
  const { t } = useTranslation();
  const router = useRouter();
  const hasReached = useResponsive();
  const [isSpanish, setIsSpanish] = useState(false);

  useEffect(() => {
    setIsSpanish(i18n.language == "de" ? true : false);
  }, [i18n.language]);

  return (
    <div className={style.specialOffersContainer}>
      <Image
        onClick={() =>
          props.data.imageIsClickable
            ? router.push(props.data.imageClickRoute)
            : ""
        }
        className={style.offerBanner}
        style={{
          cursor: `${props.data.imageIsClickable ? "pointer" : ""}`,
        }}
        width={1915}
        height={463}
        layout="responsive"
        src={
          hasReached.md
            ? isSpanish && props.data.image_es
              ? props.data.image_es
              : props.data.image
            : isSpanish && props.data.image_mobile_es
              ? props.data.image_mobile_es
              : props.data.image_mobile
        }
        alt={props.data.alt}
      />
      <div className={style.gridContainer}>
        <div className={style.contentContainer}>
          <div
            className={style.content}
            dangerouslySetInnerHTML={{
              __html:
                isSpanish && props.data.content_es
                  ? props.data.content_es
                  : props.data.content,
            }}
          ></div>
          <Button
            className={style.appointmentBtn}
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
            onClick={() => router.push(props.data.ctaRoute)}
            data-testid="BookEyeExam"
          >
            {isSpanish && props.data.cta_es
              ? props.data.cta_es
              : props.data.cta}
          </Button>
        </div>
      </div>

      <div className={style.disclaimer_wrapper}>
        <div
          className={style.disclaimer}
          dangerouslySetInnerHTML={{
            __html:
              isSpanish && props.data.disclaimer_es
                ? props.data.disclaimer_es
                : props.data.disclaimer,
          }}
        />
      </div>
    </div>
  );
};

export default SpecialOffer;
