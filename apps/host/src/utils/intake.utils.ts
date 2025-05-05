import {
  COUNTRY_LIST,
  DATE_FORMAT,
  STATE_LIST,
  isAlphaNumeric,
  isAlphaNumericWithSpace,
  isEmailValidRegex,
  isMobileNumberValidRegex,
  isNameValidRegex,
  isZipcodeValidRegex,
  phoneFormatRegex,
} from "@root/host/src/constants/common.constants";
import dayjs from "dayjs";
import {
  COMMON_INPUT_MAX_LENGTH,
  DATE_TIME_FORMAT_WITHOUT_TIMEZONE,
  FREE_TEXT_MAX_LENGTH,
  HIPPA_LABEL,
  INTAKE_FORM_ERRORS,
} from "../../../intake/src/constants/intake.constants";
import {
  GetPatientInformationValuesSelector,
  IntakeFormError,
  IntakeInitData,
  IntakeRecommendationToggle,
  PatientInformationOTPType,
  PatientIntakeForm,
  PatientIntakeFormError,
  QuestionTypeEnum,
  StepLabelType,
} from "../types/Intake.types";
import {
  GetAddressByZipCodeResult,
  GetIntakeResult,
  GetLanguageTypeResult,
  GetPatientInformationResult,
  GetPatientIntakeFormResult,
  IntakeFormSection,
  PatientIntakeFormQuestion,
  PatientIntakeFormQuestionOption,
  PatientIntakeFormQuestionValidation,
  PatientIntakeFormSection,
  Question,
  ResendPatientOtpAnonymousRequest,
  ResendPatientOtpRequest,
  SaveFormQuestion,
  SaveFormQuestionRecommendation,
  SaveFormQuestionValidation,
  SaveFormSection,
  SaveIntakeFormRequest,
  SaveIntakeFormTemplate,
  SavePatientAddressRequest,
  SavePatientInformationAnonymousRequest,
  SavePatientInformationAnonymousResult,
  SavePatientInformationRequest,
  SavePatientInformationResult,
  SavePatientIntakeFormRequest,
  VerifyPatientOtpAnonymousRequest,
  VerifyPatientOtpRequest,
} from "../types/intakeApi.types";
import { drawDOM, exportPDF } from "@progress/kendo-drawing";

export const gridLayoutStyle = (layoutType: string) => {
  switch (layoutType) {
    case "2":
      return "repeat(2, 1fr)";
    case "3":
      return "repeat(3, 1fr)";
    default:
      return "1fr";
  }
};

export function saveByteArray(data: string, downloadName: string) {
  if (typeof window === "undefined" || data.length === 0) return;
  const a = document.createElement("a");
  document.body.appendChild(a);
  a.style.display = "none";

  const bufferData = Buffer.from(data, "base64");
  const blob = new Blob([bufferData], { type: "application/octet-stream" }),
    url = window.URL.createObjectURL(blob);

  a.href = url;
  a.download = downloadName;
  a.click();
  window.URL.revokeObjectURL(url);
  document.body.removeChild(a);
}

export const tableDate = (date: string): [boolean, string] => {
  const isValidDate = dayjs(date).isValid();
  if (!isValidDate) return [false, ""];
  const formattedDate = dayjs(date).format(DATE_FORMAT);
  return [true, formattedDate];
};

export const generateSaveIntakeFormPayload = (
  languageOptions: GetLanguageTypeResult,
  formLanguage: number,
  IntakeFormSections: IntakeFormSection[],
  Code: string,
  templateId?: number
) => {
  const saveFormLanguage = languageOptions.find((l) => l.Id === formLanguage);
  if (!saveFormLanguage) return;
  const template: SaveIntakeFormTemplate = {
    code: Code,
    templateId: templateId ? templateId : undefined,
    language: saveFormLanguage.Code,
    sections: IntakeFormSections.map((section, index) => {
      const sectionCode = Code + `S${index + 1}`;
      const sectionQuestions = section.Questions;

      const sectionObj: SaveFormSection = {
        sectionId: section.SectionId,
        code: Code + `S${index + 1}`,
        columnCount: section.ColumnCount,
        text: section.Description,
        questions: section.Questions.filter((question, index) => {
          const isParentQuestion = question.ParentQuestionIndex === -1;
          if (!isParentQuestion) {
            const parentQuestion = sectionQuestions.find(
              (s) => s.QuestionIndex === question.ParentQuestionIndex
            );
            return parentQuestion !== undefined;
          }
          return true;
        }).map((question, index) => {
          const isParentQuestion = question.ParentQuestionIndex === -1;
          const parentQuestionOptions =
            sectionQuestions.find(
              (s) => s.QuestionIndex === question.ParentQuestionIndex
            )?.QuestionOptions || [];
          const questionCode = sectionCode + `Q${index + 1}`;
          const questionOptions = question.QuestionOptions;
          const questionObj: SaveFormQuestion = {
            questionId: question.QuestionId,
            parentQuestionCode:
              sectionQuestions.find(
                (s) => s.QuestionIndex === question.ParentQuestionIndex
              )?.Code || "",
            parentQuestionOptionCode:
              parentQuestionOptions.find(
                (s) => s.OptionIndex === question.ParentQuestionOptionIndex
              )?.Code || "",
            code: question.Code,
            text: question.Description,
            type: question.Type,
            isRequired: question.IsRequired,
            displayType: displayTypeForQuestion(question.Type),
            sequenceNumber: isParentQuestion
              ? question.SequenceNumber
              : undefined,
            questionOptions: question.QuestionOptions?.map((option) => {
              return {
                optionId: option.OptionId,
                code: option.Code,
                text: option.Description,
              };
            }),
            questionRecommendations: question.Recommendations?.map(
              (recommendation, index) => {
                const recommedationOption = questionOptions.find(
                  (op) => op.OptionIndex == recommendation.OptionIndex
                );

                const recommendationCode = questionCode + `R${index + 1}`;

                const recommendObj: SaveFormQuestionRecommendation = {
                  code: recommendationCode,
                  type: recommendation.Type,
                  recommendationValue: recommendation.Value,
                  optionValue: recommedationOption?.Code || "",
                  recommendationId: recommendation.RecommendationId,
                };

                return recommendObj;
              }
            ),
            questionValidations: question.QuestionValidation?.map(
              (validation, index) => {
                const validationCode = questionCode + `V${index + 1}`;
                const validationObj: SaveFormQuestionValidation = {
                  code: validationCode,
                  type: validation.Type,
                  value: validation.Value.length === 0 ? "0" : validation.Value,
                  description: validation.ErrorMessage,
                  validationId: validation.ValidationId,
                };
                return validationObj;
              }
            ),
          };

          // if the question type is checkbox list, add an option with text None and code QuestionCode + None01
          if (question.Type === QuestionTypeEnum.CHECKBOX_LIST) {
            const optionCode = question.Code + "None1";
            // check if the option already exists
            const noneOption = questionObj.questionOptions.find(
              (option) =>
                option.text === "None" && option.code.endsWith("None1")
            );
            if (!noneOption) {
              questionObj.questionOptions.push({
                code: optionCode,
                text: "None",
              });
            }
          }
          return questionObj;
        }),
      };

      return sectionObj;
    }),
  };

  const intakeFormPayload: SaveIntakeFormRequest = {
    intakeFormTemplate: [template],
  };

  return intakeFormPayload;
};

