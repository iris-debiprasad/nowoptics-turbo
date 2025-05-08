import axios from "axios";
import { GetProductSearchData } from "../search.service";
import { IrisUrlConstants } from "@root/host/src/constants/iris.url.constants";
import { HeaderConfig } from "@/config/headerConfig";

jest.mock("axios");

describe("Store Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  describe("GetProductSearchData", () => {
    test("should make a GET request to fetch search", async () => {
      const searchTerm = "*";
      const expectedUrl = IrisUrlConstants.PRODUCT_SEARCH.replace(
        "{*}",
        encodeURIComponent(searchTerm)
      );

      await GetProductSearchData(searchTerm);

      expect(axios.get).toHaveBeenCalledTimes(1);
    });
  });
});
