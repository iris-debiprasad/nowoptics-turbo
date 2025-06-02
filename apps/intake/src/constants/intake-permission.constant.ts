export const IntakePermission = {
  MEDICAL_FORMS: {
    PAGE: [
      "PatientFile_GetPatient",
      "PatientIntake_GetPatientIntakeForAuthorizedUser"
    ],
    TABS: [],
    PUBLISH_FORM: "IntakeFormSetup_PublishIntakeForm",
    COPY_FORM: "IntakeFormSetup_CopyIntakeFormTemplateAsADraft",
    VERIFY_AVAILIBILITY_TEMPLATE:
      "IntakeTemplateAvailability_VerifyIntakeTemplateAvailability",
    SAVE_AVAILIBILITY_TEMPLATE:
      "IntakeTemplateAvailability_SaveIntakeTemplateAvailability",
  },
  SETUP: {
    PAGE: ["IntakeFormSetup_Get"],
    TABS: [],
    SAVE_INTAKE_FORM: "IntakeFormSetup_SaveIntakeFormDetailsAsDraft",
  },
  HIPAA: {
    PAGE: [
      "Mastersetup_GetAllStateHippaFilesInGrid",
      "Mastersetup_GetAllDefaultHippaFilesInGrid",
      "Mastersetup_GetStatetHippaFile",
      "MasterSetup_GetDefaultHippaFile",
    ],
    TABS: [],
    UPLOAD_STATE_HIPAA : "MasterSetup_UploadStateHippaFile",
    UPLOAD_DEFAULT_HIPAA : "MasterSetup_UploadDefaultHippaFileForState",
  },
  COMPLETE_PATIENT_INTAKE: 'PatientIntake_PatientConsentForNoIntakeChangeForAuthorizedUser'
};
