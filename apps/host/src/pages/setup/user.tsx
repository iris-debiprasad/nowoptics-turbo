import dynamic from "next/dynamic"
import Head from "next/head";
import SetupSkeleton from "@/components/skeleton_loader/setup/setupSkeleton";

const UserSetupComponent = dynamic(() => import("setup/UserTabPanel"), {
    ssr: false,
    loading: () => <SetupSkeleton tabsCount={3} />
})

export default function UserSetup() {
    return (
        <>
            <Head>
                <title>User Setup and Permission | Stanton Optical</title>
                <meta name="description" content="We provide User Setup and Permission list and operations(add new)!" />
                <meta name="keywords" content="" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />

            </Head>
            <div>
                <UserSetupComponent />
            </div>
        </>
    )
}