export const validateIntakeForm = (
  FormCode: string,
  IntakeFormSections: IntakeFormSection[],
  intakeRecommendationToggles: IntakeRecommendationToggle[]
) => {
  const formErrors: IntakeFormError[] = [];

  if (FormCode.length === 0) {
    formErrors.push({
      errorMessage: INTAKE_FORM_ERRORS.REQUIRED_FORM_CODE,
      field: "FormCode",
      type: "Form",
    });
  }

  if (
    FormCode.length > COMMON_INPUT_MAX_LENGTH ||
    !isAlphaNumericWithSpace.test(FormCode)
  ) {
    formErrors.push({
      errorMessage: INTAKE_FORM_ERRORS.INVALID_FORM_CODE,
      field: "FormCode",
      type: "Form",
    });
  }

  IntakeFormSections.forEach((section) => {
    if (section.Description.length === 0) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.REQUIRED_SECTION_DESCRIPTION,
        field: "SectionDescription",
        type: "Section",
        SectionIndex: section.SectionIndex,
      });
    }

    if (section.Description.length > COMMON_INPUT_MAX_LENGTH) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.INVALID_SECTION_DESCRIPTION,
        field: "SectionDescription",
        type: "Section",
        SectionIndex: section.SectionIndex,
      });
    }
    formErrors.push(
      ...validateQuestions(
        section.Questions,
        section,
        intakeRecommendationToggles
      )
    );
  });

  return formErrors;
};

export const validatePatientInformationForm = (
  values: GetPatientInformationValuesSelector
) => {
  const formErrors: PatientIntakeFormError[] = [];
  let t: keyof GetPatientInformationValuesSelector;
  for (t in values) {
    const value = values[t];
    let errorObj: PatientIntakeFormError = {
      errorMessage: "",
      key: t,
      type: "PatientInformation",
    };
    switch (t) {
      case "GenderCode":
        if (!value) {
          errorObj.errorMessage = generatePatientInformationError(
            "Gender",
            "Required"
          );
        }
        break;
      case "FirstName":
        if (!isNameValidRegex.test((value as string).trim())) {
          errorObj.errorMessage = generatePatientInformationError(
            "First Name",
            "Valid"
          );
          break;
        }
        if ((value as string).trim().length > COMMON_INPUT_MAX_LENGTH) {
          errorObj.errorMessage = generatePatientInformationError(
            "First Name",
            "CharLimit",
            100
          );
        }
        break;
      case "LastName":
        if (!isNameValidRegex.test((value as string).trim())) {
          errorObj.errorMessage = generatePatientInformationError(
            "Last Name",
            "Valid"
          );
          break;
        }
        if ((value as string).trim().length > COMMON_INPUT_MAX_LENGTH) {
          errorObj.errorMessage = generatePatientInformationError(
            "Last Name",
            "CharLimit",
            100
          );
        }
        break;
      case "Email":
        if (!value) {
          errorObj.errorMessage = generatePatientInformationError(
            "Email Address",
            "Required"
          );
        } else {
          if (!isEmailValidRegex.test(value as string)) {
            errorObj.errorMessage = generatePatientInformationError(
              "Email Address",
              "Valid"
            );
          }
        }
        break;
      case "ZipCode":
        const zipVal = values["ShippingAddress"].ZipCode;
        if (!zipVal) {
          errorObj.errorMessage = generatePatientInformationError(
            "Zip Code",
            "Required"
          );
          break;
        }

        if (!isZipcodeValidRegex.test(zipVal as string)) {
          errorObj.errorMessage = generatePatientInformationError(
            "Zip Code",
            "Valid"
          );
        }
        break;
      case "ShippingAddress":
        const addressVal = values["ShippingAddress"];
        if (addressVal.AddressLine1.length === 0) {
          errorObj.errorMessage = generatePatientInformationError(
            "Address Line 1",
            "Required"
          );
          errorObj.key = "Address1";
          break;
        }
        if (addressVal.City.length === 0) {
          errorObj.errorMessage = generatePatientInformationError(
            "City",
            "Required"
          );
          errorObj.key = "City";
          break;
        }
        break;
      case "PrimaryPhoneNo":
        const phoneNum = values["PrimaryPhoneNo"].PhoneNumber;
        if (!phoneNum || phoneNum.length === 0) {
          errorObj.errorMessage = generatePatientInformationError(
            "Mobile Number",
            "Required"
          );
          break;
        }

        if (!isMobileNumberValidRegex.test(phoneNum)) {
          errorObj.errorMessage = generatePatientInformationError(
            "Mobile Number",
            "Valid"
          );
          break;
        }
        break;
      case "Dob":
        if (!value) {
          errorObj.errorMessage = generatePatientInformationError(
            "Date Of Birth",
            "Required"
          );
          break;
        }

        if (!dayjs(value as string).isValid()) {
          errorObj.errorMessage = generatePatientInformationError(
            "Date Of Birth",
            "Valid"
          );
          break;
        }
    }
    formErrors.push(errorObj);
  }
  return formErrors.filter((error) => error.errorMessage.length > 0);
};

function displayTypeForQuestion(questionType: string) {
  switch (questionType) {
    case "1":
    case "7":
      return "Label";
    case "2":
      return "Dropdown";
    default:
      return "Placeholder";
  }
}

export function generatePatientInformationError(
  key: string,
  type: "Valid" | "CharLimit" | "Required",
  charLimit?: number
) {
  switch (type) {
    case "Valid":
      return `Please enter valid ${key.toLowerCase()}`;
    case "CharLimit":
      return `${key} must be less than or equal to ${charLimit} characters`;
    case "Required":
      return `Please enter ${key.toLowerCase()}`;
  }
}

