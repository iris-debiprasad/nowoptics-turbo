import { fireEvent, render } from "@testing-library/react";
import Dialog from "..";

describe("Dialog test suite", () => {
  const handleConfirm = jest.fn();
  const handleCancel = jest.fn();
  test("Renders the dialog component", () => {
    render(
      <Dialog
        heading={"Test Heading"}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        open={true}
      />
    );
  });

  test("Tests the close button", () => {
    const { getAllByRole } = render(
      <Dialog
        heading={"Test Heading"}
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        open={true}
      ><p>Test Children</p></Dialog>
    );
    const backdrop = getAllByRole("presentation")[0].querySelector(".MuiBackdrop-root") as HTMLDivElement;
    fireEvent.click(backdrop);
  });
});
