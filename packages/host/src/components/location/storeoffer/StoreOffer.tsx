import dynamic from "next/dynamic";
import React, { FunctionComponent } from "react";

import { Box, Button, Grid, Typography, AlertColor } from "@mui/material";

import style from "./StoreOffer.module.scss";

import { IconDTO } from "../../../../../host/src/types/IconSVG.types";
import { StoreContentDTO, StoreDetailsDTO } from "@/types/store.type";
import { PrimaryModalDTO } from "@root/host/src/types/PrimaryModal.types";
import { StoreOfferSliderDTO } from "@root/host/src/types/ImageSlider.types";
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
import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import MobileSingleImageSlider from "@/components/image_slider/MobileSingleImageSlider";

type Props = {
  storeDetails: StoreContentDTO;
  handleOpen?: (text: string) => void;
  selectedStore: StoreDetailsDTO | null;
  brand: string | undefined;
  role: string | null;
};



const ModalContent = ({
  handleOpen,
  content,
}: {
  handleOpen: () => void;
  content: string;
}) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
        }}
      >
        <Typography
          id="modal-modal-title"
          variant="h6"
          component="h2"
        ></Typography>
        <Button className={style.crossBtn} onClick={handleOpen}>
          <IconSVG
            width="10"
            height="10"
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

export default function StoreOffer({
  storeDetails,
  selectedStore,
  brand,
  role,
}: Props) {
  const [modalOpen, setModalOpen] = React.useState(false);
  const [modalContent, setModalContent] = React.useState("");
  const router = useRouter();
  const { showSnackBar } = useSnackBar();
  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);
  const handleOpen = (content: string) => {
    setModalOpen(true);
    setModalContent(content);
  };

  return (
    <Box className={style.mainBox}>
      {storeDetails?.PromotionSection && (
        <Box
          className={style.title}
          dangerouslySetInnerHTML={{
            __html: storeDetails.PromotionSection.Heading,
          }}
        ></Box>
      )}

      <Box
        sx={{
          width: "100%",
          display: { xs: "none", md: "flex", justifyContent: "center" },
        }}
      >
        <Grid container sx={{ maxWidth: "1200px" }}>
          {storeDetails.PromotionSection.Promotions.length &&
            storeDetails.PromotionSection.Promotions.map((item, index) => {
              return (
                <Grid item lg={4} xs={4} key={index}>
                  <div className={style.imgBox}>
                    {item.PromotionalText ? (
                      <Box
                        className={style.boxContent}
                        dangerouslySetInnerHTML={{
                          __html: item.PromotionalText,
                        }}
                      ></Box>
                    ) : null}

                    <Box>
                      <Button
                        className={style.disclaimerBtn}
                        onClick={() => handleOpen(item.Disclaimer)}
                      >
                        *See details
                      </Button>
                    </Box>
                  </div>
                </Grid>
              );
            })}

          <PrimaryModal
            modalOpen={modalOpen}
            setModalOpen={setModalOpen}
            modalInner={
              <ModalContent
                handleOpen={() => setModalOpen(false)}
                content={modalContent}
              />
            }
          />
        </Grid>
      </Box>
      <Box sx={{ width: "100%", display: { xs: "block", md: "none" } }}>
        {storeDetails.PromotionSection.Promotions.length ? (
          <MobileSingleImageSlider
            Promotions={storeDetails.PromotionSection.Promotions}
            sectionName="PromotionSection"
          />
        ) : null}
      </Box>
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
            onClick={() => {
              if (selectedStore) bookEyeExamHandler(router, selectedStore);
            }}
            className={"seoBookExamBtn"}
          >
            {brand === BRAND.MEL
              ? "Schedule an eye exam"
              : "See Available Exam Times"}
          </Link>
        )}
      </Box>
    </Box>
  );
}
