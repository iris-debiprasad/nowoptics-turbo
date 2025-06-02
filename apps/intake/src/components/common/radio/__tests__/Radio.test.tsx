import React from "react";
import { render, fireEvent, screen } from "@testing-library/react";
import Radio from "..";
import { RadioMock } from "@/mocks/input.mock";

describe("Checkbox", () => {
  test("renders without errors", () => {
    render(<Radio {...RadioMock}/>);
  });

  test("renders with the correct props", () => {
    const handleChange = jest.fn();

    const { container } = render(
      <Radio
        {...RadioMock}
        handleChange={handleChange}
      />
    );

    const radioInput = container.querySelector(`#${RadioMock.id}`) as HTMLInputElement;

    expect(radioInput.checked).toBe(RadioMock.checked);
    expect(radioInput.id).toBe(RadioMock.id);
    expect(radioInput.name).toBe(RadioMock.name);
  });

  test("handles change event correctly", () => {
    const handleChangeMock = jest.fn();
    const { container } = render(
      <Radio {...RadioMock} checked={true} handleChange={handleChangeMock} />
    );
    const radioInput = container.querySelector(`input`) as HTMLInputElement;
    fireEvent.change(radioInput);
    expect(handleChangeMock).toHaveBeenCalledTimes(0);
  });

  test("handles click for label event correctly", () => {
    const handleLabelClick = jest.fn();
    const { container } = render(
      <Radio {...RadioMock} checked={true} handleLabelClick={handleLabelClick} />
    );
    const checkboxLabel = container.querySelector(`label`) as HTMLLabelElement;
    fireEvent.click(checkboxLabel);
    expect(handleLabelClick).toHaveBeenCalledTimes(1);
  });
});