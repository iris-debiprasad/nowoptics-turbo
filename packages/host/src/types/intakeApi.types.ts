import {
  GetPatientInformationValuesSelector,
  PatientIntakeMetaData,
} from "./Intake.types";

export type BaseApiResponse<T> = {
  Error: {
    Description: string;
    Code: string;
    Message: string;
    ResolvingHelpText: string;
  } | null;
  Result: T;
  SuccessMessage: string;
};

export type ErrorResponseType = {
  status: number;
  data: BaseApiResponse<null>;
};

export type GenericErrorResponseType<T> = {
  status: number;
  data: BaseApiResponse<T>;
};

export type GetMedicalFormSortFields =
  keyof GetMedicalFormsResult["Results"][0];

export type GetMedicalFormsRequest = {
  pageNumber: number;
  pageSize: number;
  sortDescending: boolean;
  sortField: GetMedicalFormSortFields;
  filters: string;
};

type GetMedicalFormsResult = {
  CurrentPage: number;
  PageCount: number;
  RowCount: number;
  Results: {
    Code: string;
    CreatedOn: string;
    Id: number;
    IsMultilingualTemplatePresent: boolean;
    PublishedDate: string;
    Status: "Draft" | "Published" | "Unpublished" | "Published Inactive";
    ModifiedBy: string;
    ModifiedOn: string;
  }[];
};

export type GetMedicalFormsResponse = BaseApiResponse<GetMedicalFormsResult>;

export type GetDefaultStateHippaFilesSortFields =
  keyof GetDefaultStateHippaFilesResult["Results"][0];

export type GetDefaultHippaTableState = {
  sortDescending: boolean;
  sortField: GetDefaultStateHippaFilesSortFields;
};

export type GetDefaultStateHippaFilesRequest = {
  pageNumber: number;
  pageSize: number;
  sortDescending: boolean;
  sortField: GetDefaultStateHippaFilesSortFields;
  filter: string;
};

export type GetDefaultStateHippaFilesResult = {
  CurrentPage: number;
  PageCount: number;
  RowCount: number;
  PageSize: number;
  Results: {
    Id: number;
    Type: string;
    Code: string;
    Description: string;
    FilePath: string;
  }[];
};

export type GetDefaultStateHippaFilesResponse =
  BaseApiResponse<GetDefaultStateHippaFilesResult>;

export type GetAllStateHippaFilesSortFields =
  keyof GetAllStateHippaFilesResult["Results"][0];

export type GetAllHippaTableState = {
  sortDescending: boolean;
  sortField: GetAllStateHippaFilesSortFields;
};

export type GetAllStateHippaFilesRequest = {
  pageNumber: number;
  pageSize: number;
  sortDescending: boolean;
  sortField: GetAllStateHippaFilesSortFields;
  filters: string;
};

export type GetAllStateHippaFilesResult = {
  CurrentPage: number;
  PageCount: number;
  RowCount: number;
  PageSize: number;
  Results: {
    Id: number;
    CountryName: string;
    Code: string;
    Name: string;
    HippaForms: {
      HippaFormId: number | null;
      Language: string;
    }[];
  }[];
};

export type GetAllStateHippaFilesResponse =
  BaseApiResponse<GetAllStateHippaFilesResult>;

export type DownloadHippaFileRequest = {
  hippaFormId: number | null;
};

export type DownloadBlobFile = {
  FileContents: string;
  ContentType: string;
  FileDownloadName: string;
  LastModified: string;
  EntityTag: string;
  EnableRangeProcessing: boolean;
};

export type DownloadStateFilesResult = {
  Id: number;
  State: string;
  LanguageCode: string;
  VersionId: number;
  BlobFile: DownloadBlobFile;
};

export type DownloadStateFilesResponse =
  BaseApiResponse<DownloadStateFilesResult>;

export type DownloadDefaultFilesResult = {
  Id: number;
  Type: string;
  Code: string;
  Description: string;
  BlobFile: DownloadBlobFile;
};

export type DownloadDefaultFilesResponse =
  BaseApiResponse<DownloadDefaultFilesResult>;

export type UploadStateHippaFileRequest = {
  file: File;
  stateId: number;
  code: "en-US" | "es-ES";
};

export type UploadStateHippaFileResult = {};

export type UploadStateHippaFileResponse =
  BaseApiResponse<UploadStateHippaFileResult>;

