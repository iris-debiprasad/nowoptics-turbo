import { fireEvent, render } from "@testing-library/react";
import Select from "..";
import { SelectInputMock } from "@/mocks/input.mock";

describe("Select component suite", () => {
  it("renders the Select Component", () => {
    const onChangeMock = jest.fn();
    const { getByTestId } = render(
      <Select {...SelectInputMock} onChange={onChangeMock} />
    );
    const wrapperNode = getByTestId("select-input") as HTMLInputElement;
    // Dig deep to find the actual <select>
    fireEvent.change(wrapperNode, { target: { value: "3" } });
    expect(onChangeMock).toHaveBeenCalledTimes(0);
  });
});