export function generateSavePatientInformationPayload(
  formValues: GetPatientInformationValuesSelector,
  patientInformation: GetPatientInformationResult | null | undefined,
  storeId: number,
  recaptchaToken: string,
  zipCodeResponse?: GetAddressByZipCodeResult
): [SavePatientAddressRequest, SavePatientInformationRequest] {
  const saveAddressPayload: SavePatientAddressRequest = {
    Id: formValues.ShippingAddress.Id,
    PatientId: patientInformation!.Id.toString(),
    AddressType: "shipping",
    AddressLine1: formValues.ShippingAddress.AddressLine1,
    AddressLine2: formValues.ShippingAddress.AddressLine2,
    ZipCode: formValues.ShippingAddress.ZipCode,
    StateCode: STATE_LIST[zipCodeResponse?.StateId!] || "",
    City: formValues.ShippingAddress.City,
    Country: formValues.ShippingAddress.Country,
    State: formValues.ShippingAddress.State,
    County: formValues.ShippingAddress.County,
    StoreId: storeId,
    CountryCode: COUNTRY_LIST[zipCodeResponse?.CountryId!] || "",
    recaptchaToken,
  };

  const savePatientInformationPayload: SavePatientInformationRequest = {
    Dob: dayjs(formValues.Dob).format(DATE_TIME_FORMAT_WITHOUT_TIMEZONE),
    Email: formValues.Email,
    FirstName: formValues.FirstName.trim(),
    LastName: formValues.LastName.trim(),
    GenderCode: formValues.GenderCode,
    PreferredLanguageCode: formValues.PreferredLanguageCode,
    PrimaryPhoneNo: patientInformation!.PrimaryPhoneNo,
    Id: patientInformation!.Id,
    SecondaryPhoneNo: patientInformation!.SecondaryPhoneNo,
    StoreId: storeId,
    recaptchaToken,
    IsMarketingConsent: formValues.IsMarketingConsent
  };

  return [saveAddressPayload, savePatientInformationPayload];
}

export const generateSavePatientInformationPayloadAnonymous = (
  encryptedAppointmentId: string,
  formValues: GetPatientInformationValuesSelector,
  recaptchaToken: string,
  zipCodeResponse?: GetAddressByZipCodeResult
) => {
  const cityIndex = zipCodeResponse?.AddressCityZip.CitiesNameList.findIndex(
    (c) => c === formValues.ShippingAddress.City
  );
  const payload: SavePatientInformationAnonymousRequest = {
    AppointmentId: encryptedAppointmentId,
    FirstName: formValues.FirstName.trim(),
    LastName: formValues.LastName.trim(),
    Email: formValues.Email,
    Dob: dayjs(formValues.Dob).format(DATE_TIME_FORMAT_WITHOUT_TIMEZONE),
    PreferredLanguageCode: formValues.PreferredLanguageCode,
    GenderCode: formValues.GenderCode,
    PrimaryPhoneNo: formValues.PrimaryPhoneNo,
    AddressLine1: formValues.ShippingAddress.AddressLine1,
    AddressLine2: formValues.ShippingAddress.AddressLine2,
    ZipId: zipCodeResponse?.AddressCityZip.ZipIdList[cityIndex!].toString()!,
    CityId:
      zipCodeResponse?.AddressCityZip.CitiesIdList[cityIndex!].toString()!,
    recaptchaToken,
    IsMarketingConsent: formValues.IsMarketingConsent
  };

  return payload;
};

export function generateOtpMessages({
  isEmailNeeded,
  isPhoneNeeded,
  newEmail,
  newPhone,
}: PatientInformationOTPType) {
  let otpMessage = "";
  let otpSentMessage = "";
  if (isEmailNeeded && !isPhoneNeeded) {
    otpMessage = `Please enter the Verification Code below to validate your Email.`;
    otpSentMessage = `A Verification Code has been sent to your email ${newEmail}`;
  }
  if (!isEmailNeeded && isPhoneNeeded) {
    otpMessage = `Please enter the Verification Code below to validate your Mobile.`;
    otpSentMessage = `A Verification Code has been sent to your phone number ${newPhone.replace(
      phoneFormatRegex,
      "($1) $2-$3"
    )}`;
  }
  if (isEmailNeeded && isPhoneNeeded) {
    otpMessage = `Please enter the Verification Code below to validate your Email and Mobile.`;
    otpSentMessage = `A Verification Code has been sent to your phone number ${newPhone.replace(
      phoneFormatRegex,
      "($1) $2-$3"
    )} and your email ${newEmail}`;
  }
  return [otpMessage, otpSentMessage];
}

export function formatOTPTime(timeInSeconds: number) {
  const minutes = Math.floor(timeInSeconds / 60);
  const seconds = timeInSeconds % 60;
  return `${minutes.toString().padStart(2, "0")}:${seconds
    .toString()
    .padStart(2, "0")}`;
}

export function generateResendOtpPayload(
  otpValues: PatientInformationOTPType,
  storeId: number,
  isAnonymous: boolean,
  appointmentId: string,
  recaptchaToken: string,
  patientInformation?: GetPatientInformationResult
) {
  if (!isAnonymous) {
    const resendOtpPayload = {
      storeId,
      patientId: patientInformation!.Id,
      email: otpValues.newEmail,
      phone: {
        isdCode: patientInformation!.PrimaryPhoneNo.IsdCode,
        phoneNumber: otpValues.newPhone,
      },
      recaptchaToken,
    } as ResendPatientOtpRequest;
    return resendOtpPayload;
  }

  return {
    storeId,
    appointmentId,
    email: otpValues.newEmail,
    phone: {
      isdCode: patientInformation!.PrimaryPhoneNo.IsdCode,
      phoneNumber: otpValues.newPhone,
    },
    recaptchaToken,
  } as ResendPatientOtpAnonymousRequest;
}

export function generateVerifyOtpPayload(
  otpValues: PatientInformationOTPType,
  storeId: number,
  isAnonymous: boolean,
  appointmentId: string,
  recaptchaToken: string,
  patientInformation?: GetPatientInformationResult
) {
  if (!isAnonymous) {
    const verifyOtpPayload = {
      storeId,
      email: otpValues.isEmailNeeded ? otpValues.newEmail : null,
      patientId: patientInformation!.Id,
      phone: otpValues.isPhoneNeeded
        ? {
            isdCode: patientInformation!.PrimaryPhoneNo.IsdCode,
            phoneNumber: otpValues.newPhone,
          }
        : null,
      emailOtp: otpValues.isEmailNeeded
        ? otpValues.otpValueEmail.join("")
        : null,
      phoneOtp: otpValues.isPhoneNeeded
        ? otpValues.otpValuePhone.join("")
        : null,
      recaptchaToken,
    } as Omit<VerifyPatientOtpRequest, "isPatient">;
    return verifyOtpPayload;
  }

  return {
    storeId,
    email: otpValues.isEmailNeeded ? otpValues.newEmail : null,
    appointmentId,
    phone: otpValues.isPhoneNeeded
      ? {
          isdCode: patientInformation!.PrimaryPhoneNo.IsdCode,
          phoneNumber: otpValues.newPhone,
        }
      : null,
    emailOtp: otpValues.isEmailNeeded ? otpValues.otpValueEmail.join("") : null,
    phoneOtp: otpValues.isPhoneNeeded ? otpValues.otpValuePhone.join("") : null,
    recaptchaToken,
  } as VerifyPatientOtpAnonymousRequest;
}

