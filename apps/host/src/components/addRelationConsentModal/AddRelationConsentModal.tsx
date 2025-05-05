import style from "./AddRelationConsentModal.module.scss";
import {
  AlertColor,
  Divider,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
} from "@mui/material";
import React from "react";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import {
  SNACKBAR_COLOR_TYPE,
  SO_DEFAULT_STORE_ID,
} from "@root/host/src/constants/common.constants";
import {
  AddRelationConsentModalProps,
  consentModalSendOtpPayload,
} from "@root/host/src/types/addRelationConsentModal.types";
import IconSVG from "../iconsvg/IconSVG";
import PrimaryModal from "../primary_modal/PrimaryModal";
import Otp from "../authentication/Otp/Otp";
import {
  patientRelationshipSendOtp,
  patientRelationshipValidateOtp,
} from "@root/host/src/service/common.service";

const AddRelationConsentModal = (props: AddRelationConsentModalProps) => {
  const {
    isAddRelationshipFromPatientFile,
    payloadForSendOtpApi,
    setSnackBar,
  } = props;
  const [consentValue, setConsentValue] = React.useState("yes");
  const { showSnackBar } = useSnackBar();
  const handleClose = () => props.setAddRelationSuccessModal(false);
  const [otpModal, setOtpModal] = React.useState(false);
  const [storeId, setStoreId] = React.useState<string | null>(null);

  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      localStorage?.getItem("selectedStore")
    ) {
      setStoreId(
        JSON.parse(localStorage?.getItem("selectedStore") as string)?.Id
      );
    }
  }, [typeof window !== "undefined" && localStorage]);

  const payloadForValidateOtp: consentModalSendOtpPayload = {
    patientId: props?.selectedPatientDataFromList?.Id as number,
    phone: {
      phoneNumber: payloadForSendOtpApi?.phone?.phoneNumber as string,
      isdCode: payloadForSendOtpApi?.phone?.isdCode as string,
    },
    relatedToPatient: payloadForSendOtpApi?.patientId as number,
    storeId: storeId ? Number(storeId) : Number(SO_DEFAULT_STORE_ID),
  };

  const patientRelationshipSendOtpForConsent = async (
    payload: consentModalSendOtpPayload
  ) => {
    await patientRelationshipSendOtp(payload)
      .then((res) => {
        setOtpModal(true);
        if (isAddRelationshipFromPatientFile) {
          setSnackBar(
            res?.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        } else {
          showSnackBar(
            res?.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        }
      })
      .catch((err) => {
        const err_msg = err.response
          ? err.response.data.Error.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        if (isAddRelationshipFromPatientFile) {
          setSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        } else {
          showSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        }
      });
  };

  const patientRelationshipValidateOtpForConsent = async (
    payload: consentModalSendOtpPayload
  ) => {
    await patientRelationshipValidateOtp(payload)
      .then((response) => {
        setOtpModal(false);
        props.setAddRelationSuccessModal(false);
        props.setIsAddPatientModal(false);
        props?.createdPatientId &&
          props.setRecentlyCreatedPatientId &&
          props.setRecentlyCreatedPatientId(props?.createdPatientId);
        if (isAddRelationshipFromPatientFile) {
          setSnackBar(
            response?.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        } else {
          showSnackBar(
            response?.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        }
      })
      .catch((err) => {
        const err_msg = err.response
          ? err.response.data.Error.Message
          : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE;
        if (isAddRelationshipFromPatientFile) {
          setSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        } else {
          showSnackBar(err_msg, SNACKBAR_COLOR_TYPE.ERROR as AlertColor);
        }
      });
  };

  const handleSubmit = () => {
    if (consentValue === "yes") {
      patientRelationshipSendOtpForConsent(payloadForSendOtpApi);
    } else {
      props.setAddRelationSuccessModal(false);
      props.setIsAddPatientModal(false);
      props?.createdPatientId &&
        props.setRecentlyCreatedPatientId &&
        props.setRecentlyCreatedPatientId(props?.createdPatientId);
      if (isAddRelationshipFromPatientFile) {
        setSnackBar(
          props.successMessage as string,
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
        );
      } else {
        showSnackBar(
          props.successMessage as string,
          SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
        );
      }
    }
  };

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setConsentValue((event.target as HTMLInputElement).value);
  };

  return (
    <div className={style.modalContainer}>
      <div className={style.headingwrapper}>
        <h1 className={style.headingText}>Relationship Added</h1>
        <div className={style.closeIconWrapper} onClick={handleClose}>
          <IconSVG
            width="20"
            height="20"
            viewBox="0 0 20 20"
            fill="#4d4d4d"
            name="modal_cross"
          />
        </div>
      </div>
      <Divider className={style.lineColor} />
      <div className={style.modalContent}>
        <h1 className={style.contentHeading}>
          Do you want to give my account access to{" "}
          {props?.selectedPatientDataFromList?.FirstName} ?
        </h1>
        <FormControl>
          <RadioGroup
            row
            aria-labelledby="demo-row-radio-buttons-group-label"
            name="consent"
            onChange={handleChange}
            value={consentValue}
          >
            <FormControlLabel value="yes" control={<Radio />} label="Yes" />
            <FormControlLabel value="no" control={<Radio />} label="No" />
          </RadioGroup>
        </FormControl>
        <div className={style.actionContent}>
          <button className={style.tertiaryButtonStyle} onClick={handleSubmit}>
            Submit
          </button>
        </div>
      </div>
      {otpModal && (
        <PrimaryModal
          modalOpen={otpModal}
          setModalOpen={setOtpModal}
          modalInner={
            <Otp
              isModal={otpModal}
              setIsModalOpen={setOtpModal}
              isOtpModalForConsent={true}
              payloadForResendOtpApi={payloadForSendOtpApi}
              validateOtpForConsent={patientRelationshipValidateOtpForConsent}
              payloadForValidateOtpForConsent={payloadForValidateOtp}
              mobileNumber={props?.payloadForSendOtpApi.phone.phoneNumber}
              isAddRelationshipFromPatientFile={
                isAddRelationshipFromPatientFile
              }
              setSnackBar={setSnackBar}
            />
          }
          cstmStyle={"addPatientOtpModal"}
        />
      )}
    </div>
  );
};

export default AddRelationConsentModal;
