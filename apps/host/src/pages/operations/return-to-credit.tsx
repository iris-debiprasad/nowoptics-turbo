import Head from "next/head";
import React from "react";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";

const ReturnToCredit = dynamic(
  () => import("inventory/ReturnToCredit"),
  {
    ssr: false,
    loading: () => (
      <CommonTabsTablePageSkeleton
        rows={5}
        columns={8}
        headSkeletonHeight={20}
        bodySkeletonHieght={30}
      />
    ),
  }
);

function Credit() {
  return (
    <>
      <Head>
        <title>Return To Credit | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <ReturnToCredit />
    </>
  );
}

export default Credit;
