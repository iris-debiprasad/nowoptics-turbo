import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CheckoutSkeleton from "@/components/skeleton_loader/checkout/CheckoutSkeleton";
import { useTranslation } from 'react-i18next';

const CheckoutComponent = dynamic(() => import("order/Checkout"), {
  ssr: false,
  loading: () => <CheckoutSkeleton />,
});

const CheckoutPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.CHECKOUT`)}</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <div>
        <CheckoutComponent />
      </div>
    </>
  );
};

export default CheckoutPage;
