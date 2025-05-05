import { fireEvent, render, screen } from "@testing-library/react";
import TableFilter from "../TableFilter";
import { TableFilterDTO } from "@/types/TableFilter.types";
import "@testing-library/jest-dom";

describe("Filter component", () => {
  const props: TableFilterDTO = {
    anchorEl: null,
    open: true,
    handleClose: jest.fn(),
    options: [
      {
        label: "",
        value: "",
      },
    ],
    setFilterStateValues: jest.fn(),
    filterStateValues: {
      filterOpertor: "",
      filterTextValue: "",
      tableHeader: "",
    },
  };

  it("renders the Filter component", () => {
    render(<TableFilter {...props} />);
  });

  it("checks the handle select change event", async () => {
    const { getByTestId, getByRole } = render(<TableFilter {...props} />);

    const select = getByTestId("filter-select").querySelector(
      "input"
    ) as HTMLInputElement;
    expect(select).toBeInTheDocument();
    fireEvent.change(select, { target: { value: "Contains" } });
  });

  it("checks the handle clear function", async () => {
    const { getByTestId, getByRole } = render(<TableFilter {...props} />);

    const button = getByTestId("clear-button");
    expect(button).toBeInTheDocument();
    fireEvent.click(button);
  });

  it("checks the textfield handle change event", async () => {
    const { getByTestId } = render(<TableFilter {...props} />);
    const textFilterField = (await getByTestId("filter-text").querySelector(
      "input"
    )) as HTMLInputElement;
    expect(textFilterField).toBeInTheDocument();
    fireEvent.change(textFilterField, { target: { value: "abc" } });
    expect(textFilterField.value).toBe("abc");
  });

  it("checks the button click event in case of error true", async () => {
    const { getByTestId } = render(<TableFilter {...props} />);
    const textFilterField = (await getByTestId("filter-text").querySelector(
      "input"
    )) as HTMLInputElement;
    expect(textFilterField).toBeInTheDocument();

    const filterButton = getByTestId("filter-button");
    expect(filterButton).toBeInTheDocument();

    fireEvent.change(textFilterField, { target: { value: "" } });
    fireEvent.click(filterButton);

    expect(screen.getByText("Value is required")).toBeInTheDocument();
  });

  it("checks the button click event in case of error true", async () => {
    const { getByTestId } = render(<TableFilter {...props} />);
    const textFilterField = (await getByTestId("filter-text").querySelector(
      "input"
    )) as HTMLInputElement;
    expect(textFilterField).toBeInTheDocument();

    const filterButton = getByTestId("filter-button");
    expect(filterButton).toBeInTheDocument();

    fireEvent.change(textFilterField, { target: { value: "abc" } });
    fireEvent.click(filterButton);

    expect(props.setFilterStateValues).toBeCalled();
  });
});
