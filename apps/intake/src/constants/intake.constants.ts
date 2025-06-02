import {
  QuestionObjectType,
  QuestionTypeEnum,
  StepObjectType,
} from "../../../host/src/types/Intake.types";
import type { SelectOptions } from "../../../host/src/types/intakeInput.types";

export const QuestionTypeOptions: SelectOptions[] = [
  {
    label: "Checkbox List",
    value: "1",
  },
  {
    label: "Dropdown",
    value: "2",
  },
  {
    label: "Date",
    value: "3",
  },
  {
    label: "Date & Time",
    value: "4",
  },
  {
    label: "Email",
    value: "5",
  },
  {
    label: "Number",
    value: "6",
  },
  {
    label: "Radiolist",
    value: "7",
  },
  {
    label: "Text",
    value: "8",
  },
  {
    label: "Textarea",
    value: "9",
  },
];

export const ValidateOptions: SelectOptions[] = [
  {
    label: "Min",
    value: 1,
  },
  {
    label: "Max",
    value: 2,
  },
];

export const LanguageOptions: SelectOptions[] = [
  {
    label: "English",
    value: "en-US",
  },
  {
    label: "Spanish",
    value: "es-ES",
  },
];

export const defaultQuestion: QuestionObjectType = {
  optionIndex : -1,
  parentIndex : -1,
  parentQuestionCode: "",
  questionCode: "",
  questionText: "",
  recommend: {
    toggle: false,
    others: "",
    sku: [],
  },
  required: false,
  questionType: QuestionTypeEnum.TEXT,
  options: [],
};

export const defaultStep: StepObjectType = {
  title: "Click to edit title",
  expanded: false,
  questions: [defaultQuestion],
};

export const availibilityModalTables = [
  {
    label : "Company Availibility",
  },
  {
    label : "State Availibility",
  },
  {
    label : "Store Availibility",
  },
]

export const INTAKE_FORM_ERRORS = {
  UNIQUE_QUESTION_CODE : "Please enter unique question code",
  REQUIRED_QUESTION_CODE : "Please enter question code",
  INVALID_QUESTION_CODE : "Please enter valid question code",

  UNIQUE_OPTION_CODE : "Please enter unique option code",
  REQUIRED_OPTION_CODE : "Please enter option code",
  INVALID_OPTION_CODE : "Please enter valid option code",

  REQUIRED_FORM_CODE : "Please enter form code",
  INVALID_FORM_CODE : "Please enter valid form code",

  REQUIRED_SECTION_DESCRIPTION : "Please enter step description",
  INVALID_SECTION_DESCRIPTION : "Please enter valid step description",

  REQUIRED_OPTION_DESCRIPTION : "Please enter option description",
  INVALID_OPTION_DESCRIPTION : "Please enter valid option description",

  REQUIRED_QUESTION_DESCRIPTION : "Please enter question description",
  INVALID_QUESTION_DESCRIPTION : "Please enter valid question description",

  INVALID_VALIDATION_BACK_DAYS : "Please enter valid number of days",
  REQUIRED_BACKDAYS_VALUE : "Please enter number of days",

  REQUIRED_RECOMMENDATION_TEXT_VALUE : "Please enter recommendation text",
  INVALID_RECOMMENDATION_TEXT_VALUE : "Please enter valid recommendation text",

  REQUIRED_RECOMMENDATION_SKU_VALUE : "Please enter recommendation sku",
  INVALID_RECOMMENDATION_SKU_VALUE : "Please enter valid recommendation sku",

  REQUIRED_RECOMMENDATION_RADIO_VALUE : "Please select recommendation type",
  REQUIRED_QUESTION_OPTIONS : "Please enter options",
}

export const MEDICAL_FORM_ERRORS = {
  DUPLICATE_FORM_CODE : "Please enter a unique form name",
  REQUIRED_FORM_CODE : "Please enter form name",
  INVALID_FORM_CODE : "Please enter a valid form name",
}

export const HIPPA_FILE_ERRORS = {
  INVALID_FILE_TYPE : "Please select a valid file",
}

export const ALLOWED_HIPPA_FILE_TYPES = ["htm", "html"];

export const MAX_BACK_DAYS = 365 * 5;

export const DATE_TIME_FORMAT_WITHOUT_TIMEZONE = "YYYY-MM-DDT00:00:00";
export const DATE_TIME_ISO = "YYYY-MM-DDT00:00:00.000[Z]";

export const DEBOUNCE_TIME = 1000;

export const COMMON_INPUT_MAX_LENGTH = 50;
export const FREE_TEXT_MAX_LENGTH = 200;

export const KEYBOARD_KEYS = {
  DELETE: "Delete",
  BACKSPACE: "Backspace",
  ARROWLEFT: "ArrowLeft",
  TAB: "Tab",
};

export const StringFilterOperatorOptions: SelectOptions[] = [
  { label: "Contains", value: "contain" },
  { label: "Starts with", value: "startswith" },
  { label: "Ends with", value: "endswith" },
];

export const NumberFilterOperatorOptions: SelectOptions[] = [
  { label: "Greater than", value: "gt" },
  { label: "Less than", value: "lt" },
  { label: "Is equal to", value: "eq" },
  { label: "Is not equal to", value: "neq" },
];

export const DEFAULT_EMPTY_TABLE_MESSAGE = "No Records Found";

export const INTAKE_LANGUAGE_TYPES = {
  ENGLISH : "en-US",
  SPANISH : "es-ES",
}

export const HIPPA_LABEL = "Privacy and Consent";

export const RECAPTCHA_ACTION = "submit";