export function validateOtpInputs(otpValues: PatientInformationOTPType) {
  const otpErrors: PatientIntakeFormError[] = [];
  if (otpValues.isEmailNeeded && otpValues.otpValueEmail.join("").length < 6) {
    otpErrors.push({
      errorMessage: generatePatientInformationError("Email OTP", "Valid"),
      key: "EmailOtp",
      type: "PatientInformation",
    });
  }
  if (otpValues.isPhoneNeeded && otpValues.otpValuePhone.join("").length < 6) {
    otpErrors.push({
      errorMessage: generatePatientInformationError("Mobile OTP", "Valid"),
      key: "PhoneOtp",
      type: "PatientInformation",
    });
  }
  return otpErrors;
}

export function validateHippaFormStep(
  isSignatureEmpty: boolean,
  isPatientUnderAge: boolean,
  GuardianFirstName?: string,
  GuardianLastName?: string
) {
  const errors: PatientIntakeFormError[] = [];
  if (isSignatureEmpty) {
    errors.push({
      errorMessage: generatePatientInformationError("Signature", "Required"),
      key: "Signature",
      type: "HippaForms",
    });
  }

  if (isPatientUnderAge) {
    if (GuardianFirstName === undefined) {
      errors.push({
        errorMessage: generatePatientInformationError(
          "Guardian First Name",
          "Required"
        ),
        key: "GuardianFirstName",
        type: "HippaForms",
      });
    }

    if (!GuardianLastName) {
      errors.push({
        errorMessage: generatePatientInformationError(
          "Guardian Last Name",
          "Required"
        ),
        key: "GuardianLastName",
        type: "HippaForms",
      });
    }

    if (!isNameValidRegex.test(GuardianFirstName as string)) {
      errors.push({
        errorMessage: generatePatientInformationError(
          "Guardian First Name",
          "Valid"
        ),
        key: "GuardianFirstName",
        type: "HippaForms",
      });
    }

    if (!isNameValidRegex.test(GuardianLastName as string)) {
      errors.push({
        errorMessage: generatePatientInformationError(
          "Guardian Last Name",
          "Valid"
        ),
        key: "GuardianLastName",
        type: "HippaForms",
      });
    }
  }

  return errors;
}

export function isOTPGenerated(values: SavePatientInformationResult) {
  return (
    values.IsEmailOtpGenerated ||
    values.IsOnlyPhoneOrEmailUpdated ||
    values.IsPhoneOtpGenerated
  );
}

export function validateIntakeStep(section: PatientIntakeFormSection) {
  let errors: PatientIntakeFormError[] = [];
  section.Questions.forEach((question) => {
    const isParentQuestion =
      question.ParentQuestionCode === null &&
      question.ParentQuestionOptionCode === null;

    if (question.IsRequired) {
      let currQuestion = question;
      while (
        currQuestion.ParentQuestionCode !== null &&
        currQuestion.ParentQuestionOptionCode !== null
      ) {
        const parentQuestion = section.Questions.find(
          (q) => q.Code === currQuestion.ParentQuestionCode
        );
        const answerValueParent = parentQuestion?.AnswerValue.split(",");
        const isParentAnswerSelected = answerValueParent?.includes(
          currQuestion.ParentQuestionOptionCode!
        );
        if (!isParentAnswerSelected) {
          return;
        }
        currQuestion = parentQuestion!;
      }
      switch (question.Type) {
        case QuestionTypeEnum.TEXT:
        case QuestionTypeEnum.TEXT_AREA:
        case QuestionTypeEnum.EMAIL:
        case QuestionTypeEnum.NUMBER:
          errors = validateIntakeStepInput(
            errors,
            question,
            section,
            isParentQuestion
          );
          break;
        case QuestionTypeEnum.RADIOLIST:
        case QuestionTypeEnum.DROPDOWN:
        case QuestionTypeEnum.CHECKBOX_LIST:
          const noAnswerSelected = question.AnswerValue.length === 0;
          if (noAnswerSelected) {
            errors.push({
              errorMessage: generatePatientInformationError("Option", "Valid"),
              key: "Valid",
              type: "GenericStep",
              questionCode: question.Code,
              step: section.Code,
            });
          }
          break;
        case QuestionTypeEnum.DATE:
        case QuestionTypeEnum.DATE_AND_TIME:
          errors = validateIntakeStepInput(
            errors,
            question,
            section,
            isParentQuestion
          );

          errors = validateIntakeStepDate(errors, question, section);
          break;
      }
    } else {
      switch (question.Type) {
        case QuestionTypeEnum.EMAIL:
          errors = validateIntakeStepEmail(errors, question, section);
          break;
        case QuestionTypeEnum.NUMBER:
          errors = validateIntakeStepNumber(errors, question, section);
          break;
        case QuestionTypeEnum.DATE:
        case QuestionTypeEnum.DATE_AND_TIME:
          errors = validateIntakeStepDate(errors, question, section);
          break;
        default:
          break;
      }
    }
  });

  return errors;
}

function validateIntakeStepEmail(
  formErrors: PatientIntakeFormError[],
  question: PatientIntakeFormQuestion,
  section: PatientIntakeFormSection
) {
  if (
    question.AnswerValue.length > 0 &&
    !isEmailValidRegex.test(question.AnswerValue)
  ) {
    formErrors.push({
      errorMessage: generatePatientInformationError("Email", "Valid"),
      key: "Email",
      type: "GenericStep",
      questionCode: question.Code,
      step: section.Code,
    });
  }

  return formErrors;
}

function validateIntakeStepNumber(
  formErrors: PatientIntakeFormError[],
  question: PatientIntakeFormQuestion,
  section: PatientIntakeFormSection
) {
  if (question.AnswerValue.length > 0 && isNaN(+question.AnswerValue)) {
    formErrors.push({
      errorMessage: generatePatientInformationError("Number", "Valid"),
      key: "Number",
      type: "GenericStep",
      questionCode: question.Code,
      step: section.Code,
    });
  }

  return formErrors;
}

function validateIntakeStepDate(
  formErrors: PatientIntakeFormError[],
  question: PatientIntakeFormQuestion,
  section: PatientIntakeFormSection
) {
  const minValidation = question.QuestionValidations.find(
    (validation) => validation.Type === "Min"
  );
  const maxValidation = question.QuestionValidations.find(
    (validation) => validation.Type === "Max"
  );

  if (question.AnswerValue.length > 0 && minValidation && maxValidation) {
    const currentDateValue = dayjs();
    const dateValue = dayjs(question.AnswerValue);
    const minValue = minValidation ? +minValidation?.Value : 0;
    const maxValue = maxValidation ? +maxValidation?.Value : 0;
    const daysToSubtract =
      minValue === 0 ? (maxValue - 1 < 0 ? 0 : maxValue - 1) : maxValue;
    const leastValidDate = currentDateValue.subtract(daysToSubtract, "day");

    if (!dateValue.isValid()) {
      formErrors.push({
        errorMessage: generatePatientInformationError("Date", "Valid"),
        key: "Date",
        type: "GenericStep",
        questionCode: question.Code,
        step: section.Code,
      });
    }

    if (minValue === 1) {
      if (dateValue.isSame(currentDateValue, "date")) {
        formErrors.push({
          errorMessage: generatePatientInformationError("Date", "Valid"),
          key: "Date",
          type: "GenericStep",
          questionCode: question.Code,
          step: section.Code,
        });
      }
    }

    if (dateValue.isAfter(currentDateValue, "date")) {
      formErrors.push({
        errorMessage: generatePatientInformationError("Date", "Valid"),
        key: "Date",
        type: "GenericStep",
        questionCode: question.Code,
        step: section.Code,
      });
    }

    if (dateValue.isBefore(leastValidDate, "date")) {
      formErrors.push({
        errorMessage: generatePatientInformationError("Date", "Valid"),
        key: "Date",
        type: "GenericStep",
        questionCode: question.Code,
        step: section.Code,
      });
    }
  }
  return formErrors;
}

