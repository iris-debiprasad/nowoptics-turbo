import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import StoreOffer from "../StoreOffer";
import { MockStoreContent } from "@/mocks/storedetails.mock";

describe("StoreOffer component", () => {
  const mockStoreDetails = MockStoreContent;

  test("renders the heading correctly", () => {
    render(<StoreOffer storeDetails={mockStoreDetails} />);

    // Assert that the heading is rendered correctly
    expect(
      screen.getByText(mockStoreDetails.PromotionSection[0].Heading)
    ).toBeInTheDocument();
  });

  test("renders the promotions correctly", () => {
    render(<StoreOffer storeDetails={mockStoreDetails} />);

    // Assert that each promotion is rendered correctly
    mockStoreDetails.PromotionSection[0].Promotions.forEach((promotion) => {
      expect(screen.getByText(promotion.PromotionalText)).toBeInTheDocument();
    });
  });

  test("displays the disclaimer modal when 'See details' button is clicked", () => {
    render(<StoreOffer storeDetails={mockStoreDetails} />);

    // Click on the 'See details' button of the first promotion
    const seeDetailsButton = screen.getByText("*See details");
    fireEvent.click(seeDetailsButton);

    // Assert that the modal with the correct content is displayed
    expect(screen.getByText("Offer Details")).toBeInTheDocument();
    expect(screen.getByText("Disclaimer 1")).toBeInTheDocument();
  });

  test("does not display the disclaimer modal initially", () => {
    render(<StoreOffer storeDetails={mockStoreDetails} />);

    // Assert that the modal is not initially displayed
    expect(screen.queryByText("Offer Details")).toBeNull();
    expect(screen.queryByText("Disclaimer 1")).toBeNull();
  });
});
