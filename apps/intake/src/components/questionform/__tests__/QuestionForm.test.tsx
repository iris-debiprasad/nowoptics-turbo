import { fireEvent, render, screen } from "@testing-library/react";
import QuestionForm from "..";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";
import { Simulate } from "react-dom/test-utils";
import * as intakeApi from "../@root/host/src/store/reducer/intakeApi.slice";
import { GetQuestionTypesMock } from "@/mocks/intake.mock";

const mockGetQuestionTypes = jest.spyOn(intakeApi, "useGetQuestionTypesQuery");
mockGetQuestionTypes.mockImplementation(() => {
  return {
    data: GetQuestionTypesMock,
    refetch: jest.fn(),
  };
});

const mockStore = configureStore();

describe("Question Form component suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });
  const store = mockStore({
    intake: MultiOptionTypeMock(QuestionTypeEnum.TEXT),
  });
  test("Tests the switch buttons required", async () => {
    render(
      <Provider store={store}>
        <QuestionForm QuestionIndex={1} SectionIndex={1} />
      </Provider>
    );

    const switchInput = screen.getByTestId("switch-input") as HTMLInputElement;

    fireEvent.click(switchInput);

    expect(switchInput.checked).toEqual(true);
  });

  test("Tests the copy button on the question form", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <QuestionForm QuestionIndex={1} SectionIndex={1} />
      </Provider>
    );
    const copyIconButton = screen.getByLabelText("copy");
    fireEvent.click(copyIconButton);
  });

  test("Tests the delete button on the question form", () => {
    render(
      <Provider store={store}>
        <QuestionForm QuestionIndex={1} SectionIndex={1} />
      </Provider>
    );

    const deleteIconButton = screen.getByLabelText("delete");
    fireEvent.click(deleteIconButton);
    expect(deleteIconButton.childNodes[0]).toBeDefined();
  });

  test("Tests the add button on the question form", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <QuestionForm QuestionIndex={1} SectionIndex={1} />
      </Provider>
    );

    const addIconButton = screen.getByLabelText("add");
    fireEvent.click(addIconButton);
  });

  test("Tests the question code input box", () => {
    render(
      <Provider store={store}>
        <QuestionForm QuestionIndex={1} SectionIndex={1} />
      </Provider>
    );

    const questionCodeInput = screen.getAllByTestId(
      "textbox"
    )[0] as HTMLInputElement;
    fireEvent.change(questionCodeInput, { target: { value: "23" } });
  });

  test("Tests the question type select input input box", () => {
    const { container } = render(
      <Provider store={store}>
        <QuestionForm QuestionIndex={1} SectionIndex={1} />
      </Provider>
    );

    const selectInput = screen.getAllByTestId(
      "select-input"
    )[0] as HTMLInputElement;
    Simulate.change(selectInput, {
      target: { value: "3" } as unknown as EventTarget,
    });
  });

  test("Required toggle switch", () => {
    const { container } = render(
      <Provider store={store}>
        <QuestionForm QuestionIndex={1} SectionIndex={1} />
      </Provider>
    );

    const requiredSwitch = screen.getAllByTestId(
      "switch-input"
    )[0] as HTMLInputElement;
    fireEvent.click(requiredSwitch);
  });
});
