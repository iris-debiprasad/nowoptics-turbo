import { createSelector } from "@reduxjs/toolkit";
import { RootState } from "@root/host/src/store/store";
import {
  CheckValidPatientIntakeStepReturn,
  CheckValidPatientIntakeStepSelector,
  GetAllQuestionsBySectionCodeSelector,
  GetChildQuestionSelector,
  GetIntakeValidationSelector,
  GetOptionsByQuestionCodeSelector,
  GetPatientInformationErrorsType,
  GetPatientInformationValuesSelector,
  GetPatientIntakeChildQuestionsSelector,
  GetPatientIntakeFormStepSelector,
  GetPatientIntakeStepErrorsSelector,
  GetPatientIntakeStepSelectorReturn,
  GetPatientIntakeStepTypeSelector,
  GetQuestionByCodeSelector,
  GetQuestionByIndexSelector,
  GetRecommendationsSelector,
  GetSectionFormByCodeSelector,
  IntakeFormError,
  PatientIntakeHippaHtmlInput,
  UpdateRecommendationToggleType,
} from "../../types/Intake.types";
import { SelectOptions } from "../../types/intakeInput.types";
import dayjs from "dayjs";
import {
  compareObjects,
  getPatientInformationAndAddress,
} from "../../utils/intake.utils";
import {
  GetLanguageTypeResponse,
  PatientIntakeFormSection,
} from "../../types/intakeApi.types";
import { INTAKE_LANGUAGE_TYPES } from "@root/intake/src/constants/intake.constants";

export const GetQuestionsByParentIndex = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: GetChildQuestionSelector) => payload,
  ],
  (sections, payload) => {
    const section = sections.find(
      (s) => s.SectionIndex === payload.SectionIndex
    );
    const question = section?.Questions.find(
      (s) => s.QuestionIndex === payload.QuestionIndex
    );
    if (question === undefined) return [];
    const questions = section?.Questions.filter(
      (q) =>
        q.ParentQuestionIndex === payload.QuestionIndex &&
        q.ParentQuestionOptionIndex === payload.OptionIndex
    );
    return questions;
  }
);

export const GetQuestionByIndex = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: GetQuestionByIndexSelector) => payload,
  ],
  (steps, payload) => {
    const section = steps.find((s) => s.SectionIndex === payload.SectionIndex);
    const question = section?.Questions.find(
      (s) => s.QuestionIndex === payload.QuestionIndex
    );
    return question;
  }
);

export const GetApiLoadingState = createSelector(
  [(state: RootState) => state],
  ({ intakeApi, visionIntakeApi }) => {
    return (
      Object.values(intakeApi.queries).some(
        (query) => query?.status === "pending"
      ) ||
      Object.values(intakeApi.mutations).some(
        (query) => query?.status === "pending"
      ) ||
      Object.values(visionIntakeApi.queries).some(
        (query) => query?.status === "pending"
      ) ||
      Object.values(visionIntakeApi.mutations).some(
        (query) => query?.status === "pending"
      )
    );
  }
);

export const GetFormSectionByCode = createSelector(
  [
    (state: RootState) => state.intake.intakeForm,
    (payload: GetSectionFormByCodeSelector) => payload,
  ],
  (intakeForm, payload) => {
    return intakeForm.IntakeFormSections.find(
      (s) => s.SectionIndex === payload.sectionIndex
    );
  }
);

export const GetQuestionByCode = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: GetQuestionByCodeSelector) => payload,
  ],
  (sections, payload) => {
    const section = sections.find(
      (s) => s.SectionIndex === payload.SectionIndex
    );
    const question = section?.Questions.find(
      (s) => s.QuestionIndex === payload.QuestionIndex
    );
    return question;
  }
);

export const GetAllQuestionsBySectionCode = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: GetAllQuestionsBySectionCodeSelector) => payload,
  ],
  (sections, payload) => {
    const section = sections.find(
      (s) => s.SectionIndex === payload.SectionIndex
    );
    return section?.Questions;
  }
);

