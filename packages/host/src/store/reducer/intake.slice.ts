import { Question } from "../../types/intakeApi.types";
import { PayloadAction, createSlice, current } from "@reduxjs/toolkit";
import {
  AddChildQuestionActionType,
  AddOptionActionType,
  AddQuestionActionType,
  ChangeFormLanguageActionType,
  ChangePatientIntakeStepActionType,
  CopyQuestionActionType,
  DeleteFormSectionActionType,
  DeleteOptionActionType,
  DeleteQuestionActionType,
  IntakeInitData,
  IntakeRecommendationToggle,
  PatientIntakeForm,
  PatientIntakeMetaData,
  QuestionObjectType,
  QuestionTypeEnum,
  RemoveSkuRecommendationActionType,
  SetAvailibilityModalPropertyActionType,
  SetFileElementActionType,
  SetPatientIntakeErrorsActionType,
  StepLabelType,
  ToggleAvailibilityModalAccordionActionType,
  TogglePatientIntakeEditingActionType,
  UpdateDateValidationActionType,
  UpdateFormErrorsActionType,
  UpdateFormNameActionType,
  UpdateGuardianInitialsActionType,
  UpdateOptionLabelActionType,
  UpdateOptionRecommendActionType,
  UpdateOtpPropertyActionType,
  UpdateOtpValueActionType,
  UpdatePatientInformationValueActionType,
  UpdatePatientIntakeOptionActionType,
  UpdateQuestionActionType,
  UpdateQuestionSequenceActionType,
  UpdateRecommendSkuActionType,
  UpdateRecommendTextActionType,
  UpdateRecommendationToggleType,
  UpdateSectionColumnCountActionType,
  UpdateSectionDescriptionActionType,
  WipeRecommendationsActionType,
} from "../../types/Intake.types";
import { BaseOptionType } from "../../types/intakeInput.types";
import { intakeApi } from "./intakeApi.slice";
import dayjs from "dayjs";
import { DATE_FORMAT } from "@root/host/src/constants/common.constants";
import {
  generatePatientInformationError,
  getAllQuestionIndexFromParent,
  getLastQuestionIndex,
  getLastQuestionSequenceNumber,
  getMappedPatientIntakeForm,
  getNestedChildQuestionsWithNoParent,
  getNestedChildQuestionsWithParent,
  validateOtpAndDisplayModal,
} from "../../utils/intake.utils";
import {
  HIPPA_LABEL,
  INTAKE_LANGUAGE_TYPES,
} from "../../../../intake/src/constants/intake.constants";

const initialState: IntakeInitData = {
  formName: "",
  steps: [],
  formAvailibility: {
    open: false,
    company: [],
    state: [],
    store: [],
    startDate: null,
    templateId: "",
    templateCode: "",
    tables: {
      company: {
        label: "Company Availibility",
        expanded: false,
        data: [],
      },
      state: {
        label: "State Availibility",
        expanded: false,
        data: [],
      },
      store: {
        label: "Store Availibility",
        expanded: false,
        data: [],
      },
    },
  },
  intakeForm: {
    Id: 0,
    Code: "",
    Key: "",
    IntakeFormSections: [],
    CreatedOn: "",
    ModifiedOn: "",
  },
  intakeFormCopy: {
    Id: 0,
    Code: "",
    Key: "",
    IntakeFormSections: [],
    CreatedOn: "",
    ModifiedOn: "",
  },
  intakeRecommendationToggles: [],
  formErrors: [],
  patientIntakeForm: {
    activeStep: -1,
    steps: [],
    editing: false,
  },
  patientIntakeFormCopy: {
    activeStep: -1,
    steps: [],
    editing: false,
  },
  patientIntakeFormErrors: [],
  previewIntakeFormErrors: [],
  patientIntakeInformation: null,
  patientIntakeInformationCopy: null,
  patientInformationOTP: {
    isEmailNeeded: false,
    isPhoneNeeded: false,
    newEmail: "",
    newPhone: "",
    timeLeft: 300,
    otpValuePhone: Array(6).fill(""),
    otpValueEmail: Array(6).fill(""),
    open: false,
  },
  patientIntakeMetaData: {
    patientId: undefined,
    isAnonymous: false,
    encryptedAppointmentId: undefined,
    previewMode: false,
    session: undefined,
    storeDetails: null,
    previewModeStateId: -1,
  },
  previewIntakeForm: {
    activeStep: -1,
    steps: [],
    editing: true,
  },
  files: [],
};

