import Image from "next/image";
import React, { FC, useEffect, useState } from "react";
import { AlertColor, Box, Button, Skeleton } from "@mui/material";
import { StateRegulationMsg, StoreDetails, TypeOfExamDTO } from "@/types/bookEyeExamSteps.types";
import PencilIcon from "@root/assets/Images/icons/pencil.svg";
import {
  BRAND_NAME,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
} from "@root/host/src/constants/common.constants";
import i18n from "@root/host/src/language/i18n";
import { ConfirmationModalProps } from "@root/host/src/types/confirmationModal.types";
import dayjs from "dayjs";
import dynamic from "next/dynamic";
import { IMask } from "react-imask";
import style from "./Steps.module.scss";
import { getAllConfigurations } from "@root/host/src/service/common.service";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";

const ConfirmationModal = dynamic(() => import("Host/ConfirmationModal"), {
  ssr: false,
}) as React.FunctionComponent<ConfirmationModalProps>;

const RightSideOfBEE: FC<{
  stepCount: number;
  changeStore: (change: boolean) => void;
  storeDetails: StoreDetails | null;
  appointmentType: TypeOfExamDTO | null;
  timeSlot: string;
  selectedDate: string;
  setStepCount: (count: number) => void;
  showCancel: boolean;
  handleCancelAppointment: () => void;
  brandName: string;
}> = ({
  stepCount,
  changeStore,
  storeDetails,
  appointmentType,
  timeSlot,
  selectedDate,
  setStepCount,
  showCancel,
  handleCancelAppointment,
  brandName,
}) => {
    const { showSnackBar } = useSnackBar();
    const [showCancelAppointmentModal, setShowCancelAppointmentModal] =
      useState(false);
    const [stateWiseMessages, setStateWiseMessages] = useState<StateRegulationMsg[]>([]);
    const [storeMessages, setStoreMessages] = useState<string>('');
    const [isLoding, setIsLoading] = useState<boolean>(false);
    const maskedMobile = IMask.createMask({
      mask: INPUT_MASK.MOBILE_NUMBER,
    });
    const getMaskedPhoneNumber = (phoneNumber: string) => {
      maskedMobile.resolve(phoneNumber);
      return maskedMobile.value;
    };
    const getGooglePhoneNumber = () => {
      const googlePhoneNumber = storeDetails?.PhoneNumber.find(
        (phoneNumber: { Type: string; PhoneNumber: string }) =>
          phoneNumber?.Type?.toLowerCase() === "google"
      );
      if (googlePhoneNumber) {
        return getMaskedPhoneNumber(googlePhoneNumber?.PhoneNumber);
      } else return "";
    };


    useEffect(() => {
        if(storeDetails && stateWiseMessages.length > 0) {
          const stateCode = storeDetails?.StateCode;
          const stateMessage = stateWiseMessages.find((_data) => _data?.state?.indexOf(stateCode) > -1);  
          const langCode = i18n.language;
          if(langCode === 'en' && stateMessage) {
            setStoreMessages(stateMessage.message.en);
          } else if(langCode === 'de' && stateMessage) {
            setStoreMessages(stateMessage.message.de);
          } else {
            setStoreMessages(i18n.t("BOOK_EYE_EXAM.PHYSICIANS_EYECARE_GROUP"));
          }
        }

     }, [storeDetails, stateWiseMessages, i18n.language]);

    useEffect(() => {
      if (storeDetails) {
        setIsLoading(true);
        getAllConfigurations("StateWiseSchedulerMessage")
          .then((res) => {
            const result = res.data?.Result;
            if(result) {
              const data = JSON.parse(result);
              setStateWiseMessages(data);
            }
            setIsLoading(false);
          })
          .catch((error) => {
            setIsLoading(false);
            const message =
              error && error.response?.data?.Error?.Message
                ? error.message
                : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
            showSnackBar(message, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
          });
      }

    }, [storeDetails])
    return (
      <div className={style.rightSideBEEWrapper}>
        <Box className={style.examOverView}>
          {i18n.t("BOOK_EYE_EXAM.EXAM_OVERVIEW")}
        </Box>
        {showCancel && (
          <Box
            className={style.cancelAppointment}
            onClick={() => {
              setShowCancelAppointmentModal(true);
            }}
          >
            {i18n.t("BOOK_EYE_EXAM.CANCEL_APPOINTMENT")}
          </Box>
        )}
        <Box className={style.storeName}>
          {storeDetails?.BrandName || BRAND_NAME[brandName]} - {storeDetails?.WebDescription} 
        </Box>
        <Box className={style.physiciansLocation}>
          {isLoding ? <Skeleton width="60%" /> : <>{storeMessages ? storeMessages : i18n.t("BOOK_EYE_EXAM.PHYSICIANS_EYECARE_GROUP")} {": "}</>}
        </Box>
        <Button
          startIcon={
            <Image src={PencilIcon} alt="Pencil" width={24} height={24} />
          }
          className={style.physiciansLocationChangeBtn}
          onClick={() => changeStore(true)}
        >
          {i18n.t("BOOK_EYE_EXAM.CHANGE_LOCATION")}
        </Button>
        <Box className={style.physiciansAddress}>
          {storeDetails?.AddressLine1} <br /> {storeDetails?.City},{" "}
          {storeDetails?.StateCode} {storeDetails?.ZipCode} <br />{" "}
          {getGooglePhoneNumber() && (
            <span>
              <a href={"tel:" + getGooglePhoneNumber()}>
                {getGooglePhoneNumber()}
              </a>
            </span>
          )}
        </Box>
        {stepCount ? (
          <Box mt={4}>
            <Box className={style.bookEyeExamSelection}>
              {i18n.t("BOOK_EYE_EXAM.SELECTIONS")}:
            </Box>
            <Box
              className={style.bookEyeExamDetails}
              onClick={() => setStepCount(0)}
            >
              {i18n.t("BOOK_EYE_EXAM.EXAM_TYPE")}: {appointmentType?.Description}
              <Image src={PencilIcon} alt="Pencil" width={24} height={24} />
            </Box>
            <Box
              className={style.bookEyeExamDetails}
              onClick={() => setStepCount(0)}
            >
              {i18n.t("BOOK_EYE_EXAM.EXAM_DATE")}:{" "}
              {selectedDate && dayjs(selectedDate).format("dddd, MMMM D")} -{" "}
              {timeSlot}
              <Image src={PencilIcon} alt="Pencil" width={24} height={24} />
            </Box>
          </Box>
        ) : null}
        <ConfirmationModal
          content={i18n.t("BOOK_EYE_EXAM.ARE_YOU_SURE")}
          open={showCancelAppointmentModal}
          handleClose={() => setShowCancelAppointmentModal(false)}
          performAction={() => {
            setShowCancelAppointmentModal(false);
            handleCancelAppointment();
          }}
          Id={1}
          btnOneText={i18n.t("BOOK_EYE_EXAM.NO")}
          btnTwoText={i18n.t("BOOK_EYE_EXAM.YES")}
        />
      </div>
    );
  };

export default RightSideOfBEE;