export const GetRecommendationsByQuestionCode = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: GetRecommendationsSelector) => payload,
  ],
  (sections, payload) => {
    const section = sections.find(
      (s) => s.SectionIndex === payload.SectionIndex
    );
    const question = section?.Questions.find(
      (s) => s.QuestionIndex === payload.QuestionIndex
    );

    if (payload.OptionIndex === undefined) {
      return question?.Recommendations;
    }

    return question?.Recommendations.filter(
      (r) => r.OptionIndex === payload.OptionIndex
    );
  }
);

export const GetOptionsByQuestionCode = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: GetOptionsByQuestionCodeSelector) => payload,
  ],
  (sections, payload) => {
    const section = sections.find(
      (s) => s.SectionIndex === payload.SectionIndex
    );
    const question = section?.Questions.find(
      (s) => s.QuestionIndex === payload.QuestionIndex
    );
    return question?.QuestionOptions;
  }
);

export const GetFormErrorByType = createSelector(
  [
    (state: RootState) => state.intake.formErrors,
    (payload: Omit<IntakeFormError, "errorMessage">) => payload,
  ],
  (formErrors, payload) => {
    if (formErrors === undefined) return;
    const error = (formErrors as IntakeFormError[]).filter((errorObj) => {
      return (
        errorObj.type === payload.type &&
        errorObj.SectionIndex === payload.SectionIndex &&
        errorObj.QuestionIndex === payload.QuestionIndex &&
        errorObj.OptionIndex === payload.OptionIndex &&
        errorObj.field === payload.field &&
        errorObj.RecommendationIndex === payload.RecommendationIndex
      );
    });

    return error[0];
  }
);

export const GetIntakeValidation = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: GetIntakeValidationSelector) => payload,
  ],
  (intakeFormSections, payload) => {
    const section = intakeFormSections.find(
      (s) => s.SectionIndex === payload.SectionIndex
    );
    const question = section?.Questions.find(
      (s) => s.QuestionIndex === payload.QuestionIndex
    );
    return [question?.QuestionValidation[0], question?.QuestionValidation[1]];
  }
);

export const GetPatientIntakeStepper = createSelector(
  [(state: RootState) => state.intake],
  (intake) => {
    const isPreviewMode = intake.patientIntakeMetaData.previewMode;
    const patientIntakeForm = intake.patientIntakeForm;
    const previewIntakeForm = intake.previewIntakeForm;
    if (isPreviewMode) {
      return {
        activeStep: previewIntakeForm.activeStep,
        steps: previewIntakeForm.steps,
      };
    }
    return {
      activeStep: patientIntakeForm.activeStep,
      steps: patientIntakeForm.steps,
    };
  }
);

export const GetPatientIntakeStepType = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: GetPatientIntakeStepTypeSelector) => payload,
  ],
  (intake, { activeStep }): GetPatientIntakeStepSelectorReturn => {
    const patientIntakeForm = intake.patientIntakeForm;
    const isPreviewMode = intake.patientIntakeMetaData.previewMode;
    if (!isPreviewMode) {
      if (activeStep === 0) return "PatientInformation";
      const stepperSteps = patientIntakeForm.steps;
      const lastStep = stepperSteps.at(-1);
      if (lastStep === undefined) return "Invalid";
      if (lastStep.index === activeStep) {
        return "HippaForms";
      } else if (activeStep < lastStep.index) {
        return "GenericStep";
      }
      return "Invalid";
    }

    if (isPreviewMode) {
      const previewIntakeForm = intake.previewIntakeForm;
      const previewIntakeFormSteps = previewIntakeForm.steps;
      const lastStep = previewIntakeFormSteps.at(-1);
      if (lastStep?.index! === activeStep) {
        return "HippaForms";
      }
    }
    return "GenericStep";
  }
);

