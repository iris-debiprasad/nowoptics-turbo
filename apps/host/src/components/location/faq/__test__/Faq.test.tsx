import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import Faq from "../Faq";
import { MockStoreContent } from "@/mocks/storedetails.mock";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Faq component", () => {
  const mockStoreDetails = MockStoreContent;

  test("renders the heading correctly", () => {
    render(<Faq storeDetails={mockStoreDetails} />);

    // Assert that the heading is rendered correctly
    expect(
      screen.getByText(mockStoreDetails.FAQSection[0].Heading)
    ).toBeInTheDocument();
  });

  test("renders the FAQ items correctly", () => {
    render(<Faq storeDetails={mockStoreDetails} />);

    // Assert that each FAQ question and answer is rendered correctly
    mockStoreDetails.FAQSection[0].FAQs.forEach((faq) => {
      expect(screen.getByText(faq.Question)).toBeInTheDocument();
      expect(screen.getByText(faq.Answer)).toBeInTheDocument();
    });
  });

  test("expands the accordion on click", () => {
    render(<Faq storeDetails={mockStoreDetails} />);

    // Click on the first FAQ accordion
    const accordionHeading = screen.getByText(
      mockStoreDetails.FAQSection[0].FAQs[0].Question
    );
    fireEvent.click(accordionHeading);

    // Assert that the accordion is expanded
    expect(accordionHeading.getAttribute("aria-expanded")).toBe("true");
  });

  test("collapses the accordion on click when already expanded", () => {
    render(<Faq storeDetails={mockStoreDetails} />);

    // Click on the first FAQ accordion to expand it
    const accordionHeading = screen.getByText(
      mockStoreDetails.FAQSection[0].FAQs[0].Question
    );
    fireEvent.click(accordionHeading);

    // Click on the first FAQ accordion again to collapse it
    fireEvent.click(accordionHeading);

    // Assert that the accordion is collapsed
    expect(accordionHeading.getAttribute("aria-expanded")).toBe("false");
  });

  test("navigates to the bookEyeExam page on button click", () => {
    render(<Faq storeDetails={mockStoreDetails} />);

    // Click on the Book Eye Exam button
    const bookExamButton = screen.getByText("Book Eye Exam");
    fireEvent.click(bookExamButton);
  });
});
