import { HeaderConfig } from "@root/host/src/config/headerConfig";
import {
  BASE_API_URL,
  INTAKE_URL,
  MASTER_SETUP,
} from "@root/host/src/constants/intake.url.constants";
import {
  GetAllCountriesResponse,
  GetAllStatesRequest,
  GetAllStatesResponse,
  GetLastExamDateOptionsResponse,
  GetRxIdForRenewalRequest,
  GetRxIdForRenewalResponse,
  GetRxRenewalEventIdRequest,
  GetRxRenewalEventIdResponse,
  GetVisionIntakeByPatientIdForView,
  GetVisionIntakeByPatientIdRequest,
  GetVisionIntakeByPatientIdResponse,
  SaveVisionIntakeRequest,
  SaveVisionIntakeResponse,
  ValidateStateIdRequest,
  ValidateStateIdResponse,
} from "@root/host/src/types/visionIntake.types";
import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const visionIntakeApiSlice = createApi({
  reducerPath: "visionIntakeApi",

  baseQuery: fetchBaseQuery({
    baseUrl: BASE_API_URL,
    prepareHeaders(headers, { endpoint }) {
      const headersNew = HeaderConfig().headers!;
      const formDataEndpoints = ["SaveVisionIntake"];
      Object.entries(headersNew).forEach(([key, value]) => {
        if (key === "Content-Type" && formDataEndpoints.includes(endpoint)) {
          return;
        }
        headers.append(key, value as any);
      });
      return headers;
    },
  }),
  tagTypes: ["GetVisionIntake"],
  endpoints: (builder) => ({
    GetVisionIntakeByPatientId: builder.query<
      GetVisionIntakeByPatientIdResponse,
      GetVisionIntakeByPatientIdRequest
    >({
      query: ({ stateId, EventId }) =>
        INTAKE_URL.GET_VISION_INTAKE_BY_PATIENT_ID + stateId + "/" + EventId,
      providesTags: ["GetVisionIntake"],
    }),
    GetVisionIntakeByPatientIdForView: builder.query<
      GetVisionIntakeByPatientIdResponse,
      GetVisionIntakeByPatientIdForView
    >({
      query: ({ patientId, isPatient }) => {
        const url = isPatient
          ? INTAKE_URL.GET_VISION_INTAKE_BY_PATIENT_ID
          : INTAKE_URL.GET_VISION_INTAKE_BY_PATIENT_ID + "patient/" + patientId;
        return { url };
      },
    }),

    ValidateStateId: builder.query<
      ValidateStateIdResponse,
      ValidateStateIdRequest
    >({
      query: ({ stateId, EventId }) =>
        INTAKE_URL.VALIDATE_STATEID + stateId + "/" + EventId,
    }),
    SaveVisionIntake: builder.mutation<
      SaveVisionIntakeResponse,
      SaveVisionIntakeRequest
    >({
      query: ({ data, file, recaptchaToken }) => {
        const formData = new FormData();
        if (file) {
          const buffer = Buffer.from(file, "base64");
          const blob = new Blob([buffer], { type: "application/pdf" });
          formData.append("file", blob, "file.pdf");
        }
        formData.append("data", JSON.stringify({ ...data }));
        return {
          url: INTAKE_URL.SAVE_VISION_INTAKE,
          method: "POST",
          body: formData,
          headers: {
            "Content-Type": "multipart/form-data",
            recaptchaToken,
          },
        };
      },
      invalidatesTags: ["GetVisionIntake"],
    }),
    GetAllCountries: builder.query<GetAllCountriesResponse, {}>({
      query: () => MASTER_SETUP.GET_ALL_COUNTRY,
    }),
    GetAllStates: builder.query<GetAllStatesResponse, GetAllStatesRequest>({
      query: ({ countryId }) =>
        MASTER_SETUP.GET_ALL_STATES.replace("{countryId}", String(countryId)),
    }),
    GetRxIdForRenewal: builder.query<
      GetRxIdForRenewalResponse,
      GetRxIdForRenewalRequest
    >({
      query: ({ patientId, EventId }) => ({
        url: INTAKE_URL.GET_RX_RENEWALIDS + patientId + "?eventId=" + EventId,
      }),
    }),
    GetRxRenewalEventId: builder.mutation<
      GetRxRenewalEventIdResponse,
      GetRxRenewalEventIdRequest
    >({
      query: ({ recaptchaToken, ...body }) => ({
        url: MASTER_SETUP.CREATE_EVENT,
        method: "POST",
        body,
        headers: {
          recaptchaToken:
            recaptchaToken.length > 0 ? recaptchaToken : undefined,
        },
      }),
    }),
    GetLastExamDateOptions: builder.query<GetLastExamDateOptionsResponse, {}>({
      query: (payload) => ({
        url: MASTER_SETUP.LAST_EXAM_DATE_OPTIONS,
      }),
    }),
  }),
});

export const {
  useGetVisionIntakeByPatientIdQuery,
  useValidateStateIdQuery,
  useLazyValidateStateIdQuery,
  useSaveVisionIntakeMutation,
  useLazyGetAllCountriesQuery,
  useLazyGetAllStatesQuery,
  useGetRxIdForRenewalQuery,
  useGetRxRenewalEventIdMutation,
  useGetLastExamDateOptionsQuery,
  useGetVisionIntakeByPatientIdForViewQuery,
  useLazyGetVisionIntakeByPatientIdForViewQuery
} = visionIntakeApiSlice;
