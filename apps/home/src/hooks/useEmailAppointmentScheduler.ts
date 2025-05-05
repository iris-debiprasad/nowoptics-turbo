import { useEffect, useRef, useState } from "react";
import { DaySlots, PatientResponseDTO, TypeOfExamDTO } from "@/types/bookEyeExamSteps.types";
import { DOCTOR_SCHEDULER_API_DATE_FORMAT } from "@root/host/src/constants/common.constants";
import dayjs from "dayjs";

interface IuseEmailAppointmentScheduler {
  setExistingPatient: (patient: PatientResponseDTO) => void,
  setDob: (dob: string) => void,
  setSelectedDate: (date: string) => void
  setAppointmentType: (item: TypeOfExamDTO) => void;
  setTimeSlot: (slot: string) => void
  setEndTimeSlot: (slot: string) => void
  setAppointmentBookingType: (abt: number) => void
}


export default function useEmailFillBookEyeExam(
  {
    setExistingPatient,
    setDob,
    setSelectedDate,
    setAppointmentType,
    setTimeSlot,
    setEndTimeSlot,
  }: IuseEmailAppointmentScheduler
) {
  const timeSlotRef = useRef<string>()
  const [isUsingAppointmentScheduler, setIsUsingAppoitnmentScheduler] = useState(true)

  useEffect(() => {
    checkIfItsUsingAppointmentScheduler()
  }, [])

  const getQueriesParams = () => new URLSearchParams(window.location.search);


  const checkIfItsUsingAppointmentScheduler = () => {
    const params = getQueriesParams();
    const isValidAppointmentScheduler = Boolean(params.get("patient")
      && params.get("patient") !== ""
      && params.get("date")
      && params.get("date") !== ""
      && params.get("time"));
    setIsUsingAppoitnmentScheduler(isValidAppointmentScheduler)
    if (isValidAppointmentScheduler) {
      autofillValues()
    }
  }

  const convertTimefrom24hTo12h = (timeString: string) => {
    const timeString12hr = new Date('1970-01-01T' + timeString + 'Z')
      .toLocaleTimeString('en-US',
        { timeZone: 'UTC', hour12: true, hour: 'numeric', minute: 'numeric' }
      );
    return timeString12hr;
  }

  const convertQuery = (): {
    patient?: string,
    timeSlot?: string,
    date?: string
  } => {
    // Using URLSearchParams here due to next router query being unpredictable
    // and buggy
    const params = getQueriesParams();
    const timeSlot = params.get("time") == "Not Available" ? "" : params.get("time") as string;
    const parsedTimeSlot = (timeSlot.includes("AM") || timeSlot.includes("PM")) ?
      timeSlot
      : convertTimefrom24hTo12h(timeSlot);

    timeSlotRef.current = parsedTimeSlot;
    return {
      patient: params.get("patient") as string,
      timeSlot: parsedTimeSlot,
      date: params.get("date") as string
    }
  }

  const getPatientDetailsBase64 = (base64: string) => {
    try {
      const jsonValue = JSON.parse(window.atob(base64));
      return jsonValue;
    } catch {
      return {}
    }
  }

  const setPatientData = (jsonValue: any) => {
    if (Object.keys(jsonValue).length === 0) return;
    setExistingPatient({
      Id: jsonValue.Id,
      FirstName: jsonValue.FirstName,
      LastName: jsonValue.LastName,
      Email: jsonValue.Email,
      ZipCode: jsonValue.ZipCode,
      Gender: jsonValue.Gender,
      PhoneNumber: {
        IsdCode: jsonValue.PrimaryPhoneNo.IsdCode,
        PhoneNumber: jsonValue.PrimaryPhoneNo.PhoneNumber,
      },
      Dob: jsonValue.Dob,
      PreferredLanguageCode: jsonValue.PreferredLanguageCode,
    });
    setDob(
      dayjs(jsonValue.Dob).format(DOCTOR_SCHEDULER_API_DATE_FORMAT)
    );
  }

  const fillPatientData = (patient?: string) => {
    const patientTest = patient;

    if (patientTest != undefined) {
      setPatientData(getPatientDetailsBase64(patientTest));
    }
  }

  const dayParser = (date: string) => {
    const parsedDate = `${new Date().getFullYear()}-${date.split(" ")[1].replace("/", "-")}`;
    return dayjs(parsedDate).format(DOCTOR_SCHEDULER_API_DATE_FORMAT)
  }

  const autofillValues = async () => {
    const { patient, date } = convertQuery()
    fillPatientData(patient);
    if (date) {
      const dateParsed = dayParser(date)
      setSelectedDate(dateParsed);
    }
  }

  const autoSelectBookEyeExamItem = (items: TypeOfExamDTO[], forceExecution?:boolean) => {
    if (!isUsingAppointmentScheduler && !forceExecution) return;
    const item = items.find(item => item.Description == "Eye Exam")
    if (item) {
      setAppointmentType(item)
    }
  }

  const parseTimeSchedule = (
    setDaySlots: (slot: DaySlots) => void
  ) => {
    const time = timeSlotRef.current;
    if (!time) return;

    if (time.toUpperCase().includes("AM")) {
      setDaySlots("Morning");
      return;
    }

    const startNumber = +time.trim()[0];
    if (!isNaN(startNumber) && startNumber < 6) {
      setDaySlots("Afternoon");
      return;
    }
    setDaySlots("Evening");
  }

  const autoFillTimeSlot = (
    morningSlots: string[],
    afternoonSlots: string[],
    eveningSlots: string[]
  ) => {

    const timeslotMorningIndex = morningSlots.findIndex(ms => ms === timeSlotRef.current)
    const timeslotAfternoonIndex = afternoonSlots.findIndex(ms => ms === timeSlotRef.current)
    const timeslotEveningIndex = eveningSlots.findIndex(ms => ms === timeSlotRef.current)

    if (timeslotMorningIndex != -1) {
      const slot = morningSlots[timeslotMorningIndex]
      setTimeSlot(slot);
      setEndTimeSlot(
        morningSlots[timeslotMorningIndex + 1]
          ? morningSlots[timeslotMorningIndex + 1]
          : "12:00 PM"
      );
      return;
    }

    if (timeslotAfternoonIndex != -1) {
      const slot = afternoonSlots[timeslotAfternoonIndex]
      setTimeSlot(slot);
      setEndTimeSlot(
        afternoonSlots[timeslotAfternoonIndex + 1]
          ? afternoonSlots[timeslotAfternoonIndex + 1]
          : "06:00 PM"
      );
      return;
    }

    if (timeslotEveningIndex != -1) {
      const slot = eveningSlots[timeslotEveningIndex]
      setTimeSlot(slot);
      setEndTimeSlot(
        eveningSlots[timeslotEveningIndex + 1]
          ? eveningSlots[timeslotEveningIndex + 1]
          : "09:00 PM"
      );
      return;
    }

  }

  const fillAppointmentSchedulerTimeSlots = (
    morningSlots: string[],
    afternoonSlots: string[],
    eveningSlots: string[],
    setTimeSlot: (slot: DaySlots) => void
  ) => {

    if (!isUsingAppointmentScheduler) return;
    autoFillTimeSlot(morningSlots, afternoonSlots, eveningSlots)
    parseTimeSchedule(setTimeSlot)
  }



  return {
    autoSelectBookEyeExamItem,
    isUsingAppointmentScheduler,
    fillAppointmentSchedulerTimeSlots,
    autofillValues,
    setIsUsingAppoitnmentScheduler,
    checkIfItsUsingAppointmentScheduler
  }
}
