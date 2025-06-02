import React from "react";
import { render, fireEvent } from "@testing-library/react";
import SelectPatientAssociateModal from "../SelectPatientAssociateModal";

describe("SelectPatientAssociateModal Component", () => {
  const toggleMock = jest.fn();
  const userInput = "";
  const handleUserInput = jest.fn();
  const selectPatientData = null;
  const selectedPatient = null;
  const setSelectedPatient = jest.fn();
  const handleContinueClick = jest.fn();

  it("renders SelectPatientAssociateModal correctly", () => {
    const { getByTestId } = render(
      <SelectPatientAssociateModal
        toggle={toggleMock}
        userInput={userInput}
        handleUserInput={handleUserInput}
        selectPatientData={selectPatientData}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        handleContinueClick={handleContinueClick}
      />
    );

    // Check if important elements are rendered
    expect(getByTestId("selectPatientInputView-cross")).toBeInTheDocument();
    expect(getByTestId("select-patient-modal-heading")).toBeInTheDocument();
    expect(
      getByTestId("select-patient-modal-search-button")
    ).toBeInTheDocument();
    expect(getByTestId("select-patient-modal-input")).toBeInTheDocument();
    expect(getByTestId("select-patient-modal-search-icon")).toBeInTheDocument();
  });

  it("handles user input correctly", () => {
    const { getByTestId } = render(
      <SelectPatientAssociateModal
        toggle={toggleMock}
        userInput={userInput}
        handleUserInput={handleUserInput}
        selectPatientData={selectPatientData}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        handleContinueClick={handleContinueClick}
      />
    );
    const inputElement = getByTestId(
      "select-patient-modal-input"
    ) as HTMLInputElement;

    fireEvent.change(inputElement, { target: { value: "John" } });

    // Check if the input element's value changes
    expect(inputElement.value).toBe("John");

    // Check if the handleUserInput function is called with the correct value
    expect(handleUserInput).toHaveBeenCalledWith(
      expect.objectContaining({ target: { value: "John" } })
    );
  });

  it("handles continue click correctly", () => {
    const { getByTestId } = render(
      <SelectPatientAssociateModal
        toggle={toggleMock}
        userInput={userInput}
        handleUserInput={handleUserInput}
        selectPatientData={selectPatientData}
        selectedPatient={selectedPatient}
        setSelectedPatient={setSelectedPatient}
        handleContinueClick={handleContinueClick}
      />
    );
    const continueButton = getByTestId("select-patient-modal-submit");

    fireEvent.click(continueButton);

    // Check if the handleContinueClick function is called
    expect(handleContinueClick).toHaveBeenCalled();
  });
});
