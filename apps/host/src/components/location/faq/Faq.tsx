import React, { FunctionComponent, useEffect, useState } from "react";

import { Box } from "@mui/system";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Button,
  Grid,
  AlertColor,
} from "@mui/material";

import style from "./Faq.module.scss";
import { StoreContentDTO, StoreDetailsDTO } from "@root/host/src/types/store.type";
import dynamic from "next/dynamic";
import { IconDTO } from "@root/host/src/types/IconSVG.types";
import { useRouter } from "next/router";
import {
  bookEyeExamHandler,
  handleBookAppointment,
} from "@root/host/src/utils/common.utils";
import Link from "next/link";
import {
  BRAND,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { useAppSelector } from "@root/host/src/store/useStore";
import IconSVG from "@/components/iconsvg/IconSVG";

type Props = {
  storeDetails: StoreContentDTO;
  selectedStore: StoreDetailsDTO | null;
  brand: string | undefined;
  role: string | null;
};

type AccordionProps = {
  brand: string;
  Answer: string;
  Question: string;
  expandedAccordion: number | null;
  index: number;
  handleAccordionChange: (accordionId: number) => (event: React.ChangeEvent<{}>, isExpanded: boolean) => void;
};


function FAQAccordion({ Answer, Question, expandedAccordion, index, handleAccordionChange, brand }: AccordionProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true); // Ensure component renders only on client
  }, []);

  if (!mounted) return null; // Prevent mismatch during hydration
  return <Accordion
    className={style.accordionWrapper}
    expanded={expandedAccordion === index}
    onChange={handleAccordionChange(index)}
    elevation={0}
  >
    <AccordionSummary
      expandIcon={
        expandedAccordion !== index ? (
          <IconSVG
            width="24"
            height="24"
            viewBox="0 -960 960 960"
            fill={brand === BRAND.SO ? "#f98300" : "#E44892"}
            name="rounded_plus_icon"
          />
        ) : (
          <IconSVG
            width="24"
            height="24"
            viewBox="0 -960 960 960"
            fill={brand === BRAND.SO ? "#f98300" : "#E44892"}
            name="rounded_minus_icon"
          />
        )
      }
    >
      <h2 className={style.accordionHeading}>
        {Question}
      </h2>
    </AccordionSummary>
    <AccordionDetails>
      <p
        className={style.accordionContent}
        dangerouslySetInnerHTML={{
          __html: Answer,
        }}
      />
    </AccordionDetails>
  </Accordion>
}


function Faq({ storeDetails, selectedStore, brand, role }: Props) {
  const { showSnackBar } = useSnackBar();
  const router = useRouter();
  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);
  const [expandedAccordion, setExpandedAccordion] = useState<number | null>(
    null
  );
  const handleAccordionChange =
    (accordionId: number) =>
      (event: React.ChangeEvent<{}>, isExpanded: boolean) => {
        setExpandedAccordion(isExpanded ? accordionId : null);
      };
  return (
    <div>
      {brand === BRAND.SO && (
        <div className={style.mainBox}>
          <Grid container>
            <Grid
              item
              lg={4}
              xs={0}
              spacing={4}
              alignItems="center"
              justifyContent="flex-end"
              sx={{ display: { xs: "none", lg: "flex" } }}
            >
              <div className={style.faqImgWrapper}>
                <Box
                  className={style.faqImg}
                  sx={{
                    backgroundImage: `url(${storeDetails.FAQSection.Image.ImageUrl
                      ? storeDetails.FAQSection.Image.ImageUrl
                      : ""
                      })`,
                  }}
                ></Box>
              </div>
            </Grid>
            <Grid item lg={8} xs={12}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "center",
                  width: "100%",
                }}
              >
                <Box
                  sx={{
                    maxWidth: {
                      xs: "100%",
                      sm: "500px",
                      md: "600px",
                      lg: "700px",
                      xl: "100%",
                    },
                    display: "flex",
                    justifyContent: "center",
                    width: "100%",
                    flexDirection: "column",
                  }}
                >
                  <Box>
                    <Box
                      mx={4}
                      className={style.heading}
                      dangerouslySetInnerHTML={{
                        __html: storeDetails.FAQSection.Heading,
                      }}
                    ></Box>
                    {storeDetails.FAQSection.FAQs.length
                      ? storeDetails.FAQSection.FAQs.map((faq, index) => {
                        return (
                          <Box key={index} my={2} mx={4}>
                            <FAQAccordion Answer={faq.Answer} 
                            Question={faq.Question} 
                            expandedAccordion={expandedAccordion} 
                            index={index} 
                            handleAccordionChange={handleAccordionChange} brand={BRAND.SO}/>
                          </Box>
                        );
                      })
                      : null}
                  </Box>
                </Box>
              </Box>
              <Box className={style.btnWrapper}>
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
                      if (selectedStore)
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
            </Grid>
          </Grid>
        </div>
      )}

      {brand === BRAND.MEL && (
        <div className={style.mainBox}>
          <Grid container spacing={5}>
            <div className={style.melFaqImgWrapper}>
              <Box
                className={style.faqImg}
                sx={{
                  backgroundImage: `url(${storeDetails.FAQSection.Image.ImageUrl
                    ? storeDetails.FAQSection.Image.ImageUrl
                    : ""
                    })`,
                  "@media (max-width: 768px)": {
                    backgroundImage: "none",
                    background: `linear-gradient(63deg, rgba(172, 144, 255, 1) 0%, rgba(127, 216, 255, 1) 79%)`,
                  },
                }}
              >
                <Grid item lg={7} xs={12}>
                  <Box
                    sx={{
                      display: "flex",
                      justifyContent: "center",
                      width: "100%",
                    }}
                  >
                    <Box
                      sx={{
                        maxWidth: {
                          xs: "100%",
                          sm: "500px",
                          md: "600px",
                          lg: "700px",
                          xl: "100%",
                        },
                        display: "flex",
                        justifyContent: "center",
                        width: "100%",
                        flexDirection: "column",
                      }}
                    >
                      <Box>
                        <Box
                          className={style.heading}
                          dangerouslySetInnerHTML={{
                            __html: storeDetails.FAQSection.Heading,
                          }}
                        ></Box>
                        {storeDetails.FAQSection.FAQs.length
                          ? storeDetails.FAQSection.FAQs.map((faq, index) => {
                            return (
                              <Box key={index} my={2}>
                                <FAQAccordion Answer={faq.Answer}
                                  Question={faq.Question}
                                  expandedAccordion={expandedAccordion}
                                  index={index}
                                  handleAccordionChange={handleAccordionChange} brand={BRAND.SO} />
                              </Box>
                            );
                          })
                          : null}
                      </Box>
                    </Box>
                  </Box>
                  <Box className={style.btnWrapper}>
                    <Link
                      href="/book-eye-exam"
                      onClick={() => {
                        if (selectedStore)
                          bookEyeExamHandler(null, selectedStore);
                      }}
                      className={style.bookExamBtn}
                    >
                      Book Eye Exam
                    </Link>
                  </Box>
                </Grid>
              </Box>
            </div>
          </Grid>
        </div>
      )}
    </div>
  );
}

export default Faq;
