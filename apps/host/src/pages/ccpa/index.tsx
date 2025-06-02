import Head from "next/head";
import type { NextPage } from "next";
import Ccpa from "@/components/static/ccpa/ccpa";
import { useTranslation } from 'react-i18next';

const CcpaPage: NextPage = (): JSX.Element => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t(`PAGE_TITLE.CCPA_FORM`)}</title>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main>
                <Ccpa />
            </main>
        </>
    )
};

export default CcpaPage;
