import Head from "next/head";
import PrescriptionRenewal from "@/components/static/prescription-renewal/prescription-renewal";

const Index = () => {
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
