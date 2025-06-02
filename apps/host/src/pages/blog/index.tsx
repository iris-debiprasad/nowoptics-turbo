import Blogs from "@/components/static/blogs/blogs";
import Head from "next/head";
import { useTranslation } from 'react-i18next';

const Index = () => {
    const { t } = useTranslation();
    return (
        <>
            <Head>
                <title>{t(`PAGE_TITLE.BLOG`)}</title>
                <meta name="description" content="Stay up to date on the latest trends in eyewear! Read the Stanton Optical Blog for the latest optical industry news, eyeglass fashion, eye health tips, & more!" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <Blogs />
            </main>
        </>
    );
};

export default Index;
