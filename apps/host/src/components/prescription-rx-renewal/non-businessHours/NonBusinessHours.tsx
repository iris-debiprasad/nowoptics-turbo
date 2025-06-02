import { Box, Button, Typography } from "@mui/material";
import style from "./NonBusinessHours.module.scss";
import { useRouter } from "next/router";
import { RX_RENEWAL_CONSTANT } from "@root/host/src/constants/RxRenewal.constants";
import { NonBusinessHrsDTO } from "@root/host/src/types/nonBusinessHrsModal";
const NonBusinessHours = ({timingConfig, messages}:NonBusinessHrsDTO) => {
    const router = useRouter()
    const isCurrentDay = (day: string) => {
        const now = new Date();
        const estTime = new Date(
          now.toLocaleString("en-US", { timeZone: "America/New_York" })
        );
        const currentDay = estTime.toLocaleString("en-US", { weekday: "long" });
    
        return day === currentDay;
      };
    
    
    return (
        <Box className={style.boxContainer}>
            <Box className={style.container}>
            <div className={style.modalContent}>
              <span className={style.contentMessage}>
                {messages?.business_hour || ""}
              </span>
              <div className={style.scheduleContainer}>
                <Box>
                  {timingConfig?.length > 0 &&
                    timingConfig.map((data) => {
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
                <Box className={style.btnContainer}>
                    <Button className={style.visionBtn} onClick={() => router.push("/")}>{RX_RENEWAL_CONSTANT.NON_BUSINESS_HOURS_BTN1}</Button>
                    <Button className={style.inStoreExamBtn} onClick={() => router.push("/schedule-exam/")}>{RX_RENEWAL_CONSTANT.NON_BUSINESS_HOURS_BTN2}</Button>
                </Box>
            </Box>
        </Box>
    );
};

export default NonBusinessHours;
