// There are plenty more fields in the Store object, from the backend
// but these are the ones used
export interface Store {
    AddressLine1: string;
    BrandName: string;
    City: string;
    Distance: number;
    Id: number;
    Latitude: number | null;
    Longitude: number | null;
    StateCode: string;
    StoreNumber: string;
    WebDescription: string;
    ZipCode: string;
    LocationPageName?: string;
}

export interface AxiosGetStoresParams {
    pageNumber: number;
    pageSize: number;
    search?: string;
    sortDescending: boolean;
    sortField: keyof Store;
    latitude?: number;
    longitude?: number;
}

export interface AxiosGetStoresResponse {
    Results: Store[];
    CurrentPage: number;
    PageCount: number;
    PageSize: number;
    RowCount: number;
}
