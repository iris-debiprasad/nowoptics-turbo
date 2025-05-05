import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import BookEyeExamContent from "../BookEyeExamContent";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

describe("BookEyeExamContent", () => {
  test("renders the component", () => {
    render(<BookEyeExamContent />);
    expect(screen.getByText("Convenient, Free Eye Exams")).toBeTruthy();
    expect(
      screen.getByText(
        "With our telehealth technology, you’ll gain accurate eye health information quickly and conveniently. From the eye exam to frame selection, the Stanton Optical team walks you through the entire process to make sure you get exactly what you need and leave completely satisfied."
      )
    ).toBeTruthy();
    const button = screen.getByRole("button", { name: "Book eye exam" });
    expect(button).toBeTruthy();
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
