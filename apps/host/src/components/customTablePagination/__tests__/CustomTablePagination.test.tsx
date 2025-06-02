import { render } from "@testing-library/react";
import CustomTablePagination from "../CustomTablePagination";

describe("Multiple Image Slider component", () => {
  const props = {
    rowsPerPage: 10,
    setRowsPerPage: jest.fn(),
    page: 1,
    setPage: jest.fn(),
    dataCount: 30,
  };
  it("renders the Multiple Image Slider component", () => {
    render(<CustomTablePagination {...props} />);
  });
});
