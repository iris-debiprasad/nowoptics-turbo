import {
    DefaultStateHippaFilesMock,
} from "@/mocks/intake.mock";
import { store } from "@root/host/src/store/store";
import "@testing-library/jest-dom";
import { fireEvent, render, screen } from "@testing-library/react";
import { Provider } from "react-redux";
import DefaultTable from "..";
import * as intakeApi from "../../@root/host/src/store/reducer/intakeApi.slice";


const mockgetDefaultAllForms = jest.spyOn(
  intakeApi,
  "useGetDefaultHippaFormsQuery"
);

describe("MedicalForms test suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", async () => {
    mockgetDefaultAllForms.mockImplementation(() => {
      return {
        data: DefaultStateHippaFilesMock,
        refetch: jest.fn(),
      };
    });
    const handleDownloadHippaFile = jest.fn();

    render(
      <Provider store={store}>
        <DefaultTable handleDownloadHippaFile={handleDownloadHippaFile} />
      </Provider>
    );

    const downloadButtons = screen.getAllByTestId("download-hippa-file") as HTMLButtonElement[];
    fireEvent.click(downloadButtons[0]);

  });
});
