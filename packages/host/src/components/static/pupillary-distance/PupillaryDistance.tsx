import IconSVG from "@/components/iconsvg/IconSVG";
import { useGetBrand } from "@/hooks/useGetBrand";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Box,
  Button,
  Container,
  Grid,
} from "@mui/material";
import { BRAND } from "@root/host/src/constants/common.constants";
import Link from "next/link";
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import { FramesCarousel, FramesCarouselProps } from "../bopis/frames-carousel";
import style from "./PupillaryDistance.module.scss";

interface Props extends FramesCarouselProps {}

const PupillaryDistance = ({ frames }: Props) => {
  const { t } = useTranslation();
  const BASE_IMAGE_URL = process.env.NEXT_PUBLIC_IMAGE_BASE_URL;
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(
    null
  );
  const brand = useGetBrand();

  const FAQS = [
    {
      question: t("PUPILLARY_DISTANCE.WHERE_IS_THE_PD"),
      answer: t("PUPILLARY_DISTANCE.YOUR_PD_NUMBER"),
    },
    {
      question: t("PUPILLARY_DISTANCE.WHY_DO_I_NEED"),
      answer: t("PUPILLARY_DISTANCE.YOU_WANT_YOUR_PD"),
    },
    {
      question: t("PUPILLARY_DISTANCE.IS_THERE_A_RANGE"),
      answer: t("PUPILLARY_DISTANCE.NORMALLY_AN_ADULT_PD"),
    },
    {
      question: t("PUPILLARY_DISTANCE.I_HAVE_TWO_PD"),
      answer: t("PUPILLARY_DISTANCE.IF_YOUR_PRESCRIPTION"),
    },
    {
      question: t("PUPILLARY_DISTANCE.I_DONT_HAVE"),
      answer: t("PUPILLARY_DISTANCE.WE_RECOMMED_USING"),
      showRulerLink: true,
    },
    {
      question: t("PUPILLARY_DISTANCE.WHAT_IS_A_SINGLE_PD"),
      answer: t("PUPILLARY_DISTANCE.THE_sINGLE_PUPILLARY"),
    },
  ];

  const handleAccordionChange =
    (accordionId: number) =>
    (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
      setExpandedAccordion(isExpanded ? accordionId : null);
    };

  const brandReplaceCopy = (
    copy: string,
    soReplace: string,
    melReplace: string
  ) => {
    return copy.replace("{brand}", brand === BRAND.SO ? soReplace : melReplace);
  };

  const assingBrandToCopy = (copy: string): string => {
    return brandReplaceCopy(copy, "Stanton Optical", "My Eyelab");
  };

  return (
    <div className={style.pupillaryDistanceContainer}>
      <h1>{t("PUPILLARY_DISTANCE.HOW_TO_MEASURE")}</h1>
      <p>{assingBrandToCopy(t("PUPILLARY_DISTANCE.IF_YOU_WANT"))} </p>

      <h2>{t("PUPILLARY_DISTANCE.SO_WHAT")}</h2>
      <p>{t("PUPILLARY_DISTANCE.PD_IS_THE_DISTANCE")}</p>
      <p>{t("PUPILLARY_DISTANCE.THERE_ARE_TWO_TYPES")}</p>

      <h2>{t("PUPILLARY_DISTANCE.HOW_TO_MEASURE_PD")}</h2>
      <p>{t("PUPILLARY_DISTANCE.THE_MOST_PRESISE")}</p>
      <p>{t("PUPILLARY_DISTANCE.IF_YOUR_EYE")}</p>

      <h3>{t("PUPILLARY_DISTANCE.WHAT_WILL_YOU")}</h3>
      <p>
        {t("PUPILLARY_DISTANCE.MILLIMETER_RULER")}
        <Link
          href={
            BASE_IMAGE_URL +
            "m/1aed8e38171c4e05/original/SO_mminchRuler_instructions.pdf"
          }
          target="_blank"
          rel="noopener noreferer nofollow noreferrer"
        >
          <u>{t("PUPILLARY_DISTANCE.HERE")}</u>
        </Link>{" "}
        {t("PUPILLARY_DISTANCE.END")}
      </p>
      <p>{t("PUPILLARY_DISTANCE.MIRROR_OR_FRIEND")}</p>

      <h3>{t("PUPILLARY_DISTANCE.HELPFUL_HINTS")}</h3>
      <ul style={{ paddingLeft: "16px" }}>
        <li>
          <p>{t("PUPILLARY_DISTANCE.MAKE_SURE")}</p>
        </li>
        <li>
          <p>{t("PUPILLARY_DISTANCE.FOR_ADULTS")}</p>
        </li>
        <li>
          <p>{t("PUPILLARY_DISTANCE.FOR_CHILDREN")}</p>
        </li>
      </ul>

      <h3>{t("PUPILLARY_DISTANCE.STEPS_TO_MEASUREING")}</h3>
      <p>{t("PUPILLARY_DISTANCE.STAND_8_INCHES")}</p>
      <p>{t("PUPILLARY_DISTANCE.WHILE_FACING")}</p>
      <p>{t("PUPILLARY_DISTANCE.START_BY")}</p>
      <p>{t("PUPILLARY_DISTANCE.WHILE_KEEPING")}</p>
      <p>{t("PUPILLARY_DISTANCE.READ_THE_MM")}</p>

      <h3>{t("PUPILLARY_DISTANCE.MEASURING_YOUR")}</h3>
      <p>{t("PUPILLARY_DISTANCE.IF_A_FRIEND")}</p>

      <h3>{t("PUPILLARY_DISTANCE.THINGS_TO_REMEMBER")}</h3>
      <ul style={{ paddingLeft: "16px" }}>
        <li>
          <p>{t("PUPILLARY_DISTANCE.HAVE_THEM_SIT")}</p>
        </li>
        <li>
          <p>{t("PUPILLARY_DISTANCE.TRY_TO_KEEP")}</p>
        </li>
        <li>
          <p>{t("PUPILLARY_DISTANCE.TRY_YOUR_HARDEST")}</p>
        </li>
      </ul>

      <p>{t("PUPILLARY_DISTANCE.ONCE_YOU_HAVE_MEASURED")}</p>

      <h2>{t("PUPILLARY_DISTANCE.ORDER_YOUR_GLASSES")}</h2>
      <p>
        {assingBrandToCopy(
          t("PUPILLARY_DISTANCE.TO_ORDER_FROM_STANTON_OPTICAL")
        )}{" "}
      </p>
      <p>{t("PUPILLARY_DISTANCE.SELECT_YOUR_FRAMES")}</p>
      <p>{t("PUPILLARY_DISTANCE.IF_YOU_WERE_ABLE")}</p>
      {frames && frames.length > 0 && (
        <Box className={style.framesMainBox}>
          <FramesCarousel {...{ frames }} />

          <Container className={style.framesContainer}>
            <Box className={style.framesTextbox}>
              <Link href="/catalog/all-frames/">
                <Button
                  className={style.btnFrame}
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
                  <span>{t("PUPILLARY_DISTANCE.SHOP_NOW")}</span>
                </Button>
              </Link>
            </Box>
          </Container>
        </Box>
      )}
      <h2 className={style.textCenter}>{t("PUPILLARY_DISTANCE.FAQs")}</h2>
      <div className={style.desktopFaq}>
        <Grid container spacing={2}>
          <Grid item xs={6} className={style.gridItem1}>
            {FAQS &&
              [0, 1, 2].map((faq) => {
                return (
                  <>
                    <h2>{FAQS[faq].question}</h2>
                    <p>
                      {FAQS[faq].answer}
                      {FAQS[faq].showRulerLink && (
                        <Link
                          href={
                            BASE_IMAGE_URL +
                            "m/1aed8e38171c4e05/original/SO_mminchRuler_instructions.pdf"
                          }
                          target="_blank"
                          rel="noopener noreferer nofollow noreferrer"
                        >
                          <u>{t("PUPILLARY_DISTANCE.CLICK_TO_DOWNLOAD")}</u>
                        </Link>
                      )}
                    </p>
                  </>
                );
              })}
          </Grid>
          <Grid item xs={6} className={style.gridItem2}>
            {FAQS &&
              [3, 4, 5].map((faq) => {
                return (
                  <>
                    <h2>{FAQS[faq].question}</h2>
                    <p>
                      {FAQS[faq].answer}
                      {FAQS[faq].showRulerLink && (
                        <Link
                          href={
                            BASE_IMAGE_URL +
                            "m/1aed8e38171c4e05/original/SO_mminchRuler_instructions.pdf"
                          }
                          target="_blank"
                          rel="noopener noreferer nofollow noreferrer"
                        >
                          <u>{t("PUPILLARY_DISTANCE.CLICK_TO_DOWNLOAD")}</u>
                        </Link>
                      )}
                    </p>
                  </>
                );
              })}
          </Grid>
        </Grid>
      </div>
      <div className={style.mobileFaq}>
        {FAQS &&
          FAQS.map((faq, index) => {
            return (
              <Box key={index} my={2}>
                <Accordion
                  expanded={expandedAccordion === index}
                  onChange={handleAccordionChange(index)}
                >
                  <AccordionSummary
                    expandIcon={
                      expandedAccordion !== index ? (
                        <IconSVG
                          width="24"
                          height="24"
                          viewBox="0 -960 960 960"
                          fill="#f98300"
                          name="rounded_plus_icon"
                        />
                      ) : (
                        <IconSVG
                          width="24"
                          height="24"
                          viewBox="0 -960 960 960"
                          fill="#f98300"
                          name="rounded_minus_icon"
                        />
                      )
                    }
                  >
                    <b>{faq.question}</b>
                  </AccordionSummary>
                  <AccordionDetails>
                    <p>
                      {faq.answer}
                      {faq.showRulerLink && (
                        <Link
                          href={
                            BASE_IMAGE_URL +
                            "m/1aed8e38171c4e05/original/SO_mminchRuler_instructions.pdf"
                          }
                          target="_blank"
                          rel="noopener noreferer nofollow noreferrer"
                        >
                          <u>{t("PUPILLARY_DISTANCE.CLICK_TO_DOWNLOAD")}</u>
                        </Link>
                      )}
                    </p>
                  </AccordionDetails>
                </Accordion>
              </Box>
            );
          })}
      </div>
    </div>
  );
};

export default PupillaryDistance;
