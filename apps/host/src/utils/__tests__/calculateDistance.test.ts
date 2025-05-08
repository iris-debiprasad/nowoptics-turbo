import { calculateDistance, findClosestCoordinate } from "../calculateDistance";
import { LocationDTO, StoreAddressType } from "@root/host/src/types/SideBar.types";

describe("calculateDistanceUtils", () => {
  describe("calculateDistance", () => {
    test("should calculate the distance between two coordinates", () => {
      const lat1 = 52.520008;
      const lon1 = 13.404954;
      const lat2 = 51.5074;
      const lon2 = -0.1278;
      const expectedDistance = 576.11;
      const precision = 2.76;

      const distance = calculateDistance(lat1, lon1, lat2, lon2);

      expect(Number(distance)).toBeLessThan(expectedDistance + precision);
    });
  });

  describe("findClosestCoordinate", () => {
    const coordinates: StoreAddressType[] = [
      {
        AddressLine1: "Address 1",
        BrandName: "Brand 1",
        City: "City 1",
        CloseAt: "Close Time 1",
        HasSameDayDelivery: true,
        Id: 1,
        Latitude: 51.5074,
        Longitude: -0.1278,
        OpenAt: "Open Time 1",
        PhoneNumber: [{ PhoneNumber: "7894561230", Type: "Google" }],
        StateCode: "State Code 1",
        StoreNumber: "Store Number 1",
        WebDescription: "Web Description 1",
        ZipCode: "Zip Code 1",
      },
      {
        AddressLine1: "Address 2",
        BrandName: "Brand 2",
        City: "City 2",
        CloseAt: "Close Time 2",
        HasSameDayDelivery: false,
        Id: 2,
        Latitude: 40.7128,
        Longitude: -74.006,
        OpenAt: "Open Time 2",
        PhoneNumber: [{ PhoneNumber: "8976543210", Type: "Google" }],
        StateCode: "State Code 2",
        StoreNumber: "Store Number 2",
        WebDescription: "Web Description 2",
        ZipCode: "Zip Code 2",
      },
      {
        AddressLine1: "Address 3",
        BrandName: "Brand 3",
        City: "City 3",
        CloseAt: "Close Time 3",
        HasSameDayDelivery: true,
        Id: 3,
        Latitude: 48.8566,
        Longitude: 2.3522,
        OpenAt: "Open Time 3",
        PhoneNumber: [{ PhoneNumber: "9876543210", Type: "Google" }],
        StateCode: "State Code 3",
        StoreNumber: "Store Number 3",
        WebDescription: "Web Description 3",
        ZipCode: "Zip Code 3",
      },
    ];

    test("should find the closest coordinate when the target location is provided", () => {
      const target: LocationDTO = {
        latitude: 52.520008,
        longitude: 13.404954,
      };
      const expectedClosestCoordinate = {
        Latitude: 48.8566,
        Longitude: 2.3522,
      };

      const closestCoordinate = findClosestCoordinate(target, coordinates);

      expect(closestCoordinate).toMatchObject(expectedClosestCoordinate);
    });

    test("should return the first coordinate when the target location is not provided", () => {
      const targetNull: LocationDTO | null = null;
      const expectedClosestCoordinate = {
        Latitude: 51.5074,
        Longitude: -0.1278,
      };

      const closestCoordinate = findClosestCoordinate(targetNull, coordinates);

      expect(closestCoordinate).toMatchObject(expectedClosestCoordinate);
    });
  });
});
