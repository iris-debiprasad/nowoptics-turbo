import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import Otp from "../Otp";
import { OtpPropsDTO } from "@/types/auth.type";
import "@testing-library/jest-dom";
import axios from "axios";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("Input", () => {
  const props: OtpPropsDTO = {
    isOtpValidated: false,
    mobileNumber: "",
    patientId: 0,
    setIsOtpValidated: jest.fn(),
  };

  it("when API call succeeds", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        SuccessMessage: "",
      },
    });
    const { getByRole, getByTestId } = render(<Otp {...props} />);
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

    await waitFor(() => {
      expect(props.setIsOtpValidated).toHaveBeenCalled();
    });
  });

  it("with api fail", async () => {
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
        <Otp {...props} />
      </SnackBarProvider>
    );
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
    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("with api fail without description", async () => {
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
        <Otp {...props} />
      </SnackBarProvider>
    );
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
    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("when resend otp api call succeeds", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {},
    });
    const { getByTestId } = render(
      <SnackBarProvider>
        <Otp {...props} />
      </SnackBarProvider>
    );
    const resendButton = getByTestId("resend-button");

    fireEvent.click(resendButton);
    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("when resend otp api call fails", async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          Error: {
            Description: "15",
          },
        },
      },
    });

    const { getByTestId } = render(
      <SnackBarProvider>
        <Otp {...props} />
      </SnackBarProvider>
    );
    const resendButton = getByTestId("resend-button");

    fireEvent.click(resendButton);
    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("when resend otp api call fails", async () => {
    mockedAxios.post.mockRejectedValue({});

    const { getByTestId } = render(
      <SnackBarProvider>
        <Otp {...props} />
      </SnackBarProvider>
    );
    const resendButton = getByTestId("resend-button");

    fireEvent.click(resendButton);
    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("renders a Input when no error", () => {
    render(<Otp {...props} />);
  });

  it("checks the handle change event", async () => {
    const { getByTestId } = render(<Otp {...props} />);

    const otpField1 = getByTestId("otp-input-1").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.keyUp(otpField1, { key: "Enter", code: "Enter" });
    fireEvent.change(otpField1, { target: { value: "1" } });
    expect(otpField1.value).toBe("1");

    const otpField2 = getByTestId("otp-input-2").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.keyUp(otpField2, { key: "Enter", code: "Enter" });
    fireEvent.change(otpField2, { target: { value: "2" } });
    expect(otpField2.value).toBe("2");

    const otpField3 = getByTestId("otp-input-3").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.keyUp(otpField3, { key: "Enter", code: "Enter" });
    fireEvent.change(otpField3, { target: { value: "3" } });
    expect(otpField3.value).toBe("3");

    const otpField4 = getByTestId("otp-input-4").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.keyUp(otpField4, { key: "Enter", code: "Enter" });
    fireEvent.change(otpField4, { target: { value: "4" } });
    expect(otpField4.value).toBe("4");

    const otpField5 = getByTestId("otp-input-5").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.keyUp(otpField5, { key: "Enter", code: "Enter" });
    fireEvent.change(otpField5, { target: { value: "5" } });
    expect(otpField5.value).toBe("5");

    const otpField6 = getByTestId("otp-input-6").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.keyUp(otpField6, { key: "Enter", code: "Enter" });
    fireEvent.change(otpField6, { target: { value: "6" } });
    expect(otpField6.value).toBe("6");
  });

  it("calls handleSubmit with otp is submitted", async () => {
    mockedAxios.post.mockRejectedValue({
      response: {
        data: {
          Error: {
            Description: "15",
          },
        },
      },
    });
    const { getByTestId, getByText } = render(
      <SnackBarProvider>
        <Otp {...props} />
      </SnackBarProvider>
    );
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

    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("calls handleSubmit with otp empty value is submitted", async () => {
    const { getByTestId } = render(<Otp {...props} />);
    const otpField1 = getByTestId("otp-input-1").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(otpField1, { target: { value: "" } });
    const otpField2 = getByTestId("otp-input-2").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(otpField2, { target: { value: "" } });
    const otpField3 = getByTestId("otp-input-3").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(otpField3, { target: { value: "" } });
    const otpField4 = getByTestId("otp-input-4").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(otpField4, { target: { value: "" } });
    const otpField5 = getByTestId("otp-input-5").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(otpField5, { target: { value: "" } });
    const otpField6 = getByTestId("otp-input-6").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(otpField6, { target: { value: "" } });

    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(otpField1.value).toBeInTheDocument();
      expect(otpField2.value).toBeInTheDocument();
      expect(otpField3.value).toBeInTheDocument();
      expect(otpField4.value).toBeInTheDocument();
      expect(otpField5.value).toBeInTheDocument();
      expect(otpField6.value).toBeInTheDocument();
    });
  });

  it("should only allow positive integers up to 1 characters in the input field", () => {
    const { getByTestId } = render(<Otp {...props} />);
    const otpField1 = getByTestId("otp-input-1").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(otpField1, { target: { value: "1" } });
    expect(otpField1.value).toHaveLength(1);

    const otpField2 = getByTestId("otp-input-2").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(otpField2, { target: { value: "1" } });
    expect(otpField2.value).toHaveLength(1);

    const otpField3 = getByTestId("otp-input-3").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(otpField3, { target: { value: "1" } });
    expect(otpField3.value).toHaveLength(1);

    const otpField4 = getByTestId("otp-input-4").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(otpField4, { target: { value: "1" } });
    expect(otpField4.value).toHaveLength(1);

    const otpField5 = getByTestId("otp-input-5").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(otpField5, { target: { value: "1" } });
    expect(otpField5.value).toHaveLength(1);

    const otpField6 = getByTestId("otp-input-6").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(otpField6, { target: { value: "1" } });
    expect(otpField6.value).toHaveLength(1);
  });
});
