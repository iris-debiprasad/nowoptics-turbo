import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const VirtualOptician = dynamic(
  () => import("operationCommand/VirtualOptician"),
  {
    ssr: false,
    loading: () => (
      <CommonTabsTablePageSkeleton
        rows={5}
        columns={4}
        headSkeletonHeight={20}
        bodySkeletonHieght={30}
        showTabs={true}
        tabsCount={3}
      />
    ),
  }
);

export default function VirtualOpticianPage() {
  return (
    <>
      <Head>
        <title>Virtual Optician | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <VirtualOptician />
      </div>
    </>
  );
}
