import React, { FC, useEffect, useState } from "react";

import LeftSideOfBEE from "./left-side-of-bee";
import LeftSideOfUser from "./LeftSideOfUser";
import RightSideOfBEE from "./RightSideOfBEE";
import dayjs from "dayjs";
import style from "./Steps.module.scss";
import { AlertColor, Grid, Modal } from "@mui/material";
import { Props } from "../../../../../host/src/components/sidebar/SideBar";
import dynamic from "next/dynamic";
import {
  AppointmentDetails,
  PatientResponseDTO,
  PatientSearchError,
  ReservationResponse,
  StoreDetails,
  TypeOfExamDTO,
} from "@/types/bookEyeExamSteps.types";
import {
  AppEvents,
  DATE_FORMAT,
  DOCTOR_SCHEDULER_API_DATE_FORMAT,
  EYE_EXAM_APPOINTMENT_SLOT_FORMAT,
  ISD_CODE,
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import {
  CancelAppointmentForAnonymousUser,
  GetAnonymousUserAppointmentDetails,
  GetAppointmentDetails,
  GetStoreDetailsByStoreNumber,
  GetUserStoreDetails,
  getMyAccountProfileData,
} from "@/service/storeLocator.service";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { STORE_ERROR_MESSAGE } from "@root/host/src/constants/store.constants";
import { useRouter } from "next/router";
import { getDetails } from "@root/host/src/utils/getSessionData";
import ModifyAppointmentConfirmation from "./ModifyAppointmentConfirmation";
import { Constants } from "@/constants/Constants";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import useAppointmentScheduler from "../../../hooks/useEmailAppointmentScheduler";
const SideBar = dynamic(() => import("Host/SideBar"), {
  ssr: false,
}) as React.FunctionComponent<Props>;

const FirstStep: FC<{
  stepCount: number;
  appointmentId: string | null;
  patientId: string | null;
  reschedulingMode: boolean;
  setStepCount: (step: number) => void;
  userType: any;
  brand: string;
}> = ({
  stepCount,
  setStepCount,
  appointmentId,
  patientId,
  reschedulingMode,
  userType,
  brand,
}) => {
  const router = useRouter();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const [dob, setDob] = useState<string>("");
  const [phoneNumber, setPhoneNumber] = useState<string>("");
  const [selectedCountryCode, setSelectedCountryCode] =
    useState<string>(ISD_CODE);
  const [sideBarOC, setSideBarOC] = useState(false);
  const [storeDetails, setStoreDetails] = useState<StoreDetails | null>(null);
  const [webSchedulerSlot, setWebSchedulerSlot] = useState<string[]>([]);
  const [reservationDetails, setReservationDetails] =
    useState<ReservationResponse | null>(null);
  const [appointmentType, setAppointmentType] = useState<TypeOfExamDTO | null>(
    null,
  );
  const [timeSlot, setTimeSlot] = useState("");
  const [endTimeSlot, setEndTimeSlot] = useState("");
  const [selectedDate, setSelectedDate] = useState<string>(
    dayjs().format(DOCTOR_SCHEDULER_API_DATE_FORMAT),
  );
  const [existingPatient, setExistingPatient] = useState<PatientResponseDTO>();
  const { showSnackBar } = useSnackBar();
  const [appointmentBookingType, setAppointmentBookingType] = useState(-1);
  const [blockedAppointmentDate, setBlockedAppointmentDate] = useState<
    string[]
  >([]);
  const [rescheduleAppointmentDetails, setRescheduleAppointmentDetails] =
    useState<AppointmentDetails | null>(null);
  const [showModifyAptModal, setShouldShowModifyAptModal] =
    useState<boolean>(false);
  const isFirstRender = React.useRef<boolean>(true);
  const [forceClose, setForceClose] = useState(true);

  const {
    autoSelectBookEyeExamItem,
    fillAppointmentSchedulerTimeSlots,
    isUsingAppointmentScheduler,
    autofillValues,
    setIsUsingAppoitnmentScheduler,
    checkIfItsUsingAppointmentScheduler,
  } = useAppointmentScheduler({
    setSelectedDate,
    setExistingPatient,
    setDob,
    setAppointmentType,
    setEndTimeSlot,
    setTimeSlot,
    setAppointmentBookingType,
  });

  useEffect(() => {
    window.addEventListener(AppEvents.STORE_CHANGE, () => {
      setStepCount(0);
      updateStoreDetails();
    });

    return () => {
      window.removeEventListener(AppEvents.STORE_CHANGE, () => {});
    };
  }, []);

  useEffect(() => {
    if (
      storeDetails &&
      rescheduleAppointmentDetails &&
      reschedulingMode &&
      userType === USER_TYPE.ANONYMOUS
    ) {
      setShouldShowModifyAptModal(true);
    }
  }, [storeDetails, rescheduleAppointmentDetails]);

  const updateStoreDetails = () => {
    const storeDetails = localStorage.getItem("selectedStore");
    if (storeDetails) {
      setStoreDetails(JSON.parse(storeDetails));
    } else {
      setSideBarOC(true);
    }
  };

  const updateAppointmentHandler = (appointmentDetails: AppointmentDetails) => {
    setAppointmentType({
      Description: appointmentDetails.AppointmentType,
      Id: appointmentDetails.AppointmentTypeId,
      Code: `${appointmentDetails.AppointmentTypeId}`,
      WebHelpText: null,
    });
    setDob(
      dayjs(appointmentDetails.Dob).format(DOCTOR_SCHEDULER_API_DATE_FORMAT),
    );
    setTimeSlot(
      dayjs(appointmentDetails.AppointmentStartDateAndTime).format(
        EYE_EXAM_APPOINTMENT_SLOT_FORMAT,
      ),
    );
    setEndTimeSlot(
      dayjs(appointmentDetails.AppointmentEndDateAndTime).format(
        EYE_EXAM_APPOINTMENT_SLOT_FORMAT,
      ),
    );
    setSelectedDate(
      dayjs(
        dayjs(appointmentDetails.AppointmentStartDateAndTime).format(
          DOCTOR_SCHEDULER_API_DATE_FORMAT,
        ),
      ).format(DOCTOR_SCHEDULER_API_DATE_FORMAT),
    );
    setPhoneNumber(appointmentDetails.PhoneNumber);
    setSelectedDate(
      dayjs(appointmentDetails.AppointmentStartDateAndTime).format(
        DOCTOR_SCHEDULER_API_DATE_FORMAT,
      ),
    );
  };

  const getStoreDetailsById = (
    storeId: string,
    appointmentDetails?: AppointmentDetails,
  ) => {
    if (storeId) {
      GetUserStoreDetails(storeId, dayjs().format(DATE_FORMAT))
        .then(({ data }) => {
          localStorage.setItem("selectedStore", JSON.stringify(data.Result));
          window.dispatchEvent(new Event(AppEvents.STORE_CHANGE));
          if (appointmentDetails) {
            updateAppointmentHandler(appointmentDetails);
            updatePatientDetailsHandler(appointmentDetails);
          }
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err.response.data.Error.Description
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
          );
        });
    }
  };

  const getStoreDetailsByNumber = (storeNumber: string) => {
    if (storeNumber) {
      GetStoreDetailsByStoreNumber(storeNumber)
        .then(({ data }) => {
          localStorage.setItem("selectedStore", JSON.stringify(data.Result));
          window.dispatchEvent(new Event(AppEvents.STORE_CHANGE));
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err.response.data.Error.Description
              : STORE_ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
          );
        });
    }
  };

  useEffect(() => {
    const { id } = router.query as any;
    if (id && !reschedulingMode) {
      const storeNumber = id.toString().padStart(4, "0");
      getStoreDetailsByNumber(storeNumber);
    }
  }, [router.query, reschedulingMode]);

  const updatePatientDetailsHandler = (
    appointmentDetails: AppointmentDetails,
  ) => {
    setExistingPatient({
      Id: appointmentDetails.PatientId,
      FirstName: appointmentDetails.PatientFirstName,
      LastName: appointmentDetails.PatientLastName,
      Email: appointmentDetails.PatientEmail,
      ZipCode: appointmentDetails.PatientZip,
      Gender: appointmentDetails.PatientGender,
      PhoneNumber: {
        IsdCode: appointmentDetails.PatientIsdCode,
        PhoneNumber: appointmentDetails.PhoneNumber,
      },
      Dob: appointmentDetails.Dob,
      PreferredLanguageCode: appointmentDetails.PreferredLanguageCode,
    });
  };

  const getAppointmentDetails = (patientId: string, appointmentId: string) => {
    GetAppointmentDetails(patientId, appointmentId)
      .then((resp) => {
        const appointmentDetails: AppointmentDetails = resp.data.Result;
        getStoreDetailsById(
          appointmentDetails.StoreId.toString(),
          appointmentDetails,
        );
        setRescheduleAppointmentDetails(appointmentDetails);
      })
      .catch((error) => {
        const errorResponse: PatientSearchError = error.response?.data?.Error;
        const message =
          errorResponse && errorResponse.Message
            ? errorResponse.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        setTimeout(() => {
          if (userType === USER_TYPE.PATIENT) {
            router.replace("my-account/my-appointments");
          } else {
            router.replace("/");
          }
        }, 4000);
      });
  };

  const getAnonymousUserAppointmentDetails = (appointmentId: string) => {
    const encodedAppointmentId = encodeURIComponent(appointmentId);
    GetAnonymousUserAppointmentDetails(encodedAppointmentId)
      .then((resp) => {
        const appointmentDetails: AppointmentDetails = resp.data.Result;
        getStoreDetailsById(
          appointmentDetails.StoreId.toString(),
          appointmentDetails,
        );
        setRescheduleAppointmentDetails(appointmentDetails);
      })
      .catch((error) => {
        const errorResponse: PatientSearchError = error.response?.data?.Error;
        const message =
          errorResponse && errorResponse.Message
            ? errorResponse.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        setTimeout(() => {
          router.push("/");
        }, 4000);
      });
  };

  useEffect(() => {
    const { id } = router.query as any;

    if (!id) updateStoreDetails();

    if (reschedulingMode) {
      if (userType === USER_TYPE.PATIENT) {
        getAppointmentDetails(patientId!, appointmentId!);
      } else if (userType === USER_TYPE.ANONYMOUS) {
        getAnonymousUserAppointmentDetails(appointmentId!);
      }
    }
  }, [reschedulingMode, router.query]);

  const getPatientDetails = (patientId: string) => {
    getMyAccountProfileData(patientId)
      .then((resp) => {
        const patientDetails: any = resp.data.Result;
        setExistingPatient({
          Id: +patientId,
          FirstName: patientDetails.FirstName,
          LastName: patientDetails.LastName,
          Email: patientDetails.Email,
          ZipCode: patientDetails.ZipCode,
          Gender: patientDetails.GenderCode,
          PhoneNumber: {
            IsdCode: patientDetails.PrimaryPhoneNo.IsdCode,
            PhoneNumber: patientDetails.PrimaryPhoneNo.PhoneNumber,
          },
          Dob: patientDetails.Dob,
          PreferredLanguageCode: patientDetails.PreferredLanguageCode,
          IsMarketingConsent: patientDetails.IsMarketingConsent
        });
        setDob(
          dayjs(patientDetails.Dob).format(DOCTOR_SCHEDULER_API_DATE_FORMAT),
        );
      })
      .catch((error) => {
        const errorResponse: PatientSearchError = error.response?.data?.Error;
        const message =
          errorResponse && errorResponse.Message
            ? errorResponse.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }

    if (appointmentBookingType === 1 && !isUsingAppointmentScheduler) {
      getDetails().then(function (data) {
        const patientId = data?.authData?.PatientId;
        if (patientId) {
          getPatientDetails(patientId);
        }
      });
      setTimeSlot("");
      setTimeSlot("");
      setAppointmentType(null);
    }

    if (appointmentBookingType === 2) {
      setDob("");
      setExistingPatient(undefined);
      setTimeSlot("");
      setAppointmentType(null);
    }
  }, [appointmentBookingType]);

  const handelCancelAppointment = async () => {
    const id = encodeURIComponent(appointmentId!);
    const recaptchaToken = await fetchRecaptchaToken(
      "Cancel_Appointment_For_Anonymous_User",
    );

    CancelAppointmentForAnonymousUser(id!, recaptchaToken)
      .then((resp) => {
        showSnackBar(
          Constants.MESSAGES.APPOINTMENT_CANCELED,
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor,
        );
        router.push("/");
      })
      .catch((err) => {
        const errorResponse: PatientSearchError = err.response?.data?.Error;
        const message =
          errorResponse && errorResponse.Message
            ? errorResponse.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  const resetBookEyeExam = () => {
    setAppointmentBookingType(0);
    setAppointmentType(null);
    setDob("");
    setTimeSlot("");
  };

  return (
    <>
      <div className={style.bookEyeExamWrapper}>
        <div className={style.firstStepWrapper}>
          <Grid container spacing={2} mt={4}>
            <Grid item xs={12} md={8} sm={12}>
              {!stepCount ? (
                <LeftSideOfBEE
                  dob={dob}
                  stepCount={stepCount}
                  setStepCount={(step) => setStepCount(step)}
                  setDob={(date: string) => setDob(date)}
                  storeDetails={storeDetails}
                  setReservationDetails={setReservationDetails}
                  setAppointmentType={setAppointmentType}
                  appointmentType={appointmentType}
                  setTimeSlot={setTimeSlot}
                  timeSlot={timeSlot}
                  setEndTimeSlot={setEndTimeSlot}
                  endTimeSlot={endTimeSlot}
                  setSelectedDate={setSelectedDate}
                  selectedDate={selectedDate}
                  setWebSchedulerSlot={setWebSchedulerSlot}
                  webSchedulerSlot={webSchedulerSlot}
                  reschedulingMode={reschedulingMode}
                  appointmentBookingType={appointmentBookingType}
                  setAppointmentBookingType={setAppointmentBookingType}
                  userType={userType}
                  showModifyAptModal={showModifyAptModal}
                  appointmentSchedulerMethods={{
                    fillAppointmentSchedulerTimeSlots,
                    autoSelectBookEyeExamItem,
                    autoFillAppointmentSchedulerValues: autofillValues,
                    setIsUsingAppoitnmentScheduler,
                    checkIfItsUsingAppointmentScheduler,
                  }}
                />
              ) : (
                <LeftSideOfUser
                  stepCount={stepCount}
                  setStepCount={(step) => setStepCount(step)}
                  dob={dob}
                  setDob={(date: string) => setDob(date)}
                  storeDetails={storeDetails!}
                  reservationDetails={reservationDetails!}
                  phoneNumber={phoneNumber}
                  setPhoneNumber={setPhoneNumber}
                  timeSlot={timeSlot}
                  setTimeSlot={setTimeSlot}
                  appointmentType={appointmentType!}
                  selectedDate={selectedDate}
                  setSelectedCountryCode={setSelectedCountryCode}
                  selectedCountryCode={selectedCountryCode}
                  setExistingPatient={setExistingPatient}
                  existingPatient={existingPatient}
                  reschedulingMode={reschedulingMode}
                  appointmentId={appointmentId}
                  userType={
                    isUsingAppointmentScheduler ? USER_TYPE.PATIENT : userType
                  }
                  appointmentBookingType={appointmentBookingType}
                  setBlockedAppointmentDate={setBlockedAppointmentDate}
                  blockedAppointmentDate={blockedAppointmentDate}
                  rescheduleAppointmentDetails={rescheduleAppointmentDetails}
                  resetBookEyeExam={resetBookEyeExam}
                  isUsingAppointmentScheduler={isUsingAppointmentScheduler}
                />
              )}
            </Grid>
            <Grid item xs={12} md={4} sm={12}>
              <RightSideOfBEE
                stepCount={stepCount}
                changeStore={setSideBarOC}
                storeDetails={storeDetails}
                appointmentType={appointmentType}
                timeSlot={timeSlot}
                selectedDate={selectedDate}
                setStepCount={setStepCount}
                showCancel={
                  reschedulingMode && userType === USER_TYPE.ANONYMOUS
                }
                handleCancelAppointment={handelCancelAppointment}
                brandName={brand}
              />
            </Grid>
          </Grid>
        </div>
        <SideBar
          anchor="left"
          sideBarOC={sideBarOC}
          setSideBarOC={() => {
            setSideBarOC(false);
          }}
          handleNewStore={updateStoreDetails}
          changeStoreOpen={false}
          openSelectStore={true}
          forceClose={forceClose}
          handleForceClose={()=>setForceClose(true)}
          isBookEyeExam={true}
        />

        <Modal
          open={showModifyAptModal}
          onClose={() => setShouldShowModifyAptModal(false)}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
          slotProps={{
            backdrop: {
              onClick: (event) => {
                event.stopPropagation();
              },
            },
          }}
        >
          <ModifyAppointmentConfirmation
            storeDetails={storeDetails}
            apptDateAndTime={
              rescheduleAppointmentDetails?.AppointmentStartDateAndTime || ""
            }
            patientName={existingPatient?.FirstName || ""}
            handleClose={() => setShouldShowModifyAptModal(false)}
          />
        </Modal>
      </div>
    </>
  );
};

export default FirstStep;
