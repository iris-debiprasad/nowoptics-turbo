import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import JobStatusSkeleton from "@/components/skeleton_loader/job/JobStatusSkeleton/JobStatusSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";
const JobStatusComponent = dynamic(() => import("order/JobStatus"), {
  ssr: false,
  loading: () => <JobStatusSkeleton />,
});
function JobStatus() {
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
        <title>Job Status | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <JobStatusComponent />
    </>
  );
}

export default JobStatus;
