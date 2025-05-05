import { fireEvent, render } from "@testing-library/react";
import Nav from "../Nav";
import "@testing-library/jest-dom";
import { Provider } from "react-redux";
import { store } from "@/store/store";
import { GetAuthenticatedUserPermission } from "@/service/userPermission.service";
import { useRouter } from "next/router";

jest.mock("next/router", () => ({
  useRouter: jest.fn(),
}));

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

jest.mock("@/service/userPermission.service", () => ({
  GetAuthenticatedUserPermission: jest.fn(),
}));

describe("Nav component", () => {
  it("renders the Nav component", () => {
    render(
      <Provider store={store}>
        <Nav />
      </Provider>
    );
  });

  it("renders the Nav component for dropdown button", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Nav />
      </Provider>
    );
    const dropdownButton = getByTestId("nav-button-dropdown-Contacts");
    fireEvent.click(dropdownButton);
  });

  it("should fetch user permission and dispatch action on success", async () => {
    const getUsersPermission: jest.Mock<any, any, any> = jest.fn();

    render(
      <Provider store={store}>
        <Nav />
      </Provider>
    );
    await getUsersPermission();
    expect(GetAuthenticatedUserPermission).toHaveBeenCalledWith(
      expect.stringContaining("20.45.7.141")
    );
  });

  it("should toggle the mobileOpen state", () => {
    const { getByTestId } = render(
      <Provider store={store}>
        <Nav />
      </Provider>
    );

    const toggleButton = getByTestId("nav-button-toggle");
    expect(toggleButton).toBeInTheDocument();
    fireEvent.click(toggleButton);
  });
});
