import React from "react";
import { v7 as uuid } from "uuid";
import dayjs from "dayjs";
import {
  Box,
  Button,
  Grid,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import { DateCalendar, LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

import { GetSlotsForWebScheduler } from "@/service/storeLocator.service";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import i18n from "@root/host/src/language/i18n";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";

import {
  DOCTOR_SCHEDULER_API_DATE_FORMAT,
  EYE_EXAM_APPOINTMENT_DATE_FORMAT,
  EYE_EXAM_APPOINTMENT_SLOT_FORMAT,
} from "@root/host/src/constants/common.constants";
import {
  DaySlots,
  PatientSearchError,
} from "@/types/bookEyeExamSteps.types";

import style from "./index.module.scss";
import { useLeftSideOfBEEContext } from "@/contexts/book-eye-exam-left-side";
import { DaySlotsConfig } from "@/types/book-eye-exam-left-side.types";

const DAY_SLOTS_CONFIG: DaySlotsConfig[] = [
  {
    name: "Morning",
    endTime: "12:00 PM",
  },
  {
    name: "Afternoon",
    endTime: "6:00 PM",
  },
  {
    name: "Evening",
    endTime: "9:00 PM",
  },
];

export function AppointmentScheduler(): JSX.Element {
  const { fetchRecaptchaToken } = useRecaptchaToken();

  const ctx = useLeftSideOfBEEContext();

  const onDaySlotChange = (
    _: React.MouseEvent<HTMLElement>,
    nextSlot: DaySlots | null,
  ) => {
    if (!nextSlot) return;
    ctx.setSelectedDaySlots(nextSlot);
  };

  const createSlotGroupHandler = (avaliableSlots: string[]) => {
    const morningThreshold = new Date(`${ctx.selectedDate}T12:00:00`);
    const eveningThreshold = new Date(`${ctx.selectedDate}T18:00:00`);

    const morningSlots: string[] = [];
    const afternoonSlots: string[] = [];
    const eveningSlots: string[] = [];

    avaliableSlots.forEach((slotTime) => {
      const slotDate = new Date(`${ctx.selectedDate}T${slotTime}`);
      const slotTimeStamp = slotDate.getTime();
      if (slotTimeStamp < morningThreshold.getTime()) {
        morningSlots.push(
          dayjs(slotDate).format(EYE_EXAM_APPOINTMENT_SLOT_FORMAT),
        );
      } else if (
        slotTimeStamp >= morningThreshold.getTime() &&
        slotTimeStamp < eveningThreshold.getTime()
      ) {
        afternoonSlots.push(
          dayjs(slotDate).format(EYE_EXAM_APPOINTMENT_SLOT_FORMAT),
        );
      } else if (slotTimeStamp >= eveningThreshold.getTime()) {
        eveningSlots.push(
          dayjs(slotDate).format(EYE_EXAM_APPOINTMENT_SLOT_FORMAT),
        );
      }
    });

    ctx.updateAvailableTimeSlots({
      Morning: morningSlots,
      Afternoon: afternoonSlots,
      Evening: eveningSlots,
    });
  };

  const getAvailableSlots = async (
    appointmentTypeId: number,
    storeId: number,
  ) => {
    try {
      const recaptchaToken = await fetchRecaptchaToken(
        "Get_Slots_For_Web_Scheduler",
      );

      const data = (
        await GetSlotsForWebScheduler(
          storeId,
          ctx.selectedDate,
          appointmentTypeId,
          null,
          recaptchaToken,
        )
      ).data;

      ctx.setWebSchedulerSlot(data?.Result.Slots);
      createSlotGroupHandler(data?.Result?.Slots);

      const newDate = dayjs(
        dayjs(data?.Result?.ScheduleDate).toISOString() || "",
      ).format(DOCTOR_SCHEDULER_API_DATE_FORMAT);

      if (ctx.selectedDate !== newDate) ctx.setSelectedDate(newDate);
    } catch (error: any) {
      const errorResponse: PatientSearchError = error.response?.data?.Error;
      const message =
        errorResponse && (errorResponse.Message || errorResponse.Description)
          ? errorResponse.Description || errorResponse.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
      ctx.setTimeSlotsError({ message, hasError: true });
      ctx.setWebSchedulerSlot([]);
      ctx.updateAvailableTimeSlots({
        Afternoon: [],
        Evening: [],
        Morning: [],
      });
    }
  };

  React.useEffect(() => {
    if (
      !ctx.appointmentType ||
      !ctx.selectedDate ||
      !ctx.storeDetails ||
      ctx.showModifyAptModal
    )
      return;

    getAvailableSlots(ctx.appointmentType.Id, ctx.storeDetails.Id);
  }, [
    ctx.appointmentType,
    ctx.selectedDate,
    ctx.storeDetails,
    ctx.showModifyAptModal,
  ]);

  const onTimeSlotChange = (
    timeSlot: string,
    daySlotConfig: DaySlotsConfig,
    index: number,
  ): void => {
    const selectedDaySlots = ctx.availableTimeSlots[daySlotConfig.name];

    ctx.setTimeSlot(timeSlot);
    ctx.setEndTimeSlot(selectedDaySlots[index + 1] ?? daySlotConfig.endTime);
  };

  return (
    <>
      <Box>
        <Box
          className={style.bookEyeExamSelectDate}
          role="heading"
          aria-label={i18n.t("BOOK_EYE_EXAM.SELECT_DATE_TIME")}
          tabIndex={0}
        >
          {i18n.t("BOOK_EYE_EXAM.SELECT_DATE_TIME")}
        </Box>
      </Box>

      <Grid container spacing={2} className={style.bookEyeExamDatePicker}>
        <Grid item xs={12} md={6} sm={12} paddingLeft={0}>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DateCalendar
              onChange={(value) => {
                ctx.setSelectedDate(
                  dayjs(value?.toISOString() || "").format(
                    DOCTOR_SCHEDULER_API_DATE_FORMAT,
                  ),
                );
                ctx.setTimeSlot(""); // Resets timeslot
              }}
              className={style.datePicker}
              defaultValue={dayjs()}
              minDate={dayjs()}
              disablePast
              value={dayjs(ctx.selectedDate)}
            />
          </LocalizationProvider>
        </Grid>

        <Grid item xs={12} md={6} sm={12}>
          <Box className={style.bookExamTimeSlotHeaderWrapper}>
            <Box
              className={style.bookExamTimeSlotHeaderTitle}
              role="heading"
              aria-label={i18n.t("BOOK_EYE_EXAM.SELECT_AN_AVAILABLE")}
              tabIndex={0}
            >
              {i18n.t("BOOK_EYE_EXAM.SELECT_AN_AVAILABLE")}
            </Box>
            <Box mt={1} className={style.bookExamTimeSlotHeaderDate}>
              {dayjs(ctx.selectedDate || "").format(
                EYE_EXAM_APPOINTMENT_DATE_FORMAT,
              )}
            </Box>
          </Box>

          <Stack spacing={2} sx={{ width: "100%" }} alignItems="center">
            <ToggleButtonGroup
              fullWidth
              color="primary"
              value={ctx.selectedDaySlots}
              onChange={onDaySlotChange}
              exclusive
            >
              {DAY_SLOTS_CONFIG.map((config) => (
                <ToggleButton
                  key={uuid()}
                  className={`${style.bookEyeExamTimePickerTab} ${
                    ctx.selectedDaySlots === config.name ? style.selected : ""
                  }`}
                  value={config.name}
                >
                  {i18n.t(`BOOK_EYE_EXAM.${config.name.toUpperCase()}`)}
                </ToggleButton>
              ))}
            </ToggleButtonGroup>

            {DAY_SLOTS_CONFIG.map((slotConfig) => {
              const timeSlots = ctx.availableTimeSlots[slotConfig.name];

              // This condition will make to display only the selected day slots
              // (i.e: Display only "Morning" slots)
              if (slotConfig.name !== ctx.selectedDaySlots) return <></>;

              return (
                <Grid container spacing={1} key={uuid()}>
                  {timeSlots.length > 0 ? (
                    timeSlots.map((slot, index) => (
                      <Grid item xs={6} sm={3} md={6} lg={3} key={uuid()}>
                        <Button
                          onClick={() =>
                            onTimeSlotChange(slot, slotConfig, index)
                          }
                          className={`${style.timeSlot} ${
                            slot === ctx.timeSlot ? style.selected : ""
                          }`}
                        >
                          {slot}
                        </Button>
                      </Grid>
                    ))
                  ) : (
                    <Typography
                      component={"h5"}
                      className={style.noAppointmentAvaliable}
                    >
                      {i18n.t(
                        `BOOK_EYE_EXAM.NO_${slotConfig.name.toUpperCase()}_APPOINTMENT`,
                      )}
                    </Typography>
                  )}
                </Grid>
              );
            })}
          </Stack>
        </Grid>
      </Grid>
    </>
  );
}
