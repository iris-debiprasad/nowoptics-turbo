import SelfCheckingMedicalIntake from "@/components/selfCheckingMedicalIntake/SelfCheckingMedicalIntake";
import Head from "next/head";
import React from "react";

function index() {

  return (
    <>
      <Head>
        <title>Patient Medical Form | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
         <SelfCheckingMedicalIntake/>
      </div>
    </>
  );
}

export default index;
