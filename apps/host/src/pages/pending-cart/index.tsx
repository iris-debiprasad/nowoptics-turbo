import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { FunctionComponent } from "react";
const PendingCart = dynamic(() => import("order/PendingCart"), {
  ssr: false,
  loading: () => (
    <CommonTabsTablePageSkeleton
      rows={5}
      columns={10}
      headSkeletonHeight={20}
      bodySkeletonHieght={40}
    />
  ),
}) as FunctionComponent<any>;

function PendingCartPage() {
  return (
    <>
      <Head>
        <title>Pending Cart | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <PendingCart />
      </div>
    </>
  );
}

export default PendingCartPage;
