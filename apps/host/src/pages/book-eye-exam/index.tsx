import BookEyeExamSkeleton from "@/components/skeleton_loader/bookEyeExam/BookEyeExamSkeleton";
import { USER_TYPE } from "@/constants/common.constants";
import { checkBrand } from "@/utils/common.utils";
import { getDetails } from "@/utils/getSessionData";
import { Session } from "inspector";
import { useSession } from "next-auth/react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { FunctionComponent, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";

const BookEyeComponent = dynamic(() => import("home/BookEyeExam"), {
  ssr: false,
  loading: () => <BookEyeExamSkeleton />,
}) as FunctionComponent<{ userType: any; brand: string }>;

export default function Patient() {
  const router = useRouter();
  const { t } = useTranslation();
  const [userType, setUserType] = useState(USER_TYPE.ANONYMOUS);

  const [brand, setBrand] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setBrand(checkBrand());
    }
  }, []);

  useEffect(() => {
    getDetails().then((user) => {
      setUserType(
        user?.authData?.userType
          ? user?.authData?.userType
          : USER_TYPE.ANONYMOUS
      );
    });
  }, [typeof window !== "undefined" && localStorage.getItem("session")]);

  useEffect(() => {
    if (userType === USER_TYPE.ASSOCIATE) {
      router.push("/");
    }
  }, [userType]);

  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.BOOK_EYE_EXAM`)}</title>
        <meta
          name="description"
          content="Book an eye exam at Stanton Optical today and get the quality care you deserve. Our experienced optometrists will provide a comprehensive eye exam."
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      {userType !== USER_TYPE.ASSOCIATE && (
        <div>
          <BookEyeComponent
            userType={userType || USER_TYPE.ANONYMOUS}
            brand={brand}
          />
          ;
        </div>
      )}
    </>
  );
}
