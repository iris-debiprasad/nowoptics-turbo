import React from "react";
import { render, fireEvent } from "@testing-library/react";
import DeleteModal from "../ConfirmationModal";

describe("DeleteModal", () => {
  const handleCloseMock = jest.fn();
  const performDeleteMock = jest.fn();

  const props = {
    open: true,
    handleClose: handleCloseMock,
    performAction: performDeleteMock,
    content: "Are you sure you want to delete this item?",
    Id: 1,
    btnOneText: "CANCEL",
    btnTwoText: "YES",
  };

  afterEach(() => {
    handleCloseMock.mockClear();
    performDeleteMock.mockClear();
  });

  it("renders modal with correct heading and content", () => {
    const { getByText } = render(<DeleteModal {...props} />);
    expect(getByText(props.content)).toBeInTheDocument();
  });

  it("calls handleClose when close icon is clicked", () => {
    const { getByTestId } = render(<DeleteModal {...props} />);
    const closeIcon = getByTestId("close-icon");
    fireEvent.click(closeIcon);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });

  it("calls performDelete with the correct Id when YES button is clicked", () => {
    const { getByText } = render(<DeleteModal {...props} />);
    const yesButton = getByText("YES");
    fireEvent.click(yesButton);
    expect(performDeleteMock).toHaveBeenCalledTimes(1);
    expect(performDeleteMock).toHaveBeenCalledWith(props.Id);
  });

  it("calls handleClose when CANCEL button is clicked", () => {
    const { getByText } = render(<DeleteModal {...props} />);
    const cancelButton = getByText("CANCEL");
    fireEvent.click(cancelButton);
    expect(handleCloseMock).toHaveBeenCalledTimes(1);
  });
});
