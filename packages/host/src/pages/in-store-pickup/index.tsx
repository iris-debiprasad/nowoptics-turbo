import { GetServerSideProps, NextPage } from "next";
import Head from "next/head";
import { useTranslation } from "react-i18next";

import {
    BopisLP,
    getFrames,
    FramesCarouselProps,
} from "@/components/static/bopis";

interface Props extends FramesCarouselProps { }

const InStorePickupPage: NextPage<Props> = ({ frames }): JSX.Element => {
    const { t } = useTranslation();

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <title>{t("BOPIS.METATITLE")}</title>
                <meta name="description" content={t("BOPIS.METADESCRIPTION")} />
            </Head>

            <main>
                <BopisLP {...{ frames }} />
            </main>
        </>
    );
};

export const getServerSideProps = (async () => {
    const frames = await getFrames();
    return { props: { frames } };
}) satisfies GetServerSideProps<Props>;

export default InStorePickupPage;
