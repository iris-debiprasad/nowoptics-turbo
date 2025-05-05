import { AlertColor, Button, CircularProgress } from "@mui/material";
import AddCircleOutlineIcon from "@mui/icons-material/AddCircleOutline";
import { useTranslation } from "react-i18next";

import styles from "./index.module.scss";
import useAxiosLoader from "@/hooks/useAxiosLoader";
import { SuccessModal } from "../components/success-modal";
import React from "react";
import { EnrollFormFieldsElements } from "../components/enroll-form-fields-elements";
import { useStantonAccess } from "./use-stanton-access";
import { RelatedPatientsModal } from "../components/related-patients-modal";
import { useRelationshipTypes } from "./use-relationship-types";
import { SelectRelationshipModal } from "../components/select-relationship-modal";
import { useRelatedPatients } from "./use-related-patients";
import { SubmitHandler, useForm } from "react-hook-form";
import { EnrollFormFields } from "@/types/stantonAccess.types";
import { useSnackBar } from "@/contexts/Snackbar/SnackbarContext";
import { SNACKBAR_COLOR_TYPE } from "@/constants/common.constants";

const MAX_DISPLAYED_FORMS = 3;
const PHONE_IN_USE_ERROR_CODE = "Patient_Account_PhoneExists";

export function EnrollForm(): React.JSX.Element {
  const { t } = useTranslation();
  const isPostLoading = useAxiosLoader();
  const { showSnackBar } = useSnackBar();

  const submitBtnRef = React.useRef<HTMLButtonElement>(null);
  const [dependentsFormDisplayed, setDependentsFormDisplayed] =
    React.useState<number>(0);

  const [isSuccessModalOpen, setIsSuccessModalOpen] =
    React.useState<boolean>(false);
  const [isRelatedPatientsModalOpen, setIsRelatedPatientsModalOpen] =
    React.useState<boolean>(false);
  const [isSelectRelationshipModalOpen, setIsSelectRelationshipModalOpen] =
    React.useState<boolean>(false);

  const relationshipTypes = useRelationshipTypes();
  const form = useForm<EnrollFormFields[]>();

  const {
    relatedPatients,
    clearRelatedPatients,
    selectedRelatedPatientIndex,
    setSelectedRelatedPatientIndex,
    selectedRelatedPatientRelationtype,
    setSelectedRelatedPatientRelationtype,
  } = useRelatedPatients({
    phoneNumber: form.getValues("0.telephone"),
    fetchRelatedPatients: isRelatedPatientsModalOpen,
  });

  const areRelatedPatientsParamsComplete =
    relatedPatients !== null &&
    selectedRelatedPatientIndex !== null &&
    selectedRelatedPatientRelationtype !== null &&
    relationshipTypes !== null;

  const { onEnroll } = useStantonAccess({
    relatedPatientsParams: areRelatedPatientsParamsComplete
      ? {
        relationshipTypes,
        patients: relatedPatients,
        selectedRelationtype: selectedRelatedPatientRelationtype,
        selectedIndex: selectedRelatedPatientIndex,
      }
      : null,
  });

  // This effect will be triggered once the flow for Related Patients has been completed
  // to avoid clicking on enroll button again
  React.useEffect(() => {
    if (
      selectedRelatedPatientRelationtype === null ||
      selectedRelatedPatientIndex === null
    )
      return;
    
    submitBtnRef.current?.click();
  }, [selectedRelatedPatientIndex, selectedRelatedPatientRelationtype]);

  // === Modals
  // === Success modal

  const onCloseSuccessModal = () => setIsSuccessModalOpen(false);

  // === Related Patients Modal

  const onCloseRelatedPatientsModal = () =>
    setIsRelatedPatientsModalOpen(false);

  const onContinueRelatedPatientsModal = () => {
    setIsRelatedPatientsModalOpen(false);
    setIsSelectRelationshipModalOpen(true);
  };

  // === Select Relationship Modal

  const onCloseSelectRelationshipModal = () =>
    setIsSelectRelationshipModalOpen(false);

  // === Dependents Form UI Handling

  const addDependentForm = () => {
    setDependentsFormDisplayed((prev) =>
      prev + 1 > MAX_DISPLAYED_FORMS ? prev : prev + 1,
    );
  };

  const removeDependentForm = (index: number) => {
    const data = Object.values(form.getValues());
    const newDependents = data.filter((_, idx) => idx !== index);

    form.reset({ ...newDependents });

    setDependentsFormDisplayed((prev) => {
      const nextDependents = prev - 1;
      return nextDependents < 0 ? prev : nextDependents;
    });
  };

  // === Submits

  const onSubmit: SubmitHandler<EnrollFormFields[]> = async (data) => {
    try {
      await onEnroll(data);
      form.reset();
      setDependentsFormDisplayed(0);
      setIsSuccessModalOpen(true);

      // If there are not relatedPatients, means that the user did not encounter the flow for selecting
      // related patient relationship
      if (!relatedPatients) return;

      // Clear patients information and related
      clearRelatedPatients();
      setSelectedRelatedPatientRelationtype(null);
      setSelectedRelatedPatientIndex(null);
    } catch (err: any) {
      if (err.response.data?.Error?.Code === PHONE_IN_USE_ERROR_CODE)
        return setIsRelatedPatientsModalOpen(true);

      showSnackBar(
        err.response.data.Error.Message,
        SNACKBAR_COLOR_TYPE.ERROR as AlertColor,
      );
    }
  };

  const onRelationshipTypeSubmit = (relationshipType: string) => {
    setSelectedRelatedPatientRelationtype(relationshipType);
    setIsSelectRelationshipModalOpen(false);
  };

  return (
    <section className={styles.enroll}>
      <header className={styles.enroll__header}>
        <p>{t("STANTON_ACCESS.FORM.HEADLINE")}</p>
      </header>

      <form
        className={styles.enroll__form}
        onSubmit={form.handleSubmit(onSubmit)}
      >
        <EnrollFormFieldsElements
          {...{ form }}
          relationships={relationshipTypes}
          fields={{
            coc: { initialValue: "", name: "0.coc" },
            dob: { initialValue: null, name: "0.dob" },
            email: { initialValue: "", name: "0.email" },
            firstName: { initialValue: "", name: "0.firstName" },
            gender: { initialValue: "", name: "0.gender" },
            lastName: { initialValue: "", name: "0.lastName" },
            telephone: { initialValue: "", name: "0.telephone" },
            zip: { initialValue: "", name: "0.zip" },
            relationshipType: null,
          }}
        />

        {[...new Array(dependentsFormDisplayed)].map((_, index) => (
          <EnrollFormFieldsElements
            {...{ form }}
            key={`enroll-form-${Math.random() * 10 + index}`}
            relationships={relationshipTypes}
            fields={{
              coc: {
                initialValue: form.getValues("0.coc"),
                name: `${index + 1}.coc`,
              },
              dob: { initialValue: null, name: `${index + 1}.dob` },
              email: {
                initialValue: form.getValues("0.email"),
                name: `${index + 1}.email`,
              },
              firstName: {
                initialValue: "",
                name: `${index + 1}.firstName`,
              },
              gender: { initialValue: "", name: `${index + 1}.gender` },
              lastName: { initialValue: "", name: `${index + 1}.lastName` },
              telephone: {
                initialValue: form.getValues("0.telephone"),
                name: `${index + 1}.telephone`,
              },
              zip: {
                initialValue: form.getValues("0.zip"),
                name: `${index + 1}.zip`,
              },
              relationshipType: {
                initialValue: "",
                name: `${index + 1}.relationshipType`,
              },
            }}
            onRemove={() => removeDependentForm(index + 1)}
          />
        ))}

        {dependentsFormDisplayed < MAX_DISPLAYED_FORMS && (
          <Button
            className={styles.enroll__add_dependent}
            type="button"
            onClick={addDependentForm}
          >
            <AddCircleOutlineIcon />
            {t("STANTON_ACCESS.FORM.ADD_DEPENDENT_BUTTON")}
          </Button>
        )}

        <Button
          type="submit"
          className={styles.enroll__form_submit}
          disabled={isPostLoading}
          ref={submitBtnRef}
        >
          {isPostLoading ? (
            <CircularProgress size={20} />
          ) : (
            t("STANTON_ACCESS.FORM.ENROLL_BUTTON")
          )}
        </Button>
      </form>

      <SuccessModal open={isSuccessModalOpen} onClose={onCloseSuccessModal} />

      {isRelatedPatientsModalOpen && relatedPatients ? (
        <RelatedPatientsModal
          {...{
            setSelectedRelatedPatientIndex,
            selectedRelatedPatientIndex,
            relatedPatients,
          }}
          open={isRelatedPatientsModalOpen}
          onContinue={onContinueRelatedPatientsModal}
          onClose={onCloseRelatedPatientsModal}
        />
      ) : (
        <></>
      )}

      {isSelectRelationshipModalOpen && selectedRelatedPatientIndex !== null ? (
        <SelectRelationshipModal
          relationships={relationshipTypes}
          onClose={onCloseSelectRelationshipModal}
          open={isSelectRelationshipModalOpen}
          onSubmit={onRelationshipTypeSubmit}
        />
      ) : (
        <></>
      )}
    </section>
  );
}
