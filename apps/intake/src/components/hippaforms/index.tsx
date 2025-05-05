import {
  useLazyDownloadDefaultHippaFileQuery,
  useLazyDownloadStateHippaFileQuery,
} from "@root/host/src/store/reducer/intakeApi.slice";
import { saveByteArray } from "@root/host/src/utils/intake.utils";
import type { BreadcrumbProps } from "@root/host/src/types/Breadcrumb.types";
import dynamic from "next/dynamic";
import { FunctionComponent, memo, useCallback } from "react";
import styles from "./HippaForms.module.scss";
import DefaultTable from "./defaultable";
import StateTable from "./statetable";
import { SnackBarProvider } from "@/context/SnackbarContext";
import { store } from "@root/host/src/store/store";
import { Provider } from "react-redux";
import { useAppSelector } from "@root/host/src/hooks/useStore";
import { GetApiLoadingState } from "@root/host/src/store/reducer/intake.selector";
import usePermission from "@root/host/src/hooks/usePermission";
import { IntakePermission } from "@/constants/intake-permission.constant";
const Breadcrumb = dynamic(() => import("host/Breadcrumb"), {
  ssr: false,
}) as FunctionComponent<BreadcrumbProps>;
const BackdropLoader = dynamic(() => import("host/BackdropLoader"), {
  ssr: false,
}) as FunctionComponent<{ openLoader: boolean }>;

const HippaForms = () => {
  const isLoading = useAppSelector((state) => GetApiLoadingState({ ...state }));
  const [downloadDefaultHippaFile] = useLazyDownloadDefaultHippaFileQuery();
  const [downloadStateHippaFile] = useLazyDownloadStateHippaFileQuery();

  const handleDownloadHippaFile = useCallback(
    async (hippaFormId: number | null, type: "Default" | "State") => {
      if (hippaFormId === null) return;
      const result = await (type === "Default"
        ? downloadDefaultHippaFile
        : downloadStateHippaFile)({ hippaFormId });
      if (result?.data) {
        saveByteArray(
          result.data.Result.BlobFile.FileContents,
          result.data.Result.BlobFile.FileDownloadName
        );
      }
    },
    [downloadDefaultHippaFile, downloadStateHippaFile]
  );

  return (
    <>
      <BackdropLoader openLoader={isLoading} />
      <Breadcrumb
        links={[
          {
            label: "Home",
            href: "/",
          },
          {
            label: "Medical Form",
            href: "/intake",
          },
          {
            label: "Privacy and Consent",
            href: "/intake/hipaa",
          },
        ]}
      />
      <div className={styles.hippaFormsPage}>
        <div className={styles.pageHeader}>
          <p>Medical Forms</p>
        </div>
        <div className="cardSection">
          <div className={styles.header}>
            <span className="iris_table_heading">Set Availability</span>
          </div>

          <DefaultTable handleDownloadHippaFile={handleDownloadHippaFile} />

          <div className={styles.divider}></div>
          <StateTable handleDownloadHippaFile={handleDownloadHippaFile} />
        </div>
      </div>
    </>
  );
};

export default function HippaRoot() {
  usePermission({
    ...IntakePermission.HIPAA,
  });

  return (
    <Provider store={store}>
      <SnackBarProvider>
        <HippaForms />
      </SnackBarProvider>
    </Provider>
  );
}
