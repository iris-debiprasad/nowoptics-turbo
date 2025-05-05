import { mockStore, renderWithProviders } from "@/utils/jest.utils";
import Questionoptionitem from "..";
import {
  PatientIntakeFormMock,
  QuestionOptionItemCheckbox,
  QuestionOptionItemRadio,
} from "@/mocks/redux.mock";
import { Provider } from "react-redux";
import { fireEvent } from "@testing-library/react";

describe("QuestionOptionItem test suite", () => {
  const store = mockStore({
    intake: PatientIntakeFormMock(1),
  });
  it("should render the component with checkbox option type", () => {
    renderWithProviders(
      <Provider store={store}>
        <Questionoptionitem
          option={QuestionOptionItemCheckbox.option}
          question={QuestionOptionItemCheckbox.question}
          sectionCode="IFT1611S1"
        />
      </Provider>
    );
  });

  it("should render the component with radio option type", () => {
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <Questionoptionitem
          option={QuestionOptionItemRadio.option}
          question={QuestionOptionItemRadio.question}
          sectionCode="IFT1611S1"
        />
      </Provider>
    );

    const optionContainer = getByTestId("multi-option-container");
    fireEvent.click(optionContainer);
  });
});