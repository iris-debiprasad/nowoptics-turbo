import { ApiResponse } from "@/types/api.types";
import axios, { AxiosResponse } from "axios";
import { InsurancePlan } from "./insurance-plan.interfaces";
import { HeaderConfig } from "@/config/headerConfig";
import { BASE_URL_REST_API } from "@/constants/common.url.constants";

const INSURANCE_PLANS_BY_ID_ENDPOINT = (id: number): string =>
    `${BASE_URL_REST_API}managedcareSetup/insuranceCarrier/store/${id}`;

/**
 * Gets the insurance plans available from a store
 *
 * @param storeId store id of the store which the insurance plans will be retrieved
 * @returns Array of insurance plans
 */
export const getInsurancePlansByStoreId = async (
    storeId: number,
): Promise<InsurancePlan[]> => {
    const response: AxiosResponse<ApiResponse<InsurancePlan[]>> = await axios.get(
        INSURANCE_PLANS_BY_ID_ENDPOINT(storeId),
        HeaderConfig(),
    );

    return response.data.Result;
};
