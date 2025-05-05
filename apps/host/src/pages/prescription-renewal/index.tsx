import Head from "next/head";
import PrescriptionRenewal from "@/components/static/prescription-renewal/prescription-renewal";
import { useContext, useEffect } from "react";
import { useRouter } from "next/router";
import { RuntimeVarContext } from "@/contexts/RuntimeVarContext";

const Index = () => {
  const router = useRouter();
  const env = useContext(RuntimeVarContext);
  useEffect(() => {
    if (env?.NEXT_PUBLIC_RX_RENEWAL_ENABLE === "false") {
      router.push("/");
    }
  }, [env?.NEXT_PUBLIC_RX_RENEWAL_ENABLE]);
  return (
    <>
      <Head>
        <title>Prescription Renewal </title>
        <meta
          name="description"
          content=""
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <PrescriptionRenewal />
      </main>
    </>
  );
};

export default Index;
