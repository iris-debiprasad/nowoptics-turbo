import { fireEvent, render, screen } from "@testing-library/react";
import AvailibilityTable from "..";
import { Provider } from "react-redux";
import { store } from "@root/host/src/store/store";
import * as intakeApi from "../../@root/host/src/store/reducer/intakeApi.slice";
import {
  StoreTableAvailibilityMock,
  CompanyTableAvailibilityMock,
  StateTableAvailibilityMock,
} from "@/mocks/intake.mock";

jest.spyOn(intakeApi, "useGetStoreAvailibilityQuery").mockImplementation(() => {
  return {
    data: StoreTableAvailibilityMock,
    refetch: jest.fn(),
  };
});

jest.spyOn(intakeApi, "useGetStateAvailibilityQuery").mockImplementation(() => {
  return {
    data: StateTableAvailibilityMock,
    refetch: jest.fn(),
  };
});

jest
  .spyOn(intakeApi, "useGetCompanyCategoryAvailibilityQuery")
  .mockImplementation(() => {
    return {
      data: CompanyTableAvailibilityMock,
      refetch: jest.fn(),
    };
  });

describe("MedicalForms test suite", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  it("should render", () => {
    render(
      <Provider store={store}>
        <AvailibilityTable
          expanded={true}
          tableKey="store"
          type="store"
          templateId="80"
          label="Test Label"
        />
      </Provider>
    );
  });

  it("should render", () => {
    render(
      <Provider store={store}>
        <AvailibilityTable
          expanded={true}
          tableKey="company"
          type="companycategory"
          templateId="80"
          label="Test Label"
        />
      </Provider>
    );
  });

  it("should render", () => {
    render(
      <Provider store={store}>
        <AvailibilityTable
          expanded={true}
          tableKey="state"
          type="state"
          templateId="80"
          label="Test Label"
        />
      </Provider>
    );

    const sortBtn = screen.getByTestId(
      "sort-click-StateId"
    ) as HTMLButtonElement;
    fireEvent.click(sortBtn);
    fireEvent.click(sortBtn);
    
    const dropdownIcon = screen.getByTestId(
      "drop-down-icon"
    ) as HTMLImageElement;
    fireEvent.click(dropdownIcon);
  });
});