export const GetPatientIntakeFormStep = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: GetPatientIntakeFormStepSelector) => payload,
  ],
  (intake, { activeStep }) => {
    const isPreviewMode = intake.patientIntakeMetaData.previewMode;
    const key = isPreviewMode ? "previewIntakeForm" : "patientIntakeForm";

    const stepperStep = intake[key].steps.find(
      (step) => step.index === activeStep
    );
    if (stepperStep === undefined) return;
    return intake[
      key
    ].form?.PatientIntakeForm?.IntakeFormResponses?.Sections.find(
      (section) => section.Code === stepperStep.sectionCode
    );
  }
);

export const GetPatientIntakeChildQuestions = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: GetPatientIntakeChildQuestionsSelector) => payload,
  ],
  (intake, { sectionCode, parentQuestionCode, parentOptionCode }) => {
    const isPreviewMode = intake.patientIntakeMetaData.previewMode;
    const key = isPreviewMode ? "previewIntakeForm" : "patientIntakeForm";
    const section = intake[
      key
    ].form?.PatientIntakeForm?.IntakeFormResponses?.Sections.find(
      (section) => section.Code === sectionCode
    );
    if (section === undefined) return;
    const childQuestions = section.Questions.filter(
      (question) =>
        question.ParentQuestionCode === parentQuestionCode &&
        question.ParentQuestionOptionCode === parentOptionCode
    );
    return childQuestions.length === 0 ? [] : childQuestions;
  }
);

export const CheckValidPatientIntakeStep = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: CheckValidPatientIntakeStepSelector) => payload,
  ],
  (intake, { activeStep }): CheckValidPatientIntakeStepReturn => {
    const isPreviewMode = intake.patientIntakeMetaData.previewMode;
    const key = isPreviewMode ? "previewIntakeForm" : "patientIntakeForm";
    const steps = intake[key].steps;
    const lastStepIndex = steps.at(-1)?.index;
    const firstStepIndex = steps.at(0)?.index;

    if (isPreviewMode) {
      if (
        intake.patientIntakeMetaData.previewModeStateId === -1 &&
        activeStep === lastStepIndex! - 1
      ) {
        return {
          hasNextStep: false,
          hasPreviousStep: true,
        };
      }

      if (activeStep === lastStepIndex) {
        return {
          hasNextStep: false,
          hasPreviousStep: true,
        };
      }
    }

    if (steps.length === 1) {
      return {
        hasNextStep: false,
        hasPreviousStep: false,
      };
    }

    if (firstStepIndex === undefined || lastStepIndex === undefined) {
      return {
        hasNextStep: false,
        hasPreviousStep: false,
      };
    }

    if (activeStep === lastStepIndex) {
      return {
        hasNextStep: true,
        hasPreviousStep: true,
      };
    }
    if (activeStep === firstStepIndex) {
      return {
        hasNextStep: true,
        hasPreviousStep: false,
      };
    }

    return {
      hasNextStep: true,
      hasPreviousStep: true,
    };
  }
);

export const GetPatientIntakeHippa = createSelector(
  [(state: RootState) => state.intake.patientIntakeForm],
  (patientIntakeForm) => {
    const hippa = patientIntakeForm.form?.PatientIntakeForm?.Hipaa;
    return Buffer.from(hippa || "", "base64").toString() ?? "";
  }
);

export const GetPatientInformationErrors = createSelector(
  [(state: RootState) => state.intake],
  (state) => {
    const { patientIntakeFormErrors, patientIntakeInformation } = state;
    const errors = patientIntakeFormErrors.filter(
      (error) => error.type === "PatientInformation"
    );
    const result: Record<keyof GetPatientInformationErrorsType, string> = {
      Dob: "",
      Email: "",
      FirstName: "",
      LastName: "",
      GenderCode: "",
      Id: "",
      PreferredLanguageCode: "",
      PrimaryPhoneNo: "",
      ZipCode: "",
      Address1: "",
      City: "",
      State: "",
      Country: "",
      County: "",
    };
    if (errors.length === 0) return result;
    errors.forEach((error) => {
      result[error.key as keyof GetPatientInformationErrorsType] =
        error.errorMessage;
    });
    return result;
  }
);

