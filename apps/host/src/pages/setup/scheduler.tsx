import dynamic from "next/dynamic";
import Head from "next/head";
import SetupSkeleton from "@/components/skeleton_loader/setup/setupSkeleton";

const SchedulerSetupSetupComponent = dynamic(
  () => import("setup/SchedulerSetup"),
  { ssr: false, loading: () => <SetupSkeleton tabsCount={8} /> }
);

export default function SchedulerSetupSetup() {
  return (
    <>
      <Head>
        <title>IRIS | Scheduler Setup</title>
        <meta name="description" content="Scheduler Setup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <SchedulerSetupSetupComponent />
      </main>
    </>
  );
}