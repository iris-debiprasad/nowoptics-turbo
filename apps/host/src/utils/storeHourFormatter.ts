import { StoreHourInputDateDTO, StoreHoursDTO } from "@root/host/src/types/SideBar.types";
import dayjs from "dayjs";

export function getWeekday(dates: StoreHourInputDateDTO[]): StoreHoursDTO[] {
  const weekdays = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  const sortedWeekdays = [...weekdays];
  sortedWeekdays.sort((day1, day2) => {
    if (day1 === "Sun") return -1;
    if (day2 === "Sun") return 1;
    if (day1 === "Sat") return 1;
    if (day2 === "Sat") return -1;
    return weekdays.indexOf(day1) - weekdays.indexOf(day2);
  });

  const result: StoreHoursDTO[] = [];

  for (const weekday of sortedWeekdays) {
    const inputDate = dates.find((dateObj) => {
      const parsedDate = new Date(dateObj.ScheduleDate);
      const dateWeekday = weekdays[parsedDate.getDay()];
      return dateWeekday === weekday;
    });


    if (inputDate) {
      const { OpenAt, CloseAt, ScheduleDate } = inputDate;
      const status = formatTimeRange(OpenAt, CloseAt, ScheduleDate);
      result.push({ day: weekday, status });
    } else {
      result.push({ day: weekday, status: "CLOSED" });
    }
  }

  return result;
}

function formatTimeRange(
  openTime: string,
  closeTime: string,
  ScheduleDate: string
): string {
  const formattedOpenTime = formatTime(openTime, ScheduleDate);
  const formattedCloseTime = formatTime(closeTime, ScheduleDate);
  return `${formattedOpenTime.toUpperCase()} to ${formattedCloseTime.toUpperCase()}`;
}

function formatTime(timeStr: string, ScheduleDate: string): string {
  const dateObject = new Date(ScheduleDate);
  const formattedDate = dateObject.toISOString().split("T")[0] + "T";
  const time = new Date(`${formattedDate}${timeStr}`);
  return dayjs(time).format('hh:mm A')
}
