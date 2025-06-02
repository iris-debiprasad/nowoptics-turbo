import { HeaderConfig } from "./../../../host/src/config/headerConfig";
import axios from "axios";

export interface CcpaRequest {
    firstName: string;
    lastName: string;
    dob: string;
    email: string;
    Telephone: {
        isdCode: string;
        phoneNumber: string;
    },
    SendCopy: boolean;
    DeleteCopy: boolean;
    PromotionalCommunication: boolean;
    Referrer: string;
}

const BASE_URL_REST_API = process.env.NEXT_PUBLIC_BASE_URL + "/";

export const saveCcpaData = (
    data: CcpaRequest,
    recaptchaToken?: string
) => {
    let url = BASE_URL_REST_API + `patient/ccpa`

    return axios.post(url, data, {
        headers: {
            ...HeaderConfig().headers,
            recaptchaToken: recaptchaToken,
        },
    });
}