import dynamic from "next/dynamic";
import Head from "next/head";
import "@root/assets/styles/appointments.scss";
import { useEffect } from "react";
import { useRouter } from "next/router";
import AppointmentsSkeleton from "@/components/skeleton_loader/AppointmentsSkeleton/AppointmentsSkeleton";
import { useTranslation } from "react-i18next";
import { useAppSelector } from "@/store/useStore";
const Appointments = dynamic(() => import("appointments/Appointments"), {
  ssr: false,
  loading: () => <AppointmentsSkeleton />,
});

export default function AppointmentComponent() {
  const { t } = useTranslation();
  const router = useRouter();
  const isCDC = useAppSelector((state) => state.cdcView.data.isCDCView);

  useEffect(() => {
    if (isCDC) {
      router.push("/");
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isCDC]);

  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.APPOINTMENTS`)}</title>
        <meta name="description" content="Appointments" />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <div>
        <Appointments />
      </div>
    </>
  );
}
