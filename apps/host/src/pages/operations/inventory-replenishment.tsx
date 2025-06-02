import Head from "next/head";
import React from "react";
import dynamic from "next/dynamic";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";

const InventoryReplenishmentsComponent = dynamic(
  () => import("inventory/InventoryReplenishments"),
  {
    ssr: false,
    loading: () => (
      <CommonTabsTablePageSkeleton
        rows={5}
        columns={7}
        headSkeletonHeight={20}
        bodySkeletonHieght={30}
      />
    ),
  }
);

function InventoryReplenishment() {
  return (
    <>
      <Head>
        <title>Inventory Replenishment | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <InventoryReplenishmentsComponent />
    </>
  );
}

export default InventoryReplenishment;
