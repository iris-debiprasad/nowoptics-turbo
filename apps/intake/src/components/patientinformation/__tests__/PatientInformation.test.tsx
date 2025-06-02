import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import Patientinformation from "..";
import { Provider } from "react-redux";
import { store } from "@root/host/src/store/store";

describe("PatientInformation test suite", () => {
  it("should render", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <Patientinformation />
      </Provider>
    );
    await waitFor(() => {
      const firstStepLabel = getByLabelText("step-label");
      fireEvent.click(firstStepLabel);
    });
  });
});
