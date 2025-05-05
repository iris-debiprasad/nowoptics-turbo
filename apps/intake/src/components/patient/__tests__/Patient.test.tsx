import { renderWithProviders } from "@/utils/jest.utils";
import { store } from "@root/host/src/store/store";
import { Provider } from "react-redux";
import Patient from "..";

afterEach(() => {
  jest.clearAllMocks();
});

describe("PatientInformation test suite", () => {
  it("should render", async () => {
    renderWithProviders(
      <Provider store={store}>
        <Patient />
      </Provider>
    );
  });
});
