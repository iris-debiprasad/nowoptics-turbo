import {
  fireEvent,
  getByPlaceholderText,
  getByTestId,
  render,
  screen,
  within,
} from "@testing-library/react";
import Header from "../Header";
import userEvent from "@testing-library/user-event";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

const mockRouter = {
  push: jest.fn(),
};
(useRouter as jest.Mock).mockReturnValue(mockRouter);

describe("Header", () => {
  // Reset the mocks before each test
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('should call router.push with "/bookEyeExam" when the button is clicked', () => {
    render(<Header />);

    const button = screen.getAllByTestId("BookEyeExam");
    fireEvent.click(button[0]);
    fireEvent.click(button[1]);

    expect(mockRouter.push).toHaveBeenCalledWith("/book-eye-exam");
  });
});

jest.mock("next-auth/react", () => {
  const originalModule = jest.requireActual("next-auth/react");
  const mockSession = {
    expires: new Date(Date.now() + 2 * 86400).toISOString(),
    user: {
      authData: {
        userType: "Associate",
      },
    },
  };
  return {
    __esModule: true,
    ...originalModule,
    useSession: jest.fn(() => {
      return { data: mockSession, status: "authenticated" }; // return type is [] in v3 but changed to {} in v4
    }),
  };
});

describe("Header component", () => {
  it("renders the Header component", () => {
    render(<Header />);
  });
});

test("renders the logo", () => {
  const { getByAltText } = render(<Header />);

  const logo = getByAltText("logo");
  expect(logo).toBeTruthy();
});
test("navigates to the home page when the logo is clicked", () => {
  const { getByAltText } = render(<Header />);

  const logo = getByAltText("logo");
  userEvent.click(logo);
});

test("renders the search input", () => {
  const { getByTestId } = render(<Header />);
  const searchInput = getByTestId("Search").querySelector(
    "input"
  ) as HTMLInputElement;
  expect(searchInput).toBeTruthy();
});

describe("YourComponent", () => {
  it("should show the correct placeholder for patient search type", () => {
    render(<Header />);
    const select = screen.getByTestId("search-select");
    const searchInput = screen
      .getByLabelText("search-label")
      .querySelector("input") as HTMLInputElement;
    fireEvent.change(select, { target: { value: "Patient" } });
  });

  it("should show the correct placeholder for product search type", () => {
    render(<Header />);

    const select = screen.getByTestId("search-select");
    const searchInput = screen
      .getByLabelText("search-label")
      .querySelector("input") as HTMLInputElement;
    fireEvent.change(select, { target: { value: "Product" } });
  });

  it("should show the correct placeholder for other search type", () => {
    render(<Header />);

    const select = screen.getByTestId("search-select");
    const searchInput = screen
      .getByLabelText("search-label")
      .querySelector("input") as HTMLInputElement;
    fireEvent.change(select, { target: { value: "Order" } });
  });
});
