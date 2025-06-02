import React from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import SetupSkeleton from "@/components/skeleton_loader/setup/setupSkeleton";

const DistributionCenter = dynamic(() => import("setup/DCSetup"), {
  ssr: false,
  loading: () => <SetupSkeleton tabsCount={0} />
});

export default function DcSetup() {
  return (
    <>
      <Head>
        <title>IRIS | Distribution Center Setup</title>
        <meta name="description" content="Distribution Center Setup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        
      </Head>
      <main>
        <DistributionCenter />
      </main>
    </>
  );
}