export type UploadDefaultHippaFileRequest = {
  file: File;
  code: "en-US" | "es-ES";
};

export type UploadDefaultHippaFileResult = {};

export type UploadDefaultHippaFileResponse =
  BaseApiResponse<UploadStateHippaFileResult>;

export type GetCompanyDropdownRequest = {};

export type GetCompanyDropdownResult = {
  Id: number;
  Code: string;
  Description: string;
};

export type GetCompanyDropdownResponse = BaseApiResponse<
  GetCompanyDropdownResult[]
>;

export type GetStateDropdownRequest = {};

export type GetStateDropdownResult = {
  Id: number;
  Code: string;
  Description: string;
};

export type GetStateDropdownResponse = BaseApiResponse<
  GetStateDropdownResult[]
>;

export type GetStoreOptionsRequest = {
  searchString: string;
};

export type GetStoreOptionsResult = {
  Id: number;
  Code: string;
  Description: string;
};

export type GetStoreOptionsResponse = BaseApiResponse<GetStoreOptionsResult[]>;

export type SaveAvailibilityRequest = {
  templateId: number;
  companyCategory?: number[];
  state?: number[];
  store?: number[];
  startDate: string;
};

export type SaveAvailibilityResult = {};

export type SaveAvailibilityResponse = BaseApiResponse<SaveAvailibilityResult>;

export type GetAvailibilityRequest<T> = {
  templateId: string;
  filter: string;
  pageNumber: number;
  pageSize: number;
  sortDescending: boolean;
  sortField: keyof T;
};

export type VerifyAvailibilityRequest = SaveAvailibilityRequest;

export type VerifyAvailibilityResult = {
  Id: number;
  StoreId: number;
  IntakeFormTemplateId: number;
  IsActive: boolean;
  CreatedBy: number;
  CreatedOn: string;
  StartedOn: string;
  EndedOn: string;
  ModifiedBy: number;
  IntakeFormTemplate: any;
  Store: any;
} | null;

export type VerifyAvailibilityResponse =
  BaseApiResponse<VerifyAvailibilityResult>;

export type GetAvailibilityResult<T> = {
  CurrentPage: number;
  PageCount: number;
  PageSize: number;
  RowCount: number;
  Results: T[];
};

export type CompanyCategoryResult = {
  Id: number;
  CompanyCategoryId: string;
  StartedOn: string;
  EndedOn: string;
};

export type CompanyCategorySortFields = keyof CompanyCategoryResult;

export type StateSortFields = keyof StateResult;

export type StateResult = {
  Id: number;
  StateId: number;
  StartedOn: string;
  EndedOn: string;
  StateCode: string;
};

export type StoreSortFields = keyof StoreResult;

export type StoreResult = {
  Id: number;
  StoreId: string;
  StartedOn: string;
  EndedOn: string;
};

export type GetAvailibilityResponse<T> = BaseApiResponse<
  GetAvailibilityResult<T>
>;

export type AvailibilityTableSortFields =
  | StoreSortFields
  | StateSortFields
  | CompanyCategorySortFields;

export type GetIntakeResult = {
  Id: number;
  Code: string;
  Key: string;
  IntakeFormSections: IntakeFormSection[];
  CreatedOn: string;
  ModifiedOn: string;
};

export type IntakeFormSection = {
  SectionIndex?: number;
  Code: string;
  Description: string;
  Questions: Question[];
  SectionId?: number;
  ColumnCount: number;
  Open: boolean;
};

export type Question = {
  QuestionIndex?: number;
  ParentQuestionIndex?: number;
  ParentQuestionOptionIndex?: number;
  ParentQuestionCode?: string | null;
  ParentQuestionOptionCode?: string | null;
  Code: string;
  Description: string;
  Type: string;
  DisplayType: string;
  SequenceNumber: number;
  OptionColumnCount: number;
  IsRequired: boolean;
  QuestionOptions: QuestionOption[];
  Recommendations: Recommendation[];
  QuestionValidation: QuestionValidation[];
  QuestionId?: number;
};

export type QuestionOption = {
  OptionIndex?: number;
  Code: string;
  Description: string;
  OptionId?: number;
};

export type Recommendation = {
  RecommendationIndex?: number;
  OptionIndex?: number;
  OptionValue: string;
  Type: string;
  Value: string;
  RecommendationId?: number;
};

