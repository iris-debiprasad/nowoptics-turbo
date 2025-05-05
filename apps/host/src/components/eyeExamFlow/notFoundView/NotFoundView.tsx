import { useRouter } from "next/router";
import PrimaryModal from "@/components/primary_modal/PrimaryModal";
import { NotFoundViewPropsTypes } from "@/types/eyeExamFlow.types";
import { Box, Button, Typography } from "@mui/material";
import React from "react";
import IconSVG from "../../iconsvg/IconSVG";
import style from "./NotFoundView.module.scss";

const ModalContent = ({
  handleOpen,
  content,
}: {
  handleOpen: () => void;
  content: string;
}) => {
  const router = useRouter();
  return (
    <Box className={style.notFoundViewContainer}>
      <Box
        sx={{
          display: "flex",
          justifyContent: "flex-end",
          alignItems: "center",
        }}
        data-testid="not-found-view-container"
      >
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
      <Box
        className={style.innerContainer}
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          flexDirection: "column",
          gap: "20px",
        }}
      >
        <Box className={style.messagesContainer}>
          <Typography
            id="modal-modal-title"
            data-testid="not-found-view-text"
            variant="h6"
            component="h2"
            className={style.notFoundViewTitle}
          >
            {content}
          </Typography>
        </Box>
        <Button
          className={style.continueButton}
          data-testid="continue-button"
          onClick={() => {
            handleOpen();
            router.push("/appointments");
          }}
        >
          Continue
        </Button>
      </Box>
    </Box>
  );
};

const NotFoundView = ({ isVisible, toggle }: NotFoundViewPropsTypes) => {

  return (
    <PrimaryModal
      modalOpen={isVisible}
      setModalOpen={toggle}
      modalInner={
        <ModalContent
          handleOpen={toggle}
          content={"Patient has no appointment scheduled. Please book an appointment first."}
        />
      }
      cstmStyle="patientAppointmentNotFoundModal"
    />
  );
};

export default NotFoundView;
