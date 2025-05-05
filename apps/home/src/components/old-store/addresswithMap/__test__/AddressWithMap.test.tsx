import React from "react";
import { render, screen, waitFor } from "@testing-library/react";
import { GetUserStoreDetails } from "@/service/storeLocator.service";

import AddressWithMap from "../AddressWithMap";

jest.mock("@/service/storeLocator.service", () => ({
  GetUserStoreDetails: jest.fn().mockResolvedValue({
    data: {
      Result: {
        BrandName: "Test Store",
        CloseAt: "18:00",
        AddressLine1: "123 Main St",
        City: "City",
        StateCode: "ST",
        ZipCode: "12345",
        PhoneNumber: "1234567890",
        WorkingHours: [
          { day: "Mon", status: "Closed" },
          { day: "Tue", status: "Closed" },
        ],
        Latitude: "0",
        Longitude: "0",
      },
    },
  }),
}));

describe("AddressWithMap", () => {
  test("renders store details when storeId is provided", async () => {
    render(<AddressWithMap storeId="1" />);
    await waitFor(() => {
      expect(GetUserStoreDetails).toHaveBeenCalledTimes(1);
    });
    expect(screen.getByText("Test Store")).toBeTruthy();
    expect(screen.getByText("Closed : 18:00")).toBeTruthy();
    expect(screen.getByText("123 Main St")).toBeTruthy();
    expect(screen.getByText("City")).toBeTruthy();
    expect(screen.getByText("ST 12345")).toBeTruthy();
    expect(screen.getByText("(123)4567890")).toBeTruthy();
    expect(screen.getByText("Mon")).toBeTruthy();
    expect(screen.getByText("Tue")).toBeTruthy();
  });
});
