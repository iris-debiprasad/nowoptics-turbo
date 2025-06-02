import { SnackBarProvider } from "@/contexts/Snackbar/SnackbarContext";
import { Desktop } from "./desktop";
import { Mobile } from "./mobile";

export default function StantonAccess(): React.JSX.Element {
  return (
    <SnackBarProvider>
      <Mobile />
      <Desktop />
    </SnackBarProvider>
  );
}
