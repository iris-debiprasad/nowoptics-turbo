import PrivacyPolicy from "@/components/static/privacy-policy/PrivacyPolicy";
import Head from "next/head";
import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t(`PAGE_TITLE.PRIVACY_POLICY`)}</title>
                <meta name="description" content="Our privacy policies explain how we collect, use, and protect your information. We encourage you to read the policies by scrolling through the page." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            <main>
                <PrivacyPolicy />
            </main>
        </>
    );
};

export default Index;
