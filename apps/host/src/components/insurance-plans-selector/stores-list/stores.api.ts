import axios, { AxiosResponse } from "axios";

import {
    AxiosGetStoresParams,
    AxiosGetStoresResponse,
    Store,
} from "../insurance-plans.interface";
import { HeaderConfig } from "@/config/headerConfig";
import { ApiResponse } from "@root/host/src/types/api.types";
import { GET_STORES_ENDPOINT } from "../insurance-plans.constants";

interface GetStoresParams {
    /** Page that wants to be fetched */
    page: number;
    /** Search term that will be used to retrieve the stores */
    search: string;
    lat?: string;
    long?: string;
}

interface GetStoresReturn {
    totalPages: number;
    stores: Store[];
}

/**
 * Fetches stores and paginates them, can search by term, term could be City, State, or Zip code
 */
export const getStores = async ({
    page,
    search,
    lat,
    long
}: GetStoresParams): Promise<GetStoresReturn> => {
    const response: AxiosResponse<ApiResponse<AxiosGetStoresResponse>> =
        await axios.get(GET_STORES_ENDPOINT, {
            ...HeaderConfig(),
            ...{
                params: {
                    pageNumber: page,
                    sortField: lat && long ? "Distance" : "WebDescription",
                    sortDescending: false,
                    pageSize: 20,
                    ...(search !== "" && { search }),
                    ...(lat && { latitude: lat }),
                    ...(long && { longitude: long })
                } as AxiosGetStoresParams,
            },
        });

    return {
        stores: response.data.Result.Results,
        totalPages: response.data.Result.PageCount,
    };
};
