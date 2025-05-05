import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import QuestionStep from "..";
import { Provider } from "react-redux";
import { store } from "@root/host/src/store/store";
import configureStore from "redux-mock-store";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";

const mockStore = configureStore();

describe("Question Step component suite", () => {
  it("Renders the step component for each question step", async () => {
    act(() => {
      render(
        <Provider store={store}>
          <QuestionStep SectionIndex={0} formSectionCode="" />
        </Provider>
      );
    });

    await waitFor(() => {
      const radioElements = screen.getAllByLabelText(
        "radio-container"
      ) as HTMLDivElement[];

      radioElements.forEach((radioDiv, index) => {
        fireEvent.click(radioDiv.querySelector("input") as HTMLInputElement);
      });
    });
  });

  test("Questions rendering", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST),
    });
    act(() => {
      render(
        <Provider store={store}>
          <QuestionStep SectionIndex={0} formSectionCode="" />
        </Provider>
      );
    });
  });
});
