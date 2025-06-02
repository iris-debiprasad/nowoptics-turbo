import type Autocomplete from "@mui/material/Autocomplete";
import { BaseInputTypes } from "./intakeInput.types";
import { ChangeEvent, MouseEvent, RefObject } from "react";
import {
  GetCompanyDropdownResult,
  GetIntakeResult,
  GetMedicalFormSortFields,
  GetPatientInformationResult,
  GetPatientIntakeFormResult,
  GetStateDropdownResult,
  GetStoreOptionsResult,
  PatientIntakeFormQuestion,
  PatientIntakeFormQuestionOption,
  Question,
  QuestionOption,
  Recommendation,
} from "./intakeApi.types";
import { BaseOptionType } from "./intakeInput.types";
import dayjs, { Dayjs } from "dayjs";
import { SaveVisionIntakeRequest } from "./visionIntake.types";

export type StepObjectType = {
  index?: number;
  title: string;
  expanded: boolean;
  questions: QuestionObjectType[];
};

export type RecommendType = {
  toggle?: boolean;
  sku?: string[] | null;
  others?: string;
};

export type RecommendProps = {
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex: number;
};

export type GetChildQuestionSelector = {
  QuestionIndex: number;
  SectionIndex: number;
  OptionIndex?: number;
};

export type GetQuestionByIndexSelector = {
  SectionIndex?: number;
  QuestionIndex?: number;
};

export type GetQuestionByCodeSelector = {
  QuestionIndex: number;
  SectionIndex: number;
};

export type GetOptionsByQuestionCodeSelector = {
  QuestionIndex: number;
  SectionIndex: number;
};

export type GetIntakeValidationSelector = {
  SectionIndex?: number;
  QuestionIndex?: number;
};

export type GetPatientIntakeStepTypeSelector = {
  activeStep: number;
};

export type GetPatientIntakeFormStepSelector = {
  activeStep: number;
};

export type GetPatientIntakeChildQuestionsSelector = {
  sectionCode: string;
  parentQuestionCode: string;
  parentOptionCode: string;
};

export type CheckValidPatientIntakeStepSelector = {
  activeStep: number;
};

export type CheckValidPatientIntakeStepReturn = {
  hasNextStep: boolean;
  hasPreviousStep: boolean;
};

export type GetPatientIntakeStepSelectorReturn =
  | "GenericStep"
  | "PatientInformation"
  | "HippaForms"
  | "Invalid";

export type GetAllQuestionsBySectionCodeSelector = {
  SectionIndex: number;
};

export type GetRecommendationsSelector = {
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex?: number;
};

export type GetSectionFormByCodeSelector = {
  sectionIndex: number;
};

export type QuestionObjectType = {
  index?: number;
  questionType: QuestionTypeEnum;
  parentQuestionCode?: string;
  parentIndex?: number;
  optionIndex?: number;
  questionCode: string;
  questionText: string;
  recommend?: RecommendType;
  required: boolean;
  options: BaseOptionType[];
  sortingOrder?: number;
};

export type IntakeInitData = {
  formName: string;
  formLanguage?: number;
  steps: StepObjectType[];
  formAvailibility: AvailibilityType;
  intakeForm: GetIntakeResult;
  intakeFormCopy: GetIntakeResult;
  formErrors: IntakeFormError[];
  patientIntakeForm: PatientIntakeForm;
  patientIntakeFormCopy: PatientIntakeForm;
  previewIntakeForm: PatientIntakeForm;
  patientIntakeFormErrors: PatientIntakeFormError[];
  previewIntakeFormErrors: PatientIntakeFormError[];
  patientIntakeInformation?: GetPatientInformationResult | null;
  patientIntakeInformationCopy?: GetPatientInformationResult | null;
  patientInformationOTP: PatientInformationOTPType;
  patientIntakeMetaData: PatientIntakeMetaData;
  intakeRecommendationToggles: IntakeRecommendationToggle[];
  files: any[];
};

export type IntakeRecommendationToggle = {
  toggle: boolean;
  type: "SKU" | "Text" | "None";
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex: number;
};

export type PatientIntakeMetaData = {
  patientId: string | number | undefined;
  encryptedAppointmentId: string | undefined;
  isAnonymous: boolean;
  previewMode: boolean;
  session: any;
  storeDetails : StoreDetails | null;
  previewModeStateId: number;
};

export type PatientInformationOTPType = {
  isEmailNeeded: boolean;
  isPhoneNeeded: boolean;
  timeLeft: number;
  otpValuePhone: string[];
  newEmail: string;
  newPhone: string;
  otpValueEmail: string[];
  open: boolean;
};

