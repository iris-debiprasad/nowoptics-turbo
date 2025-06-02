import {
  GetAllStateHippaFilesResponse,
  GetDefaultStateHippaFilesResponse,
  GetMedicalFormsResponse,
} from "@root/host/src/types/intakeApi.types";
import {
  CompanyAvailibilityType,
  HippaLanguageForm,
  HippaStateForm,
  MedicalForm,
  StateAvailibilityType,
  StoreAvailibilityType,
} from "@root/host/src/types/Intake.types";

export const PatientInformationValuesMock = {
  age: "12",
  countryCode: "US",
  dob: "2021-10-10",
  email: "341234@gmail.com",
  firstName: "test",
  gender: "male",
  language: "english",
  lastName: "test",
  mobileNumber: "1234567890",
  mobileNumber2: "1234567890",
};

export const PatientInformationErrorsMock = {
  age: "12",
  countryCode: "US",
  dob: "2021-10-10",
  email: "341234@gmail.com",
  firstName: "test",
  gender: "male",
  language: "english",
  lastName: "test",
  mobileNumber: "1234567890",
  mobileNumber2: "1234567890",
};

export const MedicalFormMock: MedicalForm[] = [
  {
    templateId: 1,
    code: "M-001",
    status: "Draft",
    createdOn: "2021-10-01",
    publishedDate: "2021-10-01",
    action: "Edit",
  },
  {
    templateId: 2,
    code: "M-002",
    status: "Published",
    createdOn: "2021-10-01",
    publishedDate: "2021-10-01",
    action: "Edit",
  },
  {
    templateId: 3,
    code: "M-003",
    status: "Draft",
    createdOn: "2021-10-01",
    publishedDate: "2021-10-01",
    action: "Edit",
  },
  {
    templateId: 4,
    code: "M-004",
    status: "Published",
    createdOn: "2021-10-01",
    publishedDate: "2021-10-01",
    action: "Edit",
  },
  {
    templateId: 5,
    code: "M-005",
    status: "Draft",
    createdOn: "2021-10-01",
    publishedDate: "2021-10-01",
    action: "Edit",
  },
  {
    templateId: 6,
    code: "M-006",
    status: "Published",
    createdOn: "2021-10-01",
    publishedDate: "2021-10-01",
    action: "Edit",
  },
];

export const HippaLanguageFormMock: HippaLanguageForm[] = [
  {
    language: "Default (English)",
    action: "Edit",
  },
  {
    language: "Default (Spanish)",
    action: "Edit",
  },
];

export const HippaStateFormMock: HippaStateForm[] = [
  {
    state: "Alabama",
    languageAction: "Download",
  },
  {
    state: "Alaska",
    languageAction: "Download",
  },
  {
    state: "Arizona",
    languageAction: "Download",
  },
  {
    state: "Arkansas",
    languageAction: "Download",
  },
  {
    state: "California",
    languageAction: "Download",
  },
  {
    state: "Colorado",
    languageAction: "Download",
  },
  {
    state: "Connecticut",
    languageAction: "Download",
  },
  {
    state: "Delaware",
    languageAction: "Download",
  },
  {
    state: "Florida",
    languageAction: "Download",
  },
  {
    state: "Georgia",
    languageAction: "Download",
  },
  {
    state: "Hawaii",
    languageAction: "Download",
  },
  {
    state: "Idaho",
    languageAction: "Download",
  },
  {
    state: "Illinois",
    languageAction: "Download",
  },
  {
    state: "Indiana",
    languageAction: "Download",
  },
];

