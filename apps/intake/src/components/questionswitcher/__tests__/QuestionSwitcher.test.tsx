import { fireEvent, render, waitFor } from "@testing-library/react";
import QuestionSwitcher from "..";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";

const mockStore = configureStore();

describe("Question Switcher component suite", () => {
  test("Render checkbox list questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={5} SectionIndex={0}  />
      </Provider>
    );
  });

  test("Render radioList questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.RADIOLIST),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={1} SectionIndex={0} />
      </Provider>
    );
  });

  test("Render dropdown questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.DROPDOWN),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={6} SectionIndex={0} />
      </Provider>
    );
  });

  test("Render Email questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.EMAIL),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={4} SectionIndex={0} />
      </Provider>
    );
  });

  test("Render Text questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.TEXT),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={8} SectionIndex={0} />
      </Provider>
    );
  });

  test("Render Textarea questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.TEXT_AREA),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={9} SectionIndex={0} />
      </Provider>
    );
  });

  test("Render date questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.DATE),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={1} SectionIndex={0} />
      </Provider>
    );
  });

  test("Render datetime questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.DATE_AND_TIME),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={1} SectionIndex={0} />
      </Provider>
    );
  });

  test("Render number questionType", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.NUMBER),
    });
    render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={10} SectionIndex={0} />
      </Provider>
    );
  });

  test("Test question text input change", async () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST),
    });
    const { getByTestId } = render(
      <Provider store={store}>
        <QuestionSwitcher QuestionIndex={1} SectionIndex={0} />
      </Provider>
    );

    await waitFor(() => {
      const textField = getByTestId("text-field") as HTMLTextAreaElement;
      fireEvent.change(textField, { target: { value: "23" } });
    });
  });
});
