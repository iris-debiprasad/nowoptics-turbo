import { GetPatientSearchData } from "@/service/search.service";
import { selectPatientDataTypes } from "@/types/selectPatientAssociateModal.types";
import React, { useEffect, useRef, useState } from "react";
import SelectPatientComponent from "../selectPatientAssociateModal/SelectPatientAssociateModal";
import { ERROR_MESSAGE } from "@/constants/auth.constants";
import { AppEvents, SNACKBAR_COLOR_TYPE } from "@/constants/common.constants";
import { AlertColor, Modal } from "@mui/material";
import BackdropLoader from "../backdrop_loader/BackdropLoader";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { SearchProductsDataDTO } from "@/types/Header.types";
import { associateAddToCart } from "@/service/common.service";
import { useAppDispatch } from "@/store/useStore";
import { updateCartId } from "@/store/reducer/cartIdReducer";
import { useRouter } from "next/navigation";
import { setSelectedPatientToLocalStorage } from "@/utils/common.utils";

interface Props {
  isVisible: boolean;
  handleClose: () => void;
  spProductData: SearchProductsDataDTO;
}

function AddSpProductData(props: Props) {
  const loading = useAxiosLoader();
  const { showSnackBar } = useSnackBar();
  const [userInput, setUserInput] = useState<string>("");
  const router = useRouter();
  const [selectPatientData, setSelectPatientData] = useState<
    selectPatientDataTypes[] | null
  >(null);
  const timeoutRef = useRef<NodeJS.Timeout | string | number | undefined>();
  const [selectedPatient, setSelectedPatient] =
    useState<selectPatientDataTypes | null>(null);
  const dispatch = useAppDispatch();

  const getCartData = (
    patientData: selectPatientDataTypes,
    productData: SearchProductsDataDTO
  ) => {
    const storeData = JSON.parse(
      localStorage.getItem("selectedStore") as string
    );
    let cartData = {
      PatientId: patientData.Id,
      CreatedForStoreId: storeData.Id,
      CreatedByStoreId: storeData.Id,
      OrderCategoryId: null,
      Orders: [
        {
          OrderTypeId: 2,
          ShippingModeId: null,
          LineItems: [
            {
              ItemNumber: productData.modelnumber,
              Quantity: 1,
            },
          ],
          Prescription: null,
          OrderTypeCode: "OC",
          OrderCategoryCode: "N",
          LeftEyeProgressive: null,
          RightEyeProgressive: null,
          LeftEyeBiFocal: null,
          RightEyeBiFocal: null,
          RightPd: null,
          LeftPd: null,
          RightOCHt: null,
          LeftOCHt: null,
          VoPatientPaperCaptureIDs: [],
        },
      ],
      OrderCategoryCode: "N",
    };
    return cartData;
  };

  const handleUserInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = e.target;
    setUserInput(value);
  };
  const handleContinueClick = () => {
    if (selectedPatient) {
      const modifiedCartData = getCartData(
        selectedPatient,
        props.spProductData
      ) as any;

      associateAddToCart(modifiedCartData)
        .then((res) => {
          dispatch(updateCartId(res?.data?.Result?.Id));
          if (selectedPatient) {
            setSelectedPatientToLocalStorage(selectedPatient, {
              storeCartId: res?.data?.Result?.Id,
            });
          }
          window.dispatchEvent(new Event(AppEvents.ADD_TO_CART));
          router.push(
            `/cart?patientId=${selectedPatient?.Id}&cartId=${res?.data?.Result?.Id}`
          );
          props.handleClose();
        })
        .catch((err) => {
          showSnackBar(
            err?.response?.data?.Error?.Message
              ? err?.response?.data?.Error?.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  };

  useEffect(() => {
    clearTimeout(timeoutRef.current);
    timeoutRef.current = setTimeout(debounceApiCall, 800);
  }, [userInput]);

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

  return (
    <Modal
      open={props.isVisible}
      onClose={props.handleClose}
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
      }}
    >
      <>
        <BackdropLoader openLoader={loading} />
        <SelectPatientComponent
          toggle={props.handleClose}
          userInput={userInput}
          handleUserInput={handleUserInput}
          selectPatientData={selectPatientData}
          selectedPatient={selectedPatient}
          setSelectedPatient={setSelectedPatient}
          handleContinueClick={handleContinueClick}
        />
      </>
    </Modal>
  );
}

export default AddSpProductData;
