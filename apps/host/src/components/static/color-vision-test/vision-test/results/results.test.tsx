import "@testing-library/jest-dom/extend-expect";
import { render, screen, fireEvent } from "@testing-library/react";
import { Results } from "./results";
import { TEST_RESULTS } from "./score-messages.constants";
import { TestQuestions } from "../questions.constants";

describe("<Results />", () => {
    it("Should render correctly", () => {
        render(<Results score={0} onRestart={jest.fn()} questions={8} />);
        expect(screen.getByText("0")).toBeInTheDocument();
        expect(screen.getByText("8")).toBeInTheDocument();
        expect(screen.getByText(/Recommendation/i)).toBeInTheDocument();
        expect(screen.getByText(/schedule exam/i)).toHaveAttribute(
            "href",
            "/book-eye-exam",
        );
        expect(screen.getByText(/restart test/i)).toBeInTheDocument();
    });

    // Creates programmable test for all of the recommendation messages based on the achieved score
    Object.entries(TEST_RESULTS).map(([minimumScore, message]) => {
        it(`Should display the recommendation message when score is below or equal to ${minimumScore}`, () => {
            render(
                <Results
                    score={Number(minimumScore)}
                    questions={TestQuestions.length}
                    onRestart={jest.fn()}
                />,
            );
            expect(screen.getByText(message)).toBeInTheDocument();
        });
    });

    it("Should reset the test", () => {
        const onRestart = jest.fn();

        render(
            <Results
                score={8}
                questions={TestQuestions.length}
                onRestart={onRestart}
            />,
        );

        fireEvent.click(screen.getByText(/restart test/i));
        expect(onRestart).toHaveBeenCalledTimes(1);
    });
});
