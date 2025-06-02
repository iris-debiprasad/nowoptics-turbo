import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import React from "react";

const ContactLensCalculatorComponent = dynamic(
  () => import("order/ContactLensCalculator"),
  {
    ssr: false,
    loading: () => (
      <CommonTabsTablePageSkeleton
        rows={5}
        columns={10}
        headSkeletonHeight={20}
        bodySkeletonHieght={30}
      />
    ),
  }
);

function ContactLensCalculator() {
  return (
    <>
      <Head>
        <title>Contact Lens Calculator | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <ContactLensCalculatorComponent />
    </>
  );
}

export default ContactLensCalculator;
