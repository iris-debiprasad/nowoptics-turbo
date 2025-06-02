import React from "react";
import { render, screen } from "@testing-library/react";
import OurCustomerVoice from "../OurCustomerVoice";
import { MockStoreContent } from "@/mocks/storedetails.mock";

describe("OurCustomerVoice component", () => {
  const mockStoreDetails = MockStoreContent;

  test("renders the heading correctly", () => {
    render(<OurCustomerVoice storeDetails={mockStoreDetails} />);

    // Assert that the heading is rendered correctly
    expect(
      screen.getByText(mockStoreDetails.ReviewSection[0].Heading)
    ).toBeInTheDocument();
  });

  test("renders the reviews correctly", () => {
    render(<OurCustomerVoice storeDetails={mockStoreDetails} />);

    // Assert that each review is rendered correctly
    mockStoreDetails.ReviewSection[0].Reviews.forEach((review) => {
      expect(screen.getByText(review.AuthorName)).toBeInTheDocument();
      expect(
        screen.getByText(`${review.City}, ${review.State}`)
      ).toBeInTheDocument();
      expect(screen.getByText(review.Text)).toBeInTheDocument();
    });
  });
});
