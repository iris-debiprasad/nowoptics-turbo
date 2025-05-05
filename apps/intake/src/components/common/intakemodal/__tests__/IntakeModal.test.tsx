import { fireEvent, render } from "@testing-library/react";
import IntakeModal from "..";

describe("Intake Module test suite", () => {
  const handleClose = jest.fn();
  test("Intake module renders and click close button icon", () => {
    const { getByTestId } = render(
      <IntakeModal open handleClose={handleClose}>
      </IntakeModal>
    );

    const closeIcon = getByTestId("close-icon");

    fireEvent.click(closeIcon);
    expect(handleClose).toHaveBeenCalledTimes(1);
  });

  test("Intake module renders and click cancel button icon", () => {
    const { getByTestId } = render(
      <IntakeModal open handleClose={handleClose} modalTitle="Test Title">
        <div>Test Children</div>
      </IntakeModal>
    );

    const cancelButton = getByTestId("cancel-button");

    fireEvent.click(cancelButton);
    expect(handleClose).toHaveBeenCalledTimes(2);
  });
});
