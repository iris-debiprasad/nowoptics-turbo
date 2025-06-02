import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import CheckboxModal from "..";

const mockStore = configureStore();

describe("Checkbox Modal test suite", () => {
  const store = mockStore({
    intake: MultiOptionTypeMock(QuestionTypeEnum.TEXT),
  });
  const setOpen = jest.fn();
  test("Render checkbox modal", async () => {
    render(
      <Provider store={store}>
        <CheckboxModal
          open={true}
          setOpen={setOpen}
          questions={[]}
          QuestionIndex={1}
          SectionIndex={1}
        />
      </Provider>
    );

    waitFor(() => {
      const closeIconButton = screen.getByLabelText("close-icon-button");
      fireEvent.click(closeIconButton);
      const textInput = screen.getByTestId("textbox");
      fireEvent.change(textInput, {
        target: { value: "New Anwer code input Value" },
      });
      const modalCancelBtn = screen.getByTestId("modal-cancel-button");
      fireEvent.click(modalCancelBtn);
    });
  });
});
