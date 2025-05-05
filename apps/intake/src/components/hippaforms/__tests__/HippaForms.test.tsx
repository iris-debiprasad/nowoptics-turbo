import { store } from "@root/host/src/store/store";
import { act, fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import HippaForms from "..";
import * as intakeApi from "../@root/host/src/store/reducer/intakeApi.slice";
import {
  AllStateHippaFilesMock,
  DefaultStateHippaFilesMock,
} from "@/mocks/intake.mock";

const mockgetDefaultAllForms = jest.spyOn(
  intakeApi,
  "useGetDefaultHippaFormsQuery"
);
const mockgetAllStateForms = jest.spyOn(intakeApi, "useGetAllHippaFormsQuery");

describe("MedicalForms test suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", async () => {
    mockgetAllStateForms.mockImplementation(() => {
      return {
        data: AllStateHippaFilesMock,
        refetch: jest.fn(),
      };
    });

    mockgetDefaultAllForms.mockImplementation(() => {
      return {
        data: DefaultStateHippaFilesMock,
        refetch: jest.fn(),
      };
    });

    render(
      <Provider store={store}>
        <HippaForms />
      </Provider>
    );

    const sortNamebtn = screen.getByTestId("sort-click-Name");
    fireEvent.click(sortNamebtn);
    const sortDescriptionBtn = screen.getByTestId("sort-click-Id");
    fireEvent.click(sortDescriptionBtn);
  });
});
