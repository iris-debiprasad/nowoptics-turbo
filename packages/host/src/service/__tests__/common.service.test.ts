import axios from "axios";
import { CommonUrlConstants } from "../../constants/common.url.constants";
import { HeaderConfig } from "../../config/headerConfig";
import { GetCommunicationType } from "../common.service";

jest.mock("axios");

describe("common Service", () => {
  afterEach(() => {
    jest.resetAllMocks();
  });

  test("GetCommunicationType endpoint", async () => {
    const type = "DoctorLicenseType";
    const expectedUrl = CommonUrlConstants.GET_MASTER_LOOKUP_BY_TYPE.replace(
      "{0}",
      type
    );
    await GetCommunicationType(type);

    expect(axios.get).toHaveBeenCalledTimes(1);
    expect(axios.get).toHaveBeenCalledWith(expectedUrl, HeaderConfig());
  });
});