function validateIntakeStepInput(
  formErrors: PatientIntakeFormError[],
  question: PatientIntakeFormQuestion,
  section: PatientIntakeFormSection,
  _isParentQuestion: boolean
) {
  if (question.AnswerValue.length === 0) {
    formErrors.push({
      errorMessage: generatePatientInformationError("Answer", "Required"),
      key: "Required",
      type: "GenericStep",
      questionCode: question.Code,
      step: section.Code,
    });
  }

  if (question.Type === QuestionTypeEnum.EMAIL) {
    const emailErrors = validateIntakeStepEmail(formErrors, question, section);
    formErrors.push(...emailErrors);
  }

  if (question.Type === QuestionTypeEnum.NUMBER) {
    const numberErrors = validateIntakeStepNumber(
      formErrors,
      question,
      section
    );
    formErrors.push(...numberErrors);
  }
  return formErrors;
}

export const validateOtpAndDisplayModal = (
  {
    IsEmailOtpGenerated,
    IsOnlyPhoneOrEmailUpdated,
    IsPhoneOtpGenerated,
    PatientId,
  }: SavePatientInformationResult | SavePatientInformationAnonymousResult,
  state: IntakeInitData
): PatientInformationOTPType => {
  const patientOtpValues = state.patientInformationOTP;

  return {
    ...patientOtpValues,
    isPhoneNeeded: IsPhoneOtpGenerated,
    isEmailNeeded: IsEmailOtpGenerated,
    open: IsPhoneOtpGenerated || IsEmailOtpGenerated,
    newPhone: state.patientIntakeInformation?.PrimaryPhoneNo.PhoneNumber!,
    newEmail: state.patientIntakeInformation?.Email!,
  };
};

export function generateSaveIntakeFormPayloadForSubmit(
  pdfFile: string,
  Checkboxes: SavePatientIntakeFormRequest["Checkboxes"],
  recaptchaToken: string,
  patientIntakeForm?: GetPatientIntakeFormResult["PatientIntakeForm"]
) {
  if (!patientIntakeForm) return;

  const payload: Omit<SavePatientIntakeFormRequest, "isPatient"> = {
    IsCompleted: true,
    IntakeFormResponses: {
      ...patientIntakeForm?.IntakeFormResponses,
    },
    PatientId: patientIntakeForm.PatientId,
    GuardianFirstName: patientIntakeForm.GuardianFirstName,
    GuardianLastName: patientIntakeForm.GuardianLastName,
    file: pdfFile,
    Checkboxes,
    recaptchaToken,
  };

  return payload;
}

export function generateIntermediateSaveIntakeFormPayload(
  recaptchaToken: string,
  patientIntakeForm?: GetPatientIntakeFormResult["PatientIntakeForm"]
) {
  if (!patientIntakeForm) return;
  const payload: Omit<SavePatientIntakeFormRequest, "isPatient"> = {
    IsCompleted: false,
    IntakeFormResponses: {
      ...patientIntakeForm?.IntakeFormResponses,
    },
    PatientId: patientIntakeForm.PatientId,
    GuardianFirstName: patientIntakeForm.GuardianFirstName,
    GuardianLastName: patientIntakeForm.GuardianLastName,
    Checkboxes: [],
    file: null,
    recaptchaToken,
  };

  return payload;
}

export function getLastQuestionSequenceNumber(questions: Question[]) {
  return questions.reduce((prev, curr) => {
    return Math.max(prev, curr.SequenceNumber);
  }, 0);
}

export function getMappedPatientIntakeForm(payload: GetIntakeResult) {
  const result: PatientIntakeForm = {
    activeStep: 0,
    steps: payload.IntakeFormSections.map((section, index) => {
      return {
        active: index === 0,
        completed: false,
        error: false,
        index,
        label: section.Description,
        sectionCode: section.Code,
      } as StepLabelType;
    }),
    editing: true,
  };
  result.steps.push({
    active: false,
    completed: false,
    error: false,
    index: result.steps.at(-1)?.index! + 1,
    label: HIPPA_LABEL,
    sectionCode: HIPPA_LABEL,
  });
  result["form"] = {
    IsEditRequired: false,
    LastFilledSectionCode: null,
    PatientIntakeForm: {
      AppointmentId: -1,
      CompletedOn: "",
      Hipaa: "",
      Id: payload.Id,
      PatientId: -1,
      IsCompleted: false,
      Key: "",
      GuardianFirstName: "",
      GuardianLastName: "",
      IntakeFormResponses: {
        Code: payload.Code,
        Language: "en-US",
        Sections: payload.IntakeFormSections.map((section, index) => {
          return {
            Code: section.Code,
            ColumnCount: section.ColumnCount,
            Text: section.Description,
            Questions: section.Questions.map((question, index) => {
              return {
                ...question,
                AnswerValue: "",
                Code: question.Code,
                DisplayType: question.DisplayType,
                IsRequired: question.IsRequired,
                OptionColumnCount: question.OptionColumnCount,
                SequenceNumber: question.SequenceNumber,
                Text: question.Description,
                Type: question.Type,
                QuestionOptions: question.QuestionOptions.map((option) => {
                  return {
                    Code: option.Code,
                    IsSelected: false,
                    Text: option.Description,
                  } as PatientIntakeFormQuestionOption;
                }),
                QuestionValidations: question.QuestionValidation.map(
                  (validation) => {
                    return {
                      Code: validation.Code,
                      ErrorMessage: validation.ErrorMessage,
                      Type: validation.Type,
                      Value: validation.Value,
                      Description: validation.ErrorMessage,
                    } as PatientIntakeFormQuestionValidation;
                  }
                ),
                QuestionRecommendations: [],
              } as PatientIntakeFormQuestion;
            }),
          } as PatientIntakeFormSection;
        }),
      },
    },
  };
  return result;
}

