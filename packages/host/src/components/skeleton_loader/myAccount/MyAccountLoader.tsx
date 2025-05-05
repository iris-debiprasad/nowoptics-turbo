import { useRouter } from "next/router";
import React from "react";
import MyAccountProfileSkeleton from "./myProfile/MyAccountProfileSkeleton";
import MyAccountTableSkeleton from "./myAccountTable/MyAccountTableSkeleton";
import MyAccountExamFormSkeleton from "./examForm/MyAccountExamFormSkeleton";
import MyAccountLoyaltyClubSkeleton from "./loyaltyClub/MyAccountLoyaltyClubSkeleton";

function MyAccountLoader() {
  const { menuItem } = useRouter().query;
  const skeletonLoaders: any = {
    "my-profile": <MyAccountProfileSkeleton />,
    "my-appointments": <MyAccountTableSkeleton />,
    "my-prescriptions": <MyAccountTableSkeleton />,
    "my-favorites": <MyAccountTableSkeleton />,
    "order-history": <MyAccountTableSkeleton />,
    "after-visit-summary": <MyAccountTableSkeleton />,
    "exam-intake-form": <MyAccountExamFormSkeleton />,
    "eye-health": <MyAccountTableSkeleton />,
    "loyalty-club": <MyAccountLoyaltyClubSkeleton />,
  };
  return <>{skeletonLoaders[menuItem as string]}</>;
}

export default MyAccountLoader;
