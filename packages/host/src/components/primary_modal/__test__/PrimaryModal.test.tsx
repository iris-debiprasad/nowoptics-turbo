import { render } from "@testing-library/react";
import PrimaryModal from "../PrimaryModal";
import { primaryModalMockData } from "@/mocks/primaryModal.mock";


describe("Primary Modal component", () => {
  it("renders the Primary Modal component", () => {
    render(<PrimaryModal {...primaryModalMockData}/>);
  });
});
