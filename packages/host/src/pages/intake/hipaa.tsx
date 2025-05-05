import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useTranslation } from 'react-i18next';

const HippaForms = dynamic(() => import("intake/HippaForms"), {
  ssr: false,
  loading: () => (
    <CommonTabsTablePageSkeleton
      rows={5}
      columns={7}
      headSkeletonHeight={20}
      bodySkeletonHieght={30}
    />
  ),
});

const Hippa = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.INTAKE`)}</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <HippaForms />
    </>
  );
};

export default Hippa;
