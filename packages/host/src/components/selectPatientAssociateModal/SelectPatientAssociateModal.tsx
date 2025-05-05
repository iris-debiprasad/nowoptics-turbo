import React, { useEffect } from "react";
import styles from "./SelectPatientAssociateModal.module.scss";
import Image from "next/image";
import crossIcon from "../../../../assets/Images/icons/crossIcon.svg";
import {
  SelectPatientInputViewPropsType,
  selectPatientDataTypes,
} from "../../types/selectPatientAssociateModal.types";
import { AlertColor } from "@mui/material";
import SearchPatientBar from "../searchPatientBar/SearchPatientBar";
import { setSelectedPatientToLocalStorage } from "@root/host/src/utils/common.utils";
import { PatientDetailsDTO } from "@root/host/src/types/addPatientModal.types";
import { GetPatientSearchData } from "@root/host/src/service/search.service";
import {
  NUMBER_OF_SEARCH_RECORD,
  SNACKBAR_COLOR_TYPE,
} from "@root/host/src/constants/common.constants";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";

const SelectPatientAssociateModal = ({
  toggle,
  userInput,
  handleUserInput,
  selectPatientData,
  selectedPatient,
  setSelectedPatient,
  handleContinueClick,
  isLoading,
  loadPatientAdvanceSearch
}: SelectPatientInputViewPropsType) => {
  const { showSnackBar } = useSnackBar();
  const [recentlyCreatedPatientId, setRecentlyCreatedPatientId] =
    React.useState(0);
  const [patientSelected, setPatientSelected] = React.useState(false);

  const performPatientSelectAction = (option: selectPatientDataTypes) => {
    setPatientSelected(true);
    setSelectedPatientToLocalStorage(option);
    setSelectedPatient(option);
  };

  const setSnackBar = (message: string, type: AlertColor) => {
    showSnackBar(message, type);
  };

  const markPatientSelectedFalse = () => {
    setPatientSelected(false);
  };

  useEffect(() => {
    if (patientSelected) {
      handleContinueClick && handleContinueClick();
    }
  }, [patientSelected]);

  useEffect(() => {
    if (recentlyCreatedPatientId) {
      let newOption: PatientDetailsDTO;
      GetPatientSearchData(
        recentlyCreatedPatientId.toString(),
        NUMBER_OF_SEARCH_RECORD
      )
        .then(({ data }) => {
          if (data && data.Result) {
            newOption = {
              Id: data.Result[0].Id,
              FirstName: data.Result[0].FirstName,
              LastName: data.Result[0].LastName,
              Email: data.Result[0].Email,
              PhoneNumber: {
                PhoneNumber: data.Result[0].PhoneNumber.PhoneNumber,
                IsdCode: data.Result[0].PhoneNumber.IsdCode,
              },
              Dob: data.Result[0].Dob,
              CreatedAtStoreNumber: data.Result[0]?.CreatedAtStoreNumber,
            };

            performPatientSelectAction(newOption);
          }
        })
        .catch((err) => {
          showSnackBar(
            err.response
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        });
    }
  }, [recentlyCreatedPatientId]);

  return (
    <div className={styles.selectPatientModalContainer}>
      <Image
        src={crossIcon}
        alt="cross-icon"
        height={12}
        width={12}
        className={styles.crossIcon}
        onClick={toggle}
        data-testid="selectPatientInputView-cross"
      />
      <span
        className={styles.heading}
        data-testid="select-patient-modal-heading"
      >
        To continue with the order, <br /> search and select the patient or add
        new patient
      </span>

      <div className={styles.inputContainer}>
        <SearchPatientBar
          performPatientSelectAction={performPatientSelectAction}
          recentlyCreatedPatientId={recentlyCreatedPatientId}
          setRecentlyCreatedPatientId={setRecentlyCreatedPatientId}
          isFromDiffModule={false}
          setSnackBar={setSnackBar}
          markPatientSelectedFalse={markPatientSelectedFalse}
          loadAdvanceSearch={loadPatientAdvanceSearch}
        />
      </div>
    </div>
  );
};

export default SelectPatientAssociateModal;