export type QuestionValidation = {
  Code: string;
  Type: string;
  Value: string;
  ErrorMessage: string;
  QuestionIndex: number;
  SectionIndex: number;
  ValidationId?: number;
};

export type GetIntakeResponse = BaseApiResponse<GetIntakeResult>;
export type GetIntakeRequest = {
  templateId: number | null;
  languageCode: number | null;
};

export type GetSKUsRequest = {
  searchString: string;
};

export type GetSKUsResult = {
  Data: {
    Id: number;
    ProductName: string;
    VariantNumber: string;
    ProductTypeId: number;
    Color: string;
  }[];
  Count: number;
};

export type GetSKUsResponse = BaseApiResponse<GetSKUsResult>;

export type GetQuestionTypeRequest = {};

export type GetQuestionTypeObject = {
  Id: number;
  Code: string;
  Description: string;
};

export type GetQuestionTypeResult = GetQuestionTypeObject[];

export type GetQuestionTypeResponse = BaseApiResponse<GetQuestionTypeResult>;

export type GetLanguageTypeRequest = {};

export type GetLanguageTypeObject = {
  Id: number;
  Code: string;
  Description: string;
};

export type GetLanguageTypeResult = GetLanguageTypeObject[];

export type GetLanguageTypeResponse = BaseApiResponse<GetLanguageTypeResult>;

export type SaveIntakeFormRequest = {
  intakeFormTemplate: SaveIntakeFormTemplate[];
};

export type SaveIntakeFormResult = {
  Code : string;
  TemplateId : number;
};

export type SaveIntakeFormResponse = BaseApiResponse<SaveIntakeFormResult>;

export type SaveIntakeFormTemplate = {
  code: string;
  language: string;
  templateId?: number;
  sections: SaveFormSection[];
};

export type SaveFormSection = {
  text: string;
  code: string;
  columnCount: number;
  sectionId?: number;
  questions: SaveFormQuestion[];
};

export type SaveFormQuestion = {
  parentQuestionCode: string;
  parentQuestionOptionCode: string;
  code: string;
  text: string;
  type: string;
  displayType: "Label" | "Placeholder" | "Dropdown";
  isRequired: boolean;
  questionOptions: SaveFormQuestionOption[];
  sequenceNumber?: number;
  questionRecommendations: SaveFormQuestionRecommendation[];
  questionValidations: SaveFormQuestionValidation[];
  questionId?: number;
};

export type SaveFormQuestionOption = {
  code: string;
  text: string;
  optionId?: number;
};

export type SaveFormQuestionRecommendation = {
  code: string;
  optionValue: string;
  type: string;
  recommendationValue: string;
  recommendationId?: number;
};

export type SaveFormQuestionValidation = {
  code: string;
  type: string;
  value: string;
  description: string;
  validationId?: number;
};

export type PublishIntakeFormRequest = {
  templateId: string;
};

export type PublishIntakeFormResult = {};

export type PublishIntakeFormResponse =
  BaseApiResponse<PublishIntakeFormResult>;

export type CopyIntakeFormRequest = {
  templateId: string;
  code: string;
};

export type CopyIntakeFormResult = {};

export type CopyIntakeFormResponse = BaseApiResponse<CopyIntakeFormResult>;

export type GetPatientIntakeFormRequest = PatientIntakeMetaData & {
  isPatient: boolean;
};

export type PatientIntakeFormQuestionOption = {
  Code: string;
  Text: string;
  IsSelected: boolean;
  SelectedValue?: string;
};

export type PatientIntakeFormRecommendation = {};

export type PatientIntakeFormQuestionValidation = {
  Code: string;
  Type: string;
  Value: string;
  Description: string;
};

export type PatientIntakeFormQuestion = {
  ParentQuestionCode?: string;
  ParentQuestionOptionCode?: string;
  Code: string;
  Text: string;
  Type: string;
  SequenceNumber: number;
  OptionColumnCount: number;
  DisplayType: string;
  AnswerValue: string;
  IsRequired: boolean;
  QuestionOptions: PatientIntakeFormQuestionOption[];
  QuestionRecommendations: PatientIntakeFormRecommendation[];
  QuestionValidations: PatientIntakeFormQuestionValidation[];
};

export type PatientIntakeFormSection = {
  Text: string;
  Code: string;
  ColumnCount: number;
  Questions: PatientIntakeFormQuestion[];
};

export type IntakeFormResponsesType = {
  Code: string;
  Language: string;
  Sections: PatientIntakeFormSection[];
};

