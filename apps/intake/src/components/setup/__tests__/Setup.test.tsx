import { GetIntakeFormMock } from "@/mocks/intake.mock";
import * as intakeApi from "@root/host/src/store/reducer/intakeApi.slice";
import {
  mockCatchError,
  mockError,
  mockStore,
  mockSuccess,
  renderWithProviders,
} from "@/utils/jest.utils";
import { store } from "@root/host/src/store/store";
import { fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Setup from "..";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";

const mockGetIntakeForm = jest.spyOn(intakeApi, "useGetIntakeFormQuery");
const mockSaveFormAsDraft = jest.spyOn(
  intakeApi,
  "useSaveTemplateAsDraftMutation"
);

mockGetIntakeForm.mockImplementation(() => {
  return {
    data: GetIntakeFormMock,
    refetch: jest.fn(),
  };
});

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
    query: "",
    asPath: "/",
  }),
}));

describe("Setup component suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("Tests the add step button", async () => {
    const store2 = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST, true),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store2}>
        <Setup />
      </Provider>
    );

    const addStepButton = getByTestId("add-step-button");
    fireEvent.click(addStepButton);
  });

  test("Form name input", () => {
    const { container } = renderWithProviders(
      <Provider store={store}>
        <Setup />
      </Provider>
    );

    const formNameInput = container.querySelector(
      "#form-name-input"
    ) as HTMLInputElement;
    fireEvent.change(formNameInput, { target: { value: "Test Form" } });
    expect(formNameInput.value).toBe("Test Form");
  });

  test("Form language input", () => {
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <Setup />
      </Provider>
    );

    const formNameInput = getByTestId("select-input") as HTMLInputElement;
    fireEvent.change(formNameInput, { target: { value: 1 } });
    expect(formNameInput.value).toBe("12");
  });

  test("Test sections", () => {
    mockSaveFormAsDraft.mockImplementation(() => {
      return [mockSuccess] as unknown as ReturnType<
        (typeof intakeApi)["useSaveTemplateAsDraftMutation"]
      >;
    });

    const store2 = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST, true),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store2}>
        <Setup />
      </Provider>
    );

    const saveBtn = getByTestId("save-button") as HTMLButtonElement;
    fireEvent.click(saveBtn);
  });

  test("Test sections", () => {
    mockSaveFormAsDraft.mockImplementation(() => {
      return [mockError] as unknown as ReturnType<
        (typeof intakeApi)["useSaveTemplateAsDraftMutation"]
      >;
    });

    const store2 = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST),
    });
    renderWithProviders(
      <Provider store={store2}>
        <Setup />
      </Provider>
    );
  });

  test("Test sections with catch error", () => {
    mockSaveFormAsDraft.mockImplementation(() => {
      return [mockCatchError] as unknown as ReturnType<
        (typeof intakeApi)["useSaveTemplateAsDraftMutation"]
      >;
    });

    const store2 = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST, true),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store2}>
        <Setup />
      </Provider>
    );

    const saveBtn = getByTestId("save-button") as HTMLButtonElement;
    fireEvent.click(saveBtn);
  });
});
