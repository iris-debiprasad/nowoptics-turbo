import { isMobileDevice } from "@/utils/common.utils";
import React from "react";

/**
 * Hook that will detect if the device is a mobile device (Cellphone), hook has to run on client only
 * That is why the effect is used for.
 *
 * @returns boolean that represents if the device is mobile or not
 * */
export const useDetectMobileDevice = (): boolean => {
    const [isDeviceAPhone, setIsDeviceAPhone] = React.useState<boolean>(false);

    React.useEffect(() => {
        setIsDeviceAPhone(isMobileDevice());
        return () => setIsDeviceAPhone(false);
    }, []);

    return isDeviceAPhone;
};
