import React from "react";
import { render, fireEvent, getByTestId } from "@testing-library/react";
import SelectExam from "../selectExam/SelectExam";
import { examType } from "@root/host/src/types/eyeExamFlow.types";

describe("SelectExam Component", () => {
  const data: examType[] = [
    {
      VariantNumber: "abc",
      Code: "CLS",
      Description: "Contact Lens Fitting",
      RetailPrice: 50,
      FinalPrice: 50,
      MasterProductId: 1,
      ProductVariantId: 2,
    },
  ];
  const toggle = jest.fn();
  it("renders SelectExam correctly when visible", () => {
    const { getByText, getByTestId } = render(
      <SelectExam isVisible={true} data={data} toggle={toggle} />
    );

    // Check if important elements are rendered
    expect(getByTestId("select-exam-container")).toBeInTheDocument();
    expect(getByTestId("select-exam-heading")).toBeInTheDocument();
    expect(getByText("ADD TO CART")).toBeInTheDocument();
  });

  it("handles toggle button click correctly", () => {
    const { getByTestId } = render(
      <SelectExam isVisible={true} toggle={toggle} data={data} />
    );

    const toggleButton = getByTestId("select-exam-toggle");

    fireEvent.click(toggleButton);

    // Check if the toggle function is called
    expect(toggle).toHaveBeenCalled();
  });
});
