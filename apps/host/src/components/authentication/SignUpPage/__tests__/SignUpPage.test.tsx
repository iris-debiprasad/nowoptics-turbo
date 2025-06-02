import { render, fireEvent, waitFor } from "@testing-library/react";
import SignUpPage from "../SignUpPage";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import axios from "axios";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router");
const mockRouter = {
  query: { page: "1", storeId: "1", custph: "9876543210" },
};

//@ts-ignore
useRouter.mockImplementation(() => ({
  query: { page: "1", storeId: "1", custph: "9876543210" },
}));

describe("", () => {
  it("renders the component", () => {
    render(<SignUpPage />);
  });

  it("renders all different Component Otp, Set Password, Success", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        Result: {
          patientId: "15",
        },
      },
    });

    const { getByRole, getByTestId, rerender, getByLabelText } = render(
      <SnackBarProvider>
        <SignUpPage />
      </SnackBarProvider>
    );
    const firstName = (await getByTestId("first-name").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: "john" } });
    const lastName = (await getByTestId("last-name").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(lastName, { target: { value: "doe" } });
    // TODO -- ISD code input box may be added in future
    // const countryCode = await getByTestId("country-code").querySelector('input') as HTMLInputElement;
    // fireEvent.change(countryCode, { target: { value: "91" } });
    const mobileNumber = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(mobileNumber, { target: { value: "9876543210" } });
    const email = (await getByTestId("email").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(email, { target: { value: "john.doe@gmail.com" } });
    const maleLabel = getByLabelText("Male");
    fireEvent.click(maleLabel);

    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, {
      target: { value: "02/01/2023" },
    });
    const zipcode = (await getByTestId("zipcode").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(zipcode, { target: { value: "12300" } });

    const submitButton = getByRole("button", { name: "Create Account" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const otpComp = getByTestId("otp-comp");
      expect(otpComp).toBeTruthy();

      mockedAxios.post.mockResolvedValue({
        data: {},
      });
      const otpField1 = getByTestId("otp-input-1").querySelector(
        "input"
      ) as HTMLInputElement;
      fireEvent.change(otpField1, { target: { value: "1" } });
      const otpField2 = getByTestId("otp-input-2").querySelector(
        "input"
      ) as HTMLInputElement;
      fireEvent.change(otpField2, { target: { value: "2" } });
      const otpField3 = getByTestId("otp-input-3").querySelector(
        "input"
      ) as HTMLInputElement;
      fireEvent.change(otpField3, { target: { value: "3" } });
      const otpField4 = getByTestId("otp-input-4").querySelector(
        "input"
      ) as HTMLInputElement;
      fireEvent.change(otpField4, { target: { value: "4" } });
      const otpField5 = getByTestId("otp-input-5").querySelector(
        "input"
      ) as HTMLInputElement;
      fireEvent.change(otpField5, { target: { value: "5" } });
      const otpField6 = getByTestId("otp-input-6").querySelector(
        "input"
      ) as HTMLInputElement;
      fireEvent.change(otpField6, { target: { value: "6" } });
      const submitButton = getByRole("button", { name: "Verify" });

      fireEvent.click(submitButton);

      waitFor(() => {
        const setPasswordComp = getByTestId("setPassword-comp");
        expect(setPasswordComp).toBeTruthy();

        mockedAxios.post.mockResolvedValue({
          data: {},
        });

        const newPasswordField = getByTestId("new-password").querySelector(
          "input"
        ) as HTMLInputElement;
        fireEvent.change(newPasswordField, { target: { value: "Test@1234" } });
        const confirmPasswordField = getByTestId(
          "confirm-password"
        ).querySelector("input") as HTMLInputElement;
        fireEvent.change(confirmPasswordField, {
          target: { value: "Test@1234" },
        });

        const submitButton = getByRole("button", { name: "Submit" });
        fireEvent.click(submitButton);

        waitFor(() => {
          const successComp = getByTestId("success-comp");
          expect(successComp).toBeTruthy();
        });
      });
    });
  });
});
