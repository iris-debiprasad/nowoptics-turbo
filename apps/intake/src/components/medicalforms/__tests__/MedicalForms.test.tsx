import { fireEvent, render, screen } from "@testing-library/react";
import Medicalforms from "..";
import { Provider } from "react-redux";
import { store } from "@root/host/src/store/store";
import * as intakeApi from "../@root/host/src/store/reducer/intakeApi.slice";
import { MedicalFormsResponseMock } from "@/mocks/intake.mock";
import {
  mockCatchError,
  mockError,
  mockSuccess,
  renderWithProviders,
} from "@/utils/jest.utils";

const mockgetAllForms = jest.spyOn(intakeApi, "useGetAllMedicalFormsQuery");
const mockCopyIntakeForm = jest.spyOn(intakeApi, "useCopyIntakeFormMutation");
const mockPublishIntakeForm = jest.spyOn(
  intakeApi,
  "usePublishIntakeFormMutation"
);

jest.mock("next/router", () => ({
  useRouter: () => {
    return {
      replace: jest.fn(),
      push: jest.fn(),
    };
  },
}));

describe("MedicalForms test suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    render(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );
    const routeChangeBtn = screen.getByLabelText(
      "route-change-btn"
    ) as HTMLAnchorElement;
    fireEvent.click(routeChangeBtn);
  });

  it("should render availibility modal", () => {
    mockgetAllForms.mockImplementation(() => {
      return {
        data: MedicalFormsResponseMock,
        refetch: jest.fn(),
      };
    });

    render(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );
    const modalBtn = screen.getAllByTestId(
      "availibility-modal-btn"
    )[0] as HTMLButtonElement;
    fireEvent.click(modalBtn);
  });

  it("should sort Id column", () => {
    render(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );
    const sortBtn = screen.getByTestId("sort-click-Id") as HTMLButtonElement;
    fireEvent.click(sortBtn);
    fireEvent.click(sortBtn);
    fireEvent.click(sortBtn);
  });

  it("copy the intake form with success", () => {
    mockCopyIntakeForm.mockImplementation(() => {
      return [mockSuccess] as unknown as ReturnType<
        typeof intakeApi.useCopyIntakeFormMutation
      >;
    });
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const copyButton = screen.getByTestId(
      "copy-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(copyButton);
    const codeInput = screen
      .getAllByTestId("textbox")
      .at(-1) as HTMLInputElement;
    fireEvent.change(codeInput, { target: { value: "123456" } });
    const confirmButton = screen.getByTestId(
      "confirm-button"
    ) as HTMLButtonElement;
    fireEvent.click(confirmButton);
  });

  it("copy the intake form with error", () => {
    mockCopyIntakeForm.mockImplementation(() => {
      return [mockError] as unknown as ReturnType<
        typeof intakeApi.useCopyIntakeFormMutation
      >;
    });
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const copyButton = screen.getByTestId(
      "copy-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(copyButton);
    const codeInput = screen
      .getAllByTestId("textbox")
      .at(-1) as HTMLInputElement;
    fireEvent.change(codeInput, { target: { value: "123456" } });
    const confirmButton = screen.getByTestId(
      "confirm-button"
    ) as HTMLButtonElement;
    fireEvent.click(confirmButton);
  });

  it("closes the copy dialog", () => {
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const copyButton = screen.getByTestId(
      "copy-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(copyButton);
    const closeButton = screen.getByTestId("close-button") as HTMLButtonElement;
    fireEvent.click(closeButton);
  });

  it("publishes the intake form with success", () => {
    mockPublishIntakeForm.mockImplementation(() => {
      return [mockSuccess] as unknown as ReturnType<
        typeof intakeApi.usePublishIntakeFormMutation
      >;
    });
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const publishButton = screen.getByTestId(
      "publish-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(publishButton);
    const confirmButton = screen.getByTestId(
      "confirm-button"
    ) as HTMLButtonElement;
    fireEvent.click(confirmButton);
  });

  it("publishes the intake form with catch error", () => {
    mockPublishIntakeForm.mockImplementation(() => {
      return [mockCatchError] as unknown as ReturnType<
        typeof intakeApi.usePublishIntakeFormMutation
      >;
    });
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const publishButton = screen.getByTestId(
      "publish-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(publishButton);
    const confirmButton = screen.getByTestId(
      "confirm-button"
    ) as HTMLButtonElement;
    fireEvent.click(confirmButton);
  });

  it("publishes the intake form with error", () => {
    mockPublishIntakeForm.mockImplementation(() => {
      return [mockError] as unknown as ReturnType<
        typeof intakeApi.usePublishIntakeFormMutation
      >;
    });
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const publishButton = screen.getByTestId(
      "publish-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(publishButton);
    const confirmButton = screen.getByTestId(
      "confirm-button"
    ) as HTMLButtonElement;
    fireEvent.click(confirmButton);
  });

  it("closes the publish dialog", () => {
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const publishButton = screen.getByTestId(
      "publish-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(publishButton);
    const cancelButton = screen.getByTestId(
      "cancel-button"
    ) as HTMLButtonElement;
    fireEvent.click(cancelButton);
  });

  it("navigates the user to edit the intake form", () => {
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const editButton = screen.getByTestId(
      "edit-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(editButton);
  });

  it("navigates the user to view the intake form", () => {
    renderWithProviders(
      <Provider store={store}>
        <Medicalforms />
      </Provider>
    );

    const editButton = screen.getByTestId(
      "view-icon-button"
    ) as HTMLButtonElement;
    fireEvent.click(editButton);
  });
});
