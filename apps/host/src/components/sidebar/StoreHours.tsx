import dayjs from "dayjs";
import Image from "next/image";
import { AxiosError } from "axios";
import { useState, useRef, Fragment } from "react";

import { Button, Grow, Popper, Box, AlertColor } from "@mui/material";

import { getStoreWorkingHour } from "../../service/storeLocator.service";

import { getWeekday } from "../../utils/storeHourFormatter";

import { StoreHoursDTO } from "../../types/SideBar.types";

import {
  DATE_FORMAT,
  SNACKBAR_COLOR_TYPE,
  weekdays,
} from "../../constants/common.constants";
import { STORE_ERROR_MESSAGE } from "../../constants/store.constants";

import { STORE_HOURS } from "../../constants/SideBarConstants";

import style from "./SideBar.module.scss";

import storeHours from "../../../../assets/Images/icons/storeHours.svg";
import { useSnackBar } from "../../contexts/Snackbar/SnackbarContext";

export default function StoreHours({ storeId }: { storeId: number }) {
  const [open, setOpen] = useState(false);
  const [storHour, setStorHour] = useState<StoreHoursDTO[]>([]);
  const anchorRef = useRef<HTMLDivElement>(null);
  const { showSnackBar } = useSnackBar();

  const getWorkingHour = async () => {
    try {
      const { data } = await getStoreWorkingHour(
        storeId.toString(),
        dayjs().format(DATE_FORMAT)
      );
      if (data?.Result) {
        setStorHour(getWeekday(data.Result));
      } else {
        setStorHour(STORE_HOURS);
      }
    } catch (err) {
      showSnackBar(
        (err as AxiosError).message
          ? (err as AxiosError).message
          : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor
      );
    }
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
          aria-label="Store Hours"
          startIcon={
            <Image src={storeHours} alt="storeHours" width={16} height={16} />
          }
        >
          Store Hours
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
