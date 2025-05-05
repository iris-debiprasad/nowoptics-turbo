import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import OptionItem from "..";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";

const mockStore = configureStore();

describe("OptionItem component test suite", () => {
  test("OptionItem renders Radio List question type", async () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST),
    });

    render(
      <Provider store={store}>
        <OptionItem
          option={{
            Code: "",
            Description: "",
            OptionIndex: 1,
          }}
          SectionIndex={0}
          QuestionIndex={5}
          questionType={QuestionTypeEnum.CHECKBOX_LIST}
        />
      </Provider>
    );

    const newOptionInput = screen.getByLabelText(
      "new-option-input"
    ) as HTMLInputElement;
    fireEvent.change(newOptionInput, {
      target: { value: "New Option input Value" },
    });

    const answerCodeInput = screen.getByTestId("textbox") as HTMLInputElement;
    fireEvent.change(answerCodeInput, {
      target: { value: "New Anwer code input Value" },
    });

    const deleteIconBtn = screen.getByLabelText(
      "delete-icon-button"
    ) as HTMLImageElement;
    fireEvent.click(deleteIconBtn);
    expect(deleteIconBtn.alt).toBe("Delete icon");

    const recommendSwitch = screen.getByRole("checkbox") as HTMLInputElement;
    fireEvent.click(recommendSwitch);
  });

  test("Modal actions", async () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.DROPDOWN),
    });

    waitFor(() =>
      render(
        <Provider store={store}>
          <OptionItem
            option={{
              Code: "",
              Description: "",
              OptionIndex: 1,
            }}
            SectionIndex={0}
            QuestionIndex={1}
            questionType={QuestionTypeEnum.DROPDOWN}
          />
        </Provider>
      )
    );
    await waitFor(() => {
      const addChildQuestionButton = screen.getByLabelText(
        "add-child-question-button"
      ) as HTMLImageElement;

      fireEvent.click(addChildQuestionButton);
    });
  });

  test("Checkbox list", async () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.CHECKBOX_LIST),
    });

    render(
      <Provider store={store}>
        <OptionItem
          option={{
            Code: "",
            Description: "",
            OptionIndex: 1,
          }}
          SectionIndex={0}
          QuestionIndex={1}
          questionType={QuestionTypeEnum.CHECKBOX_LIST}
        />
      </Provider>
    );
  
  });
});
