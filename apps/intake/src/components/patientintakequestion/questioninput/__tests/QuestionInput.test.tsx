import {
  PatientIntakeFormMock,
  QuestionOptionItemDropdown,
  QuestionOptionItemText,
} from "@/mocks/redux.mock";
import { mockStore, renderWithProviders } from "@/utils/jest.utils";
import { fireEvent } from "@testing-library/react";
import { Provider } from "react-redux";
import Questioninput from "..";
import { Simulate } from "react-dom/test-utils";

describe("Question Input Component test suite", () => {
  const store = mockStore({
    intake: PatientIntakeFormMock(2),
  });
  it("should render the component with drop down selected", () => {
    const { getByTestId, getAllByRole } = renderWithProviders(
      <Provider store={store}>
        <Questioninput
          question={QuestionOptionItemDropdown.question}
          sectionCode="IFT1611S2"
        />
      </Provider>
    );

    const selectInput = getByTestId("select-input");
    Simulate.change(selectInput, {
      target: { value: "IFT1611S2Q1O2" } as unknown as EventTarget,
    });
  });

  it("should render the component with text input selected", () => {
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <Questioninput
          question={QuestionOptionItemText.question}
          sectionCode="IFT1611S1"
        />
      </Provider>
    );

    const input = getByTestId("textbox");
    fireEvent.change(input, { target: { value: "test" } });
  });
});
