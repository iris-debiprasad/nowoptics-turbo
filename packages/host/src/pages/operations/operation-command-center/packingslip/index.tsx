import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
const PackingSlipComponent = dynamic(
  () => import("operationCommand/PackingSlip"),
  {
    ssr: false,
    loading: () => (
      <CommonTabsTablePageSkeleton
        rows={10}
        columns={6}
        headSkeletonHeight={20}
        bodySkeletonHieght={40}
        showTabs={true}
        tabsCount={2}
      />
    ),
  }
);

const PackingSlip = () => {
  return (
    <>
      <Head>
        <title>Packing Slip | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <PackingSlipComponent />
      </div>
    </>
  );
};

export default PackingSlip;
