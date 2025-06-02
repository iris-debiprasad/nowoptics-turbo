import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import PatientSkeleton from "@/components/skeleton_loader/patient/PatientSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";

const PatientComponent = dynamic(() => import("patient/Home"), {
  ssr: false,
  loading: () => <PatientSkeleton showTopBar={true} />,
});

export default function Patient() {
  return (
    <>
      <Head>
        <title>Patient | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <PatientComponent />
      </div>
    </>
  );
}
