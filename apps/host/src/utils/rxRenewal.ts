import { ScheduleEntry, rxDataForRedirectDTO } from "../types/rxRenewal.types";

function convertTo24Hour(timeStr: string): string {
  const [time, modifier] = timeStr.split(" ");
  let [hours, minutes] = time.split(":");

  if (hours === "12") {
    hours = "00";
  }

  if (modifier === "PM") {
    hours = (parseInt(hours, 10) + 12).toString();
  }

  return `${hours.padStart(2, "0")}:${minutes.padStart(2, "0")}`;
}

// Function to check if current time is within the schedule
function isCurrentTimeInRange(schedule: ScheduleEntry[]): boolean {
  if (schedule.length === 0) {
    return false;
  }
  const now = new Date();
  const estTime = new Date(
    now.toLocaleString("en-US", { timeZone: "America/New_York" })
  );
  const currentDay = estTime.toLocaleString("en-US", { weekday: "long" });

  const todaySchedule = schedule.find((item) => item.Day === currentDay);

  if (todaySchedule && !todaySchedule.Closed) {
    const startTime = convertTo24Hour(todaySchedule.StartTime);
    const endTime = convertTo24Hour(todaySchedule.EndTime);

    const [startHours, startMinutes] = startTime.split(":").map(Number);
    const [endHours, endMinutes] = endTime.split(":").map(Number);

    const startDateTime = new Date(estTime);
    const endDateTime = new Date(estTime);

    startDateTime.setHours(startHours, startMinutes, 0, 0);
    endDateTime.setHours(endHours, endMinutes, 0, 0);
    return estTime >= startDateTime && estTime <= endDateTime;
  }

  return false;
}

export const isActionAllowed = (
  ScheduleEntry?: ScheduleEntry[],
  flag?: boolean
) => {
  if (flag) {
    return true;
  }

  if (ScheduleEntry) return isCurrentTimeInRange(ScheduleEntry);

  // Uncomment below code to enable 24 hours service
  // return true;
};

export const convertJsonPayloadToBase64 = (
  rxDataForRedirect: rxDataForRedirectDTO
) => {
  const payload = JSON.stringify(rxDataForRedirect);
  return Buffer.from(payload).toString("base64");
};

export const decodeBase64Payload = (base64: string) => {
  const payload = Buffer.from(base64, "base64").toString("utf-8");
  return JSON.parse(payload);
};
