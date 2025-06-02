import { fireEvent, render, waitFor } from "@testing-library/react";
import ForgotPasswordPage from "../ForgotPasswordPage";
import axios from "axios";
import React from "react";
import "@testing-library/jest-dom";
import { useRouter } from "next/router";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("Input", () => {
  it("renders a Input when no error", () => {
    render(<ForgotPasswordPage />);
  });

  it("renders all different Component Otp, Set Password, Success", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        Result: {
          patientId: "15",
        },
      },
    });

    const { getByRole, getByTestId, rerender } = render(<ForgotPasswordPage />);
    const input = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "9809876543" } });
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
          expect(successComp).toBeInTheDocument();
        });
      });
    });
  });
});
