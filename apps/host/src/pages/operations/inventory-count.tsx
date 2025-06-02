import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import CommonTabsTablePageSkeleton from "@/components/skeleton_loader/CommonTablePageSkeleton/CommonTabsTablePageSkeleton";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const InventoryComponent = dynamic(() => import("inventory/InventoryCount"), {
  ssr: false,
  loading: () => (
    <CommonTabsTablePageSkeleton
      rows={10}
      columns={7}
      headSkeletonHeight={20}
      bodySkeletonHieght={30}
    />
  ),
});

function InventoryCount() {
  const selectedStore =
    typeof window !== "undefined" && localStorage.getItem("selectedStore");
  const router = useRouter();

  useEffect(() => {
    if (selectedStore) {
      const isDoctorStore = JSON.parse(selectedStore)?.StoreType === "D";
      if (isDoctorStore) {
        router.push("/");
      }
    }
  }, [selectedStore]);
  return (
    <>
      <Head>
        <title>Inventory Count | Stanton Optical</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <InventoryComponent />
      </div>
    </>
  );
}

export default InventoryCount;
