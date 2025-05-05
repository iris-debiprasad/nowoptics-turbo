import dynamic from "next/dynamic";
import React from "react";
import Head from "next/head";
import CheckoutConfirmationSkeleton from "@/components/skeleton_loader/checkoutConfirmationSkeleton/CheckoutConfirmationSkeleton";
import { useTranslation } from 'react-i18next';

const CheckoutConfirmationComponent = dynamic(() => import("order/OrderSummary"), {
  ssr: false,
  loading: () => <CheckoutConfirmationSkeleton />,
});

const CheckoutConfirmationPage = () => {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.CHECKOUT_CONFIRMATION`)}</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <CheckoutConfirmationComponent />
      </div>
    </>
  );
};

export default CheckoutConfirmationPage;
