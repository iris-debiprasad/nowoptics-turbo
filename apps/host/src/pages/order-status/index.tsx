import OrderStatusSkeleton from "@/components/skeleton_loader/order/OrderStatusSkeleton/OrderStatusSkeleton";
import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";
import dynamic from "next/dynamic";
import Head from "next/head";
import { FunctionComponent } from "react";
import { useTranslation } from 'react-i18next';

const CheckOrderStatus = dynamic(() => import("order/CheckOrderStatus"), {
  ssr: false,
  loading: () => <OrderStatusSkeleton />,
}) as FunctionComponent<any>;

function OrderStatus() {
  const { t } = useTranslation();
  return (
    <>
      <SnackBarProvider>
        <Head>
          <title>{t(`PAGE_TITLE.ORDER_STATUS`)}</title>
          <meta
            name="description"
            content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
          />
          <meta name="keywords" content="" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <div>
          <CheckOrderStatus />
        </div>
      </SnackBarProvider>
    </>
  );
}

export default OrderStatus;