export const GetPatientInformationValue = createSelector(
  [(state: RootState) => state.intake.patientIntakeInformation],
  (patientIntakeInformation): GetPatientInformationValuesSelector => {
    return (
      patientIntakeInformation ??
      ({
        Dob: "",
        Email: "",
        FirstName: "",
        LastName: "",
        GenderCode: "",
        Id: "",
        PreferredLanguageCode: "",
        PrimaryPhoneNo: {
          IsdCode: "",
          Number: "",
        },
        ZipCode: "",
        ShippingAddress: {
          AddressLine1: "",
          AddressLine2: "",
          City: "",
          Country: "",
          County: "",
          State: "",
          ZipCode: "",
        },
        IsMarketingConsent: true
      } as unknown as GetPatientInformationValuesSelector)
    );
  }
);

export const GetIsUpdatedPatientInformation = createSelector(
  [(state: RootState) => state.intake],
  ({
    patientIntakeInformation,
    patientIntakeInformationCopy,
    patientIntakeMetaData: { isAnonymous },
  }) => {
    if (!patientIntakeInformation || !patientIntakeInformationCopy)
      return {
        isInformationUpdated: false,
        isAddressUpdated: false,
      };
    if (isAnonymous) {
      return {
        isInformationUpdated:
          JSON.stringify(patientIntakeInformation) !==
          JSON.stringify(patientIntakeInformationCopy),
        isAddressUpdated:
          JSON.stringify(patientIntakeInformation) !==
          JSON.stringify(patientIntakeInformationCopy),
      };
    }

    const { address, information } = getPatientInformationAndAddress(
      patientIntakeInformation
    );
    const { address: addressCopy, information: informationCopy } =
      getPatientInformationAndAddress(patientIntakeInformationCopy);

    return {
      isInformationUpdated:
        JSON.stringify(information) !== JSON.stringify(informationCopy),
      isAddressUpdated: JSON.stringify(address) !== JSON.stringify(addressCopy),
    };
  }
);

export const GetIsLanguageUpdated = createSelector(
  [(state: RootState) => state.intake],
  ({ patientIntakeInformation, patientIntakeInformationCopy }) => {
    if (!patientIntakeInformation || !patientIntakeInformationCopy)
      return false;
    return (
      patientIntakeInformation.PreferredLanguageCode !==
      patientIntakeInformationCopy.PreferredLanguageCode
    );
  }
);

export const GetOTPModalValues = createSelector(
  [(state: RootState) => state.intake.patientInformationOTP],
  (patientInformationOTP) => {
    return patientInformationOTP;
  }
);

export const GetOTPErrors = createSelector(
  [(state: RootState) => state.intake.patientIntakeFormErrors],
  (errors) => {
    const errorsObj = errors.filter(
      (error) =>
        error.type === "PatientInformation" &&
        (error.key === "EmailOtp" || error.key === "PhoneOtp")
    );

    const result: Record<"EmailOtp" | "PhoneOtp", string> = {
      EmailOtp: "",
      PhoneOtp: "",
    };

    errorsObj.forEach((error) => {
      result[error.key as keyof typeof result] = error.errorMessage;
    });

    return result;
  }
);

export const GetHippaFormStepErrors = createSelector(
  [(state: RootState) => state.intake.patientIntakeFormErrors],
  (errors) => {
    const errorsObj = errors.filter((error) => error.type === "HippaForms");
    const result: Record<
      "Hippa" | "GuardianFirstName" | "GuardianLastName",
      string
    > = {
      Hippa: "",
      GuardianFirstName: "",
      GuardianLastName: "",
    };
    errorsObj.forEach((error) => {
      if (error.key === "Signature") {
        result.Hippa = "*" + error.errorMessage;
      }

      if (error.key === "GuardianFirstName") {
        result.GuardianFirstName = error.errorMessage;
      }

      if (error.key === "GuardianLastName") {
        result.GuardianLastName = error.errorMessage;
      }
    });
    return result;
  }
);

