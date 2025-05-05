import {
  selectPatientOptionDataPropType,
  selectPatientDataTypes,
} from "../../../types/selectPatientAssociateModal.types";
import React, { ReactNode } from "react";
import styles from "./Options.module.scss";
import Image from "next/image";
import checkIcon from "../../../../../assets/Images/icons/checkmark.svg";
import patientDummyImage from "../../../../../assets/Images/icons/patient-dummy-image.svg";
import { setSelectedPatientToLocalStorage } from "../../../utils/common.utils";
import Button from "@mui/material/Button";
import { IMask } from "react-imask";
import { DATE_FORMAT, INPUT_MASK } from "../../../constants/common.constants";
import dayjs from "dayjs";

const Options = ({
  data,
  selectedPatient,
  setSelectedPatient,
}: selectPatientOptionDataPropType) => {
  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });
  const handleOptionSelect = (option: selectPatientDataTypes) => {
    setSelectedPatientToLocalStorage(option);
    setSelectedPatient(option);
  };
  const getMaskedPhoneNumber = (phoneNumber: string) => {
    maskedMobile.resolve(phoneNumber);
    return maskedMobile.value;
  };
  return (
    <div
      className={styles.selectPatientOptions}
      data-testid="selectPatientModal-patient-options"
    >
      {data?.map((option: selectPatientDataTypes, optionIndex: number) => {
        const { Id, FirstName, LastName, Email, PhoneNumber, Dob } = option;
        return (
          <div
            className={styles.option}
            data-testid="select-patient-modal-option"
            key={`select-patient-modal-option-${optionIndex}`}
          >
            <Image
              src={patientDummyImage}
              alt="user-image"
              height={32}
              width={26}
            />

            <div className={styles.nameContianer}>
              <span>{`${FirstName} ${LastName} - ${Id}`}</span>
              <span>{`${getMaskedPhoneNumber(
                PhoneNumber.PhoneNumber as string
              )} | DOB - ${dayjs(Dob).format(DATE_FORMAT)}`}</span>
            </div>
            {Id === selectedPatient?.Id ? (
              <Button
                className={styles.selectButton}
                onClick={() => handleOptionSelect(option)}
                data-testid={`select-patient-modal-select-button-${optionIndex}`}
                startIcon={
                  (
                    <Image
                      src={checkIcon}
                      alt="check-icon"
                      height={8}
                      width={12}
                    />
                  ) as ReactNode
                }
              >
                Selected
              </Button>
            ) : (
              <Button
                className={styles.selectButton}
                onClick={() => handleOptionSelect(option)}
                data-testid={`select-patient-modal-select-button-${optionIndex}`}
              >
                Select Patient
              </Button>
            )}
          </div>
        );
      })}
    </div>
  );
};

export default Options;
