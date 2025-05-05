import { renderWithProviders } from "@/utils/jest.utils";
import { store } from "@root/host/src/store/store";
import { Provider } from "react-redux";
import PatientSetup from "..";
import * as intakeApi from "../@root/host/src/store/reducer/intakeApi.slice";
import { GetPatientIntakeFormMock } from "@/mocks/intake.mock";

const mockGetPatientIntakeForm = jest.spyOn(
  intakeApi,
  "useGetPatientIntakeFormQuery"
);

afterEach(() => {
  jest.clearAllMocks();
});

describe("PatientInformation test suite", () => {
  it("should render", async () => {
    mockGetPatientIntakeForm.mockImplementation(() => {
      return {
        data: GetPatientIntakeFormMock,
        refetch: jest.fn(),
      };
    });

    renderWithProviders(
      <Provider store={store}>
        <PatientSetup />
      </Provider>
    );
  });
});