export const GetPatientIntakeStepErrors = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: GetPatientIntakeStepErrorsSelector) => payload,
  ],
  (intake, { sectionCode, questionCode }) => {
    const isPreviewMode = intake.patientIntakeMetaData.previewMode;
    const key = isPreviewMode
      ? "previewIntakeFormErrors"
      : "patientIntakeFormErrors";
    const errorsObj = intake[key].filter(
      (error) =>
        error.type === "GenericStep" &&
        error.step === sectionCode &&
        error.questionCode === questionCode
    );
    const result: Record<
      "Required" | "Date" | "Valid" | "Email" | "Number",
      string
    > = {
      Required: "",
      Date: "",
      Valid: "",
      Email: "",
      Number: "",
    };
    errorsObj.forEach((error) => {
      if (error.key === "Date") {
        result.Date = error.errorMessage;
      }
      if (error.key === "Required") {
        result.Required = error.errorMessage;
      }
      if (error.key === "Valid") {
        result.Valid = error.errorMessage;
      }
      if (error.key === "Email") {
        result.Email = error.errorMessage;
      }
      if (error.key === "Number") {
        result.Number = error.errorMessage;
      }
    });
    return result;
  }
);

export const GetPatientIntakeFormForSubmit = createSelector(
  [
    (state: RootState) =>
      state.intake.patientIntakeForm.form?.PatientIntakeForm,
  ],
  (patientIntakeForm) => {
    return patientIntakeForm;
  }
);

export const GetRecommendationToggle = createSelector(
  [
    (state: RootState) => state.intake.intakeRecommendationToggles,
    (payload: UpdateRecommendationToggleType) => payload,
  ],
  (recommendationToggle, { OptionIndex, QuestionIndex, SectionIndex }) => {
    return recommendationToggle.find(
      (toggle) =>
        toggle.OptionIndex === OptionIndex &&
        toggle.QuestionIndex === QuestionIndex &&
        toggle.SectionIndex === SectionIndex
    );
  }
);

export const GetRecommendationError = createSelector(
  [
    (state: RootState) => state.intake.formErrors,
    (payload: UpdateRecommendationToggleType) => payload,
  ],
  (errors, { OptionIndex, QuestionIndex, SectionIndex, type }) => {
    const error = errors.find(
      (error) =>
        error.OptionIndex === OptionIndex &&
        error.QuestionIndex === QuestionIndex &&
        error.SectionIndex === SectionIndex &&
        error.type === "Recommendation" &&
        (error.field === "RecommendationText" ||
          error.field === "RecommendationRadio" ||
          error.field === "RecommendationSku")
    );
    return error?.errorMessage;
  }
);

export const GetSequenceOrderOptions = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: { SectionIndex: number }) => payload,
  ],
  (orderOptions, { SectionIndex }) => {
    const section = orderOptions.find((s) => s.SectionIndex === SectionIndex);

    if (section === undefined) return [];

    return section.Questions.filter(
      (q) =>
        q.ParentQuestionCode === null && q.ParentQuestionOptionCode === null
    )
      .map((q) => {
        return {
          label: q.SequenceNumber,
          value: q.SequenceNumber,
        } as SelectOptions;
      })
      .filter((o) => Number(o.value) > -1);
  }
);

export const GetPatientIntakeEditing = createSelector(
  [(state: RootState) => state.intake],
  (intake) => {
    const isPreviewMode = intake.patientIntakeMetaData.previewMode;
    const key = isPreviewMode ? "previewIntakeForm" : "patientIntakeForm";
    return intake[key].editing;
  }
);

export const GetIsPatientUnderAge = createSelector(
  [(state: RootState) => state.intake],
  (intake) => {
    const patientIntakeInformation = intake.patientIntakeInformation;
    const dob = dayjs(patientIntakeInformation?.Dob);
    if (!dob.isValid()) return false;
    const age = dayjs().diff(dob, "year");
    return age < 18;
  }
);

