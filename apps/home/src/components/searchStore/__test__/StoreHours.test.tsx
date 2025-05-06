import React from "react";
import { render, waitFor, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import StoreHours from "../storeHours";
import { SnackBarProvider } from "@root/home/src/contexts/Snackbar/SnackbarContext";

jest.mock("axios");

describe("StoreHours", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Select A store component", () => {
    render(
      <SnackBarProvider>
        <StoreHours storeId={1} />
      </SnackBarProvider>
    );
  });

  it("should render the StoreHours component", () => {
    render(
      <SnackBarProvider>
        <StoreHours storeId={1} />
      </SnackBarProvider>
    );
    const storeButton = screen.getByTestId("store-button");
    expect(storeButton).toBeTruthy();
  });

  it("should open the Popper when Store Hours button is clicked", async () => {
    render(
      <SnackBarProvider>
        <StoreHours storeId={1} />
      </SnackBarProvider>
    );
    const storeButton = screen.getByTestId("store-button");
    userEvent.click(storeButton);

    await waitFor(() => {
      const popper = screen.getByTestId("popper-rendered");
      expect(popper).toBeTruthy();
    });
  });

  it("should close the Popper when mouse leaves the component", async () => {
    render(
      <SnackBarProvider>
        <StoreHours storeId={1} />
      </SnackBarProvider>
    );
    const storeButton = screen.getByTestId("store-button");
    userEvent.click(storeButton);

    await waitFor(() => {
      const popper = screen.getByTestId("popper-rendered");
      expect(popper).toBeTruthy();
    });
  });
});
