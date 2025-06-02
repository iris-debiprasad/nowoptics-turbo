import {
  GetCompanyDropdownMock,
  GetStateDropdownMock,
  GetStoreOptionsMock,
} from "@/mocks/intake.mock";
import { store } from "@root/host/src/store/store";
import { fireEvent, render, screen, waitFor, within } from "@testing-library/react";
import { Provider } from "react-redux";
import AvailibilityModal from "..";
import * as intakeApi from "../@root/host/src/store/reducer/intakeApi.slice";
import { DATE_FORMAT } from "@root/host/src/constants/common.constants";

jest.spyOn(intakeApi, "useGetCompanyDropdownQuery").mockImplementation(() => {
  return {
    data: GetCompanyDropdownMock,
    refetch: jest.fn(),
  };
});

jest.spyOn(intakeApi, "useGetStateDropdownQuery").mockImplementation(() => {
  return {
    data: GetStateDropdownMock,
    refetch: jest.fn(),
  };
});

jest.spyOn(intakeApi, "useGetStoreOptionsQuery").mockImplementation(() => {
  return {
    data: GetStoreOptionsMock,
    refetch: jest.fn(),
  };
});

jest
  .spyOn(intakeApi, "useSaveAvailibilityTemplateMutation")
  .mockReturnValue([() => jest.fn(), {}] as unknown as ReturnType<
    typeof intakeApi.useSaveAvailibilityTemplateMutation
  >);

describe("AvailabilityModal", () => {
  test("Check if the modal renders and closes on btn click properly", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <AvailibilityModal />
      </Provider>
    );
    const closeBtn = getByTestId("close-modal-btn");
    fireEvent.click(closeBtn);
  });

  test("Check autocomplete input", () => {
    const { getAllByTestId } = render(
      <Provider store={store}>
        <AvailibilityModal />
      </Provider>
    );

    const autocompleteInputs = getAllByTestId(
      "autocomplete"
    ) as HTMLDivElement[];
    autocompleteInputs.forEach((autocomplete, index) => {
      const input = autocomplete.querySelector("input") as HTMLInputElement;
      autocomplete.focus();
      fireEvent.change(input, { target: { value: "Stor" } });
      fireEvent.keyDown(autocomplete, { key: "ArrowDown" });
      fireEvent.keyDown(autocomplete, { key: "Enter" });
    });
  });

  test("Save button", async () => {
    const { findByTestId, getByLabelText, getByTestId } = render(
      <Provider store={store}>
        <AvailibilityModal />
      </Provider>
    );

    await waitFor(async () => {
      const saveBtn = (await findByTestId("save-btn")) as HTMLButtonElement;
      fireEvent.click(saveBtn);
    });
  });

  test("Empty api options", async () => {
    jest
      .spyOn(intakeApi, "useGetCompanyDropdownQuery")
      .mockImplementation(() => {
        return {
          data: [],
          refetch: jest.fn(),
        };
      });

    jest.spyOn(intakeApi, "useGetStateDropdownQuery").mockImplementation(() => {
      return {
        data: [],
        refetch: jest.fn(),
      };
    });

    jest.spyOn(intakeApi, "useGetStoreOptionsQuery").mockImplementation(() => {
      return {
        data: [],
        refetch: jest.fn(),
      };
    });

    render(
      <Provider store={store}>
        <AvailibilityModal />
      </Provider>
    );
  });

  test("Date input change", async () => {
    const { getByLabelText } = render(
      <Provider store={store}>
        <AvailibilityModal />
      </Provider>
    );

    const dateInputContainer = getByLabelText("date-input") as HTMLDivElement;
    const dateInput = (await within(dateInputContainer).findByPlaceholderText(
      DATE_FORMAT
    )) as HTMLInputElement;
    fireEvent.change(dateInput, { target: { value: "2021-05-05" } });
  });
});
