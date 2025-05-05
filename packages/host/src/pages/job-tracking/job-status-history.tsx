import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { useEffect } from "react";
const JobStatusHistoryComponent = dynamic(() => import("order/JobHistory"), {
  ssr: false,
  loading: () => (
    <CommonTabsTablePageSkeleton
      rows={5}
      columns={10}
      headSkeletonHeight={20}
      bodySkeletonHieght={30}
    />
  ),
});
import { useRouter } from "next/router";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
function JobStatusHistory() {
  const router = useRouter();
  useEffect(() => {
    let isCDCUser = false;
    if (
      localStorage?.getItem("isCDCUser") !== undefined &&
      localStorage.getItem("isCDCUser") === "1"
    ) {
      isCDCUser = true;
    } else {
      isCDCUser = false;
    }

    if (!isCDCUser) {
      router.push("/");
    }
  }, []);
  return (
    <>
      <Head>
        <title>Job Status History | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <JobStatusHistoryComponent />
    </>
  );
}

export default JobStatusHistory;
