import React from "react";
import { Box, Button, Modal } from "@mui/material";
import style from "./NonBusinessHrsInfo.module.scss";
import IconSVG from "../iconsvg/IconSVG";
import { NonBusinessHrsModalProps } from "@root/host/src/types/nonBusinessHrsModal";
import useResponsive from "@/hooks/useResponsive";
import { RX_RENEWAL_CONSTANT } from "@root/host/src/constants/RxRenewal.constants";
import { useRouter } from "next/router";
function NonBusinessHrsInfo(props: NonBusinessHrsModalProps) {
  const router = useRouter();
  const { open, handleClose, content } = props;
  const hasReached = useResponsive();

  const isCurrentDay = (day: string) => {
    const now = new Date();
    const estTime = new Date(
      now.toLocaleString("en-US", { timeZone: "America/New_York" })
    );
    const currentDay = estTime.toLocaleString("en-US", { weekday: "long" });

    return day === currentDay;
  };

  return (
    <div data-testid="Non-business-hrs-modal">
      <Modal
        open={open}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <div className={style.modalContainer}>
          <div className={style.headingwrapper}>
            <div className={style.closeIconWrapper} onClick={handleClose}>
              <IconSVG
                width="20"
                height="20"
                viewBox="0 0 20 20"
                fill="#4d4d4d"
                name="modal_cross"
              />
            </div>
          </div>
          {hasReached.md ? (
            <div className={style.modalContent}>
              <span className={style.contentMessage}>
                {props.messages?.business_hour || ""}
              </span>
              <div className={style.scheduleContainer}>
                <Box>
                  {props.timingConfig?.length > 0 &&
                    props.timingConfig.map((data) => {
                      return (
                        <Box
                          key={data.Day}
                          className={style.storeHoursTimingItem}
                        >
                          <Box className={style.day}>
                            <p
                              className={
                                isCurrentDay(data.Day)
                                  ? style.highlightedDay
                                  : style.normalDay
                              }
                            >
                              {data.Day?.slice(0, 3)}
                            </p>
                          </Box>
                          <Box className={style.status}>
                            <p
                              className={
                                isCurrentDay(data.Day)
                                  ? style.highlightedStatus
                                  : style.normalStatus
                              }
                            >
                              {data.Closed ? (
                                <span className={style.closed}>Closed</span>
                              ) : (
                                <span className={style.time}>
                                  {data.StartTime} to {data.EndTime}
                                </span>
                              )}
                            </p>
                          </Box>
                        </Box>
                      );
                    })}
                </Box>
                <Box className={style.storeHoursVerticalBar}></Box>
              </div>
            </div>
          ) : (
            <div className={style.modalContent}>
              <span className={style.contentMessage}>
                {RX_RENEWAL_CONSTANT.NOTIFICATION_TEXT_MOBILE_ACCESS}
              </span>
              <div className={style.actionContent}>
                <Button
                  onClick={() => router.push("/schedule-exam")}
                  className={style.primaryButtonStyle}
                  style={{ marginRight: "35px" }}
                >
                  {"Book Eye Exam"}
                </Button>
                <Button
                  onClick={handleClose}
                  className={style.tertiaryButtonStyle}
                >
                  {"Close"}
                </Button>
              </div>
            </div>
          )}
        </div>
      </Modal>
    </div>
  );
}

export default NonBusinessHrsInfo;
