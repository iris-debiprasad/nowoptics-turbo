import { useDetectMobileDevice } from "@/hooks/useDetectMobileDevice";
import { unformatPhoneNumber } from "@/utils/common.utils";

/**
 * Component that will display a telephone number, it implements a hook that will detect if the user device
 * is a mobile device, if it is, it will display the telephone number wrapped with an 'Anchor' tag to open
 * the phone dialer, if the device is not a mobile device, it will only display the telephone in text
 */
export const TelephoneNumber = ({
    telephone,
}: {
    telephone: string;
}): JSX.Element => {
    const isDeviceAMobile: boolean = useDetectMobileDevice();

    if (!isDeviceAMobile) return <>{telephone}</>;

    return <a href={`tel:${unformatPhoneNumber(telephone)}`}>{telephone}</a>;
};

TelephoneNumber.displayName = "TelephoneNumber";
