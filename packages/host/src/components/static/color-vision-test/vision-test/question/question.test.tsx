import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";

import { Question } from "./question";
import { TestQuestions, VisionTestQuestion } from "../questions.constants";

const QUESTION: VisionTestQuestion = TestQuestions[0];

describe("<Question />", () => {
    const onResponseSubmitted = jest.fn();

    beforeEach(() =>
        render(<Question question={QUESTION} {...{ onResponseSubmitted }} />),
    );
    afterEach(() => jest.clearAllMocks());

    const submitQuestionResponse = (response: number) => {
        const input = screen.getByPlaceholderText("Answer");
        fireEvent.change(input, { target: { value: response } });
        expect(input).toHaveValue(response);
        fireEvent.click(screen.getByText(/next/i));
    };

    it("Should render the question component", () => {
        expect(screen.getByRole("img")).toBeVisible();
        expect(screen.getByPlaceholderText(/answer/i)).toBeVisible();
        // Next button should be disabled when input has no number
        expect(screen.getByText(/next/i)).toHaveAttribute("disabled");
        // Skip button should be enabled when input has no number
        expect(screen.getByText(/skip/i)).not.toHaveAttribute("disabled");
        expect(onResponseSubmitted).not.toHaveBeenCalled();
    });

    it("Should not submit a response when input is empty", () => {
        fireEvent.click(screen.getByText(/next/i));
        expect(onResponseSubmitted).not.toHaveBeenCalled();
    });

    it("Should not skip a response when input is not empty", () => {
        fireEvent.change(screen.getByPlaceholderText(/answer/i), {
            target: { value: 50 },
        });
        fireEvent.click(screen.getByText(/skip/i));
        expect(onResponseSubmitted).not.toHaveBeenCalledWith(false);
    });

    it("Should answer the question wrong and submit the response", () => {
        submitQuestionResponse(QUESTION.answer + 1);
        expect(onResponseSubmitted).toHaveBeenCalledWith(false);
    });

    it("Should answer the question correctly and submit the response", () => {
        submitQuestionResponse(QUESTION.answer);
        expect(onResponseSubmitted).toHaveBeenCalledWith(true);
    });

    it("Should reset form after submitting a response", () => {
        submitQuestionResponse(QUESTION.answer);
        expect(screen.getByPlaceholderText(/answer/i)).toHaveValue(null);
        expect(screen.getByText(/next/i)).toHaveAttribute("disabled");
        expect(screen.getByText(/skip/i)).not.toHaveAttribute("disabled");
    });

    it("Should skip a question", () => {
        fireEvent.click(screen.getByText(/skip/i));
        expect(onResponseSubmitted).toHaveBeenCalledWith(false);
    });
});
