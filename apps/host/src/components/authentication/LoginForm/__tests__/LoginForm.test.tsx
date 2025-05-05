import { fireEvent, render, waitFor } from "@testing-library/react";
import LoginForm from "../LoginForm";
import { SignInPropsDTO } from "@/types/auth.type";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";
import axios from "axios";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";

// TODO - need to add this later for handle .then in api call
// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

jest.mock("next/router");
const mockRouter = {
  query: { page: "1", storeId: "1", custph: "9876543210" },
};

//@ts-ignore
useRouter.mockImplementation(() => ({
  query: { page: "1", storeId: "1", custph: "9876543210" },
}));

describe("", () => {
  const props: SignInPropsDTO = {
    formHead: "Log Into Your Account",
    formMessage: "",
    cstmStyles: "",
  };

  // TODO - need to add this later for handle .then in api call
  it("api call", async () => {
    mockedAxios.post.mockResolvedValue({
      ok: {
        StatusCode: 200,
      },
    });
    const { getByTestId } = render(
      <SnackBarProvider>
        <LoginForm {...props} />
      </SnackBarProvider>
    );
    const mobileNumberField = (await getByTestId(
      "mobile-number-login"
    ).querySelector("input")) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "9809876543" } });
    const passwordField = (await getByTestId("password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "1234@Abc" } });
    fireEvent.submit(getByTestId("form"));
    await waitFor(() => {
      const loaderComp = getByTestId("loader-comp");
      expect(loaderComp).toBeInTheDocument();

      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("renders a Input when no error", () => {
    render(<LoginForm {...props} />);
  });

  it("checks the handle change event", async () => {
    const { getByTestId } = render(<LoginForm {...props} />);
    const mobileField = (await getByTestId("mobile-number-login").querySelector(
      "input"
    )) as HTMLInputElement;
    expect(mobileField).toBeInTheDocument();
    fireEvent.change(mobileField, { target: { value: "9809876543" } });
    expect(mobileField.value).toBe("9809876543");

    const passwordField = (await getByTestId("password").querySelector(
      "input"
    )) as HTMLInputElement;
    expect(passwordField).toBeInTheDocument();
    fireEvent.change(passwordField, { target: { value: "1234@Abc" } });
    expect(passwordField.value).toBe("1234@Abc");
  });

  it("calls handleSubmit with mobile number when form is submitted", async () => {
    mockedAxios.post.mockResolvedValue({
      ok: {
        StatusCode: 200,
      },
    });
    const { getByTestId } = render(
      <SnackBarProvider>
        <LoginForm {...props} />
      </SnackBarProvider>
    );
    const mobileNumberField = (await getByTestId(
      "mobile-number-login"
    ).querySelector("input")) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "9809876543" } });
    const passwordField = (await getByTestId("password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "1234@Abc" } });
    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(mobileNumberField.value).toBeInTheDocument();
      expect(passwordField.value).toBeInTheDocument();
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("api fail", async () => {
    mockedAxios.post.mockRejectedValue({
      message: "error",
    });
    const { getByTestId } = render(
      <SnackBarProvider>
        <LoginForm {...props} />
      </SnackBarProvider>
    );
    const mobileNumberField = (await getByTestId(
      "mobile-number-login"
    ).querySelector("input")) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "9809876547" } });
    const passwordField = (await getByTestId("password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "12" } });
    fireEvent.submit(getByTestId("form"));
    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("api fail with no message", async () => {
    mockedAxios.post.mockRejectedValue({});
    const { getByTestId } = render(
      <SnackBarProvider>
        <LoginForm {...props} />
      </SnackBarProvider>
    );
    const mobileNumberField = (await getByTestId(
      "mobile-number-login"
    ).querySelector("input")) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "9809876547" } });
    const passwordField = (await getByTestId("password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "12" } });
    fireEvent.submit(getByTestId("form"));
    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("empty mobile value ", async () => {
    const { getByTestId } = render(<LoginForm {...props} />);
    const mobileNumberField = (await getByTestId(
      "mobile-number-login"
    ).querySelector("input")) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "" } });
    const passwordField = (await getByTestId("password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "" } });
    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(mobileNumberField.value).toBeInTheDocument();
      expect(passwordField.value).toBeInTheDocument();
    });
  });

  it("check if mobile value length is less than 10", async () => {
    const { getByTestId, getByText } = render(<LoginForm {...props} />);
    const mobileNumberField = (await getByTestId(
      "mobile-number-login"
    ).querySelector("input")) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "9876543" } });
    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(mobileNumberField.value).toBeInTheDocument();
      expect(
        getByText("Mobile number must contain 10 digits")
      ).toBeInTheDocument();
    });
  });

  it("should only allow positive integers up to 10 characters in the input field", () => {
    const { getByTestId } = render(<LoginForm {...props} />);
    const inputField = getByTestId("mobile-number-login").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "1234567890" } });
    expect(inputField.value).toHaveLength(10);
  });
});
