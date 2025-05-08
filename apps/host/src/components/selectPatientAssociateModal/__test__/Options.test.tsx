import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Options from "../options/Options";
import { selectPatientDataTypes } from "@root/host/src/types/selectPatientAssociateModal.types";

describe("Options Component", () => {
  const data = null;
  const selectedPatient = null;
  const setSelectedPatient = jest.fn();

  it("renders Options correctly", () => {
    const { getByTestId } = render(
      <Options
        data={data}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
      />
    );

    // Check if important elements are rendered
    expect(
      getByTestId("selectPatientModal-patient-options")
    ).toBeInTheDocument();
  });

  it("handles option select correctly", () => {
    const setSelectedPatient = jest.fn();
    const data: selectPatientDataTypes[] = [
      {
        Id: 1,
        FirstName: "John",
        LastName: "Doe",
        Email: "john.doe@example.com",
        Dob: "",
        PhoneNumber: {
          IsdCode: "+1",
          PhoneNumber: "1234567890",
        },
      },
    ];

    const { getByTestId } = render(
      <Options
        data={data}
        selectedPatient={null}
        setSelectedPatient={setSelectedPatient}
      />
    );

    const selectButton = getByTestId("select-patient-modal-select-button-0");

    fireEvent.click(selectButton);

    // Check if the handleOptionSelect function is called with the correct option
    expect(setSelectedPatient).toHaveBeenCalledWith(data[0]);
  });
});