export type CompanyAvailibilityType = {
  company: string;
  startDate: string;
  endDate: string;
};

export type StateAvailibilityType = {
  stateId: string;
  startDate: string;
  endDate: string;
};

export type StoreAvailibilityType = {
  storeId: string;
  startDate: string;
  endDate: string;
};

export type AvailibilityTableVariant = "company" | "store" | "state";

export type AvailibilityTableType = {
  company: {
    label: string;
    expanded: boolean;
    data: CompanyAvailibilityType[];
  };
  state: {
    label: string;
    expanded: boolean;
    data: StateAvailibilityType[];
  };
  store: {
    label: string;
    expanded: boolean;
    data: StoreAvailibilityType[];
  };
};

export type AvailibilityType = {
  open: boolean;
  company: GetCompanyDropdownResult[];
  state: GetStateDropdownResult[];
  store: GetStoreOptionsResult[];
  startDate: dayjs.Dayjs | null;
  templateId: string;
  templateCode: string;
  tables: AvailibilityTableType;
};

export type QuestionStepProps = {
  formSectionCode?: string;
  SectionIndex: number;
};

export type QuestionFormProps = {
  QuestionIndex: number;
  SectionIndex: number;
  handleDeleteQuestion?: () => void;
  handleCopyQuestion?: () => void;
  handleAddQuestion?: () => void;
};

export type UpdateQuestionActionType = {
  key: keyof Question;
  value: string | number | boolean;
  QuestionIndex: number;
  SectionIndex: number;
};

export type CopyQuestionActionType = {
  QuestionIndex: number;
  SectionIndex: number;
};

export type SwitchInputProps = {
  checked?: boolean;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  disabled?: boolean;
};

export type DeleteQuestionActionType = {
  QuestionIndex: number;
  SectionIndex: number;
};

export type AddQuestionActionType = {
  SectionIndex: number;
};

export type AddOptionActionType = {
  SectionIndex: number;
  QuestionIndex: number;
  label?: string;
  isSelected?: boolean;
};

export type UpdateOptionLabelActionType = {
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex?: number;
  key: keyof QuestionOption;
  value: string | number | boolean;
};

export type UpdateOptionRecommendActionType = {
  stepIndex?: number;
  questionIndex?: number;
  optionIndex?: number;
  key: keyof RecommendType;
  value: string | number | boolean | null | string[];
};

export type DeleteOptionActionType = {
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex: number;
};

export type UpdateSectionDescriptionActionType = {
  SectionIndex: number;
  value: string;
};

export type UpdateSectionColumnCountActionType = {
  SectionIndex: number;
  value: number;
};

export type SetAvailibilityModalPropertyActionType = {
  key: keyof AvailibilityType;
  value: string | boolean | string[] | number | unknown;
};

export type ToggleAvailibilityModalAccordionActionType = {
  key: AvailibilityTableVariant;
};

export type UpdateFormNameActionType = {
  Code: string;
};

export type UpdateRecommendTextActionType = {
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex?: number;
  value: string;
};

export type UpdateRecommendationToggleType =
  Partial<IntakeRecommendationToggle>;

export type UpdateRecommendSkuActionType = {
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex?: number;
  value: string;
};

export type RemoveSkuRecommendationActionType = {
  RecommendationIndex: number;
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex?: number;
  Recommendation : Recommendation;
};

export type WipeRecommendationsActionType = {
  SectionIndex: number;
  QuestionIndex: number;
  OptionIndex: number;
  Type?: "SKU" | "Text";
  isDisabling?: boolean;
};

export type ChangeFormLanguageActionType = {
  value: number;
};

export type AvailibilityTableProps = {
  type: "state" | "store" | "companycategory";
  templateId: string;
  label: string;
  expanded: boolean;
  tableKey: AvailibilityTableVariant;
};

export type DeleteFormSectionActionType = {
  SectionIndex: number;
};

export type AddChildQuestionActionType = {
  SectionIndex?: number;
  QuestionIndex?: number;
  OptionIndex?: number;
};

export type SetDuplicateQuestionCodeActionType = {
  questionIndex?: number;
  stepIndex?: number;
};

export type QuestionSwitcherProps = {
  QuestionIndex: number;
  SectionIndex: number;
  expanded?: boolean;
};

export type QuestionTypeProps = {
  QuestionIndex: number;
  SectionIndex: number;
};

