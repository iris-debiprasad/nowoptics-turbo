import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import LeftSideOfUser from "../steps/LeftSideOfUser";

jest.mock("next/router", () => ({
  useRouter: jest.fn().mockReturnValue({
    push: jest.fn(),
    replace: jest.fn(),
    prefetch: jest.fn(),
    pathname: "/",
    query: "",
    asPath: "/",
  }),
}));

describe("LeftSideOfUser", () => {
  test("renders the component", () => {
    render(
      <LeftSideOfUser
        dob=""
        stepCount={0}
        setStepCount={() => {}}
        setDob={() => {}}
      />
    );

    expect(screen.getByTestId("left-side-user")).toBeTruthy();
  });

  test("enables the New Customer button when phone number is valid", () => {
    render(
      <LeftSideOfUser
        dob=""
        stepCount={0}
        setStepCount={() => {}}
        setDob={() => {}}
      />
    );

    fireEvent.change(screen.getByPlaceholderText("Phone Number"), {
      target: { value: "1234567890" },
    });

    expect(screen.getByText("I am a New Customer")).toBeTruthy();
  });
});
