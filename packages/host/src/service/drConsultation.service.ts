
import { CommonUrlConstants } from "../constants/common.url.constants";
import { HeaderConfig } from "../config/headerConfig";
import axios from "axios";
import { IrisUrlConstants } from "../constants/iris.url.constants";

export interface IDoctorConsultationSchedule {
    attendanceDayTime: {
        Monday: string
        Tuesday: string
        Wednesday: string
        Thursday: string
        Friday: string
        Saturday: string
        Sunday: string
    }
    message: string
    messageEs: string
    closedMessage?: string
    closedMessageEs?: string
}

export enum weekDays {
    SUN = 'Sunday',
    MON = 'Monday',
    TUE = 'Tuesday',
    WED = 'Wednesday',
    THU = 'Thursday',
    FRI = 'Friday',
    SAT = 'Saturday',
}

export enum timeZoneNames {
    AST = 'America/Anchorage',
    EST = 'America/Indiana/Indianapolis',
    CST = 'America/Chicago',
    MST = 'America/Denver',
    PST = 'America/Los_Angeles',
}

export const getDrConsultationTimingConfig = async () =>
    await axios.get(
        CommonUrlConstants.GET_RX_RENEWAL_TIMING_CONFIG.replace(
            "{0}",
            "DrConsultationWeeklyWorkingHours"
        ),
        HeaderConfig()
    );

export const checkOnGoingCallStatus = async (patientId: number, stateCode: string) =>
    await axios.get(`${IrisUrlConstants.CHECK_MRS_ONGOING_CALL_STATUS}/${patientId}/${stateCode}`,
        HeaderConfig()
    );

export const verifyDoctorConsultationClosedHours = (schedule: IDoctorConsultationSchedule) => {
    const storeTime = getDateTimeInTimezone('EST');
    const currentDay = Object.values(weekDays)[storeTime.getDay()];
    const settingHours = schedule.attendanceDayTime[currentDay];
    return settingHours == `Closed`;
}
export const verifyDoctorConsultationHours = (schedule: IDoctorConsultationSchedule) => {
    const storeTime = getDateTimeInTimezone('EST')
    const currentDay = Object.values(weekDays)[storeTime.getDay()]
    let startTime = new Date(storeTime)
    let endTime = new Date(storeTime)
    let availableSchedule = false

    const settingHours = schedule.attendanceDayTime[currentDay]

    if (settingHours !== `Closed` && settingHours !== null) {
        const attendanceHours = settingHours.split('-')
        const startHour = attendanceHours[0].split(':')
        const endHour = attendanceHours[1].split(':')
        startTime = modifyTime(startTime, Number(startHour[0]), Number(startHour[1]))
        endTime = modifyTime(endTime, Number(endHour[0]), Number(endHour[1]))
        availableSchedule = storeTime >= startTime && storeTime <= endTime
    }

    return availableSchedule
}

const modifyTime = (date: Date, hour: number, minutes: number) => {
    date.setHours(hour)
    date.setMinutes(minutes)
    date.setSeconds(0)

    return date
}

const getDateTimeInTimezone = (timezone: string) => {
    let tz: string | undefined = timezone.match(/\b(\w)/g)?.join('')

    if (timezone.length === 3 && tz?.length === 1) {
        tz = timezone
    }

    try {
        if (tz) {
            const offset: string = (timeZoneNames as any)[tz]
            const currentDate = new Date()
            const adjustedDate = new Date(currentDate.toLocaleString('en-US', { timeZone: offset }))
            return adjustedDate
        }
    } catch (e) {
        console.error('Error to use timeZone', e)
    }

    return new Date()
}