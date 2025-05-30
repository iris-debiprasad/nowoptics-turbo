import type { AppProps } from "next/app";
import "../../../assets/styles/globals.scss";
import { SnackBarProvider } from "../contexts/Snackbar/SnackbarContext";

export default function App({ Component, pageProps }: AppProps) {
  return (
    // TODO - Here we're using SnackBarProvider to wrap the entire app for development purpose only
    <SnackBarProvider>
      <Component {...pageProps} />
    </SnackBarProvider>
  );
}
