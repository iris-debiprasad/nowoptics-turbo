import OurGuarantee from "@/components/static/our-guarantee/OurGuarantee";
import { BRAND } from "@/constants/common.constants";
import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

export interface GuaranteePageProps {
    isSO: boolean;
    brandPrefix: string;
}

const Index: NextPage<GuaranteePageProps> = (props) => {
    const { brandPrefix } = props;
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <title>{t(`OUR_GUARANTEE.META.${brandPrefix}TITLE`)}</title>
                <meta
                    name="description"
                    content={t(`OUR_GUARANTEE.META.${brandPrefix}DESCRIPTION`)}
                />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>
            <main>
                <OurGuarantee {...props} />
            </main>
        </>
    );
};

export const getServerSideProps = (async ({ req }) => {
    const isSO: boolean = !(req.headers.host || "").includes("myeyelab");
    return { props: { isSO, brandPrefix: isSO ? "" : `${BRAND.MEL}_` } };
}) satisfies GetServerSideProps<GuaranteePageProps>;

export default Index;
