export interface StoreHoursDTO {
    day: string,
    status: string
}
export interface AllStoreAddressesDTO {
    name: string,
    timing: string,
    labName?: string,
    distance: string,
    address: string,
    full_address: {
        "street": string,
        "city": string,
        "state": string,
        "zipcode": string,
        "geo": {
            "lat": string,
            "lng": string
        }
    },
    telephone: string
}
