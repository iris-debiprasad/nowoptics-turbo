import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
const CCReportComp = dynamic(() => import("operationCommand/CCReport"), {
  ssr: false,
  loading: () => (
    <CommonTabsTablePageSkeleton
      rows={5}
      columns={4}
      headSkeletonHeight={20}
      bodySkeletonHieght={30}
    />
  ),
});

function CCReport() {
  return (
    <>
      <Head>
        <title>CC Report | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <CCReportComp />
      </div>
    </>
  );
}

export default CCReport;