export async function exportComponentToPDF(element: any, noMargin?: boolean) {
  const errorMessages = element.querySelectorAll(".errorMessage");
  errorMessages.forEach((errorMessage: HTMLElement) => {
    if (errorMessage.innerText.length > 0) {
      errorMessage.style.visibility = "hidden";
    }
  });

  
  // TODO add back if neccessary
  // const patientInformation = element.querySelector("[data-patientinformation='patientinformation']"
  // ) as HTMLDivElement;
  // if(patientInformation) {
  //   patientInformation.style.flexDirection = "column";
  //   patientInformation.style.alignItems = "flex-end";
  // }

  // change display of all checkbox labels from inline-flex to none and all inputs from none to block
  const checkboxLabels =
    (element.querySelectorAll(
      "[data-pdf-label='label']"
    ) as HTMLDivElement[]) || [];
  const checkboxInputs =
    (element.querySelectorAll(
      "[data-pdf-checkbox='checkbox']"
    ) as HTMLDivElement[]) || [];

  checkboxLabels.forEach((label) => {
    label.style.display = "none";
  });

  checkboxInputs.forEach((input) => {
    input.style.display = "block";
  });

  // multi option grid data-option = pdf-multi-option
  const questionsContainer = element.querySelector(
    "[data-section='pdf-section']"
  ) as HTMLDivElement;
  let gridStyle = "";

  if (questionsContainer) {
    gridStyle = questionsContainer.style.gridTemplateColumns;
    questionsContainer.style.gridTemplateColumns = "1fr";
  }

  // TODO add back if needed
  // multi option grid data-option = pdf-multi-option
  const multiOptionGrid =
    (element.querySelectorAll(
      "[data-option='pdf-multi-option']"
    ) as HTMLDivElement[]) || [];

  multiOptionGrid.forEach((grid) => {
    grid.setAttribute(
      "style",
      "display: flex !important; flex-direction: column !important; row-gap : 5px;"
    );
  });

  const file1 = await drawDOM(element, {
    paperSize: "letter",
    margin: noMargin
      ? {
        left : "0.25cm",
        top : "1cm",
        right : "0.25cm"
      }
      : {
          left: "2cm",
          right: "2cm",
          top: "1cm",
        },
    scale: 0.6,
  });

  // TODO add back if needed
  // if(patientInformation) {
  //   patientInformation.style.flexDirection = "row";
  //   patientInformation.style.alignItems = "flex-start";
  // }

  if (questionsContainer) {
    questionsContainer.style.gridTemplateColumns = gridStyle;
  }

  checkboxLabels.forEach((label) => {
    label.style.display = "inline-flex";
  });

  checkboxInputs.forEach((input) => {
    input.style.display = "none";
  });

  // TODO add back if needed
  multiOptionGrid.forEach((grid, index) => {
    grid.setAttribute("style", "display: grid !important; row-gap : 12px;");
  });

  errorMessages.forEach((errorMessage: HTMLElement) => {
    if (errorMessage.innerText.length > 0) {
      errorMessage.style.visibility = "visible";
    }
  });

  return file1;
}

export async function generatePDFComponent(
  files: any[],
  hippaElement: HTMLElement
) {
  const filteredFiles = files.filter(Boolean);
  let firstFile;
  if (filteredFiles.length > 1) {
    firstFile = filteredFiles[0];
    for (let i = 1; i < filteredFiles.length; i++) {
      firstFile.append(...filteredFiles[i].children);
    }
    const resetIcon = hippaElement.querySelector(
      ".resetsignature"
    ) as HTMLImageElement;
    const signatureContainer = hippaElement.querySelector(
      ".signatureContainer"
    ) as HTMLDivElement;
    const hippainputerror = hippaElement.querySelector(
      "#hippainputerror"
    ) as HTMLParagraphElement;
    resetIcon.style.display = "none";
    hippainputerror.style.display = "none";
    signatureContainer.style.border = "none";
    const hippaPage = await exportComponentToPDF(hippaElement, true);
    resetIcon.style.display = "initial";
    hippainputerror.style.display = "initial";
    signatureContainer.style.border = "1px solid #000";
    firstFile.append(...hippaPage.children);
  }
  const exportedPDF = await exportPDF(firstFile);
  return exportedPDF;
}

export async function generateVisionIntakeFormPDF(
  files: any[],
  hippaElement: HTMLElement
) {
  const filteredFiles = files.filter(Boolean);
  let firstFile;
  if (filteredFiles.length > 1) {
    firstFile = filteredFiles[0];
    for (let i = 1; i < filteredFiles.length; i++) {
      firstFile.append(...filteredFiles[i].children);
    }
    const hippaDiv = hippaElement.querySelector(
      "#hippa-container"
    ) as HTMLDivElement;
    hippaDiv.style.height = "auto";
    const hippaPage = await exportComponentToPDF(hippaElement);
    hippaDiv.style.height = "400px";
    firstFile.append(...hippaPage.children);
  }
  const exportedPDF = await exportPDF(firstFile);
  return exportedPDF;
}

