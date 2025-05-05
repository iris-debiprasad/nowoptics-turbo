import {
  mockCatchError,
  mockError,
  mockStore,
  mockSuccess,
  renderWithProviders,
} from "@/utils/jest.utils";
import OTPModal from "..";
import { Provider } from "react-redux";
import { OtpInputMock, OtpInputMockEmail, PatientIntakeFormMock } from "@/mocks/redux.mock";
import { fireEvent } from "@testing-library/react";
import * as intakeApi from "../@root/host/src/store/reducer/intakeApi.slice";
import { UPDATE_OTP_PROPERTY } from "@root/host/src/store/reducer/intake.slice";

const mockResendOtp = jest.spyOn(intakeApi, "useResendPatientOtpMutation");
const mockVerifyOtp = jest.spyOn(intakeApi, "useVerifyPatientOtpMutation");

afterEach(() => {
  jest.clearAllMocks();
});

describe("OTP Modal test suite", () => {
  test("should render correctly", () => {
    const store = mockStore({
      intake: OtpInputMock,
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <OTPModal open={true} activeStep={1} />
      </Provider>
    );

    Array(6)
      .fill(0)
      .forEach((_, i) => {
        const phoneOtpInput = getByTestId(`phone-otp-input-${i + 1}`);
        fireEvent.change(phoneOtpInput, { target: { value: i + 1 } });

        const emailOtpInput = getByTestId(`email-otp-input-${i + 1}`);
        fireEvent.change(emailOtpInput, { target: { value: i + 1 } });
      });

    Array(6)
      .fill(0)
      .forEach((_, i) => {
        const phoneOtpInput = getByTestId(`phone-otp-input-${i + 1}`);
        fireEvent.keyUp(phoneOtpInput, { target: { value: i + 1 } });
        fireEvent.keyUp(phoneOtpInput, { key: "Escape" });
        fireEvent.keyUp(phoneOtpInput, { key: "Tab" });
        fireEvent.keyUp(phoneOtpInput, { key: "Delete" });
        fireEvent.keyUp(phoneOtpInput, { key: "1" });

        const emailOtpInput = getByTestId(`email-otp-input-${i + 1}`);
        fireEvent.keyUp(emailOtpInput, { target: { value: i + 1 } });
        fireEvent.input(emailOtpInput, { target: { value: i + 1 } });
      });


    const resendOtp = getByTestId(`resend-otp`);
    fireEvent.click(resendOtp);

    const verifyBtn = getByTestId(`verify-btn`);
    fireEvent.click(verifyBtn);
  });

  test("should render correctly and verify with success", () => {
    mockVerifyOtp.mockImplementation(() => {
      return [mockSuccess] as unknown as ReturnType<
        (typeof intakeApi)["useVerifyPatientOtpMutation"]
      >;
    });
    const store = mockStore({
      intake: PatientIntakeFormMock(1),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <OTPModal open={true} activeStep={1} />
      </Provider>
    );

    const verifyBtn = getByTestId(`verify-btn`);
    fireEvent.click(verifyBtn);
  });

  test("should render correctly and verify with error", () => {
    mockVerifyOtp.mockImplementation(() => {
      return [mockError] as unknown as ReturnType<
        (typeof intakeApi)["useVerifyPatientOtpMutation"]
      >;
    });
    const store = mockStore({
      intake: PatientIntakeFormMock(1),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <OTPModal open={true} activeStep={1} />
      </Provider>
    );

    const verifyBtn = getByTestId(`verify-btn`);
    fireEvent.click(verifyBtn);
  });

  test("should render correctly and verify with error", () => {
    mockVerifyOtp.mockImplementation(() => {
      return [mockCatchError] as unknown as ReturnType<
        (typeof intakeApi)["useVerifyPatientOtpMutation"]
      >;
    });
    const store = mockStore({
      intake: PatientIntakeFormMock(1),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <OTPModal open={true} activeStep={1} />
      </Provider>
    );

    const verifyBtn = getByTestId(`verify-btn`);
    fireEvent.click(verifyBtn);
  });

  test("should render correctly and resend with success", () => {
    mockResendOtp.mockImplementation(() => {
      return [mockSuccess] as unknown as ReturnType<
        (typeof intakeApi)["useResendPatientOtpMutation"]
      >;
    });
    const store = mockStore({
      intake: PatientIntakeFormMock(1),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <OTPModal open={true} activeStep={1} />
      </Provider>
    );

    const resendBtn = getByTestId(`resend-otp`);
    fireEvent.click(resendBtn);
  });

  test("should render correctly and resend with error", () => {
    mockResendOtp.mockImplementation(() => {
      return [mockError] as unknown as ReturnType<
        (typeof intakeApi)["useResendPatientOtpMutation"]
      >;
    });
    const store = mockStore({
      intake: PatientIntakeFormMock(1),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <OTPModal open={true} activeStep={1} />
      </Provider>
    );

    const resendBtn = getByTestId(`resend-otp`);
    fireEvent.click(resendBtn);
  });

  test("should render correctly and resend with error", () => {
    mockResendOtp.mockImplementation(() => {
      return [mockCatchError] as unknown as ReturnType<
        (typeof intakeApi)["useResendPatientOtpMutation"]
      >;
    });
    const store = mockStore({
      intake: OtpInputMockEmail,
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <OTPModal open={true} activeStep={1} />
      </Provider>
    );

    const resendBtn = getByTestId(`resend-otp`);
    fireEvent.click(resendBtn);
  });
});
