import React from "react";
import { render } from "@testing-library/react";
import EyeExamFlow from "../EyeExamFlow";

describe("EyeExamFlow Component", () => {
  const toggleMock = jest.fn();

  it("renders EyeExamFlow when visible", () => {
    const { getByText } = render(
      <EyeExamFlow isVisible={true} toggle={toggleMock} />
    );
  });
});
