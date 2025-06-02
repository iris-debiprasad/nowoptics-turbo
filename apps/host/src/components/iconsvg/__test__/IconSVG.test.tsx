import { render } from "@testing-library/react";
import IconSVG from "../IconSVG";
import { iconSVGMockData } from "@/mocks/iconSVG.mock";


describe("Icon SVG component", () => {
  it("renders the Icon SVG component", () => {
    render(<IconSVG {...iconSVGMockData} />);
  });
});
