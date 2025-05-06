import dayjs from "dayjs";
import Image from "next/image";
import { useState, useRef, Fragment } from "react";

import { Button, Grow, Popper, Box, AlertColor } from "@mui/material";

import { useSnackBar } from "@root/home/src/contexts/Snackbar/SnackbarContext";

import style from "./StoreList.module.scss";

import storeHours from "../../../../assets/Images/icons/storeHours.svg";
import { StoreHoursDTO } from "@/types/sidebar.type";
import { getStoreWorkingHour } from "@/service/storeLocator.service";
import {
  DATE_FORMAT,
  SNACKBAR_COLOR_TYPE,
} from "@root/host/src/constants/common.constants";
import { getWeekday } from "@root/host/src/utils/storeHourFormatter";
import { STORE_ERROR_MESSAGE } from "@root/host/src/constants/store.constants";
import i18n from "@root/host/src/language/i18n";

export default function StoreHours({ storeId }: { storeId: number }) {
  const { showSnackBar } = useSnackBar();
  const [open, setOpen] = useState(false);
  const [storHour, setStorHour] = useState<StoreHoursDTO[]>([]);
  const anchorRef = useRef<HTMLDivElement>(null);

  const getWorkingHour = () => {
    getStoreWorkingHour(storeId.toString(), dayjs().format(DATE_FORMAT))
      .then(({ data }) => {
        if (data?.Result) {
          setStorHour(getWeekday(data.Result));
        }
      })
      .catch((err) => {
        showSnackBar(
          err.message
            ? err.message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor
        );
      });
  };

  const handleToggle = () => {
    getWorkingHour();
    setOpen((prevOpen) => !prevOpen);
  };

  const handleClose = (event: Event) => {
    if (
      anchorRef.current &&
      anchorRef.current.contains(event.target as HTMLElement)
    ) {
      return;
    }

    setOpen(false);
  };

  return (
    <Fragment>
      <div ref={anchorRef} className={style.storeHourBtn}>
        <Button
          className={style.directionbtn}
          onClick={handleToggle}
          size="small"
          variant="outlined"
          data-testid="store-button"
          startIcon={
            <Image src={storeHours} alt="storeHours" width={14} height={14} />
          }
        >
          {i18n.t("SCHEDULE_EXAM.STORE_HOURS")}
        </Button>
      </div>

      <Popper
        sx={{
          zIndex: 1,
        }}
        open={open}
        anchorEl={anchorRef.current}
        role={undefined}
        transition
        disablePortal
        onMouseLeave={handleToggle}
        data-testid="popper-rendered"
      >
        {({ TransitionProps, placement }) => (
          <Grow
            {...TransitionProps}
            style={{
              transformOrigin:
                placement === "bottom" ? "center top" : "center bottom",
            }}
          >
            <Box className={style.storeHoursContainer}>
              <Box>
                {storHour.length ? (
                  storHour.map((storeHours: StoreHoursDTO, key: number) => {
                    return (
                      <Box key={key} className={style.storeHoursTimingItem}>
                        <Box className={style.day}>
                          <p
                            className={
                              new Date().getDay() === key
                                ? style.highlightedDay
                                : style.normalDay
                            }
                          >
                            {storeHours.day}
                          </p>
                        </Box>
                        <Box className={style.status}>
                          <p
                            className={
                              new Date().getDay() === key
                                ? style.highlightedStatus
                                : style.normalStatus
                            }
                          >
                            {storeHours.status}
                          </p>
                        </Box>
                      </Box>
                    );
                  })
                ) : (
                  <Box className={style.storeHourLoadingBox}>
                    <span className={style.storeHourLoadingText}>Loading</span>
                    <span className={style.loadingDots}></span>
                  </Box>
                )}
              </Box>
              {storHour.length ? (
                <Box className={style.storeHoursVerticalBarFloated}></Box>
              ) : null}
            </Box>
          </Grow>
        )}
      </Popper>
    </Fragment>
  );
}
