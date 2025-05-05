import dynamic from "next/dynamic";
import Head from "next/head";
import StoreSetupSkeleton from "@/components/skeleton_loader/setup/setupSkeleton";
import { FC, useContext } from "react";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

const StoreSetupComponent = dynamic(() => import("setup/Store"), {
	ssr: false,
	loading: () => <StoreSetupSkeleton tabsCount={5} />
}) as FC<{ env: { [key: string]: string | undefined; } | null }>;

export default function Setup({ env }: { env: { [key: string]: string | undefined; } | null }) {
	return (
		<>
			<Head>
				<title>IRIS | Store Setup</title>
				<meta name="description" content="Store Setup" />
				<meta name="viewport" content="width=device-width, initial-scale=1" />
				
			</Head>
			<main>
				<StoreSetupComponent env={env}/>
			</main>
		</>
	)
}