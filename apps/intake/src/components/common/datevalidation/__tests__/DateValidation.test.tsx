import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";
import { mockStore, renderWithProviders } from "@/utils/jest.utils";
import Datevalidation from "..";
import { Provider } from "react-redux";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { fireEvent } from "@testing-library/react";
import { UPDATE_DATE_VALIDATION } from "@root/host/src/store/reducer/intake.slice";

describe("DateValidation component test suite", () => {
  test("DateValidation renders Date question type with checked", async () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.DATE),
    });

    const { getByTestId, getByLabelText } = renderWithProviders(
      <Provider store={store}>
        <Datevalidation SectionIndex={0} QuestionIndex={1} />
      </Provider>
    );

    const input = getByTestId("textbox") as HTMLInputElement;
    fireEvent.change(input, {
      target: { value: "New input Value" },
    });

    const checkboxLabel = getByLabelText("checkbox-label");
    fireEvent.click(checkboxLabel);
    store.dispatch(
      UPDATE_DATE_VALIDATION({
        QuestionIndex: 1,
        SectionIndex: 0,
        value: "1-10",
      })
    );
    fireEvent.click(checkboxLabel);
  });
});
