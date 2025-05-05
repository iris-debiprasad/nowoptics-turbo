import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import { CommonUrlConstants } from "@root/host/src/constants/common.url.constants";
import {
  BASE_API_URL,
  INTAKE_URL,
  INVENTORY_URL,
  MASTER_SETUP,
  PATIENT_INFORMATION_URL,
  PATIENT_INTAKE_URL,
} from "../../constants/intake.url.constants";
import {
  CompanyCategoryResult,
  CopyIntakeFormRequest,
  CopyIntakeFormResponse,
  DownloadDefaultFilesResponse,
  DownloadHippaFileRequest,
  DownloadStateFilesResponse,
  GetAddressByZipCodeRequest,
  GetAddressByZipCodeResponse,
  GetAllStateHippaFilesRequest,
  GetAllStateHippaFilesResponse,
  GetAvailibilityRequest,
  GetAvailibilityResponse,
  GetCompanyDropdownRequest,
  GetCompanyDropdownResponse,
  GetConsetFormCheckboxResponse,
  GetDefaultStateHippaFilesRequest,
  GetDefaultStateHippaFilesResponse,
  GetIntakeRequest,
  GetIntakeResponse,
  GetLanguageTypeRequest,
  GetLanguageTypeResponse,
  GetMedicalFormsRequest,
  GetMedicalFormsResponse,
  GetPatientInformationRequest,
  GetPatientInformationResponse,
  GetPatientIntakeFormRequest,
  GetPatientIntakeFormResponse,
  GetQuestionTypeRequest,
  GetQuestionTypeResponse,
  GetSKUsRequest,
  GetSKUsResponse,
  GetStateDropdownRequest,
  GetStateDropdownResponse,
  GetStateHippaPreviewRequest,
  GetStateHippaPreviewResponse,
  GetStoreOptionsRequest,
  GetStoreOptionsResponse,
  MarkIntakeFormAsCompleteRequest,
  MarkIntakeFormAsCompleteResponse,
  PublishIntakeFormRequest,
  PublishIntakeFormResponse,
  ResendPatientOtpAnonymousRequest,
  ResendPatientOtpAnonymousResponse,
  ResendPatientOtpRequest,
  ResendPatientOtpResponse,
  SaveAvailibilityRequest,
  SaveAvailibilityResponse,
  SaveIntakeFormRequest,
  SaveIntakeFormResponse,
  SavePatientAddressCustomerRequest,
  SavePatientAddressRequest,
  SavePatientAddressResponse,
  SavePatientInformationAnonymousRequest,
  SavePatientInformationAnonymousResponse,
  SavePatientInformationRequest,
  SavePatientInformationResponse,
  SavePatientIntakeFormAnonymousRequest,
  SavePatientIntakeFormRequest,
  SavePatientIntakeFormResponse,
  StateResult,
  StoreResult,
  UploadDefaultHippaFileRequest,
  UploadDefaultHippaFileResponse,
  UploadStateHippaFileRequest,
  UploadStateHippaFileResponse,
  VerifyAvailibilityResponse,
  VerifyPatientOtpAnonymousRequest,
  VerifyPatientOtpAnonymousResponse,
  VerifyPatientOtpRequest,
  VerifyPatientOtpResponse,
} from "../../types/intakeApi.types";
import { HeaderConfig } from "@root/host/src/config/headerConfig";

