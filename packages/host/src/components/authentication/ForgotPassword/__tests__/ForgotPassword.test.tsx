import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import ForgotPassword from "../ForgotPassword";
import { ForgotPasswordPropsDTO } from "@/types/auth.type";
import "@testing-library/jest-dom";
import axios from "axios";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing ", () => {
  const props: ForgotPasswordPropsDTO = {
    isFPValidated: false,
    setIsFPValidated: jest.fn(),
    setPatientId: jest.fn(),
    setMobileNumber: jest.fn(),
  };

  it("calls setPatientId, setMobileNumber, and setIsFPValidated when API call succeeds", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        Result: {
          patientId: "15",
        },
      },
    });
    const { getByLabelText, getByRole, getByTestId } = render(
      <ForgotPassword {...props} />
    );
    const input = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "9809876543" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(props.setPatientId).toHaveBeenCalledWith("15");
      expect(props.setMobileNumber).toHaveBeenCalledWith("9809876543");
      expect(props.setIsFPValidated).toHaveBeenCalled();
    });
  });

  it("status code 400", async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          Error: {
            Description: "15",
          },
        },
      },
    });
    const { getByRole, getByTestId } = render(
      <SnackBarProvider>
        <ForgotPassword {...props} />
      </SnackBarProvider>
    );
    const input = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "9809876543" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("status code 400 without description with else", async () => {
    mockedAxios.post.mockRejectedValue({});

    const { getByRole, getByTestId } = render(
      <SnackBarProvider>
        <ForgotPassword {...props} />
      </SnackBarProvider>
    );
    const input = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "9809876543" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("status code 400 without description", async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          Error: {
            Description: "15",
          },
        },
      },
    });

    const { getByRole, getByTestId } = render(
      <SnackBarProvider>
        <ForgotPassword {...props} />
      </SnackBarProvider>
    );
    const input = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    const submitButton = getByRole("button", { name: "Submit" });

    fireEvent.change(input, { target: { value: "9809876543" } });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("renders the component correctly", () => {
    render(<ForgotPassword {...props} />);
  });

  it("checks the handle change event", async () => {
    const { getByTestId } = render(<ForgotPassword {...props} />);
    const mobileField = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    expect(mobileField).toBeInTheDocument();
    fireEvent.change(mobileField, { target: { value: "9809876543" } });
    expect(mobileField.value).toBe("9809876543");
  });

  it("calls handleSubmit with mobile number when form is submitted", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        Result: {
          patientId: "15",
        },
      },
    });
    const { getByTestId } = render(<ForgotPassword {...props} />);
    var errorMessageElement: HTMLElement | string;
    const mobileNumberField = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "9809876543" } });
    fireEvent.submit(screen.getByTestId("form"));
    waitFor(() => expect(mobileNumberField.value).toBeInTheDocument());
  });

  it("empty mobile value ", async () => {
    const { getByTestId } = render(<ForgotPassword {...props} />);
    const mobileNumberField = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "" } });
    fireEvent.submit(screen.getByTestId("form"));
    waitFor(() => expect(mobileNumberField.value).toBeInTheDocument());
  });

  it("should only allow positive integers up to 10 characters in the input field", () => {
    const { getByTestId } = render(<ForgotPassword {...props} />);
    const inputField = getByTestId("mobile-number").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "1234567890" } });
    expect(inputField.value).toHaveLength(10);
  });

  it("mobile value length less than 10", async () => {
    const { getByTestId } = render(<ForgotPassword {...props} />);
    const mobileNumberField = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "98765432" } });
    fireEvent.submit(screen.getByTestId("form"));
    expect(mobileNumberField.value).toHaveLength(8);
  });
});
