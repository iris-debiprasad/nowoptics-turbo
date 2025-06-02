import React, { useState, useEffect, useRef } from "react";
import {
  AppointmentType,
  EyeExamFlowPropsTypes,
  examType,
  eyeExamAddToCartPayloadType,
} from "@root/host/src/types/eyeExamFlow.types";
import { AlertColor, Box, Modal } from "@mui/material";
import {
  GetExamTypes,
  GetPatientAppointements,
  GetPatientSearchData,
} from "@/service/search.service";
import NotFoundView from "./notFoundView/NotFoundView";
import AppointmentsList from "./appointmentsList/AppointmentsList";
import SelectExam from "./selectExam/SelectExam";
import SelectPatientComponent from "../selectPatientAssociateModal/SelectPatientAssociateModal";
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  AppEvents,
  ORDER_CATEGORY_CODE,
  ORDER_CATEGORY_ID,
  ORDER_TYPE_CODE,
  SNACKBAR_COLOR_TYPE,
} from "@root/host/src/constants/common.constants";
import {
  setSelectedPatientToLocalStorage,
} from "@root/host/src/utils/common.utils";
import { associateAddToCart } from "@/service/common.service";
import { useRouter } from "next/router";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import { selectPatientDataTypes } from "@root/host/src/types/selectPatientAssociateModal.types";
import { updateCartId } from "../../store/reducer/cartIdReducer";
import { useAppDispatch } from "../../store/useStore";