export type GetPatientIntakeFormResult = {
  PatientIntakeForm: {
    Id: number;
    Key: string;
    PatientId: number;
    AppointmentId: number;
    IsCompleted: boolean;
    CompletedOn: string;
    IntakeFormResponses: IntakeFormResponsesType;
    Hipaa: string;
    GuardianFirstName: string;
    GuardianLastName: string;
  };
  IsEditRequired: boolean;
  LastFilledSectionCode: string | null;
};

export type GetPatientIntakeFormResponse =
  BaseApiResponse<GetPatientIntakeFormResult>;

export type SavePatientIntakeFormRequest = {
  PatientId: number;
  IsCompleted: boolean;
  IntakeFormResponses: IntakeFormResponsesType;
  GuardianFirstName: string;
  GuardianLastName: string;
  Checkboxes : {
    Name : string,
    Value : boolean
  }[]
  file: string | null;
} & { isPatient: boolean, recaptchaToken: string};

export type SavePatientIntakeFormAnonymousRequest =
  SavePatientIntakeFormRequest & {
    encryptedAppointmentId: string;
  };

export type SavePatientIntakeFormResult = {};

export type SavePatientIntakeFormResponse =
  BaseApiResponse<SavePatientIntakeFormResult>;

export type GetPatientInformationRequest = PatientIntakeMetaData & {
  isPatient: boolean;
};

export type GetPatientInformationResult = {
  Id: number;
  FirstName: string;
  LastName: string;
  Dob: string;
  GenderCode: string;
  Email: string;
  IsEmailVerified: boolean;
  IsEmailValid: boolean;
  PrimaryPhoneNo: {
    IsdCode: string;
    PhoneNumber: string;
  };
  IsPhoneVerified: boolean;
  SecondaryPhoneNo: {
    IsdCode: string;
    PhoneNumber: string;
  };
  PreferredLanguageCode: string;
  ZipCode: string;
  ShippingAddress: {
    Id: number;
    AddressLine1: string;
    AddressLine2: string;
    ZipCode: string;
    State: string;
    Country: string;
    City: string;
    County: string;
    IsVerified: boolean;
    IsValid: boolean;
  };
  BillingAddress: {
    Id: number;
    AddressLine1: string;
    AddressLine2: string;
    ZipCode: string;
    State: string;
    Country: string;
    City: string;
    County: string;
    IsVerified: boolean;
    IsValid: boolean;
  };
  IsMarketingConsent: boolean;
};

export type GetPatientInformationResponse =
  BaseApiResponse<GetPatientInformationResult>;

export type GetAddressByZipCodeRequest = {
  zipCode: string;
};

export type GetAddressByZipCodeResult = {
  CountyId: number;
  CountyName: string;
  StateId: number;
  StateName: string;
  CountryId: number;
  CountryName: string;
  AddressCityZip: {
    CitiesIdList: number[];
    CitiesNameList: string[];
    ZipIdList: number[];
  };
};

export type GetAddressByZipCodeResponse =
  BaseApiResponse<GetAddressByZipCodeResult>;

export type SavePatientInformationRequest = Pick<
  GetPatientInformationValuesSelector,
  | "Id"
  | "Dob"
  | "Email"
  | "FirstName"
  | "LastName"
  | "GenderCode"
  | "PreferredLanguageCode"
  | "PrimaryPhoneNo"
  | "IsMarketingConsent"
> & {
  StoreId: number;
  SecondaryPhoneNo: GetPatientInformationValuesSelector["PrimaryPhoneNo"];
  recaptchaToken: string;
};

export type SavePatientInformationResult = {
  PatientId: number;
  IsEmailOtpGenerated: boolean;
  IsPhoneOtpGenerated: boolean;
  IsOnlyPhoneOrEmailUpdated: boolean;
};

export type SavePatientInformationResponse =
  BaseApiResponse<SavePatientInformationResult>;

export type SavePatientAddressRequest = Pick<
  GetPatientInformationValuesSelector["ShippingAddress"],
  | "Id"
  | "AddressLine1"
  | "AddressLine2"
  | "City"
  | "Country"
  | "County"
  | "State"
  | "ZipCode"
> & {
  PatientId: string;
  AddressType: "shipping" | "billing";
  StateCode: string | number;
  CountryCode: string | number;
  StoreId: number;
  recaptchaToken: string;
  isValidateAddress?: boolean;
};

