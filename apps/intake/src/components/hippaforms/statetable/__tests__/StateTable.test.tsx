import { store } from "@root/host/src/store/store";
import {
  act,
  fireEvent,
  render,
  screen,
  waitFor,
} from "@testing-library/react";
import { Provider } from "react-redux";
import user from "@testing-library/user-event";
import StateTable from "..";
import * as intakeApi from "../../@root/host/src/store/reducer/intakeApi.slice";
import { AllStateHippaFilesMock } from "@/mocks/intake.mock";
import { Simulate } from "react-dom/test-utils";

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

    render(
      <Provider store={store}>
        <StateTable handleDownloadHippaFile={jest.fn()} />
      </Provider>
    );

    const uploadEnglishBtn = screen.getAllByTestId(
      "upload-english-hippa-file"
    )[0] as HTMLButtonElement;
    fireEvent.click(uploadEnglishBtn);

    const downloadEnglishBtn = screen.getAllByTestId(
      "download-english-hippa-file"
    )[0] as HTMLSpanElement;
    fireEvent.click(downloadEnglishBtn);

    const uploadSpanishBtn = screen.getAllByTestId(
      "upload-spanish-hippa-file"
    )[0] as HTMLButtonElement;
    fireEvent.click(uploadSpanishBtn);

    const downloadSpanishBtn = screen.getAllByTestId(
      "download-spanish-hippa-file"
    )[0] as HTMLSpanElement;
    fireEvent.click(downloadSpanishBtn);

    const file = new File(["hello"], "hello.png", { type: "image/png" });
    const fileInput = screen.getByTestId("file-upload");
  });
});
