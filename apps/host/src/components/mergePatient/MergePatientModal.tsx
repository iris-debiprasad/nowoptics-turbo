import {
  MergePatientModalProps,
  MergePatientPayloadType,
  PatientListToMerge,
} from "../../types/MergePatient.types";
import IconSVG from "../iconsvg/IconSVG";
import style from "./MergePatientModal.module.scss";
import {
  AlertColor,
  Box,
  Button,
  FormLabel,
  Grid,
  TextField,
} from "@mui/material";
import dayjs from "dayjs";
import {
  DATE_FORMAT,
  INPUT_MASK,
  SNACKBAR_COLOR_TYPE,
  isMobileNumberValidRegex,
} from "@root/host/src/constants/common.constants";
import { useEffect, useState } from "react";
import ConfirmationModal from "../confirmationModal/ConfirmationModal";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { ERROR_MESSAGE } from "@root/host/src/constants/auth.constants";
import { addMergePatient } from "@root/host/src/service/common.service";
import { IMask } from "react-imask";

const MergePatientModal = (props: MergePatientModalProps) => {
  const {
    setIsSelectPatientForMergeModal,
    patientListToMerge,
    setMergePatientModal,
    isMergeFromDiffModule,
    setSnackBar,
  } = props;
  const [primaryPatient, setPrimaryPatient] = useState(patientListToMerge[0]);
  const [secondaryPatients, setSecondaryPatients] = useState(
    patientListToMerge.slice(1)
  );
  const [confirmationModalOpen, setConfirmationModalOpen] =
    useState<boolean>(false);
  const { showSnackBar } = useSnackBar();

  const maskedMobile = IMask.createMask({
    mask: INPUT_MASK.MOBILE_NUMBER,
  });

  const getMaskedPhoneNumber = (phoneNumber: string) => {
    maskedMobile.resolve(phoneNumber);
    return maskedMobile.value;
  };

  const handleMakePrimary = (patient: PatientListToMerge) => {
    setSecondaryPatients((prevSecondaryPatients) => {
      const updatedSecondaryPatients = [
        ...prevSecondaryPatients,
        primaryPatient,
      ];
      return updatedSecondaryPatients.filter((p) => p.Id !== patient.Id);
    });
    setPrimaryPatient(patient);
  };

  const handleClose = () => setMergePatientModal(false);

  function hanldeMerge() {
    setConfirmationModalOpen(true);
  }

  const addMergePatientFiles = () => {
    const mergePatientPayload: MergePatientPayloadType = {
      PrimaryPatientId: primaryPatient.Id,
      MergePatientList: secondaryPatients.map((p) => p.Id),
    };
    addMergePatient(mergePatientPayload)
      .then((res) => {
        setConfirmationModalOpen(false);
        if (isMergeFromDiffModule) {
          setSnackBar &&
            setSnackBar(
              res.data?.SuccessMessage,
              SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
            );
        } else {
          showSnackBar(
            res.data?.SuccessMessage,
            SNACKBAR_COLOR_TYPE.SUCCESS as AlertColor
          );
        }

        setMergePatientModal(false);
        setIsSelectPatientForMergeModal(false);
      })
      .catch((err) => {
        if (isMergeFromDiffModule) {
          setSnackBar &&
            setSnackBar(
              err.response
                ? err.response.data.Error.Message
                : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
              SNACKBAR_COLOR_TYPE.ERROR as AlertColor
            );
        } else {
          showSnackBar(
            err.response
              ? err.response.data.Error.Message
              : ERROR_MESSAGE.API_DEFAULT_ERROR_MESSAGE,
            SNACKBAR_COLOR_TYPE.ERROR as AlertColor
          );
        }
      });
  };

  return (
    <div className={style.mergePatientModalContainer}>
      <div className={style.headingwrapper}>
        <p className={style.headingText}>Merge Patients</p>
        <div className={style.closeIconWrapper} onClick={handleClose}>
          <IconSVG
            width="12"
            height="12"
            viewBox="0 0 15 15"
            fill="#4d4d4d"
            name="modal_cross"
          />
        </div>
      </div>
      <hr className={style.lineColor} />
      <div className={style.modalContent}>
        {patientListToMerge.map((patient, index) => (
          <div
            className={`${style.patientSection} ${
              primaryPatient.Id === patient.Id ? style.activeBackground : ""
            }`}
            key={index}
          >
            <Box className={style.patientIdWithBtn}>
              <Box className={style.patientIdText}>
                Patient Id : {patient.Id}
              </Box>
              {primaryPatient.Id !== patient.Id && (
                <Button
                  onClick={() => handleMakePrimary(patient)}
                  className={style.confirmBtn}
                >
                  Mark it Main
                </Button>
              )}
            </Box>
            <Box>
              <Grid
                container
                spacing={2}
                component="form"
                data-testid="form"
                noValidate
                className={style.formFields}
              >
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>First Name</FormLabel>
                  <TextField
                    placeholder="First Name"
                    className={style.textInput}
                    value={patient.FirstName}
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>Middle Name</FormLabel>
                  <TextField
                    placeholder="Middle Name"
                    className={style.textInput}
                    value={patient?.MiddleName ? patient?.MiddleName : ""}
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>Last Name</FormLabel>
                  <TextField
                    placeholder="Last Name"
                    className={style.textInput}
                    value={patient.LastName}
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>Email</FormLabel>
                  <TextField
                    placeholder="Email"
                    className={style.textInput}
                    value={patient.Email}
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>
                    Date of Birth
                  </FormLabel>
                  <TextField
                    placeholder="Date of Birth"
                    className={style.textInput}
                    value={dayjs(patient.DateOfBirth).format(DATE_FORMAT)}
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>
                    Last Appointment
                  </FormLabel>
                  <TextField
                    placeholder="Last Appointment"
                    className={style.textInput}
                    value={
                      patient?.LastAppointment
                        ? dayjs(patient.LastAppointment).format(DATE_FORMAT)
                        : ""
                    }
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>Last Order</FormLabel>
                  <TextField
                    placeholder="Last Order"
                    className={style.textInput}
                    value={patient?.LastOrder ? patient?.LastOrder : ""}
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>Address</FormLabel>
                  <TextField
                    placeholder="Address"
                    className={style.textInput}
                    value={patient?.Address ? patient?.Address : ""}
                    disabled
                  />
                </Grid>
                <Grid item xs={4} className={style.gridField}>
                  <FormLabel className={style.formLabel}>
                    Phone Number
                  </FormLabel>
                  <TextField
                    placeholder="Phone Number"
                    className={style.textInput}
                    value={
                      isMobileNumberValidRegex.test(patient.PhoneNumber)
                        ? getMaskedPhoneNumber(patient.PhoneNumber)
                        : patient.PhoneNumber
                    }
                    disabled
                  />
                </Grid>
              </Grid>
            </Box>
          </div>
        ))}
      </div>
      <div className={style.btnContainer}>
        <Button onClick={() => hanldeMerge()} className={style.confirmBtn}>
          Merge
        </Button>
        <Button onClick={() => handleClose()} className={style.closeBtn}>
          Cancel
        </Button>
      </div>
      {confirmationModalOpen && (
        <ConfirmationModal
          content={`Are you sure you want to merge duplicate Patient(Id): ${secondaryPatients
            .map((patient) => patient.Id)
            .join(",")} with active Patient(Id): ${
            primaryPatient?.Id
          }? NOTE: This action cannot be undone.`}
          open={confirmationModalOpen}
          handleClose={() => {
            setConfirmationModalOpen(false);
          }}
          performAction={addMergePatientFiles}
          Id={primaryPatient.Id as number}
          btnOneText={"Cancel"}
          btnTwoText={"Confirm"}
        />
      )}
    </div>
  );
};

export default MergePatientModal;
