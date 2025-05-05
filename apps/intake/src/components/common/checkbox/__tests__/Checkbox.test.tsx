import React from "react";
import { render, fireEvent } from "@testing-library/react";
import Checkbox from "..";
import { CheckboxMock } from "@/mocks/input.mock";

describe("Checkbox", () => {
  test("renders without errors", () => {
    render(<Checkbox {...CheckboxMock}/>);
  });

  test("renders with the correct props", () => {
    const handleChange = jest.fn();

    const { container } = render(
      <Checkbox
        {...CheckboxMock}
        handleChange={handleChange}
      />
    );

    const checkboxInput = container.querySelector(`#${CheckboxMock.id}`) as HTMLInputElement;

    expect(checkboxInput.checked).toBe(CheckboxMock.checked);
    expect(checkboxInput.id).toBe(CheckboxMock.id);
    expect(checkboxInput.name).toBe(CheckboxMock.name);
  });

  test("handles change event correctly", () => {
    const handleChange = jest.fn();
    const { container } = render(
      <Checkbox {...CheckboxMock} checked={true} handleChange={handleChange} />
    );
    const checkboxInput = container.querySelector(`#${CheckboxMock.id}`) as HTMLInputElement;
    fireEvent.click(checkboxInput);
    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  test("handles click for label event correctly", () => {
    const handleLabelClick = jest.fn();
    const { container } = render(
      <Checkbox {...CheckboxMock} checked={true} handleLabelClick={handleLabelClick} />
    );
    const checkboxLabel = container.querySelector(`label`) as HTMLLabelElement;
    fireEvent.click(checkboxLabel);
    expect(handleLabelClick).toHaveBeenCalledTimes(1);
  });
});