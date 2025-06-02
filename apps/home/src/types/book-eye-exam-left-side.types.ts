import { DaySlots } from "./bookEyeExamSteps.types";

export type AvailableTimeSlots = { [x in DaySlots]: string[] };

export interface TimeSlotsError {
  hasError: boolean;
  message: string;
}

export interface DaySlotsConfig {
  name: DaySlots;
  endTime: string;
}
