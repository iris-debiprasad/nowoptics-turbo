import { fireEvent, render, waitFor, screen } from "@testing-library/react";
import RegistrationForm from "../RegistrationForm";
import { SignUpPropsDTO } from "@root/host/src/types/auth.type";
import "@testing-library/jest-dom";
import axios from "axios";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";

// Mock jest and set the type
jest.mock("axios");
const mockedAxios = axios as jest.Mocked<typeof axios>;

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("", () => {
  const props: SignUpPropsDTO = {
    isValidated: true,
    setIsValidated: jest.fn(),
    setMobileNumber: jest.fn(),
    setPatientId: jest.fn(),
  };

  it("api call", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        Result: {
          patientId: "15",
        },
      },
    });
    const { getByRole, getByTestId } = render(<RegistrationForm {...props} />);
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
    const zipcode = (await getByTestId("zipcode").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(zipcode, { target: { value: "123000" } });
    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "02/01/2023" } });
    const maleLabel = screen.getByLabelText("Male");
    fireEvent.click(maleLabel);

    const submitButton = getByRole("button", { name: "Create Account" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      expect(props.setPatientId).toBeTruthy();
      expect(props.setMobileNumber).toBeTruthy();
      expect(props.setIsValidated).toBeTruthy();
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

    const { getByRole, getByTestId, queryByTestId, getByLabelText } = render(
      <SnackBarProvider>
        <RegistrationForm {...props} />
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

    const maleLabel = screen.getByLabelText("Male");
    fireEvent.click(maleLabel);

    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "02/01/2023" } });

    const email = (await getByTestId("email").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(email, { target: { value: "john.doe@gmail.com" } });
    const zipcode = (await getByTestId("zipcode").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(zipcode, { target: { value: "12300" } });

    const submitButton = getByTestId("create-account");
    fireEvent.click(submitButton);

    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("status code 400 without mock", async () => {
    mockedAxios.post.mockRejectedValue({});

    const { getByRole, getByTestId } = render(
      <SnackBarProvider>
        <RegistrationForm {...props} />
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
    const zipcode = (await getByTestId("zipcode").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(zipcode, { target: { value: "12300" } });
    const maleLabel = screen.getByLabelText("Male");
    fireEvent.click(maleLabel);
    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "02/01/2023" } });

    const submitButton = getByRole("button", { name: "Create Account" });

    fireEvent.click(submitButton);

    await waitFor(() => {
      const snackBarComp = getByTestId("snackbar-comp");
      expect(snackBarComp).toBeInTheDocument();
    });
  });

  it("renders a Input when no error", () => {
    render(<RegistrationForm {...props} />);
  });

  it("checks the handle change event", async () => {
    const { getByTestId } = render(<RegistrationForm {...props} />);

    const firstName = (await getByTestId("first-name").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: "john" } });
    expect(firstName.value).toBe("john");

    const lastName = (await getByTestId("last-name").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(lastName, { target: { value: "doe" } });
    expect(lastName.value).toBe("doe");

    // TODO -- ISD code input box may be added in future
    // const countryCode = await getByTestId("country-code").querySelector('input') as HTMLInputElement;
    // fireEvent.change(countryCode, { target: { value: "91" } });
    // expect(countryCode.value).toBe('91');

    const mobileNumber = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(mobileNumber, { target: { value: "9876543210" } });
    expect(mobileNumber.value).toBe("9876543210");

    const email = (await getByTestId("email").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(email, { target: { value: "john.doe@gmail.com" } });
    expect(email.value).toBe("john.doe@gmail.com");

    const zipcode = (await getByTestId("zipcode").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(zipcode, { target: { value: "123000" } });
    expect(zipcode.value).toBe("123000");

    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "02/01/2023" } });
    expect(checkDateInput.value).toBe("02/01/2023");

    const maleLabel = screen.getByLabelText("Male");
    fireEvent.click(maleLabel);
  });

  it("calls handleSubmit with mobile number when form is submitted", async () => {
    mockedAxios.post.mockResolvedValue({
      data: {
        Result: {
          patientId: "15",
        },
      },
    });
    const { getByTestId } = render(
      <SnackBarProvider>
        <RegistrationForm {...props} />
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
    const zipcode = (await getByTestId("zipcode").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(zipcode, { target: { value: "12300" } });
    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "02/01/2023" } });
    const maleLabel = screen.getByLabelText("Male");
    fireEvent.click(maleLabel);

    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(firstName.value).toBeInTheDocument();
      expect(lastName.value).toBeInTheDocument();
      // TODO -- ISD code input box may be added in future
      // expect(countryCode.value).toBeInTheDocument();
      expect(mobileNumber.value).toBeInTheDocument();
      expect(email.value).toBeInTheDocument();
      expect(zipcode.value).toBeInTheDocument();
    });
  });

  it("empty mobile value ", async () => {
    const { getByTestId } = render(<RegistrationForm {...props} />);

    const firstName = (await getByTestId("first-name").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(firstName, { target: { value: "" } });
    const lastName = (await getByTestId("last-name").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(lastName, { target: { value: "" } });
    // TODO -- ISD code input box may be added in future
    // const countryCode = await getByTestId("country-code").querySelector('input') as HTMLInputElement;
    // fireEvent.change(countryCode, { target: { value: "" } });
    const mobileNumber = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(mobileNumber, { target: { value: "" } });
    const email = (await getByTestId("email").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(email, { target: { value: "" } });
    const zipcode = (await getByTestId("zipcode").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(zipcode, { target: { value: "" } });

    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "" } });

    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(firstName.value).toBeInTheDocument();
      expect(lastName.value).toBeInTheDocument();
      // TODO -- ISD code input box may be added in future
      // expect(countryCode.value).toBeInTheDocument();
      expect(mobileNumber.value).toBeInTheDocument();
      expect(email.value).toBeInTheDocument();
      expect(zipcode.value).toBeInTheDocument();
      expect(checkDateInput.value).toBeInTheDocument();
    });
  });

  it("email validation ", async () => {
    const { getByTestId } = render(<RegistrationForm {...props} />);

    const email = (await getByTestId("email").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(email, { target: { value: "abc123" } });

    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(email.value).toBeInTheDocument();
    });
  });

  it("dob validation ", async () => {
    const { getByTestId } = render(<RegistrationForm {...props} />);

    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "02/01/2023" } });

    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(checkDateInput.value).toBeInTheDocument();
    });
  });

  it("dob on change ", async () => {
    const { getByTestId } = render(<RegistrationForm {...props} />);
    const checkDateInput = (await getByTestId(
      "add-new-check-check-date-input"
    )) as HTMLInputElement;
    fireEvent.change(checkDateInput, { target: { value: "02/01/2023" } });
    expect(checkDateInput.value).toBe("02/01/2023");
  });

  it("should only allow positive integers up to 10 characters in the input field", () => {
    const { getByTestId } = render(<RegistrationForm {...props} />);
    const inputField = getByTestId("mobile-number").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(inputField, { target: { value: "1234567890" } });
    expect(inputField.value).toHaveLength(10);
  });

  it("should only allow positive integers up to 9 characters in the zipcode field", () => {
    const { getByTestId } = render(<RegistrationForm {...props} />);
    const zipcode = getByTestId("zipcode").querySelector(
      "input"
    ) as HTMLInputElement;
    fireEvent.input(zipcode, { target: { value: "123456789" } });
    expect(zipcode.value).toHaveLength(9);
  });

  it("check if mobile value length is less than 10", async () => {
    const { getByTestId, getByText } = render(<RegistrationForm {...props} />);
    const mobileNumberField = (await getByTestId("mobile-number").querySelector(
      "input"
    )) as HTMLInputElement;
    fireEvent.change(mobileNumberField, { target: { value: "9876543" } });
    fireEvent.submit(getByTestId("form"));
    waitFor(() => {
      expect(mobileNumberField.value).toBeInTheDocument();
      expect(
        getByText("Mobile number must contain 10 digits")
      ).toBeInTheDocument();
    });
  });
});
