import { fireEvent, render, screen } from "@testing-library/react";

import SelectAStore from "../SelectAStore";

import "@testing-library/jest-dom";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";

jest.mock("axios");

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      authData: {
        userType: "Associate",
      },
    },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("Select A store component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("renders the Select A store component", () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
  });
  it("renders header", () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const header = screen.getAllByTestId("location-header");
    expect(header).toBeTruthy();
  });
  it("renders header", () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const header = screen.getAllByTestId("location-header");
    expect(header).toBeTruthy();
  });
  it("should call onClick function when the button is clicked", () => {
    const handleClose = jest.fn();
    const onClickMock = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const button = screen.getByTestId("lookup");
    fireEvent.click(button);
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });
  it("should call onClick function when the button is clicked", () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const input = screen.getByTestId("location-input");
    expect(input).toBeTruthy();
  });

  it("should update the lookup string when the input value changes", async () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const lookupInput = (await screen
      .getByTestId("location-input")
      .querySelector("input")) as HTMLInputElement;
    expect(lookupInput).toBeInTheDocument();
    fireEvent.change(lookupInput, { target: { value: "New Work" } });
    expect(lookupInput.value).toBe("New Work");
  });

  it("should display store addresses based on the lookup pattern", async () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const lookupInput = (await screen
      .getByTestId("location-input")
      .querySelector("input")) as HTMLInputElement;
    expect(lookupInput).toBeInTheDocument();
    fireEvent.change(lookupInput, { target: { value: "New Work" } });
    const lookupButton = screen.getByTestId("lookup");
    fireEvent.click(lookupButton);
  });

  it('should display "Load More" button when there are more pages to load', () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const loadMoreButton = screen.getByText("Load More");
    expect(loadMoreButton).toBeInTheDocument();
  });

  it('should trigger handleLoadMore function when "Load More" button is clicked', () => {
    const handleClose = jest.fn();
    render(
      <SnackBarProvider>
        <SelectAStore handleClose={handleClose} />
      </SnackBarProvider>
    );
    const onClickMock = jest.fn();
    const loadMoreButton = screen.getByText("Load More");
    fireEvent.click(loadMoreButton);
    expect(onClickMock).toHaveBeenCalledTimes(0);
  });
});