export const IsIntakeFormSpanish = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: { languageTypes: GetLanguageTypeResponse | undefined }) =>
      payload.languageTypes,
  ],
  (intake, languageTypes) => {
    if (!languageTypes) return false;

    const spanishLanguage = languageTypes.Result.find(
      (lang) => lang.Code === INTAKE_LANGUAGE_TYPES.SPANISH
    );
    if (!spanishLanguage) return false;

    return intake.formLanguage === spanishLanguage.Id;
  }
);

export const GetSectionColumnCount = createSelector(
  [
    (state: RootState) => state.intake.intakeForm.IntakeFormSections,
    (payload: { SectionIndex: number }) => payload,
  ],
  (sections, { SectionIndex }) => {
    const section = sections.find((s) => s.SectionIndex === SectionIndex);
    if (section === undefined) return 0;
    return section.ColumnCount;
  }
);

export const IsIntakeFormUpdated = createSelector(
  [(state: RootState) => state.intake],
  ({ intakeForm, intakeFormCopy }) => {
    return !compareObjects(intakeForm, intakeFormCopy);
  }
);

export const IsCurrentStepUpdated = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: { activeStep: number }) => payload,
  ],
  (intake, { activeStep }) => {
    // Check if patient information step has been updated or not
    if (activeStep === 0) {
      const patientInformation = intake.patientIntakeInformation;
      const patientInformationCopy = intake.patientIntakeInformationCopy;
      if (
        patientInformation === undefined ||
        patientInformationCopy === undefined
      )
        return false;
      return (
        JSON.stringify(patientInformation) !==
        JSON.stringify(patientInformationCopy)
      );
    }

    // Check if patient question step has been updated or not
    const currentStep =
      intake.patientIntakeForm.form?.PatientIntakeForm.IntakeFormResponses.Sections.at(
        activeStep - 1
      );
    const currentStepCopy =
      intake.patientIntakeFormCopy.form?.PatientIntakeForm.IntakeFormResponses.Sections.at(
        activeStep - 1
      );
    if (currentStep === undefined) return false;
    return JSON.stringify(currentStep) !== JSON.stringify(currentStepCopy);
  }
);

export const GetEditStateForUser = createSelector(
  [(state: RootState) => state.intake],
  ({
    patientIntakeForm,
  }): {
    status: "None" | "OldEdit" | "NewEdit" | "PatientInfoOldEdit";
    section: undefined | PatientIntakeFormSection;
  } => {
    const sections =
      patientIntakeForm.form?.PatientIntakeForm.IntakeFormResponses.Sections;
    // If the form is not in edit mode or IsComplete is true that means the form is completed
    if (
      sections === undefined ||
      !patientIntakeForm.editing ||
      patientIntakeForm.form?.PatientIntakeForm.IsCompleted
    )
      return {
        section: undefined,
        status: "None",
      };

    // Check if all the sections have all there questions which
    // are parent question and are required have their answervalue to an empty string
    const isNewEdit = sections.every((section) => {
      return section.Questions.every((question) => {
        // each questions is a parentquestion , IsRequired and AnswerValue is empty
        return (
          question.ParentQuestionCode === null &&
          question.IsRequired &&
          question.AnswerValue === ""
        );
      });
    });

    // if !isNewEdit find the first section that has a question that has been answered ParentQuestionCode === null and AnswerValue !== ""
    const section = sections.find((section) => {
      return section.Questions.some(
        (question) =>
          question.ParentQuestionCode === null && question.AnswerValue !== ""
      );
    });
    return {
      section,
      status: isNewEdit ? "NewEdit" : "OldEdit",
    };
  }
);

export const GetPatientIntakeColumnCount = createSelector(
  [
    (state: RootState) => state.intake,
    (payload: { sectionCode: string }) => payload,
  ],
  (intake, { sectionCode }) => {
    const key = intake.patientIntakeMetaData.previewMode
      ? "previewIntakeForm"
      : "patientIntakeForm";
    const section = intake[
      key
    ].form?.PatientIntakeForm?.IntakeFormResponses?.Sections.find(
      (section) => section.Code === sectionCode
    );
    return section?.ColumnCount;
  }
);