export enum QuestionTypeEnum {
  CHECKBOX_LIST = "1",
  DROPDOWN = "2",
  DATE = "3",
  DATE_AND_TIME = "4",
  EMAIL = "5",
  NUMBER = "6",
  RADIOLIST = "7",
  TEXT = "8",
  TEXT_AREA = "9",
}

export type CheckboxProps = {
  checked: boolean;
  id?: string;
  name?: string;
  className?: string;
  handleChange?: () => void;
  handleLabelClick?: (e: MouseEvent<HTMLLabelElement>) => void;
  readonly?: boolean;
  disabled?: boolean;
};

export type RadioProps = CheckboxProps & {
  value?: string | number;
  testid?: string;
};

export type MultiOptionProps = QuestionTypeProps & {
  questionType?: QuestionTypeEnum;
};

export type AccordionStepProps = {
  SectionIndex: number;
  Code?: string;
  index: number;
  title: string;
  children?: React.ReactNode;
  Expanded : boolean;
};

export type DialogProps = {
  heading: string;
  headingStyles?: string;
  handleConfirm: () => void;
  handleCancel: () => void;
  children?: React.ReactNode;
  open: boolean;
  hideCancel?: boolean;
  hideConfirm?: boolean;
  altConfirmText?: string;
  altCancelText?: string;
};

export type IntakeModalProps = {
  modalTitle?: React.ReactNode;
  open: boolean;
  handleClose?: () => void;
  handleConfirm?: () => void;
  children?: React.ReactNode;
  disableBackdropClick?: boolean;
};

export type CheckboxModalProps = {
  QuestionIndex?: number;
  SectionIndex?: number;
  questions: JSX.Element[];
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  childQuestions: Question[];
};

export type OptionItemProps = {
  index?: number;
  option: QuestionOption;
  questionType?: QuestionTypeEnum;
  QuestionIndex: number;
  SectionIndex: number;
};

export interface DateInputProps
  extends Omit<BaseInputTypes, "onChange" | "value"> {
  disablePast?: boolean;
  disableFuture?: boolean;
  onChange?: (value: dayjs.Dayjs | null) => void;
  fullWidth?: boolean;
  readOnly?: boolean;
  value?: Dayjs | null;
  minDate?: Dayjs;
  maxDate?: Dayjs;
  type? : "date-picker" | "datetime-picker";
  enableKeyBoardInput?: boolean;
}

export type MedicalForm = {
  templateId: number;
  code: string;
  status: "Draft" | "Published";
  createdOn: string;
  publishedDate: string;
  action: string;
};

export type HippaLanguageForm = {
  language: string;
  action: string;
};

export type HippaStateForm = {
  state: string;
  languageAction: string;
};

export type HippaFormTableProps = {
  handleDownloadHippaFile: (
    hippaFormId: number | null,
    type: "Default" | "State"
  ) => Promise<void>;
};

export type StateTableFileUpload = {
  stateId: number;
  code: "en-US" | "es-ES";
  inputKey: number;
};

export type FormDialogActions = {
  type: "Publish" | "Copy";
  code: string;
  open: boolean;
  templateId: string;
};

export type FormErrorFields =
  | "FormCode"
  | "SectionDescription"
  | "QuestionCode"
  | "OptionCode"
  | "QuestionDescription"
  | "OptionDescription"
  | "BackDays"
  | "RecommendationText"
  | "RecommendationSku"
  | "RecommendationRadio";

export type FormErrorType =
  | "Question"
  | "Section"
  | "Option"
  | "Validation"
  | "Recommendation"
  | "Form";

export type IntakeFormError = {
  type: FormErrorType;
  field: FormErrorFields;
  SectionIndex?: number;
  OptionIndex?: number;
  QuestionIndex?: number;
  RecommendationIndex?: number;
  errorMessage: string;
};

export type UpdateFormErrorsActionType = {
  formErrors: IntakeFormError[];
};

export type DateValidationProps = {
  SectionIndex: number;
  QuestionIndex: number;
};

export type UpdateDateValidationActionType = {
  value: string;
  SectionIndex: number;
  QuestionIndex: number;
  type: "min" | "max";
};

export type StepLabelType = {
  index: number;
  label: string;
  active: boolean;
  completed: boolean;
  error: boolean;
  file?: any;
  sectionCode : string;
};

export type StepperProps = {
  activeStep: number;
  steps: StepLabelType[];
};

export type PatientIntakeForm = {
  activeStep: number;
  steps: StepLabelType[];
  form?: GetPatientIntakeFormResult;
  editing: boolean;
};

export type StepSwitcherProps = {
  activeStep: number;
};

