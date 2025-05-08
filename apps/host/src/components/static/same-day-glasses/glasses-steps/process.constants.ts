import { UseTranslationResponse } from "react-i18next";
import { ImageUrlConstants } from "@root/host/src/constants/image.url.constants";

const STEP_IMAGES = ImageUrlConstants.PROCESS;

interface ProcessItem {
    description: string;
    image: { alt: string; src: string };
    title: string;
}

export const GLASSES_STEPS = ({
    t,
}: UseTranslationResponse<"translation", undefined>): ProcessItem[] => [
        {
            description: t("SAME_DAY_GLASSES.STEP_1_DESCRIPTION"),
            image: {
                alt: t("SAME_DAY_GLASSES.STEP_1_ALT"),
                src: STEP_IMAGES.STEP_1,
            },
            title: t("SAME_DAY_GLASSES.STEP_1_TITLE"),
        },
        {
            description: t("SAME_DAY_GLASSES.STEP_2_DESCRIPTION"),
            image: {
                alt: t("SAME_DAY_GLASSES.STEP_2_ALT"),
                src: STEP_IMAGES.STEP_2,
            },
            title: t("SAME_DAY_GLASSES.STEP_2_TITLE"),
        },
        {
            description: t("SAME_DAY_GLASSES.STEP_3_DESCRIPTION"),
            image: {
                alt: t("SAME_DAY_GLASSES.STEP_3_ALT"),
                src: STEP_IMAGES.STEP_3,
            },
            title: t("SAME_DAY_GLASSES.STEP_3_TITLE"),
        },
    ];
