import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import ChangeStore from "../ChangeStore";

jest.mock(
  "next/link",
  () =>
    ({ children }: { children: React.ReactNode }) =>
      children
);

jest.mock("@/service/storeLocator.service", () => ({
  GetAuthenticatedStoreLocatorGrid: jest.fn().mockResolvedValue({
    data: {
      Result: {
        Results: [
          {
            Id: 1,
            BrandName: "Store 1",
            CloseAt: "6:00 PM",
            HasSameDayDelivery: false,
            Latitude: 12.345,
            Longitude: 67.89,
          },
          {
            Id: 2,
            BrandName: "Store 2",
            CloseAt: "7:00 PM",
            HasSameDayDelivery: true,
            Latitude: 34.567,
            Longitude: 12.345,
          },
        ],
        PageCount: 2,
      },
    },
  }),
}));
jest.mock("@/utils/calculateDistance", () => ({
  calculateDistance: jest.fn().mockReturnValue(5),
}));

describe("ChangeStore", () => {
  test('loads more stores when "Load More" button is clicked', async () => {
    const showSnackBar = jest.fn();
    render(<ChangeStore handleClose={jest.fn()} showSnackBar={showSnackBar} />);

    await screen.findAllByText(/Store \d/i);

    const loadMoreButton = screen.getByText("Load More");
    fireEvent.click(loadMoreButton);
  });
});
