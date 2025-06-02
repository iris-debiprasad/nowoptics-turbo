import { render } from "@testing-library/react";
import ImageWithButton from "../ImageWithButton";
import { PropsDTO } from "@root/host/src/types/ImageWithButton.type";

describe("ImageWith Button Slider component", () => {
  const props: PropsDTO = {
    image: "https://via.placeholder.com/479x345",
    btnName: "testing Button",
    btnLink: "https://www.google.com",
  };
  it("renders the ImageWith Button Slider component", () => {
    render(<ImageWithButton {...props} />);
  });
});
