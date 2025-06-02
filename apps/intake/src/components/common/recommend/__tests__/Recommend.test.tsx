import { fireEvent, render } from "@testing-library/react";
import Recommend from "..";
import { Provider } from "react-redux";
import { store } from "@root/host/src/store/store";

import * as intakeApi from "../../@root/host/src/store/reducer/intakeApi.slice";
import { GetAllSkusQueryMock } from "@/mocks/intake.mock";
import { mockStore, renderWithProviders } from "@/utils/jest.utils";
import { MultiOptionTypeMock } from "@/mocks/redux.mock";
import { QuestionTypeEnum } from "@root/host/src/types/Intake.types";

const mockGetAllSkus = jest.spyOn(intakeApi, "useGetSKUsQuery");

// Write tests for the recommend component
describe("Recommend", () => {
  afterEach(() => {
    jest.clearAllMocks();
  })
  it("should render correctly and toggle the recommend switch", () => {
    render(
      <Provider store={store}>
        <Recommend QuestionIndex={1} SectionIndex={1} OptionIndex={1} />
      </Provider>
    );
  });

  it("should test recommend toggle", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Recommend QuestionIndex={1} SectionIndex={1} OptionIndex={1} />
      </Provider>
    );

    const switchInput = getByTestId("switch-input") as HTMLInputElement;
    fireEvent.click(switchInput);
    fireEvent.click(switchInput);
    expect(switchInput.checked).toBe(false);

  });

  it("should test others input handleChange", () => {

    mockGetAllSkus.mockImplementation(() => {
      return {
        data : GetAllSkusQueryMock,
        refetch : jest.fn(),
      }
    })

    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <Recommend QuestionIndex={1} SectionIndex={1} OptionIndex={1} />
      </Provider>
    );

    const switchInput = getByTestId("switch-input") as HTMLInputElement;
    fireEvent.click(switchInput);

    const radioBtns = getAllByTestId("radio-input") as HTMLInputElement[];

    fireEvent.click(radioBtns[1]);

    const input = getByTestId("textbox") as HTMLInputElement;
    fireEvent.change(input, { target: { value: "Test" } });


    fireEvent.click(radioBtns[0]);
  });

  it("Tests autocomplete input", async () => {
    const { getByTestId, getAllByTestId } = render(
      <Provider store={store}>
        <Recommend QuestionIndex={1} SectionIndex={1} OptionIndex={1} />
      </Provider>
    );

    const switchInput = getByTestId("switch-input") as HTMLInputElement;
    fireEvent.click(switchInput);

    const radioBtns = getAllByTestId("radio-input") as HTMLInputElement[];

    fireEvent.click(radioBtns[0]);

    const autocomplete = getByTestId("autocomplete") as HTMLDivElement;
    const input = autocomplete.querySelector("input") as HTMLInputElement;
    autocomplete.focus();
    fireEvent.change(input, { target: { value: "0001" } });
    fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
    fireEvent.keyDown(autocomplete, { key: "Enter" });
  });

  it("Renders the autocomplete tags", () => {
    const store = mockStore({
      intake: MultiOptionTypeMock(QuestionTypeEnum.RADIOLIST),
    });

    renderWithProviders(
      <Provider store={store}>
        <Recommend QuestionIndex={0} SectionIndex={0} OptionIndex={1} />
      </Provider>
    );
  });
});
