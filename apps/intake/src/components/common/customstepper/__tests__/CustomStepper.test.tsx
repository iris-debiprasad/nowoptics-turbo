import { renderWithProviders } from "@/utils/jest.utils";
import { store } from "@root/host/src/store/store";
import { Provider } from "react-redux";
import CustomStepper from "..";

afterEach(() => {
  jest.clearAllMocks();
});

describe("PatientInformation test suite", () => {
  it("should render with completed set to true", async () => {
    renderWithProviders(
      <Provider store={store}>
        <CustomStepper
          activeStep={0}
          steps={[
            {
              active: true,
              completed: true,
              error: false,
              index: 0,
              label: "patient information",
            },
          ]}
        />
      </Provider>
    );
  });

  it("should render with completed set to false", async () => {
    renderWithProviders(
      <Provider store={store}>
        <CustomStepper
          activeStep={0}
          steps={[
            {
              active: true,
              completed: false,
              error: false,
              index: 0,
              label: "patient information",
            },
          ]}
        />
      </Provider>
    );
  });
});