export type SavePatientAddressCustomerRequest = SavePatientAddressRequest[];

export type SavePatientAddressResult = number;

export type SavePatientAddressResponse =
  BaseApiResponse<SavePatientAddressResult>;

export type VerifyPatientOtpRequest = {
  patientId?: number;
  email?: string | null;
  emailOtp?: string | null;
  phoneOtp?: string | null;
  phone?: {
    isdCode: string;
    phoneNumber?: string;
  } | null;
  isPatient: boolean;
  recaptchaToken: string;
};
export type VerifyPatientOtpResult = {
  EmailVerified: boolean;
  PhoneVerified: boolean;
  EmailSuccessMsg: string;
  PhoneSuccessMsg: string;
  EmailFailureMsg: string;
  PhoneFailureMsg: string;
};
export type VerifyPatientOtpResponse = BaseApiResponse<VerifyPatientOtpResult>;

export type ResendPatientOtpRequest = {
  patientId?: number;
  phone?: {
    isdCode: string;
    phoneNumber?: string;
  };
  email?: string;
  storeId: number;
  isPatient: boolean;
  recaptchaToken: string;
};
export type ResendPatientOtpResult = boolean;
export type ResendPatientOtpResponse = BaseApiResponse<ResendPatientOtpResult>;

export type SavePatientInformationAnonymousRequest = Pick<
  GetPatientInformationValuesSelector,
  | "Dob"
  | "Email"
  | "FirstName"
  | "LastName"
  | "GenderCode"
  | "PreferredLanguageCode"
  | "PrimaryPhoneNo"
  | "IsMarketingConsent"
> & {
  AppointmentId: string;
  AddressLine1: string;
  AddressLine2: string;
  CityId: string;
  ZipId: string;
  recaptchaToken: string;
  isValidateAddress?: boolean;
};

export type SavePatientInformationAnonymousResult = {
  PatientId: number;
  IsEmailOtpGenerated: boolean;
  IsPhoneOtpGenerated: boolean;
  IsOnlyPhoneOrEmailUpdated: boolean;
};

export type SavePatientInformationAnonymousResponse =
  BaseApiResponse<SavePatientInformationAnonymousResult>;

export type MarkIntakeFormAsCompleteRequest = PatientIntakeMetaData & {
  isPatient: boolean;
  recaptchaToken: string;
};
export type MarkIntakeFormAsCompleteResult = {};
export type MarkIntakeFormAsCompleteResponse =
  BaseApiResponse<MarkIntakeFormAsCompleteResult>;

export type VerifyPatientOtpAnonymousRequest = {
  appointmentId?: string;
  email?: string | null;
  emailOtp?: string | null;
  phoneOtp?: string | null;
  phone?: {
    isdCode: string;
    phoneNumber?: string;
  } | null;
  recaptchaToken: string;
};
export type VerifyPatientOtpAnonymousResult = {
  EmailVerified: boolean;
  PhoneVerified: boolean;
  EmailSuccessMsg: string;
  PhoneSuccessMsg: string;
  EmailFailureMsg: string;
  PhoneFailureMsg: string;
};
export type VerifyPatientOtpAnonymousResponse =
  BaseApiResponse<VerifyPatientOtpAnonymousResult>;

export type ResendPatientOtpAnonymousRequest = {
  appointmentId?: string;
  phone?: {
    isdCode: string;
    phoneNumber?: string;
  };
  email?: string;
  storeId: number;
  recaptchaToken: string;
};
export type ResendPatientOtpAnonymousResult = boolean;
export type ResendPatientOtpAnonymousResponse =
  BaseApiResponse<ResendPatientOtpAnonymousResult>;

export type GetConsetFormCheckboxResult = string[];
export type GetConsetFormCheckboxResponse =
  BaseApiResponse<GetConsetFormCheckboxResult>;

export type GetStateHippaPreviewRequest = {
  stateId: number;
  languageId: number;
};

export type GetStateHippaPreviewResult = {
  Id: number;
  State: string;
  LanguageCode: string;
  VersionId: number;
  BlobFile: {
    FileContents: string;
    ContentType: string;
    FileDownloadName: string;
    LastModified: any;
    EntityTag: any;
    EnableRangeProcessing: boolean;
  };
};

export type GetStateHippaPreviewResponse =
  BaseApiResponse<GetStateHippaPreviewResult>;
