import React from "react";
import Head from "next/head";
import type { NextPage } from "next";
import dynamic from "next/dynamic";

const SitemapsComponent = dynamic(
    () => import("@/components/static/sitemap/sitemap"),
    { ssr: true }
);

const SitemapPage: NextPage = (): JSX.Element => {
    return (
        <>
            <Head>
                <title>Sitemap - Stanton Optical</title>
                <meta name="description" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
            </Head>

            <main>
                <SitemapsComponent />
            </main>
        </>
    );
};

export default SitemapPage;
