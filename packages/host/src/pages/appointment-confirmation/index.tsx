import type { InferGetServerSidePropsType, GetServerSideProps } from "next";
import { AppointmentConfirmation } from "@/components/static/appointment-confirmation";
import Head from "next/head";
import { AppointmentConfirmationData } from "@/types/appointmentConfirmation.types";
import {
  APPOINTMENT_CONFIRMATION_COOKIE_DATA,
  APPOINTMENT_CONFIRMATION_COOKIE_FLOW,
} from "@/constants/book-eye-exam-flow.constants";
import React from "react";
import { useTranslation } from "react-i18next";

export const getServerSideProps = (async (ctx) => {
  const data: string | undefined =
    ctx.req.cookies[APPOINTMENT_CONFIRMATION_COOKIE_DATA];

  const userComesFromStraightRedirection: string | undefined =
    ctx.req.cookies[APPOINTMENT_CONFIRMATION_COOKIE_FLOW.STRAIGHT_REDIRECTION];

  const userComesFromIntakeFormRedirection: string | undefined =
    ctx.req.cookies[
    APPOINTMENT_CONFIRMATION_COOKIE_FLOW.INTAKE_FORM_REDIRECTION
    ];

  const userComesFromBEEFlow =
    userComesFromStraightRedirection !== undefined ||
    userComesFromIntakeFormRedirection !== undefined;
  
  // In case any workflow cookie does not exist, means that workflow is not being used
  // Therefore, user should not enter this page
  if (!userComesFromBEEFlow || !data)
    return {
      redirect: {
        permanent: false,
        destination: "/",
      },
    };

  const dataJSON: AppointmentConfirmationData = JSON.parse(data);

  return { props: { data: dataJSON } };
}) satisfies GetServerSideProps<{ data: AppointmentConfirmationData }>;

export default function AppointmentConfirmationPage({
  data,
}: InferGetServerSidePropsType<typeof getServerSideProps>): React.JSX.Element {
  const { t } = useTranslation();

  return (
    <>
      <Head>
        <title>{t("APPOINTMENT_CONFIRMATION.META.TITLE")}</title>
        <meta
          name="description"
          content={t("APPOINTMENT_CONFIRMATION.META.DESCRIPTION")}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      <main>
        <AppointmentConfirmation {...{ data }} />
      </main>
    </>
  );
}
