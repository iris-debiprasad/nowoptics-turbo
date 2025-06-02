import { render } from "@testing-library/react";
import SwitchInput from "..";

describe("Switch component suite", () => {
    it("renders the switch component", () => {
        render(<SwitchInput onChange={jest.fn()} checked />);
    })
})