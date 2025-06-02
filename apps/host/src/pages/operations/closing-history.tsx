import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import ClosingHistorySkeleton from "@/components/skeleton_loader/operations/ClosingHistorySkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";
const ClosingHistoryComponent = dynamic(() => import("operationCommand/ClosingHistory"), {
  ssr: false,
  loading: () => <ClosingHistorySkeleton />,
});

function ClosingHistory() {
  return (
    <>
      <Head>
        <title>ClosingHistory | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ClosingHistoryComponent />
    </>
  );
}

export default ClosingHistory;
