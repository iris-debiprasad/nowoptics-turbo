import { useSnackBar } from "@root/intake/src/context/SnackbarContext";
import * as appStore from "@root/host/src/store/useStore"
import { useAppDispatch, useAppSelector } from "@root/host/src/hooks/useStore";
import { GetEditStateForUser, GetPatientIntakeStepper, IsCurrentStepUpdated } from "@root/host/src/store/reducer/intake.selector";
import { TOGGLE_PATIENT_INTAKE_EDITING } from "@root/host/src/store/reducer/intake.slice";
import {
  useGetPatientInformationQuery,
  useGetPatientIntakeFormQuery,
} from "@root/host/src/store/reducer/intakeApi.slice";
import { ErrorResponseType } from "@root/host/src/types/intakeApi.types";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { DATE_TIME_12H_FORMAT, DATE_TIME_24H_FORMAT, USER_TYPE } from "@root/host/src/constants/common.constants";
import dayjs from "dayjs";
import { useEffect, useMemo } from "react";
import Customstepper from "../common/customstepper";
import StepSwitcher from "../stepswitcher";
import styles from "./PatientSetup.module.scss";
import { IntakePermission } from "@root/intake/src/constants/intake-permission.constant";
import { GetPermissionConfig } from "@root/host/src/config/permissionConfig";

const PatientSetup = () => {
  const isCDC = appStore.useAppSelector((state) => state.cdcView.data.isCDCView);
  const [canCompletePatientIntake] = appStore.useAppSelector((state) =>
  GetPermissionConfig({
    ...state,
    permissionName: [IntakePermission.COMPLETE_PATIENT_INTAKE],
  })
) as boolean[];
  const { showSnackBar } = useSnackBar();
  const dispatch = useAppDispatch();
  const { activeStep, steps } = useAppSelector((state) =>
    GetPatientIntakeStepper({ ...state })
  );
  const { editing } = useAppSelector(
    (state) => state.intake.patientIntakeForm
  );
  const intakeMetaData = useAppSelector(
    (state) => state.intake.patientIntakeMetaData
  );

  const IsCurrentStepModified = useAppSelector(
    (state) => IsCurrentStepUpdated({ ...state, activeStep })
  );
  const isPatient = Boolean(
    intakeMetaData.session?.authData?.userType === USER_TYPE.PATIENT
  );

  const isAssociate = Boolean(
    intakeMetaData.session?.authData?.userType === USER_TYPE.ASSOCIATE
  );

  const skipRequest = useMemo(() => {
    const { isAnonymous, patientId } = intakeMetaData;

    // If user is anonymous, no need to skip request
    if(isAnonymous) return false;

    // if user is not anonymous and is patient or is associate, no need to skip request
    if(!isAnonymous) {
      if(isPatient) return false;

      if(isAssociate) {
        return !patientId;
      } 
    }

    // if user is not anonymous and not a patient and not an associate, skip the request
    return true;
  }, [intakeMetaData, isPatient, isAssociate]);


  const {
    data,
    isError: isFormFetchError,
    isFetching: isFormFetching,
    error,
    isLoading,
    
  } = useGetPatientIntakeFormQuery(
    {
      ...intakeMetaData,
      isPatient,
    },
    {
      skip: skipRequest,
    }
  );

  useGetPatientInformationQuery(
    {
      ...intakeMetaData,
      isPatient,
    },
    {
      skip: skipRequest,
    }
  );

  const handleIntakeFormEdit = () => {
    dispatch(TOGGLE_PATIENT_INTAKE_EDITING({ flag: true }));
  };

  const fetchError = error && (error as ErrorResponseType).status === 404 && (error as ErrorResponseType).data?.Error?.Message

  useEffect(() => {
    if (isFormFetchError && !isFormFetching) {
      const err = error as ErrorResponseType;
      if(err.status !== 404) {
        showSnackBar(
          (error as ErrorResponseType)?.data?.Error?.Message ??
            ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
          "error"
        );
      }
      
    }
  }, [isFormFetchError, error, isFormFetching]);
  
  // prevent user from closing tab or browser 
  // and show a warning message if user tries to close the tab
  useEffect(() => {
    const handleBeforeUnload = (e: BeforeUnloadEvent) => {
      if (editing && IsCurrentStepModified) {
        e.preventDefault();
        e.returnValue = "";
      }
    };

    window.addEventListener("beforeunload", handleBeforeUnload);

    return () => {
      window.removeEventListener("beforeunload", handleBeforeUnload);
    };
  }, [editing, IsCurrentStepModified]);


  return (
    <div className={styles.patientSetupContainer}>
      <div className={styles.containerHeader}>
        <div>
          <h1 className="iris_table_heading">Medical Form</h1>
          {data?.Result &&
            dayjs(data?.Result.PatientIntakeForm.CompletedOn).isValid() && (
              <span>
                Last updated on :{" "}
                {dayjs(data?.Result.PatientIntakeForm.CompletedOn).format(
                  DATE_TIME_12H_FORMAT
                )}
              </span>
            )}
        </div>

        {(!isAssociate || (isAssociate && !isCDC && canCompletePatientIntake)) && !editing && data?.Result && (
          <button onClick={handleIntakeFormEdit} disabled={!data?.Result}>
            Edit
          </button>
        )}
      </div>

      <div className={`cardSection ${styles.formContainer}`}>
        <div className={styles.formError}>
          {isLoading && "Loading..."}
          {!isLoading && fetchError}
        </div>
        {!isFormFetchError && data?.Result && (
          <>
            <Customstepper activeStep={activeStep} steps={steps} />
            <StepSwitcher activeStep={activeStep} />
          </>
        )}
      </div>
    </div>
  );
};

export default PatientSetup;
