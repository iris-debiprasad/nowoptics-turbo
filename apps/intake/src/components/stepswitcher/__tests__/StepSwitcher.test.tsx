import { PatientIntakeFormMock } from "@/mocks/redux.mock";
import { mockStore, renderWithProviders } from "@/utils/jest.utils";
import { Provider } from "react-redux";
import StepSwitcher from "..";
import { fireEvent } from "@testing-library/react";

afterEach(() => {
  jest.clearAllMocks();
});

describe("PatientInformation test suite", () => {
  it("switcher with patient information", async () => {
    const store = mockStore({
      intake: PatientIntakeFormMock(0),
    });
    renderWithProviders(
      <Provider store={store}>
        <StepSwitcher activeStep={0} />
      </Provider>
    );
  });

  it("switcher with generic step with back btn clicked", async () => {
    const store = mockStore({
      intake: PatientIntakeFormMock(1),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <StepSwitcher activeStep={1} />
      </Provider>
    );

  });

  it("switcher with generic step with next btn clicked", async () => {
    const store = mockStore({
      intake: PatientIntakeFormMock(1),
    });
    const { getByTestId } = renderWithProviders(
      <Provider store={store}>
        <StepSwitcher activeStep={1} />
      </Provider>
    );
  });

  it("switcher with hippa forms", async () => {
    const store = mockStore({
      intake: PatientIntakeFormMock(2),
    });
    renderWithProviders(
      <Provider store={store}>
        <StepSwitcher activeStep={2} />
      </Provider>
    );
  });

  it("switcher with Invalid step", async () => {
    const store = mockStore({
      intake: PatientIntakeFormMock(-1),
    });
    renderWithProviders(
      <Provider store={store}>
        <StepSwitcher activeStep={-1} />
      </Provider>
    );
  });
});