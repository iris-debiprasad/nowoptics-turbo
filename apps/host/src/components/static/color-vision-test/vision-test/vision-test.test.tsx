import "@testing-library/jest-dom/extend-expect";
import { screen, render, fireEvent } from "@testing-library/react";

import { VisionTest } from "./vision-test";
import { TestQuestions } from "./questions.constants";
import { TEST_RESULTS } from "./results/score-messages.constants";

describe("<VisionTest />", () => {
  beforeEach(() => render(<VisionTest />));

  const completeTest = (): void =>
    // By running this loop, the test will be completed with score 10 of 11
    TestQuestions.forEach((question, index) => {
      expect(
        screen.getByText(`Question ${index + 1} of ${TestQuestions.length}`),
      ).toBeInTheDocument();

      fireEvent.change(screen.getByPlaceholderText(/answer/i), {
        target: {
          value:
            index === TestQuestions.length - 1
              ? question.answer + 1
              : question.answer,
        },
      });

      fireEvent.click(screen.getByText(/next/i));
    });

  it("Should render correctly", () => {
    expect(screen.getByText(/start/i)).toBeInTheDocument();
    expect(screen.queryByText(/question 1 of 11/)).not.toBeInTheDocument();
  });

  it("Should start the test", () => {
    fireEvent.click(screen.getByText(/start/i));
    expect(screen.queryByText(/start/i)).not.toBeInTheDocument();
    expect(screen.queryByText(/question 1 of 11/i)).toBeInTheDocument();
  });

  it("Should complete the test correctly", () => {
    fireEvent.click(screen.getByText(/start/i));
    completeTest();

    expect(screen.getByText("10")).toBeInTheDocument(); // Score displayed
    expect(screen.getByText("11")).toBeInTheDocument(); // Questions total displayed
    expect(screen.getByText(TEST_RESULTS[10])).toBeInTheDocument(); // Recommendation displayed
  });

  it("Should start a new test and finish it", () => {
    fireEvent.click(screen.getByText(/start/i));
    completeTest();
    fireEvent.click(screen.getByText(/restart test/i));
    expect(screen.queryByText(/question 1 of 11/i)).toBeInTheDocument();
    completeTest();

    expect(screen.getByText("10")).toBeInTheDocument(); // Score displayed
    expect(screen.getByText("11")).toBeInTheDocument(); // Questions total displayed
    expect(screen.getByText(TEST_RESULTS[10])).toBeInTheDocument(); // Recommendation displayed
  });
});
