import { fireEvent, render, screen } from "@testing-library/react";
import MultiOption from "..";
import { Provider } from "react-redux";
import configureStore from "redux-mock-store";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";
import userEvent from "@testing-library/user-event";

const mockStore = configureStore();

describe("MultiOption component test suite", () => {
  test("MultiOption renders Radio List question type", async () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.RADIOLIST),
    });

    render(
      <Provider store={store}>
        <MultiOption
          SectionIndex={1}
          QuestionIndex={1}
          questionType={QuestionTypeEnum.RADIOLIST}
        />
      </Provider>
    );

    const addOptionIconBtn = screen.getAllByTestId(
      "new-option-icon-button"
    )[0] as HTMLImageElement;
    fireEvent.click(addOptionIconBtn);
  });
});
