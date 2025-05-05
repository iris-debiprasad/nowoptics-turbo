import axios from "axios";
import {
  GetAuthenticatedStoreLocatorGrid,
  GetPublicStoreLocatorGrid,
  getStoreWorkingHour,
} from "../storeLocator.service";
import { IrisUrlConstants } from "@/constants/iris.url.constants";
import { HeaderConfig } from "@/config/headerConfig";

jest.mock("axios");

describe("Store Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GetAuthenticatedStoreLocatorGrid", () => {
    test("should make a GET request to the authenticated store locator grid endpoint", async () => {
      const pageNumber = "1";
      const expectedUrl = IrisUrlConstants.STORE_LOCATOR_GRID_AUTHENTICATED.replace(
        "{0}",
        pageNumber
      );

      await GetAuthenticatedStoreLocatorGrid(pageNumber);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, HeaderConfig());
    });
  });

  describe("GetPublicStoreLocatorGrid", () => {
    test("should make a GET request to the public store locator grid endpoint", async () => {
      const pageNumber = "1";
      const expectedUrl = IrisUrlConstants.STORE_LOCATOR_GRID_PUBLIC.replace(
        "{0}",
        pageNumber
      );

      await GetPublicStoreLocatorGrid(pageNumber);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, HeaderConfig());
    });
  });

  describe("getStoreWorkingHour", () => {
    test("should make a GET request to the store working hour endpoint", async () => {
      const storeId = "123";
      const currentDate = "2023-06-21";
      const expectedUrl = IrisUrlConstants.STORE_WORKING_HOUR.replace("{0}", storeId).replace(
        "{1}",
        currentDate
      );

      await getStoreWorkingHour(storeId, currentDate);

      expect(axios.get).toHaveBeenCalledTimes(1);
      expect(axios.get).toHaveBeenCalledWith(expectedUrl, HeaderConfig());
    });
  });
});
