import Head from "next/head";
import type { NextPage } from "next";
import WhatToExpect from "@/components/static/what-to-expect/what-to-expect";
import { useTranslation } from 'react-i18next';

const WhatToExpectPage: NextPage = (): JSX.Element => {
  const { t } = useTranslation();
  return <>
    <Head>
      <title>{t(`PAGE_TITLE.WHAT_TO_EXPECT`)}</title>
      <meta
        name="description"
        content="A regular eye exam is important to protect and preserve your vision. Learn what to expect during your FREE eye exam at Stanton Optical."
      />
      <meta name="viewport" content="width=device-width, initial-scale=1" />
    </Head>

    <main>
      <WhatToExpect />
    </main>
  </>
};

export default WhatToExpectPage;
