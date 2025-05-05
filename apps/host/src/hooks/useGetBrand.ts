import { BRAND } from "@root/host/src/constants/common.constants";
import { checkBrand } from "@root/host/src/utils/common.utils";
import { useEffect, useState } from "react";


export const useGetBrand = (): string => {
    const [brand, setBrand] = useState<string>(BRAND.SO as "SO");
    useEffect(() => {
        if (typeof window !== "undefined") {
            setBrand(checkBrand());
        }
    }, []);
    return brand;
}