export type PatientIntakeStepProps = {
  activeStep: number;
};

export type BasePatientQuestionProps = {
  sectionCode: string;
  question: PatientIntakeFormQuestion;
};

export type PatientIntakeQuestionProps = BasePatientQuestionProps & {};

export type QuestionInputProps = BasePatientQuestionProps & {};

export type QuestionOptionsProps = BasePatientQuestionProps & {};

export type QuestionOptionItemProps = BasePatientQuestionProps & {
  option: PatientIntakeFormQuestionOption;
};

export type UpdatePatientIntakeOptionActionType = {
  sectionCode: string;
  optionCode?: string;
  questionCode: string;
  value: string | boolean | dayjs.Dayjs;
  remove?: boolean;
};

export type ChangePatientIntakeStepActionType = {
  action: "Back" | "Next" | "Jump";
  newStepValue: number;
  file?: any;
};

export type PatientIntakeFormError = {
  type: "GenericStep" | "PatientInformation" | "HippaForms";
  errorMessage: string;
  questionCode?: string;
  step?: number | string;
  key?: string;
};

export type GetPatientInformationValuesSelector = Pick<
  GetPatientInformationResult,
  | "Id"
  | "FirstName"
  | "LastName"
  | "Dob"
  | "GenderCode"
  | "Email"
  | "ShippingAddress"
  | "PrimaryPhoneNo"
  | "ZipCode"
  | "PreferredLanguageCode"
  | "IsMarketingConsent"
>;

export type GetPatientInformationErrorsType = {
  FirstName: string;
  LastName: string;
  Dob: string;
  GenderCode: string;
  Email: string;
  PrimaryPhoneNo: string;
  PreferredLanguageCode: string;
  Id: string;
  Address1: string;
  City: string;
  State: string;
  ZipCode: string;
  Country: string;
  County: string;
};

export type PatientInformationProps = {
  activeStep: number;
};

export type PatientIntakeHippaProps = {
  activeStep: number;
};

export type UpdatePatientInformationValueActionType = {
  key: keyof GetPatientInformationValuesSelector;
  value: string | number | boolean | dayjs.Dayjs;
  childKey?:
    | keyof GetPatientInformationValuesSelector["ShippingAddress"]
    | keyof GetPatientInformationValuesSelector["PrimaryPhoneNo"];
};

export type SetPatientIntakeErrorsActionType = {
  errors: PatientIntakeFormError[];
};

export type UpdateOtpPropertyActionType = {
  key: keyof Omit<PatientInformationOTPType, "otpValuePhone" | "otpValueEmail">;
  value: string | number | boolean | string[];
};

export type UpdateOtpValueActionType = {
  type: "phone" | "email";
  value: string;
  index: number;
};

export type TogglePatientIntakeEditingActionType = { flag: boolean };

export type UpdateQuestionSequenceActionType = {
  SectionIndex: number;
  newValue: number;
  oldValue: number;
};

export type PatientIntakeHippaHtmlInput = {
  type: string;
  value: boolean | string;
  name: string;
  id : string;
}[];

export type OTPModalProps = { open: boolean; activeStep: number };

export type GetPatientIntakeStepErrorsSelector = {
  sectionCode: string;
  questionCode: string;
};

export type PatientIntakePageProps = {
  patientId?: string | number;
};

export type TableHeaderColumnType = {
  id: string;
  name: string;
  isSort?: boolean;
  isFilter?: boolean;
  type?: string | number | null;
};

export type PreviewIntakeProps = {
  templateId: string;
  handleClose: () => void;
  open: boolean;
};

export type SetFileElementActionType = {
  index: number;
  file: any;
};

export type UpdateGuardianInitialsActionType = {
  type: keyof Pick<
    GetPatientIntakeFormResult["PatientIntakeForm"],
    "GuardianFirstName" | "GuardianLastName"
  >;
  value: string;
};

export type StoreDetails = {
  Id: number;
  StoreNumber: string;
  WebDescription: string | null;
  BrandName: string;
  AddressLine1: string;
  City: string;
  StateCode: string;
  ZipCode: string;
  PhoneNumber: any[];
  Latitude: string | null;
  Longitude: string | null;
  OpenAt: string | null;
  CloseAt: string | null;
  HasSameDayDelivery: boolean;
  IsOnSiteDoctorAvailable: boolean;
  TimeZone: string;
  IsSpeakSpanish: boolean;
  TimeZoneCode: string;
  LandMarks: string | null;
  RowNum: number;
  TotalCount: number;
  Distance: string;
}
