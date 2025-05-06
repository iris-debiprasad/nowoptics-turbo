import React from "react";

import { useSnackBar } from "@root/home/src/contexts/Snackbar/SnackbarContext";
import { GetAllWebSchedulerVisibleAppointmentTypes } from "@root/home/src/service/storeLocator.service";
import { type AlertColor } from "@mui/material";
import {
  BookEyeExamStepProps,
  DaySlots,
  TypeOfExamDTO,
} from "@/types/bookEyeExamSteps.types";
import {
  SNACKBAR_COLOR_TYPE,
  SO_DEFAULT_STORE_SUPPORT_NUMBER,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import { STORE_ERROR_MESSAGE } from "@root/host/src/constants/store.constants";
import i18n from "@root/host/src/language/i18n";
import {
  AvailableTimeSlots,
  TimeSlotsError,
} from "@/types/book-eye-exam-left-side.types";

interface ContextValues extends BookEyeExamStepProps {
  availableTimeSlots: AvailableTimeSlots;
  isDobErr: boolean;
  isDobSelectorOpen: boolean;
  selectedDaySlots: DaySlots;
  setIsDobErr: React.Dispatch<React.SetStateAction<boolean>>;
  setIsDobSelectorOpen: React.Dispatch<React.SetStateAction<boolean>>;
  setSelectedDaySlots: React.Dispatch<React.SetStateAction<DaySlots>>;
  setTimeSlotsError: React.Dispatch<React.SetStateAction<TimeSlotsError>>;
  timeSlotsError: TimeSlotsError;
  typeOfExam: TypeOfExamDTO[];
  updateAvailableTimeSlots: (timeSlots: AvailableTimeSlots) => void;
  removeSelectedTimeSlot: () => void;
}

/** Function placeholder initial value */
const FN = () => {};

export const context = React.createContext<ContextValues>({
  timeSlotsError: { hasError: false, message: "" },
  setTimeSlotsError: FN,
  selectedDaySlots: "Morning",
  setSelectedDaySlots: FN,
  availableTimeSlots: { Morning: [], Afternoon: [], Evening: [] },
  typeOfExam: [],
  updateAvailableTimeSlots: FN,
  setSelectedDate: FN,
  setWebSchedulerSlot: FN,
  selectedDate: "",
  appointmentSchedulerMethods: {
    fillAppointmentSchedulerTimeSlots: FN,
    setIsUsingAppoitnmentScheduler: FN,
    autoSelectBookEyeExamItem: FN,
    checkIfItsUsingAppointmentScheduler: FN,
    autoFillAppointmentSchedulerValues: FN,
  },
  appointmentBookingType: -1,
  userType: "",
  setAppointmentBookingType: FN,
  setAppointmentType: FN,
  appointmentType: null,
  showModifyAptModal: false,
  dob: "",
  setDob: FN,
  timeSlot: "",
  stepCount: 1,
  endTimeSlot: "",
  setTimeSlot: FN,
  setStepCount: FN,
  storeDetails: null,
  setEndTimeSlot: FN,
  reschedulingMode: false,
  webSchedulerSlot: [],
  setReservationDetails: FN,
  setIsDobErr: FN,
  isDobErr: false,
  isDobSelectorOpen: false,
  setIsDobSelectorOpen: FN,
  removeSelectedTimeSlot: FN,
});

export const INITIAL_TIME_SLOTS: AvailableTimeSlots = {
  Morning: [],
  Evening: [],
  Afternoon: [],
};

interface Props extends BookEyeExamStepProps {
  children: React.ReactNode;
}

export function Provider({ children, ...rest }: Readonly<Props>): JSX.Element {
  const { showSnackBar } = useSnackBar();

  const [isDobSelectorOpen, setIsDobSelectorOpen] =
    React.useState<boolean>(false);
  const [isDobErr, setIsDobErr] = React.useState(false);
  const [typeOfExam, setTypeOfExam] = React.useState<TypeOfExamDTO[]>([]);
  const [timeSlotsError, setTimeSlotsError] = React.useState<TimeSlotsError>({
    message: `${i18n.t(
      "BOOK_EYE_EXAM.WE_COULDN'T_FIND",
    )} ${SO_DEFAULT_STORE_SUPPORT_NUMBER} ${i18n.t(
      "BOOK_EYE_EXAM.TO_SCHEDULE",
    )}`,
    hasError: false,
  });

  const [selectedDaySlots, setSelectedDaySlots] =
    React.useState<DaySlots>("Morning");

  const [availableTimeSlots, setAvailableTimeSlots] =
    React.useState<AvailableTimeSlots>(INITIAL_TIME_SLOTS);

  React.useEffect(() => {
    const getAllWebSchedulerVisibleAppointment = async () => {
      try {
        const data = (await GetAllWebSchedulerVisibleAppointmentTypes()).data;

        if (!data.Result) return;
        setTypeOfExam(data.Result);

        if (rest.userType !== USER_TYPE.ANONYMOUS) return;
        rest.appointmentSchedulerMethods.autoSelectBookEyeExamItem(data.Result);
      } catch (err: any) {
        showSnackBar(
          err.message
            ? err.message
            : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
        );
      }
    };

    getAllWebSchedulerVisibleAppointment();
  }, [rest.userType]);

  const selectDaySlotBasedOnTimeSlotsAvailability = (
    timeSlots: AvailableTimeSlots,
  ) => {
    if (timeSlots.Morning.length > 0) {
      setSelectedDaySlots("Morning");
    } else if (
      timeSlots.Morning.length === 0 &&
      timeSlots.Afternoon.length > 0
    ) {
      setSelectedDaySlots("Afternoon");
    } else if (
      timeSlots.Morning.length === 0 &&
      timeSlots.Afternoon.length === 0 &&
      timeSlots.Evening.length > 0
    ) {
      setSelectedDaySlots("Evening");
    } else {
      setSelectedDaySlots("Morning");
    }
  };

  const updateAvailableTimeSlots = (timeSlots: AvailableTimeSlots): void => {
    setAvailableTimeSlots(timeSlots);
    selectDaySlotBasedOnTimeSlotsAvailability(timeSlots);
    rest.appointmentSchedulerMethods.fillAppointmentSchedulerTimeSlots(
      timeSlots.Morning,
      timeSlots.Afternoon,
      timeSlots.Evening,
      setSelectedDaySlots,
    );
  };

  const removeSelectedTimeSlot = (): void => {
    setAvailableTimeSlots((prev) => {
      const newSlotsForSelectedDaySlot = prev[selectedDaySlots].filter(
        (slot) => slot !== rest.timeSlot,
      );

      return {
        ...prev,
        [selectedDaySlots]: newSlotsForSelectedDaySlot,
      };
    });
  };

  const value: ContextValues = {
    ...rest,
    availableTimeSlots,
    isDobErr,
    isDobSelectorOpen,
    selectedDaySlots,
    setIsDobErr,
    setIsDobSelectorOpen,
    setSelectedDaySlots,
    setTimeSlotsError,
    timeSlotsError,
    typeOfExam,
    updateAvailableTimeSlots,
    removeSelectedTimeSlot,
  };

  return <context.Provider {...{ value }}>{children}</context.Provider>;
}

export const useLeftSideOfBEEContext = () => React.useContext(context);
