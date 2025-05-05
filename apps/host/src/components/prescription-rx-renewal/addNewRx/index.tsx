import * as React from "react";
import { Box, Typography } from "@mui/material";
import styles from "./AddNewRx.module.scss";
import dynamic from "next/dynamic";
import CommonTableSkeleton from "@/components/skeleton_loader/CommonTableSkeleton/CommonTableSkeleton";
import {
  AddNewRxPrescriptionModalPropsDTO,
  ContactRxPrescriptionDTO,
} from "@/types/commonRx.types";
import { USER_TYPE } from "@/constants/common.constants";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { RxRenewalAddNew } from "@/types/rxRenewal.types";
import { useRecaptchaToken } from "@root/host/src/hooks/useGoogleRecaptcha";

const AddNewRxPrescriptionModal = dynamic(
  () => import("patient/AddNewPrescriptionModal"),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: window.innerWidth > 900 ? "380px" : "500px" }}>
        <CommonTableSkeleton
          rows={window.innerWidth > 900 ? 5 : 10}
          columns={window.innerWidth > 600 ? 5 : 1}
          headSkeletonHeight={20}
          bodySkeletonHeight={50}
        />
      </div>
    ),
  }
) as React.FunctionComponent<AddNewRxPrescriptionModalPropsDTO>;

const ContactRxPrescriptionModal = dynamic(
  () => import("patient/ContactRxPrescriptionModal"),
  {
    ssr: false,
    loading: () => (
      <div style={{ minHeight: window.innerWidth > 900 ? "500px" : "600px" }}>
        <CommonTableSkeleton
          rows={window.innerWidth > 900 ? 8 : 10}
          columns={window.innerWidth > 600 ? 5 : 1}
          headSkeletonHeight={20}
          bodySkeletonHeight={50}
        />
      </div>
    ),
  }
) as React.FunctionComponent<ContactRxPrescriptionDTO>;
import BackdropLoader from "@/components/backdrop_loader/BackdropLoader";

import useAxiosLoader from "@/hooks/useAxiosLoader";

const AddNewRx = (props: RxRenewalAddNew) => {
  const {
    setModalOpen,
    showAddPrescriptionModal,
    prescriptionHeaders,
    addPrescription,
    storeId,
    patientId,
    addContactPrescription,
    setContactModalOpen,
    helpingTexts,
    openContactModalOpen,
    handleRxModalBack,
    handleContactModalBack,
    showBoth,
    handleRenewBothBack,
    eventId,
  } = props;
  const { showSnackBar } = useSnackBar();
  const { fetchRecaptchaToken } = useRecaptchaToken();
  const loading = useAxiosLoader();
  return (
    <Box className={styles.chooseToRenewWrapper}>
      <BackdropLoader openLoader={loading} />
      <Box className={styles.chooseToRenewHeader}>
        <Typography variant="h1" className={styles.title}>
          Share Current Prescription
        </Typography>
        <Typography variant="body1" className={styles.description}>
          Please enter your current prescription.
        </Typography>
      </Box>
      <Box className={styles.container}>
        <Box className={styles.content}>
          {showAddPrescriptionModal && (
            <AddNewRxPrescriptionModal
              showDescription={false}
              showDropdown={true}
              uploadImage={true}
              viewMode={false}
              headingTitle="Enter Glasses Prescription"
              prescriptionType="eyeglass"
              setModalOpen={setModalOpen}
              prescriptionHeaders={prescriptionHeaders}
              type="patientEyeglass"
              addPrescription={addPrescription}
              storeId={storeId}
              patientId={patientId}
              userType={USER_TYPE.PATIENT}
              showSnackBar={showSnackBar}
              buttonText={
                showBoth ? "Continue to Contact Prescription" : "Continue"
              }
              backBtnShow={true}
              backBtnFunction={handleRxModalBack}
              setContactModalOpen={setContactModalOpen}
              showBoth={showBoth}
              fetchRecaptchaToken={fetchRecaptchaToken}
              isRxRenewalFlow={true}
              eventId={eventId}
            />
          )}
          {openContactModalOpen && (
            <ContactRxPrescriptionModal
              addPrescription={addContactPrescription}
              setModalOpen={setContactModalOpen}
              helpingTexts={helpingTexts}
              userType={USER_TYPE.PATIENT}
              storeId={storeId}
              patientId={patientId}
              headingTitle="Enter Contacts Prescription"
              isOrderFlow={false}
              uploadImage={true}
              showSnackBar={showSnackBar}
              noDiagnosisCode={true}
              noDoctorName={true}
              noEmployeeName={true}
              backBtnShow={true}
              buttonText="Continue"
              fetchRecaptchaToken={fetchRecaptchaToken}
              backBtnFunction={handleContactModalBack}
              showBoth={showBoth}
              handleRenewBothBack={handleRenewBothBack}
              isRxRenewalFlow={true}
              eventId={eventId}
            />
          )}
        </Box>
      </Box>
    </Box>
  );
};

export default AddNewRx;
