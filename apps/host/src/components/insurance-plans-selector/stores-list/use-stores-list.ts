import React from "react";
import { Store } from "../insurance-plans.interface";
import { getStores } from "./stores.api";
import { isZipcodeValidRegex } from "@/constants/common.constants";
import { GetGeoLocationData } from "@/service/common.service";

interface PaginatedData {
    isFetchingStores: boolean;
    page: number;
    pageCount: number;
    search: string;
    stores: Store[] | null;
}

const PAGINATED_DATA_INITIAL_STATE: PaginatedData = {
    isFetchingStores: true,
    page: 1,
    pageCount: 0,
    search: "",
    stores: null,
};

const debounce = (fn: Function, ms = 300) => {
    let timeoutId: ReturnType<typeof setTimeout>;

    return function (this: any, ...args: any[]) {
        clearTimeout(timeoutId);
        timeoutId = setTimeout(() => fn.apply(this, args), ms);
    };
};

interface UseStoresListReturn {
    data: PaginatedData;
    loadMoreElementRef: React.RefObject<HTMLSpanElement>;
    onSearchInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
    updatePage: any
}

/**
 * Hook that fetches the stores from the backend, implements infinite scroll pagination.
 * Searching by term is also possible with this hook.
 */
export const useStoresList = (): UseStoresListReturn => {
    const loadMoreElementRef = React.useRef<any>(null);
    const [data, setData] = React.useState<PaginatedData>(
        PAGINATED_DATA_INITIAL_STATE,
    );

    const getGeoLocationFromZipCode = (zipCode: string) => {
        return new Promise((resolve, reject) => {
            GetGeoLocationData(zipCode).then((resp) => {
                if (resp.data.results.length > 0) {
                    const location = resp.data.results[0].geometry.location;
                    resolve({ lat: location.lat, long: location.lng });
                } else {
                    resolve({ lat: undefined, long: undefined });
                }
            });
        });
    };

    /** Fetches the stores incrementally based on the page and search term */
    React.useEffect(() => {
        (async () => {
            setData((prev) => ({ ...prev, isFetchingStores: true }));
            let lat, long;
            if (data.search && isZipcodeValidRegex.test(data.search)) {
                let zipCode = data.search;
                if (data.search.length > 5) {
                    zipCode = `${data.search.slice(0, 5)}-${data.search.slice(
                        5,
                        data.search.length
                    )}`;
                }
                const locationData = (await getGeoLocationFromZipCode(zipCode)) as {
                    lat: string;
                    long: string;
                };
                lat = locationData.lat;
                long = locationData.long;
            }

            const response = await getStores({
                page: data.page,
                search: data.search,
                lat,
                long
            });

            setData((prev) => ({
                ...prev,
                isFetchingStores: false,
                pageCount:
                    response.totalPages === 0 ? prev.pageCount : response.totalPages,
                stores: [...(prev.stores || []), ...response.stores].filter(
                    (store, index) => index === [...(prev.stores || []), ...response.stores].findIndex(
                        other => store.Id === other.Id
                    )),
            }));
        })();
    }, [data.page, data.search]);

    /** Implements intersection observer to handle an UI trigger to fetch more stores when user is scrolling */
    React.useEffect(() => {
        const observer = new IntersectionObserver((entries, observer) => {
            const entry = entries[0];
            entry.isIntersecting &&
                setData((prev) => {
                    const hasNextPage: boolean = prev.page < prev.pageCount;
                    return { ...prev, page: hasNextPage ? prev.page + 1 : prev.page };
                });
        });
        observer.observe(loadMoreElementRef.current);
    }, []);

    const onSearchInputChange = (event: React.ChangeEvent<HTMLInputElement>) =>
        setData({
            ...PAGINATED_DATA_INITIAL_STATE,
            search: event.target.value.trim(),
        });

    const onSearchInputChangeDebounced = debounce(onSearchInputChange, 500);

    const updatePage = () => {
        setData((prev) => {
            const hasNextPage: boolean = prev.page < prev.pageCount;
            return { ...prev, page: hasNextPage ? prev.page + 1 : prev.page };
        });
    }
    return {
        data,
        loadMoreElementRef,
        onSearchInputChange: onSearchInputChangeDebounced,
        updatePage
    };
};