export const CompanyTableMock: CompanyAvailibilityType[] = [
  {
    company: "Company 1",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
  {
    company: "Company 2",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
  {
    company: "Company 3",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
];

export const StateTableMock: StateAvailibilityType[] = [
  {
    stateId: "AB",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
  {
    stateId: "BC",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
  {
    stateId: "CD",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
];

export const StoreTableMock: StoreAvailibilityType[] = [
  {
    storeId: "001",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
  {
    storeId: "002",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
  {
    storeId: "003",
    startDate: "2021-10-01",
    endDate: "2021-10-01",
  },
];

export const MedicalFormsResponseMock: GetMedicalFormsResponse = {
  Error: null,
  Result: {
    CurrentPage: 0,
    PageCount: 0,
    RowCount: 0,
    Results: [
      {
        Code: "M-001",
        CreatedOn: "2021-10-01",
        PublishedDate: "2021-10-01",
        Status: "Draft",
        Id: 1,
        IsMultilingualTemplatePresent: true,
        ModifiedBy : "",
        ModifiedOn : "2021-10-01",
      },
      {
        Code: "M-001",
        CreatedOn: "2021-10-01",
        PublishedDate: "2021-10-01",
        Status: "Published",
        Id: 2,
        IsMultilingualTemplatePresent: false,
        ModifiedBy : "",
        ModifiedOn : "2021-10-01",
      },
    ],
  },
  SuccessMessage: "",
};

export const DefaultStateHippaFilesMock: GetDefaultStateHippaFilesResponse = {
  Error: null,
  Result: {
    Results: [
      {
        Id: 33,
        Type: "IntakeHippaFile",
        Code: "IntakeHippaFile_en-US",
        Description: "en-US default hippa file path",
        FilePath: "default/en-US/2a131c25-c999-42bf-ab3a-9dbf616245ac_test.htm",
      },
      {
        Id: 36,
        Type: "IntakeHippaFile",
        Code: "IntakeHippaFile_es-ES",
        Description: "es-ES default hippa file path",
        FilePath: "",
      },
    ],
    CurrentPage: 1,
    PageCount: 1,
    PageSize: 5,
    RowCount: 2,
  },
  SuccessMessage: "State details get successfully",
};

export const AllStateHippaFilesMock: GetAllStateHippaFilesResponse = {
  Error: null,
  Result: {
    Results: [
      {
        Id: 1,
        CountryName: "United States",
        Code: "AA",
        Name: "Armed Forces Americas",
        HippaForms: [
          {
            HippaFormId: 7,
            Language: "en-US",
          },
          {
            HippaFormId: null,
            Language: "es-ES",
          },
        ],
      },
      {
        Id: 2,
        CountryName: "United States",
        Code: "AE",
        Name: "Armed Forces Europe",
        HippaForms: [
          {
            HippaFormId: 2,
            Language: "en-US",
          },
          {
            HippaFormId: null,
            Language: "es-ES",
          },
        ],
      },
      {
        Id: 3,
        CountryName: "United States",
        Code: "AP",
        Name: "Armed Forces Canada",
        HippaForms: [
          {
            HippaFormId: 10,
            Language: "en-US",
          },
          {
            HippaFormId: null,
            Language: "es-ES",
          },
        ],
      },
      {
        Id: 4,
        CountryName: "United States",
        Code: "AL",
        Name: "Alabama",
        HippaForms: [
          {
            HippaFormId: null,
            Language: "en-US",
          },
          {
            HippaFormId: null,
            Language: "es-ES",
          },
        ],
      },
      {
        Id: 5,
        CountryName: "United States",
        Code: "AK",
        Name: "Alaska",
        HippaForms: [
          {
            HippaFormId: 8,
            Language: "en-US",
          },
          {
            HippaFormId: null,
            Language: "es-ES",
          },
        ],
      },
    ],
    CurrentPage: 1,
    PageCount: 13,
    PageSize: 5,
    RowCount: 63,
  },
  SuccessMessage: "State details get successfully",
};

export const GetCompanyDropdownMock = {
  Error: null,
  Result: [
    { Id: 2, Code: "C", Description: "Corporate" },
    { Id: 3, Code: "D", Description: "Distribution" },
    { Id: 1, Code: "F", Description: "Franchise" },
  ],
  SuccessMessage: "Company Category details get successfully",
};

export const GetStateDropdownMock = {
  Error: null,
  Result: [
    { Id: 1, Code: "AA", Description: "Armed Forces Americas" },
    { Id: 2, Code: "AE", Description: "Armed Forces Europe" },
    { Id: 3, Code: "AP", Description: "Armed Forces Canada" },
    { Id: 4, Code: "AL", Description: "Alabama" },
    { Id: 5, Code: "AK", Description: "Alaska" },
    { Id: 6, Code: "AZ", Description: "Arizona" },
    { Id: 7, Code: "AR", Description: "Arkansas" },
    { Id: 8, Code: "CA", Description: "California" },
    { Id: 9, Code: "CO", Description: "Colorado" },
    { Id: 10, Code: "CT", Description: "Connecticut" },
    { Id: 11, Code: "DE", Description: "Delaware" },
    { Id: 12, Code: "FL", Description: "Florida" },
    { Id: 13, Code: "GA", Description: "Georgia" },
    { Id: 14, Code: "HI", Description: "Hawaii" },
    { Id: 15, Code: "ID", Description: "Idaho" },
    { Id: 16, Code: "IL", Description: "Illinois" },
    { Id: 17, Code: "IN", Description: "Indiana" },
    { Id: 18, Code: "IA", Description: "Iowa" },
    { Id: 19, Code: "KS", Description: "Kansas" },
    { Id: 20, Code: "KY", Description: "Kentucky" },
    { Id: 21, Code: "LA", Description: "Louisiana" },
    { Id: 22, Code: "ME", Description: "Maine" },
    { Id: 23, Code: "MD", Description: "Maryland" },
    { Id: 24, Code: "MA", Description: "Massachusetts" },
    { Id: 25, Code: "MI", Description: "Michigan" },
    { Id: 26, Code: "MN", Description: "Minnesota" },
    { Id: 27, Code: "MS", Description: "Mississippi" },
    { Id: 28, Code: "MO", Description: "Missouri" },
    { Id: 29, Code: "MT", Description: "Montana" },
    { Id: 30, Code: "NE", Description: "Nebraska" },
    { Id: 31, Code: "NV", Description: "Nevada" },
    { Id: 32, Code: "NH", Description: "New Hampshire" },
    { Id: 33, Code: "NJ", Description: "New Jersey" },
    { Id: 34, Code: "NM", Description: "New Mexico" },
    { Id: 35, Code: "NY", Description: "New York" },
    { Id: 36, Code: "NC", Description: "North Carolina" },
    { Id: 37, Code: "ND", Description: "North Dakota" },
    { Id: 38, Code: "OH", Description: "Ohio" },
    { Id: 39, Code: "OK", Description: "Oklahoma" },
    { Id: 40, Code: "OR", Description: "Oregon" },
    { Id: 41, Code: "PA", Description: "Pennsylvania" },
    { Id: 42, Code: "RI", Description: "Rhode Island" },
    { Id: 43, Code: "SC", Description: "South Carolina" },
    { Id: 44, Code: "SD", Description: "South Dakota" },
    { Id: 45, Code: "TN", Description: "Tennessee" },
    { Id: 46, Code: "TX", Description: "Texas" },
    { Id: 47, Code: "UT", Description: "Utah" },
    { Id: 48, Code: "VT", Description: "Vermont" },
    { Id: 49, Code: "VA", Description: "Virginia" },
    { Id: 50, Code: "WA", Description: "Washington" },
    { Id: 51, Code: "WV", Description: "West Virginia" },
    { Id: 52, Code: "WI", Description: "Wisconsin" },
    { Id: 53, Code: "WY", Description: "Wyoming" },
    { Id: 54, Code: "AS", Description: "American Samosa" },
    { Id: 55, Code: "DC", Description: "District of Columbia" },
    { Id: 56, Code: "FM", Description: "Federated States of Micronesia" },
    { Id: 57, Code: "GU", Description: "Guam" },
    { Id: 58, Code: "MH", Description: "Marshall Islands" },
    { Id: 59, Code: "MP", Description: "Northern Mariana Islands" },
    { Id: 60, Code: "PW", Description: "Palau" },
    { Id: 61, Code: "PR", Description: "Puerto Rico" },
    { Id: 62, Code: "VI", Description: "Virgin Islands" },
    { Id: 63, Code: "ZS", Description: "Test" },
  ],
  SuccessMessage: "State details get successfully",
};

export const GetStoreOptionsMock = {
  Error: null,
  Result: [
    { Id: 30, Code: "STORE1", Description: "Test pos Description" },
    { Id: 31, Code: "STORE2", Description: "Test" },
    { Id: 32, Code: "STORE3", Description: "Test" },
    { Id: 33, Code: "STORE4", Description: "Test" },
    { Id: 34, Code: "STORE5", Description: "Test" },
    { Id: 35, Code: "STORE6", Description: "Test" },
    { Id: 36, Code: "STORE7", Description: "Test" },
    { Id: 37, Code: "STORE8", Description: "Test" },
  ],
  SuccessMessage: "Stores Has been fetched successfully",
};

export const CompanyTableAvailibilityMock = {
  Error: null,
  Result: {
    Results: [
      {
        Id: 9,
        StoreId: "0001",
        StartedOn: "2023-06-01T00:00:00",
        EndedOn: null,
      },
      {
        Id: 45,
        StoreId: "STORE2",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 47,
        StoreId: "STORE6",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 48,
        StoreId: "STORE4",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 49,
        StoreId: "STORE5",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 50,
        StoreId: "STORE7",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 51,
        StoreId: "STORE8",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 54,
        StoreId: "STORE1",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 55,
        StoreId: "STORE3",
        StartedOn: "2023-07-20T18:30:00",
        EndedOn: null,
      },
      {
        Id: 58,
        StoreId: "0002",
        StartedOn: "2023-08-15T18:30:00",
        EndedOn: null,
      },
    ],
    CurrentPage: 1,
    PageCount: 1,
    PageSize: 10,
    RowCount: 10,
  },
  SuccessMessage: "Intake template availability get successfully",
};

export const StateTableAvailibilityMock = {
  Error: null,
  Result: {
    Results: [
      {
        Id: 49,
        StateId: 6,
        StartedOn: null,
        EndedOn: null,
      },
      {
        Id: 50,
        StateId: 48,
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 51,
        StateId: 29,
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 60,
        StateId: 1,
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 62,
        StateId: 5,
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 63,
        StateId: 7,
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 66,
        StateId: 2,
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: null,
      },
      {
        Id: 67,
        StateId: 3,
        StartedOn: "2023-08-15T18:30:00",
        EndedOn: null,
      },
    ],
    CurrentPage: 1,
    PageCount: 1,
    PageSize: 10,
    RowCount: 8,
  },
  SuccessMessage: "Intake template availability get successfully",
};

export const StoreTableAvailibilityMock = {
  Error: null,
  Result: {
    Results: [
      {
        Id: 5,
        StoreId: "0001",
        StartedOn: "2023-06-01T12:50:45.509",
        EndedOn: "2023-05-31T12:55:35.1816766",
      },
      {
        Id: 6,
        StoreId: "0002",
        StartedOn: "2023-06-01T12:50:45.509",
        EndedOn: "2023-07-03T08:44:32.028",
      },
      {
        Id: 11,
        StoreId: "STORE3",
        StartedOn: "2023-07-11T07:16:02.686",
        EndedOn: "2023-07-10T08:13:47.5694611",
      },
      {
        Id: 12,
        StoreId: "STORE3",
        StartedOn: "2023-07-11T08:09:41.353",
        EndedOn: "2023-07-10T08:35:08.1665004",
      },
      {
        Id: 13,
        StoreId: "STORE5",
        StartedOn: "2023-07-11T08:09:41.353",
        EndedOn: "2023-07-10T08:35:13.5697777",
      },
      {
        Id: 14,
        StoreId: "STORE8",
        StartedOn: "2023-07-11T08:09:41.353",
        EndedOn: "2023-07-10T08:35:17.6934316",
      },
      {
        Id: 15,
        StoreId: "STORE3",
        StartedOn: "2023-07-11T08:09:41.353",
        EndedOn: "2023-07-10T09:18:54.0286562",
      },
      {
        Id: 16,
        StoreId: "STORE5",
        StartedOn: "2023-07-11T08:09:41.353",
        EndedOn: "2023-07-10T09:18:54.119336",
      },
      {
        Id: 17,
        StoreId: "STORE8",
        StartedOn: "2023-07-11T08:09:41.353",
        EndedOn: "2023-07-10T09:18:54.1321173",
      },
      {
        Id: 44,
        StoreId: "STORE1",
        StartedOn: "2023-07-19T18:30:00",
        EndedOn: "2023-07-11T08:17:55.22063",
      },
    ],
    CurrentPage: 1,
    PageCount: 2,
    PageSize: 10,
    RowCount: 15,
  },
  SuccessMessage: "Intake template availability get successfully",
};

export const GetAllSkusQueryMock = {
  Error: null,
  Result: {
    Data: [
      {
        Id: 1,
        ProductName: "0001 | Test Product variant | white",
        VariantNumber: "0001",
        ProductTypeId: 4,
        Color: "white",
      },
    ],
    Count: 1,
  },
  SuccessMessage: "Data found",
};

export const GetQuestionTypesMock = {
  Error: null,
  Result: [
    { Id: 56, Code: "3", Description: "Date" },
    { Id: 57, Code: "4", Description: "Date & Time" },
    { Id: 58, Code: "5", Description: "Email" },
    { Id: 59, Code: "7", Description: "Radiolist" },
    { Id: 60, Code: "8", Description: "Text" },
    { Id: 61, Code: "1", Description: "Checkbox List" },
    { Id: 62, Code: "9", Description: "Textarea" },
    { Id: 63, Code: "6", Description: "Number" },
    { Id: 64, Code: "2", Description: "Dropdown" },
  ],
  SuccessMessage: "Look ups get successfully",
};

export const GetIntakeFormMock = {
  Error: null,
  Result: {
    Id: 142,
    Code: "IFT117COPY2",
    Key: "142-12",
    IntakeFormSections: [
      {
        Code: "IFT117S1",
        Description: "ENGLISH - Test Section 1 IFT117",
        ColumnCount: 1,
        Questions: [
          {
            ParentQuestionCode: null,
            ParentQuestionOptionCode: null,
            Code: "IFT117S1Q1",
            Description: "ENGLISH - Parent Question 1?",
            Type: "7",
            DisplayType: "Label",
            SequenceNumber: 0,
            OptionColumnCount: 0,
            IsRequired: false,
            QuestionOptions: [
              {
                Code: "IFT117S1Q1O1",
                Description: "ENGLISH - Parent Q1 - Option 1",
              },
              {
                Code: "IFT117S1Q1O2",
                Description: "ENGLISH - Parent Q1 - Option 2",
              },
            ],
            Recommendations: [
              { OptionValue: "IFT117S1Q1O1", Type: "SKU", Value: "0001" },
              { OptionValue: "IFT117S1Q1O2", Type: "Text", Value: "0001" },
            ],
            QuestionValidation: [
              {
                Code: "IFT117S1Q1V1",
                Type: "Range",
                Value: "1-100",
                ErrorMessage: "ENGLISH - Sample Validation Description",
              },
            ],
          },
          {
            ParentQuestionCode: null,
            ParentQuestionOptionCode: null,
            Code: "IFT117S1Q2",
            Description: "ENGLISH - Child - Question 1?",
            Type: "7",
            DisplayType: "Label",
            SequenceNumber: 0,
            OptionColumnCount: 0,
            IsRequired: true,
            QuestionOptions: [
              {
                Code: "IFT117S1Q2O1",
                Description: "ENGLISH - Child Q1 - Option 1",
              },
              {
                Code: "IFT117S1Q2O2",
                Description: "ENGLISH - Child Q1 - Option 2",
              },
            ],
            Recommendations: [
              { OptionValue: "IFT117S1Q2O1", Type: "SKU", Value: "0001" },
              { OptionValue: "IFT117S1Q2O2", Type: "Text", Value: "0001" },
            ],
            QuestionValidation: [
              {
                Code: "IFT117S2Q2V2",
                Type: "Range",
                Value: "1-100",
                ErrorMessage: "ENGLISH - Sample Validation Description",
              },
            ],
          },
        ],
      },
    ],
  },
  SuccessMessage: "Intake form get successfully",
};

export const GetPatientIntakeFormMock = {
  Error: null,
  Result: {
    PatientIntakeForm: {
      Id: 0,
      Key: "4",
      PatientId: 2,
      AppointmentId: 2,
      IsCompleted: true,
      CompletedOn: "2023-07-25T08:51:42.191592Z",
      IntakeFormResponses: {
        Code: "TestIFT051",
        Language: "en-US",
        Sections: [
          {
            Text: "Eye Health",
            Code: "IFT051S1",
            ColumnCount: 0,
            Questions: [
              {
                ParentQuestionCode: null,
                ParentQuestionOptionCode: null,
                Code: "IFT051S1Q1",
                Text: "Do you or have you worn glasses?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S1Q1O1",
                    Text: "Yes",
                    IsSelected: true,
                    SelectedValue: "Yes",
                  },
                  {
                    Code: "IFT051S1Q1O2",
                    Text: "No",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S1Q1V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
              {
                ParentQuestionCode: null,
                ParentQuestionOptionCode: null,
                Code: "IFT051S1Q2",
                Text: "Do you or have you worn contact lenses?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S1Q2O1",
                    Text: "Yes",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                  {
                    Code: "IFT051S1Q2O2",
                    Text: "No",
                    IsSelected: true,
                    SelectedValue: "No",
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S1Q2V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
              {
                ParentQuestionCode: "IFT051S1Q1",
                ParentQuestionOptionCode: "IFT051S1Q1O1",
                Code: "IFT051S1Q3",
                Text: "Have you ever had eye surgery or an eye injury?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S1Q3O1",
                    Text: "Yes",
                    IsSelected: true,
                    SelectedValue: "Yes",
                  },
                  {
                    Code: "IFT051S1Q3O2",
                    Text: "No",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S1Q3V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
              {
                ParentQuestionCode: "IFT051S1Q1",
                ParentQuestionOptionCode: "IFT051S1Q1O2",
                Code: "IFT051S1Q4",
                Text: "Are you experiencing any eye symptoms?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S1Q4O1",
                    Text: "Yes",
                    IsSelected: true,
                    SelectedValue: "Yes",
                  },
                  {
                    Code: "IFT051S1Q4O2",
                    Text: "No",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S1Q4V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
            ],
          },
          {
            Text: "General Health",
            Code: "IFT051S2",
            ColumnCount: 0,
            Questions: [
              {
                ParentQuestionCode: null,
                ParentQuestionOptionCode: null,
                Code: "IFT051S2Q1",
                Text: "Do you have a primary care physician?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S2Q1O1",
                    Text: "Yes",
                    IsSelected: true,
                    SelectedValue: "Yes",
                  },
                  {
                    Code: "IFT051S2Q1O2",
                    Text: "No",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S2Q1V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
              {
                ParentQuestionCode: null,
                ParentQuestionOptionCode: null,
                Code: "IFT051S2Q2",
                Text: "Are you currently taking any medications including over-the-counter and supplements?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S2Q2O1",
                    Text: "Yes",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                  {
                    Code: "IFT051S2Q2O2",
                    Text: "No",
                    IsSelected: true,
                    SelectedValue: "No",
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S2Q2V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
            ],
          },
          {
            Text: "Social Health",
            Code: "IFT051S3",
            ColumnCount: 0,
            Questions: [
              {
                ParentQuestionCode: null,
                ParentQuestionOptionCode: null,
                Code: "IFT051S3Q1",
                Text: "Are you pregnant or breastfeeding?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S3Q1O1",
                    Text: "Yes",
                    IsSelected: true,
                    SelectedValue: "Yes",
                  },
                  {
                    Code: "IFT051S3Q1O2",
                    Text: "No",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S3Q1V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
              {
                ParentQuestionCode: null,
                ParentQuestionOptionCode: null,
                Code: "IFT051S3Q2",
                Text: "Do you use tobacco products?",
                Type: "7",
                SequenceNumber: 0,
                OptionColumnCount: 0,
                DisplayType: "Label",
                AnswerValue: "",
                QuestionOptions: [
                  {
                    Code: "IFT051S3Q2O1",
                    Text: "Yes",
                    IsSelected: false,
                    SelectedValue: null,
                  },
                  {
                    Code: "IFT051S3Q2O2",
                    Text: "No",
                    IsSelected: true,
                    SelectedValue: "No",
                  },
                ],
                QuestionRecommendations: [],
                QuestionValidations: [
                  {
                    Code: "IFT051S3Q2V1",
                    Type: "Range",
                    Value: "1-100",
                    Description: "Sample Validation Description",
                  },
                ],
              },
            ],
          },
        ],
      },
      Hipaa: "PGh0bWw+DQp0ZXN0DQo8L2h0bWw+",
    },
    IsEditRequired: false,
  },
  SuccessMessage: "Patient intake form get successfully",
};
