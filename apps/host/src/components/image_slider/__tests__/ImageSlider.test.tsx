import { render } from "@testing-library/react";
import ImageSlider from "../ImageSlider";
import SingleImageSlider from "../SingleImageSlider";
import { SLIDER_CONSTANT } from "@root/host/src/constants/ImageSlider.constants";
import { Props } from "@root/host/src/types/ImageSlider.types";

const multipleImageSliderDataOne: Props = {
  slideType: SLIDER_CONSTANT.NESTED_SLIDER_TEMP,
  name: true,
  productData: [],
  sliderData: [],
};

const multipleImageSliderDataTwo: Props = {
  slideType: SLIDER_CONSTANT.SINGLE_SLIDER,
  name: true,
  productData: [],
  sliderData: [],
};

const multipleImageSliderDataThree: Props = {
  slideType: SLIDER_CONSTANT.CARD_SLIDER,
  name: true,
  productData: [],
  sliderData: [],
};

describe("Multiple Image Slider component", () => {
  it("renders the Multiple Image Slider component", () => {
    render(<ImageSlider {...multipleImageSliderDataOne} />);
  });

  it("renders the Multiple Image Slider component", () => {
    render(<ImageSlider {...multipleImageSliderDataTwo} />);
  });

  it("renders the Multiple Image Slider component", () => {
    render(<ImageSlider {...multipleImageSliderDataThree} />);
  });

  it("renders the Multiple Image Slider component", () => {
    render(<SingleImageSlider />);
  });
});