export function validateQuestions(
  childQuestions: Question[],
  section: IntakeFormSection,
  intakeRecommendationToggles: IntakeRecommendationToggle[]
) {
  const formErrors: IntakeFormError[] = [];
  childQuestions.forEach((question) => {
    const sectionQuestions = section.Questions;
    if (question.Code.length === 0) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.REQUIRED_QUESTION_CODE,
        field: "QuestionCode",
        type: "Question",
        SectionIndex: section.SectionIndex,
        QuestionIndex: question.QuestionIndex,
      });
    }

    if (
      question.Code.length > COMMON_INPUT_MAX_LENGTH ||
      !isAlphaNumeric.test(question.Code)
    ) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.INVALID_QUESTION_CODE,
        field: "QuestionCode",
        type: "Question",
        SectionIndex: section.SectionIndex,
        QuestionIndex: question.QuestionIndex,
      });
    }

    if (
      question.Code.length > 0 &&
      sectionQuestions.find(
        (s) =>
          s.QuestionIndex !== question.QuestionIndex && s.Code === question.Code
      )
    ) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.UNIQUE_QUESTION_CODE,
        field: "QuestionCode",
        type: "Question",
        SectionIndex: section.SectionIndex,
        QuestionIndex: question.QuestionIndex,
      });
    }

    if (question.Description.length === 0) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.REQUIRED_QUESTION_DESCRIPTION,
        field: "QuestionDescription",
        type: "Question",
        SectionIndex: section.SectionIndex,
        QuestionIndex: question.QuestionIndex,
      });
    }

    if (question.Description.length > FREE_TEXT_MAX_LENGTH) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.INVALID_QUESTION_DESCRIPTION,
        field: "QuestionDescription",
        type: "Question",
        SectionIndex: section.SectionIndex,
        QuestionIndex: question.QuestionIndex,
      });
    }

    if (
      (question.Type === QuestionTypeEnum.CHECKBOX_LIST ||
        question.Type === QuestionTypeEnum.RADIOLIST ||
        question.Type === QuestionTypeEnum.DROPDOWN) &&
      question.QuestionOptions.length === 0
    ) {
      formErrors.push({
        errorMessage: INTAKE_FORM_ERRORS.REQUIRED_QUESTION_OPTIONS,
        field: "QuestionDescription",
        type: "Question",
        SectionIndex: section.SectionIndex,
        QuestionIndex: question.QuestionIndex,
      });
    }

    question.QuestionValidation.forEach(({ Type, Value: inputValue }) => {
      if (Type === "Max") {
        if (isNaN(+inputValue)) {
          formErrors.push({
            errorMessage: INTAKE_FORM_ERRORS.INVALID_VALIDATION_BACK_DAYS,
            field: "BackDays",
            type: "Validation",
            SectionIndex: section.SectionIndex,
            QuestionIndex: question.QuestionIndex,
          });
        }
      }
    });

    question.QuestionOptions.forEach((option) => {
      const questionOptions = question.QuestionOptions;
      if (option.Code.length === 0) {
        formErrors.push({
          errorMessage: INTAKE_FORM_ERRORS.REQUIRED_OPTION_CODE,
          field: "OptionCode",
          type: "Option",
          SectionIndex: section.SectionIndex,
          QuestionIndex: question.QuestionIndex,
          OptionIndex: option.OptionIndex,
        });
      }

      if (
        option.Code.length > COMMON_INPUT_MAX_LENGTH ||
        !isAlphaNumeric.test(option.Code)
      ) {
        formErrors.push({
          errorMessage: INTAKE_FORM_ERRORS.INVALID_OPTION_CODE,
          field: "OptionCode",
          type: "Option",
          SectionIndex: section.SectionIndex,
          QuestionIndex: question.QuestionIndex,
          OptionIndex: option.OptionIndex,
        });
      }

      if (
        option.Code.length > 0 &&
        questionOptions.find(
          (s) => s.OptionIndex !== option.OptionIndex && s.Code === option.Code
        )
      ) {
        formErrors.push({
          errorMessage: INTAKE_FORM_ERRORS.UNIQUE_OPTION_CODE,
          field: "OptionCode",
          type: "Option",
          SectionIndex: section.SectionIndex,
          QuestionIndex: question.QuestionIndex,
          OptionIndex: option.OptionIndex,
        });
      }

      if (option.Description.length === 0) {
        formErrors.push({
          errorMessage: INTAKE_FORM_ERRORS.REQUIRED_OPTION_DESCRIPTION,
          field: "OptionDescription",
          type: "Option",
          SectionIndex: section.SectionIndex,
          QuestionIndex: question.QuestionIndex,
          OptionIndex: option.OptionIndex,
        });
      }

      if (option.Description.length > FREE_TEXT_MAX_LENGTH) {
        formErrors.push({
          errorMessage: INTAKE_FORM_ERRORS.INVALID_OPTION_DESCRIPTION,
          field: "OptionDescription",
          type: "Option",
          SectionIndex: section.SectionIndex,
          QuestionIndex: question.QuestionIndex,
          OptionIndex: option.OptionIndex,
        });
      }

      const recommendationToggle = intakeRecommendationToggles.find(
        (t) =>
          t.QuestionIndex === question.QuestionIndex &&
          t.SectionIndex === section.SectionIndex &&
          t.OptionIndex === option.OptionIndex
      );

      if (
        recommendationToggle?.type === "None" &&
        recommendationToggle?.toggle
      ) {
        formErrors.push({
          errorMessage: INTAKE_FORM_ERRORS.REQUIRED_RECOMMENDATION_RADIO_VALUE,
          field: "RecommendationRadio",
          type: "Recommendation",
          SectionIndex: section.SectionIndex,
          QuestionIndex: question.QuestionIndex,
          OptionIndex: option.OptionIndex,
        });
      }

      if (
        recommendationToggle?.type === "Text" &&
        recommendationToggle?.toggle
      ) {
        const textRecommendation = question.Recommendations.filter(
          (r) => r.Type === "Text" && r.OptionIndex === option.OptionIndex
        );

        if (
          textRecommendation.length === 0 ||
          textRecommendation[0].Value.length === 0
        ) {
          formErrors.push({
            errorMessage: INTAKE_FORM_ERRORS.REQUIRED_RECOMMENDATION_TEXT_VALUE,
            field: "RecommendationText",
            type: "Recommendation",
            SectionIndex: section.SectionIndex,
            QuestionIndex: question.QuestionIndex,
            OptionIndex: option.OptionIndex,
          });
        }

        if (textRecommendation[0].Value.length > FREE_TEXT_MAX_LENGTH) {
          formErrors.push({
            errorMessage: INTAKE_FORM_ERRORS.INVALID_RECOMMENDATION_TEXT_VALUE,
            field: "RecommendationText",
            type: "Recommendation",
            SectionIndex: section.SectionIndex,
            QuestionIndex: question.QuestionIndex,
            OptionIndex: option.OptionIndex,
          });
        }
      }

      if (
        recommendationToggle?.type === "SKU" &&
        recommendationToggle?.toggle
      ) {
        const skuRecommendations = question.Recommendations.filter(
          (r) => r.Type === "SKU" && r.OptionIndex === option.OptionIndex
        );

        if (skuRecommendations.length === 0) {
          formErrors.push({
            errorMessage: INTAKE_FORM_ERRORS.REQUIRED_RECOMMENDATION_SKU_VALUE,
            field: "RecommendationSku",
            type: "Recommendation",
            SectionIndex: section.SectionIndex,
            QuestionIndex: question.QuestionIndex,
            OptionIndex: option.OptionIndex,
          });
        }
      }
    });
  });
  return formErrors;
}

export function getPatientInformationAndAddress(
  patientIntakeInformation: GetPatientInformationResult
) {
  const {
    Dob,
    BillingAddress,
    Email,
    FirstName,
    GenderCode,
    LastName,
    PreferredLanguageCode,
    PrimaryPhoneNo,
    ShippingAddress,
    ZipCode,
    IsMarketingConsent
  } = patientIntakeInformation;
  const information = {
    Dob,
    Email,
    FirstName,
    GenderCode,
    LastName,
    PrimaryPhoneNo,
    PreferredLanguageCode,
    IsMarketingConsent
  } as Pick<
    GetPatientInformationResult,
    | "Dob"
    | "Email"
    | "FirstName"
    | "GenderCode"
    | "LastName"
    | "PrimaryPhoneNo"
    | "PreferredLanguageCode"
    | "IsMarketingConsent"
  >;

  const address = {
    BillingAddress,
    ShippingAddress,
    ZipCode,
  } as Pick<
    GetPatientInformationResult,
    "BillingAddress" | "ShippingAddress" | "ZipCode"
  >;

  return {
    information,
    address,
  };
}

