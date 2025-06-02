import dynamic from "next/dynamic";
import Head from "next/head";
import WalkInSkeleton from "@/components/skeleton_loader/walkIn/WalkInSkeleton";
const WalkIn = dynamic(() => import("appointments/WalkIn"), {
  ssr: false,
  loading: () => <WalkInSkeleton />,
});

export default function AppointmentComponent() {
  return (
    <>
      <Head>
        <title>Walk In | Stanton Optical</title>
        <meta name="description" content="Appointments" />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <WalkIn />
      </div>
    </>
  );
}
