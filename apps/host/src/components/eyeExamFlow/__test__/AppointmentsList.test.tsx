import React from "react";
import { render, fireEvent } from "@testing-library/react";
import AppointmentsList from "../appointmentsList/AppointmentsList";
import { AppointmentType } from "@/types/eyeExamFlow.types";

describe("AppointmentsList Component", () => {
  const data: AppointmentType[] = [
    {
      Id: 1,
      Start: "2023-09-20",
      End: "2023-09-21",
      Type: "Regular",
      Status: "Scheduled",
      CreatedOn: "2023-09-19",
      Employee: "John Doe",
      PatientId: 1,
    },
  ];
  const toggle = jest.fn();
  const setSelectedAppointmentId = jest.fn();
  const handleAppointementListContinueClick = jest.fn();
  it("renders AppointmentsList correctly when visible", () => {
    const { getByText, getByTestId } = render(
      <AppointmentsList
        isVisible={true}
        data={data}
        toggle={toggle}
        selectedAppointmentId={null}
        setSelectedAppointmentId={setSelectedAppointmentId}
        handleAppointementListContinueClick={
          handleAppointementListContinueClick
        }
      />
    );

    // Check if important elements are rendered
    expect(getByTestId("appointments-list-container")).toBeInTheDocument();
    expect(getByTestId("appointment-list-heading")).toBeInTheDocument();
    expect(getByText("CONTINUE")).toBeInTheDocument();
  });

  it("handles continue button click correctly", () => {
    const { getByText } = render(
      <AppointmentsList
        isVisible={true}
        data={data}
        toggle={toggle}
        selectedAppointmentId={null}
        setSelectedAppointmentId={setSelectedAppointmentId}
        handleAppointementListContinueClick={
          handleAppointementListContinueClick
        }
      />
    );

    const continueButton = getByText("CONTINUE");

    fireEvent.click(continueButton);

    // Check if the handleAppointementListContinueClick function is called
    expect(handleAppointementListContinueClick).toHaveBeenCalled();
  });
});
