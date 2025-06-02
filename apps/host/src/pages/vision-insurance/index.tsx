import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import { VisionInsurance } from "@/components/static/vision-insurance";
import { useTranslation } from "react-i18next";
import { checkBrand } from "@root/host/src/utils/common.utils";
import { BRAND } from "@root/host/src/constants/common.constants";

const VisionInsurancePage: NextPage = (): JSX.Element => {
    const { t } = useTranslation();
    const [brand, setBrand] = React.useState<string>("");

    React.useEffect(() => {
        setBrand(checkBrand());
    }, []);

    const prefix = brand === BRAND.MEL ? "MEL_" : "";

    return (
        <>
            <Head>
                <title>{t(`VISION_INSURANCE.META.${prefix}TITLE`)}</title>
                <meta
                    name="description"
                    content={t(`VISION_INSURANCE.META.${prefix}DESCRIPTION`)}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main>
                <VisionInsurance />
            </main>
        </>
    );
};

export default VisionInsurancePage;
