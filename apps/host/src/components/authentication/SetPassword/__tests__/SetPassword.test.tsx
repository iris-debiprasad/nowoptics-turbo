import React from "react";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { SetPasswordPropsDTO } from "@root/host/src/types/auth.type";
import "@testing-library/jest-dom";
import axios from "axios";
import SetPassword from "../SetPassword";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

describe("testing ", () => {
  const props: SetPasswordPropsDTO = {
    formHead: "",
    isPassValidated: false,
    setIsPassValidated: jest.fn(),
    patientId: 0,
  };

  it("calls setIsPassValidated when API call succeeds", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {},
    });
    const { getByRole, getByTestId } = render(<SetPassword {...props} />);

    const newPasswordField = getByTestId("new-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(newPasswordField, { target: { value: "Test@1234" } });

    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "Test@1234" } });

    const submitButton = getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(props.setIsPassValidated).toHaveBeenCalled();
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
        <SetPassword {...props} />
      </SnackBarProvider>
    );

    const newPasswordField = getByTestId("new-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(newPasswordField, { target: { value: "Test@1234" } });

    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "Test@1234" } });

    const submitButton = getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("status code 400 without description", async () => {
    mockedAxios.post.mockRejectedValue({});

    const { getByRole, getByTestId } = render(
      <SnackBarProvider>
        <SetPassword {...props} />
      </SnackBarProvider>
    );

    const newPasswordField = getByTestId("new-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(newPasswordField, { target: { value: "Test@1234" } });

    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "Test@1234" } });

    const submitButton = getByRole("button", { name: "Submit" });
    fireEvent.click(submitButton);

    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("renders the component correctly", () => {
    render(<SetPassword {...props} />);
  });

  //TODO - add handle click test case to change state
  it("handles the click  correctly", () => {
    const { getByTestId } = render(<SetPassword {...props} />);
    const iconButton = getByTestId("toggle-icon");
    fireEvent.click(iconButton);
  });

  it("handles the confirm icon click correctly", () => {
    const { getByTestId } = render(<SetPassword {...props} />);
    const iconButton = getByTestId("toggleConfirm-click");
    fireEvent.click(iconButton);
  });

  it("checks the handle change event 1", async () => {
    const { getByTestId } = render(<SetPassword {...props} />);
    const newPasswordField = getByTestId("new-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(newPasswordField, { target: { value: "Test@1234" } });
    expect(newPasswordField.value).toBe("Test@1234");
    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "Test@1234" } });
    expect(confirmPasswordField.value).toBe("Test@1234");
  });

  it("checks the handle change event 2", async () => {
    const { getByTestId } = render(<SetPassword {...props} />);
    const newPasswordField = getByTestId("new-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(newPasswordField, { target: { value: "123456a" } });
    expect(newPasswordField.value).toBe("123456a");
    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "1234564a" } });
    expect(confirmPasswordField.value).toBe("1234564a");
  });

  it("checks the handle change event 3", async () => {
    const { getByTestId } = render(<SetPassword {...props} />);
    const newPasswordField = getByTestId("new-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(newPasswordField, { target: { value: "abc" } });
    expect(newPasswordField.value).toBe("abc");
    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "abc" } });
    expect(confirmPasswordField.value).toBe("abc");
  });

  it("checks the handle change event 4", async () => {
    const { getByTestId } = render(<SetPassword {...props} />);
    const newPasswordField = getByTestId("new-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(newPasswordField, { target: { value: "123 456" } });
    expect(newPasswordField.value).toBe("123 456");
    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "123 4564" } });
    expect(confirmPasswordField.value).toBe("123 4564");
  });

  it("calls handleSubmit with mobile number when form is submitted", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {},
    });
    const { getByTestId } = render(
      <SnackBarProvider>
        <SetPassword {...props} />
      </SnackBarProvider>
    );
    const passwordField = (await getByTestId("new-password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "Test@1234" } });
    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "Test@1234" } });
    fireEvent.submit(screen.getByTestId("form"));
    waitFor(() => {
      expect(passwordField.value).toBeInTheDocument();
      expect(confirmPasswordField.value).toBeInTheDocument();
    });
  });

  it("calls handleSubmit with mobile number when form is submitted", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {},
    });
    const { getByTestId } = render(
      <SnackBarProvider>
        <SetPassword {...props} />
      </SnackBarProvider>
    );
    const passwordField = (await getByTestId("new-password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "Test1234" } });
    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "Test@1234" } });
    fireEvent.submit(screen.getByTestId("form"));
    waitFor(() => {
      expect(passwordField.value).toBeInTheDocument();
      expect(confirmPasswordField.value).toBeInTheDocument();
    });
  });

  it("checks password value ", async () => {
    const { getByTestId } = render(<SetPassword {...props} />);
    const passwordField = (await getByTestId("new-password").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(passwordField, { target: { value: "" } });
    const confirmPasswordField = getByTestId("confirm-password").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.change(confirmPasswordField, { target: { value: "" } });
    fireEvent.submit(screen.getByTestId("form"));
    waitFor(() => expect(passwordField.value).toBeInTheDocument());
  });
});
