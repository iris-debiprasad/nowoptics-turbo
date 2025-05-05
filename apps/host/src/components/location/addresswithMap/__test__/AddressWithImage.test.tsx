import React from "react";
import { render, screen } from "@testing-library/react";
import AddressWithMap from "../AddressWithStoreImage";
import { MockStoreDetails } from "@/mocks/storedetails.mock";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("AddressWithMap component", () => {
  const mockSelectedStore = MockStoreDetails;

  test("renders the store address and details correctly", () => {
    render(<AddressWithMap selectedStore={mockSelectedStore} />);

    // Assert that the store address and details are rendered correctly
    expect(
      screen.getByText(mockSelectedStore.AddressLine1)
    ).toBeInTheDocument();
    expect(screen.getByText(mockSelectedStore.City)).toBeInTheDocument();
    expect(screen.getByText(mockSelectedStore.StateCode)).toBeInTheDocument();
    expect(screen.getByText(mockSelectedStore.ZipCode)).toBeInTheDocument();
  });

  test("renders the store hours correctly", () => {
    render(<AddressWithMap selectedStore={mockSelectedStore} />);

    // Assert that the store hours are rendered correctly
    expect(screen.getByText(/Day of the Week/i)).toBeInTheDocument();
    expect(screen.getByText(/Hours/i)).toBeInTheDocument();
  });

  test("renders the distance from user location correctly", () => {
    render(<AddressWithMap selectedStore={mockSelectedStore} />);

    // Assert that the distance from user location is rendered correctly
    expect(screen.getByText(/Miles Away/i)).toBeInTheDocument();
  });

  test("opens Google Maps on button click", () => {
    render(<AddressWithMap selectedStore={mockSelectedStore} />);

    const getDirectionsButton = screen.getByText(/Get Directions/i);
    getDirectionsButton.click();

    // Assert that the Google Maps link is opened in a new tab
    expect(window.open).toHaveBeenCalledTimes(1);
    expect(window.open).toHaveBeenCalledWith(
      expect.stringContaining(mockSelectedStore.Latitude.toString()),
      "_blank"
    );
  });
});