export const intakeApi = createApi({
  reducerPath: "intakeApi",
  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders(headers, { endpoint }) {
      const headersNew = HeaderConfig().headers!;
      const formDataEndpoints = [
        "uploadDefaultHippaFile",
        "uploadStateHippaFile",
        "savePatientIntakeForm",
        "savePatientIntakeFormAnonymous",
      ]
      Object.entries(headersNew).forEach(([key, value]) => {
        if(key === "Content-Type" && formDataEndpoints.includes(endpoint)) {
          return;
        }
        headers.append(key, value as any);
      });
      return headers;
    },
  }),
  tagTypes: [
    "StateHippaFiles",
    "SaveAvailibilityTemplate",
    "AllMedicalForms",
    "PatientAddress",
    "PatientInformation",
    "GetPatientIntakeForm",
    "GetIntakeForm",
    "DefaultHippaFiles",
  ],
  endpoints: (builder) => ({
    getAllMedicalForms: builder.query<
      GetMedicalFormsResponse,
      GetMedicalFormsRequest
    >({
      query: (params) => ({
        url: INTAKE_URL.GET_ALL_MEDICAL_FORMS,
        params,
      }),
      providesTags: ["AllMedicalForms"],
      keepUnusedDataFor: 0,
    }),
    getDefaultHippaForms: builder.query<
      GetDefaultStateHippaFilesResponse,
      GetDefaultStateHippaFilesRequest
    >({
      query: (params) => ({
        url: MASTER_SETUP.GET_DEFAULT_STATE_HIPPA_FILES,
        params,
      }),
    }),
    getAllHippaForms: builder.query<
      GetAllStateHippaFilesResponse,
      GetAllStateHippaFilesRequest
    >({
      query: (params) => ({
        url: MASTER_SETUP.GET_ALL_STATE_HIPPA_FILES,
        params,
      }),
      providesTags: ["StateHippaFiles", "DefaultHippaFiles"],
    }),
    downloadStateHippaFile: builder.query<
      DownloadStateFilesResponse,
      DownloadHippaFileRequest
    >({
      query: (params) => ({
        url: MASTER_SETUP.DOWNLOAD_STATE_HIPPA_FILE + params.hippaFormId,
      }),
    }),
    downloadDefaultHippaFile: builder.query<
      DownloadDefaultFilesResponse,
      DownloadHippaFileRequest
    >({
      query: (params) => ({
        url: MASTER_SETUP.DOWNLOAD_DEFAULT_HIPPA_FILE + params.hippaFormId,
      }),
    }),
    uploadStateHippaFile: builder.mutation<
      UploadStateHippaFileResponse,
      UploadStateHippaFileRequest
    >({
      query: (params) => {
        const formData = new FormData();
        formData.append("file", params.file);
        formData.append("stateId", params.stateId.toString());
        formData.append("code", params.code);
        return {
          url: MASTER_SETUP.UPLOAD_STATE_HIPPA_FILE,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["StateHippaFiles"],
    }),
    uploadDefaultHippaFile: builder.mutation<
      UploadDefaultHippaFileResponse,
      UploadDefaultHippaFileRequest
    >({
      query: (params) => {
        const formData = new FormData();
        formData.append("file", params.file);
        formData.append("code", params.code);
        return {
          url: MASTER_SETUP.UPLOAD_DEFAULT_HIPPA_FILE,
          method: "POST",
          headers: {
            "Content-Type": "multipart/form-data",
          },
          body: formData,
        };
      },
      invalidatesTags: ["DefaultHippaFiles"],
    }),
    getCompanyDropdown: builder.query<
      GetCompanyDropdownResponse,
      GetCompanyDropdownRequest
    >({
      query: () => ({
        url: CommonUrlConstants.GET_COMPANY_DROPDOWN,
      }),
    }),
    getStateDropdown: builder.query<
      GetStateDropdownResponse,
      GetStateDropdownRequest
    >({
      query: () => ({
        url: CommonUrlConstants.GET_STATE_DROPDOWN,
      }),
    }),

    getStoreOptions: builder.query<
      GetStoreOptionsResponse,
      GetStoreOptionsRequest
    >({
      query: (params) => ({
        url: CommonUrlConstants.GET_STORE_DROPDOWN.replace(
          "{0}",
          params.searchString
        ),
      }),
    }),
    saveAvailibilityTemplate: builder.mutation<
      SaveAvailibilityResponse,
      SaveAvailibilityRequest
    >({
      query: (params) => ({
        url: INTAKE_URL.SAVE_AVAILIBILITY_TEMPLATE,
        method: "POST",
        body: params,
      }),
      invalidatesTags: ["SaveAvailibilityTemplate", "AllMedicalForms"],
    }),
    verifyAvailibilityTemplate: builder.mutation<
      VerifyAvailibilityResponse,
      SaveAvailibilityRequest
    >({
      query: (params) => ({
        url: INTAKE_URL.VERIFY_AVAILIBILITY_TEMPLATE,
        method: "PUT",
        body: params,
      }),
      invalidatesTags: ["SaveAvailibilityTemplate"],
    }),
    getCompanyCategoryAvailibility: builder.query<
      GetAvailibilityResponse<CompanyCategoryResult>,
      GetAvailibilityRequest<CompanyCategoryResult>
    >({
      query: ({ templateId, filter, ...params }) => ({
        url:
          INTAKE_URL.COMPANY_CATEGORY_AVAILIBILITY + templateId + `/${filter}`,
        params,
      }),
      providesTags: ["SaveAvailibilityTemplate"],
    }),
    getStoreAvailibility: builder.query<
      GetAvailibilityResponse<StoreResult>,
      GetAvailibilityRequest<StoreResult>
    >({
      query: ({ templateId, filter, ...params }) => ({
        url: INTAKE_URL.STORE_AVAILIBILITY + templateId + `/${filter}`,
        params,
      }),
      providesTags: ["SaveAvailibilityTemplate"],
    }),
    getStateAvailibility: builder.query<
      GetAvailibilityResponse<StateResult>,
      GetAvailibilityRequest<StateResult>
    >({
      query: ({ templateId, filter, ...params }) => ({
        url: INTAKE_URL.STATE_AVAILIBILITY + templateId + `/${filter}`,
        params,
      }),
      providesTags: ["SaveAvailibilityTemplate"],
    }),
    getIntakeForm: builder.query<GetIntakeResponse, GetIntakeRequest>({
      query: (params) => ({
        url:
          INTAKE_URL.GET_INTAKE_FORM +
          params.templateId +
          `/${params.languageCode}`,
      }),
      transformResponse: (response: GetIntakeResponse) => {
        const result = structuredClone(response);
        result.Result.IntakeFormSections.forEach((section, index) => {
          section.SectionIndex = index;
          section.Questions.forEach((question, index) => {
            question.QuestionIndex = index;
            section.Open = false;
            question.ParentQuestionOptionIndex = -1;
            question.ParentQuestionIndex = -1;
            // have the option with code ending with None1 as the last option
            question.QuestionOptions.sort((a, b) => {
              if (a.Code.endsWith("None1")) {
                return 1;
              }
              if (b.Code.endsWith("None1")) {
                return -1;
              }
              return 0;
            }).forEach((option, index) => {
              option.OptionIndex = index;
            });
            question.Recommendations.forEach((recommendation, index) => {
              recommendation.OptionIndex = -1;
              recommendation.RecommendationIndex = index;
            });
          });
        });

        result.Result.IntakeFormSections.forEach((section) => {
          const questions = section.Questions;
          const options = section.Questions.flatMap((x) => x.QuestionOptions);
          section.Questions.forEach((question, index) => {
            if (question.ParentQuestionCode) {
              const parentQuestion = questions.find(
                (x) => x.Code === question.ParentQuestionCode
              );
              if (parentQuestion) {
                question.ParentQuestionIndex = parentQuestion.QuestionIndex;
              }
            }

            if (question.ParentQuestionOptionCode) {
              const parentOption = options.find(
                (x) => x.Code === question.ParentQuestionOptionCode
              );

              if (parentOption) {
                question.ParentQuestionOptionIndex = parentOption.OptionIndex;
              }
            }
          });
        });

        const options = result.Result.IntakeFormSections.flatMap((x) =>
          x.Questions.flatMap((x) => x.QuestionOptions)
        );

        const recommendations = result.Result.IntakeFormSections.flatMap((x) =>
          x.Questions.flatMap((x) => x.Recommendations)
        );

        recommendations.forEach((r) => {
          if (r.OptionValue) {
            const option = options.find((x) => x.Code === r.OptionValue);
            if (option) {
              r.OptionIndex = option.OptionIndex;
            }
          }
        });
        return result;
      },
      providesTags: ["GetIntakeForm"],
    }),

    getSKUs: builder.query<GetSKUsResponse, GetSKUsRequest>({
      query: (params) => ({
        url: INVENTORY_URL.GET_PRODUCTS + params.searchString,
      }),
      keepUnusedDataFor: 0,
    }),

    getQuestionTypes: builder.query<
      GetQuestionTypeResponse,
      GetQuestionTypeRequest
    >({
      query: () => ({
        url: MASTER_SETUP.GET_QUESTION_TYPES,
      }),
    }),

    getLanguageTypes: builder.query<
      GetLanguageTypeResponse,
      GetLanguageTypeRequest
    >({
      query: () => ({
        url: MASTER_SETUP.GET_LANGUAGE_TYPES,
      }),
    }),

    saveTemplateAsDraft: builder.mutation<
      SaveIntakeFormResponse,
      SaveIntakeFormRequest
    >({
      query: (body) => {
        return {
          url: INTAKE_URL.SAVE_INTAKE_FORM_AS_DRAFT,
          method: "PUT",
          body,
        };
      },
    }),
    publishIntakeForm: builder.mutation<
      PublishIntakeFormResponse,
      PublishIntakeFormRequest
    >({
      query: ({ templateId }) => {
        return {
          url: INTAKE_URL.PUBLISH_INTAKE_FORM + templateId,
          method: "POST",
        };
      },
      invalidatesTags: ["AllMedicalForms"],
    }),
    copyIntakeForm: builder.mutation<
      CopyIntakeFormResponse,
      CopyIntakeFormRequest
    >({
      query: (body) => {
        return {
          url: INTAKE_URL.COPY_INTAKE_FORM,
          method: "POST",
          body,
        };
      },
      invalidatesTags: ["AllMedicalForms"],
    }),
    getPatientIntakeForm: builder.query<
      GetPatientIntakeFormResponse,
      GetPatientIntakeFormRequest
    >({
      query: ({
        encryptedAppointmentId,
        isAnonymous,
        patientId,
        isPatient,
      }) => {
        if (isAnonymous) {
          return {
            url:
              PATIENT_INTAKE_URL.GET_INTAKE_FORM_ANONYMOUS +
              "?encodedAppointmentId=" +
              encodeURIComponent(encryptedAppointmentId!),
          };
        } else {
          if (isPatient) {
            return { url: PATIENT_INTAKE_URL.GET_INTAKE_FORM };
          } else {
            return { url: PATIENT_INTAKE_URL.GET_INTAKE_FORM + patientId };
          }
        }
      },
      providesTags: ["GetPatientIntakeForm"],
      keepUnusedDataFor: 0,
    }),
    savePatientIntakeForm: builder.mutation<
      SavePatientIntakeFormResponse,
      SavePatientIntakeFormRequest
    >({
      query: ({ file: pdfFile, PatientId, isPatient, recaptchaToken, ...body }) => {
        
        
        const formData = new FormData();
        if(pdfFile) {
          const buffer = Buffer.from(pdfFile, "base64");
          const blob = new Blob([buffer], { type: "application/pdf" });
          formData.append("file", blob, "file.pdf");
        }
        formData.append("data", JSON.stringify({ ...body, PatientId }));
        return {
          url: isPatient
            ? PATIENT_INTAKE_URL.SAVE_PATIENT_INTAKE_FORM
            : PATIENT_INTAKE_URL.SAVE_PATIENT_INTAKE_FORM_AUTHORIZED +
              PatientId,
          headers: {
            "Content-Type": "multipart/form-data",
            recaptchaToken : isPatient && recaptchaToken.length > 0 ? recaptchaToken : undefined,
          },
          method: "PUT",
          body: formData,
        };
      },
      invalidatesTags: [
        "PatientInformation",
        "PatientAddress",
        "GetPatientIntakeForm",
      ],
    }),
    savePatientIntakeFormAnonymous: builder.mutation<
      SavePatientIntakeFormResponse,
      SavePatientIntakeFormAnonymousRequest
    >({
      query: ({ encryptedAppointmentId, file: pdfFile, recaptchaToken, ...body }) => {
        const formData = new FormData();
        if(pdfFile) {
          const buffer = Buffer.from(pdfFile, "base64");
          const blob = new Blob([buffer], { type: "application/pdf" });
          const file = new File([blob], "file.pdf", { type: "application/pdf" });
          formData.append("file", file);
        }
        formData.append("data", JSON.stringify(body));
        return {
          url:
            PATIENT_INTAKE_URL.SAVE_PATIENT_INTAKE_FORM_ANONYMOUS +
            "?encodedAppointmentId=" +
            encodeURIComponent(encryptedAppointmentId!),
          method: "PUT",
          headers: {
            "Content-Type": "multipart/form-data",
            recaptchaToken : recaptchaToken.length > 0 ? recaptchaToken : undefined,
          },
          body: formData,
        };
      },
      invalidatesTags: [
        "PatientInformation",
        "PatientAddress",
        "GetPatientIntakeForm",
      ],
    }),
    getPatientInformation: builder.query<
      GetPatientInformationResponse,
      GetPatientInformationRequest
    >({
      query: ({
        patientId,
        encryptedAppointmentId,
        isAnonymous,
        isPatient,
      }) => {
        if (isAnonymous) {
          return {
            url:
              PATIENT_INFORMATION_URL.GET_PATIENT_INFORMATION_ANONYMOUS +
              `?id=${encodeURIComponent(encryptedAppointmentId!)}`,
          };
        } else {
          if (isPatient) {
            return {
              url:
                PATIENT_INFORMATION_URL.GET_PATIENT_INFORMATION_CUSTOMER +
                patientId,
            };
          }
          return {
            url: PATIENT_INFORMATION_URL.GET_PATIENT_INFORMATION + patientId,
          };
        }
      },
      providesTags: ["PatientInformation", "PatientAddress"],
      keepUnusedDataFor: 0,
    }),
    getAddressByZipCode: builder.query<
      GetAddressByZipCodeResponse,
      GetAddressByZipCodeRequest
    >({
      query: ({ zipCode }) => ({
        url: PATIENT_INFORMATION_URL.GET_ADDRESS_BY_ZIP + zipCode,
      }),
    }),
    savePatientInformation: builder.mutation<
      SavePatientInformationResponse,
      SavePatientInformationRequest
    >({
      query: (body) => ({
        url: PATIENT_INFORMATION_URL.SAVE_PATIENT_INFORMATION,
        method: "PUT",
        body : {
          ...body,
          recaptchaToken : undefined
        },
      }),
    }),
    savePatientAddress: builder.mutation<
      SavePatientAddressResponse,
      SavePatientAddressRequest
    >({
      query: (body) => ({
        url: PATIENT_INFORMATION_URL.SAVE_PATIENT_ADDRESS + `?isValidateAddress=${body.isValidateAddress}`,
        method: "POST",
        body : {
          ...body,
          recaptchaToken : undefined,
          isValidateAddress : undefined
        },
      }),
    }),
    savePatientInformationCustomer: builder.mutation<
      SavePatientInformationResponse,
      SavePatientInformationRequest
    >({
      query: ({ recaptchaToken, ...body}) => ({
        url: PATIENT_INFORMATION_URL.SAVE_PATIENT_INFORMATION_CUSTOMER,
        method: "PUT",
        body,
        headers : {
          recaptchaToken : recaptchaToken.length > 0 ? recaptchaToken : undefined
        }
      }),
    }),
    savePatientAddressCustomer: builder.mutation<
      SavePatientAddressResponse,
      SavePatientAddressCustomerRequest
    >({
      query: (body) => {
        const recaptchaToken = body[0].recaptchaToken
        const payload = [{ ...body[0], recaptchaToken : undefined, isValidateAddress : undefined }];
        return ({
          url: PATIENT_INFORMATION_URL.SAVE_PATIENT_ADDRESS_CUSTOMER + `?isValidateAddress=${body[0].isValidateAddress}`,
          method: "POST",
          body : payload,
          headers : {
            recaptchaToken : recaptchaToken.length > 0 ? recaptchaToken : undefined
          }
        })
      },
    }),
    verifyPatientOtp: builder.mutation<
      VerifyPatientOtpResponse,
      VerifyPatientOtpRequest
    >({
      query: ({ isPatient, recaptchaToken, ...body }) => ({
        url: isPatient
          ? PATIENT_INFORMATION_URL.VERIFY_OTP_CUSTOMER
          : PATIENT_INFORMATION_URL.VERIFY_OTP,
        method: "POST",
        body,
        headers : {
          recaptchaToken : isPatient && recaptchaToken.length > 0 ? recaptchaToken : undefined
        }
      }),
    }),
    resendPatientOtp: builder.mutation<
      ResendPatientOtpResponse,
      ResendPatientOtpRequest
    >({
      query: ({ isPatient, recaptchaToken, ...body }) => ({
        url: isPatient
          ? PATIENT_INFORMATION_URL.RESEND_OTP_CUSTOMER
          : PATIENT_INFORMATION_URL.RESEND_OTP,
        method: "POST",
        body,
        headers : {
          recaptchaToken : isPatient && recaptchaToken.length > 0 ? recaptchaToken : undefined
        }
      }),
    }),
    verifyPatientOtpAnonymous: builder.mutation<
      VerifyPatientOtpAnonymousResponse,
      VerifyPatientOtpAnonymousRequest
    >({
      query: ({ recaptchaToken, ...body}) => ({
        url: PATIENT_INFORMATION_URL.VERIFY_OTP_ANONYMOUS,
        method: "POST",
        body,
        headers : {
          recaptchaToken : recaptchaToken.length > 0 ? recaptchaToken : undefined
        }
      }),
    }),
    resendPatientOtpAnonymous: builder.mutation<
      ResendPatientOtpAnonymousResponse,
      ResendPatientOtpAnonymousRequest
    >({
      query: ({ recaptchaToken, ...body}) => ({
        url: PATIENT_INFORMATION_URL.RESEND_OTP_ANONYMOUS,
        method: "POST",
        body,
        headers : {
          recaptchaToken : recaptchaToken.length > 0 ? recaptchaToken : undefined
        }
      }),
    }),
    savePatientAddressInformationAnonymous: builder.mutation<
      SavePatientInformationAnonymousResponse,
      SavePatientInformationAnonymousRequest
    >({
      query: ({ recaptchaToken, ...body}) => ({
        url: PATIENT_INFORMATION_URL.SAVE_PATIENT_ADDRESS_INFORMATION_ANONYMOUS + `?isValidateAddress=${body.isValidateAddress}`,
        method: "PUT",
        body,
        headers : {
          recaptchaToken : recaptchaToken.length > 0 ? recaptchaToken : undefined
        }
      }),
    }),
    markIntakeFormAsComplete: builder.mutation<
      MarkIntakeFormAsCompleteResponse,
      MarkIntakeFormAsCompleteRequest
    >({
      query: ({
        isAnonymous,
        encryptedAppointmentId,
        patientId,
        isPatient,
        recaptchaToken,
      }) => {
        let url = "";
        if (isAnonymous) {
          url =
            INTAKE_URL.MARK_PATIENT_INTAKE_COMPLETE + "Guest/" + false
            + `?encryptedId=${encodeURIComponent(encryptedAppointmentId!)}`;
        } else {
          if (isPatient) {
            url = INTAKE_URL.MARK_PATIENT_INTAKE_COMPLETE + "/" + false;
          } else {
            url =
              INTAKE_URL.MARK_PATIENT_INTAKE_COMPLETE_AUTHORIZED + patientId;
          }
        }
        return {
          url,
          method: "PUT",
          headers: {
            recaptchaToken : (isPatient || isAnonymous) && recaptchaToken.length > 0 ? recaptchaToken : undefined,
          },
        };
      },
      invalidatesTags: ["GetPatientIntakeForm"],
    }),
    getConsentFormCheckboxes: builder.query<
      GetConsetFormCheckboxResponse,
      {}
    >({
      query: () => ({
        url: MASTER_SETUP.MANDATORY_CHECKBOXES,
      }),
      keepUnusedDataFor: 0,
    }),
    getStateHippaFilePreview : builder.query<
      GetStateHippaPreviewResponse,
      GetStateHippaPreviewRequest
    >({
      query: ({ stateId, languageId }) => ({
        url: PATIENT_INTAKE_URL.FETCH_STATE_HIPPA_FILE + `${stateId}/${languageId}`,
      }),
    }),
  }),
});

export const {
  useGetAllMedicalFormsQuery,
  useGetDefaultHippaFormsQuery,
  useGetAllHippaFormsQuery,
  useLazyDownloadStateHippaFileQuery,
  useLazyDownloadDefaultHippaFileQuery,
  useUploadStateHippaFileMutation,
  useGetCompanyDropdownQuery,
  useGetStateDropdownQuery,
  useGetStoreOptionsQuery,
  useSaveAvailibilityTemplateMutation,
  useGetCompanyCategoryAvailibilityQuery,
  useGetStoreAvailibilityQuery,
  useGetStateAvailibilityQuery,
  useGetIntakeFormQuery,
  useGetSKUsQuery,
  useGetQuestionTypesQuery,
  useGetLanguageTypesQuery,
  useSaveTemplateAsDraftMutation,
  usePublishIntakeFormMutation,
  useCopyIntakeFormMutation,
  useGetPatientIntakeFormQuery,
  useSavePatientIntakeFormMutation,
  useSavePatientIntakeFormAnonymousMutation,
  useGetPatientInformationQuery,
  useGetAddressByZipCodeQuery,
  useSavePatientAddressMutation,
  useSavePatientInformationMutation,
  useResendPatientOtpMutation,
  useVerifyPatientOtpMutation,
  useSavePatientAddressInformationAnonymousMutation,
  useUploadDefaultHippaFileMutation,
  useMarkIntakeFormAsCompleteMutation,
  useSavePatientAddressCustomerMutation,
  useSavePatientInformationCustomerMutation,
  useVerifyPatientOtpAnonymousMutation,
  useResendPatientOtpAnonymousMutation,
  useVerifyAvailibilityTemplateMutation,
  useGetConsentFormCheckboxesQuery,
  useGetStateHippaFilePreviewQuery,
} = intakeApi;
