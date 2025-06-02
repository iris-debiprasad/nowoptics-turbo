import { SnackBarProvider } from "@root/intake/src/context/SnackbarContext";
import { render } from "@testing-library/react";
import configureStore from "redux-mock-store";

export function renderWithProviders(ui: React.ReactElement) {
  return render(<SnackBarProvider>{ui}</SnackBarProvider>);
}

export const mockSuccess = jest.fn(() => {
  return {
    unwrap: jest.fn().mockResolvedValue({
      Error: false,
      SuccessMessage: "sdfsdf",
      Result : true
    })
  }
});

export const mockError = jest.fn(() => {
  return {
    unwrap : jest.fn().mockResolvedValue({
      Error : {
        Message : undefined
      }
    })
  }
});

export const mockCatchError = jest.fn(() => {
  return {
    unwrap : jest.fn().mockImplementation(() => {
      throw Error;
    })
  }
})

export const mockStore = configureStore();