const EyeExamFlow = ({ isVisible, toggle }: EyeExamFlowPropsTypes) => {
  const router = useRouter();
  const loading = useAxiosLoader();
  const [showSelectPatientScreen, setShowSelectPatientScreen] =
    useState<boolean>(false);
  const [userInput, setUserInput] = useState<string>("");
  const timeoutRef = useRef<NodeJS.Timeout | string | number | undefined>();
  const [selectPatientData, setSelectPatientData] = useState<
    selectPatientDataTypes[] | null
  >(null);
  const [selectedPatient, setSelectedPatient] =
    useState<selectPatientDataTypes | null>(null);
  const [showNotFoundView, setShowNotFoundView] = useState<boolean>(false);
  const [showAppointmentsList, setShowAppointmentsList] =
    useState<boolean>(false);
  const [showSelectExam, setShowSelectExam] = useState<boolean>(false);
  const [selectedAppointmentId, setSelectedAppointmentId] = useState<
    string | null
  >(null);
  const [appointmentsList, setAppointmentsList] = useState<
    AppointmentType[] | null
  >(null);
  const [examsData, setExamsData] = useState<examType[] | null>(null);
  const [selectedExams, setSelectedExams] = useState<number[]>([]);

  const { showSnackBar } = useSnackBar();
  const dispatch = useAppDispatch();

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(debounceApiCall, 800);
  }, [userInput]);

  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      JSON.parse(localStorage.getItem("CurrentSelectedPatient") as string)
        ?.Id &&
      localStorage.getItem("isContinueShopping") === "true"
    ) {
      setSelectedPatient(
        JSON.parse(localStorage.getItem("CurrentSelectedPatient") as string)
      );
    } else {
      setShowSelectPatientScreen(true);
    }
  }, [
    typeof window !== "undefined" &&
      localStorage.getItem("CurrentSelectedPatient"),
  ]);

  useEffect(() => {
    if (
      selectedPatient?.Id &&
      typeof window !== "undefined" &&
      localStorage.getItem("isContinueShopping") === "true"
    ) {
      getPatientAppointmnetsAfterPatientSelect();
    }
  }, [selectedPatient]);

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInput(value);
  };

  const debounceApiCall = () => {
    if (userInput.length > 0) {
      GetPatientSearchData(userInput, "10")
        .then((res) => setSelectPatientData(res.data.Result))
        .catch((err) => {
          showSnackBar(
            err.response
              ? err?.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  const getPatientAppointmnetsAfterPatientSelect = () => {
    const selectedStore = localStorage.getItem("selectedStore");
    if (selectedStore && selectedPatient) {
      let selectedStoreId = JSON.parse(selectedStore).Id;
      fetchExamTypeData();
      GetPatientAppointements(selectedPatient?.Id?.toString(), selectedStoreId)
        .then((res) => {
          const data = res.data.Result;
          if (data.length > 1) {
            setAppointmentsList(data);
            setShowAppointmentsList(true);
          } else if (data.length === 1) {
            setSelectedAppointmentId(data[0].Id);
            setShowSelectExam(true);
          }
        })
        .catch((err) => {
          setShowNotFoundView(true);
        });
    } else {
      toggle();
    }
  };

  const handleContinueClick = () => {
    setShowSelectPatientScreen(false);
    getPatientAppointmnetsAfterPatientSelect();
  };

  const handleAppointementListContinueClick = () => {
    setShowAppointmentsList(false);
    setShowSelectExam(true);
  };

  const fetchExamTypeData = () => {
    const selectedStore = localStorage.getItem("selectedStore");
    const selectedPatient = JSON.parse(
      localStorage.getItem("CurrentSelectedPatient") as string
    );
    if (selectedStore && selectedPatient) {
      let selectedStoreId = JSON.parse(selectedStore).Id;
      GetExamTypes(selectedStoreId, selectedPatient.Id.toString())
        .then((res) => {
          setExamsData(res.data.Result);
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err?.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  const handleAddToCart = async () => {
    let payload: eyeExamAddToCartPayloadType;
    const selectedStore = localStorage.getItem("selectedStore");
    if (selectedStore && selectedAppointmentId) {
      payload = {
        appointmentId: selectedAppointmentId,
        CreatedByStoreId: JSON.parse(selectedStore).Id,
        CreatedForStoreId: JSON.parse(selectedStore).Id,
        PatientId: selectedPatient?.Id,
        OrderCategoryCode: ORDER_CATEGORY_CODE.NEW,
        orders: [
          {
            OrderTypeCode: ORDER_TYPE_CODE.EXAM.code,
            LineItems: selectedExams.map((exam) => ({
              MasterProductId: exam,
              Quantity: 1,
            })),
          },
        ],
      };
      associateAddToCart(payload)
        .then((res) => {
          if (selectedPatient) {
            setSelectedPatientToLocalStorage(selectedPatient, {
              storeCartId: res?.data?.Result?.Id,
            });
            toggle();
            window.dispatchEvent(
              new Event(AppEvents.ADD_EYE_EXAM_FRON_CART_PAGE)
            );
            dispatch(updateCartId(res?.data?.Result?.Id));
            router.push(
              `/cart?patientId=${selectedPatient?.Id}&cartId=${res?.data?.Result?.Id}`
            );
          }
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err?.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  const handleClose = () => {
    toggle();
    setShowSelectPatientScreen(false);
    setShowNotFoundView(false);
    setShowAppointmentsList(false);
    setShowSelectExam(false);
  };

  return (
    <Modal
      open={isVisible}
      onClose={handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        <BackdropLoader openLoader={loading} />
        {showSelectPatientScreen && (
          <SelectPatientComponent
            toggle={handleClose}
            userInput={userInput}
            handleUserInput={handleUserInput}
            selectPatientData={selectPatientData}
            selectedPatient={selectedPatient}
            setSelectedPatient={setSelectedPatient}
            handleContinueClick={handleContinueClick}
          />
        )}
        <NotFoundView isVisible={showNotFoundView} toggle={handleClose} />
        <AppointmentsList
          isVisible={showAppointmentsList}
          toggle={handleClose}
          selectedAppointmentId={selectedAppointmentId}
          setSelectedAppointmentId={setSelectedAppointmentId}
          data={appointmentsList}
          handleAppointementListContinueClick={
            handleAppointementListContinueClick
          }
        />
        <SelectExam
          isVisible={showSelectExam}
          toggle={handleClose}
          data={examsData}
          selectedExams={selectedExams}
          setSelectedExams={setSelectedExams}
          handleAddToCart={handleAddToCart}
        />
      </>
    </Modal>
  );
};

export default EyeExamFlow;
