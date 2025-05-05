import { render } from "@testing-library/react";

import SideBar from "../SideBar";

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

describe("Sidebar component", () => {
  it("renders the Sidebar component", () => {
    render(
      <SideBar
        anchor="left"
        sideBarOC={true}
        setSideBarOC={() => false}
        changeStoreOpen={false}
        showSnackBar={jest.fn()}
      />
    );
  });
});
