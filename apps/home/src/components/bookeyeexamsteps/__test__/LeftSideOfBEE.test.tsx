import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import LeftSideOfBEE from "../steps/LeftSideOfBEE";
import { GetAllWebSchedulerVisibleAppointmentTypes } from "@/service/storeLocator.service";

jest.mock("@/service/storeLocator.service", () => ({
  GetAllWebSchedulerVisibleAppointmentTypes: jest.fn().mockResolvedValue({
    data: {
      Result: [
        {
          Id: 1,
          Name: "Eye Exam",
          IsVisibleOnWebScheduler: true,
          IsRevenue: false,
        },
        {
          Id: 7,
          Name: "Eye Exam Appointment",
          IsVisibleOnWebScheduler: true,
          IsRevenue: null,
        },
      ],
      SuccessMessage: "Appointment types get successfully",
    },
  }),
}));

describe("LeftSideOfBEE component", () => {

  // test("renders the component without errors", () => {
  //   render(
  //     <LeftSideOfBEE
  //       dob=""
  //       stepCount={0}
  //       setStepCount={() => {}}
  //       setDob={() => {}}
  //     />
  //   );
  //
  //   expect(screen.getByText("What type of exam do you need?")).toBeTruthy();
  // });
  // test("renders store details when storeId is provided", async () => {
  //   await waitFor(() => {
  //     expect(GetAllWebSchedulerVisibleAppointmentTypes).toHaveBeenCalledTimes(
  //       1
  //     );
  //   });
  // });
  //
  // test("selects a type of exam", () => {
  //   render(
  //     <LeftSideOfBEE
  //       dob=""
  //       stepCount={0}
  //       setStepCount={() => {}}
  //       setDob={() => {}}
  //     />
  //   );
  //
  //   const examButton = screen.getByText("Next");
  //   fireEvent.click(examButton);
  //   expect(screen.getByText("Next")).toBeTruthy();
  // });
});
