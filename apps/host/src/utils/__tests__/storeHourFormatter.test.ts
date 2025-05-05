import { getWeekday } from "../storeHourFormatter";

const inputDates = [
  {
    ScheduleDate: "2023-05-24T00:00:00",
    OpenAt: "10:00:00",
    CloseAt: "16:00:00",
  },
  {
    ScheduleDate: "2023-05-26T00:00:00",
    OpenAt: "10:00:00",
    CloseAt: "16:00:00",
  },
];

const expectedOutput = [
  { day: "Sun", status: "CLOSED" },
  { day: "Mon", status: "CLOSED" },
  { day: "Tue", status: "CLOSED" },
  { day: "Wed", status: "10:00 AM to 04:00 PM" },
  { day: "Thu", status: "CLOSED" },
  { day: "Fri", status: "10:00 AM to 04:00 PM" },
  { day: "Sat", status: "CLOSED" },
];

describe("Format Store Hour", () => {
  it("Format Store Hour", () => {
    const result = getWeekday(inputDates);

    expect(result).toEqual(expectedOutput);
  });
});
