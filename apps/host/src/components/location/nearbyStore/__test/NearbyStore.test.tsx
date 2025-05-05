import React from "react";
import { render, screen } from "@testing-library/react";
import NearbyStore from "../NearbyStore";
import { MockStoreContent } from "@/mocks/storedetails.mock";

// Mock the store details data with no nearby stores
const storeDetailsData = MockStoreContent;

test("renders NearbyStore component with no nearby stores", async () => {
  render(<NearbyStore storeDetails={storeDetailsData} />);

  // Check if the heading is rendered
  expect(screen.getByText("Nearby Stores")).toBeInTheDocument();

  // Check if the "ALL LOCATION" link is displayed
  expect(screen.getByText("ALL LOCATION")).toBeInTheDocument();

  // Check if there are no store items rendered
  expect(screen.queryByTestId("store-item")).toBeNull();

  // You can add more assertions for other elements as needed
});
