import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useTranslation } from 'react-i18next';
// const SetupPage = dynamic(() => import("intake/Setup"), {
//   ssr: false,
//   loading: () => <BackdropLoader openLoader={true} />,
// });
import SetupPage from "intake/Setup";

export default function Setup() {
  const { t } = useTranslation();
  return (
    <>
      <Head>
        <title>{t(`PAGE_TITLE.INTAKE`)}</title>
        <meta
          name="description"
          content="We provide easy eye care. Prescription eyeglasses, sunglasses &amp; contacts at the lowest prices ✅ Book your eye exam or shop online now!"
        />
        <meta name="keywords" content="" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />

      </Head>
      <SetupPage />
    </>
  );
}
