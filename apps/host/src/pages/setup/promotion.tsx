import dynamic from "next/dynamic";
import Head from "next/head";
import SetupSkeleton from "@/components/skeleton_loader/setup/setupSkeleton";

const PromotionSetupComponent = dynamic(() => import("setup/Promotion"), {
  ssr: false,
  loading: () => <SetupSkeleton tabsCount={3} />,
});

export default function PromotionSetup() {
  return (
    <>
      <Head>
        <title>IRIS | Promotion Setup</title>
        <meta name="description" content="Promotion Setup" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <PromotionSetupComponent />
      </main>
    </>
  );
}
