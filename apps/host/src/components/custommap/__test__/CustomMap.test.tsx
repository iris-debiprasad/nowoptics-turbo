import { render } from "@testing-library/react";
import CustomMap from "../CustomMap";

const mockCenters = [
  { id: 1, name: 'Center 1', coordinates: { lat: 37.7749, lng: -122.4194 } },
  { id: 2, name: 'Center 2', coordinates: { lat: 37.7897, lng: -122.3944 } },
];


describe("Custom Map component", () => {
  it("renders the Custom Map component", () => {
    render(<CustomMap centers={mockCenters} />);
  });
});
