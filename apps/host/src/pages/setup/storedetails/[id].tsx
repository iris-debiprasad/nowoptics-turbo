import dynamic from "next/dynamic";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";

const StoreDetailsSetupComponent = dynamic(
  () => import("setup/StoreDetailsSetup"),
  { ssr: false ,
    loading: () => <BackdropLoader openLoader={true} />,
  }
);

export default function StoreDetailsSetup() {
  return <StoreDetailsSetupComponent />;
}
