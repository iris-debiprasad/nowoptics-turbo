import { getAllConfigurations } from "@/service/common.service";

export interface FrameItem {
    imageUrl: string;
    modelNumber: string;
    pdp: string;
    sku: string;
    webName: string;
}

export const getFrames = async (): Promise<FrameItem[]> => {
    const response = await getAllConfigurations("PPCProducts");
    return JSON.parse(response.data.Result).eyeglasses;
};
