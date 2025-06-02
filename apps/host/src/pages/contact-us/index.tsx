import ContactUs from "@/components/static/contact-us/contact-us";
import Head from "next/head";
import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t(`PAGE_TITLE.CONTACT_STANTON_OPTICAL`)}</title>
                <meta name="description" content="Need an eye exam, glasses, or contact lenses? Call our Customer Support team and they can assist you with any questions. Shop online or visit one of our stores." />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <ContactUs />
            </main>
        </>
    );
};

export default Index;
