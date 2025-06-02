import { mockStore, renderWithProviders } from "@/utils/jest.utils";
import Patientintakestep from "..";
import { PatientIntakeFormMock } from "@/mocks/redux.mock";
import { Provider } from "react-redux";

describe("Patient Intake Step Component test suite", () => {
  const store = mockStore({
    intake: PatientIntakeFormMock(1),
  });
  test("should render the component", () => {
    renderWithProviders(
      <Provider store={store}>
        <Patientintakestep activeStep={1} />
      </Provider>
    );
  });
});