import { useRouter } from "next/router";
import React, { FC, useEffect, useState } from "react";
import { AlertColor } from "@mui/material";
import {
  BookAppointmentPayloadDTO,
  BookEyeExamUserDetailsStepProps,
  CountryCode,
  Gender,
  NewPatientDTO,
  PatientResponseDTO,
  PatientSearchDTO,
  PatientSearchError,
  PatientSearchErrorCode,
  RelatedPatient,
  RelationshipPayload,
  ReservationFormFull,
  ReservationFormPartial,
} from "@root/home/src/types/bookEyeExamSteps.types";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";

import {
  SNACKBAR_COLOR_TYPE,
  USER_TYPE,
} from "@root/host/src/constants/common.constants";
import ReservationForm from "./user-exam-forms/ReservationForm";
import NewUserForm from "./user-exam-forms/NewUserForm";
import {
  getAllMasterLookupByType,
  getAllMasterSetupByType,
} from "@root/host/src/service/common.service";
import {
  BookAppointment,
  CreateNewPatient,
  GetAddressByZipCode,
  GetListOfRelatedPatients,
  GetPatientDetailsGuest,
  UpdateAppointment,
  UpdateAppointmentForAnonymousUser,
  UpdatePatientDetails,
  UpdatePatientDetailsGuest,
  searchPatient,
} from "@root/home/src/service/storeLocator.service";
import { useSnackBar } from "@root/home/src/contexts/Snackbar/SnackbarContext";
import ExistingUserForm from "./user-exam-forms/ExistingUserForm";
import dayjs from "dayjs";
import AddGTMEvent from "@root/host/src/utils/gtmEvent";
import { GA_TAG_EVENTS } from "@root/host/src/constants/google-analytics.constants";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";
import DuplicatePhoneModal from "./book-eye-exam-models/DuplicatePhoneModal";
import RelatedPatientModal from "./book-eye-exam-models/RelatedPatientModal";
import SelectRelationshipModal from "./book-eye-exam-models/SelectRelationshipModal";
import NoRelationConfirmation from "./book-eye-exam-models/NoRelationConfirmation";
import SubmitAppointmentModal from "./book-eye-exam-models/SubmitAppointmentModal";
import { RECAPTCHA_ACTION } from "@root/intake/src/constants/intake.constants";

const LeftSideOfUser: FC<BookEyeExamUserDetailsStepProps> = ({
  dob,
  setStepCount,
  setDob,
  phoneNumber,
  setPhoneNumber,
  storeDetails,
  reservationDetails,
  appointmentType,
  timeSlot,
  setTimeSlot,
  selectedDate,
  selectedCountryCode,
  setSelectedCountryCode,
  setExistingPatient,
  existingPatient,
  reschedulingMode,
  appointmentId,
  userType,
  appointmentBookingType,
  blockedAppointmentDate,
  setBlockedAppointmentDate,
  rescheduleAppointmentDetails,
  resetBookEyeExam,
  isUsingAppointmentScheduler,
}) => {
  const router = useRouter();
  const { fetchRecaptchaToken } = useRecaptchaToken();

  const [formStep, setFormStep] = useState(() =>
    reschedulingMode ||
    appointmentBookingType === 1 ||
    isUsingAppointmentScheduler
      ? 2
      : 0,
  );
  const [genders, setGenders] = useState<Gender[]>([]);
  const [countryCode, setCountryCode] = useState<CountryCode[]>([]);
  const [openSubmitModal, setOpenSubmitModal] = useState(false);
  const [multiplePatient, setMultiplePatient] = useState(false);
  const [showDuplicatePhoneAlert, setShowDuplicatePhoneAlert] =
    useState<boolean>(false);

  const [relatedPatient, setRelatedPatient] = useState<RelatedPatient[]>([]);
  const [showRelatedPatientModel, setShowRelatedPatientModel] = useState(false);
  const [showSelectRelationshipType, setShowSelectRelationshipType] =
    useState(false);
  const [newUserData, setNewUserData] = useState<ReservationFormFull | null>(
    null,
  );
  const [selectedRelatedPatient, setSelectedRelatedPatient] =
    useState<RelatedPatient | null>(null);

  const [showNoRelationModal, setShowNoRelationModal] = useState(false);

  const [encryptedAppointmentId, setEncryptedAppointmentId] =
    useState<string>("");

  const { showSnackBar } = useSnackBar();

  const getGenderList = () => {
    Promise.all([
      getAllMasterLookupByType("Gender"),
      getAllMasterSetupByType("country/countrycode"),
    ])
      .then((response: any[]) => {
        const [gender, countryCode] = response.map((resp) => resp.data);
        setGenders(gender.Result);
        setCountryCode(countryCode.Result);
      })
      .catch((error) => {
        const message =
          error && error.message
            ? error.message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
      });
  };

  useEffect(() => {
    getGenderList();
  }, []);

  const handleOpen = () => setOpenSubmitModal(true);
  const handleClose = () => {
    setOpenSubmitModal(false);
    setFormStep(0);
  };

  const findPatientDetails = async (userData: ReservationFormPartial) => {
    const patientSearchData: PatientSearchDTO = {
      Phone: {
        PhoneNumber: userData.phoneNumber,
        IsdCode: userData.IsdCode,
      },
      Dob: dob,
      FirstName: userData.firstName || "",
    };
    const recaptchaToken = await fetchRecaptchaToken("Search_Patient");

    searchPatient(patientSearchData, recaptchaToken)
      .then((resp) => {
        const patientDetails: PatientResponseDTO = resp.data.Result;
        setExistingPatient(patientDetails);
        setFormStep(2);
        setMultiplePatient(false);
      })
      .catch((error) => {
        const errorResponse: PatientSearchError = error.response?.data?.Error;
        patientSearchErrorAction(errorResponse?.Code, userData);
        if (
          errorResponse?.Code !== "Patient_Demographics_PatientInfoNotFound" &&
          errorResponse?.Code !== "Patient_Demographics_MultipleProfile"
        ) {
          showSnackBar(
            errorResponse?.Message,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
          );
        }
      });
  };

  const patientSearchErrorAction = (
    errorCode: PatientSearchErrorCode,
    userData: ReservationFormPartial,
  ) => {
    switch (errorCode) {
      case "Patient_Demographics_PatientInfoNotFound":
        setMultiplePatient(false);
        createNewUserHandler(userData);
        break;
      case "Patient_Demographics_MultipleProfile":
        setMultiplePatient(true);
        break;
      default:
        setMultiplePatient(false);
        break;
    }
  };

  const createNewUserHandler = (userData: ReservationFormPartial) => {
    setDob(userData.dob);
    setPhoneNumber(userData.phoneNumber);
    setFormStep(1);
    setSelectedCountryCode(userData.IsdCode);
    AddGTMEvent({
      event: GA_TAG_EVENTS.BOOK_EYE_EXAM_Q2,
      newOrExisting: GA_TAG_EVENTS.NEW,
    });
  };

  const createAppointmentPayload = (patientId: number) => {
    return {
      PatientId: patientId,
      StoreExamRoomId: reservationDetails.StoreExamRoomId,
      StoreId: storeDetails.Id,
      AppointmentDateAndTime: `${selectedDate} ${timeSlot}`,
      AppointmentTypeId: appointmentType.Id,
      PatientDob: dob,
      ReservationId: reservationDetails.ReservationId,
      Notes: "",
    };
  };

  const bookAppointment = async (patientId: number, updateMarketingConsent: boolean, marketingConsent: boolean) => {
    const bookAppointmentPayload: BookAppointmentPayloadDTO =
      createAppointmentPayload(patientId);
    const recaptchaToken = await fetchRecaptchaToken("Book_Appointment");
    BookAppointment(bookAppointmentPayload, recaptchaToken)
      .then((resp) => {
        if (existingPatient?.Id === patientId) {
          AddGTMEvent({
            event: GA_TAG_EVENTS.BOOK_EYE_EXAM_Q2,
            newOrExisting: GA_TAG_EVENTS.EXISTING,
          });
        }
        AddGTMEvent({
          event: GA_TAG_EVENTS.APPOINTMENT,
          patientId: patientId,
          storeId: storeDetails.Id,
          storeAddress: `${storeDetails?.AddressLine1}, ${storeDetails?.City}, ${storeDetails?.ZipCode}`,
          storeName: storeDetails?.WebDescription,
        });
        const data = resp.data;
        setEncryptedAppointmentId(data?.Result?.EncryptedAppointmentId);
        if (updateMarketingConsent)
          saveMarketingConsent(data?.Result?.EncryptedAppointmentId, marketingConsent);
        handleOpen();
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

  const saveMarketingConsent = async (encryptedAppointmentId: string, marketingConsent: boolean) => {
    const recaptchaToken = await fetchRecaptchaToken(RECAPTCHA_ACTION) || "";
    const patientDetailsGuest = (await GetPatientDetailsGuest(encryptedAppointmentId, recaptchaToken)).data.Result;
    const zipCodeResponse = (await GetAddressByZipCode(patientDetailsGuest.ShippingAddress.ZipCode)).data.Result;
    const cityIndex = zipCodeResponse?.AddressCityZip.CitiesNameList.findIndex(
      (c: any) => c === patientDetailsGuest.ShippingAddress.City
    );
    const payload = {
      AppointmentId: decodeURIComponent(encryptedAppointmentId),
      FirstName: patientDetailsGuest.FirstName,
      LastName: patientDetailsGuest.LastName,
      Email: patientDetailsGuest.Email,
      Dob: patientDetailsGuest.Dob,
      PreferredLanguageCode: patientDetailsGuest.PreferredLanguageCode,
      GenderCode: patientDetailsGuest.GenderCode,
      PrimaryPhoneNo: {
        IsdCode: patientDetailsGuest.PrimaryPhoneNo.IsdCode,
        PhoneNumber: patientDetailsGuest.PrimaryPhoneNo.PhoneNumber
      },
      AddressLine1: patientDetailsGuest.ShippingAddress.AddressLine1,
      AddressLine2: patientDetailsGuest.ShippingAddress.AddressLine2,
      ZipId: zipCodeResponse?.AddressCityZip.ZipIdList[cityIndex!].toString()!,
      CityId:
        zipCodeResponse?.AddressCityZip.CitiesIdList[cityIndex!].toString()!,
      IsMarketingConsent: marketingConsent
    }
    await UpdatePatientDetailsGuest(payload, recaptchaToken);
  }

  const updateAppointment = async (patientId: number) => {
    const bookAppointmentPayload: BookAppointmentPayloadDTO =
      createAppointmentPayload(patientId);
    const recaptchaToken = await fetchRecaptchaToken("Update_Appointment");
    UpdateAppointment(appointmentId!, bookAppointmentPayload, recaptchaToken)
      .then((resp) => {
        AddGTMEvent({
          event: GA_TAG_EVENTS.MODIFIED_APPOINTMENT,
          patientId: patientId,
          storeId: storeDetails.Id,
          storeAddress: `${storeDetails?.AddressLine1}, ${storeDetails?.City}, ${storeDetails?.ZipCode}}`,
          storeName: storeDetails?.WebDescription,
        });
        const data = resp.data;
        setEncryptedAppointmentId(data?.Result?.EncryptedAppointmentId);
        handleOpen();
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

  const updateAppointmentForAnonymousUser = async (patientId: number) => {
    const bookAppointmentPayload: BookAppointmentPayloadDTO =
      createAppointmentPayload(patientId);
    const recaptchaToken = await fetchRecaptchaToken(
      "Update_Appointment_For_Anonymous_User",
    );
    UpdateAppointmentForAnonymousUser(
      appointmentId!,
      bookAppointmentPayload,
      recaptchaToken,
    )
      .then((resp) => {
        setEncryptedAppointmentId(appointmentId!);
        AddGTMEvent({
          event: GA_TAG_EVENTS.MODIFIED_APPOINTMENT,
          patientId: patientId,
          storeId: storeDetails.Id,
          storeAddress: `${storeDetails?.AddressLine1}, ${storeDetails?.City}, ${storeDetails?.ZipCode}}`,
          storeName: storeDetails?.WebDescription,
        });
        handleOpen();
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

  const createNewPatient = async (
    userData: ReservationFormFull,
    relationshipData?: RelationshipPayload[],
  ) => {
    const newPatientData: NewPatientDTO = {
      firstName: userData.firstName,
      lastName: userData.lastName,
      email: userData.email,
      zipCode: userData.zipCode,
      Gender: userData.gender,
      primaryPhoneNo: {
        isdCode: selectedCountryCode,
        phoneNumber: userData.phoneNumber,
      },
      dob: dayjs(userData.dob).format("MM-DD-YYYY"),
      CreatedAtStoreNumber: storeDetails.StoreNumber,
      IsMarketingConsent: userData.isMarketingConsent,
    };
    if (relationshipData) {
      newPatientData["RelatedPatients"] = relationshipData;
    }
    const recaptchaToken = await fetchRecaptchaToken("Create_New_Patient");
    setNewUserData(userData);
    CreateNewPatient(newPatientData, recaptchaToken)
      .then((resp: any) => {
        const Result: number = resp.data.Result;
        setExistingPatient({
          Id: Result,
          FirstName: userData.firstName,
          LastName: userData.lastName,
          Email: userData.email,
          ZipCode: userData.zipCode,
          Gender: userData.gender.toLowerCase(),
          PhoneNumber: {
            IsdCode: selectedCountryCode,
            PhoneNumber: userData.phoneNumber,
          },
          Dob: userData.dob,
          IsMarketingConsent: userData.isMarketingConsent
        });
        setMultiplePatient(false);
        bookAppointment(Result, false, userData.isMarketingConsent);
        showSnackBar(
          resp?.data?.SuccessMessage,
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor,
        );
      })
      .catch((error) => {
        const errorResponse: PatientSearchError = error.response?.data?.Error;
        if (errorResponse.Code === "Patient_Account_PhoneExists") {
          setShowDuplicatePhoneAlert(true);
        } else {
          const message =
            errorResponse && errorResponse.Message
              ? errorResponse.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
          showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        }
      });
  };

  const createPatientWithRelation = (
    relationshipTypeId: number,
    otherRelationshipTypeId: number,
    isReverseRelationShip: boolean,
  ) => {
    setShowSelectRelationshipType(false);
    const relatedPatientData: RelationshipPayload[] = relatedPatient.map(
      (data) => {
        return {
          RelatedPatientId: data.Id,
          RelationTypeId:
            data.Id === selectedRelatedPatient?.Id
              ? relationshipTypeId
              : otherRelationshipTypeId,
          IsReverseRelationshipSelected:
            data.Id === selectedRelatedPatient?.Id
              ? isReverseRelationShip
              : false,
        };
      },
    );
    if (newUserData) {
      createNewPatient(newUserData, relatedPatientData);
    }
  };

  const appointmentBookedHandler = () => {
    const isPatient = userType === USER_TYPE.PATIENT;
    const isExamForMe = appointmentBookingType === 1 || reschedulingMode;

    if (isPatient && isExamForMe)
      return router.replace("my-account/exam-intake-form/");

    router.push(`/medical-form/patient?key=${encryptedAppointmentId}`);
  };

  const bookAppointmemtHandler = (patientId: number, updateMarketingConsent: boolean, marketingConsent: boolean) => {
    if (reschedulingMode) {
      if (userType === USER_TYPE.PATIENT) {
        updateAppointment(patientId);
      } else if (userType === USER_TYPE.ANONYMOUS) {
        updateAppointmentForAnonymousUser(patientId);
      }
    } else {
      bookAppointment(patientId, updateMarketingConsent, marketingConsent);
    }
  };

  const updateLocalUserDetails = (
    firstName: string,
    lastName: string,
    patientId: string,
  ) => {
    if (typeof window !== "undefined" && localStorage?.getItem("updatedUser")) {
      const localStorageData = JSON.parse(
        localStorage?.getItem("updatedUser") as string,
      );
      const patientDetails = {
        ...localStorageData,
        FirstName: firstName,
        LastName: lastName,
        PatientId: patientId,
      };
      localStorage.setItem("updatedUser", JSON.stringify(patientDetails));
    } else {
      const patientDetails = {
        FirstName: firstName,
        LastName: lastName,
        PatientId: patientId,
      };
      localStorage.setItem("updatedUser", JSON.stringify(patientDetails));
    }
  };
  const updatePatientDetails = async (patientDetails: ReservationFormFull) => {
    const payload = {
      firstName: patientDetails.firstName,
      lastName: patientDetails.lastName,
      dob: existingPatient?.Dob,
      email: existingPatient?.Email,
      genderCode: patientDetails.gender,
      storeId: storeDetails.Id,
      id: existingPatient?.Id,
      preferredLanguageCode: existingPatient?.PreferredLanguageCode,
      primaryPhoneNo: {
        isdCode: existingPatient?.PhoneNumber.IsdCode,
        phoneNumber: existingPatient?.PhoneNumber.PhoneNumber,
      },
      isMarketingConsent: patientDetails?.isMarketingConsent
    };
    const recaptchaToken = await fetchRecaptchaToken("Update_Patient_Details");

    UpdatePatientDetails(payload, recaptchaToken)
      .then((resp) => {
        const patientDetails = resp.data.Result;
        if (patientDetails) {
          bookAppointmemtHandler(patientDetails.PatientId, false, patientDetails?.isMarketingConsent);
          updateLocalUserDetails(
            payload.firstName,
            payload.lastName,
            patientDetails.PatientId.toString(),
          );
        }
      })
      .catch((error) => {
        const errorResponse: PatientSearchError = error.response?.data?.Error;
        const message =
          errorResponse && errorResponse.Message
            ? errorResponse.Message
            : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        showSnackBar(
          isUsingAppointmentScheduler
            ? ERROR_MESSAGE.APPOINTMENT_SCHEDULER_USER_UPDATE
            : message,
          SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
        );
      });
  };

  const getListOfRelatedPatient = async () => {
    const captchaToken = await fetchRecaptchaToken(
      "Get_List_Of_Related_Patient",
    );
    GetListOfRelatedPatients(
      phoneNumber,
      selectedCountryCode,
      captchaToken as string,
    )
      .then((resp) => {
        const data = resp.data;
        if (data?.Result) {
          setRelatedPatient(data.Result);
          setShowDuplicatePhoneAlert(false);
          setShowRelatedPatientModel(true);
        }
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

  return (
    <>
      {formStep === 0 && (
        <ReservationForm
          dob={dob}
          createNewUser={createNewUserHandler}
          findPatientDetails={findPatientDetails}
          back={() => {
            setStepCount(0);
            setTimeSlot("");
          }}
          selectedCountryCode={selectedCountryCode}
          countryCodes={countryCode}
          multiplePatient={multiplePatient}
        />
      )}
      {formStep === 1 && (
        <NewUserForm
          dob={dob}
          phoneNumber={phoneNumber}
          back={() => {
            setFormStep(0);
            setTimeSlot("");
          }}
          genders={genders}
          countryCodes={countryCode}
          createNewPatient={createNewPatient}
        />
      )}
      {formStep === 2 && (
        <ExistingUserForm
          back={() => {
            if (
              reschedulingMode ||
              appointmentBookingType === 1 ||
              isUsingAppointmentScheduler
            ) {
              setStepCount(0);
              setTimeSlot("");
            } else {
              setFormStep(0);
            }
          }}
          genders={genders}
          patientDetails={existingPatient!}
          bookAppointment={(data) => {
            setNewUserData(data);

            if (
              (appointmentBookingType === 1 || reschedulingMode) &&
              userType === USER_TYPE.PATIENT
            ) {
              updatePatientDetails(data);
            } else {
              const patientId = existingPatient?.Id;
              const marketingConsent = data.isMarketingConsent;
              bookAppointmemtHandler(patientId!, !((appointmentBookingType === 1 ||
                reschedulingMode ||
                isUsingAppointmentScheduler) &&
              userType === USER_TYPE.PATIENT), marketingConsent);
            }
          }}
          editable={
            (appointmentBookingType === 1 ||
              reschedulingMode ||
              isUsingAppointmentScheduler) &&
            userType === USER_TYPE.PATIENT
          }
          appointmentDate={selectedDate}
          setBlockedAppointmentDate={setBlockedAppointmentDate}
          blockedAppointmentDate={blockedAppointmentDate}
          rescheduleAppointmentDetails={rescheduleAppointmentDetails}
          appointmentBookingType={appointmentBookingType}
        />
      )}
      <SubmitAppointmentModal
        store={storeDetails}
        isExamForSomeoneElse={appointmentBookingType === 2}
        encryptedAppointmentId={encryptedAppointmentId}
        userEmail={newUserData?.email || ""}
        openSubmitModal={openSubmitModal}
        selectedDate={selectedDate}
        timeSlot={timeSlot}
        appointmentBookedHandler={appointmentBookedHandler}
        bookAnother={() => {
          setOpenSubmitModal(false);
          setFormStep(0);
          setStepCount(0);
          resetBookEyeExam();
        }}
      />
      <DuplicatePhoneModal
        showDuplicatePhoneAlert={showDuplicatePhoneAlert}
        setShowDuplicatePhoneAlert={setShowDuplicatePhoneAlert}
        handleClose={() => setShowDuplicatePhoneAlert(false)}
        phoneNumber={phoneNumber}
        getListOfRelatedPatient={getListOfRelatedPatient}
      />
      <RelatedPatientModal
        showRelatedPatientModel={showRelatedPatientModel}
        setShowDuplicatePhoneAlert={setShowDuplicatePhoneAlert}
        handleClose={setShowRelatedPatientModel}
        getListOfRelatedPatient={handleClose}
        relatedPatient={relatedPatient}
        setSelectedRelatedPatient={(data) => {
          setSelectedRelatedPatient(data);
          setShowRelatedPatientModel(false);
          setShowSelectRelationshipType(true);
        }}
        handleNoRelation={() => {
          setShowRelatedPatientModel(false);
          setShowNoRelationModal(true);
        }}
      />
      <SelectRelationshipModal
        showSelectRelationshipType={showSelectRelationshipType}
        setShowRelationshipType={setShowSelectRelationshipType}
        handleClose={() => setShowSelectRelationshipType(false)}
        handleSubmit={(
          relationshipTypeId,
          otherRelationshipTypeId,
          isReverseRelationShip,
        ) => {
          createPatientWithRelation(
            relationshipTypeId,
            otherRelationshipTypeId,
            isReverseRelationShip,
          );
        }}
      />

      <NoRelationConfirmation
        showNoRelationModal={showNoRelationModal}
        setShowNoRelationModal={setShowNoRelationModal}
        handleGoBack={() => {
          setShowNoRelationModal(false);
          setFormStep(0);
        }}
        phoneNumber={phoneNumber}
      />
    </>
  );
};

export default LeftSideOfUser;
