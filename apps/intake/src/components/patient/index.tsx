import { SnackBarProvider } from "@/context/SnackbarContext";
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import { GetApiLoadingState } from "@root/host/src/store/reducer/intake.selector";
import { PatientIntakePageProps } from "@root/host/src/types/Intake.types";
import { store } from "@root/host/src/store/store";
import dynamic from "next/dynamic";
import { FC, FunctionComponent, useEffect } from "react";
import { Provider } from "react-redux";
import PatientSetup from "../patientsetup";
import { useRouter } from "next/router";
import {
  RESET_PATIENT_INTAKE_FORM,
  UPDATE_PATIENT_INTAKE_META_DATA,
} from "@root/host/src/store/reducer/intake.slice";
import { getDetails } from "@root/host/src/utils/getSessionData";
import { AppEvents } from "@root/host/src/constants/common.constants";
const BackdropLoader = dynamic(() => import("host/BackdropLoader"), {
  ssr: false,
}) as FunctionComponent<{ openLoader: boolean }>;

const PatientIntake: FC<PatientIntakePageProps> = ({ patientId }) => {
  const dispatch = useAppDispatch();
  const isLoading = useAppSelector((state) => GetApiLoadingState({ ...state }));
  const router = useRouter();
  const id = router.query.key;

  useEffect(() => {
    dispatch(
      UPDATE_PATIENT_INTAKE_META_DATA({
        patientId,
        encryptedAppointmentId: id as string,
        isAnonymous: !!(id && !patientId),
      })
    );

    (async () => {
      const session = await getDetails();
      dispatch(
        UPDATE_PATIENT_INTAKE_META_DATA({
          session,
        })
      );
    })();

    return () => {
      dispatch(
        UPDATE_PATIENT_INTAKE_META_DATA({
          patientId: undefined,
          encryptedAppointmentId: undefined,
          isAnonymous: false,
          session: undefined,
        })
      );
    };
  }, [patientId, id, dispatch]);

  useEffect(() => {
    window.addEventListener(AppEvents.STORE_CHANGE, () => {
      updateStoreDetails();
    });

    return () => {
      window.removeEventListener(AppEvents.STORE_CHANGE, () => {});
    };
  }, []);

  useEffect(() => {
    updateStoreDetails();

    return () => {
      dispatch(RESET_PATIENT_INTAKE_FORM());
    };
  }, []);

  const updateStoreDetails = () => {
    const storeDetails = localStorage.getItem("selectedStore");
    if (storeDetails) {
      dispatch(
        UPDATE_PATIENT_INTAKE_META_DATA({
          storeDetails: JSON.parse(storeDetails),
        })
      );
    }
  };

  return (
    <>
      <BackdropLoader openLoader={isLoading} />
      <PatientSetup />
    </>
  );
};

const Patient: FC<PatientIntakePageProps> = ({ patientId }) => {
  return (
    <Provider store={store}>
        <SnackBarProvider>
          <PatientIntake patientId={patientId} />
        </SnackBarProvider>
    </Provider>
  );
};

export default Patient;
