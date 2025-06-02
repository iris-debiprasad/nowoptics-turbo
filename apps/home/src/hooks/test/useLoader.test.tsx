import React from "react";
import { render, waitFor } from "@testing-library/react";
import axios from "axios";
import useAxiosLoader from "../useAxiosLoader";

jest.mock("axios");

describe("useAxiosLoader", () => {
  afterEach(() => {
    jest.clearAllMocks();
  });

  test("sets loading state to true during API request and false after response", async () => {
    const requestInterceptor = jest.spyOn(axios.interceptors.request, "use");
    const responseInterceptor = jest.spyOn(axios.interceptors.response, "use");

    const TestComponent = () => {
      const loading = useAxiosLoader();
      return (
        <div data-testid="content">{loading ? "Loading..." : "Loaded"}</div>
      );
    };
    const { getByTestId } = render(<TestComponent />);
    expect(requestInterceptor).toHaveBeenCalled();
    await waitFor(() => {
      expect(responseInterceptor).toHaveBeenCalled();
    });
    const contentElement = getByTestId("content");
    expect(contentElement.textContent).toBe("Loaded");
  });
});
