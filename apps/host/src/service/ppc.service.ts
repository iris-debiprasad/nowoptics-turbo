import { HeaderConfig } from "./../../../host/src/config/headerConfig";
import axios from "axios";

export interface PPCResponse {
    data: PPCResponseData
}

export interface PPCResponseData {
    Error: any
    Result: PPCResponseDataResult
}

export interface PPCResponseDataResult {
    Description: PPCDescription
    Dma: string
    Id: number
    Phone: string
    Route: string
    Status: boolean
    Stores: PPCStore[]
}

export interface PPCDescription {
    Id: number
    DescriptionName: string
    TopSlider1Desktop: string
    TopSlider1Mobile: string
    BannerTitle: string
    BannerDescription: string
    ButtonText: string
    Disclaimer: string
    SecondBannerTitle: string
    SecondBannerTitleMobile: string
    MinDescription: string
    SecondBannerDescription: string
    SecondBannerButton: string
    PromoBanner01Title: string
    PromoBanner01Description: string
    PromoBanner01Price: string
    PromoBanner01Disclaimer: string
    PromoBanner01Style: string
    PromoBanner02Title: string
    PromoBanner02Description: string
    PromoBanner02Price: string
    PromoBanner02Disclaimer: string
    PromoBanner02Style: string
    PromoBanner03Title: string
    PromoBanner03Description: string
    PromoBanner03Price: string
    PromoBanner03Disclaimer: string
    PromoBanner03Style: string
}

export interface PPCStore {

}

export interface Dma {
    Id: number
    Code: string
    Description: string
}

const BASE_URL_REST_API = process.env.NEXT_PUBLIC_BASE_URL + "/";

const getDma = (dma: String, dmaList: Dma[]) => {
    let matchedDma = dmaList.find(x => x.Description.toUpperCase() == dma.toUpperCase());
    if (!matchedDma) {
        matchedDma = dmaList.find(x =>
            dma.toUpperCase() == x.Description.replaceAll(" ", "-").toUpperCase() ||
            dma.toUpperCase() == x.Description.replaceAll(" ", "").toUpperCase()
        );
    }
    return matchedDma?.Code;
}

export const GetPPCPageData = (brand: string, dma: string, type: string, subtype: string, userLocation: any, dmaList: Dma[]) => {
    let url = BASE_URL_REST_API + `storesetup/PpcDescription/${getDma(dma, dmaList)}/${brand}?url=ppc/${dma}/${type}/${subtype}/`

    if (userLocation) {
        url = url + `&latitude=${userLocation.lat}&longitude=${userLocation.lng}`
    }
    return axios.get(url, { headers: { ...HeaderConfig().headers } });
};

export const GetSocialPageData = (brand: string, dma: string, userLocation: any, dmaList: Dma[]) => {
    let url = BASE_URL_REST_API + `storesetup/PpcDescription/${getDma(dma, dmaList)}/${brand}?url=social/${dma}/fb/`
    if (userLocation) {
        url = url + `&latitude=${userLocation.lat}&longitude=${userLocation.lng}`
    }
    return axios.get(url, { headers: { ...HeaderConfig().headers } });
};

export const GetAllDma = () => {
    let url = BASE_URL_REST_API + `storesetup/marketingdma`;
    return axios.get(url, { headers: { ...HeaderConfig().headers } });
};

export const GetMappedLocationCoordinates = (stores: any) => {
    const mappedData = stores.map((store: any) => {
        return {
            id: store.Id,
            name: store.City,
            coordinates: {
                lat: store.Latitude,
                lng: store.Longitude
            },
            showIcon: true,
            distance: store.Distance
        }
    }).sort((a: any, b: any) => a.distance - b.distance);

    let medianIndex;
    if (mappedData.length % 2 === 0) {
        medianIndex = mappedData.length / 2 - 1;
    } else {
        medianIndex = Math.floor(mappedData.length / 2);
    }
    mappedData.unshift(mappedData.splice(medianIndex, 1)[0]);
    return mappedData;
}