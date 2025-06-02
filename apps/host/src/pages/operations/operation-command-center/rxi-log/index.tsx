import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const RemoteRXILogs = dynamic(() => import("operationCommand/RXILogs"), {
  ssr: false,
  loading: () => (
    <CommonTabsTablePageSkeleton
      rows={15}
      columns={7}
      headSkeletonHeight={20}
      bodySkeletonHieght={30}
    />
  ),
});

function RXILogs() {
  return (
    <>
      <Head>
        <title>RXI Logs | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <RemoteRXILogs />
      </div>
    </>
  );
}

export default RXILogs;
