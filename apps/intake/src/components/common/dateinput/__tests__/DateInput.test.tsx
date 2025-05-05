import { fireEvent, render, screen, within } from "@testing-library/react";
import DateInput from "..";
import { DATE_FORMAT } from "@root/host/src/constants/common.constants";

describe("DateInput", () => {
  const onChange = jest.fn();
  it("renders a DateInput when no error", () => {
    render(<DateInput onChange={onChange} />);

    const dateInputContainer = screen.getByLabelText(
      "date-input"
    ) as HTMLDivElement;
    const dateInput = within(dateInputContainer).queryByPlaceholderText(
      DATE_FORMAT
    ) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2021-10-10" } });
  });

  it("renders a DateInput when error", () => {
    render(
      <DateInput error={true} errorText="Test error" onChange={onChange} />
    );
  });

  it("renders a DateInput when input is required", () => {
    render(<DateInput required onChange={onChange} />);
  });

  it("renders a DateInput when input is  not required", () => {
    render(<DateInput onChange={onChange} />);
  });
});
