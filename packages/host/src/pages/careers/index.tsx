import React from "react";
import Careers from "@/components/static/careers/Careers";
import { checkBrand } from "@/utils/common.utils";
import { NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";
import { BRAND } from "@/constants/common.constants";

const Index: NextPage = () => {
    const { t } = useTranslation();
    const [brand, setBrand] = React.useState<string>("");

    React.useEffect(() => {
        setBrand(checkBrand());
    }, []);

    const prefix = brand === BRAND.MEL ? "MEL_" : "";

    return (
        <>
            <Head>
                <title>{t(`CAREERS.META.${prefix}TITLE`)}</title>
                <meta
                    name="description"
                    content={t(`CAREERS.META.${prefix}DESCRIPTION`)}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main>
                <Careers />
            </main>
        </>
    );
};

export default Index;
