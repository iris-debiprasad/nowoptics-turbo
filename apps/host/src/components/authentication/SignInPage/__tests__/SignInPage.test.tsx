import { render } from "@testing-library/react";
import SignInPage from "../SignInPage";
import { useRouter } from "next/router";
import "@testing-library/jest-dom";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("", () => {
  //@ts-ignore
  useRouter.mockImplementation(() => ({
    query: { page: "1", storeId: "1", custph: "9876543210" },
  }));

  it("renders the component", () => {
    render(<SignInPage />);
  });
});