export function getNestedChildQuestionsWithNoParent(
  oldCopyIndex: number,
  newCopyIndex: number,
  section: IntakeFormSection,
  intakeRecommendationToggles: IntakeRecommendationToggle[],
  parentQuestionIndex: number
) {
  let count = 0;
  const sectionCopy = structuredClone(section);
  const intakeRecommendationTogglesCopy = structuredClone(
    intakeRecommendationToggles
  );
  const mapQuestions = new Map<number, Question>();
  const mappedQuestions = getMappedQuestions(
    oldCopyIndex,
    newCopyIndex,
    sectionCopy,
    intakeRecommendationTogglesCopy,
    mapQuestions,
    parentQuestionIndex
  );
  return mappedQuestions;

  function getMappedQuestions(
    oldCopyIndex: number,
    newCopyIndex: number,
    section: IntakeFormSection,
    intakeRecommendationToggles: IntakeRecommendationToggle[],
    map: Map<number, Question>,
    parentQuestionIndex: number
  ) {
    const childQuestions = section.Questions.filter(
      (question) => question.ParentQuestionIndex === oldCopyIndex
    );

    if (childQuestions.length === 0) {
      return {
        map,
        intakeRecommendationToggles,
      };
    }

    childQuestions.forEach((question, index) => {
      count++;
      const oldIndex = question.QuestionIndex!;
      const newQuestionIndex = parentQuestionIndex + count;
      question.ParentQuestionIndex = newCopyIndex;
      question.QuestionIndex = newQuestionIndex;
      question.QuestionId = undefined;
      question.QuestionOptions.forEach((option) => {
        const recommendationToggle = intakeRecommendationToggles.find(
          (toggle) =>
            toggle.OptionIndex === option.OptionIndex &&
            toggle.QuestionIndex === oldIndex &&
            toggle.SectionIndex === section.SectionIndex
        );
        if (recommendationToggle) {
          intakeRecommendationToggles.push({
            ...recommendationToggle,
            OptionIndex: option.OptionIndex!,
            QuestionIndex: newQuestionIndex,
            SectionIndex: section.SectionIndex!,
          });
        }
        option.OptionId = undefined;
      });
      question.Recommendations.forEach((recommendation) => {
        recommendation.RecommendationId = undefined;
      });

      map.set(oldIndex, question);

      getMappedQuestions(
        oldIndex,
        newQuestionIndex,
        section,
        intakeRecommendationToggles,
        map,
        parentQuestionIndex
      );
    });

    return {
      map,
      intakeRecommendationToggles,
    };
  }
}

export function getNestedChildQuestionsWithParent(
  oldCopyIndex: number,
  newCopyIndex: number,
  section: IntakeFormSection,
  intakeRecommendationToggles: IntakeRecommendationToggle[],
  parentQuestionIndex: number
) {
  let count = 0;
  debugger;
  const sectionCopy = structuredClone(section);
  const intakeRecommendationTogglesCopy = structuredClone(
    intakeRecommendationToggles
  );
  const mapQuestions = new Map<number, Question>();
  const mappedQuestions = getMappedQuestionsForChild(
    oldCopyIndex,
    newCopyIndex,
    sectionCopy,
    intakeRecommendationTogglesCopy,
    mapQuestions,
    parentQuestionIndex
  );

  return mappedQuestions;

  function getMappedQuestionsForChild(
    oldCopyIndex: number,
    newCopyIndex: number,
    section: IntakeFormSection,
    intakeRecommendationToggles: IntakeRecommendationToggle[],
    map: Map<number, Question>,
    parentQuestionIndex: number
  ) {
    const childQuestions = section.Questions.filter(
      (question) => question.ParentQuestionIndex === parentQuestionIndex
    );

    if (childQuestions.length === 0) {
      return {
        map,
        intakeRecommendationToggles,
      };
    }

    childQuestions.forEach((question, index) => {
      count++;
      const oldIndex = question.QuestionIndex!;
      question.ParentQuestionIndex = oldCopyIndex;
      question.QuestionIndex = newCopyIndex + count;
      question.QuestionId = undefined;
      question.QuestionOptions.forEach((option) => {
        const recommendationToggle = intakeRecommendationToggles.find(
          (toggle) =>
            toggle.OptionIndex === option.OptionIndex &&
            toggle.QuestionIndex === oldIndex &&
            toggle.SectionIndex === section.SectionIndex
        );
        if (recommendationToggle) {
          intakeRecommendationToggles.push({
            ...recommendationToggle,
            OptionIndex: option.OptionIndex!,
            QuestionIndex: newCopyIndex + count,
            SectionIndex: section.SectionIndex!,
          });
        }
        option.OptionId = undefined;
      });
      question.Recommendations.forEach((recommendation) => {
        recommendation.RecommendationId = undefined;
      });

      map.set(oldIndex, question);

      getMappedQuestionsForChild(
        newCopyIndex + count,
        newCopyIndex + 1 + count,
        section,
        intakeRecommendationToggles,
        map,
        oldIndex
      );
    });

    return {
      map,
      intakeRecommendationToggles,
    };
  }
}

export function getLastQuestionIndex(questions: Question[]) {
  return (
    questions.reduce((prev, curr) => {
      return Math.max(prev, curr.QuestionIndex!);
    }, 0) + 1
  );
}

export function getRootParentQuestion(
  questions: PatientIntakeFormQuestion[],
  childQuestion: PatientIntakeFormQuestion
): PatientIntakeFormQuestion {
  if (childQuestion.ParentQuestionCode === null) {
    return childQuestion;
  }
  const parentQuestion: PatientIntakeFormQuestion | undefined = questions.find(
    (q) => q.Code === childQuestion.ParentQuestionCode
  );
  if (!parentQuestion) return childQuestion;
  return getRootParentQuestion(questions, parentQuestion);
}

export function scrollToElementWithOffset(
  element: HTMLElement,
  offset: number
) {
  var elementPosition = element.getBoundingClientRect().top;
  var offsetPosition = elementPosition - offset;

  window.scrollBy({
    top: offsetPosition,
    behavior: "smooth",
  });
}

export function getAllQuestionIndexFromParent(
  section: IntakeFormSection,
  question: Question,
  indexToRemove: number[]
) {
  const childQuestions = section.Questions.filter(
    (q) => q.ParentQuestionIndex === question.QuestionIndex
  );
  // Add child question question Index and call same function for child question
  childQuestions.forEach((childQuestion) => {
    if (!childQuestion) return;
    indexToRemove.push(childQuestion.QuestionIndex!);
    return getAllQuestionIndexFromParent(section, childQuestion, indexToRemove);
  });

  return indexToRemove;
}

export function compareObjects(obj1: any, obj2: any) {
  if (obj1 === obj2) return true;

  if (
    typeof obj1 !== "object" ||
    typeof obj2 !== "object" ||
    obj1 == null ||
    obj2 == null
  ) {
    return false;
  }

  const keysA = Object.keys(obj1);
  const keysB = Object.keys(obj2);

  if (keysA.length !== keysB.length) {
    return false;
  }

  let result = true;

  keysA.forEach((key) => {
    if (!keysB.includes(key)) {
      result = false;
    }

    if (typeof obj1[key] === "function" || typeof obj2[key] === "function") {
      if (obj1[key].toString() !== obj2[key].toString()) {
        result = false;
      }
    }

    if (!compareObjects(obj1[key], obj2[key])) {
      result = false;
    }
  });

  return result;
}
