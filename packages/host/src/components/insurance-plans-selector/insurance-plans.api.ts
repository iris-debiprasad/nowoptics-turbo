import axios, { AxiosResponse } from "axios";
import { GET_STORES_ENDPOINT } from "./insurance-plans.constants";
import { HeaderConfig } from "@/config/headerConfig";
import { ApiResponse } from "@/types/api.types";
import {
    AxiosGetStoresParams,
    AxiosGetStoresResponse,
    Store,
} from "./insurance-plans.interface";

interface GetClosestStoreParams {
    latitude: number;
    longitude: number;
}

const METERS_TO_MILES_CONVERT_VALUE = 0.000621371;
/**
 * The backend will always return a response, no matter the distance from the user and the closest store
 * to solve this, if the closest store distance in miles is greater than 50, closestt store won't be used.
 */
const MAXIMIMUM_DISTANCE_TO_ACCEPT_CLOSEST_STORE_IN_MILES = 50;

/**
 * Gets the closest store based on the latitude and longitude of the user and the latitude
 * and longitude of a store, if the closest store distance is greater than 50 miles, then it
 * will return null.
 */
export const getClosestStoreFromCurrentPosition = async ({
    latitude,
    longitude,
}: GetClosestStoreParams): Promise<Store | null> => {
    const response: AxiosResponse<ApiResponse<AxiosGetStoresResponse>> =
        await axios.get(GET_STORES_ENDPOINT, {
            ...HeaderConfig(),
            ...{
                params: {
                    pageNumber: 1, // First result contains the closest store
                    sortField: "Distance", // Since sort field is "Distance"
                    sortDescending: false, // And will sort in ascending
                    pageSize: 1, // Making sure the result is only one
                    latitude,
                    longitude,
                } as AxiosGetStoresParams,
            },
        });

    if (response.data.Result.PageCount === 0) return null;

    const [closestStore] = response.data.Result.Results;

    const distanceInMiles: number =
        closestStore.Distance * METERS_TO_MILES_CONVERT_VALUE;

    if (distanceInMiles > MAXIMIMUM_DISTANCE_TO_ACCEPT_CLOSEST_STORE_IN_MILES)
        return null;

    return closestStore;
};
