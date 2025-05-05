import dynamic from "next/dynamic";
import Head from "next/head";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
const SelfCheckIn = dynamic(() => import("appointments/SelfCheckIn"), {
  ssr: false,
  loading: () => (
    <CommonTabsTablePageSkeleton
      rows={10}
      columns={6}
      headSkeletonHeight={20}
      bodySkeletonHieght={40}
    />
  ),
});

export default function AppointmentComponent() {
  return (
    <>
      <Head>
        <title>Self Check In | Stanton Optical</title>
        <meta name="description" content="Appointments" />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <SelfCheckIn />
      </div>
    </>
  );
}
