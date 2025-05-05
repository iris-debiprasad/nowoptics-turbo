import {
  Box,
  Button,
  IconButton,
  LinearProgress,
  Modal,
  Stack,
  Typography,
  linearProgressClasses,
  styled,
} from "@mui/material";
import React, { useContext, useEffect, useRef, useState } from "react";
import style from "./AutoLogoutModal.module.scss";
import IconSVG from "../iconsvg/IconSVG";
import { checkBrand } from "@/utils/common.utils";
import { BRAND, USER_TYPE } from "@/constants/common.constants";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

const BorderLinearProgress = styled(LinearProgress)(({ theme }) => ({
  height: 10,
  borderRadius: 5,
  [`&.${linearProgressClasses.colorPrimary}`]: {
    backgroundColor:
      theme.palette.grey[theme.palette.mode === "light" ? 200 : 800],
  },
  [`& .${linearProgressClasses.bar}`]: {
    borderRadius: 5,
    backgroundColor:
      theme.palette.mode === "light"
        ? (checkBrand() === BRAND.SO
          ? "#f98300"
          : "#e45cbc")
        : "#308fe8",
  },
}));

interface Props {
  showAutoLogoutModal: boolean;
  hideAutoLogoutModal: (data: boolean) => void;
  cancelLogout: () => void;
  handleLogout: () => void;
  userType: string
}

function AutologoutModal(props: Props) {
  const env = useContext(RuntimeVarContext);
  const [timeLeft, setTimeLeft] = useState<number>(
    props.userType === USER_TYPE.ASSOCIATE ?
    Number(env?.NEXT_PUBLIC_IDLE_TIMEOUT_PROMPT_MS as string) :
    Number(env?.NEXT_PUBLIC_PATIENT_IDLE_TIMEOUT_PROMPT_MS as string)

  );
  const [progressBarData, setProgressBarData] = useState<number>(0);
  const timerRef = useRef<any>();

  useEffect(() => {
    const promptTime =  props.userType === USER_TYPE.ASSOCIATE ?
    Number(env?.NEXT_PUBLIC_IDLE_TIMEOUT_PROMPT_MS as string) :
    Number(env?.NEXT_PUBLIC_PATIENT_IDLE_TIMEOUT_PROMPT_MS as string)
    if (promptTime) {
      // const timer = setInterval(() => {
      //   setTimeLeft((prevValue) => prevValue ? prevValue - 1000 : promptTime);
      // }, 1000);

      timerRef.current = new Worker("/worker/promptIntervalTimerWorker.js");
      timerRef.current.postMessage({ command: "start", interval: 1000 });

      timerRef.current.onmessage = function (e: any) {
        if (e.data === "tick") {
          setTimeLeft((prevValue) =>
            prevValue ? prevValue - 1000 : promptTime
          );
        }
      };
    }
    return () => {
      timerRef.current?.terminate();
    }
  }, []);

  useEffect(() => {
    const progressBarData =
      props.userType === USER_TYPE.ASSOCIATE
        ? ((Number(env?.NEXT_PUBLIC_IDLE_TIMEOUT_PROMPT_MS as string) -
            timeLeft) /
            Number(env?.NEXT_PUBLIC_IDLE_TIMEOUT_PROMPT_MS as string)) *
          100
        : ((Number(env?.NEXT_PUBLIC_PATIENT_IDLE_TIMEOUT_PROMPT_MS as string) -
            timeLeft) /
            Number(env?.NEXT_PUBLIC_PATIENT_IDLE_TIMEOUT_PROMPT_MS as string)) *
          100;
    setProgressBarData(progressBarData);
    if (timeLeft === 0 && timerRef.current) {
      props.handleLogout();
      timerRef.current.postMessage({ command: "stop" });
    }
  }, [timeLeft]);

  function padZero(num: number) {
    return (num < 10 ? "0" : "") + num;
  }

  function getTimerData(ms: number) {
    // Convert milliseconds to seconds
    var totalSeconds = Math.floor(ms / 1000);

    // Calculate hours
    var hours = Math.floor(totalSeconds / 3600);

    // Calculate remaining seconds after extracting hours
    var remainingSeconds = totalSeconds % 3600;

    // Calculate minutes
    var minutes = Math.floor(remainingSeconds / 60);

    // Calculate remaining seconds after extracting minutes
    var seconds = remainingSeconds % 60;

    // Format the time components

    return `${padZero(minutes)} minutes  ${padZero(seconds)} seconds`;
  }

  const stayConnected = () => {
    props.cancelLogout();
    if (timerRef.current) {
      clearTimeout(timerRef.current);
    }
  };

  return (
    <Modal
      open={props.showAutoLogoutModal}
      onClose={() => props.hideAutoLogoutModal(false)}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box className={style.modalWrapper}>
        <Box className={style.modalHeader}>
          <Box className={style.autoLogoutModalTitle}>
            Your session is about to expire.
          </Box>
          <Box className={style.crossBtn}>
            <IconButton onClick={stayConnected}>
              <IconSVG
                width="10"
                height="10"
                viewBox="0 0 16 16"
                fill="var(--primary-text-color)"
                name="modal_cross"
              />
            </IconButton>
          </Box>
        </Box>
        <Box className={style.modalInner}>
          <Box mt={2} className={style.timerContainer}>
            <Typography className={style.autoLogoutModalSubTitle} mb={2}>
              Time Left: {getTimerData(timeLeft)}
            </Typography>
            <Stack spacing={2} sx={{ flexGrow: 1 }}>
              <BorderLinearProgress
                variant="determinate"
                value={progressBarData}
              />
            </Stack>
          </Box>

          <Box mt={6} className={style.modalAction}>
            <Button
              className={style.logout}
              onClick={() => {
                props.handleLogout();
                if (timerRef.current) {
                  clearTimeout(timerRef.current);
                }
              }}
            >
              Sign Out
            </Button>
            <Button className={style.continueButton} onClick={stayConnected}>
              Stay Connected
            </Button>
          </Box>
        </Box>
      </Box>
    </Modal>
  );
}

export default AutologoutModal;
