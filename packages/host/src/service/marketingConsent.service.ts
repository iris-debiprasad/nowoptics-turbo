import { HeaderConfig } from "@root/host/src/config/headerConfig";
import { CommonUrlConstants } from "@root/host/src/constants/common.url.constants";
import axios from "axios";

export interface MarketingConsentData {
    'English': string,
    'Spanish': string
}

export const getMarketingConsentConfig = async () =>
    await axios.get(
        CommonUrlConstants.GET_RX_RENEWAL_TIMING_CONFIG.replace(
            "{0}",
            "SmsOptInMessage"
        ),
        HeaderConfig()
    );