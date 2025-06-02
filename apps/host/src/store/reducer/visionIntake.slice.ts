import {
  ChangeVisionIntakeStepAction,
  SaveVisionIntakePayloadAction,
  SaveVisionIntakeRequest,
  SetFormErrorActionType,
  SetVisionIntakePropertyAction,
  UpdateVisionIntakeStepAction,
  VisionIntakeState,
} from "@root/host/src/types/visionIntake.types";
import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { visionIntakeApiSlice } from "./visionIntakeApi.slice";
import { SetFileElementActionType } from "@root/host/src/types/Intake.types";

const intialState: VisionIntakeState = {
  activeStep: 0,
  totalSteps: 5,
  steps: [
    {
      index: 0,
      active: true,
      completed: false,
      title: "Step 1",
    },
    {
      index: 1,
      active: false,
      completed: false,
      title: "Step 2",
    },
    {
      index: 2,
      active: false,
      completed: false,
      title: "Step 3",
    },
    {
      index: 3,
      active: false,
      completed: false,
      title: "Step 4",
    },
    {
      index: 4,
      active: false,
      completed: false,
      title: "Step 5",
    },
  ],
  files: [],
  formErrors: [],
  Hipaa: "",
  saveVisionIntakePayload: {
    CanSeeClearlyWithCurrentRx: null,
    Checkboxes: [],
    DoesDrive: null,
    HaveAnyCurrentSymptoms: null,
    HaveAnyDryItchyTearyOrBurningEyes: null,
    HaveAnyMedicationAllergyPregnantOrBreastfeeding: null,
    HaveAnyPastOrCurrentDisease: null,
    HaveAnySurgeryDiseaseOrEyeDrop: null,
    HaveContactLenses: null,
    HaveGlasses: null,
    LastPhysical: "",
    PrimaryDoctorName: "",
    PatientId: -1,
    StateId: -1,
    EventId: -1,
    LastEyeExamDateId: null,
  },
  formState: "visionIntake",
  StateCode: "",
};

export const visionIntakeSlice = createSlice({
  name: "visionIntake",
  initialState: intialState,
  reducers: {
    SET_ACTIVE_STEP: (state, action) => {
      state.activeStep = action.payload;
    },
    UPDATE_STEP_PROPERTY: (
      state,
      action: PayloadAction<UpdateVisionIntakeStepAction>
    ) => {
      const { index, property, value } = action.payload;
      const step = state.steps.find((step) => step.index === index);
      if (!step) return;
      Object.assign(step, { [property]: value });
    },
    CHANGE_STEP: (
      state,
      action: PayloadAction<ChangeVisionIntakeStepAction>
    ) => {
      const { currentStep, newStep, type } = action.payload;
      if (newStep < 0 || newStep >= state.totalSteps) return;
      state.activeStep = newStep;
      if (type === "next") {
        state.steps[currentStep].active = false;
        state.steps[currentStep].completed = true;
        state.steps[newStep].active = true;
        return;
      }
      state.steps[currentStep].completed = false;
      state.steps[currentStep].active = false;
      state.steps[newStep].completed = false;
      state.steps[newStep].active = true;
    },
    SET_VISION_INTAKE_PROPERTY: (
      state,
      action: PayloadAction<SetVisionIntakePropertyAction>
    ) => {
      const { key, value } = action.payload;
      Object.assign(state, { [key]: value });
    },
    SET_SAVE_VISION_INTAKE_PAYLOAD: (
      state,
      action: PayloadAction<SaveVisionIntakePayloadAction>
    ) => {
      const { key, value, checkboxName } = action.payload;
      if (!state.saveVisionIntakePayload) return;

      switch (key) {
        case "Checkboxes":
          if (checkboxName) {
            state.saveVisionIntakePayload = {
              ...state.saveVisionIntakePayload,
              [key]: {
                ...state.saveVisionIntakePayload.Checkboxes,
                [checkboxName]: value,
              },
            };
          }
          break;
        default:
          state.saveVisionIntakePayload = {
            ...state.saveVisionIntakePayload,
            [key]: value,
          };
      }
    },
    SET_SELECTED_STATE_CODE: (state, action: PayloadAction<string>) => {
      state.StateCode = action.payload;
    },
    SET_FILE_ELEMENT: (
      state,
      action: PayloadAction<SetFileElementActionType>
    ) => {
      const { index, file } = action.payload;
      state.files[index] = file;
    },
    SET_FORM_ERROR: (
      state,
      { payload }: PayloadAction<SetFormErrorActionType>
    ) => {
      const { action, error, key, message } = payload;
      switch (action) {
        case "add":
          const isFound = state.formErrors.find((e) => e.key === key);
          if (!isFound) {
            state.formErrors.push({
              key,
              error,
              message: message || "This is a required field",
            });
          } else {
            state.formErrors = state.formErrors.map((e) => {
              if (e.key === key) {
                return {
                  key,
                  error,
                  message: message || "This is a required field",
                };
              }
              return e;
            });
          }
          break;
        case "remove":
          state.formErrors = state.formErrors.filter((e) => e.key !== key);
          break;
        case "clear":
          state.formErrors = [];
          break;
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      visionIntakeApiSlice.endpoints.GetVisionIntakeByPatientId.matchFulfilled,
      (state, { payload: { Result } }) => {
        // This function will run once the vision intake for the patient is fetched
        // and map the response to the type of object required to save the api response for the vision intake
        // mark the keys not present in type of SaveVisionIntakeRequest["data"] as undefined
        state.Hipaa = Result.Hipaa;
        state.saveVisionIntakePayload.PatientId = Number(
          state.authData!.PatientId!
        );
        if (Result.VisionIntake === null || !state.saveVisionIntakePayload)
          return;
        const mapped = {
          ...Result.VisionIntake,
          Id: undefined,
          BeforeMergePatientId: undefined,
          PatientPrescriptionId: undefined,
          PaperCaptureId: undefined,
          IsActive: undefined,
          CreatedOn: undefined,
          ModifiedOn: undefined,
          Checkboxes: [],
          // Adding this to the mapped object so as to save the first two inputs in the first step
          StateId: state.saveVisionIntakePayload.StateId,
          EventId: state.saveVisionIntakePayload.EventId,
        };
        state.saveVisionIntakePayload = mapped;
      }
    );
    builder.addMatcher(
      visionIntakeApiSlice.endpoints.GetVisionIntakeByPatientIdForView.matchFulfilled,
      (state, { payload: { Result } }) => {
        // This function will run once the vision intake for the patient is fetched
        // and map the response to the type of object required to save the api response for the vision intake
        // mark the keys not present in type of SaveVisionIntakeRequest["data"] as undefined
        state.Hipaa = Result.Hipaa;
        if (Result.VisionIntake === null || !state.saveVisionIntakePayload)
          return;
        const mapped = {
          ...Result.VisionIntake,
          Id: undefined,
          BeforeMergePatientId: undefined,
          PatientPrescriptionId: undefined,
          PaperCaptureId: undefined,
          IsActive: undefined,
          CreatedOn: undefined,
          ModifiedOn: undefined,
          Checkboxes: [],
          // Adding this to the mapped object so as to save the first two inputs in the first step
          StateId: state.saveVisionIntakePayload.StateId,
          EventId: state.saveVisionIntakePayload.EventId,
        };
        state.saveVisionIntakePayload = mapped;
      }
    );
    builder.addMatcher(
      visionIntakeApiSlice.endpoints.GetRxRenewalEventId.matchFulfilled,
      (state, { payload: { Result } }) => {
        state.saveVisionIntakePayload.EventId = Result.EventId;
      }
    );
  },
});

export const {
  CHANGE_STEP,
  SET_ACTIVE_STEP,
  UPDATE_STEP_PROPERTY,
  SET_VISION_INTAKE_PROPERTY,
  SET_SAVE_VISION_INTAKE_PAYLOAD,
  SET_FILE_ELEMENT,
  SET_FORM_ERROR,
  SET_SELECTED_STATE_CODE,
} = visionIntakeSlice.actions;
