import ClinicalSchedulerSkeleton from "@/components/skeleton_loader/operations/ClinicalSchedulerSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";

const ClinicalScheduler = dynamic(
  () => import("appointments/DoctorScheduler"),
  {
    ssr: false,
    loading: () => <ClinicalSchedulerSkeleton />,
  }
);

export default function DoctorSchedulerPage() {
  return (
    <>
      <Head>
        <title>Clinical Scheduler | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <ClinicalScheduler />
      </div>
    </>
  );
}