export const intakeSlice = createSlice({
  name: "intake",
  initialState,
  reducers: {
    UPDATE_QUESTION_PROPERTY: (
      state,
      action: PayloadAction<UpdateQuestionActionType>
    ) => {
      const { QuestionIndex, key, value, SectionIndex } = action.payload;
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === SectionIndex
      );
      section?.Questions.forEach((s: Question) => {
        if (s.QuestionIndex === QuestionIndex) {
          if (key === "Type") {
            const keepOptions = [
              QuestionTypeEnum.CHECKBOX_LIST,
              QuestionTypeEnum.RADIOLIST,
              QuestionTypeEnum.DROPDOWN,
            ];
            const isOriginalMultiType = keepOptions.includes(
              s.Type as QuestionTypeEnum
            );
            const isTargetMultiType = keepOptions.includes(
              value as QuestionTypeEnum
            );

            if (isOriginalMultiType && !isTargetMultiType) {
              // changing from multi to single
              const questionsToRemove = getAllQuestionIndexFromParent(section, s, []);
              // remove all the question which have indices in questionsToRemove
              section.Questions = section.Questions.filter(
                (q) => !questionsToRemove.includes(q.QuestionIndex!)
              );

              s.QuestionOptions = [];

            }

            s.Type = value as string;
            if (
              value === QuestionTypeEnum.DATE ||
              value === QuestionTypeEnum.DATE_AND_TIME
            ) {
              s.QuestionValidation = [];
              s.QuestionValidation = s.QuestionValidation.concat([
                {
                  Code: "",
                  ErrorMessage: "Min Date Validation",
                  Type: "Min",
                  Value: "0",
                  QuestionIndex: s.QuestionIndex!,
                  SectionIndex: section?.SectionIndex!,
                },
                {
                  Code: "",
                  ErrorMessage: "Max Date Validation",
                  Type: "Max",
                  Value: "80",
                  QuestionIndex: s.QuestionIndex!,
                  SectionIndex: section?.SectionIndex!,
                },
              ]);
            } else {
              s.QuestionValidation = [];
            }

            state.formErrors = state.formErrors.filter(
              (error) =>
                error.SectionIndex !== SectionIndex &&
                error.QuestionIndex !== QuestionIndex
            );
            return;
          }
          Object.assign(s, {
            ...s,
            [key]: value,
          });
        }
      });
    },
    COPY_QUESTION: (state, action: PayloadAction<CopyQuestionActionType>) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      if (!section) return;
      const questionToCopy = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      ) as Question;

      const isParentQuestion =
        questionToCopy.ParentQuestionIndex === -1 &&
        questionToCopy.ParentQuestionOptionIndex === -1;

      const parentQuestion = section?.Questions.find(
        (s) => s.QuestionIndex === questionToCopy.ParentQuestionIndex
      );

      if (isParentQuestion) {
        const lastSequenceInSection = getLastQuestionSequenceNumber(
          section?.Questions ?? []
        );
        const lastIndex = getLastQuestionIndex(current(section.Questions));
        section?.Questions.push({
          ...questionToCopy,
          QuestionIndex: lastIndex,
          SequenceNumber: lastSequenceInSection + 1,
          QuestionId: undefined,
          QuestionOptions: questionToCopy.QuestionOptions.map(
            (option, index) => {
              const recommendationToggle =
                state.intakeRecommendationToggles.find(
                  (toggle) =>
                    toggle.OptionIndex === option.OptionIndex &&
                    toggle.QuestionIndex === action.payload.QuestionIndex &&
                    toggle.SectionIndex === action.payload.SectionIndex
                );
              if (recommendationToggle) {
                state.intakeRecommendationToggles.push({
                  ...recommendationToggle,
                  OptionIndex: option.OptionIndex!,
                  QuestionIndex: lastIndex,
                  SectionIndex: action.payload.SectionIndex,
                });
              }
              return {
                ...option,
                OptionId: undefined,
              };
            }
          ),
          Recommendations: questionToCopy.Recommendations.map(
            (recommendation, index) => {
              return {
                ...recommendation,
                RecommendationId: undefined,
              };
            }
          ),
        });

        const nestedQuestions = getNestedChildQuestionsWithNoParent(
          questionToCopy.QuestionIndex!,
          lastIndex,
          current(section),
          current(state.intakeRecommendationToggles),
          lastIndex
        );
        const questions = Array.from(nestedQuestions.map.values());
        if (questions.length > 0) {
          section.Questions.push(...Array.from(nestedQuestions.map.values()));
        }

        if (
          JSON.stringify(nestedQuestions?.intakeRecommendationToggles) !==
          JSON.stringify(state.intakeRecommendationToggles)
        ) {
          state.intakeRecommendationToggles =
            nestedQuestions.intakeRecommendationToggles;
        }

        return;
      }

      const lastIndex = getLastQuestionIndex(current(section.Questions));

      const nestedQuestions = getNestedChildQuestionsWithParent(
        parentQuestion?.QuestionIndex!,
        lastIndex,
        current(section),
        current(state.intakeRecommendationToggles),
        parentQuestion?.QuestionIndex!
      );

      const questions = Array.from(nestedQuestions.map.values());
      if (questions.length > 0) {
        section.Questions.push(...Array.from(nestedQuestions.map.values()));
      }

      if (
        JSON.stringify(nestedQuestions?.intakeRecommendationToggles) !==
        JSON.stringify(state.intakeRecommendationToggles)
      ) {
        state.intakeRecommendationToggles =
          nestedQuestions.intakeRecommendationToggles;
      }
    },
    DELETE_QUESTION: (
      state,
      action: PayloadAction<DeleteQuestionActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );

      if (!section) return;
      section.Questions = section.Questions.filter((question, index) => {
        const isParentQuestion = question.ParentQuestionIndex === -1;
        if (!isParentQuestion) {
          const parentQuestion = section.Questions.find(
            (s) => s.QuestionIndex === question.ParentQuestionIndex
          );
          return parentQuestion !== undefined;
        }
        return true;
      });
      const questionToDelete = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      );
      const isParentQuestion =
        questionToDelete?.ParentQuestionIndex === -1 &&
        questionToDelete?.ParentQuestionOptionIndex === -1;
      if (section != undefined && questionToDelete != undefined) {
        section.Questions = section?.Questions.filter((question, index) => {
          return question.QuestionIndex !== action.payload.QuestionIndex;
        });
        if (!isParentQuestion) return;
        section.Questions.forEach((q) => {
          if (
            q.ParentQuestionCode !== null &&
            q.ParentQuestionOptionCode !== null
          )
            return;
          if (
            q.SequenceNumber === 1 ||
            q.SequenceNumber < questionToDelete?.SequenceNumber
          )
            return;
          q.SequenceNumber = q.SequenceNumber - 1;
        });
        section.Questions = section.Questions.filter((question, index) => {
          const isParentQuestion = question.ParentQuestionIndex === -1;
          if (!isParentQuestion) {
            const parentQuestion = section.Questions.find(
              (s) => s.QuestionIndex === question.ParentQuestionIndex
            );
            return parentQuestion !== undefined;
          }
          return true;
        });
      }
      state.intakeRecommendationToggles =
        state.intakeRecommendationToggles.filter((toggle) => {
          const question = section?.Questions.find(
            (question) => question.QuestionIndex === toggle.QuestionIndex
          );
          return question !== undefined;
        });
    },
    ADD_QUESTION: (state, action: PayloadAction<AddQuestionActionType>) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      if (!section) return;
      const lastSequenceInSection = getLastQuestionSequenceNumber(
        section?.Questions ?? []
      );
      const lastIndex = getLastQuestionIndex(current(section.Questions));
      section?.Questions.push({
        Code: "",
        Description: "",
        DisplayType: "1",
        IsRequired: false,
        OptionColumnCount: 0,
        QuestionOptions: [],
        Type: "8",
        ParentQuestionCode: null,
        ParentQuestionOptionCode: null,
        ParentQuestionIndex: -1,
        ParentQuestionOptionIndex: -1,
        SequenceNumber: lastSequenceInSection + 1,
        QuestionValidation: [],
        Recommendations: [],
        QuestionIndex: lastIndex,
      });
    },
    ADD_OPTION: (state, action: PayloadAction<AddOptionActionType>) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      const question = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      );
      const lastOption = question?.QuestionOptions.at(-1);
      const lastOptionIndex =
        lastOption?.OptionIndex === undefined ? 0 : lastOption.OptionIndex + 1;
      question?.QuestionOptions?.push({
        Code: "",
        Description: "",
        OptionIndex: lastOptionIndex,
      });
    },
    UPDATE_OPTION_PROPERTY: (
      state,
      {
        payload: { OptionIndex, QuestionIndex, SectionIndex, key, value },
      }: PayloadAction<UpdateOptionLabelActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === SectionIndex
      );
      const question = section?.Questions.find(
        (s) => s.QuestionIndex === QuestionIndex
      );
      question?.QuestionOptions.forEach((option, index) => {
        if (option.OptionIndex === OptionIndex) {
          return Object.assign(option, {
            ...option,
            [key]: value,
          });
        }
      });
    },
    DELETE_OPTION: (state, action: PayloadAction<DeleteOptionActionType>) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );

      if (section === undefined) return;
      const question = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      );
      if (question != undefined) {
        question.QuestionOptions = question?.QuestionOptions.filter(
          (option, index) => {
            return option.OptionIndex !== action.payload.OptionIndex;
          }
        );
        const childQuestions = new Set(
          section.Questions.filter(
            (question) =>
              question.ParentQuestionIndex === action.payload.QuestionIndex &&
              question.ParentQuestionOptionIndex === action.payload.OptionIndex
          )
        );

        question.Recommendations = question.Recommendations.filter(
          (r, index) => {
            return r.OptionIndex !== action.payload.OptionIndex;
          }
        );

        section.Questions = section.Questions.filter((q) => {
          return !childQuestions.has(q);
        });
      }

      state.intakeRecommendationToggles =
        state.intakeRecommendationToggles.filter((toggle) => {
          const question = section?.Questions.find(
            (question) => question.QuestionIndex === toggle.QuestionIndex
          );
          const option = question?.QuestionOptions.find(
            (option) => option.OptionIndex === toggle.OptionIndex
          );
          return option !== undefined;
        });
    },
    UPDATE_RECOMMENDATION_TOGGLE: (
      state,
      action: PayloadAction<UpdateRecommendationToggleType>
    ) => {
      const { OptionIndex, QuestionIndex, SectionIndex, toggle, type } =
        action.payload;
      const recommendationToggle = state.intakeRecommendationToggles.find(
        (toggle) =>
          toggle.OptionIndex === OptionIndex &&
          toggle.QuestionIndex === QuestionIndex &&
          toggle.SectionIndex === SectionIndex
      );
      if (recommendationToggle === undefined) {
        state.intakeRecommendationToggles.push({
          SectionIndex: SectionIndex!,
          QuestionIndex: QuestionIndex!,
          OptionIndex: OptionIndex!,
          toggle: toggle!,
          type: type!,
        });
        return;
      }
      Object.assign(recommendationToggle, {
        ...recommendationToggle,
        toggle,
        type,
      });
    },
    UPDATE_OPTION_RECOMMEND_PROPERTY: (
      state,
      action: PayloadAction<UpdateOptionRecommendActionType>
    ) => {
      const step = state.steps.find(
        (s) => s.index === action.payload.stepIndex
      );
      const question = step?.questions.find(
        (s) => s.index === action.payload.questionIndex
      );

      if (
        action.payload.optionIndex === undefined &&
        question?.recommend != undefined
      ) {
        Object.assign(question.recommend, {
          ...question.recommend,
          [action.payload.key]: action.payload.value,
        });
        return;
      }

      question?.options.forEach((option: BaseOptionType, index) => {
        if (
          option.index === action.payload.optionIndex &&
          option.recommend != undefined
        ) {
          Object.assign(option.recommend, {
            ...option.recommend,
            [action.payload.key]: action.payload.value,
          });
        }
      });
    },
    UPDATE_SECTION_DESCRIPTION: (
      state,
      action: PayloadAction<UpdateSectionDescriptionActionType>
    ) => {
      const formSection = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      if (formSection === undefined) return;
      formSection.Description = action.payload.value;
    },
    UPDATE_STEP_PROPERTY: (
      state,
      action: PayloadAction<{
        SectionIndex: number;
        key: string;
        value: string | number | boolean | null;
      }>
    ) => {
      const formSection = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      if (formSection === undefined) return;
      Object.assign(formSection, {
        ...formSection,
        [action.payload.key]: action.payload.value,
      });
    },
    TOGGLE_STEP_ACCORDION: (
      state,
      action: PayloadAction<{
        SectionIndex: number;
        Expanded: boolean;
      }>
    ) => {
      const formSection = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      if (formSection === undefined) return;
      formSection.Open = action.payload.Expanded;
    },
    UPDATE_COLUMN_COUNT: (
      state,
      action: PayloadAction<UpdateSectionColumnCountActionType>
    ) => {
      const formSection = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      if (formSection === undefined) return;
      formSection.ColumnCount = action.payload.value;
    },
    ADD_STEP: (state) => {
      const lastSection = state.intakeForm.IntakeFormSections.at(-1);
      const lastIndex =
        lastSection?.SectionIndex === undefined
          ? 0
          : lastSection.SectionIndex + 1;
      state.intakeForm.IntakeFormSections.push({
        Questions: [
          {
            Code: "",
            Description: "",
            DisplayType: "1",
            IsRequired: false,
            OptionColumnCount: 0,
            QuestionOptions: [],
            Type: "8",
            ParentQuestionCode: null,
            ParentQuestionOptionCode: null,
            SequenceNumber: 1,
            QuestionValidation: [],
            Recommendations: [],
            QuestionIndex: 0,
            ParentQuestionIndex: -1,
            ParentQuestionOptionIndex: -1,
          },
        ],
        Code: "",
        SectionIndex: lastIndex,
        Description: "",
        ColumnCount: 1,
        Open: false,
      });
    },
    DELETE_FORM_SECTION: (
      state,
      action: PayloadAction<DeleteFormSectionActionType>
    ) => {
      state.intakeForm.IntakeFormSections =
        state.intakeForm.IntakeFormSections.filter((step, index) => {
          return step.SectionIndex !== action.payload.SectionIndex;
        });
    },
    ADD_CHILD_QUESTION: (
      state,
      action: PayloadAction<AddChildQuestionActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      if (!section) return;
      const lastIndex = getLastQuestionIndex(current(section.Questions));
      section?.Questions.push({
        Code: "",
        Description: "",
        DisplayType: "1",
        IsRequired: false,
        OptionColumnCount: 0,
        QuestionOptions: [],
        Type: "8",
        ParentQuestionCode: null,
        ParentQuestionOptionCode: null,
        SequenceNumber: -1,
        QuestionValidation: [],
        Recommendations: [],
        QuestionIndex: lastIndex,
        ParentQuestionIndex: action.payload.QuestionIndex,
        ParentQuestionOptionIndex: action.payload.OptionIndex,
      });
    },
    SET_AVAILIBILITY_MODAL_PROPERTY: (
      state,
      action: PayloadAction<SetAvailibilityModalPropertyActionType>
    ) => {
      Object.assign(state.formAvailibility, {
        ...state.formAvailibility,
        [action.payload.key]: action.payload.value,
      });
    },
    TOGGLE_AVAILIBILITY_MODAL_ACCORDION: (
      state,
      action: PayloadAction<ToggleAvailibilityModalAccordionActionType>
    ) => {
      const availibilityTables = state.formAvailibility.tables;
      const obj = availibilityTables[action.payload.key];
      obj.expanded = !obj.expanded;
    },
    UPDATE_FORM_NAME: (
      state,
      action: PayloadAction<UpdateFormNameActionType>
    ) => {
      state.intakeForm.Code = action.payload.Code;
    },
    CHANGE_FORM_LANGUAGE: (
      state,
      action: PayloadAction<ChangeFormLanguageActionType>
    ) => {
      state.formLanguage = action.payload.value;
    },
    RESET_AVAILIBILITY_MODAL: (state) => {
      state.formAvailibility = {
        ...state.formAvailibility,
        company: [],
        state: [],
        store: [],
        startDate: null,
        templateId: "",
      };
    },
    UPDATE_RECOMMEND_TEXT: (
      state,
      action: PayloadAction<UpdateRecommendTextActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      const question = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      );
      const lastRecommendation = question?.Recommendations.at(-1);
      const lastIndex =
        lastRecommendation?.RecommendationIndex === undefined
          ? 0
          : lastRecommendation.RecommendationIndex + 1;
      const recommendation = question?.Recommendations.find(
        (s) => s.OptionIndex === action.payload.OptionIndex
      );

      if (recommendation === undefined) {
        const option = question?.QuestionOptions.find(
          (s) => s.OptionIndex === action.payload.OptionIndex
        );

        question?.Recommendations.push({
          RecommendationIndex: lastIndex,
          OptionIndex: action.payload.OptionIndex,
          OptionValue: option?.Code!,
          Type: "Text",
          Value: action.payload.value,
        });
      } else {
        recommendation.Value = action.payload.value;
      }
    },
    UPDATE_RECOMMEND_SKU: (
      state,
      action: PayloadAction<UpdateRecommendSkuActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      const question = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      );
      const lastRecommendation = question?.Recommendations.at(-1);
      const lastIndex =
        lastRecommendation?.RecommendationIndex === undefined
          ? 0
          : lastRecommendation.RecommendationIndex + 1;

      const option = question?.QuestionOptions.find(
        (s) => s.OptionIndex === action.payload.OptionIndex
      );

      if (option === undefined) return;

      question?.Recommendations.push({
        RecommendationIndex: lastIndex,
        OptionIndex: action.payload.OptionIndex,
        OptionValue: option?.Code!,
        Type: "SKU",
        Value: action.payload.value,
      });
    },
    WIPE_RECOMMENDATIONS: (
      state,
      action: PayloadAction<WipeRecommendationsActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );
      const question = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      );

      if (question === undefined) return;
      if (!question?.Recommendations) return;

      question.Recommendations = question.Recommendations.filter(
        (r) =>
          r.OptionIndex !== action.payload.OptionIndex ||
          r.Type !== action.payload.Type
      );
    },

    REMOVE_SKU_RECOMMENDATION: (
      state,
      {
        payload: { QuestionIndex, Recommendation, SectionIndex },
      }: PayloadAction<RemoveSkuRecommendationActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === SectionIndex
      );
      const question = section?.Questions.find(
        (s) => s.QuestionIndex === QuestionIndex
      );

      if (!question?.Recommendations) return;
      const index = question.Recommendations.findIndex(
        (s) => JSON.stringify(s) === JSON.stringify(Recommendation)
      );
      question.Recommendations.splice(index, 1);
    },
    UPDATE_FORM_ERRORS: (
      state,
      action: PayloadAction<UpdateFormErrorsActionType>
    ) => {
      state.formErrors =
        action.payload.formErrors.length === 0 ? [] : action.payload.formErrors;
    },
    UPDATE_DATE_VALIDATION: (
      state,
      action: PayloadAction<UpdateDateValidationActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === action.payload.SectionIndex
      );

      const question = section?.Questions.find(
        (s) => s.QuestionIndex === action.payload.QuestionIndex
      );

      if (question === undefined) return;
      if (question?.QuestionValidation.length === 0) return;

      if (action.payload.type === "min") {
        question.QuestionValidation[0].Value = action.payload.value;
      } else {
        question.QuestionValidation[1].Value = action.payload.value;
      }
    },
    UPDATE_PATIENT_INTAKE_OPTION: (
      state,
      {
        payload: { optionCode, sectionCode, questionCode, value, remove },
      }: PayloadAction<UpdatePatientIntakeOptionActionType>
    ) => {
      const isPreviewMode = state.patientIntakeMetaData.previewMode;
      const key = isPreviewMode ? "previewIntakeForm" : "patientIntakeForm";
      const section = state[
        key
      ].form?.PatientIntakeForm.IntakeFormResponses.Sections.find(
        (s) => s.Code === sectionCode
      );

      const question = section?.Questions.find((s) => s.Code === questionCode);
      if (question) {
        switch (question.Type) {
          case QuestionTypeEnum.TEXT:
          case QuestionTypeEnum.TEXT_AREA:
          case QuestionTypeEnum.NUMBER:
          case QuestionTypeEnum.EMAIL:
          case QuestionTypeEnum.RADIOLIST:
          case QuestionTypeEnum.DROPDOWN:
            question.AnswerValue = value as string;
            return;
          case QuestionTypeEnum.DATE:
            question.AnswerValue = dayjs(value as string).format(DATE_FORMAT);
            return;
          case QuestionTypeEnum.DATE_AND_TIME:
            question.AnswerValue = dayjs(value as string).toISOString();
            return;
          case QuestionTypeEnum.CHECKBOX_LIST:
            if ((value as string).endsWith("None1")) {
              if (remove) {
                question.AnswerValue = "";
                return;
              }
              // None is selected
              // remoe all other options
              question.AnswerValue = value as string;
              return;
            }

            const uniqueSelectedOptions = new Set(
              question.AnswerValue.split(",")
            );
            if (remove) {
              uniqueSelectedOptions.delete(value as string);
              question.AnswerValue = Array.from(uniqueSelectedOptions)
                .filter(Boolean)
                .join(",");
              return;
            }
            const updatedOptions = uniqueSelectedOptions.add(value as string);
            question.AnswerValue = Array.from(updatedOptions)
              .filter(Boolean)
              .join(",");
            return;
        }
      }
    },
    CHANGE_PATIENT_INTAKE_STEP: (
      state,
      action: PayloadAction<ChangePatientIntakeStepActionType>
    ) => {
      const isPreviewMode = state.patientIntakeMetaData.previewMode;
      const key = isPreviewMode ? "previewIntakeForm" : "patientIntakeForm";
      const { activeStep, steps, form, editing } = state[key];
      const isFormComplete = form?.PatientIntakeForm.IsCompleted;
      const currentActiveStep = activeStep;
      const currentStep = steps.find((s) => s.index === currentActiveStep);
      const lastStepIndex = steps.at(-1)?.index;
      const firstStepIndex = steps.at(0)?.index;
      const { action: stepAction, newStepValue } = action.payload;
      const newStep = steps.find((s) => s.index === newStepValue);

      if (
        currentStep === undefined ||
        newStep === undefined ||
        firstStepIndex === undefined ||
        lastStepIndex === undefined
      )
        return;

      if (stepAction === "Next") {
        if (state[key].activeStep === lastStepIndex) return;
        state[key].activeStep = newStepValue;
        currentStep.active = false;
        currentStep.completed = true;
        if (action.payload.file) {
          state.files[currentActiveStep] = action.payload.file;
        }
        newStep.active = true;
        newStep.completed = newStep.completed ? true : false;
        if (isFormComplete && !editing) {
          newStep.completed = true;
          currentStep.completed = true;
        }
        return;
      }

      if (stepAction === "Back") {
        if (state[key].activeStep === firstStepIndex) return;
        state[key].activeStep = newStepValue;
        currentStep.active = false;
        currentStep.completed = false;
        newStep.active = true;
        newStep.completed = false;
        if (isFormComplete && !editing) {
          newStep.completed = true;
          currentStep.completed = true;
        }
      }

      if (stepAction === "Jump") {
        state[key].activeStep = newStepValue;
        currentStep.active = false;
        newStep.active = true;
      }
    },
    UPDATE_PATIENT_INFORMATION_VALUE: (
      state,
      action: PayloadAction<UpdatePatientInformationValueActionType>
    ) => {
      const { key, value, childKey } = action.payload;
      const patientInformation = state.patientIntakeInformation;

      if (!patientInformation) return;

      switch (key) {
        case "FirstName":
        case "LastName":
        case "Email":
        case "Dob":
        case "PreferredLanguageCode":
          patientInformation![key] = value as string;
          return;
        case "GenderCode":
          patientInformation!.GenderCode = value as string;
          return;
        case "PrimaryPhoneNo":
          patientInformation!.PrimaryPhoneNo = {
            ...patientInformation!.PrimaryPhoneNo,
            [childKey!]: value as string,
          };
          return;
        case "ShippingAddress":
          patientInformation!.ShippingAddress = {
            ...patientInformation!.ShippingAddress,
            [childKey!]: value as string,
          };
          return;
          case "IsMarketingConsent":
          patientInformation!.IsMarketingConsent = value as boolean;
          return;
      }
    },
    SET_PATIENT_INTAKE_ERRORS: (
      state,
      action: PayloadAction<SetPatientIntakeErrorsActionType>
    ) => {
      const isPreviewMode = state.patientIntakeMetaData.previewMode;
      const key = isPreviewMode
        ? "previewIntakeFormErrors"
        : "patientIntakeFormErrors";
      state[key] = action.payload.errors;
    },
    UPDATE_OTP_PROPERTY: (
      state,
      action: PayloadAction<UpdateOtpPropertyActionType>
    ) => {
      const { key, value } = action.payload;
      Object.assign(state.patientInformationOTP, {
        ...state.patientInformationOTP,
        [key]: value,
      });
    },
    UPDATE_OTP_VALUE: (
      state,
      action: PayloadAction<UpdateOtpValueActionType>
    ) => {
      const { index, type, value } = action.payload;
      if (type === "email") {
        state.patientInformationOTP.otpValueEmail[index] = value;
        return;
      }
      state.patientInformationOTP.otpValuePhone[index] = value;
    },
    RESET_OTP_FORM: (state) => {
      state.patientInformationOTP = {
        isEmailNeeded: false,
        isPhoneNeeded: false,
        newEmail: "",
        newPhone: "",
        timeLeft: 300,
        otpValuePhone: Array(6).fill(""),
        otpValueEmail: Array(6).fill(""),
        open: false,
      };
    },
    UPDATE_PATIENT_INTAKE_META_DATA: (
      state,
      action: PayloadAction<Partial<PatientIntakeMetaData>>
    ) => {
      state.patientIntakeMetaData = {
        ...state.patientIntakeMetaData,
        ...action.payload,
      };
    },
    TOGGLE_PATIENT_INTAKE_EDITING: (
      state,
      action: PayloadAction<TogglePatientIntakeEditingActionType>
    ) => {
      state.patientIntakeForm.editing = action.payload.flag;
      state.patientIntakeForm.activeStep = 0;
      state.patientIntakeForm.steps.forEach((step) => {
        if (step.index === 0) {
          step.active = true;
        } else {
          step.active = false;
        }
        step.completed = false;
      });
    },
    UPDATE_QUESTION_SEQUENCE: (
      state,
      {
        payload: { SectionIndex, newValue, oldValue },
      }: PayloadAction<UpdateQuestionSequenceActionType>
    ) => {
      const section = state.intakeForm.IntakeFormSections.find(
        (s) => s.SectionIndex === SectionIndex
      );
      if (section === undefined) return;
      const questions = section.Questions;
      const oldQuestion = questions.find((q) => q.SequenceNumber === newValue);
      const currentQuestion = questions.find(
        (q) => q.SequenceNumber === oldValue
      );
      if (oldQuestion === undefined || currentQuestion === undefined) return;
      oldQuestion.SequenceNumber = oldValue;
      currentQuestion.SequenceNumber = newValue;
    },
    RESET_PATIENT_INTAKE_FORM: (state) => {
      const isPreviewMode = state.patientIntakeMetaData.previewMode;
      const key = isPreviewMode ? "previewIntakeForm" : "patientIntakeForm";
      state[key] = {
        form: undefined,
        editing: false,
        activeStep: -1,
        steps: [],
      };
    },
    RESET_INTAKE_FORM: (state) => {
      state.intakeForm = {
        Id: 0,
        Code: "",
        Key: "",
        IntakeFormSections: [],
        CreatedOn: "",
        ModifiedOn: "",
      };
      state.intakeRecommendationToggles = [];
      state.intakeFormCopy = {
        Id: 0,
        Code: "",
        Key: "",
        IntakeFormSections: [],
        CreatedOn: "",
        ModifiedOn: "",
      };
      state.formErrors = [];
      state.formLanguage = undefined;
    },
    SET_FILE_ELEMENT: (
      state,
      action: PayloadAction<SetFileElementActionType>
    ) => {
      const { index, file } = action.payload;
      state.files[index] = file;
    },
    UPDATE_GUARDIAN_INTIALS: (
      state,
      {
        payload: { type, value },
      }: PayloadAction<UpdateGuardianInitialsActionType>
    ) => {
      const patientIntakeForm = state.patientIntakeForm.form?.PatientIntakeForm;
      if (patientIntakeForm === undefined) return;
      patientIntakeForm[type] = value;
    },
    WIPE_PREVIEW_INTAKE_FORM_ANSWERS: (state) => {
      const patientIntakeForm = state.previewIntakeForm.form?.PatientIntakeForm;
      if (patientIntakeForm === undefined) return;
      patientIntakeForm.IntakeFormResponses.Sections.forEach((section) => {
        section.Questions.forEach((question) => {
          question.AnswerValue = "";
        });
      });
    },
    MARK_STEP_AS_COMPLETED_BEFORE: (
      state,
      { payload: { currentStep } }: PayloadAction<{ currentStep: number }>
    ) => {
      const steps = state.patientIntakeForm.steps;
      for (let i = 0; i < currentStep; i++) {
        steps[i].completed = true;
      }
    },
  },
  extraReducers(builder) {
    builder.addMatcher(
      intakeApi.endpoints.getIntakeForm.matchFulfilled,
      (state, { payload }) => {
        const intakeFormMapping = {
          ...payload.Result,
          IntakeFormSections: payload.Result.IntakeFormSections.map(
            (section) => {
              return {
                ...section,
                Questions: section.Questions.map((question) => {
                  const questionToFind = section.Questions.find(
                    (q) => q.QuestionId === question.QuestionId
                  );
                  return {
                    ...question,
                    Recommendations: question.Recommendations.map(
                      (recommendation, index) => {
                        const optionToFind =
                          questionToFind?.QuestionOptions.find(
                            (o) => o.Code === recommendation.OptionValue
                          );
                        const type = (recommendation?.Type ??
                          "None") as IntakeRecommendationToggle["type"];

                        const recommendationToggle =
                          state.intakeRecommendationToggles.find(
                            (toggle) =>
                              toggle.OptionIndex ===
                                optionToFind?.OptionIndex &&
                              toggle.QuestionIndex === question.QuestionIndex &&
                              toggle.SectionIndex === section.SectionIndex &&
                              toggle.type === type
                          );
                        if (
                          recommendationToggle === undefined &&
                          optionToFind
                        ) {
                          state.intakeRecommendationToggles.push({
                            OptionIndex: optionToFind?.OptionIndex!,
                            QuestionIndex: question.QuestionIndex!,
                            SectionIndex: section.SectionIndex!,
                            toggle: true,
                            type,
                          });
                        }
                        return {
                          ...recommendation,
                        };
                      }
                    ),
                  };
                }),
              };
            }
          ),
        };
        state.intakeForm = intakeFormMapping;
        state.intakeFormCopy = intakeFormMapping;
        const mappedPatientIntakeForm = getMappedPatientIntakeForm(
          payload.Result
        );
        state.previewIntakeForm = mappedPatientIntakeForm;
        state.patientIntakeMetaData.previewMode = true;
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.getLanguageTypes.matchFulfilled,
      (state, { payload }) => {
        const english = payload.Result.find(
          (l) => l.Code === INTAKE_LANGUAGE_TYPES.ENGLISH
        )!;
        state.formLanguage = english.Id;
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.getPatientIntakeForm.matchFulfilled,
      (state, { payload }) => {
        const isLanguageChanged =
          state.patientIntakeInformation?.PreferredLanguageCode !==
          state.patientIntakeInformationCopy?.PreferredLanguageCode;
        const isFormDataPresent = state.patientIntakeForm.form !== undefined;

        if (
          payload.Result.PatientIntakeForm.IntakeFormResponses.Sections
            .length === 0
        )
          return;
        const result: PatientIntakeForm = {
          editing: payload.Result.IsEditRequired,
          activeStep: 0,
          steps:
            payload.Result.PatientIntakeForm.IntakeFormResponses.Sections.map(
              (section, index) => {
                return {
                  active: false,
                  completed: false,
                  error: false,
                  label: section.Text,
                  index: index + 1,
                  sectionCode: section.Code,
                } as StepLabelType;
              }
            ),
          form: payload.Result,
        };

        result.form?.PatientIntakeForm.IntakeFormResponses.Sections.forEach(
          (section) => {
            section.Questions.forEach((question) => {
              // For each question, sort the options so that the option with code ending with "None1" is at the end
              question.QuestionOptions = question.QuestionOptions.sort(
                (a, b) => {
                  if (a.Code.endsWith("None1")) return 1;
                  if (b.Code.endsWith("None1")) return -1;
                  return 0;
                }
              );
            });
          }
        );

        if (isLanguageChanged || isFormDataPresent) {
          result.editing = state.patientIntakeForm.editing;
          result.activeStep = state.patientIntakeForm.activeStep;
          const sections = result.form?.PatientIntakeForm.IntakeFormResponses.Sections;
          if(!sections) return;
          result.steps = state.patientIntakeForm.steps.map((step) => {
            const section = sections.find((s) => s.Code === step.sectionCode);
            return {
              ...step,
              label: section?.Text ?? step.label,
            };
          });
        } else {
          result.steps.unshift({
            active: true,
            completed: false,
            error: false,
            index: 0,
            label: "Patient Information",
            sectionCode: "Patient Information",
          });
          result.steps.push({
            active: false,
            completed: false,
            error: false,
            index: result.steps.at(-1)?.index! + 1,
            label: HIPPA_LABEL,
            sectionCode: HIPPA_LABEL,
          });
        }

        // Mark all stepper bullets as completed
        if (payload.Result.PatientIntakeForm.IsCompleted) {
          result.steps = result.steps.map((step) => {
            return {
              ...step,
              completed: true,
            };
          });
        }

        state.patientIntakeForm = result;
        state.patientIntakeFormCopy = result;
        state.files.length = result.steps.length;
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.getPatientInformation.matchFulfilled,
      (state, { payload: { Result } }) => {
        const shippingAddress =
          Result.ShippingAddress === null
            ? ({
                AddressLine1: "",
                AddressLine2: "",
                City: "",
                Country: "",
                County: "",
                State: "",
                ZipCode: Result.ZipCode ?? "",
              } as (typeof Result)["ShippingAddress"])
            : Result.ShippingAddress;

        state.patientIntakeInformation = {
          ...Result,
          ShippingAddress: shippingAddress
        };
        state.patientIntakeInformationCopy = {
          ...Result,
          ShippingAddress: shippingAddress
        };
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.getAddressByZipCode.matchFulfilled,
      (state, { payload: { Result } }) => {
        if (
          state.patientIntakeInformation == null ||
          state.patientIntakeInformationCopy == null
        )
          return;

        let cityPayload = "";
        if (Result.AddressCityZip.CitiesNameList.length > 1) {
          const city = Result.AddressCityZip.CitiesNameList.find(
            (c) => c === state.patientIntakeInformation?.ShippingAddress.City
          );
          cityPayload = city ? city : "";
        } else {
          cityPayload = Result.AddressCityZip.CitiesNameList[0];
        }
        state.patientIntakeInformation.ShippingAddress = {
          ...state.patientIntakeInformation.ShippingAddress,
          Country: Result.CountryName,
          County: Result.CountyName,
          State: Result.StateName,
          City: cityPayload,
        };
        state.patientIntakeInformationCopy.ShippingAddress = {
          ...state.patientIntakeInformationCopy.ShippingAddress,
          Country: Result.CountryName,
          County: Result.CountyName,
          State: Result.StateName,
          City: cityPayload,
        };
        state.patientIntakeFormErrors =
          state.patientIntakeFormErrors.filter(
            (error) =>
              error.key !== "ZipCode" && error.type !== "PatientInformation"
          ) ?? [];
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.getAddressByZipCode.matchRejected,
      (state) => {
        state.patientIntakeFormErrors.push({
          errorMessage: generatePatientInformationError("Zip Code", "Valid"),
          type: "PatientInformation",
          key: "ZipCode",
        });
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.savePatientInformation.matchFulfilled,
      (state, { payload: { Result } }) => {
        const otpState = validateOtpAndDisplayModal(Result, state);
        state.patientInformationOTP = otpState;
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.savePatientAddressInformationAnonymous.matchFulfilled,
      (state, { payload: { Result } }) => {
        const otpState = validateOtpAndDisplayModal(Result, state);
        state.patientInformationOTP = otpState;
      }
    );
    builder.addMatcher(
      intakeApi.endpoints.savePatientInformationCustomer.matchFulfilled,
      (state, { payload: { Result } }) => {
        const otpState = validateOtpAndDisplayModal(Result, state);
        state.patientInformationOTP = otpState;
      }
    );
  },
});
export const {
  UPDATE_QUESTION_PROPERTY,
  COPY_QUESTION,
  DELETE_QUESTION,
  ADD_QUESTION,
  ADD_OPTION,
  UPDATE_OPTION_PROPERTY,
  DELETE_OPTION,
  UPDATE_OPTION_RECOMMEND_PROPERTY,
  UPDATE_SECTION_DESCRIPTION,
  ADD_STEP,
  DELETE_FORM_SECTION,
  ADD_CHILD_QUESTION,
  SET_AVAILIBILITY_MODAL_PROPERTY,
  TOGGLE_AVAILIBILITY_MODAL_ACCORDION,
  UPDATE_FORM_NAME,
  CHANGE_FORM_LANGUAGE,
  RESET_AVAILIBILITY_MODAL,
  UPDATE_RECOMMEND_TEXT,
  UPDATE_RECOMMEND_SKU,
  WIPE_RECOMMENDATIONS,
  REMOVE_SKU_RECOMMENDATION,
  UPDATE_FORM_ERRORS,
  UPDATE_DATE_VALIDATION,
  UPDATE_PATIENT_INTAKE_OPTION,
  CHANGE_PATIENT_INTAKE_STEP,
  UPDATE_PATIENT_INFORMATION_VALUE,
  SET_PATIENT_INTAKE_ERRORS,
  UPDATE_OTP_PROPERTY,
  UPDATE_OTP_VALUE,
  RESET_OTP_FORM,
  UPDATE_PATIENT_INTAKE_META_DATA,
  TOGGLE_PATIENT_INTAKE_EDITING,
  UPDATE_RECOMMENDATION_TOGGLE,
  UPDATE_QUESTION_SEQUENCE,
  RESET_PATIENT_INTAKE_FORM,
  RESET_INTAKE_FORM,
  SET_FILE_ELEMENT,
  UPDATE_GUARDIAN_INTIALS,
  UPDATE_COLUMN_COUNT,
  WIPE_PREVIEW_INTAKE_FORM_ANSWERS,
  MARK_STEP_AS_COMPLETED_BEFORE,
  UPDATE_STEP_PROPERTY,
  TOGGLE_STEP_ACCORDION,
} = intakeSlice.actions;
export default intakeSlice.reducer;
