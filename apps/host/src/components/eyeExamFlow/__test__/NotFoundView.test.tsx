import React from "react";
import { render, fireEvent } from "@testing-library/react";
import NotFoundView from "../notFoundView/NotFoundView";

describe("NotFoundView Component", () => {
  it("renders NotFoundView correctly when visible", () => {
    const toggle = jest.fn();
    const { getByTestId } = render(
      <NotFoundView isVisible={true} toggle={toggle} />
    );

    // Check if important elements are rendered
    expect(getByTestId("not-found-view-container")).toBeInTheDocument();
    expect(getByTestId("not-found-view-text")).toBeInTheDocument();
    expect(getByTestId("Continue-button")).toBeInTheDocument();
  });

  it("handles continue button click correctly", () => {
    const toggle = jest.fn();
    const { getByText } = render(
      <NotFoundView isVisible={true} toggle={toggle} />
    );
    const continueButton = getByText("Continue");

    fireEvent.click(continueButton);

    expect(toggle).toHaveBeenCalled();
  });
});
