import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { GetPublicStoreLocatorGrid } from "../../../service/storeLocator.service";
import StoreList from "../StoreList";
import "@testing-library/jest-dom";
import { SnackBarProvider } from "@root/home/src/contexts/Snackbar/SnackbarContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("../../../../../host/src/utils/getSessionData.ts", () => ({
  getDetails: jest.fn(() =>
    Promise.resolve({ authData: { userType: "Patient" } })
  ),
}));

jest.mock("../../../service/storeLocator.service.ts", () => ({
  GetPublicStoreLocatorGrid: jest.fn().mockResolvedValue({
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

jest.mock("../../../../../host/src/utils/calculateDistance.ts", () => ({
  calculateDistance: jest.fn().mockReturnValue(5),
}));

describe("StoreList", () => {
  test("displays store information", async () => {
    render(
      <SnackBarProvider>
        <StoreList />
      </SnackBarProvider>
    );

    // Wait for the API call to resolve and the component to update
    await waitFor(() => expect(GetPublicStoreLocatorGrid).toHaveBeenCalled());

    // Assert that the store information is displayed correctly
    expect(screen.getByText("Store 1")).toBeTruthy();
    expect(screen.getByText("Store 2")).toBeTruthy();
  });

  test("header", async () => {
    render(
      <SnackBarProvider>
        <StoreList />
      </SnackBarProvider>
    );
    expect(screen.getByTestId("header")).toBeTruthy();
  });
  test("Left side stores", async () => {
    render(
      <SnackBarProvider>
        <StoreList />
      </SnackBarProvider>
    );
    expect(screen.getByTestId("left-side-wrapper")).toBeTruthy();
  });
  test("executes getStoreGridData on lookup button click", () => {
    // Mock the getStoreGridData function
    const mockGetStoreGridData = jest.fn();
    jest.mock("@/service/storeLocator.service", () => ({
      GetPublicStoreLocatorGrid: jest.fn(() => ({
        then: () => ({
          catch: () => {},
        }),
      })),
      GetAuthenticatedStoreLocatorGrid: jest.fn(() => ({
        then: () => ({
          catch: () => {},
        }),
      })),
    }));
    jest.mock("@root/host/src/utils/getUserType", () => ({
      getUserType: jest.fn(() => "someUserType"),
    }));

    const { getByTestId } = render(
      <SnackBarProvider>
        <StoreList />
      </SnackBarProvider>
    );
    const lookupButton = getByTestId("lookup");

    fireEvent.click(lookupButton);
  });
});
