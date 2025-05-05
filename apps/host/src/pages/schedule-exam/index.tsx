import ScheduleExamSkeleton from "@/components/skeleton_loader/scheduleExam/ScheduleExamSkeleton";
import { useGetBrand } from "@/hooks/useGetBrand";
import dynamic from "next/dynamic";
import Head from "next/head";
import React, { FunctionComponent, useEffect } from "react";
import { ISearchStoreProps } from "@root/home/src/types/searchPage.types";
import { useAppSelector } from "@/hooks/useStore";
import { useRouter } from "next/router";

const SearchStoreComponents = dynamic(() => import("home/SearchStore"), {
  ssr: false,
  loading: () => <ScheduleExamSkeleton />,
}) as FunctionComponent<ISearchStoreProps>;

export default function SearchStore() {
  const isAgent = useAppSelector((state: any) => state?.cdcView?.data?.isAgent);
  const router = useRouter();
  const brand = useGetBrand();

  useEffect(() => {
    if (router.pathname.startsWith("/schedule-exam") && isAgent) {
      router.replace("/");
    }
  }, [router, isAgent])

  return (
    <>
      <Head>
        <title>Stanton Optical Locations Near You - Book Eye Exam Online</title>
        <meta
          name="description"
          content="Find Stanton Optical store locations near you and schedule your eye exam today! Our optometrists will provide perfect vision care and prescription. "
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <SearchStoreComponents brand={brand} />
      </div>
    </>
  );
}
