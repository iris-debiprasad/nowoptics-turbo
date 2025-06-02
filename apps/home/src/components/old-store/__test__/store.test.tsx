import React from "react";
import { fireEvent, render, screen } from "@testing-library/react";
import StoreDetails from "../index";
import { useRouter } from "next/router";
import BookEyeExamContent from "../bookeyeexamcontent/BookEyeExamContent";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("StoreDetails", () => {
  test("renders all sub-components", () => {
    render(<StoreDetails storeId="123" />);
  });
  test("triggers the router push when the button is clicked", () => {
    const pushMock = jest.fn();
    (useRouter as jest.Mock).mockReturnValue({ push: pushMock });

    render(<BookEyeExamContent />);
    const button = screen.getByRole("button", { name: "Book eye exam" });
    fireEvent.click(button);
    expect(pushMock).toHaveBeenCalledWith("/bookEyeExam");
  });
});
