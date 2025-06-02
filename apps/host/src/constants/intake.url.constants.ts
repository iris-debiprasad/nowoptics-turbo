export const BASE_API_URL = process.env.NEXT_PUBLIC_BASE_URL;

export const INTAKE_URL = {
  GET_ALL_MEDICAL_FORMS: "/intake/Setup/Grid",
  SAVE_AVAILIBILITY_TEMPLATE: "/intake/Setup/Availability",
  VERIFY_AVAILIBILITY_TEMPLATE: "/intake/Setup/Availability/Verify",
  COMPANY_CATEGORY_AVAILIBILITY:
    "/intake/Setup/IntakeTemplateAvailability/companycategory/grid/",
  STORE_AVAILIBILITY: "/intake/setup/intaketemplateavailability/store/grid/",
  STATE_AVAILIBILITY: "/intake/setup/intaketemplateavailability/state/grid/",
  GET_INTAKE_FORM: "/intake/Setup/",
  SAVE_INTAKE_FORM_AS_DRAFT : "/intake/Setup/draft",
  PUBLISH_INTAKE_FORM : "/intake/Setup/publish/",
  COPY_INTAKE_FORM : "/intake/Setup/copy",
  MARK_PATIENT_INTAKE_COMPLETE : "/intake/PatientConsent/",
  MARK_PATIENT_INTAKE_COMPLETE_AUTHORIZED : "/intake/PatientConsent/Confirm/false/",
  GET_VISION_INTAKE_BY_PATIENT_ID : "/intake/visionIntake/",
  VALIDATE_STATEID : "/intake/visionIntake/validate/",
  SAVE_VISION_INTAKE : "/intake/visionIntake",
  GET_RX_RENEWALIDS : "/patient/customer/prescriptions/rxrenewalIds/"
};

export const MASTER_SETUP = {
  GET_DEFAULT_STATE_HIPPA_FILES: "/mastersetup/state/defaulthippafiles/grid",
  GET_ALL_STATE_HIPPA_FILES: "/mastersetup/state/hippafiles/grid",
  DOWNLOAD_STATE_HIPPA_FILE: "/intake/hippa/",
  DOWNLOAD_DEFAULT_HIPPA_FILE: "intake/defaulthippafile/",
  UPLOAD_DEFAULT_HIPPA_FILE: "intake/defaulthippa",
  UPLOAD_STATE_HIPPA_FILE: "/intake/hippa",
  GET_QUESTION_TYPES: "/mastersetup/masterlookup/type/QuestionType",
  GET_LANGUAGE_TYPES: "/mastersetup/IntakeLanguageTypes",
  MANDATORY_CHECKBOXES : "/mastersetup/hipaa/mandatoryCheckboxes",
  GET_ALL_COUNTRY : "/mastersetup/country",
  GET_ALL_STATES : "/mastersetup/country/{countryId}/state",
  CREATE_EVENT : "/mastersetup/createevent",
  LAST_EXAM_DATE_OPTIONS : "/mastersetup/masterlookup/type/LastEyeExamDateType"
};

export const INVENTORY_URL = {
  GET_PRODUCTS: "/inventory/products/true/",
};

export const PATIENT_INTAKE_URL = {
  GET_INTAKE_FORM : "/intake/patient/",
  GET_INTAKE_FORM_ANONYMOUS : "/intake/patientintake",
  SAVE_PATIENT_INTAKE_FORM : "/intake/save",
  SAVE_PATIENT_INTAKE_FORM_ANONYMOUS : "/intake/patientintake",
  SAVE_PATIENT_INTAKE_FORM_AUTHORIZED : "/intake/save/",
  FETCH_STATE_HIPPA_FILE : "/intake/hipaa/",
}

export const PATIENT_INFORMATION_URL = {
  GET_PATIENT_INFORMATION: "/patient/demographic/",
  GET_PATIENT_INFORMATION_CUSTOMER : "/patient/Customer/",
  GET_PATIENT_INFORMATION_ANONYMOUS : "patient/MedicalForm/",
  SAVE_PATIENT_INFORMATION: "/patient/Update",
  SAVE_PATIENT_ADDRESS: "/patient/Address",
  SAVE_PATIENT_ADDRESS_INFORMATION_ANONYMOUS : "/patient/MedicalForm/Update",
  GET_ADDRESS_BY_ZIP: "/mastersetup/zip/address?postalCode=",
  SAVE_PATIENT_INFORMATION_CUSTOMER : "/patient/Customer",
  SAVE_PATIENT_ADDRESS_CUSTOMER : "/patient/Customer/Address",
  VERIFY_OTP: "/patient/patientOTP",
  RESEND_OTP: "/patient/patientOTP/resend",
  VERIFY_OTP_CUSTOMER : "/patient/Customer/patientOTP",
  RESEND_OTP_CUSTOMER : "/patient/Customer/patientOTP/resend",
  VERIFY_OTP_ANONYMOUS : "/patient/MedicalForm/patientOTP",
  RESEND_OTP_ANONYMOUS : "/patient/MedicalForm/patientOTP